export async function generateWorksHTML() {
  const panel = document.querySelector('[data-panel="works"]');
  const list = panel?.querySelector('.works-list');
  if (!panel || !list) return;

  const response = await fetch(new URL('../data/works.json', import.meta.url));
  if (!response.ok) throw new Error(`Failed to load works: ${response.status}`);
  const worksData = await response.json();

  const heading = panel.querySelector('h2');
  const path = panel.querySelector(':scope > small');
  heading.textContent = worksData.title;
  path.textContent = `C:\\PORTFOLIO\\WORKS — ${worksData.items.length} ITEMS`;
  list.replaceChildren();

  worksData.items.forEach((work) => {
    const card = document.createElement('article');
    const label = document.createElement('b');
    const title = document.createElement('h3');
    const description = document.createElement('p');
    const technologies = document.createElement('span');

    label.textContent = `${work.number} / ${work.code}`;
    title.textContent = work.title;
    description.textContent = work.description;
    technologies.textContent = work.technologies.join(' / ');
    card.append(label, title, description, technologies);

    if (work.githubUrl) {
      let githubUrl;
      try {
        githubUrl = new URL(work.githubUrl);
      } catch {
        githubUrl = null;
      }

      if (githubUrl?.protocol === 'https:') {
        const actions = document.createElement('div');
        actions.className = 'works-actions';
        const sourceLabel = document.createElement('small');
        const githubLink = document.createElement('a');
        githubLink.className = 'works-github';
        githubLink.href = githubUrl.href;
        githubLink.target = '_blank';
        githubLink.rel = 'noopener noreferrer';
        sourceLabel.textContent = 'SOURCE';
        githubLink.textContent = 'GitHub Repository ↗';
        githubLink.setAttribute('aria-label', `${work.title}のGitHubリポジトリを開く`);
        actions.append(sourceLabel, githubLink);
        card.appendChild(actions);
      }
    }

    list.appendChild(card);
  });
}
