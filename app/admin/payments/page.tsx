"use client";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";

const API_URL = process.env.NEXT_PUBLIC_API_URL || "http://localhost:5000";

type Transaction = {
  _id: string;
  orderId: { _id: string; customerName: string; phone: string; totalPrice: number; createdAt: string } | null;
  gateway: string;
  gatewayTransactionId: string;
  amount: number;
  status: string;
  verificationAttempts: number;
  lastVerifiedAt: string | null;
  createdAt: string;
};

type Stats = { pending: number; paid: number; failed: number; total: number };

export default function PaymentsAdminPage() {
  const router = useRouter();
  const [transactions, setTransactions] = useState<Transaction[]>([]);
  const [stats, setStats] = useState<Stats | null>(null);
  const [loading, setLoading] = useState(true);
  const [token, setToken] = useState("");
  const [actionLoading, setActionLoading] = useState<string | null>(null);

  useEffect(() => {
    const t = localStorage.getItem("admin_token");
    if (!t) { router.push("/admin/login"); return; }
    setToken(t);
  }, [router]);

  const headers = { "Content-Type": "application/json", Authorization: `Bearer ${token}` };

  const fetchData = async () => {
    if (!token) return;
    setLoading(true);
    try {
      const [txRes, statsRes] = await Promise.all([
        fetch(`${API_URL}/api/payments/pending`, { headers }),
        fetch(`${API_URL}/api/payments/stats`, { headers }),
      ]);
      const txData = await txRes.json();
      const statsData = await statsRes.json();
      if (txData.success) setTransactions(txData.data);
      if (statsData.success) setStats(statsData.data);
    } catch { /* ignore */ }
    setLoading(false);
  };

  useEffect(() => { fetchData(); }, [token]);

  const handleReVerify = async (id: string) => {
    setActionLoading(id);
    try {
      const res = await fetch(`${API_URL}/api/payments/${id}/re-verify`, { method: "POST", headers });
      const data = await res.json();
      alert(data.message);
      fetchData();
    } catch { alert("فشل الاتصال"); }
    setActionLoading(null);
  };

  const handleResolve = async (id: string, action: "confirm_paid" | "mark_failed") => {
    const notes = prompt("ملاحظات (اختياري):");
    setActionLoading(id);
    try {
      const res = await fetch(`${API_URL}/api/payments/${id}/resolve`, {
        method: "POST", headers,
        body: JSON.stringify({ action, notes: notes || undefined }),
      });
      const data = await res.json();
      alert(data.message);
      fetchData();
    } catch { alert("فشل الاتصال"); }
    setActionLoading(null);
  };

  const statusBadge = (s: string) => {
    const map: Record<string, string> = {
      initiated: "bg-blue-100 text-blue-700",
      pending_verification: "bg-amber-100 text-amber-700",
      paid: "bg-green-100 text-green-700",
      failed: "bg-red-100 text-red-700",
    };
    const labels: Record<string, string> = {
      initiated: "بدأت",
      pending_verification: "قيد التحقق",
      paid: "مدفوع",
      failed: "فشل",
    };
    return <span className={`px-2 py-1 rounded-lg text-xs font-bold ${map[s] || "bg-gray-100"}`}>{labels[s] || s}</span>;
  };

  return (
    <main dir="rtl" className="min-h-screen bg-[#f7f9fb] p-6">
      <div className="max-w-[1200px] mx-auto">
        <h1 className="text-2xl font-bold text-[#131b2e] mb-2">إدارة المدفوعات المعلقة</h1>
        <p className="text-sm text-[#888] mb-6">نظام التوفيق التلقائي - يتحقق كل 5 دقائق</p>

        {/* Stats */}
        {stats && (
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 mb-8">
            {[
              { label: "معلقة", value: stats.pending, color: "text-amber-600" },
              { label: "مدفوعة", value: stats.paid, color: "text-green-600" },
              { label: "فاشلة", value: stats.failed, color: "text-red-600" },
              { label: "إجمالي", value: stats.total, color: "text-[#131b2e]" },
            ].map((s) => (
              <div key={s.label} className="bg-white rounded-xl p-4 shadow-sm">
                <p className="text-xs text-[#888]">{s.label}</p>
                <p className={`text-2xl font-bold ${s.color}`}>{s.value}</p>
              </div>
            ))}
          </div>
        )}

        {/* Transactions */}
        {loading ? (
          <div className="text-center py-16">
            <div className="w-8 h-8 border-4 border-[#131b2e] border-t-transparent rounded-full animate-spin mx-auto" />
          </div>
        ) : transactions.length === 0 ? (
          <div className="bg-white rounded-2xl p-12 text-center shadow-sm">
            <span className="material-symbols-outlined text-5xl text-green-400 mb-3 block">check_circle</span>
            <p className="text-lg font-bold text-[#131b2e]">لا توجد مدفوعات معلقة</p>
            <p className="text-sm text-[#888]">جميع العمليات تمت معالجتها</p>
          </div>
        ) : (
          <div className="flex flex-col gap-4">
            {transactions.map((tx) => (
              <div key={tx._id} className="bg-white rounded-2xl p-5 shadow-sm border border-[#e8e8e8]">
                <div className="flex flex-wrap items-start justify-between gap-3 mb-3">
                  <div>
                    <p className="font-bold text-[#131b2e]">{tx.orderId?.customerName || "—"}</p>
                    <p className="text-xs text-[#888]">{tx.orderId?.phone}</p>
                  </div>
                  <div className="flex items-center gap-2">
                    {statusBadge(tx.status)}
                    <span className="text-xs bg-gray-100 px-2 py-1 rounded-lg">{tx.gateway}</span>
                  </div>
                </div>

                <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 text-sm mb-4">
                  <div><span className="text-[#888] text-xs">المبلغ</span><p className="font-bold">{tx.amount} ر.س</p></div>
                  <div><span className="text-[#888] text-xs">محاولات التحقق</span><p className="font-bold">{tx.verificationAttempts}</p></div>
                  <div><span className="text-[#888] text-xs">معرف البوابة</span><p className="font-mono text-xs">{tx.gatewayTransactionId?.slice(0, 20)}</p></div>
                  <div><span className="text-[#888] text-xs">التاريخ</span><p>{new Date(tx.createdAt).toLocaleString("ar-SA")}</p></div>
                </div>

                <div className="flex flex-wrap gap-2">
                  <button
                    onClick={() => handleReVerify(tx._id)}
                    disabled={actionLoading === tx._id}
                    className="px-4 py-2 bg-blue-600 text-white text-xs font-bold rounded-xl hover:bg-blue-700 disabled:opacity-50"
                  >
                    إعادة التحقق من البوابة
                  </button>
                  <button
                    onClick={() => handleResolve(tx._id, "confirm_paid")}
                    disabled={actionLoading === tx._id}
                    className="px-4 py-2 bg-green-600 text-white text-xs font-bold rounded-xl hover:bg-green-700 disabled:opacity-50"
                  >
                    تأكيد الدفع يدوياً
                  </button>
                  <button
                    onClick={() => handleResolve(tx._id, "mark_failed")}
                    disabled={actionLoading === tx._id}
                    className="px-4 py-2 bg-red-600 text-white text-xs font-bold rounded-xl hover:bg-red-700 disabled:opacity-50"
                  >
                    تسجيل كفاشل
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}

        <button onClick={fetchData} className="mt-6 px-6 py-3 bg-[#131b2e] text-white rounded-xl font-bold hover:bg-[#775a19] transition-all">
          تحديث البيانات
        </button>
      </div>
    </main>
  );
}
