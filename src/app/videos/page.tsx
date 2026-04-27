"use client";
import React, { useEffect, useState } from 'react';
import { supabase } from '@/lib/supabase';
// استورد الـ Hook الخاص باللغة بتاعك هنا (تأكد من المسار الصح)
import { useLanguage } from '@/context/LanguageContext'; 

const VideosPage = () => {
  // بنجيب اللغة الحالية من الـ Context بتاعك
  const { lang} = useLanguage(); 
  const [videos, setVideos] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchVideos = async () => {
      try {
        const { data, error } = await supabase.from('videos').select('*');
        if (error) throw error;
        if (data) {
          const formattedVideos = data.map(v => ({
            id: v.id,
            videoId: v.youtube_id,
            // تغيير العنوان بناءً على قيمة الـ language من الـ Context
            title: lang === 'ar' ? "شرح من شروحات البرنامج" : "Program Tutorial",
            thumbnail: `https://img.youtube.com/vi/${v.youtube_id}/maxresdefault.jpg`
          }));
          setVideos(formattedVideos);
        }
      } catch (err) {
        console.error("Error:", err);
      } finally {
        setLoading(false);
      }
    };
    fetchVideos();
  }, [lang]); // التحميل يتحدث فوراً لو الـ Context اتغير

  if (loading) return (
    <div className="min-h-screen bg-[#0f172a] text-white flex items-center justify-center font-bold">
      {lang === 'ar' ? "جاري التحميل..." : "Loading..."}
    </div>
  );

  return (
    <main className="min-h-screen bg-[#0f172a] text-white py-20 px-6">
      <div className="max-w-6xl mx-auto">
        <h1 className="text-4xl font-black mb-12 text-center text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-cyan-400">
          {lang === 'ar' ? "شروحات البرنامج" : "Program Tutorials"}
        </h1>
        
        {/* ضبط الاتجاه (RTL/LTR) بناءً على الـ Context */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8" dir={lang === 'ar' ? 'rtl' : 'ltr'}>
          {videos.map((video) => (
            <div key={video.id} className="bg-slate-900/40 border border-slate-800 rounded-[2rem] overflow-hidden hover:border-blue-500/50 transition-all shadow-xl backdrop-blur-sm group">
              <div className="relative aspect-video">
                <img 
                  src={video.thumbnail} 
                  alt={video.title}
                  className="w-full h-full object-cover transition-transform group-hover:scale-105"
                />
                <div className="absolute inset-0 flex items-center justify-center bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none">
                  <div className="w-16 h-16 bg-red-600 rounded-full flex items-center justify-center shadow-lg transform scale-90 group-hover:scale-100 transition-transform">
                     <span className="text-white text-2xl">▶</span>
                  </div>
                </div>
              </div>
              
              <div className="p-6">
                <h2 className={`text-lg font-bold line-clamp-2 mb-4 h-14 ${lang === 'ar' ? 'text-right' : 'text-left'}`}>
                  {video.title}
                </h2>
                <a 
                  href={`https://www.youtube.com/watch?v=${video.videoId}`}
                  target="_blank"
                  className="text-blue-400 font-bold hover:text-blue-300 transition-colors inline-flex items-center gap-2"
                >
                  {/* الترجمة بناءً على الـ Context */}
                  {lang === 'ar' ? "شاهد الآن ←" : "Watch Now →"}
                </a>
              </div>
            </div>
          ))}
        </div>
        
        {videos.length === 0 && (
          <p className="text-center text-slate-500 mt-10 italic">
            {lang === 'ar' ? "لا توجد فيديوهات مضافة حالياً." : "No videos available."}
          </p>
        )}
      </div>
    </main>
  );
};

export default VideosPage;