// src/pages/Checkout.jsx
import React from 'react';
import { useNavigate } from 'react-router-dom';
import { 
  Box, Container, Grid, Typography, TextField, 
  Button, Paper, Divider, Stack 
} from '@mui/material';
import { Lock } from '@mui/icons-material';

export default function Checkout({ total, clearCart }) {
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();
    // Giả lập quá trình xử lý thanh toán
    alert("🎉 Chúc mừng! Đơn hàng của bạn đã được hệ thống SmokerIT tiếp nhận.");
    clearCart(); // Xóa giỏ hàng sau khi mua thành công
    navigate('/'); // Quay về trang chủ
  };

  return (
    <Container maxWidth="lg" sx={{ py: 5 }}>
      <Box sx={{ display: 'flex', alignItems: 'center', mb: 4, gap: 1 }}>
        <Lock sx={{ color: '#555' }} />
        <Typography variant="h4" fontWeight="500">Thanh toán an toàn</Typography>
      </Box>

      <form onSubmit={handleSubmit}>
        <Grid container spacing={4}>
          {/* CỘT TRÁI: THÔNG TIN GIAO HÀNG */}
          <Grid item xs={12} md={7}>
            <Paper variant="outlined" sx={{ p: 3, borderRadius: 2 }}>
              <Typography variant="h6" fontWeight="bold" gutterBottom>
                1. Địa chỉ giao hàng
              </Typography>
              <Grid container spacing={2}>
                <Grid item xs={12}>
                  <TextField fullWidth label="Họ và Tên" required variant="outlined" size="small" />
                </Grid>
                <Grid item xs={12}>
                  <TextField fullWidth label="Số điện thoại" required variant="outlined" size="small" />
                </Grid>
                <Grid item xs={12}>
                  <TextField fullWidth label="Địa chỉ chi tiết (Số nhà, tên đường...)" required variant="outlined" size="small" />
                </Grid>
                <Grid item xs={6}>
                  <TextField fullWidth label="Thành phố / Tỉnh" required variant="outlined" size="small" />
                </Grid>
                <Grid item xs={6}>
                  <TextField fullWidth label="Mã Zip (Tùy chọn)" variant="outlined" size="small" />
                </Grid>
              </Grid>

              <Typography variant="h6" fontWeight="bold" sx={{ mt: 4, mb: 2 }}>
                2. Phương thức thanh toán
              </Typography>
              <Box sx={{ p: 2, border: '1px solid #ddd', borderRadius: 1, bgcolor: '#fcf5ee' }}>
                <Typography variant="body2">
                  🏠 Thanh toán khi nhận hàng (COD)
                </Typography>
              </Box>
            </Paper>
          </Grid>

          {/* CỘT PHẢI: TÓM TẮT ĐƠN HÀNG */}
          <Grid item xs={12} md={5}>
            <Paper variant="outlined" sx={{ p: 3, borderRadius: 2, position: 'sticky', top: 100 }}>
              <Button 
                type="submit"
                fullWidth 
                variant="contained" 
                sx={{ 
                  bgcolor: '#ffd814', 
                  color: 'black', 
                  py: 1.5, 
                  borderRadius: 2,
                  fontWeight: 'bold',
                  textTransform: 'none',
                  fontSize: '16px',
                  boxShadow: 'none',
                  border: '1px solid #fcd200',
                  '&:hover': { bgcolor: '#f7ca00' },
                  mb: 2
                }}
              >
                Đặt hàng ngay
              </Button>
              <Typography variant="caption" textAlign="center" display="block" color="text.secondary" mb={2}>
                Bằng cách đặt hàng, bạn đồng ý với các điều khoản bảo mật của SmokerIT.
              </Typography>
              
              <Divider />
              
              <Box sx={{ py: 2 }}>
                <Typography variant="h6" fontWeight="bold" gutterBottom>Tóm tắt đơn hàng</Typography>
                <Stack spacing={1}>
                  <Box sx={{ display: 'flex', justifyContent: 'space-between' }}>
                    <Typography variant="body2">Tạm tính:</Typography>
                    <Typography variant="body2">{total.toLocaleString()}</Typography>
                  </Box>
                  <Box sx={{ display: 'flex', justifyContent: 'space-between' }}>
                    <Typography variant="body2">Phí vận chuyển:</Typography>
                    <Typography variant="body2" color="green">Miễn phí</Typography>
                  </Box>
                </Stack>
              </Box>

              <Divider />

              <Box sx={{ pt: 2, display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                <Typography variant="h6" color="#B12704" fontWeight="bold">Tổng cộng:</Typography>
                <Typography variant="h6" color="#B12704" fontWeight="bold">
                  {total.toLocaleString()}
                </Typography>
              </Box>
            </Paper>
          </Grid>
        </Grid>
      </form>
    </Container>
  );
}