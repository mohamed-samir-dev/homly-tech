"use client";

export default function LoadingScreen() {
  return (
    <main className="min-h-[70vh] flex flex-col items-center justify-center gap-4" dir="rtl">
      <div className="w-16 h-16 rounded-full border-4 border-[#131b2e] border-t-transparent animate-spin" />
      <p className="text-[#888] text-sm">جارٍ التحقق من الدفع...</p>
    </main>
  );
}
