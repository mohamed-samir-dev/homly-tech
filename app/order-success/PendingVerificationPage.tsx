"use client";
import { useRouter } from "next/navigation";

export default function PendingVerificationPage({ orderId }: { orderId: string | null }) {
  const router = useRouter();
  return (
    <main dir="rtl" className="min-h-[80vh] flex items-center justify-center px-4 bg-[#f7f9fb]">
      <div className="max-w-[480px] w-full text-center">
        <div className="relative w-28 h-28 mx-auto mb-6">
          <div className="absolute inset-0 rounded-full bg-amber-100 animate-pulse opacity-50" />
          <div className="relative w-28 h-28 rounded-full bg-amber-100 flex items-center justify-center">
            <span className="material-symbols-outlined text-6xl text-amber-500">schedule</span>
          </div>
        </div>

        <h1 className="text-3xl font-bold text-[#131b2e] mb-3">جارٍ التحقق من الدفع</h1>
        <p className="text-[#888] text-base mb-2 leading-relaxed">
          تم استلام طلبك وجارٍ التحقق من عملية الدفع مع البنك.
        </p>
        <p className="text-[#888] text-sm mb-6">
          سيتم تأكيد طلبك تلقائياً خلال دقائق. لا تقلق، إذا تم الخصم من حسابك فسيتم تأكيد الطلب أو إرجاع المبلغ.
        </p>

        {orderId && (
          <p className="text-sm text-[#aaa] mb-8 font-mono bg-white border border-[#e8e8e8] inline-block px-4 py-2 rounded-xl">
            رقم الطلب: {orderId}
          </p>
        )}

        <div className="bg-white border border-[#e8e8e8] rounded-2xl p-5 mb-7 text-right" style={{ boxShadow: "0 2px 16px rgba(19,27,46,0.05)" }}>
          <p className="text-sm font-bold text-[#131b2e] mb-3 flex items-center gap-2">
            <span className="material-symbols-outlined text-[18px] text-[#0d9488]">info</span>
            ماذا يحدث الآن؟
          </p>
          <ul className="flex flex-col gap-2">
            {[
              "نظامنا يتحقق من حالة الدفع مع البنك تلقائياً",
              "إذا تم الخصم بنجاح سيتم تأكيد طلبك خلال 5 دقائق",
              "إذا لم يتم الخصم فلن يتأثر حسابك",
              "يمكنك التواصل معنا إذا لم يتم التأكيد خلال ساعة",
            ].map((item) => (
              <li key={item} className="flex items-center gap-2 text-sm text-[#666]">
                <span className="w-1.5 h-1.5 rounded-full bg-[#0d9488] shrink-0" />
                {item}
              </li>
            ))}
          </ul>
        </div>

        <div className="flex flex-col sm:flex-row gap-3">
          <button
            onClick={() => router.push("/")}
            className="flex-1 flex items-center justify-center gap-2 bg-[#131b2e] text-white py-4 rounded-2xl font-bold hover:bg-[#775a19] transition-all text-sm"
          >
            <span className="material-symbols-outlined text-[18px]">home</span>
            العودة للرئيسية
          </button>
          <a
            href="/contact"
            className="flex-1 flex items-center justify-center gap-2 border-2 border-[#e8e8e8] text-[#131b2e] py-4 rounded-2xl font-bold hover:border-[#131b2e] transition-all text-sm"
          >
            <span className="material-symbols-outlined text-[18px]">support_agent</span>
            تواصل معنا
          </a>
        </div>
      </div>
    </main>
  );
}
