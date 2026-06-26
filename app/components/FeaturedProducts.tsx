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
  category: string;
}

interface CategoryGroup {
  slug: string;
  name: string;
  products: Product[];
}

const CATEGORY_NAMES: Record<string, string> = {
  living_room: "غرفة المعيشة",
  bedroom: "غرفة النوم",
  dining: "غرفة الطعام",
  office: "المكتب",
  outdoor: "الخارجي",
  decor: "الديكور والإكسسوارات",
  packages: "الباقات",
  furniture: "الأثاث",
  pillows_bedding: "المخدات والفراش",
  air_conditioners: "مكيفات",
  cameras: "كاميرات",
  home_devices: "أجهزة منزلية",
  tvs: "تلفزيونات",
};

const API_URL = process.env.NEXT_PUBLIC_API_URL || "http://localhost:5000";

function ProductCard({
  product,
  addedId,
  onAdd,
}: {
  product: Product;
  addedId: string | null;
  onAdd: (e: React.MouseEvent, product: Product) => void;
}) {
  const imgSrc = product.images?.[0]
    ? product.images[0].startsWith("http")
      ? product.images[0]
      : `${API_URL}/uploads/${product.images[0]}`
    : null;

  return (
    <a
      href={`/products/${product.slug}`}
      className="group bg-white rounded-2xl overflow-hidden flex flex-col transition-all duration-300 hover:-translate-y-1 hover:shadow-xl"
      style={{ boxShadow: "0 2px 16px rgba(19,27,46,0.06)" }}
    >
      <div className="relative h-44 sm:h-52 bg-[#f4f6f8] overflow-hidden">
        {imgSrc ? (
          <img
            className="w-full h-full object-contain p-5 group-hover:scale-105 transition-transform duration-500"
            alt={product.name}
            src={imgSrc}
          />
        ) : (
          <div className="flex items-center justify-center h-full">
            <span className="material-symbols-outlined text-5xl text-[#131b2e]/10">image</span>
          </div>
        )}
        {product.oldPrice && (
          <span className="absolute top-3 right-3 bg-[#c0392b] text-white text-[10px] px-2.5 py-1 rounded-full font-bold">
            -{Math.round(((product.oldPrice - product.price) / product.oldPrice) * 100)}%
          </span>
        )}
      </div>
      <div className="p-4 flex flex-col flex-1">
        <h3 className="text-[#191c1e] font-medium text-sm line-clamp-2 leading-snug mb-3 flex-1">
          {product.name}
        </h3>
        <div className="flex items-center justify-between gap-2 mt-auto">
          <div>
            <span className="text-[#131b2e] font-bold text-base">
              {product.price.toLocaleString()}
              <span className="text-xs font-normal text-[#888] mr-1">ر.س</span>
            </span>
            {product.oldPrice && (
              <div className="text-[#aaa] text-xs line-through leading-none">
                {product.oldPrice.toLocaleString()} ر.س
              </div>
            )}
          </div>
          <button
            onClick={(e) => onAdd(e, product)}
            className="w-9 h-9 rounded-xl bg-[#131b2e] text-white flex items-center justify-center hover:bg-[#775a19] transition-all duration-200 shrink-0 hover:scale-110 active:scale-95"
          >
            <span className="material-symbols-outlined text-[16px]">
              {addedId === product._id ? "check" : "shopping_bag"}
            </span>
          </button>
        </div>
      </div>
    </a>
  );
}

function SectionBlock({
  badge,
  title,
  href,
  linkLabel,
  products,
  addedId,
  onAdd,
}: {
  badge: string;
  title: string;
  href: string;
  linkLabel: string;
  products: Product[];
  addedId: string | null;
  onAdd: (e: React.MouseEvent, product: Product) => void;
}) {
  return (
    <div>
      <div className="flex items-end justify-between gap-4 mb-8">
        <div>
          <span className="inline-block text-[#775a19] text-[11px] font-semibold tracking-widest uppercase mb-2 bg-[#fed488]/25 px-3 py-1 rounded-full">
            {badge}
          </span>
          <h2 className="text-xl sm:text-2xl md:text-3xl font-bold text-[#131b2e] leading-tight">
            {title}
          </h2>
        </div>
        <a
          href={href}
          className="flex items-center gap-1.5 text-sm text-[#775a19] font-medium border border-[#775a19]/20 px-4 py-2 rounded-full hover:bg-[#775a19] hover:text-white transition-all duration-200 whitespace-nowrap shrink-0"
        >
          {linkLabel}
          <span className="material-symbols-outlined text-sm">arrow_back</span>
        </a>
      </div>
      <div className="grid grid-cols-2 sm:grid-cols-3 gap-3 sm:gap-4 md:gap-5">
        {products.map((product) => (
          <ProductCard key={product._id} product={product} addedId={addedId} onAdd={onAdd} />
        ))}
      </div>
    </div>
  );
}

export default function FeaturedProducts() {
  const [featured, setFeatured] = useState<Product[]>([]);
  const [categoryGroups, setCategoryGroups] = useState<CategoryGroup[]>([]);
  const [addedId, setAddedId] = useState<string | null>(null);
  const { addToCart } = useCart();

  useEffect(() => {
    fetch(`${API_URL}/api/products?limit=500`)
      .then((res) => res.json())
      .then((data) => {
        const products: Product[] = data.data || [];

        // المنتجات المميزة = اللي سعرها 1000 جنيه بالظبط
        setFeatured(products.filter((p) => p.price === 1000).slice(0, 6));

        // ترتيب من أعلى سعر لأقل
        products.sort((a, b) => b.price - a.price);

        // تجميع باقي المنتجات حسب التصنيف (6 لكل تصنيف)
        const groupsMap: Record<string, Product[]> = {};
        products.forEach((p) => {
          if (!groupsMap[p.category]) groupsMap[p.category] = [];
          if (groupsMap[p.category].length < 6) groupsMap[p.category].push(p);
        });

        // ترتيب التصنيفات من أعلى متوسط سعر لأقل
        const groups: CategoryGroup[] = Object.entries(groupsMap)
          .map(([slug, prods]) => ({
            slug,
            name: CATEGORY_NAMES[slug] || slug,
            products: prods,
            avgPrice: prods.reduce((sum, p) => sum + p.price, 0) / prods.length,
          }))
          .sort((a, b) => b.avgPrice - a.avgPrice)
          .map(({ slug, name, products }) => ({ slug, name, products }));

        setCategoryGroups(groups);
      })
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
    <section dir="rtl" className="bg-[#f7f9fb] py-16 sm:py-20 md:py-24">
      <div className="max-w-[1280px] mx-auto px-4 sm:px-6 lg:px-12 flex flex-col gap-20 sm:gap-24">

        {featured.length > 0 && (
          <SectionBlock
            badge="الأعلى قيمة"
            title="منتجاتنا المميزة"
            href="/products"
            linkLabel="عرض الكل"
            products={featured}
            addedId={addedId}
            onAdd={handleAdd}
          />
        )}

        {categoryGroups.map((group) => (
          <SectionBlock
            key={group.slug}
            badge="تصنيف"
            title={group.name}
            href={`/products?category=${group.slug}`}
            linkLabel="عرض الكل"
            products={group.products}
            addedId={addedId}
            onAdd={handleAdd}
          />
        ))}

      </div>
    </section>
  );
}
