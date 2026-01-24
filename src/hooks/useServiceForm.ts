import { useEffect, useRef, useState } from 'react'
import type { Service } from '../types/HairService/Service'

interface UseServiceFormResult {
  formData: FormData
  previewImages: string[]
  handleChange: (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => void
  handleImageChange: (e: React.ChangeEvent<HTMLInputElement>) => void
  handleRemoveImage: (img: string) => void
  resetForm: () => void
}

export const useServiceForm = (
  service: Service | null
): UseServiceFormResult => {
  /** Luôn giữ 1 FormData instance duy nhất */
  const formDataRef = useRef<FormData>(new FormData())

  /** Preview ảnh (URL hoặc blob) */
  const [previewImages, setPreviewImages] = useState<string[]>([])

  /* ======================
     INIT / RESET FORM
  ====================== */
  useEffect(() => {
    const fd = new FormData()
    formDataRef.current = fd

    if (!service) {
      setPreviewImages([])
      return
    }

    /* ===== BASIC ===== */
    fd.append('name', service.name)
    fd.append('price', String(service.price))
    fd.append('duration', String(service.duration))
    fd.append('isActive', String(service.isActive))
    fd.append(
      'category',
      typeof service.category === 'string'
        ? service.category
        : service.category?._id ?? ''
    )
    fd.append('description', service.description ?? '')

    /* ===== TAGS (GỬI JSON STRING - BE SUPPORT) ===== */
    if (service.tags && service.tags.length > 0) {
      fd.append('tags', JSON.stringify(service.tags))
    }

    /* ===== SERVICE DISCOUNT ===== */
    if (service.serviceDiscount?.percent !== undefined) {
      fd.append(
        'serviceDiscount.percent',
        String(service.serviceDiscount.percent)
      )
    }

    if (service.serviceDiscount?.startAt) {
      fd.append(
        'serviceDiscount.startAt',
        service.serviceDiscount.startAt
      )
    }

    if (service.serviceDiscount?.endAt) {
      fd.append(
        'serviceDiscount.endAt',
        service.serviceDiscount.endAt
      )
    }

    /**
     * ❗ QUAN TRỌNG
     * - KHÔNG append images cũ vào FormData
     * - Ảnh cũ chỉ dùng để preview
     */
    setPreviewImages(service.images || [])
  }, [service])

  /* ======================
     HANDLERS
  ====================== */

  /**
   * Input thường (text, number, textarea...)
   */
  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target
    formDataRef.current.set(name, value)
  }

  /**
   * Upload ảnh mới
   * - Chỉ append khi có file
   * - Multer sẽ xử lý và set req.body.images = string[]
   */
  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files
    if (!files || files.length === 0) return

    Array.from(files).forEach((file) => {
      formDataRef.current.append('images', file)
      setPreviewImages((prev) => [...prev, URL.createObjectURL(file)])
    })

    /** reset input để chọn lại cùng file */
    e.target.value = ''
  }

  /**
   * Remove ảnh (FE preview)
   * - Không gửi images cũ lên BE
   * - BE hiện chưa xử lý removedImages
   */
  const handleRemoveImage = (img: string) => {
    setPreviewImages((prev) => prev.filter((i) => i !== img))
  }

  /**
   * Reset toàn bộ form
   */
  const resetForm = () => {
    formDataRef.current = new FormData()
    setPreviewImages([])
  }

  return {
    formData: formDataRef.current,
    previewImages,
    handleChange,
    handleImageChange,
    handleRemoveImage,
    resetForm
  }
}
