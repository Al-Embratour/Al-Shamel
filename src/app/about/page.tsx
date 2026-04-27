"use client";
import React from 'react';
import { useLanguage } from '@/context/LanguageContext';

const AboutPage = () => {
  const { t } = useLanguage();

  return (
    <main className="min-h-screen bg-[#0f172a] text-white py-20">
      <div className="max-w-6xl mx-auto px-6">
        
        {/* Header Section */}
        <div className="text-center mb-20">
          {/* تم تعديل اللون هنا للأبيض الصريح مع تقليل الـ Glow خلفه */}
          <h1 className="text-4xl md:text-6xl font-black mb-6 text-white drop-shadow-[0_10px_10px_rgba(255,255,255,0.1)]">
            {t.aboutTitle}
          </h1>
          <p className="text-slate-400 text-lg md:text-xl max-w-3xl mx-auto leading-relaxed">
            {t.aboutSub}
          </p>
          <div className="mt-6 inline-block py-2 px-6 rounded-full bg-blue-500/10 border border-blue-500/20 text-cyan-400 font-bold text-sm">
            {t.aboutNote}
          </div>
        </div>

        {/* Features Grid */}
        <div className="flex flex-col gap-10">
          
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Section 1: Basic Data (Dark) */}
            <div className="bg-slate-900/40 border border-slate-800 p-8 rounded-[2.5rem] shadow-xl backdrop-blur-sm">
              <div className="w-12 h-12 bg-blue-600 rounded-2xl flex items-center justify-center mb-6 shadow-lg shadow-blue-600/20">
                <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" /></svg>
              </div>
              <h2 className="text-2xl font-bold mb-6 text-white">{t.sec1Title}</h2>
              <ul className="space-y-3">
                {t.sec1Items.map((item: string, i: number) => (
                  <li key={i} className="text-slate-400 text-sm flex items-center gap-3">
                    <span className="w-1.5 h-1.5 bg-blue-500 rounded-full"></span> {item}
                  </li>
                ))}
              </ul>
            </div>

            {/* Section 2: Recording (Light Section) */}
            <div className="lg:col-span-2 bg-gradient-to-br from-white to-slate-50 p-10 rounded-[2.5rem] shadow-2xl shadow-white/5 relative overflow-hidden group">
              <div className="absolute -top-24 -right-24 w-48 h-48 bg-blue-100 rounded-full blur-3xl group-hover:bg-blue-200 transition-colors"></div>
              
              <div className="relative z-10">
                <div className="w-12 h-12 bg-blue-600 rounded-2xl flex items-center justify-center mb-6 shadow-lg shadow-blue-600/30">
                  <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2m-3 7h3m-3 4h3m-6-4h.01M9 16h.01" /></svg>
                </div>
                <h2 className="text-3xl font-black mb-8 text-slate-900">{t.sec2Title}</h2>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
                  <div className="bg-white/50 p-6 rounded-3xl border border-slate-200 shadow-sm">
                    <h3 className="text-blue-600 font-black mb-4 flex items-center gap-2 text-lg">
                      {t.sec2Acc}
                    </h3>
                    <ul className="space-y-3">
                      {t.sec2AccItems.map((item: string, i: number) => (
                        <li key={i} className="text-slate-600 text-sm font-semibold flex items-center gap-3">
                          <div className="w-2 h-2 bg-blue-600 rounded-full"></div> {item}
                        </li>
                      ))}
                    </ul>
                  </div>
                  
                  <div className="bg-white/50 p-6 rounded-3xl border border-slate-200 shadow-sm">
                    <h3 className="text-cyan-600 font-black mb-4 flex items-center gap-2 text-lg">
                      {t.sec2Inv}
                    </h3>
                    <ul className="space-y-3">
                      {t.sec2InvItems.map((item: string, i: number) => (
                        <li key={i} className="text-slate-600 text-sm font-semibold flex items-center gap-3">
                          <div className="w-2 h-2 bg-cyan-500 rounded-full"></div> {item}
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Section 3: Reports (Dark Glass) */}
          <div className="bg-slate-900/40 border border-slate-800 p-10 rounded-[3rem] shadow-2xl relative overflow-hidden backdrop-blur-md">
             <div className="absolute top-0 right-0 w-64 h-64 bg-blue-500/10 blur-[120px]"></div>
             <h2 className="text-3xl font-black mb-10 text-white flex items-center gap-4">
               <span className="w-12 h-12 bg-blue-600/20 rounded-2xl flex items-center justify-center border border-blue-500/30">📊</span>
               {t.sec3Title}
             </h2>
             <div className="grid grid-cols-1 md:grid-cols-2 gap-16 relative z-10">
                <div>
                  <h3 className="text-xl font-bold mb-6 text-blue-400 border-b border-blue-400/20 pb-2 inline-block">{t.sec3Acc}</h3>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    {t.sec3AccItems.map((item: string, i: number) => (
                      <div key={i} className="flex items-center gap-3 p-3 bg-slate-800/50 rounded-xl border border-slate-700 text-sm text-slate-300">
                        <svg className="w-4 h-4 text-cyan-400" fill="currentColor" viewBox="0 0 20 20"><path d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" /></svg>
                        {item}
                      </div>
                    ))}
                  </div>
                </div>
                <div>
                  <h3 className="text-xl font-bold mb-6 text-cyan-400 border-b border-cyan-400/20 pb-2 inline-block">{t.sec3Inv}</h3>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    {t.sec3InvItems.map((item: string, i: number) => (
                      <div key={i} className="flex items-center gap-3 p-3 bg-slate-800/50 rounded-xl border border-slate-700 text-sm text-slate-300">
                        <svg className="w-4 h-4 text-blue-400" fill="currentColor" viewBox="0 0 20 20"><path d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" /></svg>
                        {item}
                      </div>
                    ))}
                  </div>
                </div>
             </div>
          </div>

        </div>

        {/* Footer Note */}
        <div className="mt-20 text-center p-12 bg-gradient-to-r from-blue-600 to-cyan-600 rounded-[3rem] shadow-2xl shadow-blue-900/40 transform hover:scale-[1.01] transition-transform">
          <p className="text-white text-2xl font-black italic leading-relaxed">
            "{t.aboutFooter}"
          </p>
        </div>

      </div>
    </main>
  );
};

export default AboutPage;