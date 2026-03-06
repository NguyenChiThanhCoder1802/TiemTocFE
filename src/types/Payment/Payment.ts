// types/Payment/Payment.ts

export type PaymentMethod = 'vnpay' | 'cash' | 'momo'

export type PaymentStatus = 'pending' | 'success' | 'failed'

export interface Payment {
  _id: string

  booking:
  | string
  | {
      _id: string
      services: {
        nameSnapshot: string
      }[]
      price: {
        final: number
      }
      paymentStatus: string
      status: string
    }

  user: string

  method: PaymentMethod

  orderId: string
  txnRef: string
  amount: number
  description?: string

  // VNPay info
  bankCode?: string
  cardType?: string
  vnpTxnNo?: string
  responseCode?: string
  transactionStatus?: string
  payDate?: string
  secureHash?: string
  ipAddr?: string

  status: PaymentStatus
  paidAt?: string

  createdAt: string
  updatedAt: string
}
