"use client";
import { useRouter } from "next/navigation";

export default function FailurePage({ orderId }: { orderId: string | null }) {
  const router = useRouter();
  return (
    <main dir="rtl" className="min-h-[80vh] flex items-center justify-center px-4 bg-[#f7f9fb]">
      <div className="max-w-[480px] w-full text-center">
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
