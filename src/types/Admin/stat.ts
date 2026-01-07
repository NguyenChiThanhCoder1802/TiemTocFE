/* ================= OVERVIEW ================= */

export interface AdminServiceOverview {
  totalServices: number
  activeServices: number
  discountedServices: number
  comboServices: number
  featuredServices: number
}

/* ================= PERFORMANCE ================= */

export interface AdminServicePerformance {
  totalBooking: number
  totalView: number
  avgConversionRate: number // 0 -> 1
  avgRating: number // 0 -> 5
}

/* ================= TOP SERVICES ================= */

export interface TopBookingService {
  _id: string
  name: string
  bookingCount: number
  price: number
  finalPrice?: number
}

export interface TopViewService {
  _id: string
  name: string
  viewCount: number
}

export interface TopPopularityService {
  _id: string
  name: string
  popularityScore: number
}

export interface AdminTopServices {
  topBooking: TopBookingService[]
  topView: TopViewService[]
  topPopularity: TopPopularityService[]
}

/* ================= DASHBOARD ================= */

export interface AdminDashboardStat {
  overview: AdminServiceOverview
  performance: AdminServicePerformance
  topServices: AdminTopServices
}
