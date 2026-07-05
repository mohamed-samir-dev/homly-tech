"use client";
import { useState } from "react";
import { useRouter } from "next/navigation";

const API_URL = process.env.NEXT_PUBLIC_API_URL || "http://localhost:5000";

export default function AdminLoginPage() {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    setLoading(true);
    try {
      const res = await fetch(`${API_URL}/api/admin/login`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, password }),
      });
      const data = await res.json();
      if (data.success) {
        localStorage.setItem("admin_token", data.data.token);
        router.push("/admin/payments");
      } else {
        setError(data.message || "بيانات الدخول غير صحيحة");
      }
    } catch {
      setError("فشل الاتصال بالسيرفر");
    }
    setLoading(false);
  };

  return (
    <main dir="rtl" className="min-h-screen bg-[#f7f9fb] flex items-center justify-center p-4">
      <form onSubmit={handleSubmit} className="bg-white rounded-2xl shadow-lg p-8 w-full max-w-sm">
        <h1 className="text-2xl font-bold text-[#131b2e] mb-6 text-center">دخول الأدمن</h1>

        {error && <p className="text-red-600 text-sm text-center mb-4 bg-red-50 p-2 rounded-lg">{error}</p>}

        <label className="block text-sm font-bold text-[#131b2e] mb-1">البريد الإلكتروني</label>
        <input
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
          className="w-full border border-[#e8e8e8] rounded-xl px-4 py-3 mb-4 text-sm focus:outline-none focus:border-[#131b2e]"
          placeholder="admin@madar.com"
        />

        <label className="block text-sm font-bold text-[#131b2e] mb-1">كلمة المرور</label>
        <input
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
          className="w-full border border-[#e8e8e8] rounded-xl px-4 py-3 mb-6 text-sm focus:outline-none focus:border-[#131b2e]"
          placeholder="••••••••"
        />

        <button
          type="submit"
          disabled={loading}
          className="w-full bg-[#131b2e] text-white font-bold py-3 rounded-xl hover:bg-[#775a19] transition-all disabled:opacity-50"
        >
          {loading ? "جاري الدخول..." : "تسجيل الدخول"}
        </button>
      </form>
    </main>
  );
}
