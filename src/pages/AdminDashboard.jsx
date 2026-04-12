import React, { useState, useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import { AdminContext } from '../context/AdminContext';
import { OrderContext } from '../context/OrderContext';
import {
  Container, Grid, Card, CardContent, Typography, Box, Button, Drawer,
  List, ListItem, ListItemText, Divider, AppBar, Toolbar, IconButton,
  Dialog, DialogTitle, DialogContent, DialogActions, TextField, Alert
} from '@mui/material';
import {
  Dashboard, ShoppingCart, Logout, Menu as MenuIcon, Close,
  Add, Delete, Edit, TrendingUp
} from '@mui/icons-material';
import AdminProductManager from '../components/AdminProductManager';
import AdminOrderManager from '../components/AdminOrderManager';

export default function AdminDashboard() {
  const navigate = useNavigate();
  const { admin, adminLogout } = useContext(AdminContext);
  const { getOrderStats } = useContext(OrderContext);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [activeTab, setActiveTab] = useState('dashboard');
  const [stats, setStats] = useState(getOrderStats());

  React.useEffect(() => {
    setStats(getOrderStats());
  }, []);

  const handleLogout = () => {
    adminLogout();
    navigate('/admin/login');
  };

  const menuItems = [
    { id: 'dashboard', label: 'Tổng Quan', icon: <Dashboard /> },
    { id: 'products', label: 'Quản Lý Sản Phẩm', icon: <ShoppingCart /> },
    { id: 'orders', label: 'Quản Lý Đơn Hàng', icon: <ShoppingCart /> },
  ];

  // Drawer content
  const drawerContent = (
    <Box sx={{ width: 280 }}>
      <Box sx={{ p: 2, bgcolor: '#ff5722', color: 'white' }}>
        <Typography variant="h6" fontWeight="bold">
          ADMIN PANEL
        </Typography>
        <Typography variant="caption">
          {admin?.email}
        </Typography>
      </Box>
      <List>
        {menuItems.map((item) => (
          <ListItem
            key={item.id}
            button
            selected={activeTab === item.id}
            onClick={() => {
              setActiveTab(item.id);
              setMobileOpen(false);
            }}
            sx={{
              bgcolor: activeTab === item.id ? '#ffebee' : 'transparent',
              borderLeft: activeTab === item.id ? '4px solid #ff5722' : 'none',
              '&:hover': { bgcolor: '#f5f5f5' }
            }}
          >
            <Box sx={{ mr: 2, color: activeTab === item.id ? '#ff5722' : 'inherit' }}>
              {item.icon}
            </Box>
            <ListItemText primary={item.label} />
          </ListItem>
        ))}
      </List>
      <Divider sx={{ my: 2 }} />
      <Box sx={{ p: 2 }}>
        <Button
          fullWidth
          variant="outlined"
          color="error"
          startIcon={<Logout />}
          onClick={handleLogout}
        >
          Đăng Xuất
        </Button>
      </Box>
    </Box>
  );

  return (
    <Box sx={{ display: 'flex', minHeight: '100vh', bgcolor: '#f5f5f5' }}>
      {/* Desktop Sidebar */}
      <Box
        sx={{
          width: 280,
          bgcolor: 'white',
          boxShadow: 2,
          display: { xs: 'none', md: 'block' }
        }}
      >
        {drawerContent}
      </Box>

      {/* Mobile Drawer */}
      <Drawer
        anchor="left"
        open={mobileOpen}
        onClose={() => setMobileOpen(false)}
        sx={{ display: { xs: 'block', md: 'none' } }}
      >
        {drawerContent}
      </Drawer>

      {/* Main Content */}
      <Box sx={{ flex: 1 }}>
        {/* Top Bar */}
        <AppBar position="static" sx={{ bgcolor: '#fff', color: '#333', boxShadow: 2 }}>
          <Toolbar>
            <IconButton
              color="inherit"
              onClick={() => setMobileOpen(true)}
              sx={{ display: { xs: 'block', md: 'none' }, mr: 1 }}
            >
              <MenuIcon />
            </IconButton>
            <Typography variant="h6" sx={{ flex: 1, fontWeight: 'bold', color: '#ff5722' }}>
              Dashboard Admin
            </Typography>
            <Typography variant="body2" sx={{ mr: 2 }}>
              {admin?.name}
            </Typography>
          </Toolbar>
        </AppBar>

        {/* Content Area */}
        <Container maxWidth="lg" sx={{ py: 3 }}>
          {/* Dashboard Tab */}
          {activeTab === 'dashboard' && (
            <Box>
              <Typography variant="h5" fontWeight="bold" sx={{ mb: 3 }}>
                Tổng Quan Hệ Thống
              </Typography>

              {/* Stats Grid */}
              <Grid container spacing={2} sx={{ mb: 4 }}>
                <Grid item xs={12} sm={6} md={3}>
                  <Card>
                    <CardContent sx={{ textAlign: 'center' }}>
                      <ShoppingCart sx={{ fontSize: 40, color: '#ff5722', mb: 1 }} />
                      <Typography color="textSecondary" variant="body2">
                        TỔNG ĐƠN HÀNG
                      </Typography>
                      <Typography variant="h4" fontWeight="bold" sx={{ color: '#ff5722' }}>
                        {stats.totalOrders}
                      </Typography>
                    </CardContent>
                  </Card>
                </Grid>

                <Grid item xs={12} sm={6} md={3}>
                  <Card>
                    <CardContent sx={{ textAlign: 'center' }}>
                      <TrendingUp sx={{ fontSize: 40, color: '#4caf50', mb: 1 }} />
                      <Typography color="textSecondary" variant="body2">
                        DOANH THU
                      </Typography>
                      <Typography variant="h6" fontWeight="bold" sx={{ color: '#4caf50' }}>
                        {stats.totalRevenue.toLocaleString('vi-VN')}₫
                      </Typography>
                    </CardContent>
                  </Card>
                </Grid>

                <Grid item xs={12} sm={6} md={3}>
                  <Card>
                    <CardContent sx={{ textAlign: 'center' }}>
                      <Typography variant="h6" sx={{ color: '#2196f3' }}>👥</Typography>
                      <Typography color="textSecondary" variant="body2">
                        KHÁCH HÀNG
                      </Typography>
                      <Typography variant="h4" fontWeight="bold" sx={{ color: '#2196f3' }}>
                        {stats.totalCustomers}
                      </Typography>
                    </CardContent>
                  </Card>
                </Grid>

                <Grid item xs={12} sm={6} md={3}>
                  <Card>
                    <CardContent sx={{ textAlign: 'center' }}>
                      <Alert severity="warning" variant="outlined" sx={{ p: 0 }}>
                        <Typography variant="body2" fontWeight="bold">
                          {stats.pendingOrders}
                        </Typography>
                      </Alert>
                      <Typography color="textSecondary" variant="body2" sx={{ mt: 1 }}>
                        CHỨA XỬ LÝ
                      </Typography>
                    </CardContent>
                  </Card>
                </Grid>
              </Grid>

              {/* Quick Actions */}
              <Card sx={{ p: 2 }}>
                <Typography variant="h6" fontWeight="bold" sx={{ mb: 2 }}>
                  Thao Tác Nhanh
                </Typography>
                <Grid container spacing={2}>
                  <Grid item xs={12} sm={6} md={3}>
                    <Button
                      fullWidth
                      variant="contained"
                      startIcon={<Add />}
                      sx={{ bgcolor: '#4caf50' }}
                      onClick={() => setActiveTab('products')}
                    >
                      Thêm Sản Phẩm
                    </Button>
                  </Grid>
                  <Grid item xs={12} sm={6} md={3}>
                    <Button
                      fullWidth
                      variant="outlined"
                      onClick={() => setActiveTab('orders')}
                    >
                      Xem Đơn Hàng ({stats.totalOrders})
                    </Button>
                  </Grid>
                </Grid>
              </Card>
            </Box>
          )}

          {/* Products Tab */}
          {activeTab === 'products' && <AdminProductManager />}

          {/* Orders Tab */}
          {activeTab === 'orders' && <AdminOrderManager />}
        </Container>
      </Box>
    </Box>
  );
}
