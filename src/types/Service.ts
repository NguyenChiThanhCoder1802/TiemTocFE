export interface Service {
  id: number;
  name: string;
  description?: string;
  price: number;
  categoryId: number,

  durationInMinutes: number;

  // Media từ backend
  imageUrl?: string;
  additionalImageUrls?: string[];
  // từ frontend
  videoUrls?: string[];
  imageFile?: File | null;
  additionalImageFiles?: File[]; // ảnh phụ
  videoFiles?: File[];
}
// types/ServicePopularityDto.ts
export interface ServicePopularityDto {
  id: number;
  name: string;
  bookingCount: number;
  avgRating: number;
  score: number;
}
