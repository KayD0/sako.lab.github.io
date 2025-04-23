const skillsData = {
  "title": "スキル",
  "categories": [
    {
      "name": "Language",
      "skills": [
        { "name": "C#", "years": "5年", "level": "業務で即戦力になれる", "starred": true },
        { "name": "SQL", "years": "3年", "level": "業務で即戦力になれる", "starred": true },
        { "name": "Typescript", "years": "1年", "level": "一人称で作業可能", "starred": true },
        { "name": "Javascript", "years": "1年", "level": "一人称で作業可能", "starred": true },
        { "name": "VBA", "years": "1年未満", "level": "一人称で作業可能", "starred": true },
        { "name": "Python", "years": "1年未満", "level": "一人称で作業可能", "starred": true },
        { "name": "Go", "years": "1年未満", "level": "調べながらであれば作業可能", "starred": false }
      ]
    },
    {
      "name": "Framework",
      "skills": [
        { "name": ".net(6,8)", "years": "3年", "level": "業務で即戦力になれる", "starred": true },
        { "name": ".net core(3.1)", "years": "2年", "level": "業務で即戦力になれる", "starred": true },
        { "name": ".net framework(4.5,4.8)", "years": "3年", "level": "業務で即戦力になれる", "starred": true },
        { "name": "vue", "years": "1年", "level": "調べながらであれば作業可能", "starred": true },
        { "name": "Flask", "years": "1未満", "level": "調べながら作業可能、個人開発でFirebaseを利用した認証付きAPIの作成など", "starred": false },
        { "name": "React", "years": "1未満", "level": "調べながら作業可能、個人開発でFirebaseを利用した認証付きAPIの作成など", "starred": false }
      ]
    },
    {
      "name": "Database",
      "skills": [
        { "name": "SQL Server", "years": "4年", "level": "構築からチューニングまで対応できる", "starred": true },
        { "name": "CosmosDB", "years": "1年未満", "level": "構築からチューニングまで対応できる", "starred": true },
        { "name": "MySQL", "years": "1年", "level": "テーブル設計可能", "starred": true },
        { "name": "Oracle", "years": "2年", "level": "テーブル設計可能", "starred": true },
        { "name": "Cache", "years": "1年未満", "level": "知識がある", "starred": true }
      ]
    },
    {
      "name": "OS",
      "skills": [
        { "name": "Windows", "years": "8年", "level": "インストールから環境構築、設定、開発が可能", "starred": true },
        { "name": "macOs", "years": "1年未満", "level": "簡単なコマンドの入力ができる", "starred": true },
        { "name": "Debian", "years": "1年", "level": "インストールから環境構築、設定、開発が可能", "starred": true }
      ]
    },
    {
      "name": "Cloud",
      "skills": [
        { "name": "Azure", "years": "2年", "level": "Functionsの開発経験、Terraform改修・保守、Keyコンテナーリソース利用経験、CLIでのリソース作成経験", "starred": true },
        { "name": "AWS", "years": "1年", "level": "Lambdaの開発経験、Cloudformation改修、Keyコンテナーリソース利用経験", "starred": true },
        { "name": "GCP", "years": "1年", "level": "CloudRunの開発経験、Terraform作成", "starred": true },
        { "name": "Auth0", "years": "1年未満", "level": "調べながら作業可能、個人開発の認証機能に使用", "starred": false },
        { "name": "Firebase", "years": "1年未満", "level": "調べながら作業可能、個人開発の認証機能に使用", "starred": false }
      ]
    },
    {
      "name": "Other",
      "skills": [
        { "name": "Git", "years": "5年", "level": "使用に当たって問題なし", "starred": true },
        { "name": "GitHub", "years": "2年", "level": "使用に当たって問題なし", "starred": true },
        { "name": "Docker", "years": "2年", "level": "インストールと開発用のDBコンテナイメージ作成・起動等", "starred": true },
        { "name": "Terraform", "years": "1年未満", "level": "調べながら作業可能、既存コードの保守など", "starred": true },
        { "name": "WSL2", "years": "2年", "level": "Debianのインストールで使用", "starred": true },
        { "name": "Selenium", "years": "1年未満", "level": "調べながらであれば作業可", "starred": true }
      ]
    }
  ]
};

export function generateSkillsHTML() {
  const section = document.getElementById('skills-section');

  // タイトルを作成
  const title = document.createElement('h1');
  title.className = 'title pb-3 mb-5';
  title.textContent = skillsData.title;
  section.appendChild(title);

  // カテゴリごとにテーブルを作成
  skillsData.categories.forEach(category => {
    // カテゴリ名
    const categoryTitle = document.createElement('h3');
    categoryTitle.className = 'text-primary mb-3';
    categoryTitle.textContent = category.name;
    section.appendChild(categoryTitle);

    // テーブルの作成
    const table = document.createElement('table');
    table.className = 'table table-dark table-bordered mb-4';
    
    // テーブルヘッダー
    const thead = document.createElement('thead');
    const headerRow = document.createElement('tr');
    
    const headers = ['Skill', 'Experience', 'Level'];
    headers.forEach(headerText => {
      const th = document.createElement('th');
      th.textContent = headerText;
      headerRow.appendChild(th);
    });
    
    thead.appendChild(headerRow);
    table.appendChild(thead);
    
    // テーブルボディ
    const tbody = document.createElement('tbody');
    
    category.skills.forEach(skill => {
      const row = document.createElement('tr');
      
      // スキル名のセル
      const nameCell = document.createElement('td');
      if (skill.starred) {
        const star = document.createElement('span');
        star.className = 'text-primary';
        star.textContent = '★ ';
        nameCell.appendChild(star);
      }
      nameCell.appendChild(document.createTextNode(skill.name));
      row.appendChild(nameCell);
      
      // 経験年数のセル
      const yearsCell = document.createElement('td');
      yearsCell.textContent = skill.years;
      row.appendChild(yearsCell);
      
      // レベルのセル
      const levelCell = document.createElement('td');
      levelCell.textContent = skill.level;
      row.appendChild(levelCell);
      
      tbody.appendChild(row);
    });
    
    table.appendChild(tbody);
    section.appendChild(table);
  });
}
