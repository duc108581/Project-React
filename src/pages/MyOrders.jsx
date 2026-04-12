import React, { useContext, useMemo } from 'react';
import { useNavigate } from 'react-router-dom';
import { OrderContext } from '../context/OrderContext';
import {
  Container, Box, Typography, Card, CardContent, Grid, Chip,
  Button, Dialog, DialogTitle, DialogContent, DialogActions,
  Table, TableBody, TableCell, TableContainer, TableHead, TableRow,
  Paper, Divider, Alert, Stack
} from '@mui/material';
import {
  ArrowBack, LocalShipping, DateRange, Phone, LocationOn, DoneAll, Info
} from '@mui/icons-material';

export default function MyOrders({ user }) {
  const navigate = useNavigate();
  const { getCustomerOrders } = useContext(OrderContext);
  const [selectedOrder, setSelectedOrder] = React.useState(null);
  const [openDetails, setOpenDetails] = React.useState(false);

  const myOrders = useMemo(() => {
    if (!user?.email) return [];
    return getCustomerOrders(user.email);
  }, [user, getCustomerOrders]);

  const getStatusColor = (status) => {
    switch (status) {
      case 'Chưa xử lý':
        return 'warning';
      case 'Đã xác nhận':
        return 'info';
      case 'Đang giao':
        return 'primary';
      case 'Đã giao':
        return 'success';
      case 'Đã hủy':
        return 'error';
      default:
        return 'default';
    }
  };

  const getStatusIcon = (status) => {
    switch (status) {
      case 'Đã giao':
        return <DoneAll sx={{ color: '#4caf50' }} />;
      case 'Đang giao':
        return <LocalShipping sx={{ color: '#2196f3' }} />;
      case 'Đã hủy':
        return <Info sx={{ color: '#f44336' }} />;
      default:
        return <Info sx={{ color: '#ff9800' }} />;
    }
  };

  const handleViewDetails = (order) => {
    setSelectedOrder(order);
    setOpenDetails(true);
  };

  if (!user) {
    return (
      <Container sx={{ py: 10, textAlign: 'center' }}>
        <Alert severity="warning" sx={{ mb: 3 }}>
          Vui lòng đăng nhập để xem lịch sử đơn hàng
        </Alert>
        <Button
          variant="contained"
          onClick={() => navigate('/login')}
          sx={{ bgcolor: '#0066ff' }}
        >
          Đăng Nhập
        </Button>
      </Container>
    );
  }

  return (
    <Container maxWidth="lg" sx={{ py: 5 }}>
      {/* Header */}
      <Box sx={{ mb: 4, display: 'flex', alignItems: 'center', gap: 2 }}>
        <Button
          startIcon={<ArrowBack />}
          variant="text"
          onClick={() => navigate('/')}
        >
          Quay Lại
        </Button>
        <Typography variant="h4" fontWeight="bold" sx={{ flex: 1 }}>
          📦 Lịch Sử Đơn Hàng
        </Typography>
        <Typography variant="body2" color="textSecondary">
          ({myOrders.length} đơn)
        </Typography>
      </Box>

      {myOrders.length === 0 ? (
        <Card sx={{ p: 4, textAlign: 'center' }}>
          <Typography variant="h6" color="textSecondary" sx={{ mb: 2 }}>
            Bạn chưa có đơn hàng nào
          </Typography>
          <Button
            variant="contained"
            onClick={() => navigate('/')}
            sx={{ bgcolor: '#ff5722' }}
          >
            Bắt Đầu Mua Sắm
          </Button>
        </Card>
      ) : (
        <Stack spacing={2}>
          {myOrders.map((order) => (
            <Card key={order.id} sx={{ borderLeft: `4px solid ${
              order.status === 'Đã giao' ? '#4caf50' :
              order.status === 'Đang giao' ? '#2196f3' :
              order.status === 'Đã hủy' ? '#f44336' : '#ff9800'
            }` }}>
              <CardContent>
                <Grid container spacing={2} alignItems="center">
                  {/* Cột 1: ID & Status */}
                  <Grid item xs={12} sm={6} md={2}>
                    <Box>
                      <Typography variant="caption" color="textSecondary">
                        Mã đơn hàng
                      </Typography>
                      <Typography variant="body2" fontWeight="bold" sx={{ color: '#ff5722' }}>
                        {order.orderNumber}
                      </Typography>
                      <Chip
                        label={order.status}
                        color={getStatusColor(order.status)}
                        icon={getStatusIcon(order.status)}
                        size="small"
                        sx={{ mt: 1 }}
                      />
                    </Box>
                  </Grid>

                  {/* Cột 2: Ngày & Giờ */}
                  <Grid item xs={12} sm={6} md={2}>
                    <Box>
                      <Typography variant="caption" color="textSecondary">
                        Ngày đặt hàng
                      </Typography>
                      <Typography variant="body2" fontWeight="bold">
                        {order.date}
                      </Typography>
                      <Typography variant="caption" color="textSecondary">
                        {order.time}
                      </Typography>
                    </Box>
                  </Grid>

                  {/* Cột 3: Delivery Info */}
                  <Grid item xs={12} sm={6} md={3}>
                    <Box>
                      <Typography variant="caption" color="textSecondary">
                        ⏱️ Thời gian giao
                      </Typography>
                      <Typography variant="body2" sx={{ fontWeight: 'bold', color: '#2196f3' }}>
                        {order.deliveryTime}
                      </Typography>
                      <Typography variant="caption" color="textSecondary">
                        Dự kiến: {order.estimatedDelivery}
                      </Typography>
                    </Box>
                  </Grid>

                  {/* Cột 4: Total */}
                  <Grid item xs={12} sm={6} md={2}>
                    <Box>
                      <Typography variant="caption" color="textSecondary">
                        Tổng tiền
                      </Typography>
                      <Typography variant="body2" sx={{ fontWeight: 'bold', color: '#ff5722', fontSize: '16px' }}>
                        {order.total.toLocaleString('vi-VN')}₫
                      </Typography>
                    </Box>
                  </Grid>

                  {/* Cột 5: Action */}
                  <Grid item xs={12} sm={12} md={3} sx={{ display: 'flex', justifyContent: 'flex-end', gap: 1 }}>
                    <Button
                      variant="outlined"
                      size="small"
                      onClick={() => handleViewDetails(order)}
                    >
                      Chi Tiết
                    </Button>
                    {order.status !== 'Đã giao' && order.status !== 'Đã hủy' && (
                      <Button
                        variant="outlined"
                        size="small"
                        color="warning"
                      >
                        Theo Dõi
                      </Button>
                    )}
                  </Grid>
                </Grid>
              </CardContent>
            </Card>
          ))}
        </Stack>
      )}

      {/* Order Details Dialog */}
      <Dialog 
        open={openDetails} 
        onClose={() => setOpenDetails(false)} 
        maxWidth="md" 
        fullWidth
      >
        <DialogTitle sx={{ bgcolor: '#f5f5f5', fontWeight: 'bold' }}>
          Chi Tiết Đơn Hàng {selectedOrder?.orderNumber}
        </DialogTitle>

        <DialogContent sx={{ pt: 3 }}>
          {selectedOrder && (
            <Stack spacing={3}>
              {/* Thông tin khách */}
              <Box>
                <Typography variant="h6" fontWeight="bold" sx={{ mb: 2, display: 'flex', alignItems: 'center', gap: 1 }}>
                  👤 Thông Tin Khách Hàng
                </Typography>
                <Grid container spacing={2}>
                  <Grid item xs={12} sm={6}>
                    <Typography variant="body2" color="textSecondary">Tên</Typography>
                    <Typography variant="body1" fontWeight="bold">
                      {selectedOrder.customer?.name}
                    </Typography>
                  </Grid>
                  <Grid item xs={12} sm={6}>
                    <Typography variant="body2" color="textSecondary">Email</Typography>
                    <Typography variant="body1" fontWeight="bold">
                      {selectedOrder.customer?.email}
                    </Typography>
                  </Grid>
                  <Grid item xs={12} sm={6}>
                    <Typography variant="body2" color="textSecondary">Điện Thoại</Typography>
                    <Typography variant="body1" fontWeight="bold" sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                      <Phone sx={{ fontSize: 18 }} />
                      {selectedOrder.customer?.phone}
                    </Typography>
                  </Grid>
                  <Grid item xs={12} sm={6}>
                    <Typography variant="body2" color="textSecondary">Phương Thức Thanh Toán</Typography>
                    <Typography variant="body1" fontWeight="bold">
                      {selectedOrder.paymentMethod === 'cod' ? 'Thanh toán khi nhận hàng' : 'Chuyển khoản'}
                    </Typography>
                  </Grid>
                </Grid>
              </Box>

              <Divider />

              {/* Địa chỉ giao */}
              <Box>
                <Typography variant="h6" fontWeight="bold" sx={{ mb: 2, display: 'flex', alignItems: 'center', gap: 1 }}>
                  <MapPin /> Địa Chỉ Giao Hàng
                </Typography>
                <Paper sx={{ p: 2, bgcolor: '#f9f9f9' }}>
                  <Typography variant="body2" sx={{ mb: 1 }}>
                    <strong>Địa chỉ:</strong> {selectedOrder.customer?.address}
                  </Typography>
                  <Typography variant="body2" sx={{ mb: 1 }}>
                    <strong>Thành phố:</strong> {selectedOrder.customer?.city}
                  </Typography>
                  <Typography variant="body2">
                    <strong>Mã Bưu Điện:</strong> {selectedOrder.customer?.zip || 'N/A'}
                  </Typography>
                </Paper>
              </Box>

              <Divider />

              {/* Thông tin giao hàng */}
              <Box>
                <Typography variant="h6" fontWeight="bold" sx={{ mb: 2, display: 'flex', alignItems: 'center', gap: 1 }}>
                  <LocalShipping /> Thông Tin Giao Hàng
                </Typography>
                <Grid container spacing={2}>
                  <Grid item xs={12} sm={6}>
                    <Typography variant="body2" color="textSecondary">Trạng Thái</Typography>
                    <Chip
                      label={selectedOrder.status}
                      color={getStatusColor(selectedOrder.status)}
                      icon={getStatusIcon(selectedOrder.status)}
                      sx={{ mt: 1 }}
                    />
                  </Grid>
                  <Grid item xs={12} sm={6}>
                    <Typography variant="body2" color="textSecondary">Thời Gian Giao</Typography>
                    <Typography variant="body1" fontWeight="bold" sx={{ color: '#2196f3', mt: 1 }}>
                      {selectedOrder.deliveryTime}
                    </Typography>
                  </Grid>
                  <Grid item xs={12} sm={6}>
                    <Typography variant="body2" color="textSecondary">Ngày Đặt Hàng</Typography>
                    <Typography variant="body1" fontWeight="bold" sx={{ mt: 1 }}>
                      <Calendar sx={{ fontSize: 16, mr: 0.5, verticalAlign: 'middle' }} />
                      {selectedOrder.date} {selectedOrder.time}
                    </Typography>
                  </Grid>
                  <Grid item xs={12} sm={6}>
                    <Typography variant="body2" color="textSecondary">Dự Kiến Giao</Typography>
                    <Typography variant="body1" fontWeight="bold" sx={{ color: '#4caf50', mt: 1 }}>
                      📅 {selectedOrder.estimatedDelivery}
                    </Typography>
                  </Grid>
                </Grid>
              </Box>

              <Divider />

              {/* Danh sách sản phẩm */}
              <Box>
                <Typography variant="h6" fontWeight="bold" sx={{ mb: 2 }}>
                  🛍️ Sản Phẩm Đã Mua ({selectedOrder.items?.length})
                </Typography>
                <TableContainer component={Paper} sx={{ mb: 2 }}>
                  <Table size="small">
                    <TableHead sx={{ bgcolor: '#f5f5f5' }}>
                      <TableRow>
                        <TableCell><strong>Sản Phẩm</strong></TableCell>
                        <TableCell align="center"><strong>Số Lượng</strong></TableCell>
                        <TableCell align="right"><strong>Giá</strong></TableCell>
                        <TableCell align="right"><strong>Tổng</strong></TableCell>
                      </TableRow>
                    </TableHead>
                    <TableBody>
                      {selectedOrder.items?.map((item, idx) => (
                        <TableRow key={idx}>
                          <TableCell>{item.title}</TableCell>
                          <TableCell align="center">x{item.quantity}</TableCell>
                          <TableCell align="right">
                            {item.price.toLocaleString('vi-VN')}₫
                          </TableCell>
                          <TableCell align="right" sx={{ fontWeight: 'bold', color: '#ff5722' }}>
                            {(item.price * item.quantity).toLocaleString('vi-VN')}₫
                          </TableCell>
                        </TableRow>
                      ))}
                      <TableRow sx={{ bgcolor: '#f9f9f9' }}>
                        <TableCell colSpan={2} align="right"><strong>TỔNG CỘNG:</strong></TableCell>
                        <TableCell colSpan={2} align="right" sx={{ fontWeight: 'bold', fontSize: '16px', color: '#ff5722' }}>
                          {selectedOrder.total.toLocaleString('vi-VN')}₫
                        </TableCell>
                      </TableRow>
                    </TableBody>
                  </Table>
                </TableContainer>
              </Box>

              {/* Ghi chú */}
              {selectedOrder.notes && (
                <Box>
                  <Typography variant="body2" color="textSecondary">Ghi Chú:</Typography>
                  <Typography variant="body2" sx={{ p: 1, bgcolor: '#f9f9f9', borderRadius: 1, mt: 1 }}>
                    {selectedOrder.notes}
                  </Typography>
                </Box>
              )}
            </Stack>
          )}
        </DialogContent>

        <DialogActions sx={{ p: 2 }}>
          <Button onClick={() => setOpenDetails(false)}>Đóng</Button>
        </DialogActions>
      </Dialog>
    </Container>
  );
}
