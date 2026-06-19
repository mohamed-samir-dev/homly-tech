"use client";
import { useState, useEffect } from "react";
import { usePathname } from "next/navigation";
import Image from "next/image";
import Link from "next/link";
import { useCart } from "../context/CartContext";

export default function Header() {
  const [menuOpen, setMenuOpen] = useState(false);
  const { totalItems } = useCart();
  const pathname = usePathname();

  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth >= 768) setMenuOpen(false);
    };
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  useEffect(() => {
    document.body.style.overflow = menuOpen ? "hidden" : "";
    return () => { document.body.style.overflow = ""; };
  }, [menuOpen]);

  return (
    <header className="bg-white border-b border-[#c6c6cd] shadow-sm sticky top-0 z-50">
      <nav className="flex justify-between items-center w-full px-4 sm:px-6 lg:px-12 max-w-[1280px] mx-auto h-16">
        <Link href="/" className="flex items-center shrink-0">
          <Image src="/logo.webp" alt="سهلناها" width={72} height={72} className="rounded-lg" />
        </Link>

        <div className="hidden md:flex gap-8 items-center">
          {[
            { href: "/", label: "الرئيسية" },
            { href: "/products", label: "المنتجات" },
            { href: "/about", label: "من نحن" },
            { href: "/contact", label: "تواصل معنا" },
          ].map(({ href, label }) => (
            <Link
              key={href}
              href={href}
              className={`text-base transition-colors duration-300 ${
                pathname === href
                  ? "text-[#775a19] font-bold border-b-2 border-[#775a19] pb-1"
                  : "text-[#45464d] hover:text-[#775a19]"
              }`}
            >
              {label}
            </Link>
          ))}
        </div>

        <div className="flex items-center gap-4">
          <Link href="/cart" className="relative flex items-center justify-center w-10 h-10 hover:bg-[#f2f4f6] rounded-full transition-all">
            <span className="material-symbols-outlined text-[#191c1e]">shopping_cart</span>
            {totalItems > 0 && (
              <span className="absolute -top-1 -right-1 bg-[#775a19] text-white text-[10px] font-bold w-5 h-5 rounded-full flex items-center justify-center">
                {totalItems > 99 ? "99+" : totalItems}
              </span>
            )}
          </Link>
          <button
            className="md:hidden flex items-center justify-center w-10 h-10 hover:bg-[#f2f4f6] rounded-full transition-all"
            onClick={() => setMenuOpen(!menuOpen)}
            aria-label={menuOpen ? "إغلاق القائمة" : "فتح القائمة"}
          >
            <span className="material-symbols-outlined text-[#191c1e]">{menuOpen ? "close" : "menu"}</span>
          </button>
        </div>
      </nav>

      <div
        className={`md:hidden overflow-hidden transition-all duration-300 ease-in-out ${
          menuOpen ? "max-h-[400px] opacity-100" : "max-h-0 opacity-0"
        }`}
      >
        <div className="bg-white border-t border-[#c6c6cd] px-4 py-4 flex flex-col gap-4">
          {[
            { href: "/", label: "الرئيسية" },
            { href: "/products", label: "المنتجات" },
            { href: "/about", label: "من نحن" },
            { href: "/contact", label: "تواصل معنا" },
          ].map(({ href, label }) => (
            <Link
              key={href}
              href={href}
              onClick={() => setMenuOpen(false)}
              className={`text-base ${pathname === href ? "text-[#775a19] font-bold" : "text-[#45464d]"}`}
            >
              {label}
            </Link>
          ))}
        </div>
      </div>
    </header>
  );
}
