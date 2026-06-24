const categories = [
  {
    name: "غرفة المعيشة",
    image: "/home.webp",
    slug: "living_room",
    desc: "أثاث وديكور غرفة المعيشة",
    icon: "weekend",
  },
  {
    name: "غرفة النوم",
    image: "/hero.webp",
    slug: "bedroom",
    desc: "طقم نوم ومراتب فاخرة",
    icon: "bed",
  },
  {
    name: "الديكور والإكسسوارات",
    image: "/taq.webp",
    slug: "decor",
    desc: "لمسات جمالية تكمل منزلك",
    icon: "home_work",
  },
];

export default function Categories() {
  return (
    <section dir="rtl" className="max-w-[1280px] mx-auto px-4 sm:px-6 lg:px-12 py-16 sm:py-20">
      <div className="text-center mb-10 sm:mb-14">
        <h2 className="text-2xl sm:text-[30px] sm:leading-[38px] font-semibold text-[#191c1e] mb-3">تصفح حسب الفئة</h2>
        <p className="text-[#45464d] text-sm sm:text-base max-w-md mx-auto">اختر الفئة المناسبة لك واكتشف أفضل المنتجات</p>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6 md:h-[400px]">
        {/* Large card */}
        <a
          href={`/products?category=${categories[0].slug}`}
          className="md:col-span-2 relative rounded-xl overflow-hidden group cursor-pointer shadow-[0_12px_24px_rgba(20,30,50,0.04)] hover:shadow-[0_24px_48px_rgba(20,30,50,0.08)] transition-all"
        >
          <img
            className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105 min-h-[240px]"
            alt={categories[0].name}
            src={categories[0].image}
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
          <div className="absolute bottom-0 right-0 left-0 p-6">
            <span className="inline-flex items-center gap-2 bg-[#fed488] text-[#785a1a] text-xs font-medium px-3 py-1 rounded mb-3">
              <span className="material-symbols-outlined text-sm">{categories[0].icon}</span>
              {categories[0].name}
            </span>
            <h3 className="text-xl sm:text-2xl font-semibold text-white">{categories[0].desc}</h3>
          </div>
        </a>

        {/* Right column - two stacked cards */}
        <a
          href={`/products?category=${categories[1].slug}`}
          className="relative rounded-xl overflow-hidden group cursor-pointer shadow-[0_12px_24px_rgba(20,30,50,0.04)] hover:shadow-[0_24px_48px_rgba(20,30,50,0.08)] transition-all min-h-[180px]"
        >
          <img
            className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
            alt={categories[1].name}
            src={categories[1].image}
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
          <div className="absolute bottom-0 right-0 left-0 p-5">
            <span className="inline-flex items-center gap-2 bg-[#fed488] text-[#785a1a] text-xs font-medium px-3 py-1 rounded mb-2">
              <span className="material-symbols-outlined text-sm">{categories[1].icon}</span>
              {categories[1].name}
            </span>
            <h3 className="text-lg font-semibold text-white">{categories[1].desc}</h3>
          </div>
        </a>

        <a
          href={`/products?category=${categories[2].slug}`}
          className="relative rounded-xl overflow-hidden group cursor-pointer shadow-[0_12px_24px_rgba(20,30,50,0.04)] hover:shadow-[0_24px_48px_rgba(20,30,50,0.08)] transition-all min-h-[180px]"
        >
          <img
            className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
            alt={categories[2].name}
            src={categories[2].image}
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
          <div className="absolute bottom-0 right-0 left-0 p-5">
            <span className="inline-flex items-center gap-2 bg-[#fed488] text-[#785a1a] text-xs font-medium px-3 py-1 rounded mb-2">
              <span className="material-symbols-outlined text-sm">{categories[2].icon}</span>
              {categories[2].name}
            </span>
            <h3 className="text-lg font-semibold text-white">{categories[2].desc}</h3>
          </div>
        </a>
      </div>
    </section>
  );
}
