// types/invoice.ts
export interface CreateInvoiceItem {
  serviceName: string;
  price: number;
}

export interface CreateInvoiceDto {
  customerName: string;
  discountCode?: string;
  items: CreateInvoiceItem[];
}

export interface InvoiceDto {
  id: number;
  customerName: string;
  discountCode?: string;
  discountAmount: number;
  totalAmount: number;
  items: CreateInvoiceItem[];
}
