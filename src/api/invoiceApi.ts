
import axios from 'axios';


export const createInvoice = (data: {
  customerName: string;
  discountCode?: string;
  items: { serviceName: string; price: number }[];
}) => {
  return axios.post('/api/invoice', data);
};