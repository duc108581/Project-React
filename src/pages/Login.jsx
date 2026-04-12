import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { 
  Box, Typography, Paper, TextField, Button, Divider, 
  Alert, CircularProgress, InputAdornment, IconButton 
} from '@mui/material';
import { Visibility, VisibilityOff, CheckCircle } from '@mui/icons-material';

export default function Login() {
  const navigate = useNavigate();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [errors, setErrors] = useState({});
  const [loading, setLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [successMsg, setSuccessMsg] = useState('');

  // Kiểm tra email hoặc SĐT
  const validateEmail = (value) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    const phoneRegex = /^0\d{9}$/; // SĐT Việt Nam
    return emailRegex.test(value) || phoneRegex.test(value);
  };

  const handleChange = (field, value) => {
    if (field === 'email') setEmail(value);
    if (field === 'password') setPassword(value);
    
    // Xóa lỗi khi người dùng bắt đầu sửa
    if (errors[field]) {
      setErrors({ ...errors, [field]: '' });
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const newErrors = {};

    // Validate email/SĐT
    if (!email) {
      newErrors.email = 'Vui lòng nhập Email hoặc Số điện thoại';
    } else if (!validateEmail(email)) {
      newErrors.email = 'Email hoặc Số điện thoại không hợp lệ (nhập sdt: 0xxxxxxxxx)';
    }

    // Validate password
    if (!password) {
      newErrors.password = 'Vui lòng nhập Mật khẩu';
    } else if (password.length < 6) {
      newErrors.password = 'Mật khẩu phải có ít nhất 6 ký tự';
    }

    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      return;
    }

    // Giả lập đăng nhập
    setLoading(true);
    setTimeout(() => {
      setSuccessMsg('✓ Đăng nhập thành công!');
      setTimeout(() => {
        localStorage.setItem('user', JSON.stringify({ name: email }));
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
          <Typography variant="body2" color="text.secondary">Nơi mua Laptop chất lượng nhất Việt Nam</Typography>
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
          <Typography variant="h5" fontWeight="bold" mb={3}>Đăng Nhập</Typography>

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
              label="Email hoặc Số điện thoại"
              placeholder="example@gmail.com hoặc 0xxxxxxxxx"
              variant="outlined"
              value={email}
              onChange={(e) => handleChange('email', e.target.value)}
              error={!!errors.email}
              helperText={errors.email}
              disabled={loading}
              sx={{ 
                '& .MuiOutlinedInput-root': {
                  borderRadius: 1.5,
                  '&:hover fieldset': { borderColor: '#0066ff' }
                }
              }}
            />

            <TextField
              fullWidth
              label="Mật khẩu"
              type={showPassword ? 'text' : 'password'}
              variant="outlined"
              value={password}
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
                  '&:hover fieldset': { borderColor: '#0066ff' }
                }
              }}
            />

            <Button 
              type="submit"
              fullWidth
              variant="contained" 
              disabled={loading}
              sx={{ 
                bgcolor: '#0066ff', 
                color: 'white', 
                py: 1.5, 
                borderRadius: 1.5,
                fontWeight: 'bold',
                fontSize: '15px',
                textTransform: 'none',
                boxShadow: '0 2px 8px rgba(0, 102, 255, 0.3)',
                '&:hover': { 
                  bgcolor: '#004fcf',
                  boxShadow: '0 4px 12px rgba(0, 102, 255, 0.4)'
                },
                '&:disabled': { bgcolor: '#b3d9ff' }
              }}
            >
              {loading ? <CircularProgress size={24} sx={{ color: 'white' }} /> : 'Đăng nhập'}
            </Button>
          </Box>

          <Divider sx={{ my: 3 }} />

          <Box sx={{ textAlign: 'center' }}>
            <Typography variant="body2" color="text.secondary" sx={{ mb: 2 }}>
              Bạn mới đến SmokerIT?
            </Typography>
            <Button 
              component={Link} 
              to="/register" 
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
              Tạo tài khoản SmokerIT
            </Button>
          </Box>
        </Paper>

        <Typography variant="caption" sx={{ display: 'block', textAlign: 'center', mt: 3, color: '#999' }}>
          Bên bao mật: Chúng tôi bảo vệ thông tin cá nhân của bạn 🔒
        </Typography>
      </Box>
    </Box>
  );
}