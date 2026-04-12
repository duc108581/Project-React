import React, { useState, useContext, useEffect } from 'react';
import { OrderContext } from '../context/OrderContext';
import {
  Box, Table, TableBody, TableCell, TableContainer, TableHead,
  TableRow, Paper, Button, Chip, Dialog, DialogTitle, DialogContent,
  DialogActions, Select, MenuItem, FormControl, InputLabel, Typography,
  TextField, InputAdornment
} from '@mui/material';
import { Delete, Edit, Search, Visibility } from '@mui/icons-material';

export default function AdminOrderManager() {
  const { orders, updateOrderStatus, deleteOrder } = useContext(OrderContext);
  const [filteredOrders, setFilteredOrders] = useState(orders);
  const [searchTerm, setSearchTerm] = useState('');
  const [openStatusDialog, setOpenStatusDialog] = useState(false);
  const [selectedOrder, setSelectedOrder] = useState(null);
  const [newStatus, setNewStatus] = useState('');
  const [openDetailDialog, setOpenDetailDialog] = useState(false);

  useEffect(() => {
    const filtered = orders.filter(order =>
      order.customer?.email?.toLowerCase().includes(searchTerm.toLowerCase()) ||
      order.customer?.name?.toLowerCase().includes(searchTerm.toLowerCase()) ||
      order.id.toString().includes(searchTerm)
    );
    setFilteredOrders(filtered);
  }, [searchTerm, orders]);

  const handleStatusChange = (order) => {
    setSelectedOrder(order);
    setNewStatus(order.status);
    setOpenStatusDialog(true);
  };

  const handleSaveStatus = () => {
    if (selectedOrder && newStatus) {
      updateOrderStatus(selectedOrder.id, newStatus);
      setOpenStatusDialog(false);
    }
  };

  const handleViewDetails = (order) => {
    setSelectedOrder(order);
    setOpenDetailDialog(true);
  };

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

  return (
    <Box>
      <Box sx={{ mb: 3 }}>
        <Typography variant="h5" fontWeight="bold" sx={{ mb: 3 }}>
          Quản Lý Đơn Hàng ({filteredOrders.length})
        </Typography>

        <TextField
          placeholder="Tìm kiếm theo email hoặc ID đơn hàng..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          InputProps={{
            startAdornment: <Search sx={{ mr: 1, color: 'gray' }} />
          }}
          fullWidth
          sx={{ mb: 2 }}
        />
      </Box>

      {/* Orders Table */}
      <TableContainer component={Paper}>
        <Table sx={{ minWidth: 900 }}>
          <TableHead sx={{ bgcolor: '#f5f5f5' }}>
            <TableRow>
              <TableCell><strong>Mã ĐH</strong></TableCell>
              <TableCell><strong>Khách Hàng</strong></TableCell>
              <TableCell><strong>Email</strong></TableCell>
              <TableCell><strong>Ngày</strong></TableCell>
              <TableCell align="right"><strong>Tổng Tiền</strong></TableCell>
              <TableCell><strong>Trạng Thái</strong></TableCell>
              <TableCell><strong>Hành Động</strong></TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {filteredOrders.length > 0 ? (
              filteredOrders.map((order) => (
                <TableRow key={order.id} hover>
                  <TableCell sx={{ fontWeight: 'bold' }}>#{order.id}</TableCell>
                  <TableCell>{order.customer?.name || 'Không rõ'}</TableCell>
                  <TableCell>{order.customer?.email || 'N/A'}</TableCell>
                  <TableCell>{order.date}</TableCell>
                  <TableCell align="right" sx={{ color: '#ff5722', fontWeight: 'bold' }}>
                    {order.total.toLocaleString('vi-VN')}₫
                  </TableCell>
                  <TableCell>
                    <Chip
                      label={order.status}
                      color={getStatusColor(order.status)}
                      size="small"
                    />
                  </TableCell>
                  <TableCell sx={{ display: 'flex', gap: 0.5 }}>
                    <Button
                      size="small"
                      variant="outlined"
                      startIcon={<Visibility />}
                      onClick={() => handleViewDetails(order)}
                    >
                      Chi Tiết
                    </Button>
                    <Button
                      size="small"
                      startIcon={<Edit />}
                      onClick={() => handleStatusChange(order)}
                      sx={{ minWidth: 'auto' }}
                    >
                      Cập Nhật
                    </Button>
                    <Button
                      size="small"
                      color="error"
                      startIcon={<Delete />}
                      onClick={() => {
                        if (window.confirm('Xóa đơn hàng này?')) {
                          deleteOrder(order.id);
                        }
                      }}
                      sx={{ minWidth: 'auto' }}
                    >
                      Xóa
                    </Button>
                  </TableCell>
                </TableRow>
              ))
            ) : (
              <TableRow>
                <TableCell colSpan={7} sx={{ textAlign: 'center', py: 4, color: 'gray' }}>
                  Không có đơn hàng nào
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </TableContainer>

      {/* Update Status Dialog */}
      <Dialog open={openStatusDialog} onClose={() => setOpenStatusDialog(false)}>
        <DialogTitle>Cập Nhật Trạng Thái Đơn Hàng</DialogTitle>
        <DialogContent sx={{ pt: 2 }}>
          <FormControl fullWidth>
            <InputLabel>Trạng Thái</InputLabel>
            <Select
              value={newStatus}
              onChange={(e) => setNewStatus(e.target.value)}
              label="Trạng Thái"
            >
              <MenuItem value="Chưa xử lý">Chưa xử lý</MenuItem>
              <MenuItem value="Đã xác nhận">Đã xác nhận</MenuItem>
              <MenuItem value="Đang giao">Đang giao</MenuItem>
              <MenuItem value="Đã giao">Đã giao</MenuItem>
              <MenuItem value="Đã hủy">Đã hủy</MenuItem>
            </Select>
          </FormControl>
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setOpenStatusDialog(false)}>Hủy</Button>
          <Button onClick={handleSaveStatus} variant="contained" sx={{ bgcolor: '#4caf50' }}>
            Cập Nhật
          </Button>
        </DialogActions>
      </Dialog>

      {/* Order Details Dialog */}
      <Dialog open={openDetailDialog} onClose={() => setOpenDetailDialog(false)} maxWidth="sm" fullWidth>
        <DialogTitle>Chi Tiết Đơn Hàng #{selectedOrder?.id}</DialogTitle>
        <DialogContent sx={{ pt: 2 }}>
          {selectedOrder && (
            <Box>
              <Typography variant="h6" fontWeight="bold" sx={{ mb: 2 }}>
                Thông tin khách hàng
              </Typography>
              <Typography><strong>Tên:</strong> {selectedOrder.customer?.name}</Typography>
              <Typography><strong>Email:</strong> {selectedOrder.customer?.email}</Typography>
              <Typography><strong>SĐT:</strong> {selectedOrder.customer?.phone || 'N/A'}</Typography>

              <Typography variant="h6" fontWeight="bold" sx={{ mt: 3, mb: 2 }}>
                Sản phẩm đã mua
              </Typography>
              {selectedOrder.items?.map((item, idx) => (
                <Box key={idx} sx={{ mb: 2, p: 1, bgcolor: '#f5f5f5', borderRadius: 1 }}>
                  <Typography><strong>{item.title}</strong></Typography>
                  <Typography variant="body2">
                    Giá: {item.price.toLocaleString('vi-VN')}₫ × {item.quantity}
                  </Typography>
                  <Typography variant="body2" color="textSecondary">
                    Tổng: {(item.price * item.quantity).toLocaleString('vi-VN')}₫
                  </Typography>
                </Box>
              ))}

              <Typography variant="h6" fontWeight="bold" sx={{ mt: 3, mb: 1 }}>
                Tổng Cộng: <span style={{ color: '#ff5722' }}>
                  {selectedOrder.total.toLocaleString('vi-VN')}₫
                </span>
              </Typography>
            </Box>
          )}
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setOpenDetailDialog(false)}>Đóng</Button>
        </DialogActions>
      </Dialog>
    </Box>
  );
}
