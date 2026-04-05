import { Box, Typography, alpha } from "@mui/material"
import { useNavigate } from "react-router-dom"
import useAuth from "../../../hooks/useAuth"

const HeaderMenu = () => {

  const navigate = useNavigate()
  const { isAuthenticated, isAdmin } = useAuth()

  const itemStyle = {
    display: "flex",
    alignItems: "center",
    cursor: "pointer",
    px: 2,
    py: 0.5,
    borderRadius: 2,
    fontWeight: 500,
    color: "#5D4037",
    "&:hover": {
      backgroundColor: alpha("#000", 0.05)
    }
  }

  return (
    <>
      {isAuthenticated && !isAdmin && (
        <Box onClick={() => navigate("/customer/bookinghistory")} sx={itemStyle}>
          <Typography>Lịch hẹn của bạn</Typography>
        </Box>
      )}

      {isAuthenticated && !isAdmin && (
        <Box onClick={() => navigate("/discounts")} sx={itemStyle}>
          Ưu đãi
        </Box>
      )}

      {isAuthenticated && !isAdmin && (
        <Box onClick={() => navigate("/customer/booking")} sx={itemStyle}>
          Đặt lịch ngay
        </Box>
      )}

      <Box onClick={() => navigate("/services")} sx={itemStyle}>
        Dịch vụ
      </Box>
    </>
  )
}

export default HeaderMenu