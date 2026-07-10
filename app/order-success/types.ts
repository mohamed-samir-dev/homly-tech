export type OrderItem = {
  productId: string;
  name: string;
  price: number;
  quantity: number;
};

export type Order = {
  _id: string;
  customerName: string;
  phone: string;
  address: string;
  notes?: string;
  items: OrderItem[];
  totalPrice: number;
  paymentMethod: "cash_on_delivery" | "online";
  paymentStatus: "pending" | "paid" | "failed";
  status: string;
  createdAt: string;
};

export const API_URL = process.env.NEXT_PUBLIC_API_URL || "http://localhost:5000";
export const REDIRECT_SECONDS = 10;
