export interface Service {
  id: number;
  name: string;
  description?: string;
  price: number;
  imageUrl?: string;
  categoryId: number 
  imageFile?: File | null;
}