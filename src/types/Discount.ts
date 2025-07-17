export interface Discount {
  id: number;
  code: string;
  percentage: number;
  amount: number;
  expiryDate: string;
  maxUsage: number;
  isActive: boolean;
}

export interface CreateDiscountDto {
  code: string;
  percentage: number;
  amount: number;
  expiryDate: string;
  maxUsage: number;
}

export interface AppliedDiscount {
  code: string;
  percentage: number;
  amount: number;
  expiryDate: string;
  remainingUsage: number;
}
