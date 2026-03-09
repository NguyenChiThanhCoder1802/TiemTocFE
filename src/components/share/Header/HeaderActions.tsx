import { IconButton, Avatar, Typography, alpha } from "@mui/material"
import useAuth from "../../../hooks/useAuth"
import { useNavigate } from "react-router-dom"

import NotificationMenu from "../../../pages/customer/Notification/NotificationMenu"

interface Props {
  openSidebar: () => void
}

const HeaderActions = ({ openSidebar }: Props) => {

  const navigate = useNavigate()
  const { user, isAuthenticated, isAdmin } = useAuth()

  if (!isAuthenticated) {
    return (
      <Typography
        onClick={() => navigate("/login")}
        sx={{
          cursor: "pointer",
          fontWeight: 600,
          color: "#5D4037",
          px: 2,
          py: 0.75,
          borderRadius: 2,
          "&:hover": {
            backgroundColor: alpha("#000", 0.05)
          }
        }}
      >
        Đăng nhập
      </Typography>
    )
  }

  return (
    <>
      {!isAdmin && <NotificationMenu />}

      {!isAdmin && (
        <IconButton onClick={openSidebar} sx={{ p: 0 }}>
          <Avatar src={user?.avatar || ""} sx={{ width: 36, height: 36 }} />
        </IconButton>
      )}
    </>
  )
}

export default HeaderActions