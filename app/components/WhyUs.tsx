const features = [
  {
    icon: "verified",
    title: "جودة مضمونة",
    desc: "جميع منتجاتنا أصلية بأعلى معايير الجودة",
    color: "from-[#0d9488] to-[#0f766e]",
    iconBg: "bg-teal-500/10",
    iconColor: "text-teal-400",
  },
  {
    icon: "payments",
    title: "سعر تنافسي",
    desc: "أفضل الأسعار مع عروض حصرية مستمرة",
    color: "from-[#d97706] to-[#b45309]",
    iconBg: "bg-amber-500/10",
    iconColor: "text-[#fed488]",
  },
  {
    icon: "local_shipping",
    title: "شحن سريع",
    desc: "توصيل موثوق لجميع مناطق المملكة",
    color: "from-[#3b82f6] to-[#2563eb]",
    iconBg: "bg-blue-500/10",
    iconColor: "text-blue-400",
  },
  {
    icon: "handshake",
    title: "الدفع عند الاستلام",
    desc: "خيارات دفع مرنة وآمنة تناسبك",
    color: "from-[#8b5cf6] to-[#7c3aed]",
    iconBg: "bg-violet-500/10",
    iconColor: "text-violet-400",
  },
];

export default function WhyUs() {
  return (
    <section dir="rtl" className="py-16 sm:py-20 md:py-24 bg-[#131b2e]">
      <div className="max-w-[1280px] mx-auto px-4 sm:px-6 lg:px-12">

        {/* Header */}
        <div className="text-center mb-12 sm:mb-16">
          <span className="inline-block text-[#fed488] text-xs font-medium tracking-widest uppercase mb-3 border border-[#fed488]/20 px-4 py-1.5 rounded-full">
            لماذا سهلناها؟
          </span>
          <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold text-white mt-2">
            نقدم لك أكثر من مجرد أثاث
          </h2>
          <p className="text-white/40 text-sm sm:text-base max-w-sm mx-auto mt-3 leading-relaxed">
            تجربة تسوق متكاملة تبدأ من الاختيار وتنتهي بالتوصيل
          </p>
        </div>

        {/* Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-5">
          {features.map((f, i) => (
            <div
              key={i}
              className="group relative rounded-2xl p-6 sm:p-7 bg-white/[0.04] border border-white/[0.07] hover:bg-white/[0.08] hover:border-white/[0.14] transition-all duration-400 hover:-translate-y-1 overflow-hidden"
            >
              {/* Top gradient line */}
              <div className={`absolute top-0 left-0 right-0 h-[2px] bg-gradient-to-l ${f.color} opacity-0 group-hover:opacity-100 transition-opacity duration-400`} />

              <div className={`w-12 h-12 rounded-xl ${f.iconBg} flex items-center justify-center mb-5`}>
                <span className={`material-symbols-outlined text-2xl ${f.iconColor}`}>{f.icon}</span>
              </div>

              <h4 className="text-white font-semibold text-base mb-2">{f.title}</h4>
              <p className="text-white/40 text-sm leading-relaxed">{f.desc}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
