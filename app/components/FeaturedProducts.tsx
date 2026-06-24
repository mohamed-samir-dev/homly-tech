"use client";
import { useEffect, useState } from "react";
import { useCart } from "../context/CartContext";

interface Product {
  _id: string;
  name: string;
  slug: string;
  price: number;
  oldPrice?: number;
  stock: number;
  images: string[];
}

const API_URL = process.env.NEXT_PUBLIC_API_URL || "http://localhost:5000";

export default function FeaturedProducts() {
  const [products, setProducts] = useState<Product[]>([]);
  const [addedId, setAddedId] = useState<string | null>(null);
  const { addToCart } = useCart();

  useEffect(() => {
    fetch(`${API_URL}/api/products?sort=newest&limit=4`)
      .then((res) => res.json())
      .then((data) => setProducts(data.data || []))
      .catch(() => {});
  }, []);

  const handleAdd = (e: React.MouseEvent, product: Product) => {
    e.preventDefault();
    e.stopPropagation();
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

  return (
    <section dir="rtl" className="py-16 sm:py-20 md:py-28 bg-[#f7f9fb] relative overflow-hidden">
      {/* Decorative background elements */}
      <div className="absolute top-0 left-0 w-72 h-72 bg-[#131b2e]/[0.02] rounded-full -translate-x-1/2 -translate-y-1/2" />
      <div className="absolute bottom-0 right-0 w-96 h-96 bg-[#775a19]/[0.03] rounded-full translate-x-1/3 translate-y-1/3" />

      <div className="max-w-[1280px] mx-auto px-4 sm:px-6 lg:px-12 relative">
        {/* Section Header */}
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-end gap-4 mb-12 sm:mb-16">
          <div>
            <span className="inline-block text-[#775a19] text-xs font-medium tracking-[0.05em] uppercase mb-2 bg-[#fed488]/30 px-3 py-1 rounded-full">
              مجموعة مميزة
            </span>
            <h2 className="text-2xl sm:text-3xl md:text-[36px] md:leading-[44px] font-semibold text-[#131b2e] tracking-tight">
              منتجاتنا المختارة
            </h2>
            <div className="w-12 h-1 bg-gradient-to-l from-[#fed488] to-[#775a19] rounded-full mt-3" />
          </div>
          <a
            className="group/link flex items-center gap-2 text-[#131b2e] text-sm font-medium border border-[#131b2e]/10 px-5 py-2.5 rounded-full hover:bg-[#131b2e] hover:text-white transition-all duration-300"
            href="/products"
          >
            عرض الكل
            <span className="material-symbols-outlined text-sm group-hover/link:-translate-x-1 transition-transform">arrow_back</span>
          </a>
        </div>

        {/* Products Grid */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-5 md:gap-7">
          {products.map((product) => (
            <a
              href={`/products/${product.slug}`}
              key={product._id}
              className="group relative bg-white rounded-2xl overflow-hidden flex flex-col transition-all duration-500 hover:-translate-y-2"
              style={{ boxShadow: "0 4px 24px rgba(19,27,46,0.04)" }}
              onMouseEnter={(e) => {
                (e.currentTarget as HTMLElement).style.boxShadow = "0 20px 48px rgba(19,27,46,0.10)";
              }}
              onMouseLeave={(e) => {
                (e.currentTarget as HTMLElement).style.boxShadow = "0 4px 24px rgba(19,27,46,0.04)";
              }}
            >
              {/* Image Container */}
              <div className="relative h-48 sm:h-56 md:h-60 bg-gradient-to-b from-[#f2f4f6] to-white overflow-hidden">
                {product.images?.[0] ? (
                  <img
                    className="w-full h-full object-contain p-6 sm:p-8 group-hover:scale-110 transition-transform duration-700 ease-out"
                    alt={product.name}
                    src={product.images[0].startsWith("http") ? product.images[0] : `${API_URL}/uploads/${product.images[0]}`}
                  />
                ) : (
                  <div className="flex items-center justify-center h-full">
                    <span className="material-symbols-outlined text-5xl text-[#131b2e]/10">image</span>
                  </div>
                )}
                {product.oldPrice && (
                  <span className="absolute top-4 right-4 bg-gradient-to-l from-[#775a19] to-[#9e7a2e] text-white text-[11px] px-3 py-1.5 rounded-full font-bold shadow-lg shadow-[#775a19]/20">
                    -{Math.round(((product.oldPrice - product.price) / product.oldPrice) * 100)}%
                  </span>
                )}
                {/* Quick add overlay */}
                <div className="absolute inset-x-0 bottom-0 h-20 bg-gradient-to-t from-white/80 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
              </div>

              {/* Content */}
              <div className="p-5 sm:p-6 flex flex-col flex-1">
                <h3 className="text-[#191c1e] font-medium text-sm sm:text-[15px] mb-4 line-clamp-2 leading-relaxed">
                  {product.name}
                </h3>
                <div className="mt-auto flex items-end justify-between gap-2">
                  <div className="flex flex-col gap-1">
                    <span className="text-[#131b2e] font-bold text-lg sm:text-xl">
                      {product.price.toLocaleString()} <span className="text-xs font-medium text-[#45464d]">ر.س</span>
                    </span>
                    {product.oldPrice && (
                      <span className="text-[#76777d] text-xs line-through">
                        {product.oldPrice.toLocaleString()} ر.س
                      </span>
                    )}
                  </div>
                  <button
                    onClick={(e) => handleAdd(e, product)}
                    className="w-10 h-10 sm:w-11 sm:h-11 rounded-xl bg-[#131b2e] text-white flex items-center justify-center hover:bg-[#775a19] transition-all duration-300 shrink-0 shadow-lg shadow-[#131b2e]/20 hover:shadow-[#775a19]/30 hover:scale-105 active:scale-95"
                  >
                    <span className="material-symbols-outlined text-[18px]">
                      {addedId === product._id ? "check" : "shopping_bag"}
                    </span>
                  </button>
                </div>
              </div>
            </a>
          ))}
        </div>
      </div>
    </section>
  );
}
