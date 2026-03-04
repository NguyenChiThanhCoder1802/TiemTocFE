import axiosInstance from '../utils/axiosInstance'
import type { Service } from '../types/HairService/Service'
import type { ApiResponse } from '../types/ApiResponse'
import type { PaginatedApiResponse } from '../types/PaginatedResponse'
import type { FetchServicesParams } from '../types/SearchParams/Params'
import type { ServiceCard } from '../types/HairService/ServiceCard'
import type { ServiceDetailResponse } from '../types/HairService/ServiceDetailResponse'
const BASE_URL = '/hairservices'

export const fetchServices = async (
  categoryId?: string
): Promise<Service[]> => {
  const res = await axiosInstance.get<ApiResponse<Service[]>>(
    `${BASE_URL}`,
    {
      params: {
        ...(categoryId && { category: categoryId })
      }
    }
  )

  return res.data.data
}
export const getMostFavoritedServices = async (
  limit = 8
): Promise<ServiceCard[]> => {
  const res = await axiosInstance.get<ApiResponse<ServiceCard[]>>(
    `${BASE_URL}/popular/favorites`,
    { params: { limit } }
  )
  return res.data.data
}
export const getFeaturedServices = async (
  limit = 8
): Promise<ServiceCard[]> => {
  const res = await axiosInstance.get<ApiResponse<ServiceCard[]>>(
    `${BASE_URL}/featured`,
    {
      params: { limit }
    }
  )

  return res.data.data
}
/* ======================
   GET ALL SERVICES admin
====================== */
  export const fetchServiceAdmin = async (params?:FetchServicesParams):Promise<PaginatedApiResponse<Service>> => {
    const res = await axiosInstance.get<PaginatedApiResponse<Service>>(
      `${BASE_URL}`,
      {
        params: {
          page: params?.page,
          limit: params?.limit,
          search: params?.search,
          minPrice: params?.minPrice,
          maxPrice: params?.maxPrice,
          sort: params?.sort,
          discountOnly: params?.discountOnly,
          ...(params?.categoryId && { category: params.categoryId })
        }
      }
    )

    return res.data
  }

/* ======================
   GET SERVICE BY ID
====================== */
export const fetchServiceById = async (
  id: string
): Promise<ServiceDetailResponse> => {
  const res = await axiosInstance.get(`${BASE_URL}/${id}`)

  return {
    service: res.data.data,
    relatedServices: res.data.relatedServices ?? []
  }
}
export const fetchServiceBySlug = async (
  slug: string
): Promise<ServiceDetailResponse> => {
  const res = await axiosInstance.get(
    `${BASE_URL}/slug/${slug}`
  )

  return {
    service: res.data.data,
    relatedServices: res.data.relatedServices ?? []
  }
}
/* ======================
   CREATE SERVICE (ADMIN)
====================== */
export const createService = async (
  formData: FormData
): Promise<Service> => {
  const transformFormData = (fd: FormData) => {
    const out = new FormData()
    const sd: Record<string, any> = {}

    for (const [k, v] of Array.from(fd.entries())) {
      if (k.startsWith('serviceDiscount.')) {
        const key = k.split('.')[1]
        sd[key] = v
        out.append(`serviceDiscount[${key}]`, v as any)
      } else {
        out.append(k, v as any)
      }
    }

    return out
  }

  const payload = transformFormData(formData)

  try {
    const res = await axiosInstance.post<ApiResponse<Service>>(BASE_URL, payload)
    return res.data.data
  } catch (err: any) {
    console.error('createService error response:', err.response?.data ?? err)
    throw err
  }
}

/* ======================
   UPDATE SERVICE (ADMIN)
====================== */
export const updateService = async (
  id: string,
  formData: FormData
): Promise<Service> => {
  const transformFormData = (fd: FormData) => {
    const out = new FormData()

    for (const [k, v] of fd.entries()) {
      if (k.startsWith('serviceDiscount.')) {
        const key = k.split('.')[1]
        out.append(`serviceDiscount[${key}]`, v)
      } else {
        out.append(k, v)
      }
    }

    return out
  }

  const payload = transformFormData(formData)

  const res = await axiosInstance.put<ApiResponse<Service>>(
    `${BASE_URL}/${id}`,
    payload
  )

  return res.data.data
}


/* ======================
   DELETE SERVICE (ADMIN)
====================== */
export const deleteService = async (id: string): Promise<void> => {
  await axiosInstance.delete(`${BASE_URL}/${id}`)
}
export const fetchServiceStatistics = async () => {
  const res = await axiosInstance.get(`${BASE_URL}/statistics`)
  return res.data.data
}

