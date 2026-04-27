"use client";
import React from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useLanguage } from '@/context/LanguageContext';

const Navbar = () => {
  const { lang, toggleLanguage, t } = useLanguage();
  const pathname = usePathname();

  // مصفوفة اللينكات المحدثة بصفحة About بعد الرئيسية مباشرة
  const navLinks = [
    { name: t.home, href: "/" },
    { name: t.about, href: "/about" }, // اللينك الجديد هنا
    { name: t.videos, href: "/videos" },
    { name: t.photos, href: "/photos" },
    { name: t.contact, href: "/contact" },
  ];

  return (
    <nav className="w-full bg-[#0f172a]/95 backdrop-blur-xl shadow-2xl border-b border-slate-800 sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-6 h-20 flex items-center justify-between">
        
        {/* اللوجو */}
        <Link href="/" className="flex items-center gap-3 group cursor-pointer">
          <div className="relative w-10 h-10 flex items-center justify-center bg-gradient-to-tr from-blue-600 to-cyan-400 rounded-xl transform group-hover:rotate-12 transition-all duration-300 shadow-[0_0_20px_rgba(37,99,235,0.4)]">
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="white" className="w-6 h-6">
              <path strokeLinecap="round" strokeLinejoin="round" d="M21 7.5l-9-5.25L3 7.5m18 0l-9 5.25m9-5.25v9l-9 5.25M3 7.5l9 5.25M3 7.5v9l9 5.25m0-5.25v9" />
            </svg>
          </div>
          <div className="flex flex-col leading-tight">
            <span className="text-xl font-black tracking-tight text-white uppercase">{t.title}</span>
          </div>
        </Link>

        {/* اللينكات مع خاصية الـ Active */}
        <div className="hidden md:flex items-center gap-8 lg:gap-10">
          {navLinks.map((link) => {
            const isActive = pathname === link.href;

            return (
              <Link
                key={link.href}
                href={link.href}
                className={`relative text-sm font-bold transition-all duration-300 
                  ${isActive ? 'text-cyan-400' : 'text-slate-300 hover:text-white'}`}
              >
                {link.name}
                <span className={`absolute -bottom-1 left-0 h-0.5 bg-cyan-400 transition-all duration-300 
                  ${isActive ? 'w-full' : 'w-0'}`} 
                />
              </Link>
            );
          })}
        </div>

        {/* السيرش واللغة */}
        <div className="flex items-center gap-5">
          <div className="relative group hidden lg:block">

              <path strokeLinecap="round" strokeLinejoin="round" d="M21 21l-5.197-5.197m0 0A7.5 7.5 0 105.196 5.196a7.5 7.5 0 0010.607 10.607z" />
            
          </div>

          <button 
            onClick={toggleLanguage}
            className="flex items-center justify-center w-10 h-10 rounded-xl border border-slate-700 bg-slate-900 text-slate-300 hover:text-white transition-all active:scale-95 shadow-lg group"
          >
            <span className="text-[10px] font-black uppercase group-hover:text-cyan-400 transition-colors">
              {lang === 'ar' ? 'EN' : 'AR'}
            </span>
          </button>
        </div>

      </div>
    </nav>
  );
};

export default Navbar;