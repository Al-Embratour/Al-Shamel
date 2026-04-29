"use client";
import React, { createContext, useState, useContext, useEffect, ReactNode } from 'react';

interface LanguageContextType {
  lang: string;
  toggleLanguage: () => void;
  t: any;
}

const LanguageContext = createContext<LanguageContextType | undefined>(undefined);

export const LanguageProvider = ({ children }: { children: ReactNode }) => {
  const [lang, setLang] = useState('ar');
  const [isReady, setIsReady] = useState(false);

  const translations: any = {
    ar: {
      title: 'الشامل',
      home: 'الرئيسية',
      about: 'عن البرنامج',
      videos: 'الفيديوهات',
      photos: 'الصور',
      contact: 'تواصل معنا',
      langBtn: 'English',
      dir: 'rtl',
      heroTitle: 'برنامج الشامل للحسابات والمخازن',

      footerAbout: 'برنامج الشامل هو الحل المتكامل لإدارة أعمالك وتوثيق مشاريعك باحترافية وسهولة، مصمم بأحدث التقنيات ليلبي احتياجاتك.',
      footerLinks: 'روابط سريعة',
      footerContact: 'تواصل معنا',
      footerRights: 'جميع الحقوق محفوظة لبرنامج الشامل © 2026',
      devName: 'أ/ محمد السيد',
      fbLink: 'https://www.facebook.com/share/1BQo6SPZDD/',
      youtubeLink: 'https://youtube.com/@alrahawy?si=O8w9L8c7kuw5gyzl',
      whatsappLink: 'https://wa.me/201150023774',

      // نصوص صفحة Videos - عربي
      videoTitle: 'شروحات البرنامج',
      videoWatchNow: 'شاهد الآن ←',
      videoLoading: 'جاري تحميل فيديوهات الإمبراطور...',
      videoEmpty: 'لا توجد فيديوهات مضافة حالياً.',
      videoDefaultDesc: 'شرح من شروحات البرنامج',

      // نصوص صفحة Photos - عربي
      photosTitle: 'معرض الصور',
      photosSub: 'تابع أحدث صور ومشاريع برنامج الشامل مباشرة من صفحتنا الرسمية',
      photosViewFB: 'مشاهدة على فيسبوك ←',

      // نصوص صفحة About المحدثة - عربي
      aboutTitle: 'برنامج الشامل للحسابات والمخازن',
      aboutSub: 'إذا كنت تبحث عن أفضل برنامج حسابات في مصر لإدارة أعمالك بسهولة ودقة، فإن برنامج الشامل يقدم لك برنامج حسابات متكامل (برنامج محاسبة احترافي) مصمم خصيصاً لتلبية احتياجات الشركات في السوق المصري.',
      aboutHeroDesc: 'سواء كنت تدير شركة صغيرة أو مؤسسة كبيرة، يوفر لك البرنامج رؤية شاملة للعمليات المالية، مع تقارير دقيقة تساعدك على اتخاذ قرارات أفضل وزيادة أرباحك.',
      aboutNote: 'برنامج الشامل ليس مجرد برنامج حسابات، بل هو نظام محاسبة متكامل يمكنك من ربط الحسابات مع إدارة المخازن والمبيعات ضمن برنامج واحد سهل الاستخدام، مع دعم كامل للفاتورة الإلكترونية والتوافق مع الضرائب المصرية.',
      sec1Title: 'لماذا تحتاج برنامج حسابات في شركتك؟',
      sec1Sub: 'حوّل الفوضى التشغيلية إلى نظام واضح وقابل للقياس باستخدام برنامج حسابات متكامل يساعدك على إدارة أعمالك بدقة وكفاءة. تعاني العديد من الشركات من تأخر التقارير، وعدم دقة المخزون، وتكرار الأخطاء اليومية، خاصة عند الاعتماد على الأساليب التقليدية أو الأدوات غير المترابطة.',
      sec2Title: 'مميزات برنامج الشامل',
      sec2Items: [
        'تقارير مالية وتفصيلية محسنة تساعد في اتخاذ قرارات دقيقة وسريعة.',
        'نظام صلاحيات متقدم يضمن سرية البيانات ويوفر تحكمًا دقيقًا حسب دور كل مستخدم.',
        'إدارة متكاملة للمخزون والمستودعات مع تتبع شامل لحركات الأصناف والمبيعات.',
      ],
      aboutFooter: 'هذا بخلاف مزايا وتقارير كتييير تقدر تكتشفها مع استخدام البرنامج.'
    },
    en: {
      title: 'Al-Shamel',
      home: 'Home',
      about: 'About',
      videos: 'Videos',
      photos: 'Photos',
      contact: 'Contact Us',
      langBtn: 'العربية',
      dir: 'ltr',
      heroTitle: 'AL-SHAMEL',
      v2010: '2010 Edition',
      v2026: '2026 Edition',
      footerAbout: 'Al-Shamel is the comprehensive solution to manage your business and document your projects professionally and easily.',
      footerLinks: 'Quick Links',
      footerContact: 'Connect With Us',
      footerRights: 'All Rights Reserved to Al-Shamel Program © 2026',
      devName: 'Mr. Mohamed Elsayed',
      fbLink: 'https://www.facebook.com/share/1BQo6SPZDD/',
      youtubeLink: 'https://youtube.com/@alrahawy?si=O8w9L8c7kuw5gyzl',
      whatsappLink: 'https://wa.me/201150023774',

      // Videos Page - English
      videoTitle: 'Program Tutorials',
      videoWatchNow: 'Watch Now →',
      videoLoading: 'Loading Emperor Videos...',
      videoEmpty: 'No videos added yet.',
      videoDefaultDesc: 'Program Tutorial Video',

      // Photos Page - English
      photosTitle: 'Photo Gallery',
      photosSub: 'Follow our latest projects and updates directly on our official Facebook page',
      photosViewFB: 'View on Facebook →',

      // Updated About Page Texts - English
      aboutTitle: 'Al-Shamel Accounting & Warehouse',
      aboutSub: 'If you are looking for the best accounting software in Egypt to manage your business with ease and accuracy, Al-Shamel provides an integrated professional accounting system specifically designed to meet the needs of the Egyptian market.',
      aboutHeroDesc: 'Whether you manage a small business or a large corporation, the program provides a comprehensive view of financial operations, with accurate reports that help you make better decisions and increase profits.',
      aboutNote: 'Al-Shamel is not just accounting software; it is an integrated accounting system that enables you to link accounts with warehouse and sales management within one easy-to-use program, with full support for electronic invoicing and compliance with Egyptian taxes.',
      sec1Title: 'Why do you need accounting software in your company?',
      sec1Sub: 'Turn operational chaos into a clear and measurable system using an integrated accounting program that helps you manage your business accurately and efficiently. Many companies suffer from delayed reports, inaccurate inventory, and recurring daily errors, especially when relying on traditional methods or disconnected tools.',
      sec2Title: 'Al-Shamel Program Features',
      sec2Items: [
        'Enhanced financial and detailed reports that help in making accurate and fast decisions.',
        'Advanced permissions system ensures data confidentiality and provides precise control based on each user\'s role.',
        'Integrated inventory and warehouse management with comprehensive tracking of item movements and sales.',
      ],
      aboutFooter: 'This is besides many other features and reports you can discover while using the program.'
    }
  };

  useEffect(() => {
    const savedLang = localStorage.getItem('alshamel_lang');
    if (savedLang && (savedLang === 'ar' || savedLang === 'en')) {
      setLang(savedLang);
    }
    setIsReady(true);
  }, []);

  useEffect(() => {
    if (isReady) {
      document.documentElement.dir = translations[lang].dir;
      document.documentElement.lang = lang;
      localStorage.setItem('alshamel_lang', lang);
    }
  }, [lang, isReady, translations]);

  const toggleLanguage = () => {
    setLang((prev) => (prev === 'ar' ? 'en' : 'ar'));
  };

  if (!isReady) return null;

  return (
    <LanguageContext.Provider value={{ lang, toggleLanguage, t: translations[lang] }}>
      <div dir={translations[lang].dir}>
        {children}
      </div>
    </LanguageContext.Provider>
  );
};

export const useLanguage = () => {
  const context = useContext(LanguageContext);
  if (context === undefined) throw new Error('useLanguage must be used within a LanguageProvider');
  return context;
};