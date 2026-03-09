import { Box, Typography } from "@mui/material"
import { useNavigate } from "react-router-dom"
import logo from "../../../assets/logoHairSalon/IconChinhTiem.png"
const HeaderLogo = () => {

  const navigate = useNavigate()

  return (
    <Box
      sx={{ display: "flex", alignItems: "center", cursor: "pointer" }}
      onClick={() => navigate("/")}
    >
      <img
        src={logo}
        alt="Hair Salon"
        style={{ width: 56, height: 56, marginRight: 1 }}
      />

      <Typography
        variant="h6"
        sx={{ fontWeight: "bold", color: "#5D4037", fontSize:16 }}
      >
        Tiệm Tóc
      </Typography>
    </Box>
  )
}

export default HeaderLogo