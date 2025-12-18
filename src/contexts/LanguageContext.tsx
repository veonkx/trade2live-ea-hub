import { createContext, useContext, useState, ReactNode } from "react";

type Language = "en" | "lo";

interface LanguageContextType {
  language: Language;
  setLanguage: (lang: Language) => void;
  t: (key: string) => string;
}

const translations: Record<Language, Record<string, string>> = {
  en: {
    // Navbar
    "nav.home": "Home",
    "nav.ourProduct": "Our Product",
    "nav.performance": "Performance",
    "nav.pricing": "Pricing",
    "nav.about": "About",
    "nav.faq": "FAQ",
    "nav.contact": "Contact",
    "nav.getStarted": "Get Started",
    
    // Hero Section
    "hero.tagline": "Professional EA Trading",
    "hero.title": "Trade Smarter with",
    "hero.titleHighlight": "AI-Powered EA",
    "hero.description": "Experience low-risk, sustainable trading with our professionally developed Expert Advisors. Designed for long-term capital preservation and consistent returns.",
    "hero.viewPerformance": "View Performance",
    "hero.explorePricing": "Explore Pricing",
    "hero.stat.maxDrawdown": "Max Drawdown",
    "hero.stat.winRate": "Win Rate",
    "hero.stat.yearsExperience": "Years Experience",
    
    // Features Section
    "features.tagline": "Why Choose Trade2live",
    "features.title": "Built for Serious Traders",
    "features.description": "Our Expert Advisors are designed with one goal: sustainable, long-term profitability with minimal risk.",
    "features.riskManagement": "Risk Management",
    "features.riskManagementDesc": "Advanced algorithms ensure your capital is protected with strict drawdown limits and position sizing.",
    "features.autoTrading": "24/7 Auto Trading",
    "features.autoTradingDesc": "Set it and forget it. Our EAs work around the clock, capturing opportunities in every market session.",
    "features.transparency": "Full Transparency",
    "features.transparencyDesc": "Real-time performance tracking with Myfxbook verification. No hidden results or cherry-picked data.",
    "features.support": "Expert Support",
    "features.supportDesc": "Dedicated support team to help you with setup, optimization, and any questions you may have.",
    
    // EA Overview Section
    "eaOverview.tagline": "Our Expert Advisors",
    "eaOverview.title": "Choose Your Trading System",
    "eaOverview.description": "Two distinct strategies designed for different market conditions and trading preferences.",
    "eaOverview.icf.name": "Trade2live ICF$",
    "eaOverview.icf.description": "Optimized for volatile market conditions with quick profit-taking and tight stop losses.",
    "eaOverview.icf.strategy": "Scalping & Intraday",
    "eaOverview.icf.pairs": "Major Pairs",
    "eaOverview.icf.maxDrawdown": "Max DD: 15%",
    "eaOverview.zb.name": "Trade2live ZB$",
    "eaOverview.zb.description": "Designed for stable, consistent returns with longer holding periods and trend following.",
    "eaOverview.zb.strategy": "Swing Trading",
    "eaOverview.zb.pairs": "Multi-Currency",
    "eaOverview.zb.maxDrawdown": "Max DD: 12%",
    "eaOverview.learnMore": "Learn More",
    
    // Testimonials Section
    "testimonials.tagline": "Testimonials",
    "testimonials.title": "What Our Clients Say",
    "testimonials.description": "Real feedback from traders who trust Trade2live for their automated trading needs.",
    
    // CTA Section
    "cta.title": "Ready to Start Trading?",
    "cta.description": "Join thousands of traders who trust Trade2live for consistent, low-risk automated trading.",
    "cta.viewPricing": "View Pricing",
    "cta.contactUs": "Contact Us",
    
    // Footer
    "footer.description": "Professional EA trading solutions for sustainable, long-term growth.",
    "footer.products": "Products",
    "footer.company": "Company",
    "footer.legal": "Legal",
    "footer.terms": "Terms & Conditions",
    "footer.privacy": "Privacy Policy",
    "footer.refund": "Refund Policy",
    "footer.copyright": "© 2024 Trade2live. All rights reserved.",
    "footer.riskWarning": "Risk Warning: Trading forex carries a high level of risk and may not be suitable for all investors.",
    
    // About Page
    "about.title": "About Trade2live",
    "about.subtitle": "Professional EA Trading Solutions",
    
    // Pricing Page
    "pricing.title": "Simple, Transparent Pricing",
    "pricing.subtitle": "Choose the plan that fits your trading needs",
    
    // Performance Page
    "performance.title": "Live Performance",
    "performance.subtitle": "Real-time verified trading results",
    
    // Contact Page
    "contact.title": "Get in Touch",
    "contact.subtitle": "We're here to help you succeed",
    
    // FAQ Page
    "faq.title": "Frequently Asked Questions",
    "faq.subtitle": "Find answers to common questions",
  },
  lo: {
    // Navbar
    "nav.home": "ໜ້າຫຼັກ",
    "nav.ourProduct": "ຜະລິດຕະພັນ",
    "nav.performance": "ຜົນງານ",
    "nav.pricing": "ລາຄາ",
    "nav.about": "ກ່ຽວກັບ",
    "nav.faq": "ຄຳຖາມທີ່ພົບເລື້ອຍ",
    "nav.contact": "ຕິດຕໍ່",
    "nav.getStarted": "ເລີ່ມຕົ້ນ",
    
    // Hero Section
    "hero.tagline": "ການຊື້ຂາຍ EA ແບບມືອາຊີບ",
    "hero.title": "ຊື້ຂາຍອັດສະລິຍະກັບ",
    "hero.titleHighlight": "EA ທີ່ຂັບເຄື່ອນດ້ວຍ AI",
    "hero.description": "ປະສົບການການຊື້ຂາຍທີ່ມີຄວາມສ່ຽງຕ່ຳ ແລະ ຍືນຍົງດ້ວຍທີ່ປຶກສາຜູ້ຊ່ຽວຊານທີ່ພັດທະນາຂຶ້ນຢ່າງມືອາຊີບ. ອອກແບບມາເພື່ອການອະນຸລັກທຶນໃນໄລຍະຍາວ ແລະ ຜົນຕອບແທນທີ່ສະໝ່ຳສະເໝີ.",
    "hero.viewPerformance": "ເບິ່ງຜົນງານ",
    "hero.explorePricing": "ເບິ່ງລາຄາ",
    "hero.stat.maxDrawdown": "ການຫຼຸດສູງສຸດ",
    "hero.stat.winRate": "ອັດຕາຊະນະ",
    "hero.stat.yearsExperience": "ປີປະສົບການ",
    
    // Features Section
    "features.tagline": "ເປັນຫຍັງຕ້ອງເລືອກ Trade2live",
    "features.title": "ສ້າງຂຶ້ນສຳລັບນັກເທຣດມືອາຊີບ",
    "features.description": "ທີ່ປຶກສາຜູ້ຊ່ຽວຊານຂອງພວກເຮົາຖືກອອກແບບມາດ້ວຍເປົ້າໝາຍດຽວ: ຄວາມສາມາດໃນການທຳກຳໄລທີ່ຍືນຍົງໃນໄລຍະຍາວດ້ວຍຄວາມສ່ຽງໜ້ອຍທີ່ສຸດ.",
    "features.riskManagement": "ການຄຸ້ມຄອງຄວາມສ່ຽງ",
    "features.riskManagementDesc": "ລະບົບອັດຕະໂນມັດຂັ້ນສູງຮັບປະກັນວ່າທຶນຂອງທ່ານໄດ້ຮັບການປົກປ້ອງດ້ວຍຂໍ້ຈຳກັດການຫຼຸດ ແລະ ຂະໜາດຕຳແໜ່ງທີ່ເຂັ້ມງວດ.",
    "features.autoTrading": "ການຊື້ຂາຍອັດຕະໂນມັດ 24/7",
    "features.autoTradingDesc": "ຕັ້ງຄ່າແລ້ວລືມມັນໄປ. EA ຂອງພວກເຮົາເຮັດວຽກຕະຫຼອດເວລາ, ຈັບໂອກາດໃນທຸກໆຊ່ວງຕະຫຼາດ.",
    "features.transparency": "ຄວາມໂປ່ງໃສຢ່າງເຕັມທີ່",
    "features.transparencyDesc": "ການຕິດຕາມຜົນງານແບບເວລາຈິງດ້ວຍການຢັ້ງຢືນຈາກ Myfxbook. ບໍ່ມີຜົນລັບທີ່ເຊື່ອງໄວ້ຫຼືຂໍ້ມູນທີ່ຄັດເລືອກ.",
    "features.support": "ການສະໜັບສະໜູນຈາກຜູ້ຊ່ຽວຊານ",
    "features.supportDesc": "ທີມງານສະໜັບສະໜູນທີ່ອຸທິດຕົນເພື່ອຊ່ວຍທ່ານໃນການຕັ້ງຄ່າ, ການເພີ່ມປະສິດທິພາບ, ແລະຄຳຖາມທີ່ທ່ານອາດຈະມີ.",
    
    // EA Overview Section
    "eaOverview.tagline": "ທີ່ປຶກສາຜູ້ຊ່ຽວຊານຂອງພວກເຮົາ",
    "eaOverview.title": "ເລືອກລະບົບການຊື້ຂາຍຂອງທ່ານ",
    "eaOverview.description": "ສອງກົນລະຍຸດທີ່ແຕກຕ່າງກັນອອກແບບມາສຳລັບສະພາບຕະຫຼາດ ແລະ ຄວາມມັກໃນການຊື້ຂາຍທີ່ແຕກຕ່າງກັນ.",
    "eaOverview.icf.name": "Trade2live ICF$",
    "eaOverview.icf.description": "ປັບປຸງໃຫ້ເໝາະສົມສຳລັບສະພາບຕະຫຼາດທີ່ຜັນຜວນດ້ວຍການທຳກຳໄລໄວ ແລະ ການຢຸດການຂາດທຶນທີ່ເຂັ້ມງວດ.",
    "eaOverview.icf.strategy": "Scalping & Intraday",
    "eaOverview.icf.pairs": "ຄູ່ຫຼັກ",
    "eaOverview.icf.maxDrawdown": "DD ສູງສຸດ: 15%",
    "eaOverview.zb.name": "Trade2live ZB$",
    "eaOverview.zb.description": "ອອກແບບມາສຳລັບຜົນຕອບແທນທີ່ໝັ້ນຄົງ ແລະ ສະໝ່ຳສະເໝີດ້ວຍໄລຍະເວລາການຖືຄອງທີ່ຍາວນານ ແລະ ການຕິດຕາມແນວໂນ້ມ.",
    "eaOverview.zb.strategy": "Swing Trading",
    "eaOverview.zb.pairs": "ຫຼາຍສະກຸນເງິນ",
    "eaOverview.zb.maxDrawdown": "DD ສູງສຸດ: 12%",
    "eaOverview.learnMore": "ຮຽນຮູ້ເພີ່ມເຕີມ",
    
    // Testimonials Section
    "testimonials.tagline": "ຄຳຊົມເຊີຍ",
    "testimonials.title": "ລູກຄ້າຂອງພວກເຮົາເວົ້າຫຍັງ",
    "testimonials.description": "ຄຳຕິຊົມຈິງຈາກນັກເທຣດທີ່ໄວ້ວາງໃຈ Trade2live ສຳລັບຄວາມຕ້ອງການການຊື້ຂາຍອັດຕະໂນມັດຂອງພວກເຂົາ.",
    
    // CTA Section
    "cta.title": "ພ້ອມທີ່ຈະເລີ່ມຊື້ຂາຍບໍ?",
    "cta.description": "ເຂົ້າຮ່ວມກັບນັກເທຣດຫຼາຍພັນຄົນທີ່ໄວ້ວາງໃຈ Trade2live ສຳລັບການຊື້ຂາຍອັດຕະໂນມັດທີ່ມີຄວາມສ່ຽງຕ່ຳ ແລະ ສະໝ່ຳສະເໝີ.",
    "cta.viewPricing": "ເບິ່ງລາຄາ",
    "cta.contactUs": "ຕິດຕໍ່ພວກເຮົາ",
    
    // Footer
    "footer.description": "ວິທີແກ້ໄຂການຊື້ຂາຍ EA ແບບມືອາຊີບສຳລັບການເຕີບໂຕທີ່ຍືນຍົງໃນໄລຍະຍາວ.",
    "footer.products": "ຜະລິດຕະພັນ",
    "footer.company": "ບໍລິສັດ",
    "footer.legal": "ກົດໝາຍ",
    "footer.terms": "ເງື່ອນໄຂ ແລະ ຂໍ້ກຳນົດ",
    "footer.privacy": "ນະໂຍບາຍຄວາມເປັນສ່ວນຕົວ",
    "footer.refund": "ນະໂຍບາຍການຄືນເງິນ",
    "footer.copyright": "© 2024 Trade2live. ສະຫງວນລິຂະສິດ.",
    "footer.riskWarning": "ຄຳເຕືອນຄວາມສ່ຽງ: ການຊື້ຂາຍ forex ມີຄວາມສ່ຽງສູງ ແລະ ອາດບໍ່ເໝາະສົມສຳລັບນັກລົງທຶນທຸກຄົນ.",
    
    // About Page
    "about.title": "ກ່ຽວກັບ Trade2live",
    "about.subtitle": "ວິທີແກ້ໄຂການຊື້ຂາຍ EA ແບບມືອາຊີບ",
    
    // Pricing Page
    "pricing.title": "ລາຄາງ່າຍໆ ໂປ່ງໃສ",
    "pricing.subtitle": "ເລືອກແພັກເກດທີ່ເໝາະກັບຄວາມຕ້ອງການການຊື້ຂາຍຂອງທ່ານ",
    
    // Performance Page
    "performance.title": "ຜົນງານສົດ",
    "performance.subtitle": "ຜົນການຊື້ຂາຍທີ່ຢັ້ງຢືນແບບເວລາຈິງ",
    
    // Contact Page
    "contact.title": "ຕິດຕໍ່ພວກເຮົາ",
    "contact.subtitle": "ພວກເຮົາຢູ່ທີ່ນີ້ເພື່ອຊ່ວຍໃຫ້ທ່ານປະສົບຜົນສຳເລັດ",
    
    // FAQ Page
    "faq.title": "ຄຳຖາມທີ່ພົບເລື້ອຍ",
    "faq.subtitle": "ຊອກຫາຄຳຕອບສຳລັບຄຳຖາມທົ່ວໄປ",
  },
};

const LanguageContext = createContext<LanguageContextType | undefined>(undefined);

export const LanguageProvider = ({ children }: { children: ReactNode }) => {
  const [language, setLanguage] = useState<Language>("en");

  const t = (key: string): string => {
    return translations[language][key] || key;
  };

  return (
    <LanguageContext.Provider value={{ language, setLanguage, t }}>
      {children}
    </LanguageContext.Provider>
  );
};

export const useLanguage = () => {
  const context = useContext(LanguageContext);
  if (!context) {
    throw new Error("useLanguage must be used within a LanguageProvider");
  }
  return context;
};
