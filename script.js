const toggle = document.querySelector(".nav-toggle");
const nav = document.querySelector(".site-nav");
const navLinks = [...document.querySelectorAll(".site-nav a")];
const sections = navLinks
  .map((link) => document.querySelector(link.getAttribute("href")))
  .filter(Boolean);
const languageToggle = document.querySelector("[data-lang-toggle]");
const translatable = [...document.querySelectorAll("[data-i18n]")];

const translations = {
  en: {
    navHome: "Home",
    navResearch: "Research",
    navPublications: "Publications",
    navTeaching: "Teaching",
    navContact: "Contact",
    profileName: "Li Zhang",
    keywords: "Urban Resilience / Spatial Behavior / Computational Urban Design",
    lead:
      "My research interests focus on the interactions between space and human behavior under climate change and digital transformation, and their implications for urban planning and design.",
    bio:
      "Climate change and digital transformation are profoundly reshaping the relationship between cities and people. As extreme climate events become more frequent and digital technologies continue to change how people perceive, use, and shape urban space, traditional planning concepts based on static space are gradually shifting toward planning paradigms centered on dynamic behavior and complex systems. Understanding the interaction mechanisms between urban environments and human behavior, and how digital technologies reconstruct this relationship, has become an important scientific question for building future cities.<br /><br />My research focuses on the interactions between space and human behavior under climate change and digital transformation. It integrates multi-source spatiotemporal sensing, artificial intelligence, computational modeling, and human-AI collaborative design to explore the disturbance and recovery mechanisms of social systems during extreme climate events and disasters, reveal the evolution of human spatial behavior in the digital era, and translate behavioral sensing and computational intelligence into decision-support capabilities for urban planning and design.",
    actionPublications: "Publications",
    actionContact: "Contact",
    affiliation: "Shenzhen University",
    newsTitle: "Recent News",
    newsDesc: "Recent publications and profile updates from Google Scholar.",
    news1:
      "Published work identifying potential stranding signals during extreme rainfall using LBS data.",
    news2:
      "Published work on urban waterlogging risk and nonlinear drivers in high-density cities.",
    news3:
      "Published research on urban-rural disparities in flood-driven relocation behavior in Zhengzhou.",
    news4:
      "Published research extending the theory of planned behavior to explain intra-city migration during extreme rainfall disasters.",
    researchTitle: "Research",
    researchDesc: "Current work connects resilience, spatial behavior, and human-AI urban design.",
    research1Title: "Urban Resilience",
    research1Desc:
      "Modeling social system disruptions and recovery during extreme climate events and disasters for resilient cities.",
    research2Title: "Spatial Behavior",
    research2Desc:
      "Interactions between urban environments and human behavior, with a focus on behavioral transformation in the digital era.",
    research3Title: "HAI Urban Design",
    research3Desc: "Interactive human-AI systems for collaborative decision-making in urban design.",
    publicationsTitle: "Publications",
    publicationsDesc: "Works listed by publication date on Google Scholar.",
    seeAllPublications: "See all publications",
    teachingTitle: "Teaching",
    teachingDesc:
      "Current teaching focuses on information technology, urban resilience, and human-AI collaboration in urban design.",
    course1Title: "Information Technology and Urban Resilience",
    course1Desc:
      "This course explores how digital technologies can enhance urban resilience across disaster preparedness, response, recovery, and long-term planning. It introduces the use of GIS, big data, artificial intelligence, and computational modeling to analyze population responses and recovery during extreme events. Students will learn how data-driven approaches support urban risk assessment, human behavior analysis, emergency management, and resilience planning.",
    course2Title: "HAI Urban Design",
    course2Desc:
      "This course introduces a human-AI collaborative approach to urban design, integrating generative AI, spatial analytics, and interactive digital platforms into the design process. Using interactive urban interfaces, students explore urban systems through real-time visualization, scenario simulation, and human-AI interaction. The course emphasizes collaborative decision-making, enabling students to evaluate design alternatives, and develop data-informed, human-centered urban design solutions.",
    contactTitle: "Contact",
    address: "3688 Nanhai Ave,<br />Nanshan District, Shenzhen<br />518000, China",
    scholarLink: "Google Scholar profile",
  },
  zh: {
    navHome: "首页",
    navResearch: "研究",
    navPublications: "论文",
    navTeaching: "教学",
    navContact: "联系",
    profileName: "张立",
    keywords: "城市韧性 / 空间行为 / 计算性城市设计",
    lead:
      "我的研究兴趣聚焦于气候变化与数字化转型背景下空间与人类行为之间的相互作用，以及这些关系对城市规划与设计的影响。",
    bio:
      "气候变化与数字化转型正在深刻重塑城市与人之间的关系。极端气候事件日益频发，数字技术不断改变人们感知、使用和塑造城市空间的方式，传统基于静态空间的规划理念正逐步向面向动态行为与复杂系统的规划范式转变。理解城市环境与人类行为之间的互动机制，以及数字技术如何重构这种关系，已成为建设未来城市的重要科学问题。<br /><br />我的研究聚焦于气候变化与数字化转型背景下空间与人类行为的相互作用，融合多源时空感知、人工智能、计算建模和人机协同设计等方法，探索极端气候与灾害期间社会系统的扰动与恢复机制，揭示数字时代人类空间行为的演变规律，并将行为感知与计算智能转化为面向城市规划与设计的决策支持能力。",
    actionPublications: "论文",
    actionContact: "联系",
    affiliation: "深圳大学",
    newsTitle: "近况",
    newsDesc: "近期发表与 Google Scholar 主页更新。",
    news1: "发表关于利用 LBS 数据识别极端降雨期间潜在滞留信号的研究。",
    news2: "发表关于高密度城市内涝风险及其非线性驱动因素的研究。",
    news3: "发表关于郑州洪涝驱动迁移行为及城乡差异的研究。",
    news4: "发表将计划行为理论拓展至极端降雨灾害中城市内部迁移解释的研究。",
    researchTitle: "研究",
    researchDesc: "当前研究连接城市韧性、空间行为与人机协同城市设计。",
    research1Title: "城市韧性",
    research1Desc: "面向韧性城市，建模极端气候事件与灾害中的社会系统扰动及恢复过程。",
    research2Title: "空间行为",
    research2Desc: "关注城市环境与人类行为之间的互动，尤其是数字时代下的城市空间结构变化。",
    research3Title: "HAI 城市设计",
    research3Desc: "用于城市设计协同决策的交互式人机智能系统。",
    publicationsTitle: "论文",
    publicationsDesc: "以下为 Google Scholar 按发表时间列出的近期论文。",
    seeAllPublications: "查看全部论文",
    teachingTitle: "教学",
    teachingDesc: "当前教学关注信息技术、城市韧性与人机协同城市设计。",
    course1Title: "信息技术与城市韧性",
    course1Desc:
      "本课程探讨数字技术如何提升城市在灾害准备、响应、恢复与规划中的韧性。课程介绍 GIS、大数据、人工智能与计算建模在极端事件中人口响应与恢复分析中的应用。学生将学习数据驱动方法如何支持城市风险评估、人类行为分析、应急管理与韧性规划。",
    course2Title: "HAI 城市设计",
    course2Desc:
      "本课程介绍面向城市设计的人机协同方法，将生成式 AI、空间分析与交互式数字平台整合进设计过程。通过交互式城市界面，学生将借助实时可视化、情景模拟与人机交互理解城市系统。课程强调协同决策，帮助学生评估设计方案，并形成数据支撑、以人为本的城市设计方案。",
    contactTitle: "联系",
    address: "中国广东省深圳市南山区南海大道3688号<br />518000",
    scholarLink: "Google Scholar 主页",
  },
};

