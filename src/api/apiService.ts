import axiosInstance from '../utils/axiosInstance';
import type { Product } from '../types/Product';
import type { Service } from '../types/Service';

// Lấy danh sách dịch vụ
export async function fetchServices(): Promise<Service[]> {
  const res = await axiosInstance.get('/service');
  return res.data;
}

// Lấy danh sách sản phẩm
export async function fetchProducts(): Promise<Product[]> {
  const res = await axiosInstance.get('/product');
  return res.data;
}

// Thêm sản phẩm vào giỏ hàng
export async function addToCart(productId: number, quantity: number = 1) {
  const res = await axiosInstance.post('/cart/add', { productId, quantity });
  return res.data;
}
  
// Lấy giỏ hàng của người dùng
export async function fetchCart() {
  const res = await axiosInstance.get('/cart');
  return res.data;
}

// Xóa 1 sản phẩm khỏi giỏ hàng
export async function removeFromCart(itemId: number) {
  const res = await axiosInstance.delete(`/cart/${itemId}`);
  return res.data;
}

// Tạo đơn hàng từ giỏ hàng
// export async function createOrderFromCart(cartId: number) {
//   const res = await axiosInstance.post(`/order/from-cart/${cartId}`);
//   return res.data;
// }

 export async function createOrderFromCart(data: { cartId: number; discountCode?: string }) {
  const res = await axiosInstance.post('/order/from-cart', data);
  return res.data;
}
export async function updateCartItemQuantity(productId: number, quantity: number) {
  return axiosInstance.put(`/cart/update-quantity`, { productId, quantity });
}
