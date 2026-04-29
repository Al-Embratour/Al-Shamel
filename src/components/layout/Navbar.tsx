"use client";
import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useLanguage } from '@/context/LanguageContext';

const Navbar = () => {
  const { lang, toggleLanguage, t } = useLanguage();
  const pathname = usePathname();
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  // منع السكرول لما المنيو يفتح عشان الكلام ميتداخلش وأنت بتحرك صباعك
  useEffect(() => {
    if (isMenuOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }
  }, [isMenuOpen]);

  const navLinks = [
    { name: t.home, href: "/" },
    { name: t.about, href: "/about" },
    { name: lang === 'ar' ? "البرامج" : "Programs", href: "/fields" },
    { name: t.videos, href: "/videos" },
    { name: t.photos, href: "/photos" },
    { name: t.contact, href: "/contact" },
  ];

  return (
    <>
      <nav className="w-full bg-[#0f172a] shadow-2xl border-b border-slate-800 sticky top-0 z-[100] h-20">
        <div className="max-w-7xl mx-auto px-6 h-full flex items-center justify-between">
          
          {/* اللوجو */}
          <Link href="/" className="flex items-center gap-3 z-[110]">
            <div className="w-10 h-10 flex items-center justify-center bg-gradient-to-tr from-blue-600 to-cyan-400 rounded-xl shadow-[0_0_20px_rgba(37,99,235,0.4)]">
              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="white" className="w-6 h-6">
                <path strokeLinecap="round" strokeLinejoin="round" d="M21 7.5l-9-5.25L3 7.5m18 0l-9 5.25m9-5.25v9l-9 5.25M3 7.5l9 5.25M3 7.5v9l9 5.25m0-5.25v9" />
              </svg>
            </div>
            <span className="text-xl font-black text-white uppercase hidden xs:block">{t.title}</span>
          </Link>

          {/* لينكات الديسكتوب */}
          <div className="hidden md:flex items-center gap-8">
            {navLinks.map((link) => (
              <Link key={link.href} href={link.href} className={`text-sm font-bold ${pathname === link.href ? 'text-cyan-400' : 'text-slate-300'}`}>
                {link.name}
              </Link>
            ))}
          </div>

          {/* الزراير (اللغة + الهامبرجر) */}
          <div className="flex items-center gap-3 z-[110]">
            <button onClick={toggleLanguage} className="w-10 h-10 rounded-xl border border-slate-700 bg-slate-300 text-slate-900 text-[10px] font-black">
              {lang === 'ar' ? 'EN' : 'AR'}
            </button>
            
            <button onClick={() => setIsMenuOpen(!isMenuOpen)} className="md:hidden w-10 h-10 rounded-xl border border-slate-700 bg-slate-900 text-cyan-400 flex items-center justify-center">
              {isMenuOpen ? '✕' : '☰'}
            </button>
          </div>
        </div>
      </nav>

      {/* المنيو المنفصل تماماً عن الـ Nav */}
      <div className={`fixed inset-0 bg-[#0f172a] z-[105] flex flex-col items-center justify-center transition-all duration-300 md:hidden ${isMenuOpen ? 'visible opacity-100' : 'invisible opacity-0'}`}>
        <div className="flex flex-col items-center gap-10">
          {navLinks.map((link) => (
            <Link 
              key={link.href} 
              href={link.href} 
              onClick={() => setIsMenuOpen(false)}
              className={`text-3xl font-black ${pathname === link.href ? 'text-cyan-400' : 'text-slate-300'}`}
            >
              {link.name}
            </Link>
          ))}
        </div>
      </div>
    </>
  );
};

export default Navbar;