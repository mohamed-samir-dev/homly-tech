"use client";
import { useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { useCart } from "../context/CartContext";
import Header from "../components/Header";
import Footer from "../components/Footer";

const API_URL = process.env.NEXT_PUBLIC_API_URL || "http://localhost:5000";

const CITIES = ["الرياض", "جدة", "الدمام", "مكة المكرمة", "المدينة المنورة", "الطائف", "تبوك", "أبها", "خميس مشيط", "القصيم"];

function Field({
  label,
  error,
  optional,
  children,
}: {
  label: string;
  error?: string;
  optional?: boolean;
  children: React.ReactNode;
}) {
  return (
    <div className="flex flex-col gap-1.5">
      <label className="text-sm font-medium text-[#131b2e] flex items-center gap-1">
        {label}
        {optional && <span className="text-[#aaa] font-normal text-xs">(اختياري)</span>}
      </label>
      {children}
      {error && (
        <p className="text-red-500 text-xs flex items-center gap-1">
          <span className="material-symbols-outlined text-[14px]">error</span>
          {error}
        </p>
      )}
    </div>
  );
}

export default function CheckoutPage() {
  const { items, totalPrice, clearCart } = useCart();
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [form, setForm] = useState({ customerName: "", phone: "", address: "", city: "الرياض", notes: "" });
  const [fieldErrors, setFieldErrors] = useState<Record<string, string>>({});
  const [paymentMethod, setPaymentMethod] = useState<"online" | "hyperpay">("hyperpay");

  const inputCls = (name: string) =>
    `w-full px-4 py-3 rounded-xl border text-sm text-[#131b2e] bg-white outline-none transition-all focus:ring-2 focus:ring-[#131b2e]/10 focus:border-[#131b2e] placeholder:text-[#bbb] ${
      fieldErrors[name] ? "border-red-400 bg-red-50/30" : "border-[#e8e8e8] hover:border-[#ccc]"
    }`;

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    if (name === "phone" && value.length > 10) return;
    if (name === "customerName" && /\d/.test(value)) return;
    setForm({ ...form, [name]: value });
    setFieldErrors((prev) => ({ ...prev, [name]: "" }));
  };

  const validate = () => {
    const errors: Record<string, string> = {};
    if (!form.customerName.trim() || form.customerName.trim().length < 3)
      errors.customerName = "الاسم يجب أن يكون 3 أحرف على الأقل";
    if (!/^(05|5)\d{8}$/.test(form.phone))
      errors.phone = "رقم الهاتف يجب أن يبدأ بـ 05 ويتكون من 10 أرقام";
    if (!form.address.trim() || form.address.trim().length < 10)
      errors.address = "العنوان يجب أن يكون 10 أحرف على الأقل";
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
          paymentMethod: paymentMethod === "online" ? "online" : "hyperpay",
        }),
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.message || "حدث خطأ");

      if (paymentMethod === "online") {
        const mfRes = await fetch(`${API_URL}/api/orders/${data.data._id}/myfatoorah-session`, { method: "POST" });
        const mfData = await mfRes.json();
        if (!mfRes.ok) throw new Error(mfData.message || "فشل إنشاء جلسة الدفع");
        clearCart();
        window.location.href = mfData.payUrl;
        return;
      }

      if (paymentMethod === "hyperpay") {
        const hpRes = await fetch(`${API_URL}/api/orders/${data.data._id}/hyperpay-session`, { method: "POST" });
        const hpData = await hpRes.json();
        if (!hpRes.ok) throw new Error(hpData.message || "فشل إنشاء جلسة HyperPay");
        clearCart();
        router.push(`/hyperpay-checkout?orderId=${data.data._id}&checkoutId=${hpData.checkoutId}`);
        return;
      }

    } catch (err: unknown) {
      setError(err instanceof Error ? err.message : "حدث خطأ غير متوقع");
    } finally {
      setLoading(false);
    }
  };

  const getImageUrl = (img: string) =>
    img.startsWith("http") ? img : `${API_URL}/uploads/${img}`;



  if (items.length === 0) {
    return (
      <>
        <Header />
        <main className="min-h-[70vh] flex items-center justify-center px-4 bg-[#f7f9fb]" dir="rtl">
          <div className="text-center">
            <div className="w-28 h-28 rounded-full bg-white shadow-lg flex items-center justify-center mx-auto mb-5">
              <span className="material-symbols-outlined text-5xl text-[#131b2e]/20">shopping_cart</span>
            </div>
            <h1 className="text-2xl font-bold text-[#131b2e] mb-2">السلة فارغة</h1>
            <p className="text-[#888] text-sm mb-7">أضف منتجات للسلة أولاً لإتمام الطلب</p>
            <Link href="/products" className="inline-flex items-center gap-2 bg-[#131b2e] text-white px-8 py-3.5 rounded-full font-medium hover:bg-[#775a19] transition-all duration-300">
              <span className="material-symbols-outlined text-[18px]">shopping_bag</span>
              تصفح المنتجات
            </Link>
          </div>
        </main>
        <Footer />
      </>
    );
  }

  return (
    <>
      <Header />
      <main dir="rtl" className="min-h-screen bg-[#f7f9fb] pb-28 lg:pb-16">
        <div className="max-w-[1280px] mx-auto px-4 sm:px-6 lg:px-12 py-8 sm:py-12">

          {/* Title */}
          <div className="mb-8">
            <h1 className="text-2xl sm:text-3xl font-bold text-[#131b2e]">إتمام الطلب</h1>
            <p className="text-[#888] text-sm mt-1">أكمل بياناتك لإرسال طلبك</p>
          </div>

          {error && (
            <div className="bg-red-50 border border-red-200 text-red-700 text-sm p-4 rounded-xl mb-6 flex items-center gap-2">
              <span className="material-symbols-outlined text-[18px]">error</span>
              {error}
            </div>
          )}

          <div className="flex flex-col lg:flex-row gap-6 items-start">

            {/* Form */}
            <form onSubmit={handleSubmit} className="flex-1 flex flex-col gap-6">

              {/* Step 1 - Shipping */}
              <div
                className="bg-white rounded-2xl p-6 sm:p-7"
                style={{ boxShadow: "0 2px 16px rgba(19,27,46,0.06)" }}
              >
                <div className="flex items-center gap-3 mb-6">
                  <div className="w-8 h-8 rounded-full bg-[#131b2e] text-white flex items-center justify-center text-sm font-bold shrink-0">
                    1
                  </div>
                  <h2 className="text-lg font-bold text-[#131b2e]">بيانات الشحن</h2>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <Field label="الاسم الكامل" error={fieldErrors.customerName}>
                    <input
                      name="customerName"
                      value={form.customerName}
                      onChange={handleChange}
                      required
                      type="text"
                      placeholder="محمد أحمد"
                      className={inputCls("customerName")}
                    />
                  </Field>

                  <Field label="رقم الجوال" error={fieldErrors.phone}>
                    <input
                      name="phone"
                      value={form.phone}
                      onChange={handleChange}
                      required
                      type="tel"
                      dir="ltr"
                      maxLength={10}
                      placeholder="05xxxxxxxx"
                      className={inputCls("phone")}
                    />
                  </Field>

                  <Field label="المدينة">
                    <select
                      name="city"
                      value={form.city}
                      onChange={handleChange}
                      className={inputCls("city")}
                    >
                      {CITIES.map((c) => <option key={c}>{c}</option>)}
                    </select>
                  </Field>

                  <Field label="الحي والشارع" error={fieldErrors.address}>
                    <input
                      name="address"
                      value={form.address}
                      onChange={handleChange}
                      required
                      type="text"
                      placeholder="اسم الحي، الشارع، رقم المبنى"
                      className={inputCls("address")}
                    />
                  </Field>

                  <div className="sm:col-span-2">
                    <Field label="ملاحظات" optional>
                      <textarea
                        name="notes"
                        value={form.notes}
                        onChange={handleChange}
                        rows={3}
                        placeholder="أي تعليمات خاصة للتوصيل..."
                        className={`${inputCls("notes")} resize-none`}
                      />
                    </Field>
                  </div>
                </div>
              </div>

              {/* Step 2 - Payment */}
              <div
                className="bg-white rounded-2xl p-6 sm:p-7"
                style={{ boxShadow: "0 2px 16px rgba(19,27,46,0.06)" }}
              >
                <div className="flex items-center gap-3 mb-6">
                  <div className="w-8 h-8 rounded-full bg-[#131b2e] text-white flex items-center justify-center text-sm font-bold shrink-0">
                    2
                  </div>
                  <h2 className="text-lg font-bold text-[#131b2e]">طريقة الدفع</h2>
                </div>

                <div className="flex flex-col gap-3">
                  {/* HyperPay - مدى / فيزا / ماستركارد */}
                  <button
                    type="button"
                    onClick={() => setPaymentMethod("hyperpay")}
                    className={`flex items-center justify-between rounded-2xl p-4 sm:p-5 border-2 transition-all ${
                      paymentMethod === "hyperpay"
                        ? "border-[#131b2e] bg-[#f7f9fb]"
                        : "border-[#e8e8e8] bg-white hover:border-[#ccc]"
                    }`}
                  >
                    <div className="flex items-center gap-4">
                      <div className="w-12 h-12 rounded-xl bg-[#006341] flex items-center justify-center shrink-0">
                        <span className="text-white font-bold text-sm">مدى</span>
                      </div>
                      <div className="text-right">
                        <div className="font-bold text-[#131b2e] text-sm sm:text-base">مدى / فيزا / ماستركارد</div>
                        <div className="text-[#888] text-xs sm:text-sm mt-0.5">  بطاقات البنوك السعودية</div>
                      </div>
                    </div>
                    <div className={`w-5 h-5 rounded-full border-2 flex items-center justify-center shrink-0 ${
                      paymentMethod === "hyperpay" ? "border-[#131b2e]" : "border-[#ccc]"
                    }`}>
                      {paymentMethod === "hyperpay" && <div className="w-2.5 h-2.5 rounded-full bg-[#131b2e]" />}
                    </div>
                  </button>

                  {/* MyFatoorah Online Payment */}
                  <button
                    type="button"
                    onClick={() => setPaymentMethod("online")}
                    className={`flex items-center justify-between rounded-2xl p-4 sm:p-5 border-2 transition-all ${
                      paymentMethod === "online"
                        ? "border-[#131b2e] bg-[#f7f9fb]"
                        : "border-[#e8e8e8] bg-white hover:border-[#ccc]"
                    }`}
                  >
                    <div className="flex items-center gap-4">
                      <div className="w-12 h-12 rounded-xl bg-[#131b2e] flex items-center justify-center shrink-0">
                        <span className="material-symbols-outlined text-[#fed488] text-2xl">credit_card</span>
                      </div>
                      <div className="text-right">
                        <div className="font-bold text-[#131b2e] text-sm sm:text-base">الدفع الإلكتروني</div>
                        <div className="text-[#888] text-xs sm:text-sm mt-0.5">بطاقة مدى / فيزا / ماستركارد / Apple Pay</div>
                      </div>
                    </div>
                    <div className={`w-5 h-5 rounded-full border-2 flex items-center justify-center shrink-0 ${
                      paymentMethod === "online" ? "border-[#131b2e]" : "border-[#ccc]"
                    }`}>
                      {paymentMethod === "online" && <div className="w-2.5 h-2.5 rounded-full bg-[#131b2e]" />}
                    </div>
                  </button>

                </div>
              </div>

              {/* Submit desktop */}
              <button
                type="submit"
                disabled={loading}
                className="hidden lg:flex items-center justify-center gap-3 w-full bg-[#131b2e] text-white py-4 rounded-2xl font-bold text-lg hover:bg-[#775a19] transition-all duration-300 shadow-xl shadow-[#131b2e]/20 disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {loading ? (
                  <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin" />
                ) : (
                  <>
                    <span className="material-symbols-outlined">shopping_bag</span>
                    تأكيد الطلب — {totalPrice.toLocaleString()} ر.س
                  </>
                )}
              </button>
              <p className="hidden lg:block text-center text-xs text-[#bbb]">
                بالضغط على تأكيد الطلب توافق على الشروط والأحكام
              </p>
            </form>

            {/* Order Summary */}
            <aside className="w-full lg:w-[360px] shrink-0 sticky top-24">
              <div
                className="bg-white rounded-2xl p-6"
                style={{ boxShadow: "0 4px 32px rgba(19,27,46,0.08)" }}
              >
                <h2 className="text-lg font-bold text-[#131b2e] mb-5">ملخص الطلب</h2>

                {/* Products */}
                <div className="flex flex-col gap-3 mb-5">
                  {items.map((item) => (
                    <div key={item.productId} className="flex items-center gap-3">
                      <div className="w-14 h-14 rounded-xl bg-[#f4f6f8] overflow-hidden shrink-0">
                        <img
                          src={getImageUrl(item.image)}
                          alt={item.name}
                          className="w-full h-full object-contain p-1.5"
                        />
                      </div>
                      <div className="flex-1 min-w-0">
                        <p className="text-sm font-medium text-[#131b2e] line-clamp-1">{item.name}</p>
                        <p className="text-xs text-[#aaa] mt-0.5">الكمية: {item.quantity}</p>
                      </div>
                      <span className="text-sm font-bold text-[#131b2e] shrink-0">
                        {(item.price * item.quantity).toLocaleString()} ر.س
                      </span>
                    </div>
                  ))}
                </div>

                <div className="border-t border-[#f0f0f0] pt-4 space-y-2.5">
                  <div className="flex justify-between text-sm text-[#666]">
                    <span>{totalPrice.toLocaleString()} ر.س</span>
                    <span>المجموع الفرعي</span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span className="text-[#0d9488] font-medium">مجاني</span>
                    <span className="text-[#666]">الشحن</span>
                  </div>
                  <div className="flex justify-between items-center pt-3 border-t border-[#f0f0f0]">
                    <span className="text-xl font-bold text-[#131b2e]">{totalPrice.toLocaleString()} ر.س</span>
                    <span className="font-bold text-[#131b2e]">الإجمالي</span>
                  </div>
                </div>

                <div className="flex items-center gap-2 mt-5 bg-[#f7f9fb] rounded-xl px-4 py-3">
                  <span className="material-symbols-outlined text-[#0d9488] text-[18px]">verified_user</span>
                  <span className="text-xs text-[#666]">دفع آمن ومضمون 100%</span>
                </div>
              </div>
            </aside>
          </div>
        </div>
      </main>

      {/* Mobile fixed bottom */}
      <div className="lg:hidden fixed bottom-0 left-0 right-0 bg-white/95 backdrop-blur-md border-t border-[#eee] px-4 py-3 z-50" dir="rtl">
        <button
          onClick={handleSubmit}
          disabled={loading}
          className="w-full flex items-center justify-center gap-2 bg-[#131b2e] text-white py-3.5 rounded-xl font-bold text-sm hover:bg-[#775a19] transition-all disabled:opacity-50"
        >
          {loading ? (
            <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin" />
          ) : (
            <>
              <span className="material-symbols-outlined text-[18px]">shopping_bag</span>
              تأكيد الطلب — {totalPrice.toLocaleString()} ر.س
            </>
          )}
        </button>
      </div>

      <Footer />
    </>
  );
}
