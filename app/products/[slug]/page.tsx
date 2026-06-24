"use client";
import { useEffect, useState, useRef } from "react";
import { useParams } from "next/navigation";
import Header from "../../components/Header";
import Footer from "../../components/Footer";
import { useCart } from "../../context/CartContext";

interface Product {
  _id: string;
  name: string;
  slug: string;
  description?: string;
  shortDescription?: string;
  price: number;
  oldPrice?: number;
  discount?: number;
  category: string;
  brand?: string;
  sku?: string;
  customCode?: string;
  stock: number;
  images: string[];
  features?: string[];
  specs?: Record<string, Record<string, string>>;
  reviews?: { rating: number; count: number };
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

const SPEC_KEYS: Record<string, string> = {
  desk: "مقاسات المكتب",
  chair: "مقاسات الكرسي",
  width: "العرض",
  depth: "العمق",
  height: "الارتفاع",
};

const API_URL = process.env.NEXT_PUBLIC_API_URL || "http://localhost:5000";

function parseDescription(desc: string) {
  const sections: { title: string; items: string[] }[] = [];
  let currentTitle = "نبذة عامة";
  let currentItems: string[] = [];

  desc.split("\n").forEach((line) => {
    const trimmed = line.trim();
    if (!trimmed) return;
    if (trimmed.endsWith(":") && !trimmed.startsWith("-")) {
      if (currentItems.length) sections.push({ title: currentTitle, items: currentItems });
      currentTitle = trimmed.slice(0, -1);
      currentItems = [];
    } else if (trimmed.startsWith("-")) {
      currentItems.push(trimmed.slice(1).trim());
    } else {
      currentItems.push(trimmed);
    }
  });
  if (currentItems.length) sections.push({ title: currentTitle, items: currentItems });
  return sections;
}

export default function ProductDetailsPage() {
  const { slug } = useParams();
  const { addToCart } = useCart();
  const [product, setProduct] = useState<Product | null>(null);
  const [loading, setLoading] = useState(true);
  const [activeImage, setActiveImage] = useState(0);
  const [quantity, setQuantity] = useState(1);
  const [added, setAdded] = useState(false);
  const [activeTab, setActiveTab] = useState<"description" | "features" | "specs">("description");
  const [zoomed, setZoomed] = useState(false);
  const [mousePos, setMousePos] = useState({ x: 50, y: 50 });
  const imgRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!slug) return;
    fetch(`${API_URL}/api/products/${slug}`)
      .then((res) => res.json())
      .then((data) => {
        setProduct(data.data || data.product || data);
        setLoading(false);
      })
      .catch(() => setLoading(false));
  }, [slug]);

  const getImageUrl = (img: string) =>
    img.startsWith("http") ? img : `${API_URL}/uploads/${img}`;

  const handleAddToCart = () => {
    if (!product || product.stock < 1) return;
    addToCart(
      {
        productId: product._id,
        name: product.name,
        price: product.price,
        image: product.images?.[0] || "",
        stock: product.stock,
      },
      quantity
    );
    setAdded(true);
    setTimeout(() => setAdded(false), 2000);
  };

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!imgRef.current) return;
    const rect = imgRef.current.getBoundingClientRect();
    const x = ((e.clientX - rect.left) / rect.width) * 100;
    const y = ((e.clientY - rect.top) / rect.height) * 100;
    setMousePos({ x, y });
  };

  if (loading) {
    return (
      <>
        <Header />
        <div className="flex flex-col justify-center items-center h-[60vh] gap-4">
          <div className="relative w-16 h-16">
            <div className="absolute inset-0 border-4 border-[#131b2e]/10 rounded-full" />
            <div className="absolute inset-0 border-4 border-transparent border-t-[#131b2e] rounded-full animate-spin" />
          </div>
          <span className="text-sm text-[#191c1e]/50 font-medium">جاري التحميل...</span>
        </div>
      </>
    );
  }

  if (!product) {
    return (
      <>
        <Header />
        <div className="text-center py-32 text-[#191c1e]/60">
          <span className="material-symbols-outlined text-7xl mb-4 block text-[#131b2e]/20">inventory_2</span>
          <p className="text-xl font-semibold text-[#191c1e]">المنتج غير موجود</p>
          <p className="text-sm mt-2 text-[#45464d]">ربما تم حذف المنتج أو تغيير الرابط</p>
          <a href="/products" className="inline-flex items-center gap-2 mt-6 px-6 py-3 bg-[#131b2e] text-white rounded-xl text-sm font-medium hover:bg-[#3f465c] transition-colors">
            <span className="material-symbols-outlined text-[18px]">arrow_forward</span>
            العودة للمنتجات
          </a>
        </div>
        <Footer />
      </>
    );
  }

  const descSections = product.description ? parseDescription(product.description) : [];
  const discount = product.discount ||
    (product.oldPrice ? Math.round(((product.oldPrice - product.price) / product.oldPrice) * 100) : 0);
  const tamaraInstallment = Math.round(product.price / 4);
  const loyaltyPoints = product.price;

  return (
    <>
      <Header />
      <main className="min-h-screen bg-[#f7f9fb]">
        {/* Breadcrumb */}
        <div className="border-b border-[#e0e3e5]">
          <div className="max-w-[1280px] mx-auto px-4 sm:px-6 lg:px-12 py-3">
            <nav className="flex items-center gap-2 text-xs text-[#76777d]">
              <a href="/" className="hover:text-[#131b2e] transition-colors">الرئيسية</a>
              <span className="material-symbols-outlined text-[12px]">chevron_left</span>
              <a href="/products" className="hover:text-[#131b2e] transition-colors">المنتجات</a>
              <span className="material-symbols-outlined text-[12px]">chevron_left</span>
              <span className="text-[#191c1e] font-medium truncate max-w-[180px]">{product.name}</span>
            </nav>
          </div>
        </div>

        <div className="max-w-[1280px] mx-auto px-4 sm:px-6 lg:px-12 py-8 lg:py-12">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12">

            {/* Gallery Section */}
            <div className="lg:col-span-7">
              <div className="lg:sticky lg:top-8">
                {/* Main Image */}
                <div
                  ref={imgRef}
                  onMouseEnter={() => setZoomed(true)}
                  onMouseLeave={() => setZoomed(false)}
                  onMouseMove={handleMouseMove}
                  className="relative aspect-square bg-white rounded-2xl border border-[#e0e3e5] overflow-hidden cursor-crosshair group"
                >
                  {/* Badges */}
                  <div className="absolute top-4 right-4 z-10 flex flex-col gap-2">
                    {discount > 0 && (
                      <span className="bg-[#ba1a1a] text-white text-[11px] font-bold px-3 py-1.5 rounded-lg">
                        -{discount}%
                      </span>
                    )}
                    {product.isBestSeller && (
                      <span className="bg-[#775a19] text-white text-[11px] font-bold px-3 py-1.5 rounded-lg flex items-center gap-1">
                        <span className="material-symbols-outlined text-[12px]">workspace_premium</span>
                        الأكثر مبيعاً
                      </span>
                    )}
                  </div>

                  {product.images?.[activeImage] ? (
                    <img
                      src={getImageUrl(product.images[activeImage])}
                      alt={product.name}
                      className="w-full h-full object-contain p-8 transition-transform duration-300"
                      style={zoomed ? { transform: "scale(2)", transformOrigin: `${mousePos.x}% ${mousePos.y}%` } : {}}
                    />
                  ) : (
                    <div className="w-full h-full flex items-center justify-center">
                      <span className="material-symbols-outlined text-8xl text-[#e0e3e5]">image</span>
                    </div>
                  )}

                  {/* Navigation Arrows */}
                  {product.images && product.images.length > 1 && (
                    <>
                      <button
                        onClick={() => setActiveImage((prev) => (prev === 0 ? product.images.length - 1 : prev - 1))}
                        className="absolute left-3 top-1/2 -translate-y-1/2 w-10 h-10 bg-white/90 backdrop-blur-sm rounded-full shadow-md flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity hover:bg-white"
                      >
                        <span className="material-symbols-outlined text-[20px] text-[#191c1e]">chevron_left</span>
                      </button>
                      <button
                        onClick={() => setActiveImage((prev) => (prev === product.images.length - 1 ? 0 : prev + 1))}
                        className="absolute right-3 top-1/2 -translate-y-1/2 w-10 h-10 bg-white/90 backdrop-blur-sm rounded-full shadow-md flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity hover:bg-white"
                      >
                        <span className="material-symbols-outlined text-[20px] text-[#191c1e]">chevron_right</span>
                      </button>
                    </>
                  )}
                </div>

                {/* Thumbnails */}
                {product.images && product.images.length > 1 && (
                  <div className="flex gap-3 mt-4 overflow-x-auto pb-2">
                    {product.images.map((img, i) => (
                      <button
                        key={i}
                        onClick={() => setActiveImage(i)}
                        className={`w-16 h-16 sm:w-20 sm:h-20 rounded-xl overflow-hidden border-2 transition-all shrink-0 bg-white ${
                          activeImage === i
                            ? "border-[#131b2e] shadow-[0_0_0_2px_rgba(19,27,46,0.1)]"
                            : "border-[#e0e3e5] hover:border-[#76777d]"
                        }`}
                      >
                        <img src={getImageUrl(img)} alt="" className="w-full h-full object-contain p-1.5" />
                      </button>
                    ))}
                  </div>
                )}
              </div>
            </div>

            {/* Product Info */}
            <div className="lg:col-span-5">
              <div className="space-y-6">
                {/* Category & Brand */}
                <div className="flex items-center gap-2 flex-wrap">
                  <span className="text-[11px] font-bold uppercase tracking-wider text-[#775a19] bg-[#fed488]/30 px-3 py-1 rounded-md">
                    {CATEGORY_LABELS[product.category] || product.category}
                  </span>
                  {product.brand && (
                    <span className="text-[11px] font-medium text-[#45464d] bg-[#eceef0] px-3 py-1 rounded-md">
                      {product.brand}
                    </span>
                  )}
                </div>

                {/* Title */}
                <h1 className="text-2xl sm:text-3xl font-bold text-[#191c1e] leading-tight tracking-tight">
                  {product.name}
                </h1>

                {/* Short Description */}
                {product.shortDescription && (
                  <p className="text-sm text-[#45464d] leading-relaxed">{product.shortDescription}</p>
                )}

                {/* Rating */}
                {product.reviews && (
                  <div className="flex items-center gap-2">
                    <div className="flex items-center gap-0.5">
                      {[1,2,3,4,5].map((s) => (
                        <span key={s} className={`material-symbols-outlined text-[16px] ${
                          s <= Math.round(product.reviews!.rating) ? "text-[#f4b400]" : "text-[#e0e3e5]"
                        }`} style={{ fontVariationSettings: "'FILL' 1" }}>star</span>
                      ))}
                    </div>
                    <span className="text-sm text-[#45464d]">{product.reviews.rating.toFixed(1)}</span>
                    <span className="text-xs text-[#76777d]">({product.reviews.count} تقييم)</span>
                  </div>
                )}

                {/* Price Card */}
                <div className="relative bg-gradient-to-br from-[#131b2e] to-[#3f465c] rounded-2xl p-6 overflow-hidden">
                  <div className="absolute top-0 left-0 w-32 h-32 bg-[#fed488]/10 rounded-full -translate-x-1/2 -translate-y-1/2" />
                  <div className="absolute bottom-0 right-0 w-24 h-24 bg-[#fed488]/5 rounded-full translate-x-1/3 translate-y-1/3" />
                  <div className="relative">
                    {discount > 0 && (
                      <span className="inline-block text-[11px] font-bold text-[#fed488] bg-[#fed488]/15 px-2.5 py-1 rounded-md mb-2">
                        مخفض {discount}% خصم
                      </span>
                    )}
                    <div className="flex items-baseline gap-2">
                      <span className="text-4xl font-bold text-white">{product.price.toLocaleString()}</span>
                      <span className="text-lg text-white/60 font-medium">ر.س</span>
                    </div>
                    {product.oldPrice && (
                      <div className="flex items-center gap-3 mt-2">
                        <span className="text-sm text-white/40 line-through">{product.oldPrice.toLocaleString()} ر.س</span>
                        <span className="text-xs font-bold text-[#fed488] bg-[#fed488]/15 px-2.5 py-1 rounded-md">
                          وفّر {(product.oldPrice - product.price).toLocaleString()} ر.س
                        </span>
                      </div>
                    )}
                    <p className="text-[11px] text-white/30 mt-3">شامل ضريبة القيمة المضافة</p>
                  </div>
                </div>

                {/* Tamara Installments */}
                <div className="flex items-center gap-3 bg-white border border-[#e0e3e5] rounded-xl px-4 py-3">
                  <div className="w-8 h-8 bg-[#3d9970]/10 rounded-lg flex items-center justify-center shrink-0">
                    <span className="material-symbols-outlined text-[18px] text-[#3d9970]">splitscreen</span>
                  </div>
                  <p className="text-sm text-[#45464d]">
                    قسّم على{" "}
                    <span className="font-bold text-[#191c1e]">4 دفعات</span> بقيمة{" "}
                    <span className="font-bold text-[#191c1e]">{tamaraInstallment} ر.س</span>{" "}
                    بدون فوائد —{" "}
                    <span className="text-[#3d9970] font-medium">متوافق مع الشريعة</span>
                  </p>
                </div>

                {/* Loyalty Points */}
                <div className="flex items-center gap-3 bg-[#fed488]/10 border border-[#fed488]/40 rounded-xl px-4 py-3">
                  <span className="material-symbols-outlined text-[20px] text-[#775a19]" style={{ fontVariationSettings: "'FILL' 1" }}>rewarded_ads</span>
                  <p className="text-sm text-[#775a19] font-medium">
                    ستحصل على <span className="font-bold">+{loyaltyPoints}</span> نقطة ولاء مع هذا الشراء
                  </p>
                </div>

                {/* Stock */}
                <div className={`inline-flex items-center gap-2 text-sm font-medium px-4 py-2.5 rounded-xl ${
                  product.stock > 0
                    ? "text-[#005047] bg-[#62fae3]/15 border border-[#62fae3]/30"
                    : "text-[#ba1a1a] bg-[#ffdad6] border border-[#ba1a1a]/10"
                }`}>
                  <span className={`w-2 h-2 rounded-full ${product.stock > 0 ? "bg-[#005047] animate-pulse" : "bg-[#ba1a1a]"}`} />
                  {product.stock > 0 ? `متوفر في المخزون (${product.stock} قطعة)` : "غير متوفر حالياً"}
                </div>

                {/* Actions */}
                {product.stock > 0 && (
                  <div className="space-y-4 pt-2">
                    {/* Quantity */}
                    <div className="flex items-center gap-4">
                      <span className="text-sm font-medium text-[#45464d]">الكمية</span>
                      <div className="flex items-center bg-white rounded-xl border border-[#e0e3e5] overflow-hidden">
                        <button
                          onClick={() => setQuantity((q) => Math.max(1, q - 1))}
                          className="w-11 h-11 flex items-center justify-center hover:bg-[#f2f4f6] transition-colors border-l border-[#e0e3e5]"
                        >
                          <span className="material-symbols-outlined text-[18px] text-[#45464d]">remove</span>
                        </button>
                        <span className="w-12 text-center font-bold text-[#191c1e]">{quantity}</span>
                        <button
                          onClick={() => setQuantity((q) => Math.min(product.stock, q + 1))}
                          className="w-11 h-11 flex items-center justify-center hover:bg-[#f2f4f6] transition-colors border-r border-[#e0e3e5]"
                        >
                          <span className="material-symbols-outlined text-[18px] text-[#45464d]">add</span>
                        </button>
                      </div>
                    </div>

                    {/* Add to Cart */}
                    <button
                      onClick={handleAddToCart}
                      className={`w-full py-4 rounded-xl text-base font-bold flex items-center justify-center gap-2.5 transition-all duration-300 active:scale-[0.97] ${
                        added
                          ? "bg-[#005047] text-white shadow-lg shadow-[#005047]/20"
                          : "bg-[#131b2e] text-white hover:bg-[#3f465c] shadow-lg shadow-[#131b2e]/20 hover:shadow-xl hover:shadow-[#131b2e]/30"
                      }`}
                    >
                      <span className="material-symbols-outlined text-[20px]">
                        {added ? "check_circle" : "shopping_bag"}
                      </span>
                      {added ? "تمت الإضافة بنجاح!" : "أضف إلى السلة"}
                    </button>

                    {/* Secondary Actions */}
                    <div className="flex gap-3">
                      <button className="flex-1 py-3 rounded-xl border border-[#e0e3e5] text-[#45464d] text-sm font-medium hover:border-[#131b2e] hover:text-[#131b2e] hover:bg-[#f2f4f6] transition-all flex items-center justify-center gap-2">
                        <span className="material-symbols-outlined text-[18px]">favorite_border</span>
                        المفضلة
                      </button>
                      <button className="flex-1 py-3 rounded-xl border border-[#e0e3e5] text-[#45464d] text-sm font-medium hover:border-[#131b2e] hover:text-[#131b2e] hover:bg-[#f2f4f6] transition-all flex items-center justify-center gap-2">
                        <span className="material-symbols-outlined text-[18px]">share</span>
                        مشاركة
                      </button>
                    </div>
                  </div>
                )}

                {/* SKU */}
                {(product.customCode || product.sku) && (
                  <p className="text-xs text-[#76777d]">
                    كود المنتج:{" "}
                    <span className="font-mono font-semibold text-[#45464d]">{product.customCode || product.sku}</span>
                  </p>
                )}

                {/* Trust Badges */}
                <div className="border-t border-[#e0e3e5] pt-6 mt-6">
                  <div className="grid grid-cols-2 gap-3">
                    {[
                      { icon: "local_shipping", label: "توصيل سريع", sub: "2-4 أيام عمل", color: "#131b2e" },
                      { icon: "verified_user", label: "ضمان أصلي", sub: "من المصنع", color: "#005047" },
                      { icon: "autorenew", label: "إرجاع مجاني", sub: "خلال 7 أيام", color: "#775a19" },
                      { icon: "payments", label: "دفع آمن", sub: "عند الاستلام", color: "#3f465c" },
                    ].map((f) => (
                      <div key={f.icon} className="flex items-center gap-3 p-3.5 rounded-xl bg-white border border-[#e0e3e5]/60">
                        <div className="w-9 h-9 rounded-lg flex items-center justify-center" style={{ backgroundColor: `${f.color}10` }}>
                          <span className="material-symbols-outlined text-[18px]" style={{ color: f.color }}>{f.icon}</span>
                        </div>
                        <div>
                          <span className="text-xs font-semibold text-[#191c1e] block">{f.label}</span>
                          <span className="text-[10px] text-[#76777d]">{f.sub}</span>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Product Details Tabs */}
          {(descSections.length > 0 || (product.features && product.features.length > 0) || (product.specs && Object.keys(product.specs).length > 0)) && (
            <section className="mt-16">
              <div className="flex gap-1 border-b border-[#e0e3e5] overflow-x-auto">
                {descSections.length > 0 && (
                  <button
                    onClick={() => setActiveTab("description")}
                    className={`px-5 py-3.5 text-sm font-medium whitespace-nowrap transition-all relative ${
                      activeTab === "description" ? "text-[#131b2e]" : "text-[#76777d] hover:text-[#45464d]"
                    }`}
                  >
                    الوصف
                    {activeTab === "description" && <span className="absolute bottom-0 left-0 right-0 h-[2px] bg-[#131b2e] rounded-t-full" />}
                  </button>
                )}
                {product.features && product.features.length > 0 && (
                  <button
                    onClick={() => setActiveTab("features")}
                    className={`px-5 py-3.5 text-sm font-medium whitespace-nowrap transition-all relative ${
                      activeTab === "features" ? "text-[#131b2e]" : "text-[#76777d] hover:text-[#45464d]"
                    }`}
                  >
                    المميزات
                    {activeTab === "features" && <span className="absolute bottom-0 left-0 right-0 h-[2px] bg-[#131b2e] rounded-t-full" />}
                  </button>
                )}
                {product.specs && Object.keys(product.specs).length > 0 && (
                  <button
                    onClick={() => setActiveTab("specs")}
                    className={`px-5 py-3.5 text-sm font-medium whitespace-nowrap transition-all relative ${
                      activeTab === "specs" ? "text-[#131b2e]" : "text-[#76777d] hover:text-[#45464d]"
                    }`}
                  >
                    المواصفات
                    {activeTab === "specs" && <span className="absolute bottom-0 left-0 right-0 h-[2px] bg-[#131b2e] rounded-t-full" />}
                  </button>
                )}
              </div>

              <div className="bg-white rounded-b-2xl rounded-tr-2xl border border-t-0 border-[#e0e3e5] p-6 sm:p-8">
                {activeTab === "description" && (
                  <ul className="space-y-3">
                    {descSections.flatMap((s) => s.items).map((item, j) => (
                      <li key={j} className="flex items-start gap-3 text-sm text-[#45464d] leading-relaxed">
                        <span className="w-5 h-5 rounded-full bg-[#131b2e]/5 flex items-center justify-center shrink-0 mt-0.5">
                          <span className="material-symbols-outlined text-[12px] text-[#131b2e]">check</span>
                        </span>
                        {item}
                      </li>
                    ))}
                  </ul>
                )}

                {activeTab === "features" && product.features && (
                  <ul className="space-y-3">
                    {product.features.map((f, i) => (
                      <li key={i} className="flex items-start gap-3 text-sm text-[#45464d] leading-relaxed">
                        <span className="w-5 h-5 rounded-full bg-[#fed488]/20 flex items-center justify-center shrink-0 mt-0.5">
                          <span className="material-symbols-outlined text-[12px] text-[#775a19]">check</span>
                        </span>
                        {f}
                      </li>
                    ))}
                  </ul>
                )}

                {activeTab === "specs" && product.specs && (
                  <div className="space-y-6">
                    {Object.entries(product.specs).map(([groupKey, groupVal]) => (
                      <div key={groupKey}>
                        <h3 className="text-sm font-bold text-[#191c1e] mb-3">
                          {SPEC_KEYS[groupKey] || groupKey}
                        </h3>
                        <div className="rounded-xl border border-[#e0e3e5] overflow-hidden">
                          {Object.entries(groupVal).map(([k, v], idx, arr) => (
                            <div
                              key={k}
                              className={`flex items-center justify-between px-4 py-3 text-sm ${
                                idx % 2 === 0 ? "bg-[#f7f9fb]" : "bg-white"
                              } ${idx < arr.length - 1 ? "border-b border-[#e0e3e5]" : ""}`}
                            >
                              <span className="text-[#76777d]">{SPEC_KEYS[k] || k}</span>
                              <span className="font-semibold text-[#191c1e]">{v}</span>
                            </div>
                          ))}
                        </div>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            </section>
          )}
        </div>
      </main>

      {/* Mobile Sticky Bottom Bar */}
      {product.stock > 0 && (
        <div className="lg:hidden fixed bottom-0 left-0 right-0 bg-white/95 backdrop-blur-md border-t border-[#e0e3e5] px-4 py-3 z-50">
          <div className="flex items-center gap-3">
            <div className="flex-1">
              <span className="text-xl font-bold text-[#131b2e]">{product.price.toLocaleString()}</span>
              <span className="text-xs text-[#76777d] mr-1">ر.س</span>
            </div>
            <button
              onClick={handleAddToCart}
              className={`px-8 py-3.5 rounded-xl text-sm font-bold flex items-center gap-2 transition-all ${
                added
                  ? "bg-[#005047] text-white"
                  : "bg-[#131b2e] text-white active:scale-95"
              }`}
            >
              <span className="material-symbols-outlined text-[18px]">
                {added ? "check" : "shopping_bag"}
              </span>
              {added ? "تمت!" : "أضف للسلة"}
            </button>
          </div>
        </div>
      )}

      <Footer />
    </>
  );
}
