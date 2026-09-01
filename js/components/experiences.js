export async function generateExperienceHTML() {
  const section = document.getElementById('experience-section');

  if (!section) return;
  const response = await fetch(new URL('../data/experiences.json', import.meta.url));
  if (!response.ok) throw new Error(`Failed to load experiences: ${response.status}`);
  const experienceData = await response.json();

  // タイトルを作成
  const title = document.createElement('h1');
  title.className = 'title pb-3 mb-5';
  title.textContent = experienceData.title;
  section.appendChild(title);

  // 会社ごとのセクションを作成
  experienceData.companies.forEach(company => {
    // 会社情報のセクション
    const companySection = document.createElement('div');
    companySection.className = 'company-section mb-5';

    // 会社名と期間
    const companyHeader = document.createElement('div');
    companyHeader.className = 'stack-g mb-4 p-3';

    const companyName = document.createElement('h3');
    companyName.className = 'text-primary mb-2';
    companyName.textContent = company.name;
    
    const companyPeriod = document.createElement('p');
    companyPeriod.className = 'mb-2';
    companyPeriod.textContent = company.period;

    companyHeader.appendChild(companyName);
    companyHeader.appendChild(companyPeriod);

    // 会社情報（事業内容、資本金など）
    if (company.business) {
      const businessInfo = document.createElement('p');
      businessInfo.className = 'mb-1';
      businessInfo.innerHTML = `<span class="text-primary">事業内容:</span> ${company.business}`;
      companyHeader.appendChild(businessInfo);
    }

    const companyDetails = document.createElement('div');
    companyDetails.className = 'd-flex flex-wrap';

    if (company.capital) {
      const capital = document.createElement('div');
      capital.className = 'me-4 mb-1';
      capital.innerHTML = `<span class="text-primary">資本金:</span> ${company.capital}`;
      companyDetails.appendChild(capital);
    }

    if (company.sales) {
      const sales = document.createElement('div');
      sales.className = 'me-4 mb-1';
      sales.innerHTML = `<span class="text-primary">売上高:</span> ${company.sales}`;
      companyDetails.appendChild(sales);
    }

    if (company.employees) {
      const employees = document.createElement('div');
      employees.className = 'me-4 mb-1';
      employees.innerHTML = `<span class="text-primary">従業員数:</span> ${company.employees}`;
      companyDetails.appendChild(employees);
    }

    if (company.listed) {
      const listed = document.createElement('div');
      listed.className = 'me-4 mb-1';
      listed.innerHTML = `<span class="text-primary">上場:</span> ${company.listed}`;
      companyDetails.appendChild(listed);
    }

    if (companyDetails.children.length > 0) {
      companyHeader.appendChild(companyDetails);
    }

    companySection.appendChild(companyHeader);

    // プロジェクト情報
    company.projects.forEach(project => {
      const projectDiv = document.createElement('div');
      projectDiv.className = 'project-item mb-4 section-content';

      // プロジェクト名と期間
      const projectHeader = document.createElement('div');
      projectHeader.className = 'mb-3';

      const projectName = document.createElement('h4');
      projectName.className = 'text-primary mb-1';
      projectName.textContent = project.name;

      const projectPeriod = document.createElement('p');
      projectPeriod.className = 'mb-2';
      projectPeriod.textContent = project.period;

      projectHeader.appendChild(projectName);
      projectHeader.appendChild(projectPeriod);
      projectDiv.appendChild(projectHeader);

      // プロジェクト概要
      if (project.overview) {
        const overviewDiv = document.createElement('div');
        overviewDiv.className = 'mb-3';
        
        const overviewTitle = document.createElement('h5');
        overviewTitle.className = 'text-primary mb-2';
        overviewTitle.textContent = 'プロジェクト概要';
        
        const overviewContent = document.createElement('p');
        overviewContent.textContent = project.overview;
        
        overviewDiv.appendChild(overviewTitle);
        overviewDiv.appendChild(overviewContent);
        projectDiv.appendChild(overviewDiv);
      }

      // 担当業務
      if (project.tasks && project.tasks.length > 0) {
        const tasksDiv = document.createElement('div');
        tasksDiv.className = 'mb-3';
        
        const tasksTitle = document.createElement('h5');
        tasksTitle.className = 'text-primary mb-2';
        tasksTitle.textContent = '担当業務';
        
        const tasksList = document.createElement('ul');
        project.tasks.forEach(task => {
          const taskItem = document.createElement('li');
          taskItem.textContent = task;
          tasksList.appendChild(taskItem);
        });
        
        tasksDiv.appendChild(tasksTitle);
        tasksDiv.appendChild(tasksList);
        projectDiv.appendChild(tasksDiv);
      }

      // 技術フェーズ
      if (project.phases && project.phases.length > 0) {
        const phasesDiv = document.createElement('div');
        phasesDiv.className = 'mb-3';
        
        const phasesTitle = document.createElement('h5');
        phasesTitle.className = 'text-primary mb-2';
        phasesTitle.textContent = '技術フェーズ';
        
        const phasesContent = document.createElement('p');
        phasesContent.textContent = project.phases.join(', ');
        
        phasesDiv.appendChild(phasesTitle);
        phasesDiv.appendChild(phasesContent);
        projectDiv.appendChild(phasesDiv);
      }

      // 開発環境
      if (project.environment) {
        const envDiv = document.createElement('div');
        envDiv.className = 'mb-3';
        
        const envTitle = document.createElement('h5');
        envTitle.className = 'text-primary mb-2';
        envTitle.textContent = '開発環境';
        
        const envTable = document.createElement('table');
        envTable.className = 'table table-dark table-bordered';
        
        for (const [category, items] of Object.entries(project.environment)) {
          if (items && items.length > 0) {
            const row = document.createElement('tr');
            
            const categoryCell = document.createElement('td');
            categoryCell.className = 'text-primary';
            categoryCell.style.width = '120px';
            categoryCell.textContent = category.toUpperCase();
            
            const itemsCell = document.createElement('td');
            itemsCell.textContent = items.join(', ');
            
            row.appendChild(categoryCell);
            row.appendChild(itemsCell);
            envTable.appendChild(row);
          }
        }
        
        envDiv.appendChild(envTitle);
        envDiv.appendChild(envTable);
        projectDiv.appendChild(envDiv);
      }

      // 役割とチーム規模
      if (project.role || project.teamSize) {
        const roleDiv = document.createElement('div');
        roleDiv.className = 'mb-2';
        
        if (project.role) {
          const roleSpan = document.createElement('span');
          roleSpan.className = 'me-3';
          roleSpan.innerHTML = `<span class="text-primary">役割:</span> ${project.role}`;
          roleDiv.appendChild(roleSpan);
        }
        
        if (project.teamSize) {
          const teamSpan = document.createElement('span');
          teamSpan.innerHTML = `<span class="text-primary">チーム:</span> ${project.teamSize}`;
          roleDiv.appendChild(teamSpan);
        }
        
        projectDiv.appendChild(roleDiv);
      }

      companySection.appendChild(projectDiv);
    });

    section.appendChild(companySection);
  });
}
