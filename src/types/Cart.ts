export interface CartItem {
  productId: number;
  productName: string;
  price: number;
  quantity: number;
  imageUrl?: string;
}

export interface CartResponse {
  id: number | null;
  userId: string;
  items: CartItem[];
  totalAmount: number;
}