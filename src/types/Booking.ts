export interface Booking {
  id: number;
  date: string;
  appointmentTime: string;
  status: string;
  services: {
    id: number;
    name: string;
    price: number;
  }[];
  combos: { name: string }[];
}
export interface ServiceDto {
  id: number;
  name: string;
  description: string;
  price: number;
}

export interface BookingDetailDto {
  id: number;
  customerName: string;
  phone: string;
  appointmentTime: string;
  note: string;
  status: string;
  userName: string;
  total: number;
  services: ServiceDto[];
   combos: {
    id: number;
    name: string;
    discountedPrice: number;
    services: {
      id: number;
      name: string;
      price: number;
    }[];
  }[];
}
