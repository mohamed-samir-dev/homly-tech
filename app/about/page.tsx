import Header from "../components/Header";
import Footer from "../components/Footer";
import WhatsAppButton from "../components/WhatsAppButton";

export const metadata = {
  title: "من نحن | مؤسسة سهلناها التقنيه",
  description: "تعرف على مؤسسة سهلناها التقنيه - وجهتكم الأولى لأحدث الأجهزة الإلكترونية في المملكة العربية السعودية",
};

export default function AboutPage() {
  return (
    <>
      <Header />
      <main className="min-h-screen bg-[#f7f9fb]">
        {/* Hero Section */}
        <section className="bg-[#131b2e] py-16 md:py-24 relative overflow-hidden">
          <div className="absolute inset-0 opacity-10">
            <div className="absolute top-0 right-1/4 w-72 h-72 bg-[#fed488] rounded-full blur-[120px]" />
            <div className="absolute bottom-0 left-1/3 w-96 h-96 bg-[#3cddc7] rounded-full blur-[150px]" />
          </div>
          <div className="max-w-[1280px] mx-auto px-4 sm:px-6 lg:px-12 text-center relative z-10">
            <span className="inline-block text-[#e9c176] text-sm font-medium tracking-[0.05em] uppercase mb-4">من نحن</span>
            <h1 className="text-3xl sm:text-4xl md:text-[60px] font-bold text-white leading-tight md:leading-[72px] tracking-tight mb-4">
              مؤسسة سهلناها التقنيه
            </h1>
            <p className="text-[#e0e3e5] text-base sm:text-lg max-w-xl mx-auto leading-7">
              شريككم الموثوق في عالم التقنية والأجهزة الإلكترونية
            </p>
          </div>
        </section>

        {/* Content */}
        <div className="max-w-[1280px] mx-auto px-4 sm:px-6 lg:px-12 -mt-12 relative z-20 pb-20">
          {/* About + Info Grid */}
          <div className="grid lg:grid-cols-5 gap-6 md:gap-8 mb-16">
            <div className="lg:col-span-3 bg-white rounded-xl p-6 sm:p-8 shadow-[0_4px_12px_rgba(19,27,46,0.04)] border border-[#c6c6cd]/40">
              <h2 className="text-2xl font-semibold text-[#191c1e] mb-4">قصتنا</h2>
              <p className="text-[#45464d] leading-7 mb-4">
                نحن مؤسسة سعودية متخصصة في توفير أحدث الأجهزة الإلكترونية والتقنيات المنزلية والمكتبية بأعلى جودة وأفضل الأسعار. نسعى لأن نكون الوجهة الأولى لعملائنا في المملكة العربية السعودية.
              </p>
              <p className="text-[#45464d] leading-7">
                نؤمن بأن التقنية يجب أن تكون في متناول الجميع، ولذلك نحرص على تقديم منتجات عالية الجودة بأسعار تنافسية مع خدمة عملاء متميزة تضمن رضاكم التام.
              </p>
            </div>

            <div className="lg:col-span-2 bg-white rounded-xl p-6 sm:p-8 shadow-[0_4px_12px_rgba(19,27,46,0.04)] border border-[#c6c6cd]/40">
              <h3 className="text-lg font-semibold text-[#191c1e] mb-6">معلومات المؤسسة</h3>
              <div className="space-y-5">
                <div className="flex items-center gap-4">
                  <div className="w-10 h-10 bg-[#131b2e] rounded-lg flex items-center justify-center">
                    <span className="material-symbols-outlined text-[#bec6e0] text-xl">store</span>
                  </div>
                  <span className="text-[#191c1e] text-sm font-medium">مؤسسة سهلناها التقنيه</span>
                </div>
                <a href="/commercial-register" className="flex items-center gap-4 group">
                  <div className="w-10 h-10 bg-[#005047] rounded-lg flex items-center justify-center">
                    <span className="material-symbols-outlined text-[#3cddc7] text-xl">verified</span>
                  </div>
                  <span className="text-[#191c1e] text-sm font-medium group-hover:text-[#005047] transition-colors">السجل التجاري: 7054284067</span>
                </a>
                <div className="flex items-center gap-4">
                  <div className="w-10 h-10 bg-[#131b2e] rounded-lg flex items-center justify-center">
                    <span className="material-symbols-outlined text-[#bec6e0] text-xl">location_on</span>
                  </div>
                  <span className="text-[#191c1e] text-sm font-medium">المملكة العربية السعودية</span>
                </div>
                <div className="flex items-center gap-4">
                  <div className="w-10 h-10 bg-[#131b2e] rounded-lg flex items-center justify-center">
                    <span className="material-symbols-outlined text-[#bec6e0] text-xl">phone</span>
                  </div>
                  <span className="text-[#191c1e] text-sm font-medium" dir="ltr">0592069730</span>
                </div>
              </div>
            </div>
          </div>

          {/* Values Section */}
          <section className="mb-16">
            <div className="text-center mb-10">
              <span className="inline-block text-[#e9c176] text-xs font-medium tracking-[0.05em] uppercase mb-2">مميزاتنا</span>
              <h2 className="text-2xl sm:text-[30px] font-semibold text-[#191c1e]">لماذا سهلناها؟</h2>
            </div>
            <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6">
              {[
                { icon: "verified", title: "منتجات أصلية", desc: "نضمن أصالة جميع منتجاتنا بكفالة رسمية" },
                { icon: "local_shipping", title: "توصيل سريع", desc: "نوصل طلبك بأسرع وقت لباب بيتك" },
                { icon: "support_agent", title: "دعم متواصل", desc: "فريق دعم جاهز لخدمتكم على مدار الساعة" },
                { icon: "payments", title: "أسعار منافسة", desc: "أفضل الأسعار مع عروض وخصومات مستمرة" },
              ].map((item) => (
                <div key={item.title} className="bg-white rounded-xl p-5 sm:p-6 text-center shadow-[0_4px_12px_rgba(19,27,46,0.04)] border border-[#c6c6cd]/40 hover:shadow-[0_8px_24px_rgba(19,27,46,0.08)] hover:border-[#3cddc7]/40 transition-all">
                  <div className="w-12 h-12 bg-[#131b2e] rounded-lg flex items-center justify-center mx-auto mb-4">
                    <span className="material-symbols-outlined text-[#3cddc7] text-2xl">{item.icon}</span>
                  </div>
                  <h3 className="font-semibold text-[#191c1e] text-sm sm:text-base mb-2">{item.title}</h3>
                  <p className="text-[#45464d] text-xs sm:text-sm leading-5">{item.desc}</p>
                </div>
              ))}
            </div>
          </section>

          {/* Vision & Mission */}
          <section className="grid md:grid-cols-2 gap-6">
            <div className="bg-gradient-to-br from-[#131b2e] to-[#3f465c] rounded-xl p-6 sm:p-8">
              <div className="w-10 h-10 bg-white/10 rounded-lg flex items-center justify-center mb-4">
                <span className="material-symbols-outlined text-[#e9c176]">visibility</span>
              </div>
              <h3 className="text-xl font-semibold text-white mb-3">رؤيتنا</h3>
              <p className="text-[#bec6e0] leading-7 text-sm">
                أن نكون المنصة الرائدة في مجال الأجهزة الإلكترونية في المملكة العربية السعودية، ونقدم تجربة تسوق إلكتروني متميزة وموثوقة.
              </p>
            </div>
            <div className="bg-gradient-to-br from-[#775a19] to-[#5d4201] rounded-xl p-6 sm:p-8">
              <div className="w-10 h-10 bg-white/10 rounded-lg flex items-center justify-center mb-4">
                <span className="material-symbols-outlined text-[#fed488]">rocket_launch</span>
              </div>
              <h3 className="text-xl font-semibold text-white mb-3">رسالتنا</h3>
              <p className="text-[#fed488]/80 leading-7 text-sm">
                توفير أحدث الأجهزة الإلكترونية بجودة عالية وأسعار تنافسية، مع تقديم خدمة عملاء استثنائية تلبي تطلعات عملائنا وتتجاوز توقعاتهم.
              </p>
            </div>
          </section>
        </div>
      </main>
      <Footer />
      <WhatsAppButton />
    </>
  );
}
