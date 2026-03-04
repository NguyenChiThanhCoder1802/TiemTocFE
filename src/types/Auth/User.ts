export interface User {
  _id: string
  name: string
  email: string
  phone?: string
  gender?: 'male' | 'female' | 'other'
  role: 'customer'| 'admin' | 'staff'
  avatar?: string
  favoriteServices?: string[] 
}
