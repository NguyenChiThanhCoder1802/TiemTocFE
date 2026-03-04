import type { Service } from "../HairService/Service"
export interface Review {
  _id: string
  user: {
    _id: string
    name: string
    avatar?: string
  }

  service?: string | Service | null
  staff?: string | null

  rating: number
  comment?: string
  images: string[]

  createdAt: string
  updatedAt: string
}
