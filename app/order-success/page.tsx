"use client";
import { Suspense } from "react";
import Header from "../components/Header";
import Footer from "../components/Footer";
import LoadingScreen from "./LoadingScreen";
import OrderResultContent from "./OrderResultContent";

export default function OrderResultPage() {
  return (
    <>
      <Header />
      <Suspense fallback={<LoadingScreen />}>
        <OrderResultContent />
      </Suspense>
      <Footer />
    </>
  );
}
