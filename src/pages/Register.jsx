import React from 'react';
import { Link } from 'react-router-dom';
import { Box, Typography, Paper, TextField, Button, Divider } from '@mui/material';

export default function Register() {
  return (
    <Box sx={{ maxWidth: 400, mx: 'auto', mt: 8, mb: 15, px: 2 }}>
      <Box textAlign="center" mb={3}><Typography variant="h4" fontWeight="bold">Smok<span style={{color:'#ff5722'}}>erIT</span></Typography></Box>
      <Paper elevation={3} sx={{ p: 4, display: 'flex', flexDirection: 'column', gap: 2, border: '1px solid #ddd', borderRadius: 2 }}>
        <Typography variant="h5" fontWeight="bold">Tạo tài khoản</Typography>
        <TextField label="Họ và tên" variant="outlined" fullWidth />
        <TextField label="Email hoặc Số điện thoại" variant="outlined" fullWidth />
        <TextField label="Mật khẩu" type="password" variant="outlined" fullWidth />
        <Button variant="contained" sx={{ bgcolor: '#ff5722', color: 'white', py: 1.5, mt: 1, borderRadius: 2, '&:hover': { bgcolor: '#e64a19' } }}>Đăng ký</Button>
        <Divider sx={{ my: 2 }} />
        <Typography variant="body2">Đã có tài khoản? <Link to="/login" style={{color: '#0066ff'}}>Đăng nhập</Link></Typography>
      </Paper>
    </Box>
  );
}