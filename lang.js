const langData = {
  en: {
    logo: "AMW CYBERTECH",
    about: "About",
    services: "Services",
    technology: "Technology",
    contact: "Contact",
    heroTitle: "Powering Your Growth in Southeast Asia",
    heroDesc: "AMW CYBERTECH is an innovative technology company focusing on artificial intelligence, big data, and cybersecurity development, driving digital transformation across Southeast Asia.",
    ourServices: "Our Services",
    learnMore: "Contact Us",
    companyOverview: "Company Overview",
    overviewText: "Established in 2022 and headquartered in Singapore, AMW CYBERTECH PTE LTD is a leader in Southeast Asia's digital transformation.<br><br>With technology as our core, we are committed to delivering comprehensive solutions covering artificial intelligence, big data, cybersecurity development, and strategic marketing solutions.",
    founded: "Founded in Singapore",
    focus: "Regional Focus",
    techDriven: "Technology Driven",
    overviewDesc: "Comprehensive solutions to help businesses expand and succeed in the Southeast Asian market through strategic consulting and technology integration.",
    ourServicesTitle: "Our Services",
    service1Title: "Market Analysis & Consultation",
    service1Desc: "Comprehensive market analysis and consulting tailored to customer needs, characteristics and consumer needs.",
    service2Title: "Market Information Collection",
    service2Desc: "Regular collection and summary of industry information, trends, customer needs, and outcome points to support business decisions.",
    service3Title: "Public Relations Management",
    service3Desc: "Comprehensive PR handling including government department, industry association, and customer relations across Southeast Asia.",
    service4Title: "Business Development",
    service4Desc: "Overseas customer development, business matchmaking, and strategic partnership building.",
    coreTechnology: "Core Technology",
    ai: "Artificial Intelligence",
    aiDesc: "Advanced AI algorithms and machine learning solutions",
    bigdata: "Big Data Analytics",
    bigdataDesc: "Comprehensive data processing and analysis capabilities",
    cloud: "Cloud Computing",
    cloudDesc: "Scalable cloud infrastructure and services",
    cyber: "Cybersecurity",
    cyberDesc: "Robust security solutions and threat protection",
    corporateGoals: "Corporate Goals",
    goal1: "User-centric, Technology for Good",
    goal2: "Innovation-driven, Inclusive Growth",
    goal1Desc: "Everything is rooted in user value, with social responsibility integrated into products and services;Advancing technology for public good and building a responsible corporate ecosystem.",
    goal2Desc: "Promote technological innovation and cultural heritage, support industrial transformation and upgrading,and foster sustainable societal development through inclusive collaboration.",
    getInTouch: "Get in Touch",
    contactDesc: "Ready to transform your business in Southeast Asia? Let's discuss how we can help you achieve your goals.",
    headquarters: "Headquarters",
    phone: "Phone",
    sendMessage: "Send Message",
    name: "Name",
    email: "Email",
    company: "Company",
    message: "Tell us about your project..."
  },
  zh: {
    logo: "AMW CYBERTECH",
    about: "关于我们",
    services: "服务",
    technology: "技术",
    contact: "联系我们",
    heroTitle: "开启东南亚市场新增长",
    heroDesc: "AMW CYBERTECH是一家专注于人工智能、大数据和网络安全开发的创新型科技公司，推动东南亚地区的数字化转型。",
    ourServices: "我们的服务",
    learnMore: "联系我们",
    companyOverview: "公司概况",
    overviewText: "AMW CYBERTECH PTE LTD成立于2022年，总部位于新加坡，是东南亚数字化转型的引领者。<br><br>以科技为核心，致力于为客户提供涵盖人工智能、大数据、网络安全开发及战略营销的综合解决方案。",
    founded: "新加坡成立",
    focus: "区域聚焦",
    techDriven: "科技驱动",
    overviewDesc: "为企业在东南亚市场扩展和成功提供战略咨询与技术集成的综合解决方案。",
    ourServicesTitle: "我们的服务",
    service1Title: "市场分析与咨询",
    service1Desc: "根据客户需求、特征和消费习惯，提供全面的市场分析与咨询服务。",
    service2Title: "市场信息收集",
    service2Desc: "定期收集和汇总行业信息、趋势、客户需求及结果数据，助力企业决策。",
    service3Title: "公关管理",
    service3Desc: "涵盖政府部门、行业协会及客户关系的全方位公关管理，覆盖东南亚地区。",
    service4Title: "业务拓展",
    service4Desc: "海外客户开发、业务撮合及战略合作伙伴关系建设。",
    coreTechnology: "核心技术",
    ai: "人工智能",
    aiDesc: "先进的AI算法与机器学习解决方案",
    bigdata: "大数据分析",
    bigdataDesc: "全面的数据处理与分析能力",
    cloud: "云计算",
    cloudDesc: "可扩展的云基础设施与服务",
    cyber: "网络安全",
    cyberDesc: "强大的安全解决方案与威胁防护",
    corporateGoals: "企业目标",
    goal1: "以用户为中心，科技向善",
    goal2: "创新与可持续发展",
    goal1Desc: "一切以用户价值为基础，将社会责任融入产品与服务。",
    goal2Desc: "推动技术创新与文化传承，助力产业升级，促进社会可持续发展。",
    getInTouch: "联系我们",
    contactDesc: "准备好在东南亚实现业务转型了吗？欢迎与我们交流，探讨如何助力您的目标实现。",
    headquarters: "总部",
    phone: "电话",
    sendMessage: "发送信息",
    name: "姓名",
    email: "邮箱",
    company: "公司",
    message: "请描述您的项目……"
  }
};

let currentLang = "en";

function setLang(lang) {
  currentLang = lang;
  document.querySelectorAll("[data-i18n]").forEach(el => {
    const key = el.getAttribute("data-i18n");
    el.innerHTML = langData[lang][key];
  });
  document.querySelectorAll("[data-i18n-placeholder]").forEach(el => {
    const key = el.getAttribute("data-i18n-placeholder");
    el.placeholder = langData[lang][key];
  });
  document.getElementById("lang-toggle").innerText = lang === "en" ? "中文" : "EN";
  if (window.wrapOverviewDesc) window.wrapOverviewDesc();
}

document.getElementById("lang-toggle").addEventListener("click", () => {
  setLang(currentLang === "en" ? "zh" : "en");
});

// 初始化默认语言
setLang("en"); 