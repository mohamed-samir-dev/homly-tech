"use client";
import { Suspense, useEffect, useState } from "react";
import { useSearchParams } from "next/navigation";
import Header from "../components/Header";
import Footer from "../components/Footer";

const API_URL = process.env.NEXT_PUBLIC_API_URL || "http://localhost:5000";

function OrderSuccessContent() {
  const searchParams = useSearchParams();
  const orderId = searchParams.get("id");
  const verify = searchParams.get("verify");
  const invoiceId = searchParams.get("invoiceId");
  const [status, setStatus] = useState<"loading" | "paid" | "failed" | "cash">(verify === "mf" ? "loading" : "cash");

  useEffect(() => {
    if (verify !== "mf" || !orderId) return;
    const id = invoiceId || searchParams.get("InvoiceId") || searchParams.get("paymentId");
    fetch(`${API_URL}/api/orders/${orderId}/verify-payment?invoiceId=${id}`)
      .then((r) => r.json())
      .then((d) => setStatus(d.success ? "paid" : "failed"))
      .catch(() => setStatus("failed"));
  }, [orderId, verify, invoiceId]);

  if (status === "loading") {
    return (
      <main className="min-h-[60vh] flex items-center justify-center">
        <div className="w-10 h-10 border-4 border-[#131b2e] border-t-transparent rounded-full animate-spin" />
      </main>
    );
  }

  if (status === "failed") {
    return (
      <main className="max-w-[1280px] mx-auto px-4 py-16 min-h-[60vh] flex flex-col items-center justify-center text-center">
        <div className="w-20 h-20 rounded-full bg-red-100 flex items-center justify-center mb-6">
          <span className="material-symbols-outlined text-5xl text-red-500">cancel</span>
        </div>
        <h1 className="text-3xl font-bold text-[#131b2e] mb-3">فشل الدفع</h1>
        <p className="text-[#888] mb-7">لم يتم تأكيد عملية الدفع. يمكنك المحاولة مرة أخرى.</p>
        <a href="/cart" className="bg-[#131b2e] text-white px-8 py-3.5 rounded-full font-bold hover:bg-[#775a19] transition-all">
          العودة للسلة
        </a>
      </main>
    );
  }

  return (
    <main className="max-w-[1280px] mx-auto px-4 py-16 min-h-[60vh] flex flex-col items-center justify-center text-center">
      <div className="w-20 h-20 rounded-full bg-green-100 flex items-center justify-center mb-6">
        <span className="material-symbols-outlined text-5xl text-green-600">check_circle</span>
      </div>
      <h1 className="text-3xl font-bold text-[#131b2e] mb-3">تم تأكيد طلبك بنجاح!</h1>
      <p className="text-[#888] mb-2">شكراً لك، سيتم التواصل معك قريباً لتأكيد التوصيل</p>
      {orderId && (
        <p className="text-sm text-[#888] bg-[#f7f9fb] px-4 py-2 rounded-lg mb-6">
          رقم الطلب: <span className="font-bold text-[#131b2e]">{orderId}</span>
        </p>
      )}
      <div className="flex items-center gap-4 mt-4">
        <a href="/" className="border-2 border-[#131b2e] text-[#131b2e] px-6 py-3 rounded-xl font-bold hover:bg-[#131b2e]/5 transition-all">
          الرئيسية
        </a>
        <a href="/products" className="bg-[#131b2e] text-white px-6 py-3 rounded-xl font-bold hover:bg-[#775a19] transition-all">
          متابعة التسوق
        </a>
      </div>
      <div className="mt-8 bg-white rounded-xl border border-[#e8e8e8] p-6 max-w-md w-full">
        <h3 className="font-bold text-[#131b2e] mb-3">طريقة الدفع</h3>
        <div className="flex items-center gap-3 text-sm text-[#666]">
          <span className="material-symbols-outlined text-[#131b2e]">
            {status === "paid" ? "credit_card" : "local_shipping"}
          </span>
          <span>{status === "paid" ? "تم الدفع إلكترونياً بنجاح" : "الدفع نقداً عند الاستلام"}</span>
        </div>
      </div>
    </main>
  );
}

export default function OrderSuccessPage() {
  return (
    <>
      <Header />
      <Suspense fallback={<div className="min-h-[60vh] flex items-center justify-center"><div className="w-10 h-10 border-4 border-secondary border-t-transparent rounded-full animate-spin" /></div>}>
        <OrderSuccessContent />
      </Suspense>
      <Footer />
    </>
  );
}
