"use client";
import { useState } from "react";
import Header from "../components/Header";
import Footer from "../components/Footer";
import WhatsAppButton from "../components/WhatsAppButton";

export default function ContactPage() {
  const [formData, setFormData] = useState({ name: "", phone: "", subject: "", message: "" });
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const whatsappMessage = `الاسم: ${formData.name}\nالموضوع: ${formData.subject}\nالرسالة: ${formData.message}`;
    window.open(`https://wa.me/966591031747?text=${encodeURIComponent(whatsappMessage)}`, "_blank");
    setSubmitted(true);
  };

  return (
    <>
      <Header />
      <main className="min-h-screen bg-[#f7f9fb]">
        {/* Hero Section */}
        <section className="bg-[#131b2e] py-16 md:py-24 relative overflow-hidden">
          <div className="absolute inset-0 opacity-10">
            <div className="absolute top-0 left-1/4 w-72 h-72 bg-[#fed488] rounded-full blur-[120px]" />
            <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-[#3cddc7] rounded-full blur-[150px]" />
          </div>
          <div className="max-w-[1280px] mx-auto px-4 sm:px-6 lg:px-12 text-center relative z-10">
            <span className="inline-block text-[#e9c176] text-sm font-medium tracking-[0.05em] uppercase mb-4">تواصل معنا</span>
            <h1 className="text-3xl sm:text-4xl md:text-[60px] font-bold text-white leading-tight md:leading-[72px] tracking-tight mb-4">
              نحن هنا لمساعدتك
            </h1>
            <p className="text-[#e0e3e5] text-base sm:text-lg max-w-xl mx-auto leading-7">
              فريقنا جاهز لخدمتكم على مدار الساعة - لا تتردد في التواصل معنا
            </p>
          </div>
        </section>

        {/* Content */}
        <div className="max-w-[1280px] mx-auto px-4 sm:px-6 lg:px-12 -mt-12 relative z-20 pb-20">
          <div className="grid lg:grid-cols-5 gap-6 md:gap-8">
            {/* Contact Info Cards */}
            <div className="lg:col-span-2 space-y-5">
              {/* WhatsApp Card */}
              <a href="https://wa.me/966591031747" target="_blank" rel="noopener noreferrer"
                className="group block bg-white rounded-xl p-6 shadow-[0_4px_12px_rgba(19,27,46,0.04)] border border-[#c6c6cd]/40 hover:shadow-[0_8px_24px_rgba(19,27,46,0.08)] hover:border-[#3cddc7]/40 transition-all">
                <div className="flex items-center gap-4">
                  <div className="w-12 h-12 bg-[#005047] rounded-lg flex items-center justify-center group-hover:scale-105 transition-transform">
                    <svg className="w-6 h-6 fill-[#3cddc7]" viewBox="0 0 24 24">
                      <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/>
                    </svg>
                  </div>
                  <div>
                    <span className="text-xs text-[#45464d] font-medium tracking-[0.05em]">واتساب</span>
                    <span className="block text-[#191c1e] font-semibold text-lg" dir="ltr">0592069730</span>
                  </div>
                </div>
              </a>

              {/* Location Card */}
              <div className="bg-white rounded-xl p-6 shadow-[0_4px_12px_rgba(19,27,46,0.04)] border border-[#c6c6cd]/40">
                <div className="flex items-center gap-4">
                  <div className="w-12 h-12 bg-[#131b2e] rounded-lg flex items-center justify-center">
                    <span className="material-symbols-outlined text-[#bec6e0]">location_on</span>
                  </div>
                  <div>
                    <span className="text-xs text-[#45464d] font-medium tracking-[0.05em]">العنوان</span>
                    <span className="block text-[#191c1e] font-semibold">المملكة العربية السعودية</span>
                  </div>
                </div>
              </div>

              {/* Working Hours Card */}
              <div className="bg-white rounded-xl p-6 shadow-[0_4px_12px_rgba(19,27,46,0.04)] border border-[#c6c6cd]/40">
                <div className="flex items-center gap-4">
                  <div className="w-12 h-12 bg-[#131b2e] rounded-lg flex items-center justify-center">
                    <span className="material-symbols-outlined text-[#bec6e0]">schedule</span>
                  </div>
                  <div>
                    <span className="text-xs text-[#45464d] font-medium tracking-[0.05em]">أوقات العمل</span>
                    <span className="block text-[#191c1e] font-semibold">على مدار الساعة - 24/7</span>
                  </div>
                </div>
              </div>

              {/* Gold Accent CTA */}
              <div className="bg-gradient-to-br from-[#775a19] to-[#5d4201] rounded-xl p-6 text-white">
                <h3 className="font-semibold text-lg mb-2">خدمة عملاء مميزة</h3>
                <p className="text-[#fed488] text-sm leading-6">نلتزم بالرد على جميع استفساراتكم خلال أقل من ساعة واحدة</p>
              </div>
            </div>

            {/* Contact Form */}
            <div className="lg:col-span-3">
              <div className="bg-white rounded-xl p-6 sm:p-8 shadow-[0_4px_12px_rgba(19,27,46,0.04)] border border-[#c6c6cd]/40">
                <h2 className="text-2xl font-semibold text-[#191c1e] mb-1">أرسل لنا رسالة</h2>
                <p className="text-[#45464d] text-sm mb-8">سنقوم بالرد عليك في أقرب وقت ممكن</p>

                {submitted ? (
                  <div className="text-center py-12">
                    <div className="w-16 h-16 bg-[#005047] rounded-full flex items-center justify-center mx-auto mb-4">
                      <span className="material-symbols-outlined text-[#3cddc7] text-3xl">check</span>
                    </div>
                    <p className="text-[#191c1e] font-semibold text-xl mb-2">تم إرسال رسالتك بنجاح!</p>
                    <p className="text-[#45464d] text-sm">سنتواصل معك في أقرب وقت</p>
                    <button onClick={() => setSubmitted(false)} className="mt-6 text-sm font-medium text-[#3f465c] border border-[#c6c6cd] rounded-lg px-5 py-2.5 hover:bg-[#f2f4f6] transition-colors">
                      إرسال رسالة أخرى
                    </button>
                  </div>
                ) : (
                  <form onSubmit={handleSubmit} className="space-y-5">
                    <div className="grid sm:grid-cols-2 gap-5">
                      <div>
                        <label className="block text-xs font-medium text-[#45464d] tracking-[0.05em] mb-2">الاسم</label>
                        <input
                          type="text"
                          required
                          value={formData.name}
                          onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                          className="w-full border border-[#c6c6cd] rounded-lg px-4 py-3 text-sm text-[#191c1e] bg-[#f7f9fb] focus:border-[#131b2e] focus:ring-1 focus:ring-[#131b2e] focus:outline-none transition-colors"
                          placeholder="اسمك الكريم"
                        />
                      </div>
                      <div>
                        <label className="block text-xs font-medium text-[#45464d] tracking-[0.05em] mb-2">رقم الجوال</label>
                        <input
                          type="tel"
                          value={formData.phone}
                          onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                          className="w-full border border-[#c6c6cd] rounded-lg px-4 py-3 text-sm text-[#191c1e] bg-[#f7f9fb] focus:border-[#131b2e] focus:ring-1 focus:ring-[#131b2e] focus:outline-none transition-colors"
                          placeholder="05XXXXXXXX"
                          dir="ltr"
                        />
                      </div>
                    </div>
                    <div>
                      <label className="block text-xs font-medium text-[#45464d] tracking-[0.05em] mb-2">الموضوع</label>
                      <input
                        type="text"
                        required
                        value={formData.subject}
                        onChange={(e) => setFormData({ ...formData, subject: e.target.value })}
                        className="w-full border border-[#c6c6cd] rounded-lg px-4 py-3 text-sm text-[#191c1e] bg-[#f7f9fb] focus:border-[#131b2e] focus:ring-1 focus:ring-[#131b2e] focus:outline-none transition-colors"
                        placeholder="موضوع الرسالة"
                      />
                    </div>
                    <div>
                      <label className="block text-xs font-medium text-[#45464d] tracking-[0.05em] mb-2">الرسالة</label>
                      <textarea
                        required
                        rows={5}
                        value={formData.message}
                        onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                        className="w-full border border-[#c6c6cd] rounded-lg px-4 py-3 text-sm text-[#191c1e] bg-[#f7f9fb] focus:border-[#131b2e] focus:ring-1 focus:ring-[#131b2e] focus:outline-none transition-colors resize-none"
                        placeholder="اكتب رسالتك هنا..."
                      />
                    </div>
                    <button
                      type="submit"
                      className="w-full bg-[#000000] text-white font-semibold py-3.5 rounded-lg hover:bg-[#131b2e] transition-colors shadow-[0_4px_16px_rgba(19,27,46,0.2)]"
                    >
                      إرسال عبر واتساب
                    </button>
                  </form>
                )}
              </div>
            </div>
          </div>
        </div>
      </main>
      <Footer />
      <WhatsAppButton />
    </>
  );
}
