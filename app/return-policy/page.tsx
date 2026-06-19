import Header from "../components/Header";
import Footer from "../components/Footer";
import WhatsAppButton from "../components/WhatsAppButton";

export const metadata = {
  title: "سياسة الاسترجاع | مؤسسة سهلناها التقنيه",
};

export default function ReturnPolicyPage() {
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
              <span className="text-xs sm:text-sm text-white/80">ضمان حقوقك</span>
            </div>
            <h1 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold text-white mb-2 sm:mb-4 tracking-tight">
              سياسة الاسترجاع والاستبدال
            </h1>
            <p className="text-xs sm:text-sm md:text-base text-white/60 max-w-lg mx-auto leading-relaxed">
              نسعى دائمًا لضمان رضاك. إذا لم تكن راضيًا عن عملية الشراء، يمكنك الاستبدال أو الاسترجاع وفقًا للشروط التالية
            </p>
          </div>
        </section>

        {/* Content */}
        <section className="max-w-[900px] mx-auto px-3 sm:px-6 md:px-8 -mt-8 sm:-mt-10 md:-mt-14 relative z-10 pb-12 sm:pb-16 md:pb-24">
          {/* Highlight Cards */}
          <div className="grid grid-cols-3 gap-2 sm:gap-4 mb-6 sm:mb-10">
            <div className="bg-white rounded-lg sm:rounded-xl p-3 sm:p-5 shadow-[0_4px_24px_rgba(0,0,0,0.04)] border border-[#e0e3e5] text-center">
              <div className="w-9 h-9 sm:w-12 sm:h-12 rounded-full bg-[#005047]/10 flex items-center justify-center mx-auto mb-2 sm:mb-3">
                <span className="material-symbols-outlined text-[#005047] text-[18px] sm:text-[24px]">
                  schedule
                </span>
              </div>
              <p className="text-lg sm:text-2xl font-bold text-[#131b2e]">3 أيام</p>
              <p className="text-[11px] sm:text-sm text-[#45464d]">للاسترجاع</p>
            </div>
            <div className="bg-white rounded-lg sm:rounded-xl p-3 sm:p-5 shadow-[0_4px_24px_rgba(0,0,0,0.04)] border border-[#e0e3e5] text-center">
              <div className="w-9 h-9 sm:w-12 sm:h-12 rounded-full bg-[#775a19]/10 flex items-center justify-center mx-auto mb-2 sm:mb-3">
                <span className="material-symbols-outlined text-[#775a19] text-[18px] sm:text-[24px]">
                  swap_horiz
                </span>
              </div>
              <p className="text-lg sm:text-2xl font-bold text-[#131b2e]">7 أيام</p>
              <p className="text-[11px] sm:text-sm text-[#45464d]">للاستبدال</p>
            </div>
            <div className="bg-white rounded-lg sm:rounded-xl p-3 sm:p-5 shadow-[0_4px_24px_rgba(0,0,0,0.04)] border border-[#e0e3e5] text-center">
              <div className="w-9 h-9 sm:w-12 sm:h-12 rounded-full bg-[#131b2e]/10 flex items-center justify-center mx-auto mb-2 sm:mb-3">
                <span className="material-symbols-outlined text-[#131b2e] text-[18px] sm:text-[24px]">
                  payments
                </span>
              </div>
              <p className="text-lg sm:text-2xl font-bold text-[#131b2e]">3-14</p>
              <p className="text-[11px] sm:text-sm text-[#45464d]">يوم للاسترداد</p>
            </div>
          </div>

          {/* Detail Sections */}
          <div className="space-y-3 sm:space-y-5">
            {/* شروط الاستبدال والاسترجاع */}
            <div className="bg-white rounded-lg sm:rounded-xl p-4 sm:p-6 md:p-8 shadow-[0_4px_24px_rgba(0,0,0,0.04)] border border-[#e0e3e5]">
              <div className="flex items-center gap-2.5 sm:gap-3 mb-3 sm:mb-4">
                <div className="w-8 h-8 sm:w-10 sm:h-10 rounded-lg bg-[#005047] flex items-center justify-center shrink-0">
                  <span className="material-symbols-outlined text-white text-[16px] sm:text-[20px]">
                    checklist
                  </span>
                </div>
                <h2 className="text-sm sm:text-lg md:text-xl font-semibold text-[#131b2e]">شروط الاستبدال والاسترجاع</h2>
              </div>
              <div className="sm:pr-[44px] md:pr-[52px]">
                <ul className="space-y-2.5">
                  {[
                    "يجب أن يكون المنتج في حالته الأصلية وغير مفتوح",
                    "يجب أن يكون المنتج في عبوته الأصلية مع جميع الملحقات والملصقات",
                    "يجب تقديم إيصال الشراء أو إثبات الدفع",
                  ].map((item, i) => (
                    <li key={i} className="flex items-start gap-2 text-[12px] sm:text-[13px] md:text-[15px] text-[#45464d] leading-[1.7]">
                      <span className="material-symbols-outlined text-[#005047] text-[14px] sm:text-[16px] mt-0.5 shrink-0">check_circle</span>
                      <span>{item}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>

            {/* المنتجات غير القابلة للاسترجاع */}
            <div className="bg-white rounded-lg sm:rounded-xl p-4 sm:p-6 md:p-8 shadow-[0_4px_24px_rgba(0,0,0,0.04)] border border-[#e0e3e5]">
              <div className="flex items-center gap-2.5 sm:gap-3 mb-3 sm:mb-4">
                <div className="w-8 h-8 sm:w-10 sm:h-10 rounded-lg bg-[#ba1a1a] flex items-center justify-center shrink-0">
                  <span className="material-symbols-outlined text-white text-[16px] sm:text-[20px]">
                    block
                  </span>
                </div>
                <h2 className="text-sm sm:text-lg md:text-xl font-semibold text-[#131b2e]">المنتجات غير القابلة للاسترجاع</h2>
              </div>
              <div className="sm:pr-[44px] md:pr-[52px]">
                <div className="bg-[#ffdad6]/30 border border-[#ffdad6] rounded-lg p-3 sm:p-4">
                  <ul className="space-y-2.5">
                    {[
                      "الأجهزة الإلكترونية التي تم فتحها أو استخدامها",
                      "لا يسمح باسترجاع الأجهزة التي تم تفعيلها أو تسجيلها بحساب المستخدم",
                      "لا يسمح باسترجاع الملحقات والإكسسوارات بعد فتحها",
                      "المنتج المستخدم لا يتم استرجاعه إلا في حالة وجود عيب مصنعي",
                      "الاستبدال سيكون بنفس المنتج في حال وجود عيب مصنعي فقط",
                    ].map((item, i) => (
                      <li key={i} className="flex items-start gap-2 text-[12px] sm:text-[13px] md:text-[15px] text-[#45464d] leading-[1.7]">
                        <span className="material-symbols-outlined text-[#ba1a1a] text-[14px] sm:text-[16px] mt-0.5 shrink-0">close</span>
                        <span>{item}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            </div>

            {/* إجراءات الاسترجاع */}
            <div className="bg-white rounded-lg sm:rounded-xl p-4 sm:p-6 md:p-8 shadow-[0_4px_24px_rgba(0,0,0,0.04)] border border-[#e0e3e5]">
              <div className="flex items-center gap-2.5 sm:gap-3 mb-3 sm:mb-4">
                <div className="w-8 h-8 sm:w-10 sm:h-10 rounded-lg bg-[#131b2e] flex items-center justify-center shrink-0">
                  <span className="material-symbols-outlined text-white text-[16px] sm:text-[20px]">
                    store
                  </span>
                </div>
                <h2 className="text-sm sm:text-lg md:text-xl font-semibold text-[#131b2e]">إجراءات الاستبدال والاسترجاع</h2>
              </div>
              <div className="sm:pr-[44px] md:pr-[52px]">
                <p className="text-[12px] sm:text-[13px] md:text-[15px] text-[#45464d] leading-[1.7]">
                  يتم توجيه العملاء إلى أي من فروعنا لإتمام عملية الاستبدال أو الاسترجاع.
                </p>
              </div>
            </div>

            {/* استرداد المبلغ */}
            <div className="bg-white rounded-lg sm:rounded-xl p-4 sm:p-6 md:p-8 shadow-[0_4px_24px_rgba(0,0,0,0.04)] border border-[#e0e3e5]">
              <div className="flex items-center gap-2.5 sm:gap-3 mb-3 sm:mb-4">
                <div className="w-8 h-8 sm:w-10 sm:h-10 rounded-lg bg-[#775a19] flex items-center justify-center shrink-0">
                  <span className="material-symbols-outlined text-white text-[16px] sm:text-[20px]">
                    account_balance_wallet
                  </span>
                </div>
                <h2 className="text-sm sm:text-lg md:text-xl font-semibold text-[#131b2e]">استرداد المبلغ</h2>
              </div>
              <div className="sm:pr-[44px] md:pr-[52px]">
                <div className="bg-[#fed488]/20 border border-[#fed488]/40 rounded-lg p-3 sm:p-4">
                  <ul className="space-y-2.5">
                    <li className="flex items-start gap-2 text-[12px] sm:text-[13px] md:text-[15px] text-[#45464d] leading-[1.7]">
                      <span className="material-symbols-outlined text-[#775a19] text-[14px] sm:text-[16px] mt-0.5 shrink-0">check_circle</span>
                      <span>يتم استرداد المبلغ بنفس طريقة الدفع الأصلية</span>
                    </li>
                    <li className="flex items-start gap-2 text-[12px] sm:text-[13px] md:text-[15px] text-[#45464d] leading-[1.7]">
                      <span className="material-symbols-outlined text-[#775a19] text-[14px] sm:text-[16px] mt-0.5 shrink-0">check_circle</span>
                      <span>قد يستغرق استرداد المبلغ من <strong className="text-[#775a19]">3 إلى 7 أيام عمل</strong>، وقد تصل المدة إلى 14 يوم عمل</span>
                    </li>
                  </ul>
                </div>
              </div>
            </div>

            {/* التواصل */}
            <div className="bg-white rounded-lg sm:rounded-xl p-4 sm:p-6 md:p-8 shadow-[0_4px_24px_rgba(0,0,0,0.04)] border border-[#e0e3e5]">
              <div className="flex items-center gap-2.5 sm:gap-3 mb-3 sm:mb-4">
                <div className="w-8 h-8 sm:w-10 sm:h-10 rounded-lg bg-[#005047] flex items-center justify-center shrink-0">
                  <span className="material-symbols-outlined text-white text-[16px] sm:text-[20px]">
                    support_agent
                  </span>
                </div>
                <h2 className="text-sm sm:text-lg md:text-xl font-semibold text-[#131b2e]">تواصل معنا</h2>
              </div>
              <div className="sm:pr-[44px] md:pr-[52px] flex flex-col sm:flex-row gap-2 sm:gap-4">
                <a href="tel:0592069730" className="flex items-center gap-2 bg-[#f7f9fb] border border-[#e0e3e5] rounded-lg px-3 sm:px-4 py-2.5 hover:border-[#131b2e] transition-colors">
                  <span className="material-symbols-outlined text-[#131b2e] text-[16px] sm:text-[18px]">phone</span>
                  <span className="text-[12px] sm:text-[13px] md:text-sm font-medium text-[#131b2e]" dir="ltr">0592069730</span>
                </a>
                <a href="https://wa.me/966592069730" target="_blank" rel="noopener noreferrer" className="flex items-center gap-2 bg-[#005047]/5 border border-[#3cddc7]/30 rounded-lg px-3 sm:px-4 py-2.5 hover:border-[#005047] transition-colors">
                  <span className="material-symbols-outlined text-[#005047] text-[16px] sm:text-[18px]">chat</span>
                  <span className="text-[12px] sm:text-[13px] md:text-sm font-medium text-[#005047]" dir="ltr">واتساب</span>
                </a>
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
