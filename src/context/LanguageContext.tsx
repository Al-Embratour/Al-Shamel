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
      search: 'ابحث عن فيديو معين...',
      langBtn: 'English',
      dir: 'rtl',
      heroTitle: 'برنامج الشامل',
      v2010: 'إصدار 2010',
      v2026: 'إصدار 2026',
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

      // نصوص صفحة Photos (Facebook) - عربي
      photosTitle: 'معرض الصور',
      photosSub: 'تابع أحدث صور ومشاريع برنامج الشامل مباشرة من صفحتنا الرسمية',
      photosViewFB: 'مشاهدة على فيسبوك ←',

      // نصوص صفحة About - عربي
      aboutTitle: 'برنامج الشامل للحسابات والمخازن',
      aboutSub: 'بفضل الله يقوم البرنامج بجميع الاعمال المحاسبية الشاقه بمنتهى السهولة حتى أن غير المحاسبين يستطيعون العمل عليه وتنظيم حساباتهم.',
      aboutNote: '(يمكنك معرفة موقفك المالى وارباحك فى اى وقت من السنة بمنتهى السهولة واليسر)',
      sec1Title: 'أولاً: البيانات الأساسية',
      sec1Items: [
        'اسم الشركة وعنوانها واللوجو',
        'صلاحيات المستخدمين (اضافة – حذف – تعديل – طباعه)',
        'دليل الحسابات (رئيسية وفرعية – فئات مقاولات)',
        'دليل الاصناف (مخزنية وخدمية – وحدات قياس)',
        'مراكز التكلفة',
        'المساهمين لتوزيع الأرباح',
        'دليل تليفونات وعناوين'
      ],
      sec2Title: 'ثانياً: تسجيل الحسابات والمخازن',
      sec2Acc: 'قسم الحسابات',
      sec2AccItems: ['سند قيد', 'سند قبض نقدى / شيك', 'سند صرف نقدى / شيك'],
      sec2Inv: 'قسم المخازن',
      sec2InvItems: [
        'المشتريات ومردوداتها',
        'المبيعات ومردوداتها',
        'المستخلصات وأوامر التوريد',
        'تحويلات مخزنية وأرصدة افتتاحية',
        'سند انتاج وصرف واستلام مخزنى',
        'عروض أسعار ومقايسات',
        'قائمة أسعار Price list'
      ],
      sec3Title: 'ثالثاً: التقارير الختامية',
      sec3Acc: 'تقارير الحسابات',
      sec3AccItems: ['كشف حساب (اجمالى وتفصيلى)', 'ميزان المراجعه', 'قائمة الأرباح والخسائر', 'الميزانية العمومية', 'تقرير التأكد من صحة البيانات'],
      sec3Inv: 'تقارير المخازن',
      sec3InvItems: ['أرصدة المخزن', 'كارت الصنف (حركات الصنف)', 'تقارير المبيعات والمشتريات'],
      aboutFooter: 'هذا بخلاف مزايا وتقارير كتييير تقدر تكتشفها مع استخدام البرنامج.'
    },
    en: {
      title: 'Al-Shamel',
      home: 'Home',
      about: 'About',
      videos: 'Videos',
      photos: 'Photos',
      contact: 'Contact Us',
      search: 'Search for a video...',
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

      // Photos Page (Facebook) - English
      photosTitle: 'Photo Gallery',
      photosSub: 'Follow our latest projects and updates directly on our official Facebook page',
      photosViewFB: 'View on Facebook →',

      // About Page Texts - English
      aboutTitle: 'Al-Shamel Accounting & Warehouse',
      aboutSub: 'By the grace of God, the program performs all difficult accounting tasks with ease, so even non-accountants can use it to organize their finances.',
      aboutNote: '(You can check your financial status and profits at any time of the year with ease)',
      sec1Title: 'I. Basic Data',
      sec1Items: [
        'Company Name, Address, and Logo',
        'User Permissions (Add – Delete – Edit – Print)',
        'Chart of Accounts (Main & Sub – Contracting categories)',
        'Item Directory (Stock & Service – Unit measurements)',
        'Cost Centers',
        'Shareholders for Profit Distribution',
        'Phone & Address Directory'
      ],
      sec2Title: 'II. Recording Accounts & Warehouse',
      sec2Acc: 'Accounts Department',
      sec2AccItems: ['Journal Voucher', 'Cash / Check Receipt', 'Cash / Check Payment'],
      sec2Inv: 'Warehouse Department',
      sec2InvItems: [
        'Purchases & Returns',
        'Sales & Returns',
        'Abstracts & Supply Orders',
        'Stock Transfers & Opening Balances',
        'Production & Stock Delivery Notes',
        'Quotations & Estimates',
        'Price list'
      ],
      sec3Title: 'III. Reports',
      sec3Acc: 'Accounting Reports',
      sec3AccItems: ['Account Statement (Total & Detailed)', 'Trial Balance', 'Profit and Loss Statement', 'Balance Sheet', 'Data Validation Report'],
      sec3Inv: 'Warehouse Reports',
      sec3InvItems: ['Warehouse Balances', 'Item Card (Movements)', 'Sales & Purchases Reports'],
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