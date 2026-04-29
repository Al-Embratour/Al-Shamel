"use client";
import React, { useState } from 'react';
import { useLanguage } from '@/context/LanguageContext';
import { motion } from 'framer-motion';
// استيراد أيقونة الواتساب من react-icons/fa
import { FaWhatsapp } from 'react-icons/fa'; 
import { Phone, Send, User, Mail, ShieldCheck } from 'lucide-react';

const ContactPage = () => {
  const { lang } = useLanguage();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [result, setResult] = useState("");

  const phoneNumber = "01150023774";
  const whatsappMessage = lang === 'ar' ? "السلام عليكم، أريد الاستفسار عن برنامج الشامل" : "Hello, I want to inquire about Al-Shamel program";

  const handleSubmit = async (event: any) => {
    event.preventDefault();
    
    setIsSubmitting(true);
    setResult(lang === 'ar' ? "جاري الإرسال..." : "Sending...");

    const formData = new FormData(event.target);
    const payload = Object.fromEntries(formData.entries());

    try {
      const response = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload)
      });

      if (response.ok) {
        setResult(lang === 'ar' ? "✅ تم الإرسال بنجاح!" : "✅ Sent successfully!");
        event.target.reset();
      } else {
        setResult(lang === 'ar' ? "❌ حدث خطأ في الإرسال" : "❌ Sending failed");
      }
    } catch (error) {
      setResult(lang === 'ar' ? "❌ مشكلة في الاتصال بالسيرفر" : "❌ Server connection error");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <main className="min-h-screen bg-[#0f172a] py-20 px-6" dir={lang === 'ar' ? 'rtl' : 'ltr'}>
      <div className="max-w-4xl mx-auto">
        
        <div className="text-center mb-16">
          <motion.h1 
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-4xl md:text-6xl font-black text-white mb-4 uppercase tracking-tighter"
          >
            {lang === 'ar' ? 'تواصل معنا' : 'Contact Us'}
          </motion.h1>
          <div className="h-1.5 w-24 bg-emerald-500 mx-auto rounded-full shadow-[0_0_15px_#10b981]" />
        </div>

        <div className="grid grid-cols-1 gap-12">
          
          {/* كارت التواصل السريع - مع أيقونة الواتساب الجديدة */}
          <motion.div 
            whileHover={{ y: -5 }}
            className="bg-white p-8 rounded-[2.5rem] flex flex-col md:flex-row items-center gap-8 shadow-[0_20px_50px_rgba(0,0,0,0.3)] border border-slate-700/50 relative overflow-hidden"
          >
            {/* لمسة ديكورية باللون الأخضر خلف الأيقونة */}
            <div className="absolute -top-10 -right-10 w-40 h-40 bg-green-500/5 rounded-full blur-[50px]" />

            <div className="text-emerald-600 bg-emerald-50 p-6 rounded-3xl shrink-0">
              <Phone size={40} />
            </div>
            <div className="text-center md:text-start flex-1">
              <h3 className="text-2xl font-bold text-slate-800 mb-2">{lang === 'ar' ? 'اتصال مباشر' : 'Quick Call'}</h3>
              <p className="text-emerald-600 font-black text-3xl mb-6" dir="ltr">{phoneNumber}</p>
              <div className="flex gap-4 justify-center md:justify-start">
                <a href={`tel:${phoneNumber}`} className="bg-[#0f172a] text-white px-8 py-3 rounded-2xl font-bold flex items-center gap-2 hover:bg-slate-800 transition-all shadow-lg">
                  <Phone size={18} /> <span>{lang === 'ar' ? 'اتصال' : 'Call'}</span>
                </a>
                {/* زر الواتساب مع الأيقونة الجديدة ولون الواتساب الرسمي */}
                <a href={`https://wa.me/${phoneNumber}?text=${encodeURIComponent(whatsappMessage)}`} target="_blank" className="bg-[#25D366] text-white px-8 py-3 rounded-2xl font-bold flex items-center gap-2 hover:bg-[#20bd5a] transition-all shadow-[0_0_20px_rgba(37,211,102,0.3)]">
                  <FaWhatsapp size={20} /> <span>{lang === 'ar' ? 'واتساب' : 'WhatsApp'}</span>
                </a>
              </div>
            </div>
          </motion.div>

          {/* الفورم */}
          <motion.div className="bg-slate-50 p-8 md:p-12 rounded-[3rem] shadow-2xl relative border border-white">
            <h2 className="text-3xl font-black text-[#0f172a] mb-8 flex items-center gap-3">
              <ShieldCheck className="text-emerald-600" size={32} />
              {lang === 'ar' ? 'إرسال رسالة سريعة' : 'Quick Message'}
            </h2>

            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="relative">
                  <User className="absolute left-4 top-4 text-slate-400" size={18} />
                  <input type="text" name="name" required className="w-full bg-white border border-slate-200 rounded-2xl py-4 px-12 text-slate-900 outline-none focus:border-emerald-500 font-medium transition-all placeholder:text-slate-300" placeholder={lang === 'ar' ? 'الاسم بالكامل' : 'Full Name'} />
                </div>
                <div className="relative">
                  <Phone className="absolute left-4 top-4 text-slate-400" size={18} />
                  <input type="tel" name="phone" required className="w-full bg-white border border-slate-200 rounded-2xl py-4 px-12 text-slate-900 outline-none focus:border-emerald-500 font-medium transition-all placeholder:text-slate-300" placeholder={lang === 'ar' ? 'رقم الهاتف' : 'Phone Number'} />
                </div>
              </div>
              
              <div className="relative">
                <Mail className="absolute left-4 top-4 text-slate-400" size={18} />
                <input type="email" name="email" required className="w-full bg-white border border-slate-200 rounded-2xl py-4 px-12 text-slate-900 outline-none focus:border-emerald-500 font-medium transition-all placeholder:text-slate-300" placeholder={lang === 'ar' ? 'البريد الإلكتروني' : 'Email Address'} />
              </div>

              <textarea name="message" rows={4} required className="w-full bg-white border border-slate-200 rounded-3xl py-4 px-6 text-slate-900 outline-none focus:border-emerald-500 font-medium resize-none transition-all placeholder:text-slate-300" placeholder={lang === 'ar' ? 'كيف يمكننا مساعدتك؟' : 'How can we help you?'}></textarea>

              <button 
                type="submit" 
                disabled={isSubmitting}
                className={`w-full py-5 rounded-2xl font-black text-xl flex items-center justify-center gap-3 transition-all ${isSubmitting ? 'bg-slate-300 text-slate-500 cursor-not-allowed' : 'bg-emerald-600 hover:bg-emerald-700 text-white shadow-xl shadow-emerald-200'}`}
              >
                <Send size={22} />
                <span>{isSubmitting ? (lang === 'ar' ? 'جاري الإرسال...' : 'Sending...') : (lang === 'ar' ? 'إرسال الآن' : 'Send Now')}</span>
              </button>

              {result && <p className="text-center font-bold text-emerald-600 mt-4">{result}</p>}
            </form>
          </motion.div>
        </div>
      </div>
    </main>
  );
};

export default ContactPage;