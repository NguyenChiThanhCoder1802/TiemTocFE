// src/components/Booking/MyCalendar.tsx
import { useEffect, useState } from "react";
import {
  Calendar,
  dateFnsLocalizer,
} from "react-big-calendar";
import type { Event } from "react-big-calendar";
import { format, parse, startOfWeek, getDay } from "date-fns";
import {vi} from "date-fns/locale/vi";
import "react-big-calendar/lib/css/react-big-calendar.css";
import { fetchMyBookings } from "../../services/bookingService";
import { Box, CircularProgress, Typography } from "@mui/material";

// Localizer cho react-big-calendar
const locales = {
  vi,
};

const localizer = dateFnsLocalizer({
  format,
  parse,
  startOfWeek: (date: Date) => startOfWeek(date, { weekStartsOn: 1 }),
  getDay,
  locales,
});

// Kiểu dữ liệu event
interface BookingEvent extends Event {
  id: number;
  title: string;
  start: Date;
  end: Date;
}

// Hàm chuyển chuỗi ngày DB -> Date
const toDate = (str: string) => {
  if (!str) return new Date();
  // "2025-09-09 01:07:00" -> "2025-09-09T01:07:00"
  return new Date(str.replace(" ", "T"));
};

export default function MyCalendar() {
  const [events, setEvents] = useState<BookingEvent[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadBookings = async () => {
      try {
        const data = await fetchMyBookings();
        // Mapping dữ liệu từ API -> calendar
        const mapped = data.map((b: any) => {
          const start = toDate(b.startTime);
          const end = b.endTime ? toDate(b.endTime) : new Date(start.getTime() + 60 * 60 * 1000); // mặc định +1h
          return {
            id: b.id,
            title: b.serviceName || "Lịch hẹn",
            start,
            end,
          };
        });
        setEvents(mapped);
      } catch (err) {
        console.error("Lỗi load lịch:", err);
      } finally {
        setLoading(false);
      }
    };
    loadBookings();
  }, []);

  if (loading) return <CircularProgress />;

  return (
    <Box sx={{ height: "70vh" }}>
      <Typography variant="h6" sx={{ mb: 2 }}>
        📅 Lịch của bạn
      </Typography>
      <Calendar
        localizer={localizer}
        events={events}
        startAccessor="start"
        endAccessor="end"
        style={{ height: "100%" }}
        views={["month", "week", "day"]}
        messages={{
          month: "Tháng",
          week: "Tuần",
          day: "Ngày",
          today: "Hôm nay",
          previous: "Trước",
          next: "Tiếp",
        }}
      />
    </Box>
  );
}
