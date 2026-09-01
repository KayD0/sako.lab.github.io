const { chromium } = require('C:/Users/hyosh/AppData/Roaming/npm/node_modules/playwright');
const assert = require('assert');
const path = require('path');

const evidenceDir = path.resolve(__dirname);
const viewports = [
  { name: 'desktop', width: 1366, height: 768 },
  { name: 'desktop-short', width: 1366, height: 600 },
  { name: 'mobile', width: 390, height: 844 }
];

(async () => {
  const browser = await chromium.launch({ headless: true });
  const results = [];
  try {
    for (const viewport of viewports) {
      const page = await browser.newPage({ viewport: { width: viewport.width, height: viewport.height } });
      const errors = [];
      page.on('console', (message) => { if (message.type() === 'error') errors.push(message.text()); });
      page.on('pageerror', (error) => errors.push(error.message));

      await page.goto('http://127.0.0.1:4173/', { waitUntil: 'networkidle' });
      assert(await page.locator('[data-power-scene]').isVisible(), `${viewport.name}: power scene not visible`);
      await page.screenshot({ path: path.join(evidenceDir, `${viewport.name}-01-power-off.png`), fullPage: true });
      await page.getByRole('button', { name: 'パソコンの電源を入れる' }).click();
      await page.locator('[data-window].active').waitFor({ state: 'visible', timeout: 8000 });
      await page.waitForFunction(() => !document.querySelector('[data-window]')?.classList.contains('opening'));

      const windowClass = await page.locator('[data-window]').getAttribute('class');
      assert(!windowClass.includes('maximized'), `${viewport.name}: explorer unexpectedly maximized`);

      const pageMetrics = await page.evaluate(() => ({
        viewportWidth: innerWidth,
        viewportHeight: innerHeight,
        bodyWidth: document.body.scrollWidth,
        bodyHeight: document.body.scrollHeight
      }));
      assert(pageMetrics.bodyWidth <= pageMetrics.viewportWidth, `${viewport.name}: horizontal page overflow`);
      assert(pageMetrics.bodyHeight <= pageMetrics.viewportHeight, `${viewport.name}: vertical page overflow`);
      await page.screenshot({ path: path.join(evidenceDir, `${viewport.name}-02-profile.png`), fullPage: true });

      for (const target of ['Projects', 'Works', 'Skills']) {
        await page.locator('[data-start-button]').click();
        await page.locator(`[data-start] [data-open="${target.toLowerCase()}"]`).click();
        await page.locator('[data-window].active').waitFor({ state: 'visible' });
        const title = await page.locator('[data-title]').textContent();
        assert(title.includes(target === 'Projects' ? 'My Projects' : target), `${viewport.name}: ${target} title mismatch`);
        await page.screenshot({ path: path.join(evidenceDir, `${viewport.name}-${target.toLowerCase()}.png`), fullPage: true });
      }

      const fit = await page.locator('[data-window]').evaluate((element) => {
        const rect = element.getBoundingClientRect();
        return { left: rect.left, top: rect.top, right: rect.right, bottom: rect.bottom, width: innerWidth, height: innerHeight };
      });
      assert(fit.left >= 0 && fit.top >= 0, `${viewport.name}: explorer starts outside viewport`);
      assert(fit.right <= fit.width, `${viewport.name}: explorer exceeds viewport width`);
      assert(fit.bottom <= fit.height - 35, `${viewport.name}: explorer overlaps taskbar`);
      assert.deepStrictEqual(errors, [], `${viewport.name}: browser errors: ${errors.join(' | ')}`);
      results.push({ viewport, pageMetrics, windowBounds: fit, errors });
      await page.close();
    }
    process.stdout.write(`${JSON.stringify(results, null, 2)}\n`);
  } finally {
    await browser.close();
  }
})().catch((error) => {
  console.error(error.stack || error);
  process.exitCode = 1;
});
