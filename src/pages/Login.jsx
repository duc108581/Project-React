import React from 'react';
import { Link } from 'react-router-dom';
import { Box, Typography, Paper, TextField, Button, Divider } from '@mui/material';

export default function Login() {
  return (
    <Box sx={{ maxWidth: 400, mx: 'auto', mt: 8, mb: 15, px: 2 }}>
      <Box textAlign="center" mb={3}><Typography variant="h4" fontWeight="bold">Smok<span style={{color:'#ff5722'}}>erIT</span></Typography></Box>
      <Paper elevation={3} sx={{ p: 4, display: 'flex', flexDirection: 'column', gap: 2, border: '1px solid #ddd', borderRadius: 2 }}>
        <Typography variant="h5" fontWeight="bold">Đăng Nhập</Typography>
        <TextField label="Email hoặc Số điện thoại" variant="outlined" fullWidth />
        <TextField label="Mật khẩu" type="password" variant="outlined" fullWidth />
        <Button variant="contained" sx={{ bgcolor: '#0066ff', color: 'white', py: 1.5, mt: 1, borderRadius: 2, '&:hover': { bgcolor: '#004fcf' } }}>Tiếp tục</Button>
      </Paper>
      <Box textAlign="center" mt={3}>
        <Divider sx={{ my: 2 }}><Typography variant="body2" color="text.secondary">Bạn mới đến SmokerIT?</Typography></Divider>
        <Button variant="outlined" component={Link} to="/register" fullWidth sx={{ py: 1, color: '#0066ff', borderColor: '#0066ff', bgcolor: '#e3f2fd', borderRadius: 2, '&:hover': { bgcolor: '#d0e8ff' } }}>Tạo tài khoản SmokerIT</Button>
      </Box>
    </Box>
  );
}