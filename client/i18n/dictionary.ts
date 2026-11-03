/**
 * UI strings for the English / नेपाली switch.
 *
 * Coverage is intentionally partial: the menus, header/footer, home page and
 * the login/register pages. Everything else stays in English, and the footer
 * says so. To translate more, add a key to `en`, add its Nepali text to `ne`
 * (TypeScript will complain until both match), then use `t("your.key")`.
 */
export const en = {
  "brand.name": "Smart Ward Portal",
  "brand.sub": "Ward No. 9 · Bholdhoka, Lalitpur",

  "nav.home": "Home",
  "nav.notices": "Notices",
  "nav.services": "Services",
  "nav.projects": "Development Projects",
  "nav.complaints": "Complaints",
  "nav.login": "Log in",
  "nav.register": "Register",
  "nav.logout": "Log out",
  "nav.admin": "Admin dashboard",
  "nav.menu": "Menu",
  "nav.myComplaints": "My complaints",
  "nav.skip": "Skip to main content",
  "nav.language": "Language",

  "hero.badge": "Ward No. 9 Office, Bholdhoka, Lalitpur",
  "hero.title": "Ward services, notices and complaints in one place",
  "hero.subtitle":
    "Read ward notices, report problems and follow their progress online.",
  "hero.cta.services": "Explore Services",
  "hero.cta.notices": "View Notices",
  "hero.cta.complaint": "Submit a Complaint",
  "hero.deptTitle": "Departments at the ward office",
  "hero.deptNote":
    "Online complaint handling is available now. Other services are guidance only.",

  "dept.administrative": "Administrative",
  "dept.account": "Account",
  "dept.engineering": "Engineering",
  "dept.registration": "Registration",

  "why.title": "Built around real problems at the ward office",
  "why.queues.title": "Long queues and repeat visits",
  "why.queues.desc":
    "Read notices and service guidance online before you visit the office.",
  "why.track.title": "Complaints that are hard to follow",
  "why.track.desc": "Submit a complaint and check its status online.",
  "why.notices.title": "Scattered notices",
  "why.notices.desc": "Ward notices are published in one place.",
  "why.projects.title": "Project information",
  "why.projects.desc":
    "Development project updates will appear here when the ward publishes them.",

  "quick.title": "Quick services",
  "quick.notices.title": "Public notices",
  "quick.notices.desc": "Read the latest announcements from the ward.",
  "quick.complaint.title": "Submit a complaint",
  "quick.complaint.desc":
    "Report a problem such as roads, water supply or streetlights.",
  "quick.track.title": "Track my complaints",
  "quick.track.desc": "See the status of complaints you have submitted.",
  "quick.services.title": "Service guidance",
  "quick.services.desc": "Find out which department to approach.",

  "how.title": "How it works",
  "how.1.title": "Create an account",
  "how.1.desc": "Register once, then log in whenever you need to.",
  "how.2.title": "Describe the problem",
  "how.2.desc": "Add a title, category, location and details.",
  "how.3.title": "The ward office reviews it",
  "how.3.desc":
    "An administrator can assign it to a department or a staff member.",
  "how.4.title": "Follow the status",
  "how.4.desc": "Keep checking your complaint until a decision is recorded.",

  "notices.latest": "Latest notices",
  "notices.viewAll": "View all notices",
  "notices.loginTitle": "Log in to read ward notices",
  "notices.loginDesc": "Notices are available to registered, logged-in users.",
  "notices.empty": "No notices have been published yet.",

  "cta.title": "Have a problem in your area?",
  "cta.desc": "Submit a complaint and follow what happens next.",
  "cta.submit": "Submit a complaint",
  "cta.track": "Track my complaints",

  "projects.title": "Development projects",
  "projects.desc":
    "Project updates will appear here once the ward publishes them.",
  "projects.link": "Learn more",

  "footer.about":
    "Smart Ward Portal is a digital service platform based on a case study of the Ward No. 9 Office, Bholdhoka, Lalitpur, Nepal.",
  "footer.links": "Quick links",
  "footer.contact": "Contact",
  "footer.contactNote":
    "Official contact details have not been published on this portal yet. Please visit the ward office.",
  "footer.lang":
    "Nepali translation currently covers the menus, home page and sign-in pages.",

  "auth.loginTitle": "Log in",
  "auth.loginSubtitle": "Use the email and password you registered with.",
  "auth.email": "Email address",
  "auth.password": "Password",
  "auth.loginBtn": "Log in",
  "auth.loggingIn": "Logging in…",
  "auth.noAccount": "New here?",
  "auth.createAccount": "Create an account",
  "auth.registerTitle": "Create your account",
  "auth.registerSubtitle": "Registration is free and only takes a minute.",
  "auth.fullName": "Full name",
  "auth.phone": "Phone number (10 digits)",
  "auth.confirm": "Confirm password",
  "auth.registerBtn": "Create account",
  "auth.creating": "Creating account…",
  "auth.haveAccount": "Already registered?",
} as const;

