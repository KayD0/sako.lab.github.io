export async function generateAboutMeHTML() {
  const section = document.getElementById('about-me-section');
  if (!section) return;

  const response = await fetch(new URL('../data/aboutme.json', import.meta.url));
  if (!response.ok) throw new Error(`Failed to load about me: ${response.status}`);
  const aboutMeData = await response.json();

  const title = document.createElement('h1');
  title.className = 'title';
  title.textContent = aboutMeData.title;
  section.appendChild(title);

  const summary = document.createElement('div');
  summary.className = 'career-summary';
  aboutMeData.careerSummary.forEach((career) => {
    const article = document.createElement('article');
    article.className = 'career-entry';
    const heading = document.createElement('h3');
    heading.textContent = career.organization;
    article.appendChild(heading);
    const list = document.createElement('ul');
    career.items.forEach((item) => {
      const li = document.createElement('li');
      li.textContent = item;
      list.appendChild(li);
    });
    article.appendChild(list);
    summary.appendChild(article);
  });
  section.appendChild(summary);

  const experienceTitle = document.createElement('h2');
  experienceTitle.className = 'experience-title';
  experienceTitle.textContent = '活かせる経験・知識・技術';
  section.appendChild(experienceTitle);

  const experienceGrid = document.createElement('div');
  experienceGrid.className = 'experience-grid';
  aboutMeData.experience.forEach((experience) => {
    const article = document.createElement('article');
    const heading = document.createElement('h3');
    heading.textContent = experience.category;
    article.appendChild(heading);
    const list = document.createElement('ul');
    experience.items.forEach((item) => {
      const li = document.createElement('li');
      li.textContent = item;
      list.appendChild(li);
    });
    article.appendChild(list);
    experienceGrid.appendChild(article);
  });
  section.appendChild(experienceGrid);
}
