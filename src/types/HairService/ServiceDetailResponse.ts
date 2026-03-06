// types/HairService/ServiceDetailResponse.ts
import type { Service } from './Service'
import type { ServiceCard } from './ServiceCard'

export interface ServiceDetailResponse {
  service: Service
  relatedServices: ServiceCard[]
}