export type TranslationKey = keyof typeof en;

export const ne: Record<TranslationKey, string> = {
  "brand.name": "Smart Ward Portal",
  "brand.sub": "वडा नं. ९ · Bholdhoka, ललितपुर",

  "nav.home": "गृहपृष्ठ",
  "nav.notices": "सूचनाहरू",
  "nav.services": "सेवाहरू",
  "nav.projects": "विकास आयोजनाहरू",
  "nav.complaints": "गुनासोहरू",
  "nav.login": "लगइन",
  "nav.register": "दर्ता",
  "nav.logout": "लगआउट",
  "nav.admin": "प्रशासन ड्यासबोर्ड",
  "nav.menu": "मेनु",
  "nav.myComplaints": "मेरा गुनासोहरू",
  "nav.skip": "मुख्य सामग्रीमा जानुहोस्",
  "nav.language": "भाषा",

  "hero.badge": "वडा नं. ९ कार्यालय, Bholdhoka, ललितपुर",
  "hero.title": "वडाका सेवा, सूचना र गुनासो — एकै ठाउँमा",
  "hero.subtitle":
    "वडाका सूचनाहरू पढ्नुहोस्, समस्या दर्ता गर्नुहोस् र त्यसको प्रगति अनलाइन हेर्नुहोस्।",
  "hero.cta.services": "सेवाहरू हेर्नुहोस्",
  "hero.cta.notices": "सूचनाहरू हेर्नुहोस्",
  "hero.cta.complaint": "गुनासो दर्ता गर्नुहोस्",
  "hero.deptTitle": "वडा कार्यालयका विभागहरू",
  "hero.deptNote":
    "गुनासो व्यवस्थापन अहिले अनलाइन उपलब्ध छ। अन्य सेवाहरू जानकारीका लागि मात्र हुन्।",

  "dept.administrative": "प्रशासन",
  "dept.account": "लेखा",
  "dept.engineering": "इन्जिनियरिङ",
  "dept.registration": "दर्ता",

  "why.title": "वडा कार्यालयका वास्तविक समस्यामा आधारित",
  "why.queues.title": "लामो लाइन र बारम्बार धाउनुपर्ने",
  "why.queues.desc":
    "कार्यालय जानुअघि सूचना र सेवा जानकारी अनलाइन हेर्नुहोस्।",
  "why.track.title": "गुनासोको अवस्था थाहा नहुने",
  "why.track.desc": "गुनासो दर्ता गरेपछि यसको अवस्था अनलाइन हेर्नुहोस्।",
  "why.notices.title": "छरिएका सूचनाहरू",
  "why.notices.desc": "वडाका सूचनाहरू एकै ठाउँमा प्रकाशित हुन्छन्।",
  "why.projects.title": "आयोजनाको जानकारी",
  "why.projects.desc":
    "वडाले प्रकाशित गरेपछि विकास आयोजनाका अपडेटहरू यहाँ देखिनेछन्।",

  "quick.title": "छिटो सेवाहरू",
  "quick.notices.title": "सार्वजनिक सूचना",
  "quick.notices.desc": "वडाका पछिल्ला घोषणाहरू पढ्नुहोस्।",
  "quick.complaint.title": "गुनासो दर्ता",
  "quick.complaint.desc":
    "सडक, खानेपानी वा सडक बत्ती जस्ता समस्याबारे जानकारी गराउनुहोस्।",
  "quick.track.title": "मेरा गुनासो हेर्नुहोस्",
  "quick.track.desc": "तपाईंले दर्ता गरेका गुनासोको अवस्था हेर्नुहोस्।",
  "quick.services.title": "सेवा जानकारी",
  "quick.services.desc": "कुन विभागमा जानुपर्छ थाहा पाउनुहोस्।",

  "how.title": "यसले कसरी काम गर्छ",
  "how.1.title": "खाता बनाउनुहोस्",
  "how.1.desc": "एक पटक दर्ता गर्नुहोस्, त्यसपछि चाहिएको बेला लगइन गर्नुहोस्।",
  "how.2.title": "समस्या लेख्नुहोस्",
  "how.2.desc": "शीर्षक, वर्ग, स्थान र विवरण थप्नुहोस्।",
  "how.3.title": "वडा कार्यालयले हेर्छ",
  "how.3.desc":
    "प्रशासकले गुनासो सम्बन्धित विभाग वा कर्मचारीलाई तोक्न सक्छन्।",
  "how.4.title": "अवस्था हेर्नुहोस्",
  "how.4.desc": "निर्णय नभएसम्म गुनासोको अवस्था हेर्दै रहनुहोस्।",

  "notices.latest": "पछिल्ला सूचनाहरू",
  "notices.viewAll": "सबै सूचना हेर्नुहोस्",
  "notices.loginTitle": "सूचना पढ्न लगइन गर्नुहोस्",
  "notices.loginDesc":
    "सूचनाहरू दर्ता भई लगइन गरेका प्रयोगकर्ताका लागि उपलब्ध छन्।",
  "notices.empty": "अहिलेसम्म कुनै सूचना प्रकाशित भएको छैन।",

  "cta.title": "तपाईंको क्षेत्रमा समस्या छ?",
  "cta.desc": "गुनासो दर्ता गर्नुहोस् र त्यसपछि के हुन्छ हेर्नुहोस्।",
  "cta.submit": "गुनासो दर्ता गर्नुहोस्",
  "cta.track": "मेरा गुनासो हेर्नुहोस्",

  "projects.title": "विकास आयोजनाहरू",
  "projects.desc":
    "वडाले प्रकाशित गरेपछि आयोजनाका अपडेटहरू यहाँ देखिनेछन्।",
  "projects.link": "थप हेर्नुहोस्",

  "footer.about":
    "Smart Ward Portal वडा नं. ९ कार्यालय, Bholdhoka, ललितपुर, नेपालको केस स्टडीमा आधारित डिजिटल सेवा प्लेटफर्म हो।",
  "footer.links": "छिटो लिङ्कहरू",
  "footer.contact": "सम्पर्क",
  "footer.contactNote":
    "आधिकारिक सम्पर्क विवरण यस पोर्टलमा अहिलेसम्म प्रकाशित गरिएको छैन। कृपया वडा कार्यालयमा सम्पर्क गर्नुहोस्।",
  "footer.lang":
    "नेपाली अनुवाद अहिले मेनु, गृहपृष्ठ र लगइन/दर्ता पृष्ठमा मात्र उपलब्ध छ।",

  "auth.loginTitle": "लगइन गर्नुहोस्",
  "auth.loginSubtitle": "दर्ता गर्दा प्रयोग गरेको इमेल र पासवर्ड लेख्नुहोस्।",
  "auth.email": "इमेल ठेगाना",
  "auth.password": "पासवर्ड",
  "auth.loginBtn": "लगइन गर्नुहोस्",
  "auth.loggingIn": "लगइन हुँदैछ…",
  "auth.noAccount": "नयाँ हुनुहुन्छ?",
  "auth.createAccount": "खाता बनाउनुहोस्",
  "auth.registerTitle": "आफ्नो खाता बनाउनुहोस्",
  "auth.registerSubtitle": "दर्ता निःशुल्क छ र एक मिनेट मात्र लाग्छ।",
  "auth.fullName": "पूरा नाम",
  "auth.phone": "फोन नम्बर (१० अङ्क)",
  "auth.confirm": "पासवर्ड पुष्टि गर्नुहोस्",
  "auth.registerBtn": "खाता बनाउनुहोस्",
  "auth.creating": "खाता बन्दैछ…",
  "auth.haveAccount": "पहिले नै दर्ता गर्नुभएको छ?",
};
