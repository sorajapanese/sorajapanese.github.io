(function () {
  const iconMap = {
    spicy: { src: 'assets/icons/spicy-master.png', label: 'Acı' },
    vegetarian: { src: 'assets/icons/vegetarian.svg', label: 'Vejetaryen' },
    raw: { src: 'assets/icons/raw-master.png', label: 'Çiğ' },
    seafood: { src: 'assets/icons/seafood.svg', label: 'Deniz ürünü' }
  };

  function positionPanel(page, panel, anchor, options = {}) {
    if (!page || !panel || !anchor) return;

    const pageRect = page.getBoundingClientRect();
    const anchorRect = anchor.getBoundingClientRect();
    const pageHeight = pageRect.height;
    const panelHeight = panel.getBoundingClientRect().height;
    const gap = pageHeight * (options.gap ?? 0.008);
    const minTop = pageHeight * (options.minTop ?? 0.20);
    const maxBottom = pageHeight * (options.maxBottom ?? 0.94);
    const anchorTop = anchorRect.top - pageRect.top;
    const anchorBottom = anchorRect.bottom - pageRect.top;

    let top = anchorBottom + gap;
    if (top + panelHeight > maxBottom) {
      top = anchorTop - panelHeight - gap;
    }

    const maxTop = Math.max(minTop, maxBottom - panelHeight);
    panel.style.top = `${Math.max(minTop, Math.min(top, maxTop))}px`;
  }

  function setHotspotGeometry(button, rowTops, index) {
    const top = rowTops[index];
    const previousGap = index > 0 ? top - rowTops[index - 1] : Infinity;
    const nextGap = index < rowTops.length - 1 ? rowTops[index + 1] - top : Infinity;
    const nearestGap = Math.min(previousGap, nextGap);
    const safeHeight = Number.isFinite(nearestGap) ? nearestGap * 0.90 : 3;

    button.style.top = `${top}%`;
    button.style.height = `${safeHeight}%`;
  }

  function ensureNutritionPanel(container) {
    const page = container.closest('.menu-page');
    if (!page) return null;

    let panel = page.querySelector('.nutrition-panel');
    if (panel) return panel;

    panel = document.createElement('section');
    panel.className = 'nutrition-panel';
    panel.setAttribute('aria-live', 'polite');
    panel.innerHTML = `
      <button class="nutrition-close" type="button" aria-label="Besin bilgisini kapat">×</button>
      <div class="nutrition-head">
        <span class="nutrition-name"></span>
        <span class="nutrition-kcal"></span>
      </div>
      <div class="nutrition-macros"></div>
      <div class="nutrition-allergens"></div>`;
    page.appendChild(panel);

    panel.querySelector('.nutrition-close').addEventListener('click', () => {
      closeNutritionPanel(page);
    });

    return panel;
  }

  function closeNutritionPanel(page) {
    const panel = page.querySelector('.nutrition-panel');
    if (panel) panel.classList.remove('is-open');
    page.querySelectorAll('.nutrition-toggle.is-active').forEach((button) => {
      button.classList.remove('is-active');
      button.textContent = '+';
      button.setAttribute('aria-expanded', 'false');
    });
  }

  function openNutritionPanel(container, row, item, button) {
    const page = container.closest('.menu-page');
    const panel = ensureNutritionPanel(container);
    if (!page || !panel || !item.nutrition) return;

    if (button.classList.contains('is-active')) {
      closeNutritionPanel(page);
      return;
    }

    closeNutritionPanel(page);
    button.classList.add('is-active');
    button.textContent = '−';
    button.setAttribute('aria-expanded', 'true');

    const n = item.nutrition;
    panel.querySelector('.nutrition-name').textContent = item.name;
    panel.querySelector('.nutrition-kcal').textContent = `≈ ${n.kcal} kcal`;
    panel.querySelector('.nutrition-macros').innerHTML = `
      <span>Protein <strong>${n.protein} g</strong></span>
      <span>Karbonhidrat <strong>${n.carbs} g</strong></span>
      <span>Yağ <strong>${n.fat} g</strong></span>`;
    panel.querySelector('.nutrition-allergens').innerHTML =
      `<strong>Alerjenler:</strong> ${n.allergens.join(', ')}`;

    panel.classList.add('is-open');

    positionPanel(page, panel, row, { minTop: 0.245, maxBottom: 0.91 });
  }

  function renderMenu(containerId, items) {
    const container = document.getElementById(containerId);
    if (!container || !Array.isArray(items)) return;

    const fragment = document.createDocumentFragment();

    items.forEach((item) => {
      if (item.type === 'heading') {
        const headingRow = document.createElement('div');
        headingRow.className = 'menu-heading';

        const headingFlower = document.createElement('img');
        headingFlower.className = 'heading-flower';
        headingFlower.src = 'assets/menu-flower-master.png';
        headingFlower.alt = '';
        headingFlower.setAttribute('aria-hidden', 'true');

        const heading = document.createElement('span');
        heading.className = 'section-heading';
        heading.textContent = item.title;

        headingRow.append(headingFlower, heading);
        fragment.appendChild(headingRow);
        return;
      }

      const row = document.createElement('div');
      row.className = 'menu-item';

      const flower = document.createElement('img');
      flower.className = 'menu-flower';
      flower.src = 'assets/menu-flower-master.png';
      flower.alt = '';
      flower.setAttribute('aria-hidden', 'true');

      const content = document.createElement('span');
      content.className = 'item-content';

      const name = document.createElement('span');
      name.className = 'item-name';
      name.textContent = item.name;
      content.appendChild(name);

      if (Array.isArray(item.icons) && item.icons.length) {
        const icons = document.createElement('span');
        icons.className = 'item-icons';

        item.icons.forEach((key) => {
          const def = iconMap[key];
          if (!def) return;
          const icon = document.createElement('img');
          icon.className = 'item-icon';
          icon.src = def.src;
          icon.alt = def.label;
          icon.title = def.label;
          icons.appendChild(icon);
        });

        content.appendChild(icons);
      }

      const leader = document.createElement('span');
      leader.className = 'leader';
      leader.setAttribute('aria-hidden', 'true');

      const price = document.createElement('span');
      price.className = 'item-price';
      price.textContent = item.price;

      row.append(flower, content, leader, price);

      if (item.nutrition) {
        row.classList.add('has-nutrition');
        const toggle = document.createElement('button');
        toggle.className = 'nutrition-toggle';
        toggle.type = 'button';
        toggle.textContent = '+';
        toggle.setAttribute('aria-label', `${item.name} besin değerlerini aç`);
        toggle.setAttribute('aria-expanded', 'false');
        toggle.addEventListener('click', (event) => {
          event.stopPropagation();
          openNutritionPanel(container, row, item, toggle);
        });
        row.appendChild(toggle);
      }

      fragment.appendChild(row);
    });

    container.replaceChildren(fragment);
  }



  function renderPage5Coded(items) {
    const page = document.querySelector('.page5-coded-page');
    const container = document.getElementById('page5-coded-menu');
    if (!page || !container || !Array.isArray(items)) return;

    const maki = items.slice(0, 7);
    const veg = items.slice(7);
    const fragment = document.createDocumentFragment();

    const addHeading = (title, extraClass = '') => {
      const heading = document.createElement('div');
      heading.className = `page5-coded-heading${extraClass ? ' ' + extraClass : ''}`;
      const flower = document.createElement('img');
      flower.src = 'assets/menu-flower-master.png';
      flower.alt = '';
      flower.setAttribute('aria-hidden', 'true');
      const label = document.createElement('span');
      label.textContent = title;
      heading.append(flower, label);
      fragment.appendChild(heading);
    };

    let panel = page.querySelector('.page5-coded-panel');
    if (!panel) {
      panel = document.createElement('section');
      panel.className = 'page5-coded-panel';
      panel.setAttribute('aria-live', 'polite');
      panel.innerHTML = `
        <button class="page5-coded-close" type="button" aria-label="Besin bilgisini kapat">×</button>
        <div class="page5-coded-panel-head"><span class="page5-coded-panel-name"></span><span class="page5-coded-panel-kcal"></span></div>
        <div class="page5-coded-panel-macros"></div>
        <div class="page5-coded-panel-allergens"></div>`;
      page.appendChild(panel);
    }

    const close = () => {
      panel.classList.remove('is-open');
      container.querySelectorAll('.page5-coded-toggle.is-active').forEach(btn => {
        btn.classList.remove('is-active');
        btn.textContent = '+';
        btn.setAttribute('aria-expanded', 'false');
      });
    };
    panel.querySelector('.page5-coded-close').addEventListener('click', close);

    const addItem = (item, extraClass = '') => {
      const row = document.createElement('div');
      row.className = `page5-coded-item${item.description ? ' has-description' : ''}${extraClass ? ' ' + extraClass : ''}`;

      const flower = document.createElement('img');
      flower.className = 'page5-coded-flower';
      flower.src = 'assets/menu-flower-master.png';
      flower.alt = '';
      flower.setAttribute('aria-hidden', 'true');

      const copy = document.createElement('div');
      copy.className = 'page5-coded-copy';
      const topline = document.createElement('span');
      topline.className = 'page5-coded-topline';
      const name = document.createElement('span');
      name.className = 'page5-coded-name';
      name.textContent = item.name;
      topline.appendChild(name);

      if (Array.isArray(item.icons) && item.icons.length) {
        const icons = document.createElement('span');
        icons.className = 'page5-coded-icons';
        item.icons.forEach(key => {
          const def = iconMap[key];
          if (!def) return;
          const icon = document.createElement('img');
          icon.className = 'page5-coded-icon';
          icon.src = def.src;
          icon.alt = def.label;
          icon.title = def.label;
          icons.appendChild(icon);
        });
        topline.appendChild(icons);
      }
      copy.appendChild(topline);

      let desc = null;
      if (item.description) {
        desc = document.createElement('span');
        desc.className = 'page5-coded-desc';
        desc.textContent = item.description;
      }

      const leader = document.createElement('span');
      leader.className = 'page5-coded-leader';
      leader.setAttribute('aria-hidden', 'true');

      const price = document.createElement('span');
      price.className = 'page5-coded-price';
      price.textContent = item.price;

      const toggle = document.createElement('button');
      toggle.className = 'page5-coded-toggle';
      toggle.type = 'button';
      toggle.textContent = '+';
      toggle.setAttribute('aria-label', `${item.name} besin değerlerini aç`);
      toggle.setAttribute('aria-expanded', 'false');
      toggle.addEventListener('click', () => {
        if (!item.nutrition) return;
        if (toggle.classList.contains('is-active')) { close(); return; }
        close();
        toggle.classList.add('is-active');
        toggle.textContent = '−';
        toggle.setAttribute('aria-expanded', 'true');
        const n = item.nutrition;
        panel.querySelector('.page5-coded-panel-name').textContent = item.name;
        panel.querySelector('.page5-coded-panel-kcal').textContent = `≈ ${n.kcal} kcal`;
        panel.querySelector('.page5-coded-panel-macros').innerHTML = `
          <span>Protein <strong>${n.protein} g</strong></span>
          <span>Karbonhidrat <strong>${n.carbs} g</strong></span>
          <span>Yağ <strong>${n.fat} g</strong></span>`;
        panel.querySelector('.page5-coded-panel-allergens').innerHTML = `<strong>Alerjenler:</strong> ${n.allergens.join(', ')}`;
        panel.classList.add('is-open');

        positionPanel(page, panel, row, { minTop: 0.23, maxBottom: 0.91, gap: 0.009 });
      });

      row.append(flower, copy, leader, price, toggle);
      if (desc) row.appendChild(desc);
      fragment.appendChild(row);
    };

    addHeading('MAKI ROLLS');
    maki.forEach(addItem);
    addHeading('VEJETARYEN ROLLS', 'page5-veg-heading');
    veg.forEach((item, index) => addItem(item, `page5-veg-item${index === veg.length - 1 ? ' page5-veg-item-last' : ''}`));
    container.replaceChildren(fragment);
  }


  function initPage4Nutrition() {
    const page = document.querySelector('.page4-nutrition-page');
    const layer = document.getElementById('page4-nutrition-hotspots');
    if (!page || !layer || typeof menuPages === 'undefined' || !Array.isArray(menuPages.page4)) return;

    const products = menuPages.page4.filter(item => item.type !== 'heading' && item.nutrition);
    const rowTops = [43.35,46.55,49.75,52.95,56.15,59.35,62.55,65.75,76.35,79.55,82.75,85.95,89.15];

    const panel = document.createElement('section');
    panel.className = 'page4-nutrition-panel';
    panel.setAttribute('aria-live','polite');
    panel.innerHTML = `
      <button class="page4-nutrition-close" type="button" aria-label="Besin bilgisini kapat">×</button>
      <div class="page4-nutrition-head">
        <span class="page4-nutrition-name"></span>
        <span class="page4-nutrition-kcal"></span>
      </div>
      <div class="page4-nutrition-macros"></div>
      <div class="page4-nutrition-allergens"></div>`;
    page.appendChild(panel);

    const close = () => {
      panel.classList.remove('is-open');
      layer.querySelectorAll('.page4-nutrition-button.is-active').forEach(btn => {
        btn.classList.remove('is-active');
        btn.textContent = '+';
        btn.setAttribute('aria-expanded','false');
      });
    };
    panel.querySelector('.page4-nutrition-close').addEventListener('click', close);

    products.forEach((item, i) => {
      const btn = document.createElement('button');
      btn.className = 'page4-nutrition-button';
      btn.type = 'button';
      btn.textContent = '+';
      btn.style.top = `${rowTops[i]}%`;
      btn.setAttribute('aria-label', `${item.name} besin değerlerini aç`);
      btn.setAttribute('aria-expanded','false');
      btn.addEventListener('click', () => {
        if (btn.classList.contains('is-active')) { close(); return; }
        close();
        btn.classList.add('is-active');
        btn.textContent = '−';
        btn.setAttribute('aria-expanded','true');

        const n = item.nutrition;
        panel.querySelector('.page4-nutrition-name').textContent = item.name;
        panel.querySelector('.page4-nutrition-kcal').textContent = `≈ ${n.kcal} kcal`;
        panel.querySelector('.page4-nutrition-macros').innerHTML = `
          <span>Protein <strong>${n.protein} g</strong></span>
          <span>Karbonhidrat <strong>${n.carbs} g</strong></span>
          <span>Yağ <strong>${n.fat} g</strong></span>`;
        const allergens = n.allergens.length === 1 && n.allergens[0] === '—' ? 'Belirgin alerjen yok' : n.allergens.join(', ');
        panel.querySelector('.page4-nutrition-allergens').innerHTML = `<strong>Alerjenler:</strong> ${allergens}`;

        panel.classList.add('is-open');
        const pageH = page.getBoundingClientRect().height;
        const estimatedH = pageH * .09;
        let topPct = rowTops[i] + 2.1;
        if ((topPct/100 * pageH) + estimatedH > pageH * .91) topPct = rowTops[i] - 10.2;
        topPct = Math.max(36, Math.min(topPct, 82));
        panel.style.top = `${topPct}%`;
      });
      layer.appendChild(btn);
    });
  }




  function initPage5Nutrition() {
    const page = document.querySelector('.page5-approved-page');
    const layer = document.getElementById('page5-nutrition-hotspots');
    if (!page || !layer || typeof menuPages === 'undefined' || !Array.isArray(menuPages.page5)) return;

    const products = menuPages.page5.filter(item => item.type !== 'heading' && item.nutrition);
    // Approved locked artwork: clickable nutrition hotspots sit directly over the drawn + symbols.
    const rowTops = [29.185, 32.914, 36.644, 40.373, 44.102, 47.749, 51.478, 65.401, 74.682, 84.130];

    const panel = document.createElement('section');
    panel.className = 'page5-nutrition-panel';
    panel.setAttribute('aria-live', 'polite');
    panel.innerHTML = `
      <button class="page5-nutrition-close" type="button" aria-label="Besin bilgisini kapat">×</button>
      <div class="page5-nutrition-head">
        <span class="page5-nutrition-name"></span>
        <span class="page5-nutrition-kcal"></span>
      </div>
      <div class="page5-nutrition-macros"></div>
      <div class="page5-nutrition-allergens"></div>`;
    page.appendChild(panel);

    const close = () => {
      panel.classList.remove('is-open');
      layer.querySelectorAll('.page5-nutrition-button.is-active').forEach(btn => {
        btn.classList.remove('is-active');
        btn.setAttribute('aria-expanded', 'false');
      });
    };

    panel.querySelector('.page5-nutrition-close').addEventListener('click', close);

    products.forEach((item, i) => {
      const btn = document.createElement('button');
      btn.className = 'page5-nutrition-button';
      btn.type = 'button';
      btn.style.top = `${rowTops[i]}%`;
      btn.setAttribute('aria-label', `${item.name} besin değerlerini aç`);
      btn.setAttribute('aria-expanded', 'false');

      btn.addEventListener('click', () => {
        if (btn.classList.contains('is-active')) { close(); return; }
        close();
        btn.classList.add('is-active');
        btn.setAttribute('aria-expanded', 'true');

        const n = item.nutrition;
        panel.querySelector('.page5-nutrition-name').textContent = item.name;
        panel.querySelector('.page5-nutrition-kcal').textContent = `≈ ${n.kcal} kcal`;
        panel.querySelector('.page5-nutrition-macros').innerHTML = `
          <span>Protein <strong>${n.protein} g</strong></span>
          <span>Karbonhidrat <strong>${n.carbs} g</strong></span>
          <span>Yağ <strong>${n.fat} g</strong></span>`;
        const allergens = n.allergens.length === 1 && n.allergens[0] === '—' ? 'Belirgin alerjen yok' : n.allergens.join(', ');
        panel.querySelector('.page5-nutrition-allergens').innerHTML = `<strong>Alerjenler:</strong> ${allergens}`;

        panel.classList.add('is-open');
        const pageH = page.getBoundingClientRect().height;
        const estimatedH = pageH * .09;
        let topPct = rowTops[i] + 2.4;
        if ((topPct / 100 * pageH) + estimatedH > pageH * .91) topPct = rowTops[i] - 10.4;
        topPct = Math.max(24, Math.min(topPct, 82));
        panel.style.top = `${topPct}%`;
      });
      layer.appendChild(btn);
    });
  }


  function initPage6Nutrition() {
    const page = document.querySelector('.page6-approved-page');
    const layer = document.getElementById('page6-nutrition-hotspots');
    if (!page || !layer || typeof menuPages === 'undefined' || !Array.isArray(menuPages.page6)) return;

    const products = menuPages.page6.filter(item => item.nutrition);
    // Onaylı görseldeki ürün satırlarının dikey merkezleri (yüzde).
    const rowTops = [35.08, 39.85, 44.96, 51.52, 58.22, 63.33, 69.96, 74.95, 81.42, 87.55];

    const panel = document.createElement('section');
    panel.className = 'page6-nutrition-panel';
    panel.setAttribute('aria-live', 'polite');
    panel.innerHTML = `
      <button class="page6-nutrition-close" type="button" aria-label="Besin bilgisini kapat">×</button>
      <div class="page6-nutrition-head">
        <span class="page6-nutrition-name"></span>
        <span class="page6-nutrition-kcal"></span>
      </div>
      <div class="page6-nutrition-macros"></div>
      <div class="page6-nutrition-allergens"></div>`;
    page.appendChild(panel);

    const close = () => {
      panel.classList.remove('is-open');
      layer.querySelectorAll('.page6-nutrition-button.is-active').forEach(btn => {
        btn.classList.remove('is-active');
        btn.textContent = '+';
        btn.setAttribute('aria-expanded', 'false');
      });
    };

    panel.querySelector('.page6-nutrition-close').addEventListener('click', close);

    products.forEach((item, i) => {
      const btn = document.createElement('button');
      btn.className = 'page6-nutrition-button';
      btn.type = 'button';
      btn.textContent = '+';
      btn.style.top = `${rowTops[i]}%`;
      btn.setAttribute('aria-label', `${item.name} besin ve alerjen bilgilerini aç`);
      btn.setAttribute('aria-expanded', 'false');

      btn.addEventListener('click', () => {
        if (btn.classList.contains('is-active')) { close(); return; }
        close();
        btn.classList.add('is-active');
        btn.textContent = '−';
        btn.setAttribute('aria-expanded', 'true');

        const n = item.nutrition;
        panel.querySelector('.page6-nutrition-name').textContent = item.name;
        panel.querySelector('.page6-nutrition-kcal').textContent = `≈ ${n.kcal} kcal`;
        panel.querySelector('.page6-nutrition-macros').innerHTML = `
          <span>Protein <strong>${n.protein} g</strong></span>
          <span>Karbonhidrat <strong>${n.carbs} g</strong></span>
          <span>Yağ <strong>${n.fat} g</strong></span>`;
        panel.querySelector('.page6-nutrition-allergens').innerHTML =
          `<strong>Alerjenler:</strong> ${n.allergens.join(', ')}`;

        panel.classList.add('is-open');
        const pageH = page.getBoundingClientRect().height;
        const estimatedH = pageH * .09;
        let topPct = rowTops[i] + 2.4;
        if ((topPct / 100 * pageH) + estimatedH > pageH * .91) topPct = rowTops[i] - 10.4;
        topPct = Math.max(29, Math.min(topPct, 82));
        panel.style.top = `${topPct}%`;
      });
      layer.appendChild(btn);
    });
  }


  function renderRollCoded(page, container, items, topPct, heightPct) {
    if (!page || !container || !Array.isArray(items)) return;

    container.style.top = `${topPct}%`;
    container.style.height = `${heightPct}%`;
    container.style.gridTemplateRows = `repeat(${Math.max(items.length, 1)}, minmax(0, 1fr))`;

    let panel = page.querySelector('.page7-coded-panel');
    if (!panel) {
      panel = document.createElement('section');
      panel.className = 'page7-coded-panel';
      panel.setAttribute('aria-live', 'polite');
      panel.innerHTML = `
        <button class="page7-coded-close" type="button" aria-label="Besin bilgisini kapat">×</button>
        <div class="page7-coded-panel-head"><span class="page7-coded-panel-name"></span><span class="page7-coded-panel-kcal"></span></div>
        <div class="page7-coded-panel-macros"></div>
        <div class="page7-coded-panel-allergens"></div>`;
      page.appendChild(panel);
    }

    const close = () => {
      panel.classList.remove('is-open');
      container.querySelectorAll('.page7-coded-toggle.is-active').forEach(btn => {
        btn.classList.remove('is-active');
        btn.textContent = '+';
        btn.setAttribute('aria-expanded', 'false');
      });
    };
    panel.querySelector('.page7-coded-close').addEventListener('click', close);

    const fragment = document.createDocumentFragment();
    items.forEach((item) => {
      const row = document.createElement('div');
      row.className = 'page7-coded-item';

      const flower = document.createElement('img');
      flower.className = 'page7-coded-flower';
      flower.src = 'assets/menu-flower-master.png';
      flower.alt = '';
      flower.setAttribute('aria-hidden', 'true');

      const copy = document.createElement('div');
      copy.className = 'page7-coded-copy';
      const topline = document.createElement('div');
      topline.className = 'page7-coded-topline';
      const name = document.createElement('span');
      name.className = 'page7-coded-name';
      name.textContent = item.name;
      topline.appendChild(name);

      if (Array.isArray(item.icons) && item.icons.length) {
        const icons = document.createElement('span');
        icons.className = 'page7-coded-icons';
        item.icons.forEach((key) => {
          const def = iconMap[key];
          if (!def) return;
          const icon = document.createElement('img');
          icon.className = 'page7-coded-icon';
          icon.src = def.src;
          icon.alt = def.label;
          icon.title = def.label;
          icons.appendChild(icon);
        });
        topline.appendChild(icons);
      }
      copy.appendChild(topline);

      const desc = document.createElement('div');
      desc.className = 'page7-coded-desc';
      desc.textContent = item.description || '';
      copy.appendChild(desc);

      const leader = document.createElement('span');
      leader.className = 'page7-coded-leader';
      leader.setAttribute('aria-hidden', 'true');

      const price = document.createElement('span');
      price.className = 'page7-coded-price';
      price.textContent = item.price;

      const toggle = document.createElement('button');
      toggle.className = 'page7-coded-toggle';
      toggle.type = 'button';
      toggle.textContent = '+';
      toggle.setAttribute('aria-label', `${item.name} besin ve alerjen bilgilerini aç`);
      toggle.setAttribute('aria-expanded', 'false');
      toggle.addEventListener('click', () => {
        if (!item.nutrition) return;
        if (toggle.classList.contains('is-active')) { close(); return; }
        close();
        toggle.classList.add('is-active');
        toggle.textContent = '−';
        toggle.setAttribute('aria-expanded', 'true');
        const n = item.nutrition;
        panel.querySelector('.page7-coded-panel-name').textContent = item.name;
        panel.querySelector('.page7-coded-panel-kcal').textContent = `≈ ${n.kcal} kcal`;
        panel.querySelector('.page7-coded-panel-macros').innerHTML = `
          <span>Protein <strong>${n.protein} g</strong></span>
          <span>Karbonhidrat <strong>${n.carbs} g</strong></span>
          <span>Yağ <strong>${n.fat} g</strong></span>`;
        panel.querySelector('.page7-coded-panel-allergens').innerHTML = `<strong>Alerjenler:</strong> ${n.allergens.join(', ')}`;
        panel.classList.add('is-open');

        positionPanel(page, panel, row, { minTop: 0.23, maxBottom: 0.92, gap: 0.006 });
      });

      row.append(flower, copy, leader, price, toggle);
      fragment.appendChild(row);
    });
    container.replaceChildren(fragment);
  }

  function renderPage6Coded(items) {
    if (!Array.isArray(items)) return;
    const pages = document.querySelectorAll('.page6-coded-page');
    if (pages.length < 2) return;
    const first = items.slice(0, 6);
    const second = items.slice(6);
    renderRollCoded(pages[0], document.getElementById('page6-coded-menu-1'), first, 33.0, 53.5);
    renderRollCoded(pages[1], document.getElementById('page6-coded-menu-2'), second, 33.0, 53.5);
  }

  function renderPage7Coded(items) {
    if (!Array.isArray(items)) return;
    const pages = document.querySelectorAll('.page7-coded-page');
    if (pages.length < 2) return;
    const first = items.slice(0, 5);
    const second = items.slice(5);
    renderRollCoded(pages[0], document.getElementById('page7-coded-menu-1'), first, 30.0, 53.5);
    renderRollCoded(pages[1], document.getElementById('page7-coded-menu-2'), second, 30.0, 53.5);
  }

  function syncPage7CaliforniaDescription() {
    const target = document.getElementById('page7-california-description');
    if (!target || typeof menuPages === 'undefined' || !Array.isArray(menuPages.page7)) return;

    const california = menuPages.page7.find(item => item && item.name === 'California Sora');
    if (!california || !california.description) return;

    target.textContent = california.description;
  }


  function initPage7Nutrition() {
    const page = document.querySelector('.page7-approved-page');
    const layer = document.getElementById('page7-nutrition-hotspots');
    if (!page || !layer || typeof menuPages === 'undefined' || !Array.isArray(menuPages.page7)) return;

    const products = menuPages.page7.filter(item => item.nutrition);
    // Final artwork üzerindeki 12 ürünün dikey merkezleri (yüzde)
    const rowTops = [28.675, 33.874, 39.014, 44.221, 49.449, 54.786, 60.048, 65.453, 71.266, 76.601, 82.267, 87.553];

    const panel = document.createElement('section');
    panel.className = 'page7-nutrition-panel';
    panel.setAttribute('aria-live', 'polite');
    panel.innerHTML = `
      <button class="page7-nutrition-close" type="button" aria-label="Besin bilgisini kapat">×</button>
      <div class="page7-nutrition-head">
        <span class="page7-nutrition-name"></span>
        <span class="page7-nutrition-kcal"></span>
      </div>
      <div class="page7-nutrition-macros"></div>
      <div class="page7-nutrition-allergens"></div>`;
    page.appendChild(panel);

    const close = () => {
      panel.classList.remove('is-open');
      layer.querySelectorAll('.page7-nutrition-button.is-active').forEach(btn => {
        btn.classList.remove('is-active');
        btn.setAttribute('aria-expanded', 'false');
      });
    };

    panel.querySelector('.page7-nutrition-close').addEventListener('click', close);

    products.forEach((item, i) => {
      const btn = document.createElement('button');
      btn.className = 'page7-nutrition-button';
      btn.type = 'button';
      setHotspotGeometry(btn, rowTops, i);
      btn.setAttribute('aria-label', `${item.name} besin ve alerjen bilgilerini aç`);
      btn.setAttribute('aria-expanded', 'false');

      btn.addEventListener('click', () => {
        if (btn.classList.contains('is-active')) { close(); return; }
        close();
        btn.classList.add('is-active');
        btn.setAttribute('aria-expanded', 'true');

        const n = item.nutrition;
        panel.querySelector('.page7-nutrition-name').textContent = item.name;
        panel.querySelector('.page7-nutrition-kcal').textContent = `≈ ${n.kcal} kcal`;
        panel.querySelector('.page7-nutrition-macros').innerHTML = `
          <span>Protein <strong>${n.protein} g</strong></span>
          <span>Karbonhidrat <strong>${n.carbs} g</strong></span>
          <span>Yağ <strong>${n.fat} g</strong></span>`;
        panel.querySelector('.page7-nutrition-allergens').innerHTML =
          `<strong>Alerjenler:</strong> ${n.allergens.join(', ')}`;

        panel.classList.add('is-open');
        const pageH = page.getBoundingClientRect().height;
        const estimatedH = pageH * .09;
        let topPct = rowTops[i] + 2.3;
        if ((topPct / 100 * pageH) + estimatedH > pageH * .92) topPct = rowTops[i] - 10.5;
        topPct = Math.max(22, Math.min(topPct, 83));
        panel.style.top = `${topPct}%`;
      });

      layer.appendChild(btn);
    });
  }




  function initPage8Nutrition() {
    const page = document.querySelector('.page8-approved-page');
    const layer = document.getElementById('page8-nutrition-hotspots');
    if (!page || !layer || typeof menuPages === 'undefined' || !Array.isArray(menuPages.page8)) return;

    const wagyu = menuPages.page8.find(item => item && item.name === 'Wagyu');
    const wagyuPrice = document.getElementById('page8-wagyu-price');
    if (wagyu && wagyuPrice) wagyuPrice.textContent = wagyu.price;

    const products = menuPages.page8.filter(item => item.nutrition);
    // Onaylı görselde çizilmiş + işaretlerinin dikey merkezleri.
    const rowTops = [32.597, 37.155, 41.920, 46.685, 51.588, 56.354, 69.475, 75.173, 83.943, 92.645];

    const panel = document.createElement('section');
    panel.className = 'page8-nutrition-panel';
    panel.setAttribute('aria-live', 'polite');
    panel.innerHTML = `
      <button class="page8-nutrition-close" type="button" aria-label="Besin bilgisini kapat">×</button>
      <div class="page8-nutrition-head">
        <span class="page8-nutrition-name"></span>
        <span class="page8-nutrition-kcal"></span>
      </div>
      <div class="page8-nutrition-macros"></div>
      <div class="page8-nutrition-allergens"></div>
      <div class="page8-nutrition-note"></div>`;
    page.appendChild(panel);

    const close = () => {
      panel.classList.remove('is-open');
      layer.querySelectorAll('.page8-nutrition-button.is-active').forEach(btn => {
        btn.classList.remove('is-active');
        btn.setAttribute('aria-expanded', 'false');
      });
    };

    panel.querySelector('.page8-nutrition-close').addEventListener('click', close);

    products.forEach((item, i) => {
      const btn = document.createElement('button');
      btn.className = 'page8-nutrition-button';
      btn.type = 'button';
      setHotspotGeometry(btn, rowTops, i);
      btn.setAttribute('aria-label', `${item.name} besin ve alerjen bilgilerini aç`);
      btn.setAttribute('aria-expanded', 'false');

      btn.addEventListener('click', () => {
        if (btn.classList.contains('is-active')) { close(); return; }
        close();
        btn.classList.add('is-active');
        btn.setAttribute('aria-expanded', 'true');

        const n = item.nutrition;
        panel.querySelector('.page8-nutrition-name').textContent = item.name;
        panel.querySelector('.page8-nutrition-kcal').textContent =
          Number.isFinite(n.kcal) ? `≈ ${n.kcal} kcal` : 'Gramaj gerekli';

        panel.querySelector('.page8-nutrition-macros').innerHTML =
          Number.isFinite(n.protein) && Number.isFinite(n.carbs) && Number.isFinite(n.fat)
            ? `<span>Protein <strong>${n.protein} g</strong></span>
               <span>Karbonhidrat <strong>${n.carbs} g</strong></span>
               <span>Yağ <strong>${n.fat} g</strong></span>`
            : '';

        const allergens = n.allergens && n.allergens.length ? n.allergens.join(', ') : 'Bilgi yok';
        panel.querySelector('.page8-nutrition-allergens').innerHTML = `<strong>Alerjenler:</strong> ${allergens}`;
        panel.querySelector('.page8-nutrition-note').textContent = n.note || '';

        panel.classList.add('is-open');
        positionPanel(page, panel, btn, { minTop: 0.24, maxBottom: 0.92 });
      });

      layer.appendChild(btn);
    });
  }


  function initPage9Nutrition() {
    const page = document.querySelector('.page9-approved-page');
    const layer = document.getElementById('page9-nutrition-hotspots');
    if (!page || !layer || typeof menuPages === 'undefined' || !Array.isArray(menuPages.page9)) return;

    const products = menuPages.page9.filter(item => item.nutrition);
    const rowTops = [29.834, 33.356, 36.740, 40.193, 43.577, 47.099, 50.622, 61.188, 64.641, 75.622, 79.213, 82.666];

    const panel = document.createElement('section');
    panel.className = 'page9-nutrition-panel';
    panel.setAttribute('aria-live', 'polite');
    panel.innerHTML = `
      <button class="page9-nutrition-close" type="button" aria-label="Besin bilgisini kapat">×</button>
      <div class="page9-nutrition-head">
        <span class="page9-nutrition-name"></span>
        <span class="page9-nutrition-kcal"></span>
      </div>
      <div class="page9-nutrition-macros"></div>
      <div class="page9-nutrition-allergens"></div>
      <div class="page9-nutrition-note"></div>`;
    page.appendChild(panel);

    const close = () => {
      panel.classList.remove('is-open');
      layer.querySelectorAll('.page9-nutrition-button.is-active').forEach(btn => {
        btn.classList.remove('is-active');
        btn.setAttribute('aria-expanded', 'false');
      });
    };

    panel.querySelector('.page9-nutrition-close').addEventListener('click', close);

    products.forEach((item, i) => {
      const btn = document.createElement('button');
      btn.className = 'page9-nutrition-button';
      btn.type = 'button';
      setHotspotGeometry(btn, rowTops, i);
      btn.setAttribute('aria-label', `${item.name} besin ve alerjen bilgilerini aç`);
      btn.setAttribute('aria-expanded', 'false');

      btn.addEventListener('click', () => {
        if (btn.classList.contains('is-active')) { close(); return; }
        close();
        btn.classList.add('is-active');
        btn.setAttribute('aria-expanded', 'true');

        const n = item.nutrition;
        panel.querySelector('.page9-nutrition-name').textContent = item.name;
        panel.querySelector('.page9-nutrition-kcal').textContent =
          Number.isFinite(n.kcal) ? `≈ ${n.kcal} kcal` : 'Bilgi gerekli';

        panel.querySelector('.page9-nutrition-macros').innerHTML =
          Number.isFinite(n.protein) && Number.isFinite(n.carbs) && Number.isFinite(n.fat)
            ? `<span>Protein <strong>${n.protein} g</strong></span>
               <span>Karbonhidrat <strong>${n.carbs} g</strong></span>
               <span>Yağ <strong>${n.fat} g</strong></span>`
            : '';

        const allergens = n.allergens && n.allergens.length ? n.allergens.join(', ') : 'Bilgi yok';
        panel.querySelector('.page9-nutrition-allergens').innerHTML = `<strong>Alerjenler:</strong> ${allergens}`;
        panel.querySelector('.page9-nutrition-note').textContent = n.note || '';

        panel.classList.add('is-open');
        positionPanel(page, panel, btn, { minTop: 0.22, maxBottom: 0.93 });
      });

      layer.appendChild(btn);
    });
  }


  function initPage10Nutrition() {
    const page = document.querySelector('.page10-approved-page');
    const layer = document.getElementById('page10-nutrition-hotspots');
    if (!page || !layer || typeof menuPages === 'undefined' || !Array.isArray(menuPages.page10)) return;

    const products = menuPages.page10.filter(item => item.nutrition);
    const rowTops = [
      26.138, 29.667, 33.246,
      43.851, 47.024, 50.231, 53.503, 56.659, 59.776, 62.986, 66.158,
      75.799, 78.743, 81.817, 84.752
    ];

    const panel = document.createElement('section');
    panel.className = 'page10-nutrition-panel';
    panel.setAttribute('aria-live', 'polite');
    panel.innerHTML = `
      <button class="page10-nutrition-close" type="button" aria-label="Besin bilgisini kapat">×</button>
      <div class="page10-nutrition-head">
        <span class="page10-nutrition-name"></span>
        <span class="page10-nutrition-kcal"></span>
      </div>
      <div class="page10-nutrition-macros"></div>
      <div class="page10-nutrition-allergens"></div>
      <div class="page10-nutrition-note"></div>`;
    page.appendChild(panel);

    const close = () => {
      panel.classList.remove('is-open');
      layer.querySelectorAll('.page10-nutrition-button.is-active').forEach(btn => {
        btn.classList.remove('is-active');
        btn.setAttribute('aria-expanded', 'false');
      });
    };

    panel.querySelector('.page10-nutrition-close').addEventListener('click', close);

    products.forEach((item, i) => {
      const btn = document.createElement('button');
      btn.className = 'page10-nutrition-button';
      btn.type = 'button';
      setHotspotGeometry(btn, rowTops, i);
      btn.setAttribute('aria-label', `${item.name} besin ve alerjen bilgilerini aç`);
      btn.setAttribute('aria-expanded', 'false');

      btn.addEventListener('click', () => {
        if (btn.classList.contains('is-active')) { close(); return; }
        close();
        btn.classList.add('is-active');
        btn.setAttribute('aria-expanded', 'true');

        const n = item.nutrition;
        panel.querySelector('.page10-nutrition-name').textContent = item.name;
        panel.querySelector('.page10-nutrition-kcal').textContent =
          Number.isFinite(n.kcal) ? `≈ ${n.kcal} kcal` : 'Bilgi gerekli';

        panel.querySelector('.page10-nutrition-macros').innerHTML =
          Number.isFinite(n.protein) && Number.isFinite(n.carbs) && Number.isFinite(n.fat)
            ? `<span>Protein <strong>${n.protein} g</strong></span>
               <span>Karbonhidrat <strong>${n.carbs} g</strong></span>
               <span>Yağ <strong>${n.fat} g</strong></span>`
            : '';

        const allergens = n.allergens && n.allergens.length ? n.allergens.join(', ') : 'Bilgi yok';
        panel.querySelector('.page10-nutrition-allergens').innerHTML = `<strong>Alerjenler:</strong> ${allergens}`;
        panel.querySelector('.page10-nutrition-note').textContent = n.note || '';

        panel.classList.add('is-open');
        positionPanel(page, panel, btn, { minTop: 0.22, maxBottom: 0.93 });
      });

      layer.appendChild(btn);
    });
  }

  if (typeof menuPages !== 'undefined') {
    renderMenu('page3a-menu', menuPages.page3a);
    renderMenu('page3b-menu', menuPages.page3b);
    renderMenu('page4-menu', menuPages.page4);
    renderPage5Coded(menuPages.page5);
    renderPage6Coded(menuPages.page6);
    renderPage7Coded(menuPages.page7);
    initPage8Nutrition();
    initPage9Nutrition();
    initPage10Nutrition();
  }
})();
