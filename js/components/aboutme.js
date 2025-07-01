const aboutMeData = {
    "title": "概要",
    "details": [
      {
        "label": "氏名",
        "value": "畑迫 睦和"
      },
      {
        "label": "誕生日",
        "value": "1993/6/4(32歳)"
      },
      {
        "label": "学歴",
        "value": "尾道市立大学-経済情報学部"
      },
      {
        "label": "経験年数",
        "value": "10 年"
      },
      {
        "label": "Email",
        "value": "h.yoshikazu0110@gmail.com"
      },
      {
        "label": "居住地",
        "value": "東京都大田区"
      }
    ],
    "careerSummary": [
      "大学卒業後、株式会社アーネットにて業務システムエンジニアとして活動し、C++を用いた開発案件に半年間携わり、その後C#を用いた開発案件に約2年間従事しました。この期間には、業務系システムおよび業務WEBアプリケーションの開発に従事し、概要設計から総合試験までのフルサイクルを経験しました。",
      "その後、デロイトトーマツリップルマーク合同会社に転職し、約3年間C#を用いた業務系WEBアプリケーションの開発に従事しました。この期間には、新規機能の開発を主に担当し、設計から実装、単体試験（テストコード作成）、結合試験仕様書の作成まで一人でお行いました。",
      "現在は個人事業主として活動し、C#を用いた開発案件に取り組んでいます。ECパッケージ・ECマイクロサービスの機能改修、保守開発等を行っています。"
    ],
    "skills": [
      {
        "category": "リーダー経験",
        "items": [
          "3~4名ほどのチームリーダー経験",
          "タスク切り出し",
          "コードレビューの実施経験",
          "コスト試算"
        ]
      },
      {
        "category": "バックエンド開発",
        "items": [
          "C#での一人称での作業可能な実務経験（5年）",
          "ASP.NET MVCやASP.NET Coreを使用したWebアプリケーションの開発経験",
          "クリーンアーキテクチャの理解と実践経験",
          "テストコード実装経験",
          "新技術やサードパーティー製品の技術調査",
          "脆弱性パッケージ監視半自動化の知見",
          "開発企画経験"
        ]
      },
      {
        "category": "データベース設計・最適化",
        "items": [
          "テーブル設計、ER図作成",
          "Entity Framework、Dapperを用いたデータベース操作の経験",
          "データベースのクエリや構造のチューニング経験（SQL Server、Oracle）",
          "複数のデータベース環境での開発経験"
        ]
      },
      {
        "category": "フロントエンド開発",
        "items": [
          "JavaScript、HTML、CSS、Vueによるフロントエンド開発の実務経験",
          "レスポンシブデザインの実装経験"
        ]
      },
      {
        "category": "クラウド・インフラ",
        "items": [
          "Azureでの開発経験（Dev Ops、Pipeline、Key Vault、App Service、Container App、Functions(Linux、Windows)、SQL Database、CosmosDB、AI Search、Open AI、Storage Account）",
          "AWSでの開発経験（Secret Manager、SQS、ECS、ECR、Lambda、Bedrock、Cloudformation）",
          "GCPでの開発経験（Cloud Run、Cloud Function、Storage）",
          "Terraformを用いたインフラのコード化（IaC）経験、コード保守、リソース作成・更新の経験",
          "WSL2でのDocker環境構築・開発経験、イメージファイル、コンポーズymlファイル作成経験"
        ]
      },
      {
        "category": "開発プロセス・自動化",
        "items": [
          "ソースコード管理システム（Git）の実務経験",
          "CI/CDパイプラインを利用経験、パイプラインコードの保守経験",
          "AgileやScrumなどの開発手法の実務経験",
          "Selenium用いたテスト自動化経験"
        ]
      },
      {
        "category": "学習能力",
        "items": [
          "新しい技術の学習能力と知識共有",
          "生成AIを使った業務効率化提案と実装経験",
          "生成AIを使った機能開発、新規開発の経験"
        ]
      }
    ]
  };

  export function generateAboutMeHTML() {
    const section = document.getElementById('about-me-section');

    // タイトルを作成
    const title = document.createElement('h1');
    title.className = 'title pb-3 mb-5';
    title.textContent = aboutMeData.title;
    section.appendChild(title);

    // ディテール行を生成
    const rowDiv = document.createElement('div');
    rowDiv.className = 'row mb-4';

    aboutMeData.details.forEach(detail => {
        const colDiv = document.createElement('div');
        colDiv.className = 'col-sm-6 py-1';

        const span = document.createElement('span');
        span.className = 'fw-medium text-primary';
        span.textContent = `${detail.label}: `;

        const valueText = document.createTextNode(detail.value);

        colDiv.appendChild(span);
        colDiv.appendChild(valueText);
        rowDiv.appendChild(colDiv);
    });

    section.appendChild(rowDiv);

    // 職務概要セクションを追加
    if (aboutMeData.careerSummary && aboutMeData.careerSummary.length > 0) {
      const summaryDiv = document.createElement('div');
      summaryDiv.className = 'mt-5';

      const summaryTitle = document.createElement('h3');
      summaryTitle.className = 'text-primary mb-4';
      summaryTitle.textContent = '職務概要';
      summaryDiv.appendChild(summaryTitle);

      const summaryContentDiv = document.createElement('div');
      summaryContentDiv.className = 'stack-g p-3 mb-4';

      aboutMeData.careerSummary.forEach(paragraph => {
        const p = document.createElement('p');
        p.className = 'mb-3';
        p.textContent = paragraph;
        summaryContentDiv.appendChild(p);
      });

      summaryDiv.appendChild(summaryContentDiv);
      section.appendChild(summaryDiv);
    }

    // スキルセクションを追加
    if (aboutMeData.skills && aboutMeData.skills.length > 0) {
      const skillsDiv = document.createElement('div');
      skillsDiv.className = 'mt-5';

      const skillsTitle = document.createElement('h3');
      skillsTitle.className = 'text-primary mb-4';
      skillsTitle.textContent = '生かせる経験知識・技術';
      skillsDiv.appendChild(skillsTitle);

      aboutMeData.skills.forEach(skillCategory => {
        const categoryDiv = document.createElement('div');
        categoryDiv.className = 'mb-4 stack-g p-3';

        const categoryTitle = document.createElement('h4');
        categoryTitle.className = 'text-primary mb-3';
        categoryTitle.textContent = `■${skillCategory.category}`;
        categoryDiv.appendChild(categoryTitle);

        const skillList = document.createElement('ul');
        skillList.className = 'mb-0';

        skillCategory.items.forEach(item => {
          const listItem = document.createElement('li');
          listItem.className = 'mb-2';
          listItem.textContent = item;
          skillList.appendChild(listItem);
        });

        categoryDiv.appendChild(skillList);
        skillsDiv.appendChild(categoryDiv);
      });

      section.appendChild(skillsDiv);
    }
  }
