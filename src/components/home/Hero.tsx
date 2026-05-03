"use client";
import React, { useState, useEffect } from 'react';
import { useLanguage } from '@/context/LanguageContext';
import Link from 'next/link';
import { motion, AnimatePresence } from 'framer-motion';
import { FaImages } from 'react-icons/fa';

const Hero = () => {
  const { t, lang } = useLanguage();
  
  const photos = [
    "/hero/home1.jpeg",
    "/hero/home2.jpeg",
    "/hero/home3.jpeg",
    "/hero/home4.jpeg",
    "/hero/home5.jpeg",
    "/hero/home6.jpeg",
  ];

  const [currentPhoto, setCurrentPhoto] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentPhoto((prev) => (prev + 1) % photos.length);
    }, 4000); // زدنا الوقت شوية عشان العميل يلحق يقرأ اللي في الصورة
    return () => clearInterval(timer);
  }, [photos.length]);

  return (
    <section className="relative w-full min-h-[calc(100vh-80px)] flex flex-col items-center justify-center bg-[#0f172a] overflow-hidden py-12 px-6">
      
      {/* 1. الجملة الرئيسية */}
      <div className="relative z-20 text-center mb-12">
        <motion.h1 
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-5xl md:text-6xl font-black text-white mb-4 tracking-tighter drop-shadow-2xl"
        >
          {t.heroTitle}
        </motion.h1>
        <motion.div 
          initial={{ width: 0 }}
          animate={{ width: "12rem" }}
          className="h-2 bg-gradient-to-r from-blue-600 via-cyan-400 to-blue-600 mx-auto rounded-full shadow-[0_0_15px_rgba(34,211,238,0.5)]"
        ></motion.div>
      </div>

      {/* 2. منطقة كارت الصور الموحد */}
      <div className="relative z-20 w-full max-w-5xl flex flex-col items-center">
        
        {/* كارت الصور المطور */}
        <motion.div 
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          className="w-full aspect-video bg-slate-950 border border-slate-800 rounded-[2rem] md:rounded-[3rem] overflow-hidden shadow-[0_20px_50px_rgba(0,0,0,0.6)] relative group mb-8"
        >
          {/* خلفية مموهة لعدم وجود فراغات */}
          <div className="absolute inset-0 z-0">
            <img 
              src={photos[currentPhoto]} 
              className="w-full h-full object-cover blur-2xl opacity-30 scale-110"
              alt="bg-blur"
            />
          </div>

          {/* الصورة الأساسية - تظهر كاملة بدون قص */}
          <AnimatePresence mode="wait">
            <motion.img 
              key={currentPhoto}
              src={photos[currentPhoto]} 
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -20 }}
              transition={{ duration: 0.8 }}
              alt="Program Screenshot" 
              className="relative z-10 w-full h-full object-contain p-2 md:p-6" // object-contain هو السر هنا
            />
          </AnimatePresence>

          <div className="absolute inset-0 z-20 bg-gradient-to-t from-black/40 via-transparent to-transparent pointer-events-none"></div>
          
          {/* مؤشر عدد الصور */}
          <div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex gap-2 z-30">
            {photos.map((_, idx) => (
              <button 
                key={idx} 
                onClick={() => setCurrentPhoto(idx)}
                className={`h-1.5 rounded-full transition-all duration-500 ${idx === currentPhoto ? 'w-8 bg-cyan-400' : 'w-2 bg-white/30 hover:bg-white/50'}`}
              ></button>
            ))}
          </div>
        </motion.div>

        {/* زرار المزيد من الصور */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5 }}
        >
          <Link 
            href="/photos" 
            className="group relative flex items-center gap-3 bg-white text-slate-900 px-10 py-5 rounded-2xl font-black text-xl hover:bg-blue-600 hover:text-white transition-all shadow-2xl active:scale-95"
          >
            <FaImages className="text-2xl group-hover:rotate-12 transition-transform" />
            <span>{lang === 'ar' ? 'استعرض معرض الصور' : 'Browse Gallery'}</span>
          </Link>
        </motion.div>

      </div>

      {/* 3. الديكورات الخلفية */}
      <div className="absolute top-[-10%] right-[-10%] w-96 h-96 bg-blue-600/10 rounded-full blur-[120px] pointer-events-none"></div>
      <div className="absolute bottom-[-10%] left-[-10%] w-96 h-96 bg-cyan-400/5 rounded-full blur-[120px] pointer-events-none"></div>
    </section>
  );
};

export default Hero;