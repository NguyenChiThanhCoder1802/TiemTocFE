const API_BASE = import.meta.env.VITE_API_URL + '/product';


export async function getAllProducts() {
  const res = await fetch(API_BASE);
  if (!res.ok) throw new Error('Không thể lấy danh sách sản phẩm');
  return await res.json();
}
export async function getProductById(id: number) {
  const res = await fetch(`${API_BASE}/${id}`);
  if (!res.ok) throw new Error('Không tìm thấy sản phẩm');
  return await res.json();
}
//admin
export async function createProduct(data: {
  name: string;
  description: string;
  price: number;
  imageUrl: string;
}) {
  const token = localStorage.getItem('token');
  const res = await fetch(API_BASE, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify(data),
  });

  if (!res.ok) throw new Error(await res.text());
  return await res.json();
}
export async function updateProduct(id: number, data: {
  name: string;
  description: string;
  price: number;
  imageUrl: string;
}) {
  const token = localStorage.getItem('token');
  const res = await fetch(`${API_BASE}/${id}`, {
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify(data),
  });

  if (!res.ok) throw new Error(await res.text());
}
export async function deleteProduct(id: number) {
  const token = localStorage.getItem('token');
  const res = await fetch(`${API_BASE}/${id}`, {
    method: 'DELETE',
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });

  if (!res.ok) throw new Error(await res.text());
}
