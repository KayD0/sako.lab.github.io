import { generateAboutMeHTML } from './components/aboutme.js';
import { generateSkillsHTML } from './components/skills.js';
import { generateExperienceHTML } from './components/experiences.js';

const os = document.querySelector('[data-winfolio]');

if (os) {
  generateAboutMeHTML();
  generateSkillsHTML().catch((error) => {
    document.getElementById('skills-section').textContent = `Skills could not be loaded: ${error.message}`;
  });
  generateExperienceHTML();

  const win = os.querySelector('[data-window]');
  const start = os.querySelector('[data-start]');
  const dialog = os.querySelector('[data-dialog]');
  const powerScene = os.querySelector('[data-power-scene]');
  const powerHint = os.querySelector('[data-power-hint]');
  const bootLog = os.querySelector('[data-boot-log]');
  const bootProgress = os.querySelector('[data-boot-progress]');
  const names = { profile: 'My Profile', resume: 'Resume.doc', projects: 'My Projects', works: 'Works', skills: 'Dev Skills', contact: 'Contact.exe' };
  let current = 'profile';
  let previous = 'profile';

  const openApp = (name) => {
    if (!names[name]) return;
    previous = current;
    current = name;
    win.classList.add('active');
    start.classList.remove('active');
    dialog.classList.remove('active');
    os.querySelectorAll('[data-panel]').forEach((panel) => panel.classList.toggle('active', panel.dataset.panel === name));
    os.querySelectorAll('aside [data-open]').forEach((button) => button.classList.toggle('selected', button.dataset.open === name));
    os.querySelector('[data-title]').textContent = `${names[name]} - Portfolio Explorer`;
    os.querySelector('[data-task-title]').textContent = names[name];
    os.querySelector('[data-address]').value = `C:\\Portfolio\\${names[name].replaceAll(' ', '_')}`;
  };

  os.querySelectorAll('[data-open]').forEach((button) => button.addEventListener('click', () => openApp(button.dataset.open)));
  os.querySelector('[data-start-button]').addEventListener('click', () => start.classList.toggle('active'));
  os.querySelector('[data-close]').addEventListener('click', () => win.classList.remove('active'));
  os.querySelector('[data-minimize]').addEventListener('click', () => win.classList.remove('active'));
  os.querySelector('[data-maximize]').addEventListener('click', () => win.classList.toggle('maximized'));
  os.querySelector('[data-task]').addEventListener('click', () => win.classList.toggle('active'));
  os.querySelector('[data-back]').addEventListener('click', () => openApp(previous));
  os.querySelector('[data-shutdown]').addEventListener('click', () => { start.classList.remove('active'); dialog.classList.add('active'); });
  os.querySelector('[data-cancel]').addEventListener('click', () => dialog.classList.remove('active'));
  const finishShutdown = (autoBoot = false) => {
    os.classList.add('shutting-down');
    start.classList.remove('active');
    dialog.classList.remove('active');
    window.setTimeout(() => {
      powerScene.hidden = false;
      os.classList.remove('shutting-down');
      os.classList.add('powered-off');
      powerHint.textContent = autoBoot ? 'RESTARTING...' : 'POWERボタンを押して起動';
      bootLog.textContent = autoBoot ? 'RESTART SIGNAL RECEIVED' : 'SYSTEM HALTED';
      bootProgress.style.width = '0%';
      if (autoBoot) window.setTimeout(bootComputer, 650);
    }, 900);
  };

  const bootComputer = () => {
    if (os.classList.contains('booting')) return;
    win.classList.remove('active', 'maximized', 'opening');
    os.classList.remove('handoff-background', 'desktop-starting', 'taskbar-ready', 'desktop-items-ready', 'explorer-ready');
    os.classList.add('booting');
    powerHint.textContent = 'BOOTING SAKO OS 98...';
    bootLog.textContent = 'CHECKING MEMORY... OK';
    bootProgress.style.width = '18%';
    window.setTimeout(() => { bootLog.textContent = 'LOADING SYSTEM DRIVERS...'; bootProgress.style.width = '48%'; }, 650);
    window.setTimeout(() => { bootLog.textContent = 'STARTING PORTFOLIO EXPLORER...'; bootProgress.style.width = '78%'; }, 1400);
    window.setTimeout(() => { bootLog.textContent = 'WELCOME TO SAKO OS'; bootProgress.style.width = '100%'; }, 2200);
    window.setTimeout(() => {
      os.classList.add('handoff-background');
      powerHint.textContent = '';
    }, 2700);
    window.setTimeout(() => {
      os.classList.remove('powered-off', 'booting', 'handoff-background');
      os.classList.add('desktop-starting');
      powerScene.hidden = true;
    }, 3400);
    window.setTimeout(() => os.classList.add('taskbar-ready'), 3900);
    window.setTimeout(() => os.classList.add('desktop-items-ready'), 4600);
    window.setTimeout(() => {
      os.classList.add('explorer-ready');
      openApp('profile');
      win.classList.add('opening');
    }, 5400);
    window.setTimeout(() => {
      os.classList.remove('desktop-starting', 'taskbar-ready', 'desktop-items-ready', 'explorer-ready');
      win.classList.remove('opening');
    }, 6000);
  };

  os.querySelector('[data-confirm-shutdown]').addEventListener('click', () => finishShutdown(false));
  os.querySelector('[data-reboot]').addEventListener('click', () => finishShutdown(true));
  os.querySelector('[data-power-button]').addEventListener('click', bootComputer);
  os.querySelectorAll('[data-menu]').forEach((button) => button.addEventListener('click', (event) => {
    const popup = os.querySelector('[data-popup]');
    popup.textContent = button.dataset.menu === 'help' ? 'SAKO OS 98 Portfolio / Build 2026' : 'No additional commands.';
    popup.style.left = `${event.target.offsetLeft + 8}px`;
    popup.style.top = '76px';
    popup.classList.toggle('active');
  }));

  const clock = os.querySelector('[data-clock]');
  const tick = () => { clock.textContent = new Date().toLocaleTimeString('en-GB', { hour: '2-digit', minute: '2-digit' }); };
  tick();
  window.setInterval(tick, 1000);
}
