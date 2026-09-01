import { useEffect, useState, useCallback } from "react"

import {
  Box,
  Typography,
  Tabs,
  Tab,
  Paper,
  Stack,
  TextField,
  InputAdornment,
  IconButton,
  LinearProgress,
  Chip,
  Tooltip,
  Skeleton,
  Pagination,
} from "@mui/material"

import SearchRoundedIcon from "@mui/icons-material/SearchRounded"
import RefreshRoundedIcon from "@mui/icons-material/RefreshRounded"
import CalendarMonthRoundedIcon from "@mui/icons-material/CalendarMonthRounded"
import PendingActionsRoundedIcon from "@mui/icons-material/PendingActionsRounded"
import TaskAltRoundedIcon from "@mui/icons-material/TaskAltRounded"
import AttachMoneyRoundedIcon from "@mui/icons-material/AttachMoneyRounded"
import ClearRoundedIcon from "@mui/icons-material/ClearRounded"

import type { BookingStatus } from "../../../types/Booking/Booking"
import type { AdminBooking } from "../../../types/Booking/AdminBooking"

import {
  getAllBookingsApi,
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
  { label: "Hoàn thành", value: "completed" },
  { label: "Đã huỷ", value: "cancelled" },
]

const LIMIT = 10

export default function BookingManager() {
  const [bookings, setBookings] = useState<AdminBooking[]>([])

  const [initialLoading, setInitialLoading] =
    useState(true)

  const [isFetching, setIsFetching] =
    useState(false)

  const [status, setStatus] =
    useState<BookingStatus | "all">("all")

  const [searchQuery, setSearchQuery] =
    useState("")

  const [search, setSearch] =
    useState("")

  const [page, setPage] = useState(1)

  const [totalPages, setTotalPages] =
    useState(0)

  const [total, setTotal] =
    useState(0)

  const [stats, setStats] = useState({
    total: 0,
    pending: 0,
    confirmed: 0,
    completed: 0,
    cancelled: 0,
  })

  const [selectedBooking, setSelectedBooking] =
    useState<AdminBooking | null>(null)

  /* =====================================================
     FETCH DATA
  ===================================================== */

  const fetchData = useCallback(
    async (isFirstLoad = false) => {
      if (isFirstLoad) {
        setInitialLoading(true)
      } else {
        setIsFetching(true)
      }

      try {
        const result =
          await getAllBookingsApi({
            page,
            limit: LIMIT,

            ...(status !== "all" && {
              status,
            }),

            ...(search.trim() && {
              search: search.trim(),
            }),
          })

        setBookings(result.data ?? [])

        setTotal(
          result.pagination?.total ?? 0
        )

        setTotalPages(
          result.pagination?.totalPages ?? 0
        )

        setStats(
          result.stats ?? {
            total: 0,
            pending: 0,
            confirmed: 0,
            completed: 0,
            cancelled: 0,
          }
        )
      } catch (error) {
        console.error(
          "Lỗi khi tải danh sách booking:",
          error
        )

        setBookings([])
        setTotal(0)
        setTotalPages(0)
      } finally {
        setInitialLoading(false)
        setIsFetching(false)
      }
    },
    [page, status, search]
  )

  /* =====================================================
     LOAD DATA
  ===================================================== */

  useEffect(() => {
    fetchData(page === 1 && !search)
  }, [fetchData])

  /* =====================================================
     SEARCH
  ===================================================== */

  const handleSearch = (
    value: string
  ) => {
    setSearchQuery(value)

    // Search mới → quay về page 1
    setPage(1)
  }

  /* =====================================================
     CLEAR SEARCH
  ===================================================== */

  const handleClearSearch = () => {
    setSearchQuery("")
    setSearch("")
    setPage(1)
  }

  /* =====================================================
     STATUS TAB
  ===================================================== */

  const handleStatusChange = (
    value: BookingStatus | "all"
  ) => {
    setStatus(value)
    setPage(1)
  }

  return (
    <Box
      sx={{
        p: {
          xs: 2,
          sm: 3,
          md: 4,
        },
        bgcolor: "background.default",
        minHeight: "100vh",
      }}
    >
      {/* =================================================
          HEADER
      ================================================= */}

      <Box
        display="flex"
        flexDirection={{
          xs: "column",
          sm: "row",
        }}
        justifyContent="space-between"
        alignItems={{
          xs: "flex-start",
          sm: "center",
        }}
        gap={2}
        mb={3}
      >
        <Box>
          <Typography
            variant="h4"
            fontWeight={800}
            sx={{
              lineHeight: 1.2,
            }}
          >
            Quản lý lịch đặt
          </Typography>

          <Typography
            variant="body2"
            color="text.secondary"
            mt={0.5}
          >
            Quản lý và theo dõi tất cả lịch đặt
          </Typography>
        </Box>

        <Tooltip title="Làm mới dữ liệu">
          <IconButton
            onClick={() => fetchData(false)}
            disabled={isFetching}
            sx={{
              bgcolor: "background.paper",
              boxShadow: 1,
              "&:hover": {
                bgcolor: "action.hover",
              },
            }}
          >
            <RefreshRoundedIcon
              sx={{
                animation: isFetching
                  ? "spin 1s linear infinite"
                  : "none",

                "@keyframes spin": {
                  "0%": {
                    transform:
                      "rotate(0deg)",
                  },
                  "100%": {
                    transform:
                      "rotate(360deg)",
                  },
                },
              }}
            />
          </IconButton>
        </Tooltip>
      </Box>

      {/* =================================================
          KPI
      ================================================= */}

      <Box
        display="flex"
        flexWrap="wrap"
        gap={2}
        mb={4}
        sx={{
          "& > *": {
            flex: {
              xs: "1 1 100%",
              sm: "1 1 calc(50% - 16px)",
              md: "1 1 calc(25% - 16px)",
            },
          },
        }}
      >
        {/* TOTAL */}

        <Paper
          elevation={0}
          sx={{
            p: 2.5,
            borderRadius: 3,
            border: "1px solid",
            borderColor: "divider",
            display: "flex",
            alignItems: "center",
            gap: 2,
          }}
        >
          <Box
            sx={{
              p: 1.5,
              borderRadius: 2.5,
              bgcolor: "primary.50",
              color: "primary.main",
            }}
          >
            <CalendarMonthRoundedIcon />
          </Box>

          <Box>
            <Typography
              variant="caption"
              color="text.secondary"
              fontWeight={600}
            >
              TỔNG SỐ LỊCH
            </Typography>

            <Typography
              variant="h6"
              fontWeight={800}
            >
              {initialLoading ? (
                <Skeleton width={50} />
              ) : (
                total
              )}
            </Typography>
          </Box>
        </Paper>

        {/* PENDING */}

        <Paper
          elevation={0}
          sx={{
            p: 2.5,
            borderRadius: 3,
            border: "1px solid",
            borderColor: "divider",
            display: "flex",
            alignItems: "center",
            gap: 2,
          }}
        >
          <Box
            sx={{
              p: 1.5,
              borderRadius: 2.5,
              bgcolor: "warning.50",
              color: "warning.main",
            }}
          >
            <PendingActionsRoundedIcon />
          </Box>

          <Box>
            <Typography
              variant="caption"
              color="text.secondary"
              fontWeight={600}
            >
              CHỜ DUYỆT
            </Typography>

            <Typography
              variant="h6"
              fontWeight={800}
              color="warning.dark"
            >
              {initialLoading ? (
                <Skeleton width={50} />
              ) : (
                stats.pending
              )}
            </Typography>
          </Box>
        </Paper>

        {/* COMPLETED */}

        <Paper
          elevation={0}
          sx={{
            p: 2.5,
            borderRadius: 3,
            border: "1px solid",
            borderColor: "divider",
            display: "flex",
            alignItems: "center",
            gap: 2,
          }}
        >
          <Box
            sx={{
              p: 1.5,
              borderRadius: 2.5,
              bgcolor: "success.50",
              color: "success.main",
            }}
          >
            <TaskAltRoundedIcon />
          </Box>

          <Box>
            <Typography
              variant="caption"
              color="text.secondary"
              fontWeight={600}
            >
              ĐÃ HOÀN THÀNH
            </Typography>

            <Typography
              variant="h6"
              fontWeight={800}
              color="success.dark"
            >
              {initialLoading ? (
                <Skeleton width={50} />
              ) : (
                stats.completed
              )}
            </Typography>
          </Box>
        </Paper>

        {/* REVENUE */}

        <Paper
          elevation={0}
          sx={{
            p: 2.5,
            borderRadius: 3,
            border: "1px solid",
            borderColor: "divider",
            display: "flex",
            alignItems: "center",
            gap: 2,
          }}
        >
          <Box
            sx={{
              p: 1.5,
              borderRadius: 2.5,
              bgcolor: "info.50",
              color: "info.main",
            }}
          >
            <AttachMoneyRoundedIcon />
          </Box>

          <Box>
            <Typography
              variant="caption"
              color="text.secondary"
              fontWeight={600}
            >
              DOANH THU ĐÃ THU
            </Typography>

            <Typography
              variant="h6"
              fontWeight={800}
              color="info.dark"
            >
              {initialLoading ? (
                <Skeleton width={80} />
              ) : (
                `${bookings
                  .filter(
                    (b) =>
                      b.status ===
                      "completed"
                  )
                  .reduce(
                    (sum, b) =>
                      sum +
                      (b.price?.final ??
                        0),
                    0
                  )
                  .toLocaleString(
                    "vi-VN"
                  )}đ`
              )}
            </Typography>
          </Box>
        </Paper>
      </Box>

      {/* =================================================
          FILTER + SEARCH
      ================================================= */}

      <Paper
        elevation={0}
        sx={{
          borderRadius: 3,
          border: "1px solid",
          borderColor: "divider",
          mb: 3,
          overflow: "hidden",
        }}
      >
        <Box
          display="flex"
          flexDirection={{
            xs: "column",
            md: "row",
          }}
          justifyContent="space-between"
          alignItems={{
            xs: "stretch",
            md: "center",
          }}
          p={1.5}
          gap={2}
        >
          {/* STATUS */}

          <Tabs
            value={status}
            onChange={(_, value) =>
              handleStatusChange(value)
            }
            variant="scrollable"
            scrollButtons="auto"
            sx={{
              minHeight: 44,

              "& .MuiTab-root": {
                minHeight: 44,
                fontWeight: 600,
                borderRadius: 2,
                px: 2,
                mr: 0.5,
              },
            }}
          >
            {STATUS_TABS.map((tab) => (
              <Tab
                key={tab.value}
                value={tab.value}
                label={
                  <Stack
                    direction="row"
                    spacing={1}
                    alignItems="center"
                  >
                    <span>
                      {tab.label}
                    </span>

                    {status ===
                      tab.value && (
                      <Chip
                        label={total}
                        size="small"
                        color="primary"
                        sx={{
                          height: 20,
                          fontSize:
                            "0.7rem",
                          fontWeight: 700,
                        }}
                      />
                    )}
                  </Stack>
                }
              />
            ))}
          </Tabs>

          {/* SEARCH */}

          <Box
            sx={{
              width: {
                xs: "100%",
                md: 360,
              },
            }}
          >
            <TextField
              fullWidth
              size="small"
              placeholder="Tên, số điện thoại hoặc email..."
              value={searchQuery}
              onChange={(e) =>
                handleSearch(
                  e.target.value
                )
              }
              onKeyDown={(e) => {
                if (e.key === "Enter") {
                  setSearch(
                    searchQuery.trim()
                  )
                }
              }}
              InputProps={{
                startAdornment: (
                  <InputAdornment position="start">
                    <SearchRoundedIcon
                      fontSize="small"
                      color="action"
                    />
                  </InputAdornment>
                ),

                endAdornment:
                  searchQuery && (
                    <InputAdornment position="end">
                      <IconButton
                        size="small"
                        onClick={
                          handleClearSearch
                        }
                      >
                        <ClearRoundedIcon
                          fontSize="small"
                        />
                      </IconButton>
                    </InputAdornment>
                  ),

                sx: {
                  borderRadius: 2,
                  bgcolor:
                    "background.default",
                },
              }}
            />
          </Box>
        </Box>

        {/* SEARCH BUTTON */}

        <Box
          sx={{
            px: 1.5,
            pb: 1.5,
            display: "flex",
            justifyContent: "flex-end",
          }}
        >
          <Typography
            variant="caption"
            color="text.secondary"
          >
            Nhấn Enter để tìm kiếm
          </Typography>
        </Box>

        <Box
          sx={{
            height: 3,
            width: "100%",
          }}
        >
          {isFetching && (
            <LinearProgress
              sx={{ height: 3 }}
            />
          )}
        </Box>
      </Paper>

      {/* =================================================
          TABLE
      ================================================= */}

      <Box
        sx={{
          position: "relative",
          opacity: isFetching ? 0.7 : 1,
          transition:
            "opacity 0.2s",
        }}
      >
        {initialLoading ? (
          <Paper
            sx={{
              p: 4,
              borderRadius: 3,
            }}
          >
            <Stack spacing={2}>
              <Skeleton
                variant="rectangular"
                height={40}
              />

              <Skeleton
                variant="rectangular"
                height={60}
              />

              <Skeleton
                variant="rectangular"
                height={60}
              />

              <Skeleton
                variant="rectangular"
                height={60}
              />
            </Stack>
          </Paper>
        ) : (
          <BookingTable
            bookings={bookings}
            onSelect={setSelectedBooking}
          />
        )}
      </Box>

      {/* =================================================
          EMPTY SEARCH
      ================================================= */}

      {!initialLoading &&
        bookings.length === 0 && (
          <Paper
            elevation={0}
            sx={{
              mt: 2,
              p: 4,
              textAlign: "center",
              borderRadius: 3,
              border: "1px solid",
              borderColor: "divider",
            }}
          >
            <Typography
              fontWeight={600}
            >
              Không tìm thấy booking
            </Typography>

            <Typography
              variant="body2"
              color="text.secondary"
              mt={0.5}
            >
              Thử tìm bằng tên, số điện thoại
              hoặc email của khách hàng.
            </Typography>
          </Paper>
        )}

      {/* =================================================
          PAGINATION
      ================================================= */}

      {!initialLoading &&
        totalPages > 1 && (
          <Box
            display="flex"
            justifyContent="center"
            mt={3}
          >
            <Pagination
              count={totalPages}
              page={page}
              onChange={(_, value) =>
                setPage(value)
              }
              color="primary"
              shape="rounded"
              disabled={isFetching}
            />
          </Box>
        )}

      {/* =================================================
          DETAIL DIALOG
      ================================================= */}

      <BookingDetailDialog
        booking={selectedBooking}
        onClose={() =>
          setSelectedBooking(null)
        }
        onUpdated={() =>
          fetchData(false)
        }
      />
    </Box>
  )
}