import { useEffect, useMemo, useState, useRef } from 'react'
import dayjs from 'dayjs'
import type { Staff } from '../types/Staff/Staff'
import type { Service } from '../types/HairService/Service'
import type { PaymentMethod } from '../types/Payment/Payment'
import { fetchServices } from '../api/servicesAPI'
import { fetchPublicStaffs } from '../api/staffAPI'
import { checkAllStaffAvailability, previewBooking } from '../api/BookingAPI'

export interface AppliedDiscount {
  code: string
}

export function useBookingBuilder() {
  const [startTime, setStartTime] = useState<string>('')

  const [staffs, setStaffs] = useState<Staff[]>([])
  const [selectedStaff, setSelectedStaff] = useState<Staff | null>(null)

  const [availableServices, setAvailableServices] = useState<Service[]>([])
  const [selectedServices, setSelectedServices] = useState<Service[]>([])

  const [availability, setAvailability] = useState<Record<string, boolean>>({})
  const [staffError, setStaffError] = useState<string | null>(null)

  /* ================= PRICE FROM BACKEND ================= */
  const [price, setPrice] = useState({
    original: 0,
    afterServiceDiscount: 0,
    discountAmount: 0,
    final: 0
  })

  const [loadingPreview, setLoadingPreview] = useState(false)

  const [discount, setDiscount] = useState<AppliedDiscount | null>(null)

  const [paymentMethod, setPaymentMethod] =
    useState<PaymentMethod>('cash')

  const [loadingServices, setLoadingServices] = useState(false)
  const [loadingStaff, setLoadingStaff] = useState(false)

  const previewCallId = useRef(0)

  /* ================= LOAD STAFF ================= */
  useEffect(() => {
    const loadStaffs = async () => {
      try {
        setLoadingStaff(true)
        const data = await fetchPublicStaffs()
        setStaffs(data)
      } catch (error) {
        console.error('Load staffs failed', error)
      } finally {
        setLoadingStaff(false)
      }
    }

    loadStaffs()
  }, [])

  /* ================= RESET DISCOUNT WHEN CHANGE SERVICES ================= */
  useEffect(() => {
    setDiscount(null)
  }, [selectedServices])

  /* ================= CHECK STAFF AVAILABILITY ================= */
  useEffect(() => {
    if (!startTime || selectedServices.length === 0) return

    const totalDuration = selectedServices.reduce(
      (sum, s) => sum + s.duration,
      0
    )

    const checkAvailability = async () => {
      try {
        const result = await checkAllStaffAvailability(
          new Date(startTime).toISOString(),
          totalDuration
        )

        setAvailability(result)
        setStaffError(null)
      } catch (error) {
        console.error('Check availability failed', error)
        setStaffError('Không thể kiểm tra lịch nhân viên')
      }
    }

    checkAvailability()
  }, [startTime, selectedServices])

 /* ================= LOAD SERVICES ================= */
useEffect(() => {
  const loadServices = async () => {
    try {
      setLoadingServices(true)
      const data = await fetchServices()
      setAvailableServices(data)
    } catch (error) {
      console.error('Load services failed', error)
    } finally {
      setLoadingServices(false)
    }
  }

  loadServices()
}, [])

  /* ================= PREVIEW PRICE ================= */
  useEffect(() => {
    if (selectedServices.length === 0) {
      setPrice({
        original: 0,
        afterServiceDiscount: 0,
        discountAmount: 0,
        final: 0
      })
      return
    }

    const runPreview = async () => {
      const callId = ++previewCallId.current

      try {
        setLoadingPreview(true)

        const res = await previewBooking({
          bookingType: 'service',
          services: selectedServices.map(s => ({
            service: s._id
          })),
          discountCode: discount?.code ?? null
        })

        // tránh race condition
        if (callId === previewCallId.current) {
          setPrice(res.price)
        }

      } catch (error) {
        console.error('Preview failed', error)
      } finally {
        if (callId === previewCallId.current) {
          setLoadingPreview(false)
        }
      }
    }

    runPreview()

  }, [selectedServices, discount])

  /* ================= TOTAL DURATION ================= */
  const totalDuration = useMemo(() => {
    return selectedServices.reduce(
      (sum, s) => sum + s.duration,
      0
    )
  }, [selectedServices])

  /* ================= END TIME ================= */
  const endTime = useMemo(() => {
    if (!startTime || totalDuration === 0) return null

    return dayjs(startTime)
      .add(totalDuration, 'minute')
      .toISOString()
  }, [startTime, totalDuration])

  /* ================= TOGGLE SERVICE ================= */
  const toggleService = (service: Service) => {
    setSelectedServices(prev => {
      const exists = prev.find(s => s._id === service._id)

      if (exists) {
        return prev.filter(s => s._id !== service._id)
      }

      return [...prev, service]
    })
  }

  return {
    startTime,
    setStartTime,

    staffs,
    loadingStaff,
    selectedStaff,
    setSelectedStaff,

    availability,
    staffError,

    availableServices,
    selectedServices,
    toggleService,

    discount,
    setDiscount,

    paymentMethod,
    setPaymentMethod,

    totalDuration,
    endTime,

    price,
    loadingPreview,
    loadingServices
  }
}