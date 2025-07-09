export interface OrderItem {
  productId: number;
  productName: string;
  price: number;
  quantity: number;
  discountCode?: string;
  imageUrl?: string;
}

export interface Order {
  id: number;
  orderDate: string;
  totalPrice: number;
  status: string;
  discountCode?: string;
  items: OrderItem[];
}