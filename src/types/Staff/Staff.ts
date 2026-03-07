
export type StaffPosition = 'stylist' | 'assistant' | 'manager'
export type WorkingStatus = 'active' | 'off' | 'resigned'

export interface Staff {
  _id: string
  name: string
  phone?: string
  email?: string
  avatar?: string
  salary?: number
  experienceYears: number
  skills: string[]
  position: StaffPosition
  workingStatus: WorkingStatus
  ratingAverage: number
  completedBookings: number
  joinedAt?: string
}
