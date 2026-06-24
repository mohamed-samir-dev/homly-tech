"use client";
import { useCart } from "../context/CartContext";
import Header from "../components/Header";
import Footer from "../components/Footer";

const API_URL = process.env.NEXT_PUBLIC_API_URL || "http://localhost:5000";

export default function CartPage() {
  const { items, removeFromCart, updateQuantity, totalPrice, totalItems } = useCart();

  const getImageUrl = (img: string) =>
    img.startsWith("http") ? img : `${API_URL}/uploads/${img}`;

  const vat = Math.round(totalPrice * 0.15);
  const grandTotal = Math.round(totalPrice * 1.15);

  if (items.length === 0) {
    return (
      <>
        <Header />
        <main className="min-h-[75vh] flex items-center justify-center px-4 bg-surface">
          <div className="text-center">
            <div className="w-32 h-32 rounded-full bg-surface-container flex items-center justify-center mx-auto mb-6">
              <span className="material-symbols-outlined text-6xl text-outline">remove_shopping_cart</span>
            </div>
            <h1 className="text-[22px] leading-[28px] sm:text-[30px] sm:leading-[38px] font-semibold text-on-surface mb-3">سلتك فارغة!</h1>
            <p className="text-on-surface-variant text-[14px] leading-[20px] sm:text-[16px] sm:leading-[24px] mb-8 max-w-sm mx-auto">يبدو أنك لم تضف أي منتجات بعد. تصفح منتجاتنا واختر ما يناسبك.</p>
            <a href="/products" className="inline-flex items-center gap-2 bg-primary text-on-primary px-6 py-3.5 sm:px-8 sm:py-4 rounded-lg font-medium text-[16px] leading-[24px] sm:text-[20px] sm:leading-[28px] hover:opacity-90 transition-all">
              <span className="material-symbols-outlined">shopping_bag</span>
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
      <main className="min-h-screen bg-surface pb-24 lg:pb-8">
        <div className="max-w-[1280px] mx-auto px-4 sm:px-6 lg:px-12 py-8 sm:py-12">
          {/* Page Title */}
          <div className="flex flex-col gap-3 mb-8 sm:mb-12">
            <h1 className="text-[24px] leading-[32px] sm:text-[30px] sm:leading-[38px] lg:text-[36px] lg:leading-[44px] font-semibold tracking-[-0.01em] text-primary">عربة التسوق</h1>
            <p className="text-[13px] leading-[18px] sm:text-[16px] sm:leading-[24px] text-on-surface-variant">لديك {totalItems} منتج في سلتك</p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
            {/* Items Section */}
            <div className="lg:col-span-8 flex flex-col gap-6">
              {items.map((item) => (
                <div key={item.productId} className="bg-surface-container-lowest p-4 sm:p-6 rounded-xl shadow-[0_12px_24px_-4px_rgba(25,28,30,0.04)] border border-outline-variant/30">
                  {/* Mobile Layout */}
                  <div className="sm:hidden">
                    <div className="flex gap-4">
                      <div className="w-24 h-24 rounded-lg overflow-hidden bg-surface-container shrink-0">
                        <img src={getImageUrl(item.image)} alt={item.name} className="w-full h-full object-cover" />
                      </div>
                      <div className="flex-1 min-w-0">
                        <div className="flex justify-between items-start gap-2">
                          <h3 className="text-[16px] leading-[24px] font-medium text-primary line-clamp-2">{item.name}</h3>
                          <button onClick={() => removeFromCart(item.productId)} className="text-on-surface-variant hover:text-error transition-colors shrink-0">
                            <span className="material-symbols-outlined text-[20px]">delete</span>
                          </button>
                        </div>
                        <p className="text-[12px] leading-[16px] tracking-[0.05em] font-medium text-on-surface-variant mt-1">{item.price.toLocaleString()} ر.س / وحدة</p>
                      </div>
                    </div>
                    <div className="flex items-center justify-between mt-4 pt-4 border-t border-outline-variant/30">
                      <div className="flex items-center border border-outline-variant rounded-lg overflow-hidden">
                        <button onClick={() => updateQuantity(item.productId, item.quantity - 1)} className="px-3 py-1.5 hover:bg-surface-container transition-colors text-sm">-</button>
                        <span className="px-4 py-1.5 text-[16px] leading-[24px] border-x border-outline-variant">{item.quantity}</span>
                        <button onClick={() => updateQuantity(item.productId, item.quantity + 1)} className="px-3 py-1.5 hover:bg-surface-container transition-colors text-sm">+</button>
                      </div>
                      <span className="text-[18px] leading-[24px] font-semibold text-primary">{(item.price * item.quantity).toLocaleString()} ر.س</span>
                    </div>
                  </div>

                  {/* Desktop Layout */}
                  <div className="hidden sm:flex flex-row items-center gap-6">
                    <div className="w-32 h-32 rounded-lg overflow-hidden bg-surface-container shrink-0">
                      <img src={getImageUrl(item.image)} alt={item.name} className="w-full h-full object-cover" />
                    </div>
                    <div className="flex-grow flex flex-col gap-2">
                      <div className="flex justify-between items-start">
                        <h3 className="text-[20px] leading-[28px] font-medium text-primary">{item.name}</h3>
                        <button onClick={() => removeFromCart(item.productId)} className="text-on-surface-variant hover:text-error transition-colors">
                          <span className="material-symbols-outlined">delete</span>
                        </button>
                      </div>
                      <p className="text-[12px] leading-[16px] tracking-[0.05em] font-medium text-on-surface-variant">{item.price.toLocaleString()} ر.س / وحدة</p>
                      <div className="flex items-center gap-4 mt-2">
                        <div className="flex items-center border border-outline-variant rounded-lg overflow-hidden">
                          <button onClick={() => updateQuantity(item.productId, item.quantity - 1)} className="px-3 py-1 hover:bg-surface-container transition-colors">-</button>
                          <span className="px-4 py-1 text-[16px] leading-[24px] border-x border-outline-variant">{item.quantity}</span>
                          <button onClick={() => updateQuantity(item.productId, item.quantity + 1)} className="px-3 py-1 hover:bg-surface-container transition-colors">+</button>
                        </div>
                        <div className="text-right flex-grow">
                          <span className="text-[24px] leading-[32px] font-semibold text-primary">{(item.price * item.quantity).toLocaleString()} ر.س</span>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>

            {/* Summary Section */}
            <aside className="lg:col-span-4 sticky top-28">
              <div className="bg-surface-container-lowest p-6 sm:p-8 rounded-xl shadow-[0_24px_48px_-12px_rgba(25,28,30,0.08)] border border-outline-variant/30 flex flex-col gap-6">
                <h2 className="text-[20px] leading-[28px] sm:text-[24px] sm:leading-[32px] font-semibold text-primary">ملخص الطلب</h2>

                <div className="flex flex-col gap-4 border-b border-outline-variant pb-6">
                  <div className="flex justify-between items-center text-[13px] leading-[18px] sm:text-[16px] sm:leading-[24px]">
                    <span className="text-on-surface-variant">المجموع الفرعي</span>
                    <span className="text-on-surface font-medium">{totalPrice.toLocaleString()} ر.س</span>
                  </div>
                  <div className="flex justify-between items-center text-[13px] leading-[18px] sm:text-[16px] sm:leading-[24px]">
                    <span className="text-on-surface-variant">ضريبة القيمة المضافة (15%)</span>
                    <span className="text-on-surface font-medium">{vat.toLocaleString()} ر.س</span>
                  </div>
                  <div className="flex justify-between items-center text-[13px] leading-[18px] sm:text-[16px] sm:leading-[24px]">
                    <span className="text-on-surface-variant">التوصيل</span>
                    <span className="text-on-tertiary-container font-medium">مجاني</span>
                  </div>
                </div>

                <div className="flex justify-between items-center">
                  <span className="text-[18px] leading-[24px] sm:text-[24px] sm:leading-[32px] font-semibold text-primary">الإجمالي</span>
                  <span className="text-[18px] leading-[24px] sm:text-[24px] sm:leading-[32px] font-semibold text-primary">{grandTotal.toLocaleString()} ر.س</span>
                </div>

                <div className="flex flex-col gap-3 mt-4">
                  <a href="/checkout" className="w-full bg-primary text-on-primary py-4 rounded-lg font-medium text-[16px] leading-[24px] sm:text-[20px] sm:leading-[28px] hover:opacity-90 transition-all flex items-center justify-center gap-2">
                    <span>إتمام عملية الشراء</span>
                    <span className="material-symbols-outlined">arrow_back</span>
                  </a>
                  <p className="text-center text-[12px] leading-[16px] tracking-[0.05em] font-medium text-on-surface-variant px-4">
                    بالنقر على إتمام الشراء، فإنك توافق على الشروط والأحكام الخاصة بنا.
                  </p>
                </div>

                <div className="flex items-center gap-3 bg-surface-container-low p-4 rounded-lg border border-outline-variant/30">
                  <span className="material-symbols-outlined text-secondary" style={{ fontVariationSettings: "'FILL' 1" }}>verified</span>
                  <p className="text-[14px] leading-[20px] text-secondary">ضمان الجودة على جميع المفروشات</p>
                </div>
              </div>
            </aside>
          </div>
        </div>
      </main>

      {/* Mobile Fixed Bottom */}
      <div className="lg:hidden fixed bottom-0 left-0 right-0 bg-surface-container-lowest/95 backdrop-blur-md border-t border-outline-variant px-4 py-3 z-50">
        <div className="flex items-center gap-3">
          <div className="flex-1">
            <p className="text-[12px] leading-[16px] tracking-[0.05em] font-medium text-on-surface-variant">الإجمالي شامل الضريبة</p>
            <span className="text-[20px] leading-[28px] font-semibold text-primary">{grandTotal.toLocaleString()} ر.س</span>
          </div>
          <a href="/checkout" className="bg-primary text-on-primary px-6 py-3.5 rounded-lg font-medium text-[14px] hover:opacity-90 transition-all flex items-center gap-2">
            <span className="material-symbols-outlined text-[18px]">arrow_back</span>
            إتمام الشراء
          </a>
        </div>
      </div>

      <Footer />
    </>
  );
}
