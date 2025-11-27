export interface Service {
  id: number;
  name: string;
  description?: string;
  price: number;
  categoryId: number,
  durationInMinutes: number;
  // ảnh từ backend
  imageUrl?: string;
  additionalImageUrls?: string[];
  //  video ảnh từ frontend
  videoUrls?: string[];
  imageFile?: File | null;
  additionalImageFiles?: File[]; // ảnh phụ
  videoFiles?: File[];
}
// Dịch vụ phổ biến
export interface ServicePopularityDto {
  id: number;
  name: string;
  bookingCount: number;
  avgRating: number;
  score: number;
  price: number;
}
export interface ServiceFormData {
  name: string;
  description: string;
  price: number;
  categoryId: number | '';
  durationInMinutes: number;
  image?: File;
  additionalImages?: File[];
  videoFiles?: File[];
}