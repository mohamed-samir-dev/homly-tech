"use client";
import { useEffect, useState, useRef } from "react";
import { useSearchParams } from "next/navigation";
import { useCart } from "../context/CartContext";
import { Order, API_URL } from "./types";
import LoadingScreen from "./LoadingScreen";
import Invoice from "./Invoice";
import PendingVerificationPage from "./PendingVerificationPage";
import FailurePage from "./FailurePage";

export default function OrderResultContent() {
  const searchParams = useSearchParams();
  const { clearCart } = useCart();
  const orderId = searchParams.get("id");
  const verify = searchParams.get("verify");
  const invoiceId = searchParams.get("invoiceId");
  const resourcePath = searchParams.get("resourcePath");
  const cartCleared = useRef(false);

  const [status, setStatus] = useState<"loading" | "paid" | "failed" | "cash" | "pending_verification">(
    verify === "mf" || verify === "hyperpay" ? "loading" : "cash"
  );
  const [order, setOrder] = useState<Order | null>(null);

  // مسح السلة بعد تأكيد الدفع فقط
  useEffect(() => {
    if ((status === "paid" || status === "cash") && !cartCleared.current) {
      cartCleared.current = true;
      clearCart();
      localStorage.removeItem("pendingOrderId");
    }
  }, [status, clearCart]);

  // جلب بيانات الأوردر
  useEffect(() => {
    if (!orderId) return;
    fetch(`${API_URL}/api/orders/${orderId}/receipt`)
      .then((r) => r.json())
      .then((d) => { if (d.success) setOrder(d.data); })
      .catch(() => {});
  }, [orderId]);

  // التحقق من الدفع
  useEffect(() => {
    if (!orderId) return;

    if (verify === "mf") {
      const errorStatus = searchParams.get("status");
      const id = invoiceId || searchParams.get("InvoiceId") || searchParams.get("paymentId");

      if (!id && errorStatus === "error") {
        setStatus("failed");
        return;
      }

      if (!id) {
        fetch(`${API_URL}/api/orders/${orderId}/receipt`)
          .then((r) => r.json())
          .then((d) => {
            const mfId = d.data?.mfInvoiceId;
            if (!mfId) { setStatus("failed"); return; }
            return fetch(`${API_URL}/api/orders/${orderId}/verify-payment?invoiceId=${mfId}`)
              .then((r) => r.json().then((dd) => ({ status: r.status, data: dd })));
          })
          .then((result) => {
            if (!result) return;
            if (result.data.success) setStatus("paid");
            else if (result.status === 202 || result.data.pending) setStatus("pending_verification");
            else setStatus("failed");
          })
          .catch(() => setStatus("failed"));
        return;
      }

      fetch(`${API_URL}/api/orders/${orderId}/verify-payment?invoiceId=${id}`)
        .then((r) => r.json().then((d) => ({ status: r.status, data: d })))
        .then(({ status: httpStatus, data: d }) => {
          if (d.success) setStatus("paid");
          else if (httpStatus === 202 || d.pending) setStatus("pending_verification");
          else setStatus("failed");
        })
        .catch(() => setStatus("pending_verification"));
      return;
    }

    if (verify === "hyperpay") {
      const rp = resourcePath || searchParams.get("resourcePath");
      if (!rp) { setStatus("pending_verification"); return; }
      fetch(`${API_URL}/api/orders/${orderId}/verify-hyperpay?resourcePath=${encodeURIComponent(rp)}`)
        .then((r) => r.json().then((d) => ({ status: r.status, data: d })))
        .then(({ status: httpStatus, data: d }) => {
          if (d.success) setStatus("paid");
          else if (httpStatus === 202 || d.pending) setStatus("pending_verification");
          else setStatus("failed");
        })
        .catch(() => setStatus("pending_verification"));
    }
  }, [orderId, verify, invoiceId, resourcePath]);

  if (status === "loading") return <LoadingScreen />;
  if (status === "failed") return <FailurePage orderId={orderId} />;
  if (status === "pending_verification") return <PendingVerificationPage orderId={orderId} />;

  const payMethod = status === "paid" ? "online" : "cash";

  const displayOrder: Order = order || {
    _id: orderId || "000000",
    customerName: "—",
    phone: "—",
    address: "—",
    items: [],
    totalPrice: 0,
    paymentMethod: payMethod === "online" ? "online" : "cash_on_delivery",
    paymentStatus: payMethod === "online" ? "paid" : "pending",
    status: "pending",
    createdAt: new Date().toISOString(),
  };

  return <Invoice order={displayOrder} payMethod={payMethod} />;
}
