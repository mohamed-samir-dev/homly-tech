"use client";
import { Suspense, useEffect, useState } from "react";
import { useSearchParams } from "next/navigation";
import Header from "../components/Header";
import Footer from "../components/Footer";
import { useCart } from "../context/CartContext";

interface Product {
  _id: string;
  name: string;
  slug: string;
  description?: string;
  price: number;
  oldPrice?: number;
  category: string;
  brand?: string;
  stock: number;
  images: string[];
  isFeatured: boolean;
  isBestSeller: boolean;
}

const CATEGORY_LABELS: Record<string, string> = {
  living_room: "غرفة المعيشة",
  bedroom: "غرفة النوم",
  dining: "غرفة الطعام",
  office: "أثاث المكتب",
  outdoor: "أثاث خارجي",
  decor: "ديكور وإكسسوارات",
  packages: "بكجات وعروض خاصة",
};

const API_URL = process.env.NEXT_PUBLIC_API_URL || "http://localhost:5000";

export default function ProductsPage() {
  return (
    <Suspense fallback={<div className="flex justify-center items-center h-64"><div className="w-10 h-10 border-4 border-[#775a19] border-t-transparent rounded-full animate-spin" /></div>}>
      <ProductsContent />
    </Suspense>
  );
}

function ProductsContent() {
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);
  const [activeCategory, setActiveCategory] = useState("all");
  const [searchQuery, setSearchQuery] = useState("");
  const [addedId, setAddedId] = useState<string | null>(null);
  const { addToCart } = useCart();
  const searchParams = useSearchParams();

  useEffect(() => {
    const cat = searchParams.get("category");
    if (cat) setActiveCategory(cat);
  }, [searchParams]);

  useEffect(() => {
    const params = new URLSearchParams({ limit: "200" });
    if (activeCategory !== "all") params.set("category", activeCategory);
    if (searchQuery.trim()) params.set("q", searchQuery.trim());

    setLoading(true);
    fetch(`${API_URL}/api/products?${params}`)
      .then((res) => res.json())
      .then((data) => {
        setProducts(data.data || []);
        setLoading(false);
      })
      .catch(() => setLoading(false));
  }, [activeCategory, searchQuery]);

  const handleAdd = (e: React.MouseEvent, product: Product) => {
    e.preventDefault();
    e.stopPropagation();
    if (product.stock < 1) return;
    addToCart({
      productId: product._id,
      name: product.name,
      price: product.price,
      image: product.images?.[0] || "",
      stock: product.stock,
    });
    setAddedId(product._id);
    setTimeout(() => setAddedId(null), 1500);
  };

  const filtered = searchQuery
    ? products.filter((p) => p.name.includes(searchQuery) || p.brand?.includes(searchQuery))
    : products;

  return (
    <>
      <Header />
      <main className="min-h-screen bg-gradient-to-b from-[#131b2e] via-[#131b2e]/5 to-[#f7f9fb]">
        {/* Hero Banner */}
        <div className="bg-[#131b2e] py-10 sm:py-14 md:py-16 relative overflow-hidden">
          <div className="absolute inset-0 bg-gradient-to-l from-[#775a19]/10 to-transparent" />
          <div className="absolute top-0 left-1/4 w-72 h-72 bg-[#775a19]/5 rounded-full blur-3xl" />
          <div className="max-w-[1280px] mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
            <h1 className="text-2xl sm:text-3xl md:text-4xl font-bold text-white mb-3">جميع المفروشات</h1>
            <p className="text-white/50 text-sm sm:text-base">اكتشف مجموعتنا المتنوعة من الأثاث والمفروشات المنزلية</p>
          </div>
        </div>

        <div className="max-w-[1280px] mx-auto px-4 sm:px-6 lg:px-8 py-6 sm:py-8">
          {/* Search & Filters */}
          <div className="bg-white rounded-2xl shadow-sm border border-[#c6c6cd]/30 p-4 sm:p-5 mb-6 sm:mb-8 -mt-8 relative z-20">
            <div className="flex flex-col sm:flex-row gap-3 sm:gap-4">
              <div className="relative flex-1">
                <span className="material-symbols-outlined absolute right-3 top-1/2 -translate-y-1/2 text-[#191c1e]/30 text-[20px]">search</span>
                <input
                  className="w-full bg-[#f2f4f6] rounded-xl pr-10 pl-4 py-2.5 sm:py-3 text-sm border border-[#c6c6cd]/30 focus:ring-2 focus:ring-[#131b2e]/20 focus:border-[#131b2e]/30 focus:outline-none placeholder:text-[#191c1e]/40 transition-all"
                  placeholder="ابحث عن منتج..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                />
              </div>
              <div className="flex items-center gap-2 text-sm text-[#191c1e]/60">
                <span className="material-symbols-outlined text-[18px]">filter_list</span>
                <span className="hidden sm:inline">{filtered.length} منتج</span>
              </div>
            </div>
            <div className="flex gap-2 mt-4 overflow-x-auto pb-1 scrollbar-hide">
              <button
                onClick={() => setActiveCategory("all")}
                className={`px-4 py-2 rounded-xl text-xs sm:text-sm font-medium transition-all whitespace-nowrap shrink-0 ${
                  activeCategory === "all"
                    ? "bg-[#131b2e] text-white shadow-md shadow-[#131b2e]/20"
                    : "bg-[#f2f4f6] text-[#191c1e]/70 hover:bg-[#131b2e]/10 border border-[#c6c6cd]/30"
                }`}
              >
                الكل
              </button>
              {Object.entries(CATEGORY_LABELS).map(([key, label]) => (
                <button
                  key={key}
                  onClick={() => setActiveCategory(key)}
                  className={`px-4 py-2 rounded-xl text-xs sm:text-sm font-medium transition-all whitespace-nowrap shrink-0 ${
                    activeCategory === key
                      ? "bg-[#131b2e] text-white shadow-md shadow-[#131b2e]/20"
                      : "bg-[#f2f4f6] text-[#191c1e]/70 hover:bg-[#131b2e]/10 border border-[#c6c6cd]/30"
                  }`}
                >
                  {label}
                </button>
              ))}
            </div>
          </div>

          {loading && (
            <div className="flex justify-center items-center h-64">
              <div className="w-10 h-10 border-4 border-[#775a19] border-t-transparent rounded-full animate-spin" />
            </div>
          )}

          {!loading && filtered.length === 0 && (
            <div className="text-center py-20 text-[#191c1e]/60">
              <span className="material-symbols-outlined text-5xl sm:text-6xl mb-4 block">inventory_2</span>
              <p className="text-base sm:text-lg">لا توجد منتجات</p>
            </div>
          )}

          {!loading && filtered.length > 0 && (
            <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-3 sm:gap-4 lg:gap-5">
              {filtered.map((product) => (
                <a
                  href={`/products/${product.slug}`}
                  key={product._id}
                  className="group relative flex flex-col bg-white rounded-2xl overflow-hidden border border-[#c6c6cd]/20 hover:border-[#775a19]/20 transition-all duration-300 hover:shadow-xl hover:shadow-[#131b2e]/8 hover:-translate-y-1"
                >
                  {/* Badges */}
                  <div className="absolute top-2.5 right-2.5 left-2.5 z-10 flex justify-between items-start">
                    <div className="flex flex-col gap-1">
                      {product.oldPrice && (
                        <span className="bg-[#ba1a1a] text-white text-[10px] font-bold px-2 py-0.5 rounded-md">
                          -{Math.round(((product.oldPrice - product.price) / product.oldPrice) * 100)}%
                        </span>
                      )}
                      {product.isBestSeller && (
                        <span className="bg-[#fed488] text-[#775a19] text-[10px] font-bold px-2 py-0.5 rounded-md flex items-center gap-0.5">
                          <span className="material-symbols-outlined text-[11px]">star</span>
                          مميز
                        </span>
                      )}
                    </div>
                    {product.stock > 0 ? (
                      <span className="text-[10px] text-[#009485] bg-white/90 backdrop-blur-sm px-2 py-0.5 rounded-md font-medium shadow-sm">متوفر</span>
                    ) : (
                      <span className="text-[10px] text-[#ba1a1a] bg-white/90 backdrop-blur-sm px-2 py-0.5 rounded-md font-medium shadow-sm">نفذ</span>
                    )}
                  </div>

                  {/* Image */}
                  <div className="relative aspect-square bg-[#f7f9fb] overflow-hidden">
                    {product.images?.[0] ? (
                      <img
                        src={product.images[0].startsWith("http") ? product.images[0] : `${API_URL}/uploads/${product.images[0]}`}
                        alt={product.name}
                        className="w-full h-full object-contain p-4 sm:p-6 group-hover:scale-110 transition-transform duration-500"
                      />
                    ) : (
                      <div className="flex items-center justify-center h-full">
                        <span className="material-symbols-outlined text-4xl text-[#c6c6cd]">image</span>
                      </div>
                    )}
                  </div>

                  {/* Content */}
                  <div className="p-3 sm:p-4 flex flex-col flex-1">
                    <span className="text-[10px] text-[#76777d] font-medium mb-1">
                      {CATEGORY_LABELS[product.category] || product.category}
                    </span>
                    <h3 className="text-xs sm:text-sm font-semibold text-[#191c1e] line-clamp-2 leading-relaxed mb-2">
                      {product.name}
                    </h3>
                    {product.brand && (
                      <span className="text-[10px] text-[#76777d] mb-2 block">{product.brand}</span>
                    )}

                    <div className="mt-auto flex items-center justify-between pt-3 border-t border-[#eceef0]">
                      <div>
                        <span className="text-sm sm:text-base font-bold text-[#131b2e]">{product.price.toLocaleString()} ر.س</span>
                        {product.oldPrice && (
                          <span className="block text-[10px] text-[#76777d] line-through">{product.oldPrice.toLocaleString()} ر.س</span>
                        )}
                      </div>
                      <button
                        onClick={(e) => handleAdd(e, product)}
                        className={`px-3 py-1.5 rounded-lg text-[11px] sm:text-xs font-medium transition-all duration-200 flex items-center gap-1 ${
                          addedId === product._id
                            ? "bg-[#009485] text-white"
                            : "bg-[#131b2e] text-white hover:bg-[#775a19]"
                        }`}
                      >
                        <span className="material-symbols-outlined text-[14px]">
                          {addedId === product._id ? "check" : "add_shopping_cart"}
                        </span>
                        {addedId === product._id ? "تمت" : "أضف"}
                      </button>
                    </div>
                  </div>
                </a>
              ))}
            </div>
          )}
        </div>
      </main>
      <Footer />
    </>
  );
}
