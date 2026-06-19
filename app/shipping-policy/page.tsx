import Header from "../components/Header";
import Footer from "../components/Footer";
import WhatsAppButton from "../components/WhatsAppButton";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "سياسة الشحن | مؤسسة سهلناها التقنيه",
  description: "سياسة الشحن والتوصيل لمؤسسة سهلناها التقنيه",
};

export default function ShippingPolicyPage() {
  return (
    <>
      <Header />
      <main dir="rtl" className="min-h-screen bg-[#f7f9fb]">
        {/* Hero Section */}
        <section className="relative overflow-hidden bg-gradient-to-bl from-[#131b2e] via-[#1a2540] to-[#000000] py-12 sm:py-16 md:py-24">
          <div className="absolute inset-0 opacity-10">
            <div className="absolute top-10 right-10 sm:right-20 w-48 sm:w-72 h-48 sm:h-72 rounded-full bg-[#fed488] blur-[80px] sm:blur-[100px]" />
            <div className="absolute bottom-10 left-10 sm:left-20 w-64 sm:w-96 h-64 sm:h-96 rounded-full bg-[#3cddc7] blur-[80px] sm:blur-[120px]" />
          </div>
          <div className="relative max-w-[1280px] mx-auto px-4 sm:px-8 md:px-12 text-center">
            <div className="inline-flex items-center gap-1.5 sm:gap-2 bg-white/10 backdrop-blur-sm border border-white/10 rounded-full px-3 sm:px-4 py-1.5 sm:py-2 mb-4 sm:mb-6">
              <span className="material-symbols-outlined text-[#fed488] text-[16px] sm:text-[20px]">
                verified
              </span>
              <span className="text-xs sm:text-sm text-white/80">شحن سريع وموثوق</span>
            </div>
            <h1 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold text-white mb-2 sm:mb-4 tracking-tight">
              سياسة الشحن والتوصيل
            </h1>
            <p className="text-sm sm:text-base md:text-lg text-white/60 max-w-lg mx-auto leading-relaxed">
              نوصل طلبك لباب بيتك في أسرع وقت داخل المملكة العربية السعودية
            </p>
          </div>
        </section>

        {/* Content */}
        <section className="max-w-[900px] mx-auto px-3 sm:px-6 md:px-8 -mt-8 sm:-mt-10 md:-mt-14 relative z-10 pb-12 sm:pb-16 md:pb-24">
          {/* Highlight Cards Row */}
          <div className="grid grid-cols-3 gap-2 sm:gap-4 mb-6 sm:mb-10">
            <div className="bg-white rounded-lg sm:rounded-xl p-3 sm:p-5 shadow-[0_4px_24px_rgba(0,0,0,0.04)] border border-[#e0e3e5] text-center">
              <div className="w-9 h-9 sm:w-12 sm:h-12 rounded-full bg-[#005047]/10 flex items-center justify-center mx-auto mb-2 sm:mb-3">
                <span className="material-symbols-outlined text-[#005047] text-[18px] sm:text-[24px]">
                  rocket_launch
                </span>
              </div>
              <p className="text-lg sm:text-2xl font-bold text-[#131b2e]">1-5</p>
              <p className="text-[11px] sm:text-sm text-[#45464d]">أيام عمل</p>
            </div>
            <div className="bg-white rounded-lg sm:rounded-xl p-3 sm:p-5 shadow-[0_4px_24px_rgba(0,0,0,0.04)] border border-[#e0e3e5] text-center">
              <div className="w-9 h-9 sm:w-12 sm:h-12 rounded-full bg-[#775a19]/10 flex items-center justify-center mx-auto mb-2 sm:mb-3">
                <span className="material-symbols-outlined text-[#775a19] text-[18px] sm:text-[24px]">
                  local_offer
                </span>
              </div>
              <p className="text-lg sm:text-2xl font-bold text-[#131b2e]">مجاني</p>
              <p className="text-[11px] sm:text-sm text-[#45464d]">فوق 150 ريال</p>
            </div>
            <div className="bg-white rounded-lg sm:rounded-xl p-3 sm:p-5 shadow-[0_4px_24px_rgba(0,0,0,0.04)] border border-[#e0e3e5] text-center">
              <div className="w-9 h-9 sm:w-12 sm:h-12 rounded-full bg-[#131b2e]/10 flex items-center justify-center mx-auto mb-2 sm:mb-3">
                <span className="material-symbols-outlined text-[#131b2e] text-[18px] sm:text-[24px]">
                  location_on
                </span>
              </div>
              <p className="text-lg sm:text-2xl font-bold text-[#131b2e]">تتبع</p>
              <p className="text-[11px] sm:text-sm text-[#45464d]">شحنتك لحظياً</p>
            </div>
          </div>

          {/* Detail Sections */}
          <div className="space-y-3 sm:space-y-5">
            {/* General Info */}
            <div className="bg-white rounded-lg sm:rounded-xl p-4 sm:p-6 md:p-8 shadow-[0_4px_24px_rgba(0,0,0,0.04)] border border-[#e0e3e5]">
              <div className="flex items-center gap-2.5 sm:gap-3 mb-3 sm:mb-4">
                <div className="w-8 h-8 sm:w-10 sm:h-10 rounded-lg bg-[#131b2e] flex items-center justify-center shrink-0">
                  <span className="material-symbols-outlined text-white text-[16px] sm:text-[20px]">
                    info
                  </span>
                </div>
                <h2 className="text-base sm:text-lg md:text-xl font-semibold text-[#131b2e]">معلومات عامة</h2>
              </div>
              <div className="sm:pr-[44px] md:pr-[52px]">
                <p className="text-[13px] sm:text-[14px] md:text-[15px] text-[#45464d] leading-[1.7] sm:leading-[1.8]">
                  يتم احتساب الشحن والضرائب على أساس البلد وطريقة التسليم ويشار إليها عند إكمال الطلب.
                  خدمة الدفع نقداً عند التسليم متوفرة في المملكة العربية السعودية.
                </p>
              </div>
            </div>

            {/* Shipping Fees */}
            <div className="bg-white rounded-lg sm:rounded-xl p-4 sm:p-6 md:p-8 shadow-[0_4px_24px_rgba(0,0,0,0.04)] border border-[#e0e3e5]">
              <div className="flex items-center gap-2.5 sm:gap-3 mb-3 sm:mb-4">
                <div className="w-8 h-8 sm:w-10 sm:h-10 rounded-lg bg-[#775a19] flex items-center justify-center shrink-0">
                  <span className="material-symbols-outlined text-white text-[16px] sm:text-[20px]">
                    payments
                  </span>
                </div>
                <h2 className="text-base sm:text-lg md:text-xl font-semibold text-[#131b2e]">رسوم الشحن</h2>
              </div>
              <div className="sm:pr-[44px] md:pr-[52px]">
                <div className="bg-[#fed488]/20 border border-[#fed488]/40 rounded-lg p-3 sm:p-4">
                  <p className="text-[13px] sm:text-[14px] md:text-[15px] text-[#45464d] leading-[1.7] sm:leading-[1.8]">
                    شحن مجاني للطلبات الأعلى من{" "}
                    <span className="font-bold text-[#775a19] bg-[#fed488]/40 px-1.5 sm:px-2 py-0.5 rounded text-[12px] sm:text-[14px] md:text-[15px]">150 ريال</span>
                    {" "}داخل المملكة العربية السعودية
                  </p>
                </div>
              </div>
            </div>

            {/* Shipping Duration */}
            <div className="bg-white rounded-lg sm:rounded-xl p-4 sm:p-6 md:p-8 shadow-[0_4px_24px_rgba(0,0,0,0.04)] border border-[#e0e3e5]">
              <div className="flex items-center gap-2.5 sm:gap-3 mb-3 sm:mb-4">
                <div className="w-8 h-8 sm:w-10 sm:h-10 rounded-lg bg-[#005047] flex items-center justify-center shrink-0">
                  <span className="material-symbols-outlined text-white text-[16px] sm:text-[20px]">
                    schedule
                  </span>
                </div>
                <h2 className="text-base sm:text-lg md:text-xl font-semibold text-[#131b2e]">مدة الشحن</h2>
              </div>
              <div className="sm:pr-[44px] md:pr-[52px] space-y-2.5 sm:space-y-3">
                <p className="text-[13px] sm:text-[14px] md:text-[15px] text-[#45464d] leading-[1.7] sm:leading-[1.8]">
                  كل الطلبات سيتم شحنها وتسليمها من خلال شركات الشحن في حدود{" "}
                  <span className="font-bold text-[#005047]">1 إلى 5 أيام عمل</span>.
                </p>
                <div className="flex items-start sm:items-center gap-2 bg-[#3cddc7]/10 border border-[#3cddc7]/20 rounded-lg p-2.5 sm:p-3">
                  <span className="material-symbols-outlined text-[#005047] text-[16px] sm:text-[18px] shrink-0 mt-0.5 sm:mt-0">
                    track_changes
                  </span>
                  <p className="text-[12px] sm:text-[13px] md:text-sm text-[#45464d]">
                    يمكنك تتبع شحنتك من خلال تفاصيل الطلبات من صفحة طلباتي
                  </p>
                </div>
              </div>
            </div>
          </div>
        </section>
      </main>
      <Footer />
      <WhatsAppButton />
    </>
  );
}
