const servicesData = {
  "title": "Services",
  "services": [
    {
      "icon": "fa-laptop-code",
      "title": "Backend Development",
      "description": "I am skilled in developing applications using C# and .NET."
    },
    {
      "icon": "fa-code",
      "title": "Web Design",
      "description": "I also create websites using WordPress."
    },
    {
      "icon": "fa-database",
      "title": "Database Design",
      "description": "Experienced with SQL Server, MySQL, and Oracle database design and optimization."
    },
    {
      "icon": "fa-cloud",
      "title": "Cloud Services",
      "description": "Working with AWS and Azure cloud platforms for scalable solutions."
    }
  ]
};

export function generateServicesHTML() {
  const section = document.getElementById('services-section');

  // タイトルを作成
  const title = document.createElement('h1');
  title.className = 'title pb-3 mb-5';
  title.textContent = servicesData.title;
  section.appendChild(title);

  // 行を作成
  const rowDiv = document.createElement('div');
  rowDiv.className = 'row g-4';

  // サービス項目を自動生成
  servicesData.services.forEach(service => {
      const colDiv = document.createElement('div');
      colDiv.className = 'col-md-6';

      const serviceItemDiv = document.createElement('div');
      serviceItemDiv.className = 'service-item';

      const iconElement = document.createElement('i');
      iconElement.className = `fa fa-2x ${service.icon} mx-auto mb-4`;

      const h5Element = document.createElement('h5');
      h5Element.className = 'mb-2';
      h5Element.textContent = service.title;

      const pElement = document.createElement('p');
      pElement.className = 'mb-0';
      pElement.textContent = service.description;

      // サービスアイテムに要素を追加
      serviceItemDiv.appendChild(iconElement);
      serviceItemDiv.appendChild(h5Element);
      serviceItemDiv.appendChild(pElement);

      // 列にサービスアイテムを追加
      colDiv.appendChild(serviceItemDiv);

      // 行に列を追加
      rowDiv.appendChild(colDiv);
  });

  // section に行を追加
  section.appendChild(rowDiv);
}
