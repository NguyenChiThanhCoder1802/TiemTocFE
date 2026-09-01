import React, { useState } from "react"

import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Typography,
  Box,
  Button,
  Stack,
  IconButton,
  Chip,
  Paper,
  CircularProgress,
  Divider,
} from "@mui/material"

import CloseIcon from "@mui/icons-material/Close"
import CheckCircleOutlineIcon from "@mui/icons-material/CheckCircleOutline"
import CancelOutlinedIcon from "@mui/icons-material/CancelOutlined"
import TaskAltIcon from "@mui/icons-material/TaskAlt"

import PersonIcon from "@mui/icons-material/Person"
import PhoneIcon from "@mui/icons-material/Phone"
import EmailIcon from "@mui/icons-material/Email"
import BadgeIcon from "@mui/icons-material/Badge"
import CategoryIcon from "@mui/icons-material/Category"
import AccessTimeIcon from "@mui/icons-material/AccessTime"
import ReceiptLongIcon from "@mui/icons-material/ReceiptLong"
import PaymentIcon from "@mui/icons-material/Payment"
import LocalOfferIcon from "@mui/icons-material/LocalOffer"
import EventBusyIcon from "@mui/icons-material/EventBusy"
import NotesIcon from "@mui/icons-material/Notes"

import type { AdminBooking } from "../../../types/Booking/AdminBooking"

import {
  approveBookingApi,
  cancelBookingApi,
  completeBookingApi,
} from "../../../api/AdminAPI"

interface Props {
  booking: AdminBooking | null
  onClose: () => void
  onUpdated: () => void
}

/* ================== HELPERS ================== */

const formatMoney = (value?: number) => {
  return `${(value ?? 0).toLocaleString("vi-VN")}đ`
}

const formatDateTime = (value?: string | null) => {
  if (!value) return "-"

  return new Date(value).toLocaleString("vi-VN", {
    day: "2-digit",
    month: "2-digit",
    year: "numeric",
    hour: "2-digit",
    minute: "2-digit",
  })
}

const formatDuration = (minutes?: number) => {
  if (!minutes) return "0 phút"

  const hours = Math.floor(minutes / 60)
  const remainingMinutes = minutes % 60

  if (hours === 0) {
    return `${remainingMinutes} phút`
  }

  if (remainingMinutes === 0) {
    return `${hours} giờ`
  }

  return `${hours} giờ ${remainingMinutes} phút`
}

const bookingStatusLabel: Record<string, string> = {
  pending: "Chờ duyệt",
  confirmed: "Đã xác nhận",
  in_progress: "Đang thực hiện",
  completed: "Hoàn thành",
  no_show: "Không đến",
  cancelled: "Đã huỷ",
}

const paymentStatusLabel: Record<string, string> = {
  unpaid: "Chưa thanh toán",
  paid: "Đã thanh toán",
  failed: "Thanh toán thất bại",
}

const bookingTypeLabel: Record<string, string> = {
  service: "Dịch vụ",
  combo: "Combo",
}

/* ================== ROW ================== */

interface InfoRowProps {
  icon?: React.ReactNode
  label: string
  children: React.ReactNode
}

const InfoRow = ({
  icon,
  label,
  children,
}: InfoRowProps) => {
  return (
    <Box
      sx={{
        display: "flex",
        alignItems: "flex-start",
        minHeight: 36,
      }}
    >
      <Box
        sx={{
          width: 190,
          minWidth: 190,
          display: "flex",
          alignItems: "center",
          gap: 1,
          color: "text.secondary",
        }}
      >
        {icon}
        <Typography variant="body2">
          {label}
        </Typography>
      </Box>

      <Box sx={{ flex: 1 }}>
        <Typography
          variant="body2"
          fontWeight={600}
          sx={{
            wordBreak: "break-word",
          }}
        >
          {children}
        </Typography>
      </Box>
    </Box>
  )
}

/* ================== SECTION ================== */

interface SectionProps {
  title: string
  icon?: React.ReactNode
  children: React.ReactNode
}

