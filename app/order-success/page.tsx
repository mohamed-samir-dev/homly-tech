"use client";
import { Suspense, useEffect, useState, useRef } from "react";
import { useSearchParams, useRouter } from "next/navigation";
import Header from "../components/Header";
import Footer from "../components/Footer";
import Image from "next/image";

const API_URL = process.env.NEXT_PUBLIC_API_URL || "http://localhost:5000";
const REDIRECT_SECONDS = 10;

type OrderItem = {
  productId: string;
  name: string;
  price: number;
  quantity: number;
};

type Order = {
  _id: string;
  customerName: string;
  phone: string;
  address: string;
  notes?: string;
  items: OrderItem[];
  totalPrice: number;
  paymentMethod: "cash_on_delivery" | "online";
  paymentStatus: "pending" | "paid" | "failed";
  status: string;
  createdAt: string;
};

// ────────────────────────────────────────────────
//  Loading skeleton
// ────────────────────────────────────────────────
function LoadingScreen() {
  return (
    <main className="min-h-[70vh] flex flex-col items-center justify-center gap-4" dir="rtl">
      <div className="w-16 h-16 rounded-full border-4 border-[#131b2e] border-t-transparent animate-spin" />
      <p className="text-[#888] text-sm">جارٍ التحقق من الدفع...</p>
    </main>
  );
}

