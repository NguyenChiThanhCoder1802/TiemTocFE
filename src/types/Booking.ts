export interface Booking {
  id: number;
  date: string;
  time: string;
  status: string;
  services: {
    id: number;
    name: string;
    price: number;
  }[];
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
}
