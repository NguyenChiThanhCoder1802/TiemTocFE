import type { Service } from './Service';

export interface ComboDto {
  id: number;
  name: string;
  description: string;
  originalPrice: number;
  discountedPrice: number;
  startDate: string;
  endDate: string;
  services: Service[];
}

export interface CreateComboDto {
  name: string;
  description: string;
  originalPrice: number;
  discountedPrice: number;
  startDate: string;
  endDate: string;
  serviceIds: number[];
}
