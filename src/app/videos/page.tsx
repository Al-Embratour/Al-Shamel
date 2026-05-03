"use client";
import React, { useEffect, useState } from 'react';
import { supabase } from '@/lib/supabase';
import { useLanguage } from '@/context/LanguageContext'; 

const VideosPage = () => {
  const { lang } = useLanguage(); 
  const [videos, setVideos] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchVideos = async () => {
      try {
        setLoading(true);
        // جلب البيانات من جدول videos
        const { data, error } = await supabase
          .from('videos')
          .select('*')
          .order('created_at', { ascending: false });

        if (error) throw error;

        if (data) {
          const formattedVideos = data.map(v => ({
            id: v.id,
            videoId: v.youtube_id,
            description: v.description,
            title: lang === 'ar' ? "شرح من شروحات البرنامج" : "Program Tutorial",
            // استخدام mqdefault كبديل أضمن في حال عدم وجود maxresdefault
            thumbnail: `https://img.youtube.com/vi/${v.youtube_id}/mqdefault.jpg`
          }));
          setVideos(formattedVideos);
        }
      } catch (err) {
        console.error("Error fetching videos:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchVideos();
  }, [lang]);

  if (loading) return (
    <div className="min-h-screen bg-[#0f172a] text-white flex items-center justify-center font-bold">
      <div className="flex flex-col items-center gap-4">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500"></div>
        <p>{lang === 'ar' ? "جاري تحميل الفيديوهات..." : "Loading Videos..."}</p>
      </div>
    </div>
  );

  return (
    <main className="min-h-screen bg-[#0f172a] text-white py-20 px-6">
      <div className="max-w-6xl mx-auto">
        <header className="mb-16 text-center">
          <h1 className="text-3xl md:text-4xl font-black mb-4 text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-cyan-400 uppercase tracking-tight">
            {lang === 'ar' ? "شروحات فيديو الشامل" : "Al-Shamel Video Tutorials"}
          </h1>
          <div className="h-1 w-20 bg-blue-600 mx-auto rounded-full"></div>
        </header>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10" dir={lang === 'ar' ? 'rtl' : 'ltr'}>
          {videos.map((video) => (
            <div 
              key={video.id} 
              className="bg-slate-900/40 border border-slate-800 rounded-[2.5rem] overflow-hidden hover:border-blue-500/50 transition-all shadow-2xl backdrop-blur-md group flex flex-col hover:-translate-y-2 duration-300"
            >
              {/* Thumbnail Container */}
              <div className="relative aspect-video overflow-hidden">
                <img 
                  src={video.thumbnail} 
                  alt={video.title}
                  className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                />
                <div className="absolute inset-0 bg-black/20 group-hover:bg-black/50 transition-colors flex items-center justify-center">
                   <a 
                    href={`https://www.youtube.com/watch?v=${video.videoId}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="w-14 h-14 bg-blue-600 rounded-full flex items-center justify-center shadow-2xl transform scale-0 group-hover:scale-100 transition-transform duration-300 hover:bg-blue-500"
                  >
                    <span className="text-white text-xl ml-1">▶</span>
                  </a>
                </div>
              </div>
              
              {/* Content Container */}
              <div className="p-7 flex flex-col flex-grow">
                <div className="flex items-center gap-2 mb-3">
                  <span className="px-3 py-1 bg-blue-600/10 text-blue-400 text-[10px] font-bold uppercase tracking-widest rounded-full border border-blue-600/20">
                    {lang === 'ar' ? "فيديو" : "Video"}
                  </span>
                </div>

                <h2 className={`text-xl font-black mb-3 text-white group-hover:text-blue-400 transition-colors ${lang === 'ar' ? 'text-right' : 'text-left'}`}>
                  {video.title}
                </h2>

                {video.description ? (
                  <p className={`text-slate-400 text-sm mb-6 line-clamp-3 leading-relaxed flex-grow ${lang === 'ar' ? 'text-right font-medium' : 'text-left'}`}>
                    {video.description}
                  </p>
                ) : (
                  <div className="flex-grow mb-6"></div>
                )}

                <div className={`pt-4 border-t border-slate-800/50 ${lang === 'ar' ? 'text-right' : 'text-left'}`}>
                  <a 
                    href={`https://www.youtube.com/watch?v=${video.videoId}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-blue-400 font-black hover:text-cyan-400 transition-all inline-flex items-center gap-2 group/link text-sm uppercase tracking-tighter"
                  >
                    {lang === 'ar' ? "مشاهدة الشرح الآن" : "Watch Tutorial Now"}
                    <span className="transform transition-transform group-hover/link:translate-x-1">
                      {lang === 'ar' ? "←" : "→"}
                    </span>
                  </a>
                </div>
              </div>
            </div>
          ))}
        </div>
        
        {videos.length === 0 && !loading && (
          <div className="text-center py-20 bg-slate-900/20 rounded-[3rem] border border-dashed border-slate-800">
            <p className="text-slate-500 text-lg font-bold">
              {lang === 'ar' ? "قريباً.. سيتم إضافة شروحات جديدة" : "Coming Soon.. New tutorials will be added"}
            </p>
          </div>
        )}
      </div>
    </main>
  );
};

export default VideosPage;