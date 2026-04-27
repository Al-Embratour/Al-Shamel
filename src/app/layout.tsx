import type { Metadata } from "next"; // استيراد نوع الميتاداتا
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import { LanguageProvider } from "../context/LanguageContext";
import "./globals.css";
import { Geist } from "next/font/google";
import { cn } from "@/lib/utils";

const geist = Geist({ subsets: ['latin'], variable: '--font-sans' });

// إعدادات الكلمات المفتاحية والـ SEO لبرنامج الشامل المحاسبي
export const metadata: Metadata = {
  title: {
    default: "برنامج الشامل المحاسبي - دقة وسهولة في الإدارة المالية",
    template: "%s | الشامل المحاسبي"
  },
  description: "برنامج الشامل المحاسبي: النظام الأفضل لإدارة المبيعات، المشتريات، المخازن، والتقارير المالية بدقة واحترافية تناسب كافة الشركات والمؤسسات.",
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
  viewport: "width=device-width, initial-scale=1",
  icons: {
    icon: "/favicon.ico", // تأكد من وجود ملف favicon في فولدر public
  },
  openGraph: {
    title: "برنامج الشامل المحاسبي - إدارة مالية ذكية",
    description: "الحل التقني الأمثل لإدارة حساباتك وتجارتك بكل سهولة ودقة.",
    type: "website",
    locale: "ar_EG",
    siteName: "برنامج الشامل",
  },
};

export default function RootLayout({ children }) {
  return (
    <html lang="ar">
      <body className={cn("font-sans bg-[#0f172a] antialiased", geist.variable)}>
        <LanguageProvider>
          <Navbar />
          {children}
          <Footer />
        </LanguageProvider>
      </body>
    </html>
  );
}