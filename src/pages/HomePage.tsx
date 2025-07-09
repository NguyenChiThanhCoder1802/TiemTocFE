import { Box, Typography, Button, Container } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import BeautyIcon from '@mui/icons-material/FaceRetouchingNatural';
import ServiceIcon from '@mui/icons-material/ContentCut';
import ProductIcon from '@mui/icons-material/Store';

const HomePage = () => {
  const navigate = useNavigate();

  return (
    <Box
      sx={{
        background: 'linear-gradient(to right bottom, #e0f7fa, #ffccbc)',
        minHeight: '100vh',
        py: 8,
      }}
    >
      <Container>
        <Typography
          variant="h3"
          align="center"
          gutterBottom
          fontWeight="bold"
          color="primary"
        >
          Chào mừng đến với Tiệm Tóc Thanh
        </Typography>
        <Typography
          variant="h6"
          align="center"
          color="text.secondary"
          mb={6}
        >
          Đẹp mỗi ngày cùng đội ngũ chuyên nghiệp và sản phẩm chất lượng!
        </Typography>

        {/* Danh sách 3 mục chính */}
        <Box
          sx={{
            display: 'flex',
            flexWrap: 'wrap',
            gap: 4,
            justifyContent: 'center',
          }}
        >
          {/* Mỗi mục */}
          <Box
            sx={{
              flex: '1 1 300px',
              maxWidth: 340,
              p: 3,
              borderRadius: 3,
              backgroundColor: '#fff',
              boxShadow: 3,
              textAlign: 'center',
            }}
          >
            <ServiceIcon color="secondary" sx={{ fontSize: 50 }} />
            <Typography variant="h6" mt={2}>
              Dịch vụ làm đẹp
            </Typography>
            <Typography variant="body2" mb={2}>
              Cắt, uốn, nhuộm, chăm sóc tóc chuyên nghiệp.
            </Typography>
            <Button variant="contained" onClick={() => navigate('/services')}>
              Xem dịch vụ
            </Button>
          </Box>

          <Box
            sx={{
              flex: '1 1 300px',
              maxWidth: 340,
              p: 3,
              borderRadius: 3,
              backgroundColor: '#fff',
              boxShadow: 3,
              textAlign: 'center',
            }}
          >
            <ProductIcon color="success" sx={{ fontSize: 50 }} />
            <Typography variant="h6" mt={2}>
              Sản phẩm chăm sóc
            </Typography>
            <Typography variant="body2" mb={2}>
              Sản phẩm cao cấp giúp tóc bạn luôn khoẻ đẹp.
            </Typography>
            <Button
              variant="contained"
              color="success"
              onClick={() => navigate('/product')}
            >
              Xem sản phẩm
            </Button>
          </Box>

          <Box
            sx={{
              flex: '1 1 300px',
              maxWidth: 340,
              p: 3,
              borderRadius: 3,
              backgroundColor: '#fff',
              boxShadow: 3,
              textAlign: 'center',
            }}
          >
            <BeautyIcon color="error" sx={{ fontSize: 50 }} />
            <Typography variant="h6" mt={2}>
              Đặt lịch dễ dàng
            </Typography>
            <Typography variant="body2" mb={2}>
              Chọn dịch vụ và thời gian, chúng tôi sẽ phục vụ bạn tận tâm.
            </Typography>
            <Button
              variant="contained"
              color="error"
              onClick={() => navigate('/booking')}
            >
              Đặt lịch
            </Button>
          </Box>
        </Box>
      </Container>
    </Box>
  );
};

export default HomePage;
