"use client";
import React from 'react';
import { useLanguage } from '@/context/LanguageContext';

const AboutPage = () => {
  const { t } = useLanguage();

  return (
    <main className="min-h-screen bg-[#0f172a] text-white py-20">
      <div className="max-w-7xl mx-auto px-6">
        
        {/* Header Section - النص التعريفي الجديد */}
        <div className="text-center mb-20">
          <h1 className="text-4xl md:text-6xl font-black mb-8 text-white drop-shadow-[0_10px_10px_rgba(255,255,255,0.1)] leading-tight">
            {t.aboutTitle}
          </h1>
          <p className="text-slate-300 text-lg md:text-2xl max-w-4xl mx-auto leading-relaxed font-medium mb-6">
            {t.aboutSub}
          </p>
          <p className="text-slate-400 text-md md:text-lg max-w-3xl mx-auto leading-relaxed">
            {t.aboutHeroDesc}
          </p>
          <div className="mt-10 p-6 rounded-3xl bg-blue-500/5 border border-blue-500/20 text-cyan-400 font-semibold text-lg max-w-4xl mx-auto shadow-inner">
            {t.aboutNote}
          </div>
        </div>

        {/* Features Grid */}
        <div className="flex flex-col gap-12">
          
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            {/* القسم الأول: لماذا تحتاج البرنامج؟ */}
            <div className="bg-slate-900/60 border border-slate-800 p-10 rounded-[2.5rem] shadow-xl backdrop-blur-sm relative overflow-hidden group">
              <div className="absolute -top-10 -left-10 w-32 h-32 bg-blue-600/10 rounded-full blur-3xl"></div>
              
              <div className="relative z-10">
                <div className="w-14 h-14 bg-blue-600 rounded-2xl flex items-center justify-center mb-8 shadow-lg shadow-blue-600/20">
                  <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                </div>
                <h2 className="text-3xl font-black mb-6 text-white">{t.sec1Title}</h2>
                <p className="text-slate-400 text-lg leading-relaxed font-medium">
                  {t.sec1Sub}
                </p>
              </div>
            </div>

            {/* القسم الثاني: مميزات البرنامج (القسم الفاتح) */}
            <div className="bg-gradient-to-br from-white to-slate-100 p-10 rounded-[2.5rem] shadow-2xl relative overflow-hidden group">
              <div className="absolute -bottom-20 -right-20 w-48 h-48 bg-blue-200 rounded-full blur-3xl opacity-50"></div>
              
              <div className="relative z-10 h-full flex flex-col">
                <div className="w-14 h-14 bg-blue-600 rounded-2xl flex items-center justify-center mb-8 shadow-lg shadow-blue-600/30">
                  <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                </div>
                <h2 className="text-3xl font-black mb-8 text-slate-900">{t.sec2Title}</h2>
                
                <div className="grid grid-cols-1 gap-4 mt-auto">
                  {t.sec2Items.map((item: string, i: number) => (
                    <div key={i} className="flex items-start gap-4 p-4 bg-white/80 rounded-2xl border border-slate-200 shadow-sm transition-transform hover:translate-x-2">
                      <div className="w-6 h-6 bg-blue-600 rounded-full flex items-center justify-center shrink-0 mt-1">
                        <svg className="w-4 h-4 text-white" fill="currentColor" viewBox="0 0 20 20">
                          <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                        </svg>
                      </div>
                      <p className="text-slate-700 font-bold text-md leading-snug">{item}</p>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>

          {/* Footer Note */}
          <div className="mt-10 text-center p-12 bg-gradient-to-r from-blue-700 to-cyan-600 rounded-[3rem] shadow-2xl shadow-blue-900/40 border border-white/10">
            <p className="text-white text-2xl md:text-3xl font-black italic leading-relaxed">
              "{t.aboutFooter}"
            </p>
          </div>

        </div>
      </div>
    </main>
  );
};

export default AboutPage;