// src/pages/Checkout.jsx
import React, { useState, useContext, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { OrderContext } from '../context/OrderContext';
import { 
  Box, Container, Grid, Typography, TextField, 
  Button, Paper, Divider, Stack, Alert, CircularProgress, MenuItem,
  Dialog, DialogContent, DialogActions, FormControlLabel, Radio, RadioGroup
} from '@mui/material';
import { Lock, CheckCircle, LocalShipping } from '@mui/icons-material';

export default function Checkout({ total, clearCart, cart, user }) {
  const navigate = useNavigate();
  const { createOrder, getSavedAddresses, deliveryTimeEstimate } = useContext(OrderContext);
  const [loading, setLoading] = useState(false);
  const [dialogOpen, setDialogOpen] = useState(false);
  const [paymentMethod, setPaymentMethod] = useState('cod');
  const [savedAddrs, setSavedAddrs] = useState([]);
  const [estimatedDelivery, setEstimatedDelivery] = useState('');
  
  const [formData, setFormData] = useState({
    name: user?.name || '',
    phone: '',
    address: '',
    city: '',
    zip: '',
    email: user?.email || ''
  });
  const [errors, setErrors] = useState({});
  const [selectedAddress, setSelectedAddress] = useState(null);

  // Load saved addresses
  useEffect(() => {
    const addresses = getSavedAddresses();
    setSavedAddrs(addresses);
  }, [getSavedAddresses]);

  // Update delivery estimate when city changes
  useEffect(() => {
    if (formData.city) {
      setEstimatedDelivery(deliveryTimeEstimate[formData.city] || '3-5 ngày');
    }
  }, [formData.city, deliveryTimeEstimate]);

  const validatePhone = (phone) => /^0\d{9}$/.test(phone);
  const validateEmail = (email) => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
  const validateAddress = (address) => address.trim().length >= 5;

  const handleChange = (field, value) => {
    setFormData({ ...formData, [field]: value });
    if (errors[field]) {
      setErrors({ ...errors, [field]: '' });
    }
  };

  const handleSelectSavedAddress = (addr) => {
    setFormData({
      name: addr.name || formData.name,
      phone: addr.phone || formData.phone,
      address: addr.address,
      city: addr.city,
      zip: addr.zip || ''
    });
    setSelectedAddress(addr);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const newErrors = {};

    if (!formData.name) newErrors.name = 'Vui lòng nhập Họ và Tên';
    if (!formData.email) {
      newErrors.email = 'Vui lòng nhập Email';
    } else if (!validateEmail(formData.email)) {
      newErrors.email = 'Email không hợp lệ';
    }
    if (!formData.phone) {
      newErrors.phone = 'Vui lòng nhập Số điện thoại';
    } else if (!validatePhone(formData.phone)) {
      newErrors.phone = 'Số điện thoại không hợp lệ (nhập: 0xxxxxxxxx)';
    }
    if (!formData.address) {
      newErrors.address = 'Vui lòng nhập Địa chỉ chi tiết';
    } else if (!validateAddress(formData.address)) {
      newErrors.address = 'Địa chỉ phải có ít nhất 5 ký tự';
    }
    if (!formData.city) newErrors.city = 'Vui lòng chọn Thành phố / Tỉnh';

    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      return;
    }

    setLoading(true);
    setTimeout(() => {
      setLoading(false);
      setDialogOpen(true);
    }, 1000);
  };

  const handleConfirmOrder = () => {
    setDialogOpen(false);
    if (createOrder && cart && cart.length > 0) {
      createOrder(cart, formData, paymentMethod);
    }
    clearCart();
    navigate('/');
  };

  const cities = ['TP. Hồ Chí Minh', 'Hà Nội', 'Đà Nẵng', 'Hải Phòng', 'Cần Thơ', 'Khác'];

  return (
    <Container maxWidth="lg" sx={{ py: 6 }}>
      <Box sx={{ mb: 4 }}>
        <Typography variant="h4" fontWeight="bold" sx={{ display: 'flex', alignItems: 'center', gap: 1.5, mb: 1 }}>
          <Lock sx={{ color: '#ff5722', fontSize: '28px' }} />
          Thanh toán an toàn
        </Typography>
        <Typography variant="body2" color="text.secondary">
          Hệ thống bảo mật SSL tối tân bảo vệ thông tin của bạn
        </Typography>
      </Box>

      <form onSubmit={handleSubmit}>
        <Grid container spacing={3}>
          {/* CỘT TRÁI: THÔNG TIN GIAO HÀNG */}
          <Grid item xs={12} md={7}>
            <Paper elevation={3} sx={{ p: { xs: 2.5, md: 3.5 }, borderRadius: 2 }}>
              {/* Saved Addresses */}
              {savedAddrs.length > 0 && (
                <Box sx={{ mb: 3, p: 2, bgcolor: '#f5f5f5', borderRadius: 1 }}>
                  <Typography variant="subtitle2" fontWeight="bold" sx={{ mb: 1.5 }}>
                    📍 Địa chỉ đã sử dụng trước đây:
                  </Typography>
                  <Stack spacing={1}>
                    {savedAddrs.map((addr, idx) => (
                      <Button
                        key={idx}
                        variant={selectedAddress === addr ? 'contained' : 'outlined'}
                        onClick={() => handleSelectSavedAddress(addr)}
                        size="small"
                        sx={{ justifyContent: 'flex-start', textAlign: 'left', textTransform: 'none' }}
                      >
                        <Box sx={{ textAlign: 'left' }}>
                          <Typography variant="caption" display="block">
                            {addr.address}, {addr.city}
                          </Typography>
                          <Typography variant="caption" color="textSecondary">
                            {addr.phone}
                          </Typography>
                        </Box>
                      </Button>
                    ))}
                  </Stack>
                  <Divider sx={{ my: 2 }} />
                </Box>
              )}

              <Box sx={{ display: 'flex', alignItems: 'center', gap: 1.5, mb: 3 }}>
                <Box sx={{ bgcolor: '#e3f2fd', p: 1, borderRadius: '50%' }}>
                  <Typography sx={{ color: '#0066ff', fontWeight: 'bold', fontSize: '18px' }}>1</Typography>
                </Box>
                <Typography variant="h6" fontWeight="bold">Địa chỉ giao hàng</Typography>
              </Box>

              <Grid container spacing={2.5}>
                <Grid item xs={12}>
                  <TextField
                    fullWidth
                    label="Họ và Tên"
                    placeholder="Nguyễn Văn A"
                    variant="outlined"
                    value={formData.name}
                    onChange={(e) => handleChange('name', e.target.value)}
                    error={!!errors.name}
                    helperText={errors.name}
                    disabled={loading}
                  />
                </Grid>

                <Grid item xs={12} sm={6}>
                  <TextField
                    fullWidth
                    label="Email"
                    placeholder="example@gmail.com"
                    variant="outlined"
                    type="email"
                    value={formData.email}
                    onChange={(e) => handleChange('email', e.target.value)}
                    error={!!errors.email}
                    helperText={errors.email}
                    disabled={loading}
                  />
                </Grid>

                <Grid item xs={12} sm={6}>
                  <TextField
                    fullWidth
                    label="Số điện thoại"
                    placeholder="0xxxxxxxxx"
                    variant="outlined"
                    value={formData.phone}
                    onChange={(e) => handleChange('phone', e.target.value)}
                    error={!!errors.phone}
                    helperText={errors.phone}
                    disabled={loading}
                  />
                </Grid>

                <Grid item xs={12}>
                  <TextField
                    fullWidth
                    label="Địa chỉ chi tiết"
                    placeholder="Số nhà, tên đường..."
                    multiline
                    rows={2}
                    variant="outlined"
                    value={formData.address}
                    onChange={(e) => handleChange('address', e.target.value)}
                    error={!!errors.address}
                    helperText={errors.address}
                    disabled={loading}
                  />
                </Grid>

                <Grid item xs={12} sm={6}>
                  <TextField
                    fullWidth
                    select
                    label="Thành phố / Tỉnh"
                    value={formData.city}
                    onChange={(e) => handleChange('city', e.target.value)}
                    error={!!errors.city}
                    helperText={errors.city}
                    disabled={loading}
                  >
                    <MenuItem value="">-- Chọn --</MenuItem>
                    {cities.map((city) => (
                      <MenuItem key={city} value={city}>{city}</MenuItem>
                    ))}
                  </TextField>
                </Grid>

                <Grid item xs={12} sm={6}>
                  <TextField
                    fullWidth
                    label="Mã Zip (Tùy chọn)"
                    placeholder="700000"
                    variant="outlined"
                    value={formData.zip}
                    onChange={(e) => handleChange('zip', e.target.value)}
                    disabled={loading}
                  />
                </Grid>
              </Grid>

              <Divider sx={{ my: 3 }} />

              <Box sx={{ display: 'flex', alignItems: 'center', gap: 1.5, mb: 3 }}>
                <Box sx={{ bgcolor: '#fff3e0', p: 1, borderRadius: '50%' }}>
                  <Typography sx={{ color: '#ff9800', fontWeight: 'bold', fontSize: '18px' }}>2</Typography>
                </Box>
                <Typography variant="h6" fontWeight="bold">Phương thức thanh toán</Typography>
              </Box>

              <RadioGroup
                value={paymentMethod}
                onChange={(e) => setPaymentMethod(e.target.value)}
              >
                <FormControlLabel
                  value="cod"
                  control={<Radio />}
                  label="💵 Thanh toán khi nhận hàng (COD)"
                  sx={{ mb: 1.5 }}
                />
                <FormControlLabel
                  value="transfer"
                  control={<Radio />}
                  label="🏦 Chuyển khoản trực tiếp"
                  sx={{ mb: 1.5 }}
                />
              </RadioGroup>

              {paymentMethod === 'transfer' && (
                <Alert severity="info" sx={{ mt: 2 }}>
                  Vui lòng chuyển khoản đến: <strong>MB Bank - 0123456789</strong>
                </Alert>
              )}
            </Paper>
          </Grid>

          {/* CỘT PHẢI: CHI TIẾT ĐƠN HÀNG VÀ GIAO HÀNG */}
          <Grid item xs={12} md={5}>
            {/* Delivery Info */}
            <Paper
              elevation={3}
              sx={{
                p: 2.5,
                borderRadius: 2,
                background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
                color: 'white',
                mb: 3
              }}
            >
              <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, mb: 2 }}>
                <LocalShipping />
                <Typography variant="h6" fontWeight="bold">
                  Thông Tin Giao Hàng
                </Typography>
              </Box>

              <Divider sx={{ bgcolor: 'rgba(255,255,255,0.3)', my: 2 }} />

              <Stack spacing={2}>
                <Box>
                  <Typography variant="caption" sx={{ opacity: 0.9 }}>
                    ⏱️ Thời gian giao dự kiến:
                  </Typography>
                  <Typography variant="h6" fontWeight="bold" sx={{ mt: 0.5 }}>
                    {estimatedDelivery || 'Chọn thành phố để xem'}
                  </Typography>
                </Box>

                {formData.city && (
                  <Box>
                    <Typography variant="caption" sx={{ opacity: 0.9 }}>
                      📅 Dự kiến giao vào:
                    </Typography>
                    <Typography variant="body2" sx={{ mt: 0.5, fontWeight: 'bold' }}>
                      {formData.city !== 'Khác' ? 
                        new Date(Date.now() + parseInt(estimatedDelivery.split('-')[1]) * 24 * 60 * 60 * 1000).toLocaleDateString('vi-VN') 
                        : 'Liên hệ shop'}
                    </Typography>
                  </Box>
                )}

                <Alert severity="success" sx={{ bgcolor: 'rgba(255,255,255,0.2)', color: 'white' }}>
                  ✈️ Miễn phí vận chuyển toàn quốc
                </Alert>
              </Stack>
            </Paper>

            {/* Order Summary */}
            <Paper elevation={3} sx={{ p: 2.5, borderRadius: 2 }}>
              <Typography variant="h6" fontWeight="bold" sx={{ mb: 2 }}>
                📦 Tóm tắt đơn hàng
              </Typography>

              <Box sx={{ maxHeight: '250px', overflowY: 'auto', mb: 2 }}>
                {cart && cart.map((item, idx) => (
                  <Box key={idx} sx={{ display: 'flex', justifyContent: 'space-between', mb: 1, pb: 1, borderBottom: '1px solid #eee' }}>
                    <Typography variant="body2" noWrap sx={{ flex: 1 }}>
                      {item.title?.substring(0, 25)}...
                    </Typography>
                    <Typography variant="caption" sx={{ color: '#666', mr: 1 }}>x{item.quantity}</Typography>
                    <Typography variant="body2" fontWeight="bold" sx={{ color: '#ff5722', minWidth: '80px', textAlign: 'right' }}>
                      {(item.price * item.quantity).toLocaleString('vi-VN')}₫
                    </Typography>
                  </Box>
                ))}
              </Box>

              <Divider sx={{ my: 2 }} />

              <Box sx={{ mb: 3 }}>
                <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 1 }}>
                  <Typography>Tạm tính:</Typography>
                  <Typography fontWeight="bold">{total.toLocaleString('vi-VN')}₫</Typography>
                </Box>
                <Box sx={{ display: 'flex', justifyContent: 'space-between' }}>
                  <Typography>Vận chuyển:</Typography>
                  <Typography sx={{ color: '#4caf50', fontWeight: 'bold' }}>Miễn phí</Typography>
                </Box>
              </Box>

              <Divider sx={{ my: 2 }} />

              <Box sx={{ mb: 3, display: 'flex', justifyContent: 'space-between' }}>
                <Typography variant="h6" fontWeight="bold">
                  Tổng cộng:
                </Typography>
                <Typography variant="h5" fontWeight="bold" sx={{ color: '#ff5722' }}>
                  {total.toLocaleString('vi-VN')}₫
                </Typography>
              </Box>

              <Button
                fullWidth
                variant="contained"
                size="large"
                type="submit"
                disabled={loading}
                sx={{
                  background: 'linear-gradient(45deg, #FF512F 0%, #F09819 100%)',
                  color: 'white',
                  fontWeight: 'bold',
                  textTransform: 'uppercase'
                }}
              >
                {loading ? <CircularProgress size={24} color="inherit" /> : '💳 Đặt Hàng Ngay'}
              </Button>

              <Alert severity="info" sx={{ mt: 2 }}>
                ✓ Bạn có thể hủy trong 24h
              </Alert>
            </Paper>
          </Grid>
        </Grid>
      </form>

      {/* Success Dialog */}
      <Dialog open={dialogOpen} onClose={() => setDialogOpen(false)} maxWidth="sm" fullWidth>
        <DialogContent sx={{ textAlign: 'center', pt: 4, pb: 3 }}>
          <Box sx={{ mb: 3, display: 'flex', justifyContent: 'center' }}>
            <Box sx={{ width: 80, height: 80, bgcolor: '#e8f5e9', borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
              <CheckCircle sx={{ fontSize: 48, color: '#4caf50' }} />
            </Box>
          </Box>

          <Typography variant="h5" fontWeight="bold" sx={{ mb: 1, color: '#2e7d32' }}>
            Đặt hàng thành công!
          </Typography>

          <Typography variant="body2" color="textSecondary" sx={{ mb: 3 }}>
            Cảm ơn bạn đã mua hàng tại SmokerIT.
            <br />
            Chúng tôi sẽ liên hệ với bạn sớm.
          </Typography>

          <Alert severity="success" sx={{ mb: 2, textAlign: 'left' }}>
            <Box>
              📍 <strong>Địa chỉ giao:</strong> {formData.address}, {formData.city}
              <br />
              ⏱️ <strong>Thời gian giao:</strong> {estimatedDelivery}
              <br />
              📞 <strong>Hotline:</strong> 1900-xxxx (miễn phí)
            </Box>
          </Alert>

          <Typography variant="body2" color="textSecondary" sx={{ mb: 2 }}>
            💡 Xem lịch sử đơn hàng trong tài khoản của bạn
          </Typography>
        </DialogContent>

        <DialogActions sx={{ p: 2 }}>
          <Button onClick={handleConfirmOrder} variant="contained" fullWidth sx={{ bgcolor: '#4caf50' }}>
            Về Trang Chủ
          </Button>
        </DialogActions>
      </Dialog>
    </Container>
  );
}