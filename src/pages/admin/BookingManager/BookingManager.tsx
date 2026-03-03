import { useEffect, useState, useCallback } from "react"
import { Box, Typography, CircularProgress, Tabs, Tab } from "@mui/material"

import type { BookingStatus } from "../../../types/Booking/Booking"
import type { AdminBooking } from "../../../types/Booking/AdminBooking"

import {
  getAllBookingsApi
} from "../../../api/AdminAPI"

import BookingTable from "./BookingTable"
import BookingDetailDialog from "./BookingDetailDialog"

const STATUS_TABS: {
  label: string
  value: BookingStatus | "all"
}[] = [
  { label: "Tất cả", value: "all" },
  { label: "Chờ duyệt", value: "pending" },
  { label: "Đã duyệt", value: "confirmed" },
  { label: "Đang làm", value: "in_progress" },
  { label: "Hoàn thành", value: "completed" },
  { label: "Đã huỷ", value: "cancelled" }
]

export default function BookingManager() {
  const [bookings, setBookings] = useState<AdminBooking[]>([])
  const [loading, setLoading] = useState(true)
  const [status, setStatus] = useState<BookingStatus | "all">("all")
  const [selectedBooking, setSelectedBooking] = useState<AdminBooking | null>(null)

  const fetchData = useCallback(async () => {
    setLoading(true)
    try {
      const result = await getAllBookingsApi(
        status === "all" ? undefined : { status }
      )
      setBookings(result.data ?? [])
    } finally {
      setLoading(false)
    }
  }, [status])

  useEffect(() => {
    fetchData()
  }, [fetchData])

  if (loading) {
    return (
      <Box textAlign="center" mt={8}>
        <CircularProgress />
      </Box>
    )
  }

  return (
    <Box p={4}>
      <Typography variant="h4" mb={3}>
        Quản lý lịch đặt
      </Typography>

      <Tabs
        value={status}
        onChange={(_, v) => setStatus(v)}
        variant="scrollable"
        sx={{ mb: 2 }}
      >
        {STATUS_TABS.map(t => (
          <Tab key={t.value} value={t.value} label={t.label} />
        ))}
      </Tabs>

      <BookingTable
        bookings={bookings}
        onSelect={setSelectedBooking}
      />

      <BookingDetailDialog
        booking={selectedBooking}
        onClose={() => setSelectedBooking(null)}
        onUpdated={fetchData}
      />
    </Box>
  )
}