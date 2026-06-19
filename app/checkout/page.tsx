"use client";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { useCart } from "../context/CartContext";
import Header from "../components/Header";
import Footer from "../components/Footer";

const API_URL = process.env.NEXT_PUBLIC_API_URL || "http://localhost:5000";

export default function CheckoutPage() {
  const { items, totalPrice, clearCart } = useCart();
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [form, setForm] = useState({ customerName: "", phone: "", address: "", city: "الرياض", notes: "" });
  const [fieldErrors, setFieldErrors] = useState<Record<string, string>>({});

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    if (name === "phone" && value.length > 10) return;
    if (name === "customerName" && /\d/.test(value)) return;
    setForm({ ...form, [name]: value });
    setFieldErrors((prev) => ({ ...prev, [name]: "" }));
  };

  const validate = () => {
    const errors: Record<string, string> = {};
    if (!form.customerName.trim() || form.customerName.trim().length < 3) {
      errors.customerName = "الاسم يجب أن يكون 3 أحرف على الأقل";
    }
    if (!/^(05|5)\d{8}$/.test(form.phone)) {
      errors.phone = "رقم الهاتف يجب أن يبدأ بـ 05 ويتكون من 10 أرقام";
    }
    if (!form.address.trim() || form.address.trim().length < 10) {
      errors.address = "العنوان يجب أن يكون 10 أحرف على الأقل";
    }
    setFieldErrors(errors);
    return Object.keys(errors).length === 0;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    if (!validate()) return;
    if (items.length === 0) { setError("السلة فارغة"); return; }

    setLoading(true);
    try {
      const res = await fetch(`${API_URL}/api/orders`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          customerName: form.customerName,
          phone: form.phone,
          address: `${form.city} - ${form.address}`,
          notes: form.notes,
          items: items.map((i) => ({ productId: i.productId, quantity: i.quantity })),
        }),
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.message || "حدث خطأ");
      clearCart();
      router.push(`/order-success?id=${data.data._id}`);
    } catch (err: unknown) {
      setError(err instanceof Error ? err.message : "حدث خطأ غير متوقع");
    } finally {
      setLoading(false);
    }
  };

  const getImageUrl = (img: string) =>
    img.startsWith("http") ? img : `${API_URL}/uploads/${img}`;

  const vat = Math.round(totalPrice * 0.15);
  const grandTotal = Math.round(totalPrice * 1.15);

  if (items.length === 0) {
    return (
      <>
        <Header />
        <main className="min-h-[70vh] flex items-center justify-center px-4 bg-surface">
          <div className="text-center">
            <div className="w-28 h-28 rounded-full bg-surface-container flex items-center justify-center mx-auto mb-5">
              <span className="material-symbols-outlined text-5xl text-outline">remove_shopping_cart</span>
            </div>
            <h1 className="text-[20px] leading-[28px] sm:text-[24px] sm:leading-[32px] font-semibold text-primary mb-2">السلة فارغة</h1>
            <p className="text-on-surface-variant text-[13px] leading-[18px] sm:text-[14px] sm:leading-[20px] mb-6">أضف منتجات للسلة أولاً</p>
            <a href="/products" className="inline-flex items-center gap-2 bg-primary text-on-primary px-6 py-3.5 rounded-lg font-medium hover:opacity-90 transition-all">
              <span className="material-symbols-outlined text-[20px]">shopping_bag</span>
              تصفح المنتجات
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
          {error && (
            <div className="bg-error-container border border-error/20 text-on-error-container text-[14px] leading-[20px] p-4 rounded-lg mb-6 flex items-center gap-2">
              <span className="material-symbols-outlined text-[18px]">error</span>
              {error}
            </div>
          )}

          <div className="flex flex-col lg:flex-row-reverse gap-6 items-start">
            {/* Order Summary (Left on Desktop) */}
            <aside className="w-full lg:w-1/3 flex flex-col gap-6">
              <section className="bg-surface-container-lowest rounded-xl p-6 shadow-[0_12px_24px_rgba(25,28,30,0.04)] border border-outline-variant/30">
                <h2 className="text-[20px] leading-[28px] sm:text-[24px] sm:leading-[32px] font-semibold text-primary mb-6">ملخص الطلب</h2>

                <div className="space-y-3 mb-6">
                  {items.map((item) => (
                    <div key={item.productId} className="flex flex-row-reverse items-center gap-3">
                      <div className="w-16 h-16 bg-surface-container-high rounded-lg overflow-hidden shrink-0">
                        <img src={getImageUrl(item.image)} alt={item.name} className="w-full h-full object-cover" />
                      </div>
                      <div className="flex-grow text-right">
                        <p className="text-[14px] leading-[20px] sm:text-[20px] sm:leading-[28px] font-medium text-on-surface line-clamp-1">{item.name}</p>
                        <p className="text-[12px] leading-[16px] sm:text-[14px] sm:leading-[20px] text-outline">عدد: {item.quantity}</p>
                      </div>
                      <p className="text-[14px] leading-[20px] sm:text-[20px] sm:leading-[28px] font-medium text-primary shrink-0">{(item.price * item.quantity).toLocaleString()} ر.س</p>
                    </div>
                  ))}
                </div>

                <div className="border-t border-outline-variant pt-3 space-y-2">
                  <div className="flex justify-between items-center flex-row-reverse">
                    <span className="text-[13px] leading-[18px] sm:text-[16px] sm:leading-[24px] text-outline">المجموع الفرعي</span>
                    <span className="text-[13px] leading-[18px] sm:text-[16px] sm:leading-[24px] text-on-surface">{totalPrice.toLocaleString()} ر.س</span>
                  </div>
                  <div className="flex justify-between items-center flex-row-reverse">
                    <span className="text-[13px] leading-[18px] sm:text-[16px] sm:leading-[24px] text-outline">الضريبة (15%)</span>
                    <span className="text-[13px] leading-[18px] sm:text-[16px] sm:leading-[24px] text-on-surface">{vat.toLocaleString()} ر.س</span>
                  </div>
                  <div className="flex justify-between items-center flex-row-reverse">
                    <span className="text-[13px] leading-[18px] sm:text-[16px] sm:leading-[24px] text-outline">الشحن</span>
                    <span className="text-[13px] leading-[18px] sm:text-[16px] sm:leading-[24px] text-secondary font-medium">مجاني</span>
                  </div>
                  <div className="flex justify-between items-center flex-row-reverse pt-2 border-t border-outline-variant">
                    <span className="text-[18px] leading-[24px] sm:text-[24px] sm:leading-[32px] font-semibold text-primary">الإجمالي</span>
                    <span className="text-[18px] leading-[24px] sm:text-[24px] sm:leading-[32px] font-semibold text-primary">{grandTotal.toLocaleString()} ر.س</span>
                  </div>
                </div>
              </section>

              <div className="bg-primary-container p-3 rounded-lg flex items-center justify-center gap-2">
                <span className="material-symbols-outlined text-secondary-fixed-dim">verified_user</span>
                <span className="text-on-primary-fixed-variant text-[12px] leading-[16px] tracking-[0.05em] font-medium">دفع آمن ومضمون 100%</span>
              </div>
            </aside>

            {/* Checkout Form (Right on Desktop) */}
            <form onSubmit={handleSubmit} className="w-full lg:w-2/3 flex flex-col gap-8">
              {/* Shipping Address */}
              <section>
                <div className="flex items-center gap-4 mb-6">
                  <span className="w-8 h-8 rounded-full bg-primary text-on-primary flex items-center justify-center font-bold text-sm">1</span>
                  <h2 className="text-[20px] leading-[28px] sm:text-[24px] sm:leading-[32px] lg:text-[30px] lg:leading-[38px] font-semibold text-primary">عنوان الشحن</h2>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="space-y-2">
                    <label className="block text-[12px] leading-[16px] tracking-[0.05em] font-medium text-on-surface-variant text-right">الاسم الكامل</label>
                    <input
                      name="customerName"
                      value={form.customerName}
                      onChange={handleChange}
                      required
                      className={`w-full p-4 rounded-lg border focus:border-primary focus:ring-1 focus:ring-primary outline-none transition-all text-right bg-surface-container-lowest ${fieldErrors.customerName ? "border-error" : "border-outline-variant"}`}
                      placeholder="أدخل اسمك بالكامل"
                      type="text"
                    />
                    {fieldErrors.customerName && <p className="text-error text-[12px] mt-1">{fieldErrors.customerName}</p>}
                  </div>
                  <div className="space-y-2">
                    <label className="block text-[12px] leading-[16px] tracking-[0.05em] font-medium text-on-surface-variant text-right">رقم الجوال</label>
                    <input
                      name="phone"
                      value={form.phone}
                      onChange={handleChange}
                      required
                      type="tel"
                      dir="ltr"
                      maxLength={10}
                      className={`w-full p-4 rounded-lg border focus:border-primary focus:ring-1 focus:ring-primary outline-none transition-all text-right bg-surface-container-lowest ${fieldErrors.phone ? "border-error" : "border-outline-variant"}`}
                      placeholder="05xxxxxxxx"
                    />
                    {fieldErrors.phone && <p className="text-error text-[12px] mt-1">{fieldErrors.phone}</p>}
                  </div>
                  <div className="space-y-2">
                    <label className="block text-[12px] leading-[16px] tracking-[0.05em] font-medium text-on-surface-variant text-right">المدينة</label>
                    <select
                      name="city"
                      value={form.city}
                      onChange={handleChange}
                      className="w-full p-4 rounded-lg border border-outline-variant focus:border-primary focus:ring-1 focus:ring-primary outline-none transition-all text-right bg-surface-container-lowest appearance-none"
                    >
                      <option>الرياض</option>
                      <option>جدة</option>
                      <option>الدمام</option>
                      <option>مكة المكرمة</option>
                    </select>
                  </div>
                  <div className="space-y-2 md:col-span-2">
                    <label className="block text-[12px] leading-[16px] tracking-[0.05em] font-medium text-on-surface-variant text-right">العنوان بالتفصيل</label>
                    <input
                      name="address"
                      value={form.address}
                      onChange={handleChange}
                      required
                      className={`w-full p-4 rounded-lg border focus:border-primary focus:ring-1 focus:ring-primary outline-none transition-all text-right bg-surface-container-lowest ${fieldErrors.address ? "border-error" : "border-outline-variant"}`}
                      placeholder="اسم الحي، الشارع، رقم المبنى"
                      type="text"
                    />
                    {fieldErrors.address && <p className="text-error text-[12px] mt-1">{fieldErrors.address}</p>}
                  </div>
                  <div className="space-y-2 md:col-span-2">
                    <label className="block text-[12px] leading-[16px] tracking-[0.05em] font-medium text-on-surface-variant text-right">ملاحظات <span className="text-outline">(اختياري)</span></label>
                    <textarea
                      name="notes"
                      value={form.notes}
                      onChange={handleChange}
                      rows={3}
                      className="w-full p-4 rounded-lg border border-outline-variant focus:border-primary focus:ring-1 focus:ring-primary outline-none transition-all text-right bg-surface-container-lowest resize-none"
                      placeholder="ملاحظات إضافية للتوصيل..."
                    />
                  </div>
                </div>
              </section>

              {/* Payment Method */}
              <section>
                <div className="flex items-center gap-4 mb-6">
                  <span className="w-8 h-8 rounded-full bg-primary text-on-primary flex items-center justify-center font-bold text-sm">2</span>
                  <h2 className="text-[20px] leading-[28px] sm:text-[24px] sm:leading-[32px] lg:text-[30px] lg:leading-[38px] font-semibold text-primary">طريقة الدفع</h2>
                </div>

                <div className="p-6 rounded-xl border-2 border-secondary bg-secondary-container/10 flex items-center justify-between flex-row-reverse">
                  <div className="flex items-center gap-4 flex-row-reverse">
                    <div className="w-12 h-12 rounded-full bg-secondary-container flex items-center justify-center">
                      <span className="material-symbols-outlined text-secondary text-3xl">payments</span>
                    </div>
                    <div className="text-right">
                      <h3 className="text-[16px] leading-[24px] sm:text-[20px] sm:leading-[28px] font-bold text-on-surface">الدفع عند الاستلام</h3>
                      <p className="text-[12px] leading-[16px] sm:text-[14px] sm:leading-[20px] text-outline">ادفع نقداً عند استلام طلبك من مندوب التوصيل</p>
                    </div>
                  </div>
                  <div className="w-6 h-6 rounded-full border-2 border-secondary flex items-center justify-center shrink-0">
                    <div className="w-3 h-3 rounded-full bg-secondary"></div>
                  </div>
                </div>

                <div className="bg-surface-container-low p-4 rounded-lg border border-outline-variant/30 flex items-start gap-3 flex-row-reverse mt-4">
                  <span className="material-symbols-outlined text-secondary mt-0.5">info</span>
                  <p className="text-right text-[14px] leading-[20px] text-on-surface-variant">
                    &quot;الدفع عند الاستلام&quot; هي الطريقة الوحيدة المتاحة حالياً لضمان أعلى مستويات الأمان والرضا لعملائنا.
                  </p>
                </div>
              </section>

              {/* Submit Button - Desktop */}
              <button
                type="submit"
                disabled={loading}
                className="hidden lg:flex w-full py-5 bg-primary text-on-primary rounded-lg font-semibold text-[18px] leading-[24px] xl:text-[24px] xl:leading-[32px] hover:opacity-90 active:scale-[0.98] transition-all shadow-[0_16px_32px_rgba(0,0,0,0.1)] items-center justify-center gap-3 disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {loading ? (
                  <div className="w-6 h-6 border-2 border-white border-t-transparent rounded-full animate-spin" />
                ) : (
                  <>
                    <span className="material-symbols-outlined">shopping_bag</span>
                    إتمام الطلب
                  </>
                )}
              </button>
              <p className="hidden lg:block text-center text-[12px] leading-[16px] tracking-[0.05em] text-outline">بضغطك على إتمام الطلب، فإنك توافق على الشروط والأحكام</p>
            </form>
          </div>
        </div>
      </main>

      {/* Mobile Fixed Bottom */}
      <div className="lg:hidden fixed bottom-0 left-0 right-0 bg-surface-container-lowest/95 backdrop-blur-md border-t border-outline-variant px-4 py-3 z-50">
        <button
          onClick={handleSubmit}
          disabled={loading}
          className="w-full bg-primary text-on-primary py-4 rounded-lg font-semibold text-[16px] flex items-center justify-center gap-2 hover:opacity-90 transition-all disabled:opacity-50"
        >
          {loading ? (
            <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin" />
          ) : (
            <>
              <span className="material-symbols-outlined text-[18px]">shopping_bag</span>
              إتمام الطلب - {grandTotal.toLocaleString()} ر.س
            </>
          )}
        </button>
      </div>

      <Footer />
    </>
  );
}
