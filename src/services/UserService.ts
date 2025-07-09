const API_BASE = import.meta.env.VITE_API_URL + '/user';
// Lấy danh sách tất cả người dùng
export async function getAllUsers() {
  const res = await fetch(API_BASE, {
    headers: {
      Authorization: `Bearer ${localStorage.getItem('token')}`
    }
  });
  if (!res.ok) throw new Error('Không thể lấy danh sách người dùng');
  return await res.json();
}
// Khoá tài khoản
export async function lockUser(userId: string) {
  const res = await fetch(`${API_BASE}/lock?userId=${userId}`, {
    method: 'POST',
    headers: {
      Authorization: `Bearer ${localStorage.getItem('token')}`
    }
  });
  if (!res.ok) throw new Error(await res.text());
  return await res.json();
}

// Mở khoá tài khoản
export async function unlockUser(userId: string) {
  const res = await fetch(`${API_BASE}/unlock?userId=${userId}`, {
    method: 'POST',
    headers: {
      Authorization: `Bearer ${localStorage.getItem('token')}`
    }
  });
  if (!res.ok) throw new Error(await res.text());
  return await res.json();
}

// Cập nhật vai trò
export async function assignRole(userId: string, role: string) {
  const res = await fetch(`${API_BASE}/assign-role?userId=${userId}&role=${role}`, {
    method: 'POST',
    headers: {
      Authorization: `Bearer ${localStorage.getItem('token')}`
    }
  });
  if (!res.ok) throw new Error(await res.text());
  return await res.json();
}
