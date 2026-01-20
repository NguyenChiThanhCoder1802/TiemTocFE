import { useEffect, useState, useCallback } from "react"
import {
  Box,
  Typography,
  CircularProgress,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableRow,
  Tabs,
  Tab,
  Chip,
  Button,
  Stack
} from "@mui/material"
import type { ChipProps } from "@mui/material"

import type { BookingStatus } from "../../../types/Booking/Booking"
import type { AdminBooking } from "../../../types/Booking/AdminBooking"

import {
  getAllBookingsApi,
  approveBookingApi,
  cancelBookingApi,
  completeBookingApi
} from "../../../api/AdminAPI"

/* ================= TYPES ================= */

type ChipColor = NonNullable<ChipProps["color"]>

/* ================= STATUS CONFIG ================= */

const STATUS_TABS: {
  label: string
  value: BookingStatus | "all"
}[] = [
  { label: "Tất cả", value: "all" },
  { label: "Chờ duyệt", value: "pending" },
  { label: "Đã duyệt", value: "confirmed" },
  { label: "Đang làm", value: "in_progress" },
  { label: "Hoàn thành", value: "completed" },
  { label: "Đã huỷ", value: "cancelled" },
  { label: "Không đến", value: "no_show" }
]

const statusColorMap: Record<BookingStatus, ChipColor> = {
  pending: "warning",
  confirmed: "info",
  in_progress: "primary",
  completed: "success",
  cancelled: "error",
  no_show: "default"
}

/* ================= COMPONENT ================= */

export default function BookingManager() {
  const [bookings, setBookings] = useState<AdminBooking[]>([])
  const [loading, setLoading] = useState(true)
  const [status, setStatus] =
    useState<BookingStatus | "all">("all")

  /* ================= FETCH ================= */

  const fetchData = useCallback(async () => {
    setLoading(true)
    try {
      const res = await getAllBookingsApi(
        status === "all" ? undefined : { status }
      )

      setBookings(res.data ?? [])
    } finally {
      setLoading(false)
    }
  }, [status])

  useEffect(() => {
    fetchData()
  }, [fetchData])

  /* ================= LOADING ================= */

  if (loading) {
    return (
      <Box textAlign="center" mt={8}>
        <CircularProgress />
      </Box>
    )
  }

  /* ================= RENDER ================= */

  return (
    <Box p={4}>
      <Typography variant="h4" mb={3}>
        Quản lý lịch đặt
      </Typography>

      {/* ===== STATUS TABS ===== */}
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

      {/* ===== TABLE ===== */}
      <Table>
        <TableHead>
          <TableRow>
            <TableCell>Ngày & Giờ</TableCell>
            <TableCell>Khách hàng</TableCell>
            <TableCell>Nhân viên</TableCell>
            <TableCell>Dịch vụ</TableCell>
            <TableCell>Tổng tiền</TableCell>
            <TableCell>Trạng thái</TableCell>
            <TableCell align="right">Hành động</TableCell>
          </TableRow>
        </TableHead>

        <TableBody>
          {!bookings.length && (
            <TableRow>
              <TableCell colSpan={7} align="center">
                <Typography color="text.secondary">
                  Không có lịch đặt
                </Typography>
              </TableCell>
            </TableRow>
          )}

          {bookings.map(b => (
            <TableRow key={b._id}>
              {/* DATE */}
              <TableCell>
                <Typography fontWeight={600}>
                  {new Date(b.bookingDate).toLocaleDateString()}
                </Typography>
                <Typography variant="body2" color="text.secondary">
                  {new Date(b.startTime).toLocaleTimeString([], {
                    hour: "2-digit",
                    minute: "2-digit"
                  })}
                </Typography>
              </TableCell>

              {/* CUSTOMER */}
              <TableCell>{b.customer?.name}</TableCell>

              {/* STAFF */}
              <TableCell>
  {b.staff?.name ??
    (b.autoAssigned ? "Tự động" : "Chưa gán")}
</TableCell>


              {/* SERVICES */}
              <TableCell>
                {b.services.map(s => (
                  <Typography key={s.service} variant="body2">
                    • {s.name}
                  </Typography>
                ))}
              </TableCell>

              {/* PRICE */}
              <TableCell>
                {b.totalPrice.toLocaleString()}đ
              </TableCell>

              {/* STATUS */}
              <TableCell>
                <Chip
                  size="small"
                  label={b.bookingStatus}
                  color={statusColorMap[b.bookingStatus]}
                />
              </TableCell>

              {/* ACTIONS */}
              <TableCell align="right">
                <Stack direction="row" spacing={1} justifyContent="flex-end">
                  {b.bookingStatus === "pending" && (
                    <>
                      <Button
                        size="small"
                        variant="contained"
                        onClick={() =>
                          approveBookingApi(b._id).then(fetchData)
                        }
                      >
                        Duyệt
                      </Button>

                      <Button
                        size="small"
                        color="error"
                        variant="outlined"
                        onClick={() =>
                          cancelBookingApi(
                            b._id,
                            "Admin huỷ"
                          ).then(fetchData)
                        }
                      >
                        Huỷ
                      </Button>
                    </>
                  )}

                  {b.bookingStatus === "confirmed" && (
                    <Button
                      size="small"
                      color="success"
                      variant="contained"
                      onClick={() =>
                        completeBookingApi(b._id).then(fetchData)
                      }
                    >
                      Hoàn thành
                    </Button>
                  )}
                </Stack>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </Box>
  )
}
