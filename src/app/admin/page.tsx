"use client";
import React, { useState, useEffect } from 'react';
import { supabase } from '@/lib/supabase';
import { useLanguage } from '@/context/LanguageContext';

const AdminPage = () => {
  const { lang, t } = useLanguage(); 
  
  // --- حالات الحماية والولوج ---
  const [user, setUser] = useState<any>(null);
  const [authLoading, setAuthLoading] = useState(true);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  
  // --- حالات تغيير كلمة المرور ---
  const [newPassword, setNewPassword] = useState("");
  const [passwordUpdating, setPasswordUpdating] = useState(false);

  // حالات الفيديوهات
  const [videoUrl, setVideoUrl] = useState("");
  const [videoDescription, setVideoDescription] = useState("");
  const [videos, setVideos] = useState<any[]>([]);
  const [videoLoading, setVideoLoading] = useState(false);

  // حالات الصور (المعرض)
  const [photos, setPhotos] = useState<any[]>([]);
  const [uploading, setUploading] = useState(false);

  // --- حالات مجالات العمل ---
  const [fields, setFields] = useState<any[]>([]);
  const [fieldTitle, setFieldTitle] = useState("");
  const [fieldDescription, setFieldDescription] = useState("");
  const [fieldUploading, setFieldUploading] = useState(false);
  
  const [activeTab, setActiveTab] = useState<'videos' | 'photos' | 'fields'>('videos');

  useEffect(() => {
    checkUser();
  }, []);

  const checkUser = async () => {
    const { data: { user } } = await supabase.auth.getUser();
    setUser(user);
    setAuthLoading(false);
    if (user) fetchData();
  };

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setAuthLoading(true);
    const { data, error } = await supabase.auth.signInWithPassword({ email, password });
    if (error) {
      alert(lang === 'ar' ? "خطأ في الدخول: " + error.message : "Login Error: " + error.message);
      setAuthLoading(false);
      return;
    }
    setUser(data.user);
    fetchData();
    setAuthLoading(false);
  };

  const handleLogout = async () => {
    await supabase.auth.signOut();
    setUser(null);
  };

  // --- دالة تغيير كلمة المرور ---
  const handleChangePassword = async (e: React.FormEvent) => {
    e.preventDefault();
    if (newPassword.length < 6) {
      return alert(lang === 'ar' ? "الباسورد يجب أن يكون 6 أحرف على الأقل" : "Password must be at least 6 characters");
    }
    setPasswordUpdating(true);
    const { error } = await supabase.auth.updateUser({ password: newPassword });
    if (error) {
      alert(lang === 'ar' ? "خطأ: " + error.message : "Error: " + error.message);
    } else {
      alert(lang === 'ar' ? "✅ تم تحديث الباسورد بنجاح!" : "✅ Password updated successfully!");
      setNewPassword("");
    }
    setPasswordUpdating(false);
  };

  const fetchData = async () => {
    const { data: vData } = await supabase.from('videos').select('*').order('created_at', { ascending: false });
    const { data: pData } = await supabase.from('photos').select('*').order('created_at', { ascending: false });
    const { data: fData } = await supabase.from('fields').select('*').order('created_at', { ascending: false });
    
    setVideos(vData || []);
    setPhotos(pData || []);
    setFields(fData || []);
  };

  const extractId = (url: string) => {
    const regExp = /^.*((youtu.be\/)|(v\/)|(\/u\/\w\/)|(embed\/)|(watch\?))\??v?=?([^#&?]*).*/;
    const match = url.match(regExp);
    return (match && match[7].length === 11) ? match[7] : null;
  };

  const handleAddVideo = async () => {
    const videoId = extractId(videoUrl.trim());
    if (!videoId) return alert(lang === 'ar' ? "الرابط غير صحيح!" : "Invalid URL!");
    setVideoLoading(true);
    const { error } = await supabase.from('videos').insert([{ youtube_id: videoId, description: videoDescription.trim() }]);
    if (!error) { setVideoUrl(""); setVideoDescription(""); fetchData(); }
    setVideoLoading(false);
  };

  const handlePhotoUpload = async (e: any) => {
    try {
      setUploading(true);
      const file = e.target.files[0];
      if (!file) return;
      const fileName = `${Math.random()}.${file.name.split('.').pop()}`;
      const filePath = `gallery/${fileName}`;
      const { error: upError } = await supabase.storage.from('shamel-photos').upload(filePath, file);
      if (upError) throw upError;

      const { data: { publicUrl } } = supabase.storage.from('shamel-photos').getPublicUrl(filePath);
      await supabase.from('photos').insert([{ image_url: publicUrl }]);
      fetchData();
      alert(lang === 'ar' ? "✅ تم رفع الصورة بنجاح" : "✅ Photo uploaded successfully");
    } catch (err: any) { 
        alert(lang === 'ar' ? "❌ خطأ في الرفع: " + err.message : "❌ Error: " + err.message); 
    } finally { setUploading(false); }
  };

  const handleFieldUpload = async (e: any) => {
    const file = e.target.files[0];
    if (!file) return;
    try {
      if (!fieldTitle.trim() || !fieldDescription.trim()) {
        alert(lang === 'ar' ? "⚠️ يرجى كتابة العنوان والوصف أولاً" : "⚠️ Title and description required");
        e.target.value = ""; 
        return;
      }
      setFieldUploading(true);
      const fileName = `${Math.random()}.${file.name.split('.').pop()}`;
      const filePath = `fields/${fileName}`;
      const { error: upError } = await supabase.storage.from('shamel-photos').upload(filePath, file);
      if (upError) throw upError;
      const { data: { publicUrl } } = supabase.storage.from('shamel-photos').getPublicUrl(filePath);
      const { error: insError } = await supabase.from('fields').insert([{
        title: fieldTitle.trim(),
        description: fieldDescription.trim(),
        image_url: publicUrl
      }]);
      if (insError) throw insError;
      setFieldTitle(""); setFieldDescription(""); e.target.value = ""; 
      fetchData();
      alert(lang === 'ar' ? "✅ تم إضافة المجال بنجاح!" : "✅ Field added!");
    } catch (err: any) { 
      alert(err.message); 
    } finally { setFieldUploading(false); }
  };

  const handleDelete = async (table: string, id: number) => {
    if (!confirm(lang === 'ar' ? "هل أنت متأكد من الحذف؟" : "Are you sure?")) return;
    const { error } = await supabase.from(table).delete().eq('id', id);
    if (!error) fetchData();
  };

  if (authLoading) {
    return (
      <div className="min-h-screen bg-slate-950 flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500"></div>
      </div>
    );
  }

  if (!user) {
    return (
      <div className="min-h-screen bg-slate-950 flex items-center justify-center p-6" dir={lang === 'ar' ? 'rtl' : 'ltr'}>
        <form onSubmit={handleLogin} className="bg-slate-900 p-8 md:p-12 rounded-[2.5rem] border border-slate-800 shadow-2xl w-full max-w-md space-y-6 animate-in zoom-in-95 duration-300">
          <div className="text-center space-y-2">
            <h1 className="text-3xl font-black text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-cyan-400">ADMIN ACCESS</h1>
            <p className="text-slate-500 text-sm font-bold uppercase tracking-widest">Imperial Control System</p>
          </div>
          <div className="space-y-4">
            <input 
              type="email" placeholder="Email Address" value={email} onChange={(e) => setEmail(e.target.value)} required
              className="w-full p-4 bg-slate-950 border border-slate-800 rounded-2xl outline-none focus:border-blue-500 transition-all text-white"
            />
            <input 
              type="password" placeholder="Password" value={password} onChange={(e) => setPassword(e.target.value)} required
              className="w-full p-4 bg-slate-950 border border-slate-800 rounded-2xl outline-none focus:border-blue-500 transition-all text-white"
            />
          </div>
          <button type="submit" className="w-full bg-blue-600 hover:bg-blue-500 py-4 rounded-2xl font-black transition-all shadow-lg active:scale-95">
            {lang === 'ar' ? 'تسجيل الدخول' : 'LOGIN TO DASHBOARD'}
          </button>
        </form>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-slate-950 text-white p-6 md:p-10 flex flex-col items-center" dir={lang === 'ar' ? 'rtl' : 'ltr'}>
      
      <button 
        onClick={handleLogout}
        className="fixed top-6 right-6 z-50 bg-red-500/10 hover:bg-red-500 text-red-500 hover:text-white border border-red-500/20 px-5 py-2 rounded-full text-xs font-bold transition-all backdrop-blur-md"
      >
        {lang === 'ar' ? 'خروج' : 'LOGOUT'}
      </button>

      <div className="max-w-4xl w-full flex flex-col md:flex-row justify-between items-center mb-10 gap-6">
        <div>
          <h1 className="text-3xl font-black text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-cyan-400 uppercase tracking-tighter"> Dashboard Control </h1>
          <p className="text-slate-500 text-sm font-medium"> {lang === 'ar' ? 'إدارة محتوى مشروع الشامل' : 'Manage Al-Shamel Content'} </p>
        </div>

        <div className="flex bg-slate-900 p-1 rounded-2xl border border-slate-800 shadow-lg flex-wrap justify-center">
          <button onClick={() => setActiveTab('videos')} className={`px-6 py-2 rounded-xl font-bold transition-all ${activeTab === 'videos' ? 'bg-blue-600 text-white shadow-lg' : 'text-slate-400'}`}> {lang === 'ar' ? '🎥 فيديوهات' : '🎥 Videos'} </button>
          <button onClick={() => setActiveTab('photos')} className={`px-6 py-2 rounded-xl font-bold transition-all ${activeTab === 'photos' ? 'bg-blue-600 text-white shadow-lg' : 'text-slate-400'}`}> {lang === 'ar' ? '🖼️ صور' : '🖼️ Photos'} </button>
          <button onClick={() => setActiveTab('fields')} className={`px-6 py-2 rounded-xl font-bold transition-all ${activeTab === 'fields' ? 'bg-blue-600 text-white shadow-lg' : 'text-slate-400'}`}> {lang === 'ar' ? '🚀 المجالات' : '🚀 Fields'} </button>
        </div>
      </div>

      {/* أقسام المحتوى (فيديوهات، صور، مجالات) */}
      {activeTab === 'videos' && (
        <div className="max-w-4xl w-full space-y-10 animate-in fade-in">
          <div className="bg-slate-900 p-8 rounded-3xl border border-slate-800 shadow-2xl space-y-4">
             <input type="text" value={videoUrl} onChange={(e) => setVideoUrl(e.target.value)} placeholder="YouTube URL" className="w-full p-4 bg-slate-950 border border-slate-800 rounded-2xl outline-none focus:border-blue-500" dir="ltr" />
             <textarea value={videoDescription} onChange={(e) => setVideoDescription(e.target.value)} placeholder={lang === 'ar' ? "وصف الفيديو..." : "Video Description..."} className="w-full p-4 bg-slate-950 border border-slate-800 rounded-2xl outline-none focus:border-blue-500 min-h-[100px]" />
             <button onClick={handleAddVideo} disabled={videoLoading} className="w-full bg-blue-600 hover:bg-blue-500 py-4 rounded-2xl font-black transition-all"> {videoLoading ? '...' : (lang === 'ar' ? 'إضافة' : 'Add')} </button>
          </div>
          <div className="grid gap-4">
            {videos.map((v) => (
              <div key={v.id} className="flex items-center justify-between bg-slate-900/40 p-4 rounded-2xl border border-slate-800">
                <div className="flex items-center gap-4">
                  <img src={`https://img.youtube.com/vi/${v.youtube_id}/default.jpg`} className="w-20 rounded-lg" alt="" />
                  <p className="text-sm text-slate-300 line-clamp-1">{v.description || v.youtube_id}</p>
                </div>
                <button onClick={() => handleDelete('videos', v.id)} className="text-red-500 p-2">🗑️</button>
              </div>
            ))}
          </div>
        </div>
      )}

      {activeTab === 'photos' && (
        <div className="max-w-4xl w-full space-y-10 animate-in fade-in">
          <div className="bg-slate-900 p-10 rounded-[3rem] border-2 border-dashed border-slate-800 text-center">
            <input type="file" accept="image/*" onChange={handlePhotoUpload} disabled={uploading} className="hidden" id="photoUpload" />
            <label htmlFor="photoUpload" className="cursor-pointer bg-blue-600 px-12 py-5 rounded-2xl font-black inline-block active:scale-95 transition-transform"> {uploading ? '...' : (lang === 'ar' ? '➕ ارفع صورة جديدة' : '➕ Upload')} </label>
          </div>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
            {photos.map((p) => (
              <div key={p.id} className="relative group aspect-square rounded-2xl overflow-hidden border border-slate-800 shadow-xl">
                <img src={p.image_url} className="w-full h-full object-cover" alt="" />
                <button onClick={() => handleDelete('photos', p.id)} className="absolute inset-0 bg-red-600/80 opacity-0 group-hover:opacity-100 flex items-center justify-center font-bold transition-all"> {lang === 'ar' ? 'حذف' : 'Delete'} </button>
              </div>
            ))}
          </div>
        </div>
      )}

      {activeTab === 'fields' && (
        <div className="max-w-4xl w-full space-y-10 animate-in fade-in">
          <div className="bg-slate-900 p-8 rounded-3xl border border-slate-800 shadow-2xl space-y-4">
            <input 
              type="text" value={fieldTitle} onChange={(e) => setFieldTitle(e.target.value)} 
              placeholder={lang === 'ar' ? "اسم المجال (مثلاً: للمطاعم)" : "Field Title"} 
              className="w-full p-4 bg-slate-950 border border-slate-800 rounded-2xl outline-none focus:border-blue-500" 
            />
            <textarea 
              value={fieldDescription} onChange={(e) => setFieldDescription(e.target.value)} 
              placeholder={lang === 'ar' ? "وصف المجال وكيف يخدمه البرنامج..." : "Field Description..."} 
              className="w-full p-4 bg-slate-950 border border-slate-800 rounded-2xl outline-none focus:border-blue-500 min-h-[100px]" 
            />
            <input type="file" accept="image/*" onChange={handleFieldUpload} disabled={fieldUploading} className="hidden" id="fieldUploadUnique" />
            <label htmlFor="fieldUploadUnique" className="cursor-pointer w-full bg-cyan-600 py-5 rounded-2xl font-black text-center block shadow-xl hover:bg-cyan-500 transition-all active:scale-95">
              {fieldUploading ? '...' : (lang === 'ar' ? '➕ ارفع صورة المجال واحفظ البيانات' : '➕ Upload & Save Field')}
            </label>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {fields.map((f) => (
              <div key={f.id} className="bg-slate-900/40 border border-slate-800 rounded-2xl overflow-hidden group relative shadow-lg">
                <img src={f.image_url} className="w-full h-40 object-cover opacity-60" alt="" />
                <div className="p-4">
                  <h3 className="font-bold text-blue-400">{f.title}</h3>
                  <p className="text-xs text-slate-400 line-clamp-2">{f.description}</p>
                </div>
                <button onClick={() => handleDelete('fields', f.id)} className="absolute top-2 right-2 bg-red-500 p-2 rounded-lg opacity-0 group-hover:opacity-100 transition-all shadow-md">🗑️</button>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* --- قسم إعدادات الحساب (تغيير الباسورد) --- */}
      <div className="max-w-4xl w-full mt-20 border-t border-slate-800 pt-10 pb-10">
        <div className="bg-slate-900/50 p-8 rounded-3xl border border-slate-800 shadow-xl max-w-md mx-auto">
          <h2 className="text-xl font-bold text-blue-400 mb-6 flex items-center gap-2">
            ⚙️ {lang === 'ar' ? 'إعدادات الأمان' : 'Security Settings'}
          </h2>
          <form onSubmit={handleChangePassword} className="space-y-4">
            <input 
              type="password" 
              value={newPassword} 
              onChange={(e) => setNewPassword(e.target.value)}
              placeholder={lang === 'ar' ? "الباسورد الجديد..." : "New Password..."}
              className="w-full p-4 bg-slate-950 border border-slate-800 rounded-2xl outline-none focus:border-blue-500 text-white text-sm"
            />
            <button 
              type="submit" 
              disabled={passwordUpdating}
              className="w-full bg-slate-800 hover:bg-blue-600 py-3 rounded-xl font-bold transition-all disabled:opacity-50"
            >
              {passwordUpdating ? '...' : (lang === 'ar' ? 'تحديث الباسورد' : 'Update Password')}
            </button>
          </form>
        </div>
      </div>

      <div className="mt-10 text-slate-600 text-[10px] uppercase tracking-[0.4em] font-bold"> Imperial System Control </div>
    </div>
  );
};

export default AdminPage;