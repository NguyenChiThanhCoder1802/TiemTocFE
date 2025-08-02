export interface Service {
  id: number;
  name: string;
  description?: string;
  price: number;
  categoryId: number;
  durationInMinutes: number;

  // Media từ backend
  imageUrl?: string;
  additionalImageUrls?: string[];
  videoUrls?: string[];

  // File người dùng chọn để upload (frontend)
  imageFile?: File | null;
  additionalImageFiles?: File[]; // ảnh phụ
  videoFiles?: File[];
}
