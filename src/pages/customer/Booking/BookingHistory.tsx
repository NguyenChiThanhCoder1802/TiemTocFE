import { useEffect, useState, useCallback } from 'react'
import {
  Box,
  Chip,
  Container,
  Stack,
  Typography,
  Tabs,
  Tab,
  Button,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Snackbar,
  Alert,
  Pagination
} from '@mui/material'
import { useNavigate } from 'react-router-dom'

import { getMyBookings, cancelBooking } from '../../../api/BookingAPI'
import type {
  Booking,
  BookingStatus
} from '../../../types/Booking/Booking'
import type { Pagination as PaginationType } from '../../../types/Pagination'
import type { ChipProps } from '@mui/material'

type ChipColor = NonNullable<ChipProps['color']>

const STATUS_TABS: { label: string; value: BookingStatus }[] = [
  { label: 'Chờ xác nhận', value: 'pending' },
  { label: 'Đã xác nhận', value: 'confirmed' },
  { label: 'Hoàn thành', value: 'completed' },
  { label: 'Đã huỷ', value: 'cancelled' }
]

const statusColorMap: Record<BookingStatus, ChipColor> = {
  pending: 'warning',
  confirmed: 'info',
  completed: 'success',
  cancelled: 'error'
}

type BookingPageCache = {
  data: Booking[]
  pagination: PaginationType
}

type BookingCache = Partial<
  Record<BookingStatus, Record<number, BookingPageCache>>
>

export default function BookingHistory() {
  const navigate = useNavigate()

  const [status, setStatus] = useState<BookingStatus>('pending')
  const [page, setPage] = useState(1)
  const limit = 10

  const [data, setData] = useState<Booking[]>([])
  const [pagination, setPagination] =
    useState<PaginationType | null>(null)

  const [cache, setCache] = useState<BookingCache>({})

  /* ===== CANCEL ===== */
  const [cancelId, setCancelId] = useState<string | null>(null)
  const [canceling, setCanceling] = useState(false)

  /* ===== TOAST ===== */
  const [toastOpen, setToastOpen] = useState(false)

  /* ===== FETCH ===== */
  const fetchData = useCallback(async () => {
    try {
      const cached = cache[status]?.[page]
      if (cached) {
        setData(cached.data)
        setPagination(cached.pagination)
        return
      }

      const res = await getMyBookings({ status, page, limit })
      console.log('API raw response:', res)
      if (!res || !Array.isArray(res.data)) {
        setData([])
        setPagination(null)
        return
      }

      setCache(prev => ({
        ...prev,
        [status]: {
          ...(prev[status] || {}),
          [page]: res
        }
      }))

      setData(res.data)
      setPagination(res.pagination)
    } catch (err) {
      console.error('Fetch booking error:', err)
      setData([])
      setPagination(null)
    }
  }, [status, page, cache])

  /* reset page khi đổi tab */
  useEffect(() => {
    setPage(1)
  }, [status])

  useEffect(() => {
    fetchData()
  }, [fetchData])

  /* ===== CANCEL CONFIRM ===== */
  const confirmCancel = async () => {
    if (!cancelId) return

    try {
      setCanceling(true)
      await cancelBooking(cancelId)

      setData(prev =>
        prev.map(b =>
          b._id === cancelId ? { ...b, status: 'cancelled' } : b
        )
      )

      setCache(prev => {
        const next = { ...prev }
        Object.keys(next).forEach(st => {
          Object.keys(next[st as BookingStatus] || {}).forEach(
            p => {
              next[st as BookingStatus]![+p].data =
                next[st as BookingStatus]![+p].data.map(
                  b =>
                    b._id === cancelId
                      ? { ...b, status: 'cancelled' }
                      : b
                )
            }
          )
        })
        return next
      })

      setToastOpen(true)
    } finally {
      setCanceling(false)
      setCancelId(null)
    }
  }

  const safeData = Array.isArray(data) ? data : []

  /* ===== RENDER ===== */

  return (
    <Container sx={{ mt: 6 }}>
      <Typography variant="h5" fontWeight={700} mb={2}>
        Lịch sử đặt lịch
      </Typography>

      <Tabs value={status} onChange={(_, v) => setStatus(v)} sx={{ mb: 3 }}>
        {STATUS_TABS.map(t => (
          <Tab key={t.value} value={t.value} label={t.label} />
        ))}
      </Tabs>

      <Stack spacing={2}>
        {safeData.length === 0 && (
          <Typography color="text.secondary" textAlign="center" mt={4}>
            Không có lịch đặt
          </Typography>
        )}

        {safeData.map(b => (
          <Box
            key={b._id}
            p={2}
            border="1px solid #eee"
            borderRadius={2}
            sx={{ cursor: 'pointer', '&:hover': { backgroundColor: '#fafafa' } }}
            onClick={() => navigate(`/bookings/${b._id}`)}
          >
            <Stack direction="row" justifyContent="space-between" alignItems="center">
              <Typography fontWeight={600}>
                {b.bookingType === 'service' ? 'Dịch vụ' : 'Combo'}
              </Typography>

              <Chip
                size="small"
                label={b.status}
                color={statusColorMap[b.status]}
              />
            </Stack>

            <Typography mt={1}>
              Thời gian:{' '}
              {new Date(b.startTime).toLocaleString('vi-VN')}
            </Typography>

            <Typography>
              Giá: {b.price.final.toLocaleString('vi-VN')}đ
            </Typography>

            {b.status === 'pending' && (
              <Stack direction="row" justifyContent="flex-end" mt={1}>
                <Button
                  size="small"
                  color="error"
                  variant="outlined"
                  onClick={e => {
                    e.stopPropagation()
                    setCancelId(b._id)
                  }}
                >
                  Huỷ lịch
                </Button>
              </Stack>
            )}
          </Box>
        ))}
      </Stack>

      {/* ===== PAGINATION (BasicPagination style) ===== */}
      {pagination && pagination.totalPages > 1 && (
        <Stack spacing={2} alignItems="center" mt={4}>
          <Pagination
            count={pagination.totalPages}
            page={page}
            onChange={(_, v) => setPage(v)}
            color="primary"
          />
        </Stack>
      )}

      {/* ===== DIALOG ===== */}
      <Dialog open={!!cancelId} onClose={() => setCancelId(null)}>
        <DialogTitle>Huỷ lịch đặt?</DialogTitle>
        <DialogContent>
          <Typography>
            Bạn có chắc chắn muốn huỷ lịch này không?
          </Typography>
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setCancelId(null)}>Đóng</Button>
          <Button
            variant="contained"
            onClick={confirmCancel}
            disabled={canceling}
          >
            Xác nhận huỷ
          </Button>
        </DialogActions>
      </Dialog>

      {/* ===== TOAST ===== */}
      <Snackbar
        open={toastOpen}
        autoHideDuration={3000}
        onClose={() => setToastOpen(false)}
      >
        <Alert severity="success" variant="filled">
          Huỷ lịch thành công
        </Alert>
      </Snackbar>
    </Container>
  )
}
