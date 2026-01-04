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
  /** Giữ 1 instance FormData duy nhất */
  const formDataRef = useRef<FormData>(new FormData())

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

    fd.append('name', service.name)
    fd.append('price', String(service.price))
    fd.append('duration', String(service.duration))
    fd.append('isActive', String(service.isActive))
    fd.append('serviceDiscount.percent', String(service.serviceDiscount?.percent ?? 0))
    if (service.serviceDiscount?.startAt)
      fd.append('serviceDiscount.startAt', service.serviceDiscount.startAt)
    if (service.serviceDiscount?.endAt)
      fd.append('serviceDiscount.endAt', service.serviceDiscount.endAt)
    fd.append('isCombo', String(service.isCombo ?? false))
    fd.append('category', service.category ?? '')
    fd.append('description', service.description ?? '')

    // keep tags as JSON string to match form change handler
    if (service.tags && service.tags.length > 0) fd.append('tags', JSON.stringify(service.tags))
    service.includedServices?.forEach((id) =>
      fd.append('includedServices[]', id)
    )

    setPreviewImages(service.images || [])
  }, [service])

  /* ======================
     HANDLERS
  ====================== */
  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target
    formDataRef.current.set(name, value)
  }

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files
    if (!files) return

    Array.from(files).forEach((file) => {
      formDataRef.current.append('images', file)
      setPreviewImages((prev) => [...prev, URL.createObjectURL(file)])
    })
  }

  const handleRemoveImage = (img: string) => {
    setPreviewImages((prev) => prev.filter((i) => i !== img))
    formDataRef.current.append('removedImages[]', img)
  }

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
