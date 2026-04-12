import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { 
  Box, Typography, Paper, TextField, Button, Divider, 
  Alert, CircularProgress, InputAdornment, IconButton 
} from '@mui/material';
import { Visibility, VisibilityOff, CheckCircle } from '@mui/icons-material';

export default function Register() {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({ name: '', email: '', password: '', confirmPassword: '' });
  const [errors, setErrors] = useState({});
  const [loading, setLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirm, setShowConfirm] = useState(false);
  const [successMsg, setSuccessMsg] = useState('');

  // Kiểm tra email hoặc SĐT
  const validateEmail = (value) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    const phoneRegex = /^0\d{9}$/;
    return emailRegex.test(value) || phoneRegex.test(value);
  };

  const handleChange = (field, value) => {
    setFormData({ ...formData, [field]: value });
    if (errors[field]) {
      setErrors({ ...errors, [field]: '' });
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const newErrors = {};

    // Validate họ tên
    if (!formData.name) {
      newErrors.name = 'Vui lòng nhập Họ và Tên';
    } else if (formData.name.length < 3) {
      newErrors.name = 'Họ và Tên phải có ít nhất 3 ký tự';
    }

    // Validate email/SĐT
    if (!formData.email) {
      newErrors.email = 'Vui lòng nhập Email hoặc Số điện thoại';
    } else if (!validateEmail(formData.email)) {
      newErrors.email = 'Email hoặc Số điện thoại không hợp lệ (nhập sdt: 0xxxxxxxxx)';
    }

    // Validate password
    if (!formData.password) {
      newErrors.password = 'Vui lòng nhập Mật khẩu';
    } else if (formData.password.length < 6) {
      newErrors.password = 'Mật khẩu phải có ít nhất 6 ký tự';
    }

    // Validate confirm password
    if (!formData.confirmPassword) {
      newErrors.confirmPassword = 'Vui lòng xác nhận Mật khẩu';
    } else if (formData.password !== formData.confirmPassword) {
      newErrors.confirmPassword = 'Mật khẩu không khớp';
    }

    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      return;
    }

    // Giả lập đăng ký
    setLoading(true);
    setTimeout(() => {
      setSuccessMsg('✓ Tạo tài khoản thành công!');
      setTimeout(() => {
        localStorage.setItem('user', JSON.stringify({ name: formData.name }));
        navigate('/');
      }, 1500);
    }, 1000);
  };

  return (
    <Box sx={{ minHeight: '100vh', display: 'flex', alignItems: 'center', justifyContent: 'center', bgcolor: '#f5f5f5', py: 4 }}>
      <Box sx={{ maxWidth: 450, width: '100%', px: 2 }}>
        <Box textAlign="center" mb={4}>
          <Typography variant="h3" fontWeight="bold" sx={{ mb: 1 }}>
            Smok<span style={{color:'#ff5722'}}>erIT</span>
          </Typography>
          <Typography variant="body2" color="text.secondary">Tham gia cộng đồng Laptop Gamer</Typography>
        </Box>

        <Paper 
          elevation={4} 
          sx={{ 
            p: { xs: 3, md: 4 }, 
            borderRadius: 3,
            border: '1px solid #e0e0e0',
            bgcolor: 'white'
          }}
        >
          <Typography variant="h5" fontWeight="bold" mb={3}>Tạo tài khoản</Typography>

          {successMsg && (
            <Alert 
              icon={<CheckCircle />}
              severity="success" 
              sx={{ mb: 2, bgcolor: '#e8f5e9', color: '#2e7d32', borderRadius: 2 }}
            >
              {successMsg}
            </Alert>
          )}

          <Box component="form" onSubmit={handleSubmit} sx={{ display: 'flex', flexDirection: 'column', gap: 2.5 }}>
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
              sx={{ 
                '& .MuiOutlinedInput-root': {
                  borderRadius: 1.5,
                  '&:hover fieldset': { borderColor: '#ff5722' }
                }
              }}
            />

            <TextField
              fullWidth
              label="Email hoặc Số điện thoại"
              placeholder="example@gmail.com hoặc 0xxxxxxxxx"
              variant="outlined"
              value={formData.email}
              onChange={(e) => handleChange('email', e.target.value)}
              error={!!errors.email}
              helperText={errors.email}
              disabled={loading}
              sx={{ 
                '& .MuiOutlinedInput-root': {
                  borderRadius: 1.5,
                  '&:hover fieldset': { borderColor: '#ff5722' }
                }
              }}
            />

            <TextField
              fullWidth
              label="Mật khẩu"
              type={showPassword ? 'text' : 'password'}
              variant="outlined"
              value={formData.password}
              onChange={(e) => handleChange('password', e.target.value)}
              error={!!errors.password}
              helperText={errors.password}
              disabled={loading}
              InputProps={{
                endAdornment: (
                  <InputAdornment position="end">
                    <IconButton
                      onClick={() => setShowPassword(!showPassword)}
                      size="small"
                      edge="end"
                    >
                      {showPassword ? <VisibilityOff /> : <Visibility />}
                    </IconButton>
                  </InputAdornment>
                ),
              }}
              sx={{ 
                '& .MuiOutlinedInput-root': {
                  borderRadius: 1.5,
                  '&:hover fieldset': { borderColor: '#ff5722' }
                }
              }}
            />

            <TextField
              fullWidth
              label="Xác nhận Mật khẩu"
              type={showConfirm ? 'text' : 'password'}
              variant="outlined"
              value={formData.confirmPassword}
              onChange={(e) => handleChange('confirmPassword', e.target.value)}
              error={!!errors.confirmPassword}
              helperText={errors.confirmPassword}
              disabled={loading}
              InputProps={{
                endAdornment: (
                  <InputAdornment position="end">
                    <IconButton
                      onClick={() => setShowConfirm(!showConfirm)}
                      size="small"
                      edge="end"
                    >
                      {showConfirm ? <VisibilityOff /> : <Visibility />}
                    </IconButton>
                  </InputAdornment>
                ),
              }}
              sx={{ 
                '& .MuiOutlinedInput-root': {
                  borderRadius: 1.5,
                  '&:hover fieldset': { borderColor: '#ff5722' }
                }
              }}
            />

            <Button 
              type="submit"
              fullWidth
              variant="contained" 
              disabled={loading}
              sx={{ 
                bgcolor: '#ff5722', 
                color: 'white', 
                py: 1.5, 
                borderRadius: 1.5,
                fontWeight: 'bold',
                fontSize: '15px',
                textTransform: 'none',
                boxShadow: '0 2px 8px rgba(255, 87, 34, 0.3)',
                '&:hover': { 
                  bgcolor: '#e64a19',
                  boxShadow: '0 4px 12px rgba(255, 87, 34, 0.4)'
                },
                '&:disabled': { bgcolor: '#ffb399' }
              }}
            >
              {loading ? <CircularProgress size={24} sx={{ color: 'white' }} /> : 'Đăng ký'}
            </Button>
          </Box>

          <Divider sx={{ my: 3 }} />

          <Box sx={{ textAlign: 'center' }}>
            <Typography variant="body2" color="text.secondary" sx={{ mb: 2 }}>
              Đã có tài khoản?
            </Typography>
            <Button 
              component={Link} 
              to="/login" 
              fullWidth
              variant="outlined"
              sx={{ 
                py: 1, 
                color: '#0066ff', 
                borderColor: '#0066ff', 
                borderRadius: 1.5,
                fontWeight: 'bold',
                textTransform: 'none',
                '&:hover': { 
                  bgcolor: '#e3f2fd',
                  borderColor: '#0066ff'
                }
              }}
            >
              Đăng nhập ngay
            </Button>
          </Box>
        </Paper>

        <Typography variant="caption" sx={{ display: 'block', textAlign: 'center', mt: 3, color: '#999' }}>
          Bảo mật: Dữ liệu của bạn được mã hóa và bảo vệ 🔒
        </Typography>
      </Box>
    </Box>
  );
}