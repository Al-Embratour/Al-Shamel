"use client";
import React, { useState } from 'react'; // أضفنا useState هنا
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useLanguage } from '@/context/LanguageContext';

const Navbar = () => {
  const { lang, toggleLanguage, t } = useLanguage();
  const pathname = usePathname();
  
  // حالة التحكم في منيو الموبايل
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const navLinks = [
    { name: t.home, href: "/" },
    { name: t.about, href: "/about" },
    { name: lang === 'ar' ? "التخصصات" : "Solutions", href: "/fields" },
    { name: t.videos, href: "/videos" },
    { name: t.photos, href: "/photos" },
    { name: t.contact, href: "/contact" },
  ];

  return (
    <nav className="w-full bg-[#0f172a]/95 backdrop-blur-xl shadow-2xl border-b border-slate-800 sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-6 h-20 flex items-center justify-between">
        
        {/* اللوجو */}
        <Link href="/" className="flex items-center gap-3 group cursor-pointer z-[60]">
          <div className="relative w-10 h-10 flex items-center justify-center bg-gradient-to-tr from-blue-600 to-cyan-400 rounded-xl transform group-hover:rotate-12 transition-all duration-300 shadow-[0_0_20px_rgba(37,99,235,0.4)]">
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="white" className="w-6 h-6">
              <path strokeLinecap="round" strokeLinejoin="round" d="M21 7.5l-9-5.25L3 7.5m18 0l-9 5.25m9-5.25v9l-9 5.25M3 7.5l9 5.25M3 7.5v9l9 5.25m0-5.25v9" />
            </svg>
          </div>
          <div className="flex flex-col leading-tight">
            <span className="text-xl font-black tracking-tight text-white uppercase">{t.title}</span>
          </div>
        </Link>

        {/* اللينكات للكمبيوتر (Desktop) */}
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

        {/* أدوات الموبايل واللغة */}
        <div className="flex items-center gap-3 md:gap-5">
          {/* زر اللغة */}
          <button 
            onClick={toggleLanguage}
            className="flex items-center justify-center w-10 h-10 rounded-xl border border-slate-700 bg-slate-900 text-slate-300 hover:text-white transition-all active:scale-95 shadow-lg group"
          >
            <span className="text-[10px] font-black uppercase group-hover:text-cyan-400 transition-colors">
              {lang === 'ar' ? 'EN' : 'AR'}
            </span>
          </button>

          {/* زر الهامبرجر للموبايل */}
          <button 
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            className="md:hidden flex items-center justify-center w-10 h-10 rounded-xl border border-slate-700 bg-slate-900 text-cyan-400 shadow-lg z-[60]"
          >
            {isMenuOpen ? (
              <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
            ) : (
              <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16m-7 6h7" />
              </svg>
            )}
          </button>
        </div>
      </div>

      {/* قائمة الموبايل المنسدلة */}
      <div 
        className={`fixed inset-0 bg-[#0f172a]/98 backdrop-blur-2xl z-[55] transition-all duration-500 md:hidden ${
          isMenuOpen ? 'opacity-100 translate-x-0' : 'opacity-0 translate-x-full pointer-events-none'
        }`}
      >
        <div className="flex flex-col items-center justify-center h-full gap-8 p-10">
          {navLinks.map((link) => {
            const isActive = pathname === link.href;
            return (
              <Link
                key={link.href}
                href={link.href}
                onClick={() => setIsMenuOpen(false)} // يغلق المنيو عند الضغط
                className={`text-2xl font-black transition-all duration-300 
                  ${isActive ? 'text-cyan-400 scale-110' : 'text-slate-300 hover:text-white'}`}
              >
                {link.name}
              </Link>
            );
          })}
        </div>
      </div>
    </nav>
  );
};

export default Navbar;