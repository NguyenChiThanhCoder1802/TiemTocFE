import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableRow,
  Typography,
  Chip
} from "@mui/material"
import type { ChipProps } from "@mui/material"
import type { BookingStatus } from "../../../types/Booking/Booking"
import type { AdminBooking } from "../../../types/Booking/AdminBooking"

type ChipColor = NonNullable<ChipProps["color"]>

const statusColorMap: Record<BookingStatus, ChipColor> = {
  pending: "warning",
  confirmed: "info",
  in_progress: "primary",
  completed: "success",
  cancelled: "error",
  no_show: "default"
}

interface Props {
  bookings: AdminBooking[]
  onSelect: (b: AdminBooking) => void
}

export default function BookingTable({ bookings, onSelect }: Props) {
  return (
    <Table>
      <TableHead>
        <TableRow>
          <TableCell>Ngày & Giờ</TableCell>
          <TableCell>Khách hàng</TableCell>
          <TableCell>Nhân viên</TableCell>
          <TableCell>Dịch vụ</TableCell>
          <TableCell>Tổng tiền</TableCell>
          <TableCell>Trạng thái</TableCell>
        </TableRow>
      </TableHead>

      <TableBody>
        {!bookings.length && (
          <TableRow>
            <TableCell colSpan={6} align="center">
              <Typography color="text.secondary">
                Không có lịch đặt
              </Typography>
            </TableCell>
          </TableRow>
        )}

        {bookings.map(b => (
          <TableRow
            key={b._id}
            hover
            sx={{ cursor: "pointer" }}
            onClick={() => onSelect(b)}
          >
            <TableCell>
              <Typography fontWeight={600}>
                {new Date(b.startTime).toLocaleDateString()}
              </Typography>
              <Typography variant="body2" color="text.secondary">
                {new Date(b.startTime).toLocaleTimeString([], {
                  hour: "2-digit",
                  minute: "2-digit"
                })}
              </Typography>
            </TableCell>

            <TableCell>{b.customer?.name}</TableCell>
            <TableCell>{b.staff?.user?.name ?? "Chưa gán"}</TableCell>

            <TableCell>
              {b.services.map(s => (
                <Typography key={s.service} variant="body2">
                  • {s.nameSnapshot}
                </Typography>
              ))}
            </TableCell>

            <TableCell>
              {(b.price?.final ?? 0).toLocaleString()}đ
            </TableCell>

            <TableCell>
              <Chip
                size="small"
                label={b.status}
                color={statusColorMap[b.status]}
              />
            </TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  )
}