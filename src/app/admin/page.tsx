"use client";
import React, { useState, useEffect } from 'react';
import { supabase } from '@/lib/supabase';
import { useLanguage } from '@/context/LanguageContext';

const AdminPage = () => {
  const { lang, t } = useLanguage(); 
  
  // حالات الفيديوهات
  const [videoUrl, setVideoUrl] = useState("");
  const [videos, setVideos] = useState<any[]>([]);
  const [videoLoading, setVideoLoading] = useState(false);

  // حالات الصور
  const [photos, setPhotos] = useState<any[]>([]);
  const [uploading, setUploading] = useState(false);
  
  // حالة التبويب الحالي
  const [activeTab, setActiveTab] = useState<'videos' | 'photos'>('videos');

  // جلب البيانات عند فتح الصفحة
  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    const { data: vData } = await supabase.from('videos').select('*').order('created_at', { ascending: false });
    const { data: pData } = await supabase.from('photos').select('*').order('created_at', { ascending: false });
    setVideos(vData || []);
    setPhotos(pData || []);
  };

  // --- منطق الفيديوهات ---
  const extractId = (url: string) => {
    const regExp = /^.*((youtu.be\/)|(v\/)|(\/u\/\w\/)|(embed\/)|(watch\?))\??v?=?([^#&?]*).*/;
    const match = url.match(regExp);
    return (match && match[7].length === 11) ? match[7] : null;
  };

  const handleAddVideo = async () => {
    const videoId = extractId(videoUrl.trim());
    if (!videoId) return alert(lang === 'ar' ? "الرابط غير صحيح!" : "Invalid URL!");

    setVideoLoading(true);
    const { error } = await supabase.from('videos').insert([{ youtube_id: videoId }]);
    if (!error) {
      setVideoUrl("");
      fetchData();
    }
    setVideoLoading(false);
  };

  // --- منطق الصور (رفع مباشر) ---
  const handlePhotoUpload = async (e: any) => {
    try {
      setUploading(true);
      const file = e.target.files[0];
      if (!file) return;

      const fileExt = file.name.split('.').pop();
      const fileName = `${Math.random()}.${fileExt}`;
      const filePath = `gallery/${fileName}`;

      // 1. الرفع للمخزن (تم التأكد من الاسم الصغير shamel-photos)
      const { error: uploadError } = await supabase.storage.from('shamel-photos').upload(filePath, file);
      if (uploadError) throw uploadError;

      // 2. جلب الرابط العام (تم التأكد من الاسم الصغير shamel-photos)
      const { data: { publicUrl } } = supabase.storage.from('shamel-photos').getPublicUrl(filePath);

      // 3. الحفظ في الجدول
      await supabase.from('photos').insert([{ image_url: publicUrl }]);
      fetchData();
    } catch (err: any) {
      alert(err.message);
    } finally {
      setUploading(false);
    }
  };

  const handleDelete = async (table: 'videos' | 'photos', id: number) => {
    const confirmMsg = lang === 'ar' ? "هل أنت متأكد من الحذف؟" : "Are you sure you want to delete?";
    if (!confirm(confirmMsg)) return;

    const { error } = await supabase.from(table).delete().eq('id', id);
    if (!error) fetchData();
  };

  return (
    <div className="min-h-screen bg-slate-950 text-white p-6 md:p-10 flex flex-col items-center" dir={lang === 'ar' ? 'rtl' : 'ltr'}>
      
      {/* رأس الصفحة والتبديل */}
      <div className="max-w-4xl w-full flex flex-col md:flex-row justify-between items-center mb-10 gap-6">
        <div>
          <h1 className="text-3xl font-black text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-cyan-400 uppercase tracking-tighter">
            Dashboard Control
          </h1>
          <p className="text-slate-500 text-sm font-medium">
            {lang === 'ar' ? 'إدارة محتوى مشروع الشامل' : 'Manage Al-Shamel Content'}
          </p>
        </div>

        <div className="flex bg-slate-900 p-1 rounded-2xl border border-slate-800 shadow-lg">
          <button 
            onClick={() => setActiveTab('videos')}
            className={`px-8 py-2 rounded-xl font-bold transition-all ${activeTab === 'videos' ? 'bg-blue-600 text-white shadow-lg' : 'text-slate-400 hover:text-white'}`}
          >
            {lang === 'ar' ? '🎥 الفيديوهات' : '🎥 Videos'}
          </button>
          <button 
            onClick={() => setActiveTab('photos')}
            className={`px-8 py-2 rounded-xl font-bold transition-all ${activeTab === 'photos' ? 'bg-blue-600 text-white shadow-lg' : 'text-slate-400 hover:text-white'}`}
          >
            {lang === 'ar' ? '🖼️ الصور' : '🖼️ Photos'}
          </button>
        </div>
      </div>

      {/* محتوى قسم الفيديوهات */}
      {activeTab === 'videos' && (
        <div className="max-w-4xl w-full space-y-10 animate-in fade-in duration-500">
          <div className="bg-slate-900 p-8 rounded-3xl border border-slate-800 shadow-2xl">
            <label className="block text-slate-300 text-sm font-bold mb-3">
              {lang === 'ar' ? 'رابط فيديو اليوتيوب' : 'YouTube Video URL'}
            </label>
            <div className="flex flex-col md:flex-row gap-4">
              <input 
                type="text" value={videoUrl} onChange={(e) => setVideoUrl(e.target.value)}
                placeholder="https://youtube.com/watch?v=..." 
                className="flex-1 p-4 bg-slate-950 border border-slate-800 rounded-2xl outline-none focus:border-blue-500 transition-all text-left font-mono"
                dir="ltr"
              />
              <button 
                onClick={handleAddVideo} disabled={videoLoading}
                className="bg-blue-600 hover:bg-blue-500 px-10 py-4 rounded-2xl font-black transition-all active:scale-95 disabled:opacity-50 shadow-xl shadow-blue-900/20"
              >
                {videoLoading ? (lang === 'ar' ? 'جاري الإضافة...' : 'Adding...') : (lang === 'ar' ? 'إضافة' : 'Add')}
              </button>
            </div>
          </div>

          <div className="grid gap-4">
            {videos.map((video) => (
              <div key={video.id} className="flex items-center justify-between bg-slate-900/40 p-4 rounded-2xl border border-slate-800 hover:border-slate-700 transition-all">
                <div className="flex items-center gap-4">
                  <img src={`https://img.youtube.com/vi/${video.youtube_id}/default.jpg`} className="w-20 rounded-lg shadow-md" alt="" />
                  <span className="font-mono text-sm text-blue-400">{video.youtube_id}</span>
                </div>
                <button onClick={() => handleDelete('videos', video.id)} className="bg-red-500/10 text-red-500 p-3 rounded-xl hover:bg-red-500 hover:text-white transition-all">
                  🗑️
                </button>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* محتوى قسم الصور */}
      {activeTab === 'photos' && (
        <div className="max-w-4xl w-full space-y-10 animate-in fade-in duration-500">
          <div className="bg-slate-900 p-10 rounded-[3rem] border-2 border-dashed border-slate-800 text-center">
            <input type="file" accept="image/*" onChange={handlePhotoUpload} disabled={uploading} className="hidden" id="photoUpload" />
            <label htmlFor="photoUpload" className="cursor-pointer bg-gradient-to-r from-blue-600 to-cyan-600 px-12 py-5 rounded-2xl font-black text-lg hover:scale-105 transition-all inline-block shadow-2xl shadow-blue-900/30">
              {uploading ? (lang === 'ar' ? 'جاري الرفع...' : 'Uploading...') : (lang === 'ar' ? '➕ ارفع صورة جديدة' : '➕ Upload New Photo')}
            </label>
            <p className="mt-4 text-slate-500 text-sm italic">{lang === 'ar' ? 'سيتم حفظ الصورة مباشرة في مخزن الموقع' : 'Photos will be saved directly to site storage'}</p>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
            {photos.map((photo) => (
              <div key={photo.id} className="relative group aspect-square rounded-2xl overflow-hidden border border-slate-800 shadow-xl">
                <img src={photo.image_url} className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110" alt="" />
                <button 
                  onClick={() => handleDelete('photos', photo.id)}
                  className="absolute inset-0 bg-red-600/80 opacity-0 group-hover:opacity-100 flex items-center justify-center font-bold transition-all"
                >
                  {lang === 'ar' ? 'حذف' : 'Delete'}
                </button>
              </div>
            ))}
          </div>
        </div>
      )}

      <div className="mt-20 text-slate-600 text-[10px] uppercase tracking-[0.4em] font-bold">
        Imperial System Control
      </div>
    </div>
  );
};

export default AdminPage;