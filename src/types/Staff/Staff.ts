export type StaffStatus = 'pending' | 'approved' | 'rejected'
export type StaffPosition = 'stylist' | 'assistant' | 'manager'
export type WorkingStatus = 'active' | 'off' | 'resigned'

export interface Staff {
  _id: string
  user: {
    _id: string
    name: string
    email: string
    avatar?: string
    isOnline: boolean
    status: 'active' | 'blocked'
  }
  experienceYears: number
  skills: string[]
  position: StaffPosition
  status: StaffStatus
  workingStatus: WorkingStatus
  ratingAverage: number
  completedBookings: number
  joinedAt?: string
}
