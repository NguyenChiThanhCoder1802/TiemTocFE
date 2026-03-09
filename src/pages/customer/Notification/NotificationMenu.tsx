import {
  IconButton,
  Badge,
  Menu,
  MenuItem,
  Typography,
  Box
} from "@mui/material"
import NotificationsIcon from "@mui/icons-material/Notifications"
import { useEffect, useState } from "react"
import { useNavigate } from "react-router-dom"

import {
  getMyNotificationsApi,
  markNotificationReadApi,
  markAllNotificationsReadApi
} from "../../../api/notificationApi"

import type { Notification } from "../../../types/Notification/Notification"

export default function NotificationMenu() {

  const navigate = useNavigate()

  const [notifications, setNotifications] = useState<Notification[]>([])
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null)

  const open = Boolean(anchorEl)

  const unreadCount = notifications.filter(n => !n.isRead).length

  const handleOpen = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget)
  }

  const handleClose = () => {
    setAnchorEl(null)
  }

  /* ================= FETCH NOTIFICATIONS ================= */

  const fetchNotifications = async () => {
    try {
      const res = await getMyNotificationsApi(1, 5)
      setNotifications(res.data)
    } catch (err) {
      console.error(err)
    }
  }

  useEffect(() => {
    fetchNotifications()
  }, [])

  /* ================= MARK ONE READ ================= */

  const handleClickNotification = async (n: Notification) => {

    try {

      if (!n.isRead) {
        await markNotificationReadApi(n._id)

        setNotifications(prev =>
          prev.map(item =>
            item._id === n._id ? { ...item, isRead: true } : item
          )
        )
      }

      if (n.booking?._id) {
        navigate(`/bookings/${n.booking._id}`)
      }

    } catch (err) {
      console.error(err)
    }

    handleClose()
  }

  /* ================= MARK ALL ================= */

  const handleMarkAllRead = async () => {

    try {

      await markAllNotificationsReadApi()

      setNotifications(prev =>
        prev.map(n => ({ ...n, isRead: true }))
      )

    } catch (err) {
      console.error(err)
    }
  }

  return (
    <>
      <IconButton onClick={handleOpen}>
        <Badge badgeContent={unreadCount} color="error">
          <NotificationsIcon sx={{ color: "#d2a679" }} />
        </Badge>
      </IconButton>

      <Menu anchorEl={anchorEl} open={open} onClose={handleClose} PaperProps={{
    sx: {
      width: 360,
      maxWidth: "90vw"
    }
  }}>

        <Box sx={{ px: 2, py: 1, display: "flex", justifyContent: "space-between" }}>
          <Typography fontWeight={600}>
            Thông báo
          </Typography>

          {notifications.length > 0 && (
            <Typography
              variant="caption"
              sx={{ cursor: "pointer" }}
              onClick={handleMarkAllRead}
            >
              Đánh dấu tất cả
            </Typography>
          )}
        </Box>

        {notifications.length === 0 && (
          <MenuItem>Không có thông báo</MenuItem>
        )}

        {notifications.map((n) => {

          const service = n.booking?.services?.[0]

          return (
            <MenuItem
            key={n._id}
            onClick={() => handleClickNotification(n)}
            sx={{
                alignItems: "flex-start",
                gap: 1.5,
                whiteSpace: "normal"
            }}
            >
            {service?.imageSnapshot?.[0] && (
                <img
                src={service.imageSnapshot[0]}
                alt={service.nameSnapshot}
                style={{
                    width: 42,
                    height: 42,
                    objectFit: "cover",
                    borderRadius: 6,
                    flexShrink: 0
                }}
                />
            )}

            <Box sx={{ minWidth: 0 }}>
                <Typography
                sx={{
                    fontWeight: n.isRead ? 400 : 600,
                    wordBreak: "break-word"
                }}
                >
                {n.title}
                </Typography>

                <Typography
                variant="body2"
                color="text.secondary"
                sx={{ wordBreak: "break-word" }}
                >
                {n.message}
                </Typography>

                {service && (
                <Typography
                    variant="caption"
                    color="text.secondary"
                >
                    {service.nameSnapshot}
                </Typography>
                )}
            </Box>
            </MenuItem>
          )
        })}

      </Menu>
    </>
  )
}