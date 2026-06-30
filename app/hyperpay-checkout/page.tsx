"use client";
import { useEffect, useState } from "react";
import { useSearchParams, useRouter } from "next/navigation";
import { Suspense } from "react";
import Header from "../components/Header";
import Footer from "../components/Footer";

const API_URL = process.env.NEXT_PUBLIC_API_URL || "http://localhost:5000";
const HP_BASE_URL = process.env.NEXT_PUBLIC_HYPERPAY_BASE_URL || "https://eu-test.oppwa.com";

function HyperPayCheckoutContent() {
  const searchParams = useSearchParams();
  const router = useRouter();
  const orderId = searchParams.get("orderId");
  const checkoutId = searchParams.get("checkoutId");
  const [status, setStatus] = useState<"loading" | "ready" | "error">("loading");
  const [errorMsg, setErrorMsg] = useState("");

  const shopperResultUrl =
    typeof window !== "undefined"
      ? `${window.location.origin}/order-success?id=${orderId}&verify=hyperpay`
      : "";

  useEffect(() => {
    if (!checkoutId || !orderId) {
      setErrorMsg("بيانات الدفع غير مكتملة");
      setStatus("error");
      return;
    }

    // تحميل script الـ HyperPay widget
    const script = document.createElement("script");
    script.src = `${HP_BASE_URL}/v1/paymentWidgets.js?checkoutId=${checkoutId}`;
    script.async = true;
    script.onload = () => setStatus("ready");
    script.onerror = () => {
      setErrorMsg("فشل تحميل بوابة الدفع");
      setStatus("error");
    };
    document.body.appendChild(script);

    // إضافة wpwlOptions لـ 3D Secure redirect آمن
    const optionsScript = document.createElement("script");
    optionsScript.type = "text/javascript";
    optionsScript.innerHTML = `var wpwlOptions = { paymentTarget: "_top" };`;
    document.head.appendChild(optionsScript);

    return () => {
      document.body.removeChild(script);
      document.head.removeChild(optionsScript);
    };
  }, [checkoutId, orderId]);

  if (status === "error") {
    return (
      <main className="min-h-[60vh] flex flex-col items-center justify-center px-4" dir="rtl">
        <div className="w-16 h-16 rounded-full bg-red-100 flex items-center justify-center mb-4">
          <span className="material-symbols-outlined text-4xl text-red-500">error</span>
        </div>
        <p className="text-red-600 font-medium mb-4">{errorMsg}</p>
        <button
          onClick={() => router.back()}
          className="bg-[#131b2e] text-white px-6 py-3 rounded-xl font-bold hover:bg-[#775a19] transition-all"
        >
          العودة
        </button>
      </main>
    );
  }

  return (
    <main dir="rtl" className="min-h-screen bg-[#f7f9fb] pb-16">
      <div className="max-w-[600px] mx-auto px-4 sm:px-6 py-8 sm:py-12">
        <div className="mb-8">
          <h1 className="text-2xl sm:text-3xl font-bold text-[#131b2e]">إتمام الدفع</h1>
          <p className="text-[#888] text-sm mt-1">أدخل بيانات بطاقتك لإتمام الطلب</p>
        </div>

        {/* بطاقات الدفع المدعومة */}
        <div className="bg-white rounded-2xl p-4 mb-6 flex items-center gap-3 flex-wrap" style={{ boxShadow: "0 2px 16px rgba(19,27,46,0.06)" }}>
          <span className="text-sm text-[#666] font-medium">طرق الدفع المقبولة:</span>
          <div className="flex items-center gap-2 flex-wrap">
            {/* مدى - يجب أن يكون أول */}
            <div className="flex items-center gap-1.5 bg-[#006341] text-white text-xs font-bold px-3 py-1.5 rounded-lg">
              <span>مدى</span>
            </div>
            <div className="flex items-center gap-1.5 bg-[#1a1f71] text-white text-xs font-bold px-3 py-1.5 rounded-lg">
              <span>VISA</span>
            </div>
            <div className="flex items-center gap-1.5 bg-[#eb001b] text-white text-xs font-bold px-3 py-1.5 rounded-lg">
              <span>Mastercard</span>
            </div>
          </div>
        </div>

        {/* HyperPay Widget */}
        <div
          className="bg-white rounded-2xl p-6"
          style={{ boxShadow: "0 2px 16px rgba(19,27,46,0.06)" }}
        >
          {status === "loading" && (
            <div className="flex items-center justify-center py-16">
              <div className="w-10 h-10 border-4 border-[#131b2e] border-t-transparent rounded-full animate-spin" />
            </div>
          )}

          {status === "ready" && (
            <form
              action={shopperResultUrl}
              className="paymentWidgets"
              data-brands="MADA VISA MASTER"
            />
          )}
        </div>

        {/* أمان */}
        <div className="flex items-center justify-center gap-2 mt-5 text-[#888]">
          <span className="material-symbols-outlined text-[#0d9488] text-[18px]">verified_user</span>
          <span className="text-xs">دفع آمن ومضمون بتشفير SSL</span>
        </div>
      </div>
    </main>
  );
}

export default function HyperPayCheckoutPage() {
  return (
    <>
      <Header />
      <Suspense
        fallback={
          <div className="min-h-[60vh] flex items-center justify-center">
            <div className="w-10 h-10 border-4 border-[#131b2e] border-t-transparent rounded-full animate-spin" />
          </div>
        }
      >
        <HyperPayCheckoutContent />
      </Suspense>
      <Footer />
    </>
  );
}
