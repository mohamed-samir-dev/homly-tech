"use client";
import { useEffect, useRef } from "react";

export default function Hero() {
  const sectionRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const section = sectionRef.current;
    if (!section) return;
    const onScroll = () => {
      const scrollY = window.scrollY;
      const bg = section.querySelector(".hero-bg") as HTMLElement;
      if (bg) bg.style.transform = `translateY(${scrollY * 0.3}px)`;
    };
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <section ref={sectionRef} className="relative w-full h-[70vh] sm:h-[85vh] min-h-[480px] sm:min-h-[600px] max-h-[800px] overflow-hidden" dir="rtl">
      {/* Background */}
      <div
        className="hero-bg absolute inset-0 scale-110 bg-cover bg-center will-change-transform"
        style={{
          backgroundImage:
"url('/hero.webp')",
        }}
      />

      {/* Gradient overlays */}
      <div className="absolute inset-0 bg-gradient-to-l from-[#0a0f1e]/90 via-[#0a0f1e]/60 to-transparent" />
      <div className="absolute inset-0 bg-gradient-to-t from-[#0a0f1e]/50 via-transparent to-transparent" />

      {/* Content */}
      <div className="relative z-10 flex flex-col justify-center h-full max-w-[1280px] mx-auto px-4 sm:px-6 lg:px-12">
        <div className="max-w-2xl">
          {/* Badge */}
          <div className="flex items-center gap-2 mb-6">
            <span className="w-8 h-[2px] bg-[#fed488]" />
            <span className="text-[#fed488] text-xs sm:text-sm font-medium tracking-widest uppercase">
              مجموعة 2025
            </span>
          </div>

          {/* Heading */}
          <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-[68px] lg:leading-[76px] font-bold text-white mb-6 leading-tight tracking-tight">
            أثّث منزلك
            <span className="block text-[#fed488] mt-1">بأناقة حقيقية</span>
          </h1>

          {/* Subtext */}
          <p className="text-base sm:text-lg text-white/70 max-w-lg mb-10 leading-relaxed">
            اكتشف تشكيلتنا من المفروشات والأثاث الفاخر — تصاميم عصرية تناسب كل ذوق وكل ميزانية.
          </p>

          {/* CTAs */}
          <div className="flex flex-wrap gap-4">
            <a
              href="/products"
              className="inline-flex items-center gap-2 bg-[#fed488] text-[#785a1a] px-8 py-3.5 rounded-full text-sm sm:text-base font-semibold hover:bg-[#ffc94d] transition-all duration-300 shadow-xl shadow-[#fed488]/20 hover:scale-105 active:scale-95"
            >
              تسوق الآن
              <span className="material-symbols-outlined text-base">arrow_back</span>
            </a>
            <a
              href="/about"
              className="inline-flex items-center gap-2 bg-white/10 backdrop-blur-sm text-white px-8 py-3.5 rounded-full text-sm sm:text-base font-medium border border-white/20 hover:bg-white/20 transition-all duration-300"
            >
              تعرف علينا
            </a>
          </div>

          {/* Stats */}
          <div className="flex gap-8 mt-8 sm:mt-14 pt-6 sm:pt-8 border-t border-white/10">
            {[
              { value: "+500", label: "منتج متاح" },
              { value: "+1000", label: "عميل راضٍ" },
              { value: "100%", label: "جودة مضمونة" },
            ].map((s) => (
              <div key={s.label}>
                <div className="text-[#fed488] font-bold text-xl sm:text-2xl">{s.value}</div>
                <div className="text-white/50 text-xs sm:text-sm mt-0.5">{s.label}</div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Bottom wave */}
      <div className="absolute bottom-0 left-0 right-0">
        <svg viewBox="0 0 1440 60" fill="none" xmlns="http://www.w3.org/2000/svg" preserveAspectRatio="none" className="w-full h-10 sm:h-14">
          <path d="M0 60L1440 60L1440 20C1200 60 960 0 720 20C480 40 240 0 0 20L0 60Z" fill="#f7f9fb" />
        </svg>
      </div>
    </section>
  );
}
