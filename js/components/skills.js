export async function generateSkillsHTML() {
  const section = document.getElementById('skills-section');
  if (!section) return;

  const response = await fetch(new URL('../data/skills.json', import.meta.url));
  if (!response.ok) throw new Error(`Failed to load skills: ${response.status}`);
  const skillsData = await response.json();

  const title = document.createElement('h1');
  title.className = 'title';
  title.textContent = skillsData.title;
  section.appendChild(title);

  const grid = document.createElement('div');
  grid.className = 'skills-grid';
  section.appendChild(grid);

  skillsData.categories.forEach((category) => {
    const categoryCard = document.createElement('section');
    categoryCard.className = 'skills-category';
    const categoryTitle = document.createElement('h3');
    categoryTitle.className = 'text-primary';
    categoryTitle.textContent = category.name;
    categoryCard.appendChild(categoryTitle);

    const table = document.createElement('table');
    const thead = table.createTHead();
    const headerRow = thead.insertRow();
    ['言語環境・業界', '期間', 'レベル'].forEach((label) => {
      const th = document.createElement('th');
      th.textContent = label;
      headerRow.appendChild(th);
    });

    const tbody = table.createTBody();
    category.skills.forEach((skill) => {
      const row = tbody.insertRow();
      const nameCell = row.insertCell();
      nameCell.textContent = `${skill.starred ? '★' : ''}${skill.name}`;
      row.insertCell().textContent = skill.years;
      row.insertCell().textContent = skill.level;
    });
    categoryCard.appendChild(table);
    grid.appendChild(categoryCard);
  });
}
