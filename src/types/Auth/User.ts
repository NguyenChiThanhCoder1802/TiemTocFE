export interface User {
  _id: string
  name: string
  email: string
  role: 'customer'| 'admin' | 'staff'
  avatar?: string
  favoriteServices?: string[] 
}
