"use client";
import React, { useEffect, useState } from 'react';
import { supabase } from '@/lib/supabase';
import { useLanguage } from '@/context/LanguageContext';
import { motion, AnimatePresence } from 'framer-motion'; // مكتبة الحركات

const PhotosPage = () => {
  const { lang, t } = useLanguage();
  const [photos, setPhotos] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  
  // حالة الصورة المفتوحة حالياً
  const [selectedImg, setSelectedImg] = useState<string | null>(null);

  useEffect(() => {
    const fetchPhotos = async () => {
      try {
        const { data, error } = await supabase
          .from('photos')
          .select('*')
          .order('created_at', { ascending: false });

        if (error) throw error;
        setPhotos(data || []);
      } catch (err) {
        console.error("Error fetching photos:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchPhotos();
  }, []);

  if (loading) return (
    <div className="min-h-screen bg-[#0f172a] text-white flex items-center justify-center font-bold">
      <div className="animate-pulse">{lang === 'ar' ? "جاري تحميل معرض الصور..." : "Loading Gallery..."}</div>
    </div>
  );

  return (
    <main className="min-h-screen bg-[#0f172a] text-white py-20 px-6 relative">
      <div className="max-w-6xl mx-auto text-center">
        <h1 className="text-4xl md:text-5xl font-black mb-4 text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-cyan-400">
          {t.photosTitle}
        </h1>
        <p className="text-slate-400 mb-12 max-w-2xl mx-auto font-medium">
          {t.photosSub}
        </p>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8" dir={t.dir}>
          {photos.map((photo) => (
            <motion.div 
              layoutId={photo.id.toString()} // حركة الربط بين الصورة الصغيرة والكبيرة
              key={photo.id} 
              onClick={() => setSelectedImg(photo.image_url)} // فتح التكبير عند الضغط
              className="group relative aspect-square overflow-hidden rounded-[2.5rem] border border-slate-800 bg-slate-900/40 backdrop-blur-sm shadow-2xl transition-all hover:border-blue-500/50 cursor-zoom-in"
            >
              <img 
                src={photo.image_url} 
                alt="Al-Shamel Project" 
                className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-110"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-blue-900/60 to-transparent opacity-0 group-hover:opacity-100 transition-opacity flex items-end p-8">
                 <p className="text-white font-bold text-lg">برنامج الشامل 2026</p>
              </div>
            </motion.div>
          ))}
        </div>

        {photos.length === 0 && (
          <div className="py-20 border-2 border-dashed border-slate-800 rounded-[3rem] text-slate-500 italic">
             {t.videoEmpty}
          </div>
        )}

        <div className="mt-16">
          <a href={t.fbLink} target="_blank" className="bg-[#1877F2] hover:bg-[#166fe5] py-4 px-10 rounded-2xl font-black transition-all hover:scale-105 inline-block shadow-lg shadow-blue-600/20">
            {t.photosViewFB}
          </a>
        </div>
      </div>

      {/* نافذة التكبير الاحترافية */}
      <AnimatePresence>
        {selectedImg && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setSelectedImg(null)} // إغلاق عند الضغط على الخلفية
            className="fixed inset-0 z-50 flex items-center justify-center bg-black/90 backdrop-blur-md cursor-zoom-out p-4"
          >
            <motion.div
              initial={{ scale: 0.5, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.5, opacity: 0 }}
              transition={{ type: "spring", damping: 25, stiffness: 300 }}
              className="relative max-w-5xl w-full flex items-center justify-center"
            >
              <img 
                src={selectedImg} 
                alt="Full Preview" 
                className="max-w-full max-h-[90vh] rounded-2xl shadow-2xl border border-white/10 object-contain"
              />
              {/* زر الإغلاق العلوي */}
              <button 
                onClick={() => setSelectedImg(null)}
                className="absolute -top-10 right-0 text-white hover:text-blue-400 transition-colors font-bold text-xl"
              >
                {lang === 'ar' ? "إغلاق ✕" : "Close ✕"}
              </button>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </main>
  );
};

export default PhotosPage;