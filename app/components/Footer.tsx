export default function Footer() {
  return (
    <footer dir="rtl" className="bg-[#0A1A2F] text-white/70 mt-8 sm:mt-12 md:mt-16">
      <div className="max-w-[1280px] mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-10 md:py-12">
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-6 sm:gap-8 md:gap-10 pb-8 md:pb-10 border-b border-[#1E90FF]/20">
          <div className="col-span-2 lg:col-span-1">
            <h3 className="text-base sm:text-lg md:text-xl font-bold text-white mb-3 md:mb-4">هوملي للمفروشات المنزلية</h3>
            <p className="text-white/50 leading-relaxed text-xs sm:text-sm">
              وجهتكم الأولى لأفخم المفروشات والأثاث المنزلي بتصاميم راقية تناسب كل ذوق وبأفضل الأسعار.
            </p>
            <a href="/commercial-register" className="mt-3 md:mt-4 bg-[#0F3D5E] rounded-lg p-2.5 sm:p-3 border border-[#1E90FF]/20 block hover:border-[#1E90FF]/50 transition-colors group">
              <div className="flex items-center gap-2">
                <span className="material-symbols-outlined text-[#2ECC71] text-base sm:text-lg">verified</span>
                <span className="text-xs text-white/50">السجل التجاري</span>
              </div>
              <span className="text-white font-bold text-sm sm:text-lg block mt-1">7054284067</span>
              <span className="text-[10px] sm:text-xs text-[#1E90FF] group-hover:underline mt-1 block">اضغط هنا لعرض السجل التجاري</span>
            </a>
          </div>

          <div>
            <h4 className="text-white font-bold text-sm sm:text-base mb-3 md:mb-4">الروابط السريعة</h4>
            <ul className="space-y-2 sm:space-y-3">
              <li><a className="text-white/50 hover:text-[#1E90FF] transition-colors text-xs sm:text-sm" href="/about">عن هوملي</a></li>
              <li><a className="text-white/50 hover:text-[#1E90FF] transition-colors text-xs sm:text-sm" href="/contact">اتصل بنا</a></li>
            </ul>
          </div>

          <div>
            <h4 className="text-white font-bold text-sm sm:text-base mb-3 md:mb-4">قانوني</h4>
            <ul className="space-y-2 sm:space-y-3">
              <li><a className="text-white/50 hover:text-[#1E90FF] transition-colors text-xs sm:text-sm" href="/privacy">سياسة الخصوصية</a></li>
              <li><a className="text-white/50 hover:text-[#1E90FF] transition-colors text-xs sm:text-sm" href="/terms">الشروط والأحكام</a></li>
              <li><a className="text-white/50 hover:text-[#1E90FF] transition-colors text-xs sm:text-sm" href="/return-policy">سياسة الإرجاع</a></li>
              <li><a className="text-white/50 hover:text-[#1E90FF] transition-colors text-xs sm:text-sm" href="/shipping-policy">سياسة الشحن</a></li>
            </ul>
          </div>

          <div className="col-span-2 sm:col-span-1">
            <h4 className="text-white font-bold text-sm sm:text-base mb-3 md:mb-4">تواصل معنا</h4>
            <a
              href="https://wa.me/966592069730"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-2 sm:gap-3 bg-[#2ECC71] hover:bg-[#2ECC71]/80 text-white rounded-lg px-3 sm:px-4 py-2.5 sm:py-3 transition-colors"
            >
              <svg className="w-5 h-5 sm:w-6 sm:h-6 fill-current shrink-0" viewBox="0 0 24 24">
                <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/>
              </svg>
              <div>
                <span className="text-[10px] sm:text-xs opacity-80">واتساب</span>
                <span className="block font-bold text-xs sm:text-sm" dir="ltr">0592069730</span>
              </div>
            </a>
          </div>
        </div>

        <div className="pt-4 sm:pt-6 text-center text-xs sm:text-sm text-white/40">
          © 2026 هوملي للمفروشات المنزلية. جميع الحقوق محفوظة
        </div>
      </div>
    </footer>
  );
}
