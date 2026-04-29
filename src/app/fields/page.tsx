"use client";
import React, { useEffect, useState } from 'react';
import { supabase } from '@/lib/supabase';
import { useLanguage } from '@/context/LanguageContext';

const FieldsPage = () => {
  const { lang } = useLanguage();
  const [fields, setFields] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchFields = async () => {
      try {
        // جلب البيانات من جدول التخصصات
        const { data, error } = await supabase
          .from('fields')
          .select('*')
          .order('created_at', { ascending: false });

        if (error) throw error;
        setFields(data || []);
      } catch (err) {
        console.error("Error fetching fields:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchFields();

    // إعداد التحديث اللحظي (Realtime) 
    // عشان أول ما ترفع من الأدمن تظهر هنا فوراً من غير ريفريش
    const subscription = supabase
      .channel('fields-changes')
      .on('postgres_changes', { event: '*', schema: 'public', table: 'fields' }, () => {
        fetchFields();
      })
      .subscribe();

    return () => {
      supabase.removeChannel(subscription);
    };
  }, []);

  if (loading) return (
    <div className="min-h-screen bg-[#0f172a] text-white flex items-center justify-center font-bold">
      <div className="flex flex-col items-center gap-4">
        <div className="w-12 h-12 border-4 border-blue-500 border-t-transparent rounded-full animate-spin"></div>
        <p className="animate-pulse">
          {lang === 'ar' ? "جاري تحميل البرامج..." : "Loading Programs..."}
        </p>
      </div>
    </div>
  );

  return (
    <main className="min-h-screen bg-[#0f172a] text-white py-20 px-6">
      <div className="max-w-6xl mx-auto">
        {/* رأس الصفحة */}
        <div className="text-center mb-14 space-y-4 animate-in fade-in slide-in-from-top duration-700">
          <h1 className="text-2xl md:text-2xl  font-black text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-cyan-400 tracking-tighter">
            {lang === 'ar' ? "برنامج الشامل" : "Al-Shamel"}
          </h1>
          <p className="text-slate-400 max-w-2xl  mx-auto text-lg font-medium">
            {lang === 'ar' 
              ? "نظام واحد مرن مصمم ليناسب كافة القطاعات التجارية والخدمية بدقة متناهية." 
              : "One flexible system designed to fit all commercial and service sectors with extreme precision."}
          </p>
        </div>

        {/* شبكة العرض */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8" dir={lang === 'ar' ? 'rtl' : 'ltr'}>
          {fields.map((field, index) => (
            <div 
              key={field.id} 
              className="group bg-slate-900/40 border border-slate-800 rounded-[2.5rem] overflow-hidden hover:border-blue-500/50 transition-all duration-500 shadow-2xl backdrop-blur-sm flex flex-col animate-in fade-in zoom-in duration-500"
              style={{ animationDelay: `${index * 100}ms` }}
            >
              {/* صورة التخصص */}
              <div className="relative h-64 overflow-hidden">
                <img 
                  src={field.image_url} 
                  alt={field.title}
                  className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                  loading="lazy"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[#0f172a] via-transparent to-transparent opacity-60"></div>
              </div>
              
              {/* محتوى التخصص */}
              <div className="p-8 flex flex-col flex-grow">
                <h2 className="text-2xl font-bold mb-4 text-blue-400 group-hover:text-cyan-400 transition-colors">
                  {field.title}
                </h2>
                <p className="text-slate-300 leading-relaxed text-sm md:text-base line-clamp-4 font-tajawal">
                  {field.description}
                </p>
                
                <div className="mt-auto pt-6 border-t border-slate-800/50">
                  <span className="text-xs font-black uppercase tracking-widest text-slate-500 group-hover:text-blue-400 transition-colors">
                    {lang === 'ar' ? "📌 حلول متكاملة" : "📌 Integrated Solutions"}
                  </span>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* حالة عدم وجود بيانات */}
        {fields.length === 0 && !loading && (
          <div className="text-center py-20 bg-slate-900/20 rounded-[3rem] border border-dashed border-slate-800 animate-in fade-in">
            <p className="text-slate-500 italic text-lg">
              {lang === 'ar' ? "لا توجد تخصصات مضافة حالياً." : "No specializations added yet."}
            </p>
          </div>
        )}
      </div>
    </main>
  );
};

export default FieldsPage;