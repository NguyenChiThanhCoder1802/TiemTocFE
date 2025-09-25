import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Box, Container, IconButton, Stack, Typography } from "@mui/material";
import ArrowBackIosNewIcon from "@mui/icons-material/ArrowBackIosNew";
import ArrowForwardIosIcon from "@mui/icons-material/ArrowForwardIos";
import LocalOfferIcon from "@mui/icons-material/LocalOffer";
import FavoriteIcon from "@mui/icons-material/Favorite";
import EventAvailableIcon from "@mui/icons-material/EventAvailable";
import ShoppingBagIcon from "@mui/icons-material/ShoppingBag";
import ContentCutIcon from '@mui/icons-material/ContentCut';
import WhatshotIcon from '@mui/icons-material/Whatshot';

const images = [
  "https://res.cloudinary.com/dxevrzaqn/image/upload/v1754110913/tiem-toc/zgqh4peerczysos1zfkr.webp",
  "/images/banner2.jpg",
  "/images/banner3.jpg",
];

const features = [
  { icon: <LocalOfferIcon fontSize="large" color="primary" />, label: "Mã Giảm Giá",path: "/applydiscount" },
  { icon: <ContentCutIcon fontSize="large" color="info" />, label: "Dịch vụ",path:"/services" },
   { icon: <WhatshotIcon fontSize="large" color="warning" />, label: "Combo làm đẹp",path: "/combos" },
  { icon: <FavoriteIcon fontSize="large" color="error" />, label: "Khách Hàng Thân Thiết" },
  { icon: <EventAvailableIcon fontSize="large" color="success" />, label: "Đặt Lịch Ngay", path: "/booking" },
  { icon: <ShoppingBagIcon fontSize="large" color="warning" />, label: "Sản Phẩm Mới",path:"/product" },
];

const Banner = () => {
  const [current, setCurrent] = useState(0);
  const navigate = useNavigate();
  const handlePrev = () => {
    setCurrent((prev) => (prev === 0 ? images.length - 1 : prev - 1));
  };

  const handleNext = () => {
    setCurrent((prev) => (prev === images.length - 1 ? 0 : prev + 1));
  };

  return (
    <Container sx={{ mt: 3 }}>
     
      {/* Banner Image */}
      <Box
        sx={{
          position: "relative",
          width: "100%",
          overflow: "hidden",
          borderRadius: 2,
        }}
      >
        <img
          src={images[current]}
          alt={`banner-${current}`}
          style={{
            width: "70%",
            aspectRatio: "16/9",
            objectFit: "cover",
            borderRadius: "8px",
            transition: "opacity 0.5s ease-in-out",
          }}
        />

        {/* Navigation Arrows */}
        <IconButton
          onClick={handlePrev}
          sx={{
            position: "absolute",
            top: "50%",
            left: 10,
            transform: "translateY(-50%)",
            color: "#fff",
            backgroundColor: "rgba(0,0,0,0.3)",
            "&:hover": { backgroundColor: "rgba(0,0,0,0.5)" },
          }}
        >
          <ArrowBackIosNewIcon fontSize="small" />
        </IconButton>

        <IconButton
          onClick={handleNext}
          sx={{
            position: "absolute",
            top: "50%",
            right: 10,
            transform: "translateY(-50%)",
            color: "#fff",
            backgroundColor: "rgba(0,0,0,0.3)",
            "&:hover": { backgroundColor: "rgba(0,0,0,0.5)" },
          }}
        >
          <ArrowForwardIosIcon fontSize="small" />
        </IconButton>
      </Box>

      {/* Feature Buttons */}
      <Stack
        direction="row"
        spacing={3}
        justifyContent="center"
        sx={{ mt: 2, flexWrap: "wrap" }}
      >
        {features.map((item, index) => (
          <Box
            key={index}
              onClick={() => item.path && navigate(item.path)}
            sx={{
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              cursor: "pointer",
              p: 1.5,
              borderRadius: 2,
              transition: "all 0.3s ease",
              "&:hover": {
                backgroundColor: "rgba(0,0,0,0.05)",
                transform: "translateY(-3px)",
              },
            }}
          >
            {item.icon}
            <Typography variant="body2" sx={{ mt: 1, fontWeight: 500 }}>
              {item.label}
            </Typography>
          </Box>
        ))}
      </Stack>
    </Container>
  );
};

export default Banner;
