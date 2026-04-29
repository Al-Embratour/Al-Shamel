"use client";
import React, { useState, useEffect } from 'react';
import { useLanguage } from '@/context/LanguageContext';
import Link from 'next/link';
import { motion } from 'framer-motion';
import { FaImages } from 'react-icons/fa'; // أيقونة للزرار

const Hero = () => {
  const { t, lang } = useLanguage();
  
  const photos = [
    "/hero/hero1.jpeg",
    "/hero/hero2.jpeg",
    "/hero/hero3.jpeg",
    "/hero/hero4.jpeg",
    "/hero/hero5.jpeg",
    "/hero/hero6.jpeg",
  ];

  const [currentPhoto, setCurrentPhoto] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentPhoto((prev) => (prev + 1) % photos.length);
    }, 3000);
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
      <div className="relative z-20 w-full max-w-4xl flex flex-col items-center">
        
        {/* كارت الصور الضخم */}
        <motion.div 
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          className="w-full aspect-video md:aspect-[21/9] bg-slate-900 border border-slate-800 rounded-[3rem] overflow-hidden shadow-[0_20px_50px_rgba(0,0,0,0.5)] relative group mb-8"
        >
          <img 
            src={photos[currentPhoto]} 
            alt="Hero Slideshow" 
            className="w-full h-full object-cover transition-all duration-1000 group-hover:scale-105"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-[#0f172a]/80 via-transparent to-transparent"></div>
          
          {/* مؤشر عدد الصور صغير تحت */}
          <div className="absolute bottom-6 left-1/2 -translate-x-1/2 flex gap-2">
            {photos.map((_, idx) => (
              <div 
                key={idx} 
                className={`h-1.5 rounded-full transition-all duration-500 ${idx === currentPhoto ? 'w-8 bg-cyan-400' : 'w-2 bg-white/30'}`}
              ></div>
            ))}
          </div>
        </motion.div>

        {/* زرار المزيد من الصور الجديد */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5 }}
        >
          <Link 
            href="/photos" 
            className="group relative flex items-center gap-3 bg-white text-slate-900 px-10 py-5 rounded-2xl font-black text-xl hover:bg-blue-500 hover:text-white transition-all shadow-2xl active:scale-95"
          >
            <FaImages className="text-2xl group-hover:rotate-12 transition-transform" />
            <span>{lang === 'ar' ? 'المزيد من الصور' : 'More Photos'}</span>
          </Link>
        </motion.div>

      </div>

      {/* 3. الديكورات الخلفية */}
      <div className="absolute top-[-10%] right-[-10%] w-96 h-96 bg-blue-600/20 rounded-full blur-[120px] animate-pulse"></div>
      <div className="absolute bottom-[-10%] left-[-10%] w-96 h-96 bg-cyan-400/10 rounded-full blur-[120px]"></div>
    </section>
  );
};

export default Hero;