const Section = ({
  title,
  icon,
  children,
}: SectionProps) => {
  return (
    <Paper
      elevation={0}
      sx={{
        border: "1px solid",
        borderColor: "divider",
        borderRadius: 2,
        overflow: "hidden",
      }}
    >
      <Box
        sx={{
          px: 2.5,
          py: 1.75,
          display: "flex",
          alignItems: "center",
          gap: 1,
          bgcolor: "action.hover",
        }}
      >
        {icon}

        <Typography
          variant="subtitle2"
          fontWeight={700}
          color="primary.main"
          sx={{
            textTransform: "uppercase",
          }}
        >
          {title}
        </Typography>
      </Box>

      <Box sx={{ px: 2.5, py: 2 }}>
        {children}
      </Box>
    </Paper>
  )
}

/* ================== COMPONENT ================== */

export default function BookingDetailDialog({
  booking,
  onClose,
  onUpdated,
}: Props) {
  const [loading, setLoading] = useState(false)

  if (!booking) return null

  const handleApprove = async () => {
    try {
      setLoading(true)

      await approveBookingApi(booking._id)

      onClose()
      onUpdated()
    } catch (error) {
      console.error(error)
    } finally {
      setLoading(false)
    }
  }

  const handleCancel = async () => {
    try {
      setLoading(true)

      await cancelBookingApi(
        booking._id,
        "Admin huỷ"
      )

      onClose()
      onUpdated()
    } catch (error) {
      console.error(error)
    } finally {
      setLoading(false)
    }
  }

  const handleComplete = async () => {
    try {
      setLoading(true)

      await completeBookingApi(booking._id)

      onClose()
      onUpdated()
    } catch (error) {
      console.error(error)
    } finally {
      setLoading(false)
    }
  }

  return (
    <Dialog
      open={!!booking}
      onClose={onClose}
      maxWidth="md"
      fullWidth
      PaperProps={{
        sx: {
          borderRadius: 3,
          overflow: "hidden",
        },
      }}
    >
      {/* ================= HEADER ================= */}

      <DialogTitle
        sx={{
          p: 2.5,
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          bgcolor: (theme) =>
            theme.palette.mode === "light"
              ? "grey.50"
              : "grey.900",
        }}
      >
        <Box
          sx={{
            display: "flex",
            alignItems: "center",
            gap: 1.5,
          }}
        >
          <Typography
            variant="h6"
            fontWeight={700}
          >
            Chi tiết Booking
          </Typography>

          <Chip
            label={`#${booking._id
              .slice(-6)
              .toUpperCase()}`}
            size="small"
            color="primary"
            variant="outlined"
            sx={{
              fontWeight: 600,
              borderRadius: 1,
            }}
          />
        </Box>

        <IconButton onClick={onClose}>
          <CloseIcon />
        </IconButton>
      </DialogTitle>

      {/* ================= CONTENT ================= */}

      <DialogContent
        dividers
        sx={{
          p: 2.5,
          bgcolor: "background.default",
        }}
      >
        <Stack spacing={2}>

          {/* ================= KHÁCH HÀNG ================= */}

          <Section
            title="Thông tin khách hàng"
            icon={<PersonIcon fontSize="small" color="primary" />}
          >
            <Stack spacing={0.5}>
              <InfoRow
                icon={<PersonIcon fontSize="small" />}
                label="Khách hàng"
              >
                {booking.customer?.name ||
                  "Khách vãng lai"}
              </InfoRow>

              <InfoRow
                icon={<PhoneIcon fontSize="small" />}
                label="Số điện thoại"
              >
                {booking.customer?.phone ||
                  "Không có"}
              </InfoRow>

              <InfoRow
                icon={<EmailIcon fontSize="small" />}
                label="Email"
              >
                {booking.customer?.email ||
                  "Không có"}
              </InfoRow>

              <InfoRow
                icon={<BadgeIcon fontSize="small" />}
                label="Nhân viên"
              >
                {booking.staff?.name ||
                  "Chưa gán"}
              </InfoRow>

              <InfoRow
                icon={<PhoneIcon fontSize="small" />}
                label="SĐT nhân viên"
              >
                {booking.staff?.phone ||
                  "Không có"}
              </InfoRow>
            </Stack>
          </Section>

          {/* ================= BOOKING ================= */}

          <Section
            title="Thông tin lịch hẹn"
            icon={
              <AccessTimeIcon
                fontSize="small"
                color="primary"
              />
            }
          >
            <Stack spacing={0.5}>
              <InfoRow
                icon={
                  <CategoryIcon fontSize="small" />
                }
                label="Loại booking"
              >
                {bookingTypeLabel[
                  booking.bookingType
                ] || booking.bookingType}
              </InfoRow>

              <InfoRow
                icon={
                  <AccessTimeIcon fontSize="small" />
                }
                label="Thời gian bắt đầu"
              >
                {formatDateTime(
                  booking.startTime
                )}
              </InfoRow>

              <InfoRow
                icon={
                  <AccessTimeIcon fontSize="small" />
                }
                label="Thời gian kết thúc"
              >
                {formatDateTime(
                  booking.endTime
                )}
              </InfoRow>

              <InfoRow
                icon={
                  <AccessTimeIcon fontSize="small" />
                }
                label="Thời lượng"
              >
                {formatDuration(
                  booking.duration
                )}
              </InfoRow>

              <InfoRow label="Trạng thái">
                <Chip
                  label={
                    bookingStatusLabel[
                      booking.status
                    ] || booking.status
                  }
                  size="small"
                  color={
                    booking.status ===
                    "cancelled"
                      ? "error"
                      : booking.status ===
                          "completed"
                        ? "success"
                        : "primary"
                  }
                  sx={{
                    fontWeight: 600,
                  }}
                />
              </InfoRow>
            </Stack>
          </Section>

          {/* ================= SERVICES ================= */}

          {booking.services.length > 0 && (
            <Section
              title={`Dịch vụ (${booking.services.length})`}
              icon={
                <ReceiptLongIcon
                  fontSize="small"
                  color="primary"
                />
              }
            >
              <Stack spacing={0}>
                {/* HEADER */}

                <Box
                  sx={{
                    display: "flex",
                    alignItems: "center",
                    pb: 1,
                    borderBottom:
                      "1px solid",
                    borderColor: "divider",
                  }}
                >
                  <Typography
                    variant="caption"
                    color="text.secondary"
                    sx={{
                      flex: 1,
                      fontWeight: 700,
                    }}
                  >
                    Dịch vụ
                  </Typography>

                  <Typography
                    variant="caption"
                    color="text.secondary"
                    sx={{
                      width: 100,
                      textAlign: "right",
                      fontWeight: 700,
                    }}
                  >
                    Thời lượng
                  </Typography>

                  <Typography
                    variant="caption"
                    color="text.secondary"
                    sx={{
                      width: 130,
                      textAlign: "right",
                      fontWeight: 700,
                    }}
                  >
                    Giá gốc
                  </Typography>

                  <Typography
                    variant="caption"
                    color="text.secondary"
                    sx={{
                      width: 100,
                      textAlign: "right",
                      fontWeight: 700,
                    }}
                  >
                    Giảm
                  </Typography>

                  <Typography
                    variant="caption"
                    color="text.secondary"
                    sx={{
                      width: 140,
                      textAlign: "right",
                      fontWeight: 700,
                    }}
                  >
                    Sau giảm
                  </Typography>
                </Box>

                {/* SERVICE ROWS */}

                {booking.services.map(
                  (service, index) => (
                    <Box key={index}>
                      <Box
                        sx={{
                          display: "flex",
                          alignItems:
                            "center",
                          py: 1.5,
                        }}
                      >
                        <Box
                          sx={{
                            flex: 1,
                            minWidth: 0,
                          }}
                        >
                          <Typography
                            variant="body2"
                            fontWeight={700}
                          >
                            {service.nameSnapshot ||
                              "Không có tên"}
                          </Typography>

                          {service.slugSnapshot && (
                            <Typography
                              variant="caption"
                              color="text.secondary"
                            >
                              {service.slugSnapshot}
                            </Typography>
                          )}
                        </Box>

                        <Typography
                          variant="body2"
                          sx={{
                            width: 100,
                            textAlign:
                              "right",
                          }}
                        >
                          {service.durationSnapshot ??
                            0}{" "}
                          phút
                        </Typography>

                        <Typography
                          variant="body2"
                          sx={{
                            width: 130,
                            textAlign:
                              "right",
                          }}
                        >
                          {formatMoney(
                            service.originalPriceSnapshot
                          )}
                        </Typography>

                        <Typography
                          variant="body2"
                          color="error.main"
                          sx={{
                            width: 100,
                            textAlign:
                              "right",
                          }}
                        >
                          -
                          {service.serviceDiscountPercent ??
                            0}
                          %
                        </Typography>

                        <Typography
                          variant="body2"
                          fontWeight={700}
                          color="primary.main"
                          sx={{
                            width: 140,
                            textAlign:
                              "right",
                          }}
                        >
                          {formatMoney(
                            service.priceAfterServiceDiscount
                          )}
                        </Typography>
                      </Box>

                      {index <
                        booking.services
                          .length -
                          1 && (
                        <Divider />
                      )}
                    </Box>
                  )
                )}
              </Stack>
            </Section>
          )}

          {/* ================= COMBO ================= */}

          {booking.comboSnapshot && (
            <Section
              title="Thông tin Combo"
              icon={
                <ReceiptLongIcon
                  fontSize="small"
                  color="primary"
                />
              }
            >
              <Stack spacing={0.5}>
                <InfoRow label="Tên combo">
                  {booking.comboSnapshot.name}
                </InfoRow>

                <InfoRow label="Giá gốc">
                  {formatMoney(
                    booking.comboSnapshot
                      .originalPrice
                  )}
                </InfoRow>

                <InfoRow label="Giá combo">
                  {formatMoney(
                    booking.comboSnapshot
                      .comboPrice
                  )}
                </InfoRow>
              </Stack>
            </Section>
          )}

          {/* ================= DISCOUNT ================= */}

          {booking.discount && (
            <Section
              title="Thông tin giảm giá"
              icon={
                <LocalOfferIcon
                  fontSize="small"
                  color="primary"
                />
              }
            >
              <Stack spacing={0.5}>
                <InfoRow label="Mã giảm giá">
                  {booking.discount.code}
                </InfoRow>

                <InfoRow label="Loại giảm">
                  {booking.discount.discountType ===
                  "percent"
                    ? "Phần trăm"
                    : "Số tiền cố định"}
                </InfoRow>

                <InfoRow label="Giá trị">
                  {booking.discount.discountType ===
                  "percent"
                    ? `${booking.discount.discountValue}%`
                    : formatMoney(
                        booking.discount
                          .discountValue
                      )}
                </InfoRow>

                <InfoRow label="Số tiền giảm">
                  <Typography
                    component="span"
                    color="error.main"
                    fontWeight={700}
                  >
                    -
                    {formatMoney(
                      booking.discount
                        .discountAmount
                    )}
                  </Typography>
                </InfoRow>
              </Stack>
            </Section>
          )}

          {/* ================= PAYMENT ================= */}

          <Section
            title="Thanh toán"
            icon={
              <PaymentIcon
                fontSize="small"
                color="primary"
              />
            }
          >
            <Stack spacing={0.5}>
              <InfoRow label="Phương thức">
                {booking.paymentMethod ||
                  booking.payment?.method ||
                  "Không có"}
              </InfoRow>

              <InfoRow label="Trạng thái thanh toán">
                <Chip
                  label={
                    paymentStatusLabel[
                      booking.paymentStatus
                    ] ||
                    booking.paymentStatus
                  }
                  size="small"
                  color={
                    booking.paymentStatus ===
                    "paid"
                      ? "success"
                      : booking.paymentStatus ===
                          "failed"
                        ? "error"
                        : "warning"
                  }
                  sx={{
                    fontWeight: 600,
                  }}
                />
              </InfoRow>

              {booking.payment && (
                <>
                  <InfoRow label="Số tiền thanh toán">
                    {formatMoney(
                      booking.payment.amount
                    )}
                  </InfoRow>

                  <InfoRow label="Trạng thái giao dịch">
                    {booking.payment.status}
                  </InfoRow>
                </>
              )}
            </Stack>
          </Section>

          {/* ================= PRICE ================= */}

          <Paper
            elevation={0}
            sx={{
              borderRadius: 2,
              p: 2.5,
              bgcolor: (theme) =>
                theme.palette.mode ===
                "light"
                  ? "primary.50"
                  : "grey.900",
              border: "1px solid",
              borderColor: "primary.100",
            }}
          >
            <Box
              sx={{
                display: "flex",
                alignItems: "center",
                gap: 1,
                mb: 2,
              }}
            >
              <ReceiptLongIcon color="primary" />

              <Typography
                variant="subtitle1"
                fontWeight={700}
                color="primary.main"
              >
                Tóm tắt chi phí
              </Typography>
            </Box>

            <Stack spacing={1}>
              <InfoRow label="Tổng tiền gốc">
                {formatMoney(
                  booking.price.original
                )}
              </InfoRow>

              <InfoRow label="Sau giảm dịch vụ">
                {formatMoney(
                  booking.price
                    .afterServiceDiscount
                )}
              </InfoRow>

              <InfoRow label="Giảm voucher / khác">
                <Typography
                  component="span"
                  color="error.main"
                  fontWeight={600}
                >
                  -
                  {formatMoney(
                    booking.price
                      .discountAmount
                  )}
                </Typography>
              </InfoRow>

              <Divider />

              <Box
                sx={{
                  display: "flex",
                  alignItems: "center",
                  pt: 0.5,
                }}
              >
                <Typography
                  variant="body1"
                  fontWeight={700}
                  sx={{
                    width: 190,
                    minWidth: 190,
                  }}
                >
                  Tổng thanh toán
                </Typography>

                <Typography
                  variant="h6"
                  fontWeight={800}
                  color="primary.main"
                >
                  {formatMoney(
                    booking.price.final
                  )}
                </Typography>
              </Box>
            </Stack>
          </Paper>

          {/* ================= CANCEL ================= */}

          {booking.status ===
            "cancelled" && (
            <Section
              title="Thông tin huỷ booking"
              icon={
                <EventBusyIcon
                  fontSize="small"
                  color="error"
                />
              }
            >
              <Stack spacing={0.5}>
                <InfoRow label="Lý do huỷ">
                  {booking.cancelReason ||
                    "Không có"}
                </InfoRow>

                <InfoRow label="Thời gian huỷ">
                  {formatDateTime(
                    booking.cancelledAt
                  )}
                </InfoRow>

                <InfoRow label="Người huỷ">
                  {booking.cancelledBy ||
                    "Không có"}
                </InfoRow>
              </Stack>
            </Section>
          )}

          {/* ================= NOTE ================= */}

          {booking.note && (
            <Section
              title="Ghi chú"
              icon={
                <NotesIcon
                  fontSize="small"
                  color="primary"
                />
              }
            >
              <Typography
                variant="body2"
                sx={{
                  whiteSpace: "pre-wrap",
                }}
              >
                {booking.note}
              </Typography>
            </Section>
          )}
        </Stack>
      </DialogContent>

      {/* ================= ACTIONS ================= */}

      <DialogActions
        sx={{
          p: 2,
          gap: 1,
          borderTop: "1px solid",
          borderColor: "divider",
        }}
      >
        {booking.status === "pending" && (
          <>
            <Button
              variant="contained"
              color="primary"
              startIcon={
                loading ? (
                  <CircularProgress
                    size={16}
                    color="inherit"
                  />
                ) : (
                  <CheckCircleOutlineIcon />
                )
              }
              disabled={loading}
              onClick={handleApprove}
              sx={{
                borderRadius: 2,
                px: 3,
                fontWeight: 600,
              }}
            >
              Duyệt
            </Button>

            <Button
              color="error"
              variant="outlined"
              startIcon={
                <CancelOutlinedIcon />
              }
              disabled={loading}
              onClick={handleCancel}
              sx={{
                borderRadius: 2,
                px: 3,
                fontWeight: 600,
              }}
            >
              Huỷ
            </Button>
          </>
        )}

        {booking.status === "confirmed" && (
          <Button
            color="success"
            variant="contained"
            startIcon={
              loading ? (
                <CircularProgress
                  size={16}
                  color="inherit"
                />
              ) : (
                <TaskAltIcon />
              )
            }
            disabled={loading}
            onClick={handleComplete}
            sx={{
              borderRadius: 2,
              px: 3,
              fontWeight: 600,
            }}
          >
            Hoàn thành
          </Button>
        )}

        <Box sx={{ flex: 1 }} />

        <Button
          onClick={onClose}
          color="inherit"
          sx={{
            borderRadius: 2,
            px: 2,
          }}
        >
          Đóng
        </Button>
      </DialogActions>
    </Dialog>
  )
}