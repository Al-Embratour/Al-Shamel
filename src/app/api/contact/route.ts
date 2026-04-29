import { NextResponse } from 'next/server';
const nodemailer = require('nodemailer');
export async function POST(req: Request) {
  try {
    const { name, email, phone, message } = await req.json();

    // إعدادات محرك الإرسال (Nodemailer)
    const transporter = nodemailer.createTransport({
      service: 'gmail',
      auth: {
        user: 'alrahawy@gmail.com', // 👈 اكتب إيميلك اللي هيتبعت منه هنا
        pass: process.env.GMAIL_APP_PASSWORD, // 👈 الـ 16 حرف هنحطهم في ملف البيئة
      },
    });

    // محتوى الرسالة اللي هتوصلك على الإيميل
    const mailOptions = {
      from: `"Al-Shamel Website" <alrahawy@gmail.com>`,
      to: 'alrahawy@gmail.com', // 👈 اكتب إيميلك اللي عايز تستلم عليه الرسائل هنا
      subject: `رسالة جديدة من: ${name}`,
      html: `
        <div style="font-family: sans-serif; direction: rtl; text-align: right; border: 1px solid #e2e8f0; padding: 20px; border-radius: 10px;">
          <h2 style="color: #10b981;">طلب تواصل جديد من موقع الشامل</h2>
          <p><strong>الاسم:</strong> ${name}</p>
          <p><strong>رقم الهاتف:</strong> ${phone}</p>
          <p><strong>البريد الإلكتروني:</strong> ${email}</p>
          <hr style="border: 0; border-top: 1px solid #e2e8f0;" />
          <p><strong>الرسالة:</strong></p>
          <p style="background: #f8fafc; padding: 15px; border-radius: 5px;">${message}</p>
        </div>
      `,
    };

    await transporter.sendMail(mailOptions);

    return NextResponse.json({ success: true }, { status: 200 });
  } catch (error) {
    console.error("Nodemailer Error:", error);
    return NextResponse.json({ success: false, error: "Failed to send email" }, { status: 500 });
  }
}