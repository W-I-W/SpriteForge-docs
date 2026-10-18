(function () {
  var en = document.documentElement.lang !== "ru";
  var P = en ? "" : "../";

  var NAV_RU = [
    ["Начало", [
      ["index", "Обзор"],
      ["getting-started", "Быстрый старт"],
      ["quick-tour", "Quick tour (встроенный тур)"],
      ["interface", "Интерфейс"],
      ["windows", "Справочник окон"],
      ["recipes", "Пошаговые сценарии"]
    ]],
    ["Рисование", [
      ["tools", "Инструменты (все 28)"],
      ["selection", "Выделение и преобразование"],
      ["canvas", "Холст, сетка, направляющие"],
      ["mirror-tile", "Зеркало и Tile Repeat"],
      ["palettes", "Палитры и цвет"],
      ["filters", "Фильтры и правка цвета"]
    ]],
    ["Анимация", [
      ["layers-timeline", "Слои и Timeline"],
      ["physics", "Физическая анимация"],
      ["lighting", "Освещение кадра"]
    ]],
    ["Генераторы", [
      ["generators", "Обзор генераторов"],
      ["character", "Персонажи"],
      ["furniture-effects", "Мебель и эффекты"],
      ["tiles-ui", "Тайлы и UI"],
      ["auto-noise", "Auto noise"],
      ["library", "Результаты и библиотека"]
    ]],
    ["Умные функции", [
      ["ai-pixel", "AI image to pixel art"],
      ["prediction", "Предсказание правок"]
    ]],
    ["Файлы", [
      ["export", "Экспорт"],
      ["import-files", "Проекты и импорт"],
      ["recovery", "Восстановление и история"]
    ]],
    ["Настройка", [
      ["settings", "Настройки и контент"],
      ["mods", "Моды"],
      ["shortcuts", "Горячие клавиши"],
      ["faq", "Вопросы и ответы"],
      ["glossary", "Глоссарий"]
    ]]
  ];

  var NAV_EN = [
    ["Start", [
      ["index", "Overview"],
      ["getting-started", "Getting started"],
      ["quick-tour", "Quick tour (built-in)"],
      ["interface", "Interface"],
      ["windows", "Window reference"],
      ["recipes", "Step-by-step recipes"]
    ]],
    ["Drawing", [
      ["tools", "Tools (all 28)"],
      ["selection", "Selection and transform"],
      ["canvas", "Canvas, grid, guides"],
      ["mirror-tile", "Mirror and Tile Repeat"],
      ["palettes", "Palettes and color"],
      ["filters", "Filters and color editing"]
    ]],
    ["Animation", [
      ["layers-timeline", "Layers and Timeline"],
      ["physics", "Physics animation"],
      ["lighting", "Frame lighting"]
    ]],
    ["Generators", [
      ["generators", "Generators overview"],
      ["character", "Characters"],
      ["furniture-effects", "Furniture and effects"],
      ["tiles-ui", "Tiles and UI"],
      ["auto-noise", "Auto noise"],
      ["library", "Results and library"]
    ]],
    ["Smart features", [
      ["ai-pixel", "AI image to pixel art"],
      ["prediction", "Edit prediction"]
    ]],
    ["Files", [
      ["export", "Export"],
      ["import-files", "Projects and import"],
      ["recovery", "Recovery and history"]
    ]],
    ["Setup", [
      ["settings", "Settings and content"],
      ["mods", "Mods"],
      ["shortcuts", "Keyboard shortcuts"],
      ["faq", "FAQ"],
      ["glossary", "Glossary"]
    ]]
  ];

  var T = en ? {
    menu: "Menu", doc: "documentation", search: "Search the documentation...", searchLabel: "Search", theme: "Theme",
    onPage: "On this page", footer: "SpriteForge - documentation. Matches the current version of the source code.",
    hintPage: "page", hintHere: "on this page", none: "Nothing found", lang: "RU", langTitle: "Русская версия"
  } : {
    menu: "Меню", doc: "документация", search: "Поиск по документации...", searchLabel: "Поиск", theme: "Тема",
    onPage: "На странице", footer: "SpriteForge - документация. Описание соответствует текущей версии исходного кода.",
    hintPage: "страница", hintHere: "на этой странице", none: "Ничего не найдено", lang: "EN", langTitle: "English version"
  };

  var NAV = en ? NAV_EN : NAV_RU;
  var flat = [];
  NAV.forEach(function (g) { g[1].forEach(function (p) { flat.push(p); }); });

  var page = document.body.getAttribute("data-page") || "index";

  // theme
  var saved = null;
  try { saved = localStorage.getItem("sf-theme"); } catch (e) {}
  if (saved) document.documentElement.setAttribute("data-theme", saved);

  var otherLang = (en ? "ru/" : "../") + page + ".html";

  var top = document.createElement("div");
  top.className = "topbar";
  top.innerHTML =
    '<button class="icon-btn menu-btn" aria-label="' + T.menu + '">&#9776;</button>' +
    '<a class="brand" href="index.html"><img src="' + P + 'assets/logo.png" alt=""><span>SpriteForge <small>' + T.doc + '</small></span></a>' +
    '<div class="spacer"></div>' +
    '<div class="search"><input type="search" placeholder="' + T.search + '" aria-label="' + T.searchLabel + '"><div class="search-results"></div></div>' +
    '<a class="icon-btn lang-btn" href="' + otherLang + '" title="' + T.langTitle + '" hreflang="' + (en ? "ru" : "en") + '">' + T.lang + '</a>' +
    '<button class="icon-btn theme-btn" aria-label="' + T.theme + '">&#9680;</button>';
  document.body.insertBefore(top, document.body.firstChild);

  var side = document.createElement("nav");
  side.className = "sidebar";
  var html = "";
  NAV.forEach(function (g) {
    html += "<h4>" + g[0] + "</h4>";
    g[1].forEach(function (p) {
      html += '<a href="' + p[0] + '.html"' + (p[0] === page ? ' class="active"' : "") + ">" + p[1] + "</a>";
    });
  });
  side.innerHTML = html;
  document.body.insertBefore(side, top.nextSibling);

  var main = document.querySelector("main");
  var layout = document.createElement("div");
  layout.className = "layout";
  main.parentNode.insertBefore(layout, main);
  layout.appendChild(main);

  // TOC
  var heads = main.querySelectorAll("h2");
  if (heads.length > 1) {
    var toc = document.createElement("div");
    toc.className = "toc";
    var t = "<b>" + T.onPage + "</b>";
    heads.forEach(function (h, i) {
      if (!h.id) h.id = "s" + i;
      t += '<a href="#' + h.id + '">' + h.textContent + "</a>";
    });
    toc.innerHTML = t;
    document.body.appendChild(toc);
  }

  // pager
  var idx = flat.findIndex(function (p) { return p[0] === page; });
  if (idx >= 0) {
    var pager = document.createElement("div");
    pager.className = "pager";
    var prev = flat[idx - 1], next = flat[idx + 1];
    pager.innerHTML =
      (prev ? '<a href="' + prev[0] + '.html">&larr; ' + prev[1] + "</a>" : "<span></span>") +
      (next ? '<a href="' + next[0] + '.html">' + next[1] + " &rarr;</a>" : "<span></span>");
    main.appendChild(pager);
  }
  var foot = document.createElement("footer");
  foot.textContent = T.footer;
  layout.appendChild(foot);

  // menu
  top.querySelector(".menu-btn").addEventListener("click", function () { side.classList.toggle("open"); });
  main.addEventListener("click", function () { side.classList.remove("open"); });
  top.querySelector(".theme-btn").addEventListener("click", function () {
    var cur = document.documentElement.getAttribute("data-theme");
    var dark = cur ? cur === "dark" : window.matchMedia("(prefers-color-scheme: dark)").matches;
    var n = dark ? "light" : "dark";
    document.documentElement.setAttribute("data-theme", n);
    try { localStorage.setItem("sf-theme", n); } catch (e) {}
  });

  // search (titles + h2/h3 of the current page + index of all pages by title)
  var input = top.querySelector(".search input");
  var box = top.querySelector(".search-results");
  var entries = flat.map(function (p) { return { title: p[1], url: p[0] + ".html", hint: T.hintPage }; });
  main.querySelectorAll("h2,h3").forEach(function (h, i) {
    if (!h.id) h.id = "h" + i;
    entries.push({ title: h.textContent.replace(/\s+/g, " ").trim(), url: "#" + h.id, hint: T.hintHere });
  });
  var INDEX = window.SF_SEARCH_INDEX || [];
  INDEX.forEach(function (e) { entries.push({ title: e[0], url: e[1], hint: e[2] }); });
  input.addEventListener("input", function () {
    var q = input.value.trim().toLowerCase();
    if (!q) { box.style.display = "none"; return; }
    var found = entries.filter(function (e) { return e.title.toLowerCase().indexOf(q) >= 0; }).slice(0, 14);
    box.innerHTML = found.length
      ? found.map(function (e) { return '<a href="' + e.url + '">' + e.title + "<span>" + e.hint + "</span></a>"; }).join("")
      : '<a href="#">' + T.none + "</a>";
    box.style.display = "block";
  });
  document.addEventListener("click", function (e) { if (!top.contains(e.target)) box.style.display = "none"; });
  document.addEventListener("keydown", function (e) {
    if (e.key === "/" && document.activeElement.tagName !== "INPUT") { e.preventDefault(); input.focus(); }
  });
})();
