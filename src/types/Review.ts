export interface CreateReviewDto {
  content?: string;
  rating: number;
  serviceId?: number;
  productId?: number;
}

export interface ReviewDto {
  id: number;
  customerId: string;
  customerName: string;
  content?: string;
  rating: number;
  serviceId?: number;
  productId?: number;
  createdAt: string;
}
