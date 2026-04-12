import React, { useState, useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import { AdminContext } from '../context/AdminContext';
import {
  Container, Box, Card, TextField, Button, Typography, Alert, InputAdornment, IconButton
} from '@mui/material';
import { Visibility, VisibilityOff, LockOutlined } from '@mui/icons-material';

export default function AdminLogin() {
  const navigate = useNavigate();
  const { adminLogin } = useContext(AdminContext);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const handleLogin = (e) => {
    e.preventDefault();
    setError('');
    setLoading(true);

    setTimeout(() => {
      const result = adminLogin(email, password);
      if (result.success) {
        navigate('/admin/dashboard');
      } else {
        setError(result.message);
      }
      setLoading(false);
    }, 500);
  };

  const handleShowPassword = () => {
    setShowPassword(!showPassword);
  };

  return (
    <Container maxWidth="sm" sx={{ minHeight: '100vh', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
      <Card sx={{ p: 4, width: '100%', boxShadow: '0 8px 32px rgba(0,0,0,0.1)' }}>
        {/* Header */}
        <Box sx={{ textAlign: 'center', mb: 4 }}>
          <Box sx={{ 
            width: 60, 
            height: 60, 
            mx: 'auto', 
            mb: 2, 
            bgcolor: '#ff5722', 
            borderRadius: '50%',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center'
          }}>
            <LockOutlined sx={{ fontSize: 32, color: 'white' }} />
          </Box>
          <Typography variant="h4" fontWeight="bold" sx={{ mb: 1 }}>
            QUẢN TRỊ HỆ THỐNG
          </Typography>
          <Typography variant="body2" color="textSecondary">
            Đăng nhập tài khoản Admin
          </Typography>
        </Box>

        {/* Error Alert */}
        {error && <Alert severity="error" sx={{ mb: 3 }}>{error}</Alert>}

        {/* Info Box */}
        <Alert severity="info" sx={{ mb: 3 }}>
          <Typography variant="body2" sx={{ fontWeight: 'bold', mb: 1 }}>
            Tài khoản mặc định:
          </Typography>
          <Typography variant="caption" display="block">
            Email: <strong>admin@ecommerce.com</strong>
          </Typography>
          <Typography variant="caption">
            Mật khẩu: <strong>admin123456</strong>
          </Typography>
        </Alert>

        {/* Login Form */}
        <Box component="form" onSubmit={handleLogin}>
          <TextField
            fullWidth
            label="Email Admin"
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
            sx={{ mb: 2 }}
            placeholder="admin@ecommerce.com"
          />

          <TextField
            fullWidth
            label="Mật khẩu"
            type={showPassword ? 'text' : 'password'}
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
            sx={{ mb: 3 }}
            InputProps={{
              endAdornment: (
                <InputAdornment position="end">
                  <IconButton onClick={handleShowPassword} edge="end">
                    {showPassword ? <VisibilityOff /> : <Visibility />}
                  </IconButton>
                </InputAdornment>
              )
            }}
          />

          <Button
            fullWidth
            variant="contained"
            size="large"
            onClick={handleLogin}
            disabled={loading}
            sx={{
              bgcolor: '#ff5722',
              '&:hover': { bgcolor: '#e64a19' },
              mb: 2
            }}
          >
            {loading ? 'Đang kiểm tra...' : 'ĐĂNG NHẬP'}
          </Button>

          <Button
            fullWidth
            variant="outlined"
            onClick={() => navigate('/')}
          >
            Quay Lại Trang Chủ
          </Button>
        </Box>
      </Card>
    </Container>
  );
}
