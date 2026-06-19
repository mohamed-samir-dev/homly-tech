const features = [
  { icon: "verified", title: "جودة مضمونة", desc: "جميع منتجاتنا أصلية وتخضع لأعلى معايير الجودة العالمية", accent: "#005047" },
  { icon: "payments", title: "سعر تنافسي", desc: "نضمن لك أفضل الأسعار في السوق مع عروض حصرية ومستمرة", accent: "#775a19" },
  { icon: "local_shipping", title: "شحن سريع", desc: "خدمة توصيل سريعة وموثوقة لجميع مناطق المملكة", accent: "#131b2e" },
  { icon: "handshake", title: "الدفع عند الاستلام", desc: "نوفر لك خيارات دفع مرنة وآمنة تشمل الدفع عند الاستلام", accent: "#3f465c" },
];

export default function WhyUs() {
  return (
    <section dir="rtl" className="py-16 sm:py-20 md:py-28 bg-[#131b2e] relative overflow-hidden">
      {/* Decorative elements */}
      <div className="absolute top-1/2 left-0 w-[500px] h-[500px] bg-[#775a19]/[0.04] rounded-full -translate-x-1/2 -translate-y-1/2" />
      <div className="absolute top-0 right-0 w-80 h-80 bg-[#005047]/[0.06] rounded-full translate-x-1/3 -translate-y-1/3" />
      <div className="absolute bottom-0 left-1/3 w-64 h-64 bg-[#3f465c]/[0.08] rounded-full translate-y-1/2" />

      <div className="max-w-[1280px] mx-auto px-4 sm:px-6 lg:px-12 relative z-10">
        {/* Header */}
        <div className="text-center mb-12 sm:mb-16">
          <span className="inline-block text-[#fed488] text-xs font-medium tracking-[0.05em] uppercase mb-3 border border-[#fed488]/20 px-4 py-1.5 rounded-full">
            مميزاتنا
          </span>
          <h2 className="text-2xl sm:text-3xl md:text-[36px] md:leading-[44px] font-semibold text-white tracking-tight mb-3">
            لماذا تختارنا؟
          </h2>
          <p className="text-[#bec6e0]/60 text-sm sm:text-base max-w-md mx-auto leading-relaxed">
            نسعى دائماً لتقديم أفضل تجربة تسوق لعملائنا
          </p>
        </div>

        {/* Features Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5 md:gap-6">
          {features.map((f, i) => (
            <div
              key={i}
              className="group relative flex flex-col items-center text-center rounded-2xl p-7 sm:p-8 border border-white/[0.06] bg-white/[0.03] backdrop-blur-sm hover:bg-white/[0.07] transition-all duration-500 hover:-translate-y-1"
            >
              {/* Glow effect on hover */}
              <div
                className="absolute inset-0 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-500"
                style={{ boxShadow: `inset 0 1px 0 0 ${f.accent}40, 0 0 40px ${f.accent}08` }}
              />

              <div
                className="relative w-14 h-14 sm:w-16 sm:h-16 rounded-2xl flex items-center justify-center mb-5 transition-transform duration-300 group-hover:scale-110"
                style={{ backgroundColor: `${f.accent}20` }}
              >
                <span className="material-symbols-outlined text-2xl sm:text-[28px]" style={{ color: f.accent === "#131b2e" ? "#bec6e0" : f.accent === "#775a19" ? "#fed488" : f.accent === "#005047" ? "#3cddc7" : "#bec6e0" }}>
                  {f.icon}
                </span>
              </div>

              <h4 className="relative text-base sm:text-lg font-semibold text-white mb-2.5">{f.title}</h4>
              <p className="relative text-sm text-[#bec6e0]/50 leading-relaxed">{f.desc}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
