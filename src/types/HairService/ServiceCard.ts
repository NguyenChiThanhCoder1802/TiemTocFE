export interface ServiceCard {
  _id: string;
  name: string;
  slug: string;
  description?:string;
  duration?: number;
  price: number;
  images: string[];
  finalPrice: number;
  viewCount?: number
  ratingAverage?: number
  ratingCount?: number
  bookingCount?: number
}
