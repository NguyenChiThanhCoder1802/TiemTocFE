import { Box, Typography, Link, Stack } from '@mui/material';
import FacebookIcon from '@mui/icons-material/Facebook';
import InstagramIcon from '@mui/icons-material/Instagram';

const Footer = () => {
  return (
    <Box
      component="footer"
      sx={{
        mt: 'auto',
        px: 4,
        py: 4,
        backgroundColor: '#FFE0B2',
        color: 'black',
      }}
    >
      {/* 3 Cột - Flexbox thay thế Grid */}
      <Box
        sx={{
          display: 'flex',
          flexDirection: { xs: 'column', md: 'row' },
          justifyContent: 'space-between',
          gap: 4,
        }}
      >
        {/* Cột 1 - Về chúng tôi */}
        <Box sx={{ flex: 1, textAlign: { xs: 'center', md: 'left' } }}>
          <Typography variant="h6" gutterBottom>Về chúng tôi</Typography>
          <Typography variant="body2">Tiệm Tóc Thanh - Hân Hạnh Phục Vụ</Typography>
          <Stack direction="row" spacing={2} mt={2} justifyContent={{ xs: 'center', md: 'flex-start' }}>
            <Link href="https://facebook.com" target="_blank" color="inherit"><FacebookIcon /></Link>
            <Link href="https://instagram.com" target="_blank" color="inherit"><InstagramIcon /></Link>
          </Stack>
        </Box>

        {/* Cột 2 - Liên hệ */}
        <Box sx={{ flex: 1, textAlign: { xs: 'center', md: 'left' } }}>
          <Typography variant="h6" gutterBottom>Liên hệ</Typography>
          <Typography variant="body2">📍 123 Đường Trần Hưng Đạo, Quận 10, TP.HCM</Typography>
          <Typography variant="body2">📞 <Link href="tel:0123456789" underline="hover">0123 456 789</Link></Typography>
          <Typography variant="body2">✉️ <Link href="mailto:tiemtocthanh@gmail.com" underline="hover">tiemtoc789@gmail.com</Link></Typography>
        </Box>

        {/* Cột 3 - Chính sách */}
        <Box sx={{ flex: 1, textAlign: { xs: 'center', md: 'left' } }}>
          <Typography variant="h6" gutterBottom>Chính sách</Typography>
          <Typography variant="body2"><Link href="#" underline="hover" color="inherit">Chính sách bảo mật</Link></Typography>
          <Typography variant="body2"><Link href="#" underline="hover" color="inherit">Chính sách hoàn trả</Link></Typography>
          <Typography variant="body2"><Link href="#" underline="hover" color="inherit">Điều khoản dịch vụ</Link></Typography>
        </Box>
      </Box>

      {/* Dòng bản quyền */}
      <Typography variant="body2" align="center" sx={{ mt: 4 }}>
        © {new Date().getFullYear()} Tiệm Tóc Thanh. All rights reserved.
      </Typography>
    </Box>
  );
};

export default Footer;
