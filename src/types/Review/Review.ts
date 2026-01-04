export interface Review {
  _id: string
  user: {
    _id: string
    name: string
    avatar?: string
  }
  service: string
  rating: number
  comment?: string
  images: string[]
  createdAt: string
  updatedAt: string
}
