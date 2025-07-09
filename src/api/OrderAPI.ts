import axios from 'axios';

const BASE_URL = import.meta.env.VITE_API_URL + '/order';

export interface OrderItem {
  productId: number;
  productName: string;
  quantity: number;
  price: number;
  imageUrl?: string;
}

export interface Order {
  id: number;
  userId: string;
  customerEmail: string;
  orderDate: string;
  totalPrice: number;
  status: string;
  discountCode?: string;
  items: OrderItem[];
}

export async function fetchAllOrders(): Promise<Order[]> {
  const token = localStorage.getItem('token');
  const res = await axios.get(BASE_URL, {
    headers: {
      Authorization: `Bearer ${token}`
    }
  });
  return res.data;
}

export async function updateOrderStatus(orderId: number, newStatus: string): Promise<void> {
  const token = localStorage.getItem('token');
  await axios.put(
    `${BASE_URL}/${orderId}/status`,
    newStatus,
    {
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`
      }
    }
  );
}
export const fetchMyOrders = async () => {
  const token = localStorage.getItem('token');
  const response = await axios.get(`${BASE_URL}/my-orders`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
  return response.data;
};
