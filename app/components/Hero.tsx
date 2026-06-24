export default function Hero() {
  return (
    <section className="relative w-full h-[700px] overflow-hidden">
      <div
        className="absolute inset-0 bg-cover bg-center"
        style={{
          backgroundImage:
            "url('https://lh3.googleusercontent.com/aida-public/AB6AXuB6OH72HlWKWY10rA9QXeKZToGbx4Mcx_M2EW25KVC3MN_Qyfu3YzPUSEsBzDEjKCQtwZKCK-GS5R6SxJan7zSTZ5eGCt3LL8HGNeTGAvz0on3dmmey0wkDvgbUMlUI2TzRwxrix9YHjHlwW1IPXiI-Z6P8sKQiSsI_gz-XDXaB37zS-rIB_SfJOthrcdA2GYaNSJYgVl4W2soO1KCSPVpzumcWafRejq8g4XeDZGipVVp5cf6mxJWNWwjNkN1CPhe7W7_TwpUuumI9')",
        }}
      >
        <div className="absolute inset-0 bg-black/30" />
      </div>
      <div className="relative z-10 flex flex-col justify-center items-start h-full max-w-[1280px] mx-auto px-4 sm:px-6 lg:px-12 text-right">
        <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-[60px] lg:leading-[72px] font-bold text-white max-w-3xl mb-6 leading-tight tracking-tight">
          اجعل منزلك تحفة فنية - مفروشات راقية تعكس ذوقك
        </h1>
        <p className="text-base sm:text-lg text-white/90 max-w-xl mb-12">
          اكتشف مجموعتنا الحصرية من المفروشات والأثاث المنزلي التي تجمع بين الأناقة والجودة العالية لتحويل منزلك إلى مكان الراحة والجمال.
        </p>
        <a
          href="/products"
          className="bg-[#fed488] text-[#785a1a] px-10 py-4 rounded-lg text-lg sm:text-xl font-medium hover:bg-[#ffdea5] transition-all shadow-lg active:scale-95"
        >
          تسوق الآن
        </a>
      </div>
    </section>
  );
}
