import React, { useState, useEffect } from 'react';
import {
  Toolbar, Button, Stack, Box, Container, Paper, Badge, Menu, MenuItem,
} from '@mui/material';
import { useNavigate } from 'react-router-dom';
import { useCart } from '../../hooks/useCart';
import HomeIcon from '@mui/icons-material/Home';
import DesignServicesIcon from '@mui/icons-material/DesignServices';
import Inventory2Icon from '@mui/icons-material/Inventory2';
import CalendarMonthIcon from '@mui/icons-material/CalendarMonth';
import LocalOfferIcon from '@mui/icons-material/LocalOffer';
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
import WhatshotIcon from '@mui/icons-material/Whatshot';
import { fetchCategories } from '../../api/categoryApi';
import type { Category } from '../../types/Category';

interface Props {
  onCategorySelect?: (categoryId: number | null) => void;
}

const TopBar = ({ onCategorySelect }: Props) => {
  const navigate = useNavigate();
  const { totalItems } = useCart();
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const [categories, setCategories] = useState<Category[]>([]);

  useEffect(() => {
    fetchCategories()
      .then(data => {
        setCategories(data.filter(c => c.type === 'Service'));
      })
      .catch(console.error);
  }, []);

  const handleServiceClick = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleCategorySelect = (categoryId: number | null) => {
  setAnchorEl(null);
  
  if (categoryId === null) {
    navigate('/services');
  } else {
    if (location.pathname !== '/') {
      navigate('/', { state: { selectedCategoryId: categoryId } }); // chuyến hướng + gửi state
    } else {
      onCategorySelect?.(categoryId); // lọc trực tiếp nếu đang ở Home
    }
  }
};
  return (
    <Box sx={{ py: 1, backgroundColor: 'transparent' }}>
      <Container maxWidth="lg">
        <Paper elevation={3} sx={{ borderRadius: 3, px: 2, backgroundColor: '#FFE0B2' }}>
          <Toolbar sx={{ justifyContent: 'center', minHeight: 64 }}>
            <Stack direction="row" spacing={2} alignItems="center">
              <Button startIcon={<HomeIcon />} onClick={() => navigate('/')} sx={btnStyle}>Trang chủ</Button>
              <Button startIcon={<WhatshotIcon />} onClick={() => navigate('/combos')} sx={btnStyle}>Combo Hot</Button>

              {/* Nút Dịch vụ */}
              <Button
                startIcon={<DesignServicesIcon />}
                onClick={handleServiceClick}
                sx={btnStyle}
              >
                Dịch vụ
              </Button>

              <Menu
                anchorEl={anchorEl}
                open={Boolean(anchorEl)}
                onClose={() => setAnchorEl(null)}
              >
                <MenuItem onClick={() => handleCategorySelect(null)}>Tất cả dịch vụ</MenuItem>
                {categories.map((cat) => (
                  <MenuItem key={cat.id} onClick={() => handleCategorySelect(cat.id)}>
                    {cat.name}
                  </MenuItem>
                ))}
              </Menu>

              <Button startIcon={<Inventory2Icon />} onClick={() => navigate('/product')} sx={btnStyle}>Sản phẩm</Button>
              <Button startIcon={<CalendarMonthIcon />} onClick={() => navigate('/booking')} sx={btnStyle}>Đặt lịch</Button>
              <Button startIcon={<LocalOfferIcon />} onClick={() => navigate('/applydiscount')} sx={btnStyle}>Mã giảm giá</Button>

              <Button onClick={() => navigate('/cart')} sx={btnStyle}
                startIcon={
                  <Badge badgeContent={totalItems} color="secondary">
                    <ShoppingCartIcon />
                  </Badge>
                }>
                Giỏ hàng
              </Button>
            </Stack>
          </Toolbar>
        </Paper>
      </Container>
    </Box>
  );
};

const btnStyle = {
  textTransform: 'none',
  color: '#4E342E',
  fontWeight: 500,
  fontSize: '1rem',
  '&:hover': {
    backgroundColor: 'rgba(255, 255, 255, 0.2)',
    transform: 'scale(1.05)',
    transition: 'all 0.3s ease',
  },
};

export default TopBar;
