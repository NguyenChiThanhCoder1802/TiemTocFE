export interface ServiceCard {
  _id: string;
  name: string;
  duration?: number;
  description?: string;
  price: number;
  images: string[];
  finalPrice: number;
  viewCount?: number
  ratingAverage?: number
  ratingCount?: number
}
