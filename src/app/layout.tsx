import type { Metadata } from "next"; // استيراد نوع الميتاداتا
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import { LanguageProvider } from "../context/LanguageContext";
import "./globals.css";
// 1. استيراد خط Tajawal
import { Tajawal } from "next/font/google";
import { cn } from "@/lib/utils";

// 2. تعريف خط Tajawal بالأوزان المناسبة
const tajawal = Tajawal({ 
  subsets: ['arabic', 'latin'], 
  weight: ['200', '300', '400', '500', '700', '800', '900'],
  variable: '--font-tajawal' 
});

// إعدادات الكلمات المفتاحية والـ SEO لبرنامج الشامل المحاسبي
export const metadata: Metadata = {
  title: {
    default: "برنامج الشامل للحسابات والمخازن",
    template: "%s | الشامل المحاسبي"
  },
  description: "برنامج الشامل للحساسات والمخازن : النظام الأفضل لإدارة المبيعات، المشتريات، المخازن، والتقارير المالية بدقة واحترافية تناسب كافة الشركات والمؤسسات.",
  keywords: [
    "الشامل",
    "برنامج الشامل المحاسبي", 
    "برنامج محاسبة", 
    "نظام محاسبي متكامل", 
    "إدارة المخازن والمبيعات", 
    "برنامج حسابات ومخازن", 
    "محاسبة الشركات", 
    "Al-Shamel Accounting", 
    "Al-Shamel", 
    "Al Shamel", 
    "El Shamel", 
    "Accounting Software Egypt",
    "نظام الشامل للبرمجيات"
  ],
  authors: [{ name: "برنامج الشامل" }],
  icons: {
    icon: "/favicon.ico",
  },
  openGraph: {
    title: "برنامج الشامل للحسابات والمخازن - إدارة مالية ذكية",
    description: "الحل التقني الأمثل لإدارة حساباتك وتجارتك بكل سهولة ودقة.",
    type: "website",
    locale: "ar_EG",
    siteName: "برنامج الشامل",
  },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="ar">
      {/* 3. استخدام متغير tajawal.variable هنا */}
      <body className={cn("font-sans bg-[#0f172a] antialiased", tajawal.variable)}>
        <LanguageProvider>
          <Navbar />
          {children}
          <Footer />
        </LanguageProvider>
      </body>
    </html>
  );
}