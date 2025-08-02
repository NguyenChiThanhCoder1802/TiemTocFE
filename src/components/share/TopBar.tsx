import React, { useState, useEffect } from 'react';
import {
  Toolbar, Button, Stack, Box, Container, Paper, Badge,
  Menu, MenuItem,
} from '@mui/material';
import { useNavigate, useLocation } from 'react-router-dom';
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
  const location = useLocation();
  const { totalItems } = useCart();
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const [productAnchorEl, setProductAnchorEl] = useState<null | HTMLElement>(null);
  const [categories, setCategories] = useState<Category[]>([]);
  const [productCategories, setProductCategories] = useState<Category[]>([]);
  const isActive = (path: string) => location.pathname === path;
  useEffect(() => {
    fetchCategories()
      .then(data => {
        setCategories(data.filter(c => c.type === 'Service'));
        setProductCategories(data.filter(c => c.type === 'Product'));
      })
      .catch(console.error);
  }, []);

  // Mở menu dịch vụ
  const handleServiceClick = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
  };

  // Mở menu sản phẩm
  const handleProductClick = (event: React.MouseEvent<HTMLElement>) => {
    setProductAnchorEl(event.currentTarget);
  };

  // Chọn danh mục dịch vụ
  const handleCategorySelect = (categoryId: number | null) => {
    setAnchorEl(null);

    if (location.pathname !== '/') {
      // Nếu KHÔNG ở Home thì chuyển hướng và truyền state
      navigate('/', { state: { selectedCategoryId: categoryId } });
    } else {
      // Nếu đang ở Home thì gọi trực tiếp
      onCategorySelect?.(categoryId);
    }
  };

  // Chọn danh mục sản phẩm (tuỳ bạn xử lý riêng nếu cần)
  const handleProductCategorySelect = (categoryId: number | null) => {
    setProductAnchorEl(null);

    if (categoryId === null) {
      navigate('/product');
    } else {
      navigate('/product', { state: { selectedCategoryId: categoryId } });
    }
  };

  return (
    <Box sx={{ py: 1, backgroundColor: 'transparent' }}>
      <Container maxWidth="lg">
        <Paper elevation={3} sx={{ borderRadius: 3, px: 2, backgroundColor: '#FFE0B2' }}>
          <Toolbar sx={{ justifyContent: 'center', minHeight: 64 }}>
            <Stack direction="row" spacing={2} alignItems="center">
              <Button startIcon={<HomeIcon />} onClick={() => navigate('/')} sx={{ ...btnStyle, ...(isActive('/') && activeBtnStyle) }}>Trang chủ</Button>
              <Button startIcon={<WhatshotIcon />} onClick={() => navigate('/combos')} sx={{ ...btnStyle, ...(isActive('/combos') && activeBtnStyle) }}>Combo Hot</Button>

              {/* Dịch vụ + danh mục */}
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

              {/* Sản phẩm */}
              <Button
                startIcon={<Inventory2Icon />}
                onClick={handleProductClick}
                sx={btnStyle}
              >
                Sản phẩm
              </Button>
              <Menu
                anchorEl={productAnchorEl}
                open={Boolean(productAnchorEl)}
                onClose={() => setProductAnchorEl(null)}
              >
                <MenuItem onClick={() => handleProductCategorySelect(null)}>Tất cả sản phẩm</MenuItem>
                {productCategories.map((cat) => (
                  <MenuItem key={cat.id} onClick={() => handleProductCategorySelect(cat.id)}>
                    {cat.name}
                  </MenuItem>
                ))}
              </Menu>

              <Button startIcon={<CalendarMonthIcon />} onClick={() => navigate('/booking')} sx={{ ...btnStyle, ...(isActive('/booking') && activeBtnStyle) }}>Đặt lịch</Button>
              <Button startIcon={<LocalOfferIcon />} onClick={() => navigate('/applydiscount')} sx={{ ...btnStyle, ...(isActive('/applydiscount') && activeBtnStyle) }}>Mã giảm giá</Button>

              <Button onClick={() => navigate('/cart')} sx={{ ...btnStyle, ...(isActive('/cart') && activeBtnStyle) }}
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
const activeBtnStyle = {
  color: '#D84315',
  fontWeight: 700,
  textDecoration: 'underline',
};


export default TopBar;
