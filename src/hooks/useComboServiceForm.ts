import { useCallback, useEffect, useRef, useState } from 'react'
import type { Combo } from '../types/Combo/Combo'
import type { ServiceLite } from '../types/HairService/Service'

export const useComboServiceForm = (combo: Combo | null) => {
  const formDataRef = useRef<FormData>(new FormData())
  const [previewImages, setPreviewImages] = useState<string[]>([])

  /* ================= INIT ================= */
  useEffect(() => {
    const fd = new FormData()
    formDataRef.current = fd

    if (!combo) {
      setPreviewImages([])
      return
    }

    fd.set('name', combo.name)
    fd.set('description', combo.description ?? '')
    fd.set('isActive', String(combo.isActive))
    fd.set('duration', String(combo.duration))
    fd.set('pricing', JSON.stringify(combo.pricing))
    fd.set('tags', JSON.stringify(combo.tags ?? []))
    if (combo.activePeriod?.startAt) {
      fd.set(
        'activePeriod[startAt]',
        new Date(combo.activePeriod.startAt).toISOString()
      )
    }

    if (combo.activePeriod?.endAt) {
      fd.set(
        'activePeriod[endAt]',
        new Date(combo.activePeriod.endAt).toISOString()
      )
    }

    fd.set(
      'services',
      JSON.stringify(
        combo.services.map(s => ({
          service: s.service
        }))
      )
    )

    setPreviewImages(combo.images ?? [])
  }, [combo])

  /* ================= BASIC ================= */
  const handleChange = useCallback(
    (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
      formDataRef.current.set(e.target.name, e.target.value)
    },
    []
  )

  const setTags = useCallback((tags: string[]) => {
    formDataRef.current.set('tags', JSON.stringify(tags))
  }, [])

  /* ================= PRICING ================= */
  const setPricing = useCallback(
    (originalPrice: number, comboPrice: number) => {
      formDataRef.current.set(
        'pricing',
        JSON.stringify({ originalPrice, comboPrice })
      )
    },
    []
  )

  /* ================= SERVICES ================= */
  const setServices = useCallback(
    (
      services: { service: ServiceLite}[],
      duration: number
    ) => {
      formDataRef.current.set(
        'services',
        JSON.stringify(
          services.map(s => ({
            service: s.service._id,
          }))
        )
      )

      formDataRef.current.set('duration', String(duration))
    },
    []
  )
  /* ================= ACTIVE PERIOD ================= */
const setActivePeriod = useCallback(
  (startAt?: string, endAt?: string) => {
    if (startAt) {
      formDataRef.current.set(
        'activePeriod[startAt]',
        new Date(startAt).toISOString()
      )
    } else {
      formDataRef.current.delete('activePeriod[startAt]')
    }

    if (endAt) {
      formDataRef.current.set(
        'activePeriod[endAt]',
        new Date(endAt).toISOString()
      )
    } else {
      formDataRef.current.delete('activePeriod[endAt]')
    }
  },
  []
)
  /* ================= IMAGES ================= */
  const handleImageChange = useCallback(
    (e: React.ChangeEvent<HTMLInputElement>) => {
      const files = e.target.files
      if (!files) return

      Array.from(files).forEach(file => {
        formDataRef.current.append('images', file)
        setPreviewImages(prev => [...prev, URL.createObjectURL(file)])
      })

      e.target.value = ''
    },
    []
  )

  const handleRemoveImage = useCallback((img: string) => {
    setPreviewImages(prev => prev.filter(i => i !== img))
  }, [])

  const resetForm = useCallback(() => {
    formDataRef.current = new FormData()
    setPreviewImages([])
  }, [])

  return {
    formData: formDataRef.current,
    previewImages,
    handleChange,
    handleImageChange,
    handleRemoveImage,
    setPricing,
    setServices,
    setTags,
    setActivePeriod,
    resetForm
  }
}
