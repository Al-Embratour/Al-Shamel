"use client";
import React from 'react';
import { useLanguage } from '@/context/LanguageContext';
import { motion } from 'framer-motion';
// استيراد الأيقونات
import { FaWhatsapp, FaPhoneAlt, FaEnvelope, FaMapMarkerAlt } from 'react-icons/fa';

const ContactPage = () => {
  const { lang } = useLanguage();

  const phoneNumber = "01150023774";
  const emailAddress = "alrahawy@gmail.com";
  const whatsappMessage = lang === 'ar' ? "السلام عليكم، أريد الاستفسار عن خدماتكم" : "Hello, I want to inquire about your services";

  return (
    <main className="min-h-screen bg-[#0f172a] py-20 px-6 font-sans" dir={lang === 'ar' ? 'rtl' : 'ltr'}>
      <div className="max-w-4xl mx-auto">
        
        <div className="text-center mb-16">
          <motion.h1 
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-4xl md:text-6xl font-black text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-cyan-400 mb-4 uppercase"
          >
            {lang === 'ar' ? 'تواصل معنا' : 'Contact Us'}
          </motion.h1>
        </div>

        <div className="grid grid-cols-1 gap-8">
          
          {/* كارت العنوان */}
          <motion.div 
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            className="bg-white p-8 rounded-[2.5rem] border border-slate-200 shadow-xl flex flex-col md:flex-row items-center gap-6"
          >
            <div className="text-4xl text-blue-600 bg-blue-50 p-6 rounded-3xl">
              <FaMapMarkerAlt />
            </div>
            <div className="text-center md:text-start flex-1">
              <h3 className="text-2xl font-bold text-blue-600 mb-2">{lang === 'ar' ? 'العنوان' : 'Address'}</h3>
              <p className="text-slate-700 font-bold text-xl">
                {lang === 'ar' ? 'الرهاوى - منشأة القناطر - جيزة' : 'El Rahawy, Manshiyat Al Kanater, Giza'}
              </p>
            </div>
          </motion.div>

          {/* كارت الهاتف (اتصال + واتساب) */}
          <motion.div 
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            className="bg-white p-8 rounded-[2.5rem] border border-slate-200 shadow-xl flex flex-col md:flex-row items-center gap-6"
          >
            <div className="text-4xl text-green-600 bg-green-50 p-6 rounded-3xl">
              <FaPhoneAlt />
            </div>
            <div className="text-center md:text-start flex-1">
              <h3 className="text-2xl font-bold text-green-600 mb-2">{lang === 'ar' ? 'رقم الهاتف' : 'Phone'}</h3>
              <p className="text-slate-700 font-bold text-2xl mb-4" dir="ltr">{phoneNumber}</p>
              
              <div className="flex flex-wrap gap-3 justify-center md:justify-start">
                {/* زر الاتصال */}
                <a 
                  href={`tel:${phoneNumber}`}
                  className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 rounded-2xl font-bold flex items-center gap-2 transition-all active:scale-95 shadow-lg shadow-blue-200"
                >
                  <FaPhoneAlt className="text-lg" />
                  <span>{lang === 'ar' ? 'اتصال هاتفى' : 'Call Now'}</span>
                </a>
                
                {/* زر الواتساب */}
                <a 
                  href={`https://wa.me/${phoneNumber}?text=${encodeURIComponent(whatsappMessage)}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="bg-green-500 hover:bg-green-600 text-white px-6 py-3 rounded-2xl font-bold flex items-center gap-2 transition-all active:scale-95 shadow-lg shadow-green-200"
                >
                  <FaWhatsapp className="text-xl" />
                  <span>{lang === 'ar' ? 'واتساب' : 'WhatsApp'}</span>
                </a>
              </div>
            </div>
          </motion.div>

          {/* كارت البريد الإلكتروني */}
          <motion.div 
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            className="bg-white p-8 rounded-[2.5rem] border border-slate-200 shadow-xl flex flex-col md:flex-row items-center gap-6"
          >
            <div className="text-4xl text-amber-600 bg-amber-50 p-6 rounded-3xl">
              <FaEnvelope />
            </div>
            <div className="text-center md:text-start flex-1">
              <h3 className="text-2xl font-bold text-amber-600 mb-2">{lang === 'ar' ? 'البريد الإلكتروني' : 'Email'}</h3>
              <p className="text-slate-700 font-bold text-xl mb-4">{emailAddress}</p>
              
              <a 
                href={`mailto:${emailAddress}`}
                className="inline-flex items-center gap-2 bg-amber-500 hover:bg-amber-600 text-white px-8 py-3 rounded-2xl font-bold transition-all active:scale-95 shadow-lg shadow-amber-200"
              >
                <FaEnvelope className="text-lg" />
                <span>{lang === 'ar' ? 'إرسال رسالة الآن' : 'Send Message Now'}</span>
              </a>
            </div>
          </motion.div>

        </div>
      </div>
    </main>
  );
};

export default ContactPage;