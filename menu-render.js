(() => {
  const root = document.getElementById('menu-pages');
  const money = n => `${n} TL`;

  window.SORA_MENU.forEach((page, index) => {
    const section = document.createElement('section');
    section.className = 'menu-page';
    if (page.dense) section.classList.add('dense');
    if (page.extraDense) section.classList.add('extra-dense');
    section.id = page.id;

    const content = document.createElement('div');
    content.className = 'menu-content';

    const title = document.createElement('h2');
    title.className = 'page-title';
    title.textContent = page.title;
    content.appendChild(title);

    if (page.subtitle) {
      const sub = document.createElement('div');
      sub.className = 'page-subtitle';
      sub.textContent = page.subtitle;
      content.appendChild(sub);
    }

    page.sections.forEach(group => {
      const groupEl = document.createElement('div');
      groupEl.className = 'menu-group';
      if (group.title) {
        const h = document.createElement('h3');
        h.className = 'group-title';
        h.textContent = group.title;
        groupEl.appendChild(h);
      }
      group.items.forEach(item => {
        const row = document.createElement('div');
        row.className = 'menu-item';
        const main = document.createElement('div');
        main.className = 'item-main';
        main.innerHTML = `<span class="flower">✤</span><span class="item-name"></span><span class="leader"></span><span class="item-price"></span>`;
        main.querySelector('.item-name').textContent = item.name;
        main.querySelector('.item-price').textContent = money(item.price);
        row.appendChild(main);
        if (item.description) {
          const desc = document.createElement('div');
          desc.className = 'item-description';
          desc.textContent = item.description;
          row.appendChild(desc);
        }
        groupEl.appendChild(row);
      });
      content.appendChild(groupEl);
    });

    section.appendChild(content);
    root.appendChild(section);
  });
})();