// ────────────────────────────────────────────────
//  Invoice / Receipt
// ────────────────────────────────────────────────
function Invoice({ order, payMethod }: { order: Order; payMethod: string }) {
  const router = useRouter();
  const [countdown, setCountdown] = useState(REDIRECT_SECONDS);
  const intervalRef = useRef<NodeJS.Timeout | null>(null);

  const vat = Math.round(order.totalPrice * 0.15);
  const grand = Math.round(order.totalPrice * 1.15);
  const invoiceDate = new Date(order.createdAt).toLocaleDateString("ar-SA", {
    year: "numeric",
    month: "long",
    day: "numeric",
    hour: "2-digit",
    minute: "2-digit",
  });

  // عداد تنازلي ثم redirect
  useEffect(() => {
    intervalRef.current = setInterval(() => {
      setCountdown((prev) => {
        if (prev <= 1) {
          clearInterval(intervalRef.current!);
          router.push("/");
          return 0;
        }
        return prev - 1;
      });
    }, 1000);
    return () => clearInterval(intervalRef.current!);
  }, [router]);

  const handlePrint = () => window.print();

  return (
    <main dir="rtl" className="min-h-screen bg-[#f0f4f8] py-10 px-4">
      {/* ── شريط العداد ── */}
      <div className="max-w-[720px] mx-auto mb-5 no-print">
        <div className="bg-white rounded-2xl px-5 py-3 flex items-center justify-between gap-3 shadow-sm border border-[#e8e8e8]">
          <div className="flex items-center gap-2 text-[#131b2e]">
            <span className="material-symbols-outlined text-[#0d9488] text-xl">schedule</span>
            <span className="text-sm">
              سيتم تحويلك للرئيسية خلال{" "}
              <span className="font-bold text-[#0d9488] tabular-nums">{countdown}</span> ثوانٍ
            </span>
          </div>
          <div className="flex items-center gap-2">
            <button
              onClick={() => { clearInterval(intervalRef.current!); router.push("/"); }}
              className="text-xs text-[#888] hover:text-[#131b2e] underline underline-offset-2 transition-colors"
            >
              الرئيسية الآن
            </button>
            <button
              onClick={handlePrint}
              className="flex items-center gap-1.5 bg-[#131b2e] text-white text-xs font-bold px-4 py-2 rounded-xl hover:bg-[#775a19] transition-all"
            >
              <span className="material-symbols-outlined text-[16px]">print</span>
              طباعة الفاتورة
            </button>
          </div>
        </div>

        {/* progress bar */}
        <div className="mt-2 h-1 bg-[#e8e8e8] rounded-full overflow-hidden">
          <div
            className="h-full bg-[#0d9488] rounded-full transition-all duration-1000"
            style={{ width: `${(countdown / REDIRECT_SECONDS) * 100}%` }}
          />
        </div>
      </div>

      {/* ── الفاتورة ── */}
      <div
        id="invoice"
        className="max-w-[720px] mx-auto bg-white rounded-3xl overflow-hidden"
        style={{ boxShadow: "0 4px 40px rgba(19,27,46,0.10)" }}
      >
        {/* Header الفاتورة */}
        <div className="bg-[#131b2e] px-8 py-7 flex items-center justify-between">
          <div className="flex items-center gap-4">
            <div className="w-14 h-14 rounded-2xl bg-white/10 flex items-center justify-center overflow-hidden">
              <Image src="/logo.webp" alt="سهلناها" width={48} height={48} className="rounded-xl" />
            </div>
            <div>
              <h1 className="text-white font-bold text-xl leading-tight">سهلناها</h1>
              <p className="text-white/60 text-xs mt-0.5">مفروشات منزلية</p>
            </div>
          </div>
          <div className="text-left">
            <div className="text-white/60 text-xs mb-1">فاتورة رقم</div>
            <div className="text-white font-bold text-base tracking-widest font-mono">
              #{order._id.slice(-8).toUpperCase()}
            </div>
          </div>
        </div>

        {/* شريط النجاح */}
        <div className="bg-[#0d9488]/10 border-b border-[#0d9488]/20 px-8 py-4 flex items-center gap-3">
          <div className="w-10 h-10 rounded-full bg-[#0d9488] flex items-center justify-center shrink-0">
            <span className="material-symbols-outlined text-white text-xl">check</span>
          </div>
          <div>
            <p className="font-bold text-[#0d9488] text-base">تم تأكيد طلبك بنجاح!</p>
            <p className="text-[#555] text-xs mt-0.5">
              {payMethod === "cash" ? "سيتم الدفع نقداً عند الاستلام" : "تم الدفع إلكترونياً بنجاح ✓"}
            </p>
          </div>
          <div className="mr-auto text-left shrink-0">
            <div className="text-xs text-[#888]">تاريخ الطلب</div>
            <div className="text-sm font-medium text-[#131b2e]">{invoiceDate}</div>
          </div>
        </div>

        <div className="px-8 py-7">
          {/* بيانات العميل والتوصيل */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-5 mb-7">
            <div className="bg-[#f7f9fb] rounded-2xl p-5">
              <div className="flex items-center gap-2 mb-3">
                <span className="material-symbols-outlined text-[#131b2e] text-[18px]">person</span>
                <span className="text-xs font-bold text-[#888] uppercase tracking-wide">بيانات العميل</span>
              </div>
              <p className="font-bold text-[#131b2e] text-base">{order.customerName}</p>
              <p className="text-[#666] text-sm mt-1 flex items-center gap-1.5">
                <span className="material-symbols-outlined text-[14px]">call</span>
                {order.phone}
              </p>
            </div>
            <div className="bg-[#f7f9fb] rounded-2xl p-5">
              <div className="flex items-center gap-2 mb-3">
                <span className="material-symbols-outlined text-[#131b2e] text-[18px]">local_shipping</span>
                <span className="text-xs font-bold text-[#888] uppercase tracking-wide">عنوان التوصيل</span>
              </div>
              <p className="text-[#131b2e] text-sm leading-relaxed">{order.address}</p>
              {order.notes && (
                <p className="text-[#888] text-xs mt-2 flex items-start gap-1">
                  <span className="material-symbols-outlined text-[13px] mt-0.5">info</span>
                  {order.notes}
                </p>
              )}
            </div>
          </div>

          {/* جدول المنتجات */}
          <div className="mb-6">
            <div className="flex items-center gap-2 mb-4">
              <span className="material-symbols-outlined text-[#131b2e] text-[18px]">shopping_bag</span>
              <span className="text-xs font-bold text-[#888] uppercase tracking-wide">تفاصيل الطلب</span>
            </div>

            {/* header الجدول */}
            <div className="grid grid-cols-[1fr_auto_auto_auto] gap-3 px-4 py-2 bg-[#f0f4f8] rounded-xl mb-2">
              <span className="text-xs font-bold text-[#888]">المنتج</span>
              <span className="text-xs font-bold text-[#888] text-center">الكمية</span>
              <span className="text-xs font-bold text-[#888] text-center">السعر</span>
              <span className="text-xs font-bold text-[#888] text-left">الإجمالي</span>
            </div>

            {/* rows */}
            <div className="flex flex-col divide-y divide-[#f0f0f0]">
              {order.items.map((item, i) => (
                <div key={i} className="grid grid-cols-[1fr_auto_auto_auto] gap-3 items-center px-4 py-3">
                  <span className="text-sm text-[#131b2e] font-medium line-clamp-2">{item.name}</span>
                  <span className="text-sm text-[#666] text-center bg-[#f7f9fb] rounded-lg px-2.5 py-1 tabular-nums">
                    {item.quantity}
                  </span>
                  <span className="text-sm text-[#666] text-center tabular-nums whitespace-nowrap">
                    {item.price.toLocaleString()} ر.س
                  </span>
                  <span className="text-sm font-bold text-[#131b2e] text-left tabular-nums whitespace-nowrap">
                    {(item.price * item.quantity).toLocaleString()} ر.س
                  </span>
                </div>
              ))}
            </div>
          </div>

          {/* الإجماليات */}
          <div className="bg-[#f7f9fb] rounded-2xl p-5">
            <div className="flex flex-col gap-2.5">
              <div className="flex justify-between text-sm text-[#666]">
                <span className="tabular-nums">{order.totalPrice.toLocaleString()} ر.س</span>
                <span>المجموع الفرعي</span>
              </div>
              <div className="flex justify-between text-sm text-[#666]">
                <span className="tabular-nums">{vat.toLocaleString()} ر.س</span>
                <span>ضريبة القيمة المضافة (15%)</span>
              </div>
              <div className="flex justify-between text-sm">
                <span className="text-[#0d9488] font-medium">مجاني</span>
                <span className="text-[#666]">الشحن</span>
              </div>
              <div className="border-t border-[#e8e8e8] pt-3 mt-1 flex justify-between items-center">
                <span className="text-xl font-bold text-[#131b2e] tabular-nums">
                  {grand.toLocaleString()} ر.س
                </span>
                <span className="font-bold text-[#131b2e] text-base">الإجمالي</span>
              </div>
            </div>
          </div>

          {/* طريقة الدفع */}
          <div className="mt-5 flex items-center justify-between bg-white border border-[#e8e8e8] rounded-2xl px-5 py-4">
            <div className="flex items-center gap-3">
              <div className={`w-10 h-10 rounded-xl flex items-center justify-center ${
                payMethod === "cash" ? "bg-[#f0f0f0]" : "bg-[#131b2e]"
              }`}>
                <span className={`material-symbols-outlined text-[20px] ${
                  payMethod === "cash" ? "text-[#131b2e]" : "text-[#fed488]"
                }`}>
                  {payMethod === "cash" ? "payments" : "credit_card"}
                </span>
              </div>
              <div>
                <p className="font-bold text-[#131b2e] text-sm">
                  {payMethod === "cash" ? "الدفع عند الاستلام" : "الدفع الإلكتروني"}
                </p>
                <p className="text-[#888] text-xs mt-0.5">
                  {payMethod === "cash" ? "نقداً عند استلام الطلب" : "بطاقة مصرفية"}
                </p>
              </div>
            </div>
            <div className={`text-xs font-bold px-3 py-1.5 rounded-full ${
              payMethod === "cash"
                ? "bg-[#fff7e6] text-[#b45309]"
                : "bg-[#d1faf5] text-[#0d9488]"
            }`}>
              {payMethod === "cash" ? "عند الاستلام" : "مدفوع ✓"}
            </div>
          </div>
        </div>

        {/* Footer الفاتورة */}
        <div className="bg-[#f7f9fb] border-t border-[#e8e8e8] px-8 py-5 flex flex-col sm:flex-row items-center justify-between gap-3">
          <div className="flex items-center gap-2 text-[#888] text-xs">
            <span className="material-symbols-outlined text-[#0d9488] text-[16px]">verified_user</span>
            دفع آمن ومضمون بتشفير SSL
          </div>
          <div className="text-xs text-[#888] text-center">
            للاستفسار:{" "}
            <a href="https://homly.sa/contact" className="text-[#131b2e] font-medium underline underline-offset-2">
              تواصل معنا
            </a>
          </div>
          <div className="text-xs text-[#888]">homly.sa © {new Date().getFullYear()}</div>
        </div>
      </div>

      {/* أزرار الأسفل */}
      <div className="max-w-[720px] mx-auto mt-5 flex flex-col sm:flex-row gap-3 no-print">
        <button
          onClick={handlePrint}
          className="flex-1 flex items-center justify-center gap-2 border-2 border-[#131b2e] text-[#131b2e] py-3.5 rounded-2xl font-bold hover:bg-[#131b2e]/5 transition-all"
        >
          <span className="material-symbols-outlined text-[20px]">print</span>
          طباعة الفاتورة
        </button>
        <button
          onClick={() => { clearInterval(intervalRef.current!); router.push("/products"); }}
          className="flex-1 flex items-center justify-center gap-2 bg-[#131b2e] text-white py-3.5 rounded-2xl font-bold hover:bg-[#775a19] transition-all"
        >
          <span className="material-symbols-outlined text-[20px]">shopping_bag</span>
          متابعة التسوق
        </button>
      </div>

      {/* Print styles */}
      <style>{`
        @media print {
          .no-print { display: none !important; }
          body { background: white !important; }
          #invoice { box-shadow: none !important; border-radius: 0 !important; }
        }
      `}</style>
    </main>
  );
}

// ────────────────────────────────────────────────
//  صفحة الفشل
// ────────────────────────────────────────────────
function FailurePage({ orderId }: { orderId: string | null }) {
  const router = useRouter();
  return (
    <main dir="rtl" className="min-h-[80vh] flex items-center justify-center px-4 bg-[#f7f9fb]">
      <div className="max-w-[480px] w-full text-center">
        {/* أيقونة الفشل مع animation */}
        <div className="relative w-28 h-28 mx-auto mb-6">
          <div className="absolute inset-0 rounded-full bg-red-100 animate-ping opacity-30" />
          <div className="relative w-28 h-28 rounded-full bg-red-100 flex items-center justify-center">
            <span className="material-symbols-outlined text-6xl text-red-500">cancel</span>
          </div>
        </div>

        <h1 className="text-3xl font-bold text-[#131b2e] mb-3">فشلت عملية الدفع</h1>
        <p className="text-[#888] text-base mb-2 leading-relaxed">
          لم يتم تأكيد عملية الدفع. لا تقلق، لم يتم خصم أي مبلغ من حسابك.
        </p>
        {orderId && (
          <p className="text-sm text-[#aaa] mb-8 font-mono bg-white border border-[#e8e8e8] inline-block px-4 py-2 rounded-xl">
            رقم الطلب: {orderId}
          </p>
        )}

        {/* الأسباب الشائعة */}
        <div className="bg-white border border-[#e8e8e8] rounded-2xl p-5 mb-7 text-right" style={{ boxShadow: "0 2px 16px rgba(19,27,46,0.05)" }}>
          <p className="text-sm font-bold text-[#131b2e] mb-3 flex items-center gap-2">
            <span className="material-symbols-outlined text-[18px] text-[#f59e0b]">info</span>
            أسباب شائعة لفشل الدفع
          </p>
          <ul className="flex flex-col gap-2">
            {[
              "رصيد غير كافٍ في البطاقة",
              "بيانات البطاقة غير صحيحة",
              "انتهاء مدة الجلسة",
              "رفض من البنك لأسباب أمنية",
            ].map((reason) => (
              <li key={reason} className="flex items-center gap-2 text-sm text-[#666]">
                <span className="w-1.5 h-1.5 rounded-full bg-[#f59e0b] shrink-0" />
                {reason}
              </li>
            ))}
          </ul>
        </div>

        <div className="flex flex-col sm:flex-row gap-3">
          <button
            onClick={() => router.push("/checkout")}
            className="flex-1 flex items-center justify-center gap-2 bg-[#131b2e] text-white py-4 rounded-2xl font-bold hover:bg-[#775a19] transition-all text-sm"
          >
            <span className="material-symbols-outlined text-[18px]">refresh</span>
            المحاولة مرة أخرى
          </button>
          <button
            onClick={() => router.push("/cart")}
            className="flex-1 flex items-center justify-center gap-2 border-2 border-[#e8e8e8] text-[#131b2e] py-4 rounded-2xl font-bold hover:border-[#131b2e] transition-all text-sm"
          >
            <span className="material-symbols-outlined text-[18px]">shopping_cart</span>
            العودة للسلة
          </button>
        </div>

        <a
          href="/contact"
          className="mt-5 inline-flex items-center gap-1.5 text-sm text-[#888] hover:text-[#131b2e] transition-colors underline underline-offset-2"
        >
          <span className="material-symbols-outlined text-[16px]">support_agent</span>
          تحتاج مساعدة؟ تواصل معنا
        </a>
      </div>
    </main>
  );
}

// ────────────────────────────────────────────────
//  Main Content — يحدد الـ status ويعرض الصفحة المناسبة
// ────────────────────────────────────────────────
function OrderResultContent() {
  const searchParams = useSearchParams();
  const orderId = searchParams.get("id");
  const verify = searchParams.get("verify");
  const invoiceId = searchParams.get("invoiceId");
  const resourcePath = searchParams.get("resourcePath");

  const [status, setStatus] = useState<"loading" | "paid" | "failed" | "cash">(
    verify === "mf" || verify === "hyperpay" ? "loading" : "cash"
  );
  const [order, setOrder] = useState<Order | null>(null);

  // جلب بيانات الأوردر
  useEffect(() => {
    if (!orderId) return;
    fetch(`${API_URL}/api/orders/${orderId}/receipt`)
      .then((r) => r.json())
      .then((d) => { if (d.success) setOrder(d.data); })
      .catch(() => {});
  }, [orderId]);

  // التحقق من الدفع
  useEffect(() => {
    if (!orderId) return;

    if (verify === "mf") {
      const id = invoiceId || searchParams.get("InvoiceId") || searchParams.get("paymentId");
      fetch(`${API_URL}/api/orders/${orderId}/verify-payment?invoiceId=${id}`)
        .then((r) => r.json())
        .then((d) => setStatus(d.success ? "paid" : "failed"))
        .catch(() => setStatus("failed"));
      return;
    }

    if (verify === "hyperpay") {
      const rp = resourcePath || searchParams.get("resourcePath");
      if (!rp) { setStatus("failed"); return; }
      fetch(`${API_URL}/api/orders/${orderId}/verify-hyperpay?resourcePath=${encodeURIComponent(rp)}`)
        .then((r) => r.json())
        .then((d) => setStatus(d.success ? "paid" : "failed"))
        .catch(() => setStatus("failed"));
    }
  }, [orderId, verify, invoiceId, resourcePath]);

  if (status === "loading") return <LoadingScreen />;
  if (status === "failed") return <FailurePage orderId={orderId} />;

  // cash أو paid — عرض الفاتورة
  const payMethod = status === "paid" ? "online" : "cash";

  // لو الأوردر لسه بيتجهز، نعمل placeholder
  const displayOrder: Order = order || {
    _id: orderId || "000000",
    customerName: "—",
    phone: "—",
    address: "—",
    items: [],
    totalPrice: 0,
    paymentMethod: payMethod === "online" ? "online" : "cash_on_delivery",
    paymentStatus: payMethod === "online" ? "paid" : "pending",
    status: "pending",
    createdAt: new Date().toISOString(),
  };

  return <Invoice order={displayOrder} payMethod={payMethod} />;
}

// ────────────────────────────────────────────────
//  Export
// ────────────────────────────────────────────────
export default function OrderResultPage() {
  return (
    <>
      <Header />
      <Suspense fallback={<LoadingScreen />}>
        <OrderResultContent />
      </Suspense>
      <Footer />
    </>
  );
}
