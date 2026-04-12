// src/pages/Cart.jsx
import React, { useState, useContext } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { 
  Box, Typography, Grid, Paper, Button, IconButton, 
  Divider, Container, Stack, CardMedia, Tabs, Tab,
  Dialog, DialogContent, DialogActions, Chip, Alert
} from '@mui/material';
import { Add, Remove, DeleteOutline, ShoppingCartCheckout, LocalFireDepartment, CheckCircle, Info } from '@mui/icons-material';
import { OrderContext } from '../context/OrderContext';

export default function Cart({ cart, updateQty, remove, total, user }) {
  const navigate = useNavigate();
  const { getCustomerOrders, deliveryTimeEstimate } = useContext(OrderContext);
  const [tabValue, setTabValue] = useState(0);
  const [selectedOrder, setSelectedOrder] = useState(null);
  const [detailDialogOpen, setDetailDialogOpen] = useState(false);

  const customerOrders = user ? getCustomerOrders(user.email) : [];

  const getStatusColor = (status) => {
    const colors = {
      'Chưa xử lý': 'warning',
      'Đã xác nhận': 'info',
      'Đang giao': 'primary',
      'Đã giao': 'success',
      'Đã hủy': 'error'
    };
    return colors[status] || 'default';
  };

  return (
    <Container maxWidth="lg" sx={{ py: 5 }}>
      {/* Section: User Info */}
      {user && (
        <Paper sx={{ p: 2.5, mb: 3, bgcolor: '#e3f2fd', borderLeft: '4px solid #0066ff' }}>
          <Grid container spacing={2} alignItems="center">
            <Grid item xs={12} sm="auto">
              <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
                <Box sx={{ fontSize: '32px' }}>👤</Box>
                <Box>
                  <Typography variant="body2" color="textSecondary">
                    Đang mua sắm với tài khoản:
                  </Typography>
                  <Typography variant="subtitle1" fontWeight="bold" sx={{ color: '#0066ff' }}>
                    {user.name}
                  </Typography>
                  <Typography variant="caption" color="textSecondary">
                    {user.email}
                  </Typography>
                </Box>
              </Box>
            </Grid>
          </Grid>
        </Paper>
      )}

      {/* TABS: Giỏ Hàng vs Chi Tiết Đơn Hàng */}
      <Paper elevation={3} sx={{ borderRadius: 2, overflow: 'hidden', mb: 3 }}>
        <Tabs 
          value={tabValue} 
          onChange={(e, val) => setTabValue(val)}
          sx={{
            borderBottom: '2px solid #e0e0e0',
            bgcolor: '#f5f5f5'
          }}
        >
          <Tab 
            label={`🛒 Giỏ Hàng (${cart.length})`} 
            sx={{ 
              fontWeight: 'bold',
              textTransform: 'none',
              fontSize: '15px',
              '&.Mui-selected': { color: '#0066ff' }
            }}
          />
          <Tab 
            label={`📦 Chi Tiết Đơn Hàng (${customerOrders.length})`}
            sx={{ 
              fontWeight: 'bold',
              textTransform: 'none',
              fontSize: '15px',
              '&.Mui-selected': { color: '#e91e63' }
            }}
          />
        </Tabs>
      </Paper>

      {/* TAB 1: GIỎ HÀNG */}
      {tabValue === 0 && (
        <>
          {cart.length === 0 ? (
            <Paper sx={{ p: 5, textAlign: 'center', bgcolor: '#f9f9f9' }}>
              <Typography variant="h5" fontWeight="bold" sx={{ color: '#ff5722', mb: 2 }}>
                Giỏ hàng của bạn đang trống 🥺
              </Typography>
              <Typography variant="body1" color="text.secondary" mb={3}>
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
            </Paper>
          ) : (
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

              {/* CỘT PHẢI: THANH TOÁN */}
              <Grid item xs={12} md={4}>
                <Paper 
                  elevation={4} 
                  sx={{ 
                    p: 3, 
                    borderRadius: 4, 
                    bgcolor: '#f4faff',
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
                    <Typography variant="h6" fontWeight="bold">{cart.reduce((a, c) => a + c.quantity, 0)} món</Typography>
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
                      background: 'linear-gradient(45deg, #00C9FF 0%, #92FE9D 100%)',
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
          )}
        </>
      )}

      {/* TAB 2: CHI TIẾT ĐƠN HÀNG */}
      {tabValue === 1 && (
        <Box>
          {!user ? (
            <Alert severity="warning" sx={{ mb: 3 }}>
              ⚠️ Vui lòng đăng nhập để xem lịch sử đơn hàng
            </Alert>
          ) : customerOrders.length === 0 ? (
            <Paper sx={{ p: 4, textAlign: 'center', bgcolor: '#f9f9f9' }}>
              <Typography variant="h6" sx={{ color: '#999', mb: 2 }}>
                📦 Bạn chưa có đơn hàng nào
              </Typography>
              <Typography variant="body2" color="textSecondary">
                Hãy tiến hành thanh toán để xem lịch sử đơn hàng
              </Typography>
            </Paper>
          ) : (
            <Grid container spacing={2}>
              {customerOrders.map((order, idx) => (
                <Grid item xs={12} key={idx}>
                  <Paper
                    elevation={2}
                    sx={{
                      p: 2.5,
                      borderLeft: '4px solid #0066ff',
                      '&:hover': { boxShadow: 4 },
                      cursor: 'pointer',
                      transition: 'all 0.3s'
                    }}
                    onClick={() => { setSelectedOrder(order); setDetailDialogOpen(true); }}
                  >
                    <Grid container spacing={2} alignItems="center">
                      <Grid item xs={12} sm={3}>
                        <Box>
                          <Typography variant="caption" color="textSecondary">Mã Đơn Hàng</Typography>
                          <Typography variant="body2" fontWeight="bold">#{order.orderNumber}</Typography>
                        </Box>
                      </Grid>
                      <Grid item xs={12} sm={3}>
                        <Box>
                          <Typography variant="caption" color="textSecondary">Ngày Đặt</Typography>
                          <Typography variant="body2" fontWeight="bold">{order.orderDate}</Typography>
                        </Box>
                      </Grid>
                      <Grid item xs={12} sm={3}>
                        <Box>
                          <Typography variant="caption" color="textSecondary">Thời Gian Giao</Typography>
                          <Typography variant="body2" fontWeight="bold" sx={{ color: '#e91e63' }}>
                            {order.deliveryTime}
                          </Typography>
                        </Box>
                      </Grid>
                      <Grid item xs={12} sm={3} sx={{ textAlign: { xs: 'left', sm: 'right' } }}>
                        <Box>
                          <Typography variant="caption" color="textSecondary">Trạng Thái</Typography>
                          <Chip
                            label={order.status || 'Chưa xử lý'}
                            size="small"
                            color={getStatusColor(order.status || 'Chưa xử lý')}
                            variant="outlined"
                            sx={{ mt: 0.5 }}
                          />
                        </Box>
                      </Grid>
                      <Grid item xs={12}>
                        <Divider />
                      </Grid>
                      <Grid item xs={12} sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                        <Box>
                          <Typography variant="caption" color="textSecondary">📅 Dự kiến giao:</Typography>
                          <Typography variant="body2" fontWeight="bold">
                            {order.estimatedDelivery || 'Chưa xác định'}
                          </Typography>
                        </Box>
                        <Typography variant="h6" fontWeight="bold" sx={{ color: '#ff5722' }}>
                          {order.total.toLocaleString()} đ
                        </Typography>
                        <Button
                          size="small"
                          variant="contained"
                          onClick={(e) => {
                            e.stopPropagation();
                            setSelectedOrder(order);
                            setDetailDialogOpen(true);
                          }}
                        >
                          Chi Tiết
                        </Button>
                      </Grid>
                    </Grid>
                  </Paper>
                </Grid>
              ))}
            </Grid>
          )}
        </Box>
      )}

      {/* DETAIL DIALOG */}
      <Dialog open={detailDialogOpen} onClose={() => setDetailDialogOpen(false)} maxWidth="sm" fullWidth>
        <DialogContent sx={{ pt: 3 }}>
          {selectedOrder && (
            <Box>
              <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, mb: 2 }}>
                <CheckCircle sx={{ color: '#4caf50' }} />
                <Typography variant="h6" fontWeight="bold">Đơn Hàng #{selectedOrder.orderNumber}</Typography>
              </Box>

              <Divider sx={{ my: 2 }} />

              <Typography variant="subtitle2" fontWeight="bold" sx={{ mb: 1.5 }}>👤 Thông Tin Khách Hàng</Typography>
              <Stack spacing={0.5} sx={{ mb: 2, pl: 2 }}>
                <Typography variant="caption"><strong>Tên:</strong> {selectedOrder.name}</Typography>
                <Typography variant="caption"><strong>Email:</strong> {selectedOrder.email}</Typography>
                <Typography variant="caption"><strong>SĐT:</strong> {selectedOrder.phone}</Typography>
              </Stack>

              <Divider sx={{ my: 2 }} />

              <Typography variant="subtitle2" fontWeight="bold" sx={{ mb: 1.5 }}>📍 Địa Chỉ Giao Hàng</Typography>
              <Stack spacing={0.5} sx={{ mb: 2, pl: 2 }}>
                <Typography variant="caption">{selectedOrder.address}</Typography>
                <Typography variant="caption">{selectedOrder.city}</Typography>
                <Typography variant="caption">Mã Zip: {selectedOrder.zip || 'N/A'}</Typography>
              </Stack>

              <Divider sx={{ my: 2 }} />

              <Typography variant="subtitle2" fontWeight="bold" sx={{ mb: 1.5 }}>🛍️ Sản Phẩm</Typography>
              <Stack spacing={0.8} sx={{ mb: 2, pl: 2 }}>
                {selectedOrder.items && selectedOrder.items.map((item, i) => (
                  <Typography key={i} variant="caption">
                    {item.title} <strong>x{item.quantity}</strong> = {(item.price * item.quantity).toLocaleString()}₫
                  </Typography>
                ))}
              </Stack>

              <Divider sx={{ my: 2 }} />

              <Grid container spacing={1} sx={{ pl: 2 }}>
                <Grid item xs={12}>
                  <Box sx={{ display: 'flex', justifyContent: 'space-between' }}>
                    <Typography variant="caption"><strong>Phương Thức TT:</strong></Typography>
                    <Typography variant="caption">{selectedOrder.paymentMethod === 'cod' ? 'Tiền mặt (COD)' : 'Chuyển khoản'}</Typography>
                  </Box>
                </Grid>
                <Grid item xs={12}>
                  <Box sx={{ display: 'flex', justifyContent: 'space-between' }}>
                    <Typography variant="caption"><strong>Trạng Thái:</strong></Typography>
                    <Chip label={selectedOrder.status || 'Chưa xử lý'} size="small" color={getStatusColor(selectedOrder.status || 'Chưa xử lý')} />
                  </Box>
                </Grid>
                <Grid item xs={12}>
                  <Box sx={{ display: 'flex', justifyContent: 'space-between' }}>
                    <Typography variant="caption"><strong>Thời Gian Giao:</strong></Typography>
                    <Typography variant="caption" sx={{ color: '#e91e63', fontWeight: 'bold' }}>{selectedOrder.deliveryTime}</Typography>
                  </Box>
                </Grid>
                <Grid item xs={12}>
                  <Box sx={{ display: 'flex', justifyContent: 'space-between' }}>
                    <Typography variant="caption"><strong>Dự Kiến Giao:</strong></Typography>
                    <Typography variant="caption" fontWeight="bold">{selectedOrder.estimatedDelivery}</Typography>
                  </Box>
                </Grid>
              </Grid>

              <Divider sx={{ my: 2 }} />

              <Box sx={{ display: 'flex', justifyContent: 'space-between', bgcolor: '#f5f5f5', p: 1.5, borderRadius: 1 }}>
                <Typography variant="body2" fontWeight="bold">Tổng Cộng:</Typography>
                <Typography variant="h6" fontWeight="bold" sx={{ color: '#ff5722' }}>
                  {selectedOrder.total.toLocaleString()} đ
                </Typography>
              </Box>
            </Box>
          )}
        </DialogContent>
        <DialogActions sx={{ p: 2 }}>
          <Button onClick={() => setDetailDialogOpen(false)} variant="contained">
            Đóng
          </Button>
        </DialogActions>
      </Dialog>
    </Container>
  );
}