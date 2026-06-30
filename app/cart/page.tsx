"use client";
import { useCart } from "../context/CartContext";
import Header from "../components/Header";
import Footer from "../components/Footer";

const API_URL = process.env.NEXT_PUBLIC_API_URL || "http://localhost:5000";

export default function CartPage() {
  const { items, removeFromCart, updateQuantity, totalPrice, totalItems } = useCart();

  const getImageUrl = (img: string) =>
    img.startsWith("http") ? img : `${API_URL}/uploads/${img}`;



  if (items.length === 0) {
    return (
      <>
        <Header />
        <main className="min-h-[75vh] flex items-center justify-center px-4 bg-[#f7f9fb]" dir="rtl">
          <div className="text-center">
            <div className="w-28 h-28 rounded-full bg-white shadow-lg flex items-center justify-center mx-auto mb-6">
              <span className="material-symbols-outlined text-5xl text-[#131b2e]/20">shopping_cart</span>
            </div>
            <h1 className="text-2xl sm:text-3xl font-bold text-[#131b2e] mb-3">سلتك فارغة!</h1>
            <p className="text-[#888] text-sm sm:text-base mb-8 max-w-xs mx-auto leading-relaxed">
              لم تضف أي منتجات بعد. تصفح تشكيلتنا واختر ما يناسبك.
            </p>
            <a
              href="/products"
              className="inline-flex items-center gap-2 bg-[#131b2e] text-white px-8 py-3.5 rounded-full font-medium hover:bg-[#775a19] transition-all duration-300"
            >
              <span className="material-symbols-outlined text-[18px]">shopping_bag</span>
              ابدأ التسوق
            </a>
          </div>
        </main>
        <Footer />
      </>
    );
  }

  return (
    <>
      <Header />
      <main dir="rtl" className="min-h-screen bg-[#f7f9fb] pb-28 lg:pb-12">
        <div className="max-w-[1280px] mx-auto px-4 sm:px-6 lg:px-12 py-8 sm:py-12">

          {/* Title */}
          <div className="mb-8 sm:mb-10">
            <h1 className="text-2xl sm:text-3xl font-bold text-[#131b2e]">عربة التسوق</h1>
            <p className="text-[#888] text-sm mt-1">{totalItems} منتج في سلتك</p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">

            {/* Items */}
            <div className="lg:col-span-8 flex flex-col gap-4">
              {items.map((item) => (
                <div
                  key={item.productId}
                  className="bg-white rounded-2xl p-4 sm:p-5 flex gap-4 sm:gap-5 items-center"
                  style={{ boxShadow: "0 2px 16px rgba(19,27,46,0.06)" }}
                >
                  {/* Image */}
                  <div className="w-20 h-20 sm:w-24 sm:h-24 rounded-xl bg-[#f4f6f8] overflow-hidden shrink-0">
                    <img
                      src={getImageUrl(item.image)}
                      alt={item.name}
                      className="w-full h-full object-contain p-2"
                    />
                  </div>

                  {/* Info */}
                  <div className="flex-1 min-w-0">
                    <div className="flex justify-between items-start gap-2">
                      <h3 className="font-semibold text-[#131b2e] text-sm sm:text-base line-clamp-2 leading-snug">
                        {item.name}
                      </h3>
                      <button
                        onClick={() => removeFromCart(item.productId)}
                        className="shrink-0 w-8 h-8 rounded-lg bg-[#f7f9fb] hover:bg-red-50 text-[#aaa] hover:text-red-500 flex items-center justify-center transition-all"
                      >
                        <span className="material-symbols-outlined text-[18px]">close</span>
                      </button>
                    </div>

                    <div className="flex items-center justify-between mt-3 gap-3">
                      {/* Quantity */}
                      <div className="flex items-center gap-1 bg-[#f4f6f8] rounded-xl p-1">
                        <button
                          onClick={() => updateQuantity(item.productId, item.quantity - 1)}
                          className="w-7 h-7 rounded-lg bg-white flex items-center justify-center text-[#131b2e] font-bold hover:bg-[#131b2e] hover:text-white transition-all text-sm shadow-sm"
                        >
                          −
                        </button>
                        <span className="w-8 text-center text-sm font-semibold text-[#131b2e]">
                          {item.quantity}
                        </span>
                        <button
                          onClick={() => updateQuantity(item.productId, item.quantity + 1)}
                          className="w-7 h-7 rounded-lg bg-white flex items-center justify-center text-[#131b2e] font-bold hover:bg-[#131b2e] hover:text-white transition-all text-sm shadow-sm"
                        >
                          +
                        </button>
                      </div>

                      {/* Price */}
                      <div className="text-right">
                        <div className="text-[#131b2e] font-bold text-base sm:text-lg">
                          {(item.price * item.quantity).toLocaleString()}
                          <span className="text-xs font-normal text-[#888] mr-1">ر.س</span>
                        </div>
                        {item.quantity > 1 && (
                          <div className="text-[#aaa] text-xs">
                            {item.price.toLocaleString()} ر.س / وحدة
                          </div>
                        )}
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>

            {/* Summary */}
            <aside className="lg:col-span-4 sticky top-24">
              <div
                className="bg-white rounded-2xl p-6 sm:p-7"
                style={{ boxShadow: "0 4px 32px rgba(19,27,46,0.08)" }}
              >
                <h2 className="text-lg font-bold text-[#131b2e] mb-6">ملخص الطلب</h2>

                <div className="space-y-3 pb-5 border-b border-[#f0f0f0]">
                  <div className="flex justify-between text-sm text-[#666]">
                    <span>{totalPrice.toLocaleString()} ر.س</span>
                    <span>المجموع الفرعي</span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span className="text-[#0d9488] font-medium">مجاني</span>
                    <span className="text-[#666]">الشحن</span>
                  </div>
                </div>

                <div className="flex justify-between items-center py-5">
                  <span className="text-xl font-bold text-[#131b2e]">
                    {totalPrice.toLocaleString()} ر.س
                  </span>
                  <span className="text-base font-semibold text-[#131b2e]">الإجمالي</span>
                </div>

                <a
                  href="/checkout"
                  className="flex items-center justify-center gap-2 w-full bg-[#131b2e] text-white py-3.5 rounded-xl font-semibold text-base hover:bg-[#775a19] transition-all duration-300 shadow-lg shadow-[#131b2e]/20"
                >
                  إتمام الشراء
                  <span className="material-symbols-outlined text-[18px]">arrow_back</span>
                </a>

                <div className="flex items-center gap-2 mt-4 bg-[#f7f9fb] rounded-xl px-4 py-3">
                  <span className="material-symbols-outlined text-[#0d9488] text-[18px]">verified</span>
                  <span className="text-xs text-[#666]">جودة مضمونة على جميع المنتجات</span>
                </div>

                <p className="text-center text-xs text-[#bbb] mt-3">
                  بالمتابعة توافق على الشروط والأحكام
                </p>
              </div>
            </aside>
          </div>
        </div>
      </main>

      {/* Mobile fixed bottom */}
      <div className="lg:hidden fixed bottom-0 left-0 right-0 bg-white/95 backdrop-blur-md border-t border-[#eee] px-4 py-3 z-50" dir="rtl">
        <div className="flex items-center gap-3">
          <div className="flex-1">
            <p className="text-xs text-[#888]">الإجمالي</p>
            <span className="text-lg font-bold text-[#131b2e]">{totalPrice.toLocaleString()} ر.س</span>
          </div>
          <a
            href="/checkout"
            className="flex items-center gap-2 bg-[#131b2e] text-white px-6 py-3 rounded-xl font-semibold text-sm hover:bg-[#775a19] transition-all"
          >
            إتمام الشراء
            <span className="material-symbols-outlined text-[16px]">arrow_back</span>
          </a>
        </div>
      </div>

      <Footer />
    </>
  );
}
