import Link from "next/link";
import Image from "next/image";

const categories = [
  { name: "غرفة النوم",    image: "/bed.webp",  slug: "bedroom",     icon: "bed",     desc: "طقم نوم ومراتب فاخرة" },
  { name: "غرفة المعيشة", image: "/hero.webp",  slug: "living_room", icon: "weekend", desc: "أثاث وديكور عصري" },
  { name: "غرفة الطعام",  image: "/food.webp",   slug: "dining",      icon: "dining",  desc: "طاولات وكراسي أنيقة" },
  { name: "الأثاث المكتبي", image: "/tech.webp", slug: "office",      icon: "chair_alt", desc: "مكاتب وكراسي مريحة" },
];

export default function Categories() {
  return (
    <section dir="rtl" className="bg-[#f7f9fb] py-16 sm:py-20">
      <div className="max-w-[1280px] mx-auto px-4 sm:px-6 lg:px-12">

        {/* Header */}
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-end gap-4 mb-10 sm:mb-12">
          <div>
            <span className="inline-block text-[#775a19] text-xs font-medium tracking-widest uppercase mb-2 bg-[#fed488]/30 px-3 py-1 rounded-full">
              الفئات
            </span>
            <h2 className="text-2xl sm:text-3xl font-bold text-[#131b2e]">تسوق حسب التصنيف</h2>
          </div>
          <Link href="/products" className="text-sm text-[#775a19] font-medium hover:underline flex items-center gap-1">
            عرض الكل
            <span className="material-symbols-outlined text-sm">arrow_back</span>
          </Link>
        </div>

        {/* Grid — 2 cols mobile, 4 cols desktop */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-5">
          {categories.map((cat) => (
            <Link
              key={cat.slug}
              href={`/products?category=${cat.slug}`}
              className="group relative rounded-2xl overflow-hidden flex flex-col justify-end"
              style={{ aspectRatio: "3/4" }}
            >
              <Image
                src={cat.image}
                alt={cat.name}
                fill
                className="object-cover transition-transform duration-700 group-hover:scale-110"
                sizes="(max-width: 1024px) 50vw, 25vw"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-[#0a0f1e]/85 via-[#0a0f1e]/25 to-transparent" />

              <div className="relative p-4 sm:p-5">
                <div className="w-9 h-9 rounded-xl bg-[#fed488] flex items-center justify-center mb-3 shadow-lg">
                  <span className="material-symbols-outlined text-[#785a1a] text-lg">{cat.icon}</span>
                </div>
                <div className="text-white font-bold text-base sm:text-lg leading-tight">{cat.name}</div>
                <div className="text-white/60 text-xs sm:text-sm mt-1">{cat.desc}</div>
                <div className="mt-3 flex items-center gap-1 text-[#fed488] text-xs font-medium opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                  تسوق الآن
                  <span className="material-symbols-outlined text-sm">arrow_back</span>
                </div>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}
