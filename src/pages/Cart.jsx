// src/pages/Cart.jsx
import React from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { 
  Box, Typography, Grid, Paper, Button, IconButton, 
  Divider, Container, Stack, CardMedia 
} from '@mui/material';
import { Add, Remove, DeleteOutline, ShoppingCartCheckout, LocalFireDepartment } from '@mui/icons-material';

export default function Cart({ cart, updateQty, remove, total }) {
  const navigate = useNavigate();

  // Tính tổng số lượng sản phẩm trong giỏ
  const totalItems = cart.reduce((a, c) => a + c.quantity, 0);

  if (cart.length === 0) {
    return (
      <Container sx={{ textAlign: 'center', py: 10 }}>
        <Typography variant="h4" fontWeight="bold" gutterBottom sx={{ color: '#ff5722' }}>
          Giỏ hàng của bạn đang trống 🥺
        </Typography>
        <Typography variant="body1" color="text.secondary" mb={4}>
          Hãy chọn cho mình những chiếc Laptop ưng ý nhất tại SmokerIT nhé!
        </Typography>
        <Button 
          variant="contained" 
          component={Link} 
          to="/" 
          sx={{ 
            background: 'linear-gradient(45deg, #FF512F 0%, #F09819 100%)', 
            color: 'white',
            fontWeight: 'bold',
            px: 4, py: 1.5,
            borderRadius: 8
          }}
        >
          Trở về mua sắm
        </Button>
      </Container>
    );
  }

  return (
    <Container maxWidth="lg" sx={{ py: 5 }}>
      {/* TIÊU ĐỀ MÀU MÈ GRADIENT */}
      <Typography 
        variant="h4" 
        fontWeight="bold" 
        gutterBottom 
        sx={{ 
          mb: 4,
          background: "linear-gradient(90deg, #1CB5E0 0%, #000851 100%)",
          WebkitBackgroundClip: "text",
          WebkitTextFillColor: "transparent",
          display: 'flex',
          alignItems: 'center',
          gap: 1
        }}
      >
        <LocalFireDepartment sx={{ color: '#ff5722' }} /> Giỏ hàng siêu tốc của bạn
      </Typography>

      <Grid container spacing={4}>
        
        {/* CỘT TRÁI: DANH SÁCH SẢN PHẨM */}
        <Grid item xs={12} md={8}>
          <Paper elevation={3} sx={{ p: 3, borderRadius: 3, borderTop: '5px solid #1CB5E0' }}>
            <Typography variant="h6" fontWeight="bold" mb={2}>Chi tiết sản phẩm</Typography>
            <Divider sx={{ mb: 3 }} />
            
            <Stack spacing={4}>
              {cart.map((item) => (
                <Box key={item.id}>
                  <Grid container spacing={2} alignItems="center">
                    <Grid item xs={3} sm={2}>
                      <CardMedia 
                        component="img" 
                        image={item.image} 
                        alt={item.title} 
                        sx={{ borderRadius: 2, border: '1px solid #eee', p: 1, bgcolor: '#fafafa' }} 
                      />
                    </Grid>
                    
                    <Grid item xs={9} sm={10}>
                      <Box sx={{ display: 'flex', justifyContent: 'space-between', flexWrap: 'wrap', gap: 2 }}>
                        <Box sx={{ flex: 1, minWidth: '200px' }}>
                          <Typography variant="subtitle1" fontWeight="bold">
                            <Link to={`/product/${item.id}`} style={{ textDecoration: 'none', color: '#333' }}>
                              {item.title}
                            </Link>
                          </Typography>
                          <Typography variant="body2" color="text.secondary" sx={{ mt: 0.5 }}>
                            Phân loại: {item.category}
                          </Typography>
                          <Typography variant="h6" color="#e91e63" fontWeight="bold" sx={{ mt: 1 }}>
                            {item.price.toLocaleString()} đ
                          </Typography>
                        </Box>

                        <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
                          {/* Nút tăng giảm số lượng màu mè */}
                          <Box sx={{ display: 'flex', alignItems: 'center', border: '2px solid #e0e0e0', borderRadius: 5, overflow: 'hidden' }}>
                            <IconButton size="small" onClick={() => updateQty(item.id, item.quantity - 1)} sx={{ color: '#ff9800' }}>
                              <Remove fontSize="small" />
                            </IconButton>
                            <Typography sx={{ px: 2, fontWeight: 'bold' }}>{item.quantity}</Typography>
                            <IconButton size="small" onClick={() => updateQty(item.id, item.quantity + 1)} sx={{ color: '#4caf50' }}>
                              <Add fontSize="small" />
                            </IconButton>
                          </Box>
                          
                          <IconButton 
                            color="error" 
                            onClick={() => remove(item.id)}
                            sx={{ bgcolor: '#ffebee', '&:hover': { bgcolor: '#ffcdd2' } }}
                          >
                            <DeleteOutline />
                          </IconButton>
                        </Box>
                      </Box>
                    </Grid>
                  </Grid>
                  <Divider sx={{ mt: 3 }} />
                </Box>
              ))}
            </Stack>
          </Paper>
        </Grid>

        {/* CỘT PHẢI: THANH TOÁN (Màu Pastel nổi bật) */}
        <Grid item xs={12} md={4}>
          <Paper 
            elevation={4} 
            sx={{ 
              p: 3, 
              borderRadius: 4, 
              bgcolor: '#f4faff', // Xanh pastel nhẹ
              border: '2px dashed #64b5f6',
              position: 'sticky',
              top: 100
            }}
          >
            <Typography variant="body1" sx={{ color: '#2e7d32', fontWeight: 'bold', mb: 2, p: 1, bgcolor: '#e8f5e9', borderRadius: 2 }}>
               🎉 Đơn hàng đủ điều kiện nhận Freeship!
            </Typography>
            
            <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 2 }}>
              <Typography variant="h6" color="text.secondary">Tổng số lượng:</Typography>
              <Typography variant="h6" fontWeight="bold">{totalItems} món</Typography>
            </Box>

            <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 3 }}>
              <Typography variant="h5" fontWeight="bold">Tạm tính:</Typography>
              <Typography variant="h5" fontWeight="bold" sx={{ color: '#e91e63' }}>
                {total.toLocaleString()} đ
              </Typography>
            </Box>

            <Button 
              fullWidth 
              variant="contained" 
              startIcon={<ShoppingCartCheckout />}
              onClick={() => navigate('/checkout')}
              sx={{ 
                background: 'linear-gradient(45deg, #00C9FF 0%, #92FE9D 100%)', // Gradient cực cool
                color: '#004d40', 
                borderRadius: 8,
                py: 1.5,
                textTransform: 'uppercase',
                fontWeight: '900',
                fontSize: '16px',
                boxShadow: '0 4px 15px rgba(0, 201, 255, 0.4)',
                '&:hover': { 
                  background: 'linear-gradient(45deg, #92FE9D 0%, #00C9FF 100%)',
                }
              }}
            >
              Tiến hành Thanh toán
            </Button>
          </Paper>
        </Grid>

      </Grid>
    </Container>
  );
}