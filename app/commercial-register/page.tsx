import Header from "../components/Header";
import Footer from "../components/Footer";
import WhatsAppButton from "../components/WhatsAppButton";

export const metadata = {
  title: "السجل التجاري | مؤسسة سهلناها التقنيه",
};

export default function CommercialRegisterPage() {
  return (
    <>
      <Header />
      <main dir="rtl" className="max-w-[900px] mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-16">
        <div className="text-center mb-8">
          <h1 className="text-2xl sm:text-3xl md:text-4xl font-bold text-on-surface">
            السجل التجاري
          </h1>
          <p className="text-sm sm:text-base text-on-surface-variant mt-3">
            رقم السجل التجاري: <span className="font-bold">7054284067</span>
          </p>
        </div>
        <div className="bg-white rounded-2xl border border-outline-variant/20 shadow-sm overflow-hidden">
          <iframe
            src="/سجل تجاري مؤسسة سهلناها التقنيه.pdf"
            className="w-full h-[70vh] sm:h-[80vh]"
            title="السجل التجاري - مؤسسة سهلناها التقنيه"
          />
        </div>
      </main>
      <Footer />
      <WhatsAppButton />
    </>
  );
}
