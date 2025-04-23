const experienceData = {
  "title": "プロジェクト",
  "companies": [
    {
      "name": "個人事業主（一般社団法人フリーランス連盟の開発業務に従事）",
      "period": "2024年12月 ～ 現在",
      "business": "",
      "capital": "",
      "sales": "",
      "employees": "",
      "listed": "非上場",
      "projects": [
        {
          "period": "2024年12月 ～ 2025年3月",
          "name": "AIラインボットシステムの新規開発",
          "overview": "会社で運営しているLineコミュニティの問い合わせをボットを作成し自動化する",
          "tasks": [
            "技術選定",
            "技術検証",
            "クラウドインフラ設計、terraformでのコード管理",
            "コスト試算",
            "タスク管理"
          ],
          "phases": ["要件定義", "基本設計", "実装"],
          "environment": {
            "os": ["Windows 2011"],
            "languages": ["python3"],
            "frameworks": ["llamaindex"],
            "cloud": ["Open AI", "GCP Functons", "GCP Cloud Storage"],
            "others": ["Git", "pip", "terraform"]
          },
          "role": "リーダー",
          "teamSize": "3名"
        }
      ]
    },
    {
      "name": "個人事業主（株式会社ecbeingの開発業務に従事）",
      "period": "2023年4月 ～ 現在",
      "business": "ECサイト構築、ECサイトデザイン制作、ECビジネスコンサルティング",
      "capital": "10億円",
      "sales": "9億5000万円",
      "employees": "996人",
      "listed": "プライム市場上場",
      "projects": [
        {
          "period": "2024年12月 ～ 2025年3月",
          "name": "AI検索システム新規開発",
          "overview": "Azure AI Searchの利用コスト削減を目的に、必要な機能を厳選した代替システムを構築。AI検索機能および関連データの取り込みプロセスを含むシステム全体の設計と実装を担当。",
          "tasks": [
            "技術選定",
            "技術検証",
            "クラウドインフラ設計、クラウド環境での効率的なインフラ構成設計",
            "コスト試算、運用コスト削減に向けた試算と提案",
            "タスク管理、プロジェクト全体のタスク分割と進捗管理",
            "性能試験結果に基づく改善策の立案とリードエンジニアとの方針決定"
          ],
          "phases": ["要件定義", "基本設計", "実装", "単体テスト", "結合テスト", "性能試験", "負荷試験"],
          "environment": {
            "os": ["Windows 2011", "Debian11"],
            "languages": ["C#"],
            "frameworks": [".net 8"],
            "db": ["SQL Server", "Azure CosmosDB"],
            "cloud": ["Azure Open AI", "Azure App Service", "Azure Functions"],
            "others": ["Git", "terraform"]
          },
          "role": "メンバー",
          "teamSize": "3名"
        },
        {
          "period": "2024年8月 ～ 2024年11月",
          "name": "AIチャットボットシステム コードリファクタリング",
          "overview": "既存機能改修",
          "tasks": [
            "UIコードレビュー、実装",
            "バックエンドAPIのコードレビュー、実装",
            "リファクタリングの概要、コーディングナレッジの共有"
          ],
          "phases": ["基本設計", "実装", "テスト"],
          "environment": {
            "os": ["Windows 2011", "Debian11"],
            "languages": ["C#", "Javascript"],
            "frameworks": [".net 8"],
            "db": ["SQL Server"],
            "cloud": ["Azure App Service", "Azure Functions"],
            "others": ["Git"]
          },
          "role": "リーダー",
          "teamSize": "3名"
        },
        {
          "period": "2024年5月 ～ 2024年7月",
          "name": "各マイクロサービス 認証機能改修プロジェクト",
          "overview": "既存機能改修",
          "tasks": [
            "TOTP二要素認証における現状の課題の把握",
            "各マイクロサービスのバージョンに応じた対応方針の決定",
            "チーム全体に課題の内容を共有",
            "基本設計書の作成、設計書概要のチーム共有",
            "実装、テストケース作成、リリース"
          ],
          "phases": ["要件定義", "基本設計", "詳細設計", "実装", "テスト", "リリース"],
          "environment": {
            "os": ["Windows 2011", "Debian11"],
            "languages": ["C#", "Typescript"],
            "frameworks": [".net 6", ".net standard 2", "vue 3", "TSQL"],
            "db": ["MySQL", "SQL Server"],
            "cloud": ["Azure App Service", "AKS", "Azure Dev Ops"],
            "others": ["node.js", "Git", "Docker", "WSL2", "Selenium", "ChatGPT4o", "Github Copilot"]
          },
          "role": "リーダー",
          "teamSize": "3名"
        },
        {
          "period": "2024年3月 ～ 2024年4月",
          "name": "ecbeing社導入保守チーム向け ECパッケージ導入後保守システム",
          "overview": "新規機能追加",
          "tasks": [
            "保守システムのPDMに対して実装方針の説明",
            "保守運用作業で使われるOS、WEBアプリケーション情報取得方法調査"
          ],
          "phases": ["要件定義", "基本設計", "詳細設計", "実装", "テスト", "リリース"],
          "environment": {
            "os": ["Windows S2016", "Windows S2019", "Windows S2022"],
            "languages": ["C#", "Powershell"],
            "frameworks": [".net 6", ".net framework 4.6.2", ".net standard 2", "TSQL"],
            "cloud": ["Azure Dev Ops"],
            "others": ["Git", "ChatGPT4o", "Github Copilot"]
          },
          "role": "メンバー",
          "teamSize": "3名"
        },
        {
          "period": "2023年6月 ～ 2024年2月 (9ヶ月間)",
          "name": "各マイクロサービス、ECパッケージチーム向け SSO機能改修プロジェクト",
          "overview": "各マイクロサービス、ECパッケージに新形式のSSO機能の改修を行う",
          "tasks": [
            "SSOに使われるライブラリ調査",
            "既存SSO機能の調査",
            "マイクロサービスの各バージョンに応じたSSO機能の実装",
            "SSOに使われるDBの設計",
            "他マイクロサービスに対するSSO導入支援",
            "各マイクロサービスのPDMやスクラムマスターに対するSSOの変更点の説明"
          ],
          "phases": ["要件定義", "基本設計", "詳細設計", "実装", "テスト", "リリース"],
          "environment": {
            "os": ["Windows 2011", "Debian11"],
            "languages": ["C#", "Typescript"],
            "frameworks": [".net 8", ".net 6", ".net framework 4.8", ".net framework 4.5", ".net standard 2", "vue 2", "vue 3", "TSQL"],
            "db": ["MySQL", "SQL Server"],
            "cloud": ["Azure App Service", "AKS", "Azure Dev Ops"],
            "others": ["node.js", "Git", "Docker", "WSL2", "Selenium", "ChatGPT4o", "Github Copilot"]
          },
          "role": "メンバー",
          "teamSize": "3名"
        },
        {
          "period": "2023年4月 ～ 2023年5月 (2ヶ月間)",
          "name": "各マイクロサービスチーム向け 保守プロジェクト",
          "overview": "各マイクロサービスのライブラリのバージョンアップを行う",
          "tasks": [
            "脆弱性のあるライブラリのチェック",
            "ライブラリの更新",
            "ライブラリ更新における性能の影響調査",
            "有料化されたライブラリの代替ライブラリ選定"
          ],
          "phases": ["実装", "テスト", "リリース"],
          "environment": {
            "os": ["Windows 2011", "Debian11"],
            "languages": ["C#", "Typescript"],
            "frameworks": [".net 8", ".net 6", ".net framework 4.8", ".net framework 4.5", ".net standard 2", "vue 2", "vue 3", "TSQL"],
            "db": ["MySQL", "SQL Server"],
            "cloud": ["Azure App Service", "AKS", "Azure Dev Ops"],
            "others": ["node.js", "Git", "Docker", "WSL2", "Selenium", "Playwright", "ChatGPT", "Github Copilot"]
          },
          "role": "メンバー",
          "teamSize": "2名"
        }
      ]
    },
    {
      "name": "デロイトトーマツリップルマーク合同会社",
      "period": "2019年5月 ～ 2023年3月",
      "business": "開発支援",
      "capital": "2000万円",
      "sales": "",
      "employees": "160人",
      "listed": "非上場",
      "projects": [
        {
          "period": "2020年2月 ～ 2023年1月 (3年)",
          "name": "食品製造・小売業向け ワークフローWEBシステム",
          "overview": "新規機能追加、改修",
          "tasks": [
            "新規申請書画面追加、CSV出力",
            "新規帳票レイアウト作成、PDF出力等",
            "データ移行用、情報参照用管理画面の追加",
            "障害対応、調査",
            "既存SQLの修正",
            "DBチューニング、18秒→6秒に検索速度を改善",
            "Seleniumを利用した受入テストの自動化",
            "Git運用方法・ルールの策定"
          ],
          "phases": ["要件定義", "基本設計", "詳細設計", "実装", "テスト", "リリース"],
          "environment": {
            "languages": ["C#", "VB.net", "VBA", "Java", "Javascript", "Html", "CSS", "TSQL", "PL/SQL"],
            "frameworks": [".net standard2", ".net framework4.5", ".net framework4.8", ".net core3"],
            "db": ["Oracle 11g", "Sql Server 2012", "Sql Server 2015", "Sql Server 2017"],
            "others": ["CrystalReport", "AWS EC2", "Visual Studio 2012", "Visual Studio 2017", "Visual StudiAo 2019", "Eclips", "Git", "SVN", "Jquery", "Backlog", "Selenium"]
          },
          "role": "メンバー",
          "teamSize": "10名"
        },
        {
          "period": "2019年8月 ～ 2020年1月 (6ヶ月間)",
          "name": "食品製造業向けワークフローWEBシステム",
          "overview": "新規機能追加、改修",
          "tasks": [
            "既存画面のカスタマイズ",
            "障害対応、調査",
            "既存SQLの修正",
            "DBチューニング、検索速度を24秒→4秒に改善",
            "データ移行用のSQL Server プロシージャの作成"
          ],
          "phases": ["要件定義", "基本設計", "詳細設計", "実装", "テスト", "リリース"],
          "environment": {
            "os": ["windows 10"],
            "languages": ["C# 5", "TSQL"],
            "frameworks": [".net framework 4.5"],
            "db": ["Sql Server 2015"],
            "others": ["Git", "SVN", "Visual Studio 2019"]
          },
          "role": "メンバー",
          "teamSize": "34名"
        },
        {
          "period": "2019年5月 ～ 2019年7月 (3ヶ月間)",
          "name": "金融・保険業向け 保険サービスの申込書データ取り込みシステム",
          "overview": "既存システムのSQLのチューニング",
          "tasks": [
            "既存SQLの修正",
            "DBチューニング、検索速度30秒→6秒に改善"
          ],
          "phases": ["要件定義", "基本設計", "詳細設計", "実装", "テスト", "リリース"],
          "environment": {
            "os": ["windows 10"],
            "languages": ["C# 5", "TSQL"],
            "frameworks": [".net framework 4.5"],
            "db": ["Sql Server 2015"],
            "others": ["Git", "SVN", "Visual Studio 2019"]
          },
          "role": "メンバー",
          "teamSize": "6名"
        }
      ]
    },
    {
      "name": "株式会社アーネット",
      "period": "2016年4月 ～ 2019年3月",
      "business": "開発支援",
      "capital": "1000万円",
      "sales": "3億4000万円",
      "employees": "41人",
      "listed": "非上場",
      "projects": [
        {
          "period": "2017年7月 ～ 2019年3月 (1年9ヶ月間)",
          "name": "小売業向け自動倉庫管理システム",
          "overview": "お客様向けに自動倉庫システムパッケージのカスタマイズ、導入、運用・保守",
          "tasks": [
            "新規バッチ作成 WMSと連携して、Android携帯に在庫の出庫個数をメールにて連携するシステムの開発",
            "既存画面のカスタマイズ 荷物搬送先の搬送可能チェック処理を修正",
            "WMSパッケージの現地導入、保守、障害対応、現地にて運用テストスケジュール調整",
            "導入実績3社 ※導入1社目：チーム規模2名：リーダーとして参画 ※導入2社目：チーム規模6名：メンバーとして参画 ※導入3社目：チーム規模15名：サブリーダーとして参画",
            "人員動員交渉（1人）"
          ],
          "phases": ["要件定義", "基本設計", "詳細設計", "実装", "テスト", "リリース"],
          "environment": {
            "os": ["Windows 10", "Windows 7", "Windows Embeded", "Windows S2012"],
            "languages": ["C#", "VB.net", "VBA", "MUMPS", "PL/SQL"],
            "frameworks": [".net 4.5"],
            "db": ["Oracle", "CACHE"],
            "others": ["Git", "SVN", "Visual Studio 2015"]
          },
          "role": "メンバー",
          "teamSize": "2~15名"
        },
        {
          "period": "2016年8月 ～ 2017年6月 (11ヶ月間)",
          "name": "バス位置情報管理システム保守チーム向け バス情報の保守ツールの開発",
          "overview": "保守ツールの新規開発",
          "tasks": [
            "既存システム改修 ログ出力内容のカスタマイズ",
            "保守、メンテナンス 専用ツールを使った停留所情報補正",
            "新規ツール作成 バスの廃止、導入に伴う、バス情報のメンテナンス業務をエンジニア以外でも行えるような保守ツールの開発",
            "負荷、耐久テスト実施 負荷テストケースの作成、実施",
            "人員動員交渉（1人）"
          ],
          "phases": ["要件定義", "基本設計", "詳細設計", "実装", "テスト", "リリース"],
          "environment": {
            "os": ["Windows 10"],
            "languages": ["C#", "VBA", "Javascript", "HTML", "CSS"],
            "frameworks": [".net 4.5", "ASP.net 4.5"],
            "db": ["SQL Server2012", "PostgresSql"],
            "others": ["Jmeter", "Git"]
          },
          "role": "メンバー",
          "teamSize": "6名"
        },
        {
          "period": "2016年4月 ～ 2016年7月 (4ヶ月間)",
          "name": "総合商社向け 3Dプリクラ撮影システム",
          "overview": "Kinect 制御プログラム開発",
          "tasks": [
            "Kinect制御用新規バッチ作成",
            "Kinect制御用UI新規ツール作成",
            "構築後の撮影データの評価"
          ],
          "phases": ["要件定義", "基本設計", "詳細設計", "実装", "テスト", "リリース"],
          "environment": {
            "os": ["Windows 10"],
            "languages": ["C++"],
            "frameworks": [".net 4.5"],
            "others": ["Recfusion SDK", "Visual Studio 2015"]
          },
          "role": "メンバー",
          "teamSize": "2名"
        }
      ]
    }
  ]
};

export function generateExperienceHTML() {
  const section = document.getElementById('experience-section');

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
