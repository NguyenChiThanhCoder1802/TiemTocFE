import axiosInstance from '../utils/axiosInstance'
import type { Service } from '../types/HairService/Service'
import type { ApiResponse } from '../types/ApiResponse'

const BASE_URL = '/hairservices'

/* ======================
   GET ALL SERVICES
====================== */
export const fetchServices = async (
  categoryId?: string
): Promise<Service[]> => {
  const res = await axiosInstance.get<ApiResponse<Service[]>>(BASE_URL, {
    params: categoryId ? { category: categoryId } : {}
  })

  return res.data.data
}

/* ======================
   GET SERVICE BY ID
====================== */
export const fetchServiceById = async (id: string): Promise<Service> => {
  const res = await axiosInstance.get<ApiResponse<Service>>(
    `${BASE_URL}/${id}`
  )
  return res.data.data
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