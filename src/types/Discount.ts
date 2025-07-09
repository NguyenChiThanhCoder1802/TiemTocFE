export interface Discount {
  id: number;
  code: string;
  percentage: number;
  expiryDate: string;
  maxUsage: number;
}

export interface CreateDiscountDto {
  code: string;
  percentage: number;
  expiryDate: string;
  maxUsage: number;
}

export interface AppliedDiscount {
  code: string;
  percentage: number;
  expiryDate: string;
  remainingUsage: number;
}