toggle?.addEventListener("click", () => {
  const isOpen = nav.classList.toggle("open");
  toggle.setAttribute("aria-expanded", String(isOpen));
});

navLinks.forEach((link) => {
  link.addEventListener("click", () => {
    nav.classList.remove("open");
    toggle?.setAttribute("aria-expanded", "false");
  });
});

const observer = new IntersectionObserver(
  (entries) => {
    entries.forEach((entry) => {
      if (!entry.isIntersecting) return;
      navLinks.forEach((link) => {
        link.classList.toggle("active", link.getAttribute("href") === `#${entry.target.id}`);
      });
    });
  },
  { rootMargin: "-35% 0px -55% 0px" }
);

sections.forEach((section) => observer.observe(section));

function setLanguage(language) {
  const dictionary = translations[language] || translations.en;

  document.documentElement.lang = language === "zh" ? "zh-CN" : "en";
  document.body.dataset.lang = language;

  translatable.forEach((element) => {
    const key = element.dataset.i18n;
    element.innerHTML = dictionary[key] || translations.en[key] || "";
  });

  if (languageToggle) {
    languageToggle.textContent = language === "zh" ? "EN" : "中文";
    languageToggle.setAttribute(
      "aria-label",
      language === "zh" ? "Switch to English" : "切换到中文"
    );
  }

  localStorage.setItem("site-language", language);
}

languageToggle?.addEventListener("click", () => {
  setLanguage(document.body.dataset.lang === "zh" ? "en" : "zh");
});

setLanguage(localStorage.getItem("site-language") === "zh" ? "zh" : "en");

const publicationList = document.querySelector(".publication-list");
const scholarProfile =
  "https://scholar.google.com/citations?hl=zh-CN&user=Ibcfs-sAAAAJ&view_op=list_works&sortby=pubdate";

function escapeHtml(value) {
  return String(value || "")
    .replaceAll("&", "&amp;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;")
    .replaceAll('"', "&quot;")
    .replaceAll("'", "&#039;");
}

function highlightAuthor(authors) {
  return escapeHtml(authors).replace(/\b(Li Zhang|L Zhang|Zhang Li)\b/g, "<strong>$1</strong>");
}

function renderPublications(publications) {
  if (!publicationList || !Array.isArray(publications) || publications.length === 0) return;

  const items = publications.slice(0, 10).map((publication) => {
    const title = escapeHtml(publication.title);
    const authors = highlightAuthor(publication.authors);
    const venue = escapeHtml(publication.venue);
    const url = escapeHtml(publication.url || scholarProfile);

    return `
      <article>
        <h3>${title}</h3>
        <p>${authors}</p>
        <p class="venue">${venue}</p>
        <div class="paper-links">
          <a href="${url}">Scholar</a>
        </div>
      </article>
    `;
  });

  items.push(`
    <div class="see-all">
      <a href="${scholarProfile}" data-i18n="seeAllPublications">${
        translations[document.body.dataset.lang || "en"].seeAllPublications
      }</a>
    </div>
  `);

  publicationList.innerHTML = items.join("");
}

fetch("publications.json", { cache: "no-store" })
  .then((response) => (response.ok ? response.json() : Promise.reject(response)))
  .then(renderPublications)
  .catch(() => {
    // Keep the static publication list when the JSON file is unavailable.
  });
