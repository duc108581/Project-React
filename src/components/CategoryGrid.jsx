// src/components/CategoryGrid.jsx
import React from 'react';
import { Grid, Paper, Typography, Box, Link as MuiLink } from '@mui/material';
import { Link } from 'react-router-dom';

// Component con cho ô vuông nhỏ 2x2
const CategoryItem = ({ title, img }) => (
  <Grid item xs={6} textAlign="center" sx={{ cursor: 'pointer', '&:hover img': { transform: 'scale(1.05)' }, '& img': { transition: '0.2s' } }}>
    <img src={img} alt={title} style={{ width: '100%', height: '100px', objectFit: 'contain' }} />
    <Typography variant="body2" sx={{ mt: 0.5, color: '#1a202c' }}>{title}</Typography>
  </Grid>
);

export default function CategoryGrid() {
  // Hàm xử lý cuộn xuống phần sản phẩm
  const scrollToProducts = () => {
    // Dùng setTimeout để đợi React Router cập nhật URL xong mới bắt đầu cuộn
    setTimeout(() => {
      const section = document.getElementById('products-section');
      if (section) {
        section.scrollIntoView({ behavior: 'smooth' });
      }
    }, 100);
  };

  return (
    <Grid container spacing={2.5} className="grid_container" sx={{ position: 'relative', zIndex: 10, maxWidth: 1500, mx: 'auto', px: 2, justifyContent: 'center' }}>
      
      {/* Khung 1: Laptop Gaming (Dạng 2x2) */}
      <Grid item xs={12} sm={6} md={3}>
        <Paper elevation={6} sx={{ p: 2, minHeight: '380px', height: '100%', display: 'flex', flexDirection: 'column', borderRadius: '12px', bgcolor: '#f8f9fa', border: '2px solid #0066ff', '&:hover': { boxShadow: '0 12px 30px rgba(0, 102, 255, 0.25)', transform: 'translateY(-4px)' }, transition: 'all 0.3s' }}>
          <Typography variant="h6" fontWeight="bold" gutterBottom sx={{ fontSize: '15px', mb: 1.5, color: '#0066ff' }}>🎮 Laptop Gaming</Typography>
          <Grid container spacing={1} sx={{ flexGrow: 1, alignItems: 'center', mb: 1.5 }}>
            <CategoryItem title="ASUS ROG" img="https://m.media-amazon.com/images/I/71CjNNE-UQL._AC_SX679_.jpg"/>
            <CategoryItem title="MSI" img="https://m.media-amazon.com/images/I/71CjNNE-UQL._AC_SX679_.jpg"/>
            <CategoryItem title="Razer" img="https://m.media-amazon.com/images/I/71b2tqG90hL._AC_SX679_.jpg"/>
            <CategoryItem title="Acer Predator" img="https://m.media-amazon.com/images/I/71CjNNE-UQL._AC_SX679_.jpg"/>
          </Grid>
          <MuiLink component={Link} to="/?search=gaming" onClick={scrollToProducts} sx={{ mt: 'auto', fontSize: '13px', textDecoration: 'none', color: '#0066ff', fontWeight: '600', '&:hover': { color: '#ff5722', textDecoration: 'underline' } }}>
            Xem thêm →
          </MuiLink>
        </Paper>
      </Grid>

      {/* Khung 2: Laptop Văn Phòng (Dạng 2x2) */}
      <Grid item xs={12} sm={6} md={3}>
        <Paper elevation={6} sx={{ p: 2, minHeight: '380px', height: '100%', display: 'flex', flexDirection: 'column', borderRadius: '12px', bgcolor: '#f8f9fa', border: '2px solid #0066ff', '&:hover': { boxShadow: '0 12px 30px rgba(0, 102, 255, 0.25)', transform: 'translateY(-4px)' }, transition: 'all 0.3s' }}>
          <Typography variant="h6" fontWeight="bold" gutterBottom sx={{ fontSize: '15px', mb: 1.5, color: '#0066ff' }}>💼 Laptop Văn Phòng</Typography>
          <Grid container spacing={1} sx={{ flexGrow: 1, alignItems: 'center', mb: 1.5 }}>
            <CategoryItem title="MacBook Air" img="https://m.media-amazon.com/images/I/61RJn0ofUsL._AC_SX679_.jpg"/>
            <CategoryItem title="Dell XPS" img="https://m.media-amazon.com/images/I/71R2NbD1mXL._AC_SX679_.jpg"/>
            <CategoryItem title="ThinkPad" img="https://m.media-amazon.com/images/I/51HwGUM-Q9L._AC_SX679_.jpg"/>
            <CategoryItem title="HP Envy" img="https://m.media-amazon.com/images/I/71c8S-mRzXL._AC_SX679_.jpg"/>
          </Grid>
          <MuiLink component={Link} to="/?search=van+phong" onClick={scrollToProducts} sx={{ mt: 'auto', fontSize: '13px', textDecoration: 'none', color: '#0066ff', fontWeight: '600', '&:hover': { color: '#ff5722', textDecoration: 'underline' } }}>
            Xem thêm →
          </MuiLink>
        </Paper>
      </Grid>

      {/* Khung 3: Laptop Đồ Họa & Thiết Kế */}
      <Grid item xs={12} sm={6} md={3}>
        <Paper elevation={6} sx={{ p: 2, minHeight: '380px', height: '100%', display: 'flex', flexDirection: 'column', borderRadius: '12px', bgcolor: '#f8f9fa', border: '2px solid #0066ff', '&:hover': { boxShadow: '0 12px 30px rgba(0, 102, 255, 0.25)', transform: 'translateY(-4px)' }, transition: 'all 0.3s' }}>
          <Typography variant="h6" fontWeight="bold" gutterBottom sx={{ fontSize: '15px', mb: 1.5, color: '#0066ff' }}>🎨 Đồ Họa & Thiết Kế</Typography>
          <Box sx={{ flexGrow: 1, display: 'flex', alignItems: 'center', justifyContent: 'center', cursor: 'pointer', mb: 1.5, '&:hover img': { transform: 'scale(1.05)', transition: '0.2s' } }}>
            <img src="https://m.media-amazon.com/images/I/71CjNNE-UQL._AC_SX679_.jpg" alt="Design Laptop" style={{ maxWidth: '100%', maxHeight: '180px', objectFit: 'contain' }} />
          </Box>
          <MuiLink component={Link} to="/?search=do+hoa" onClick={scrollToProducts} sx={{ mt: 'auto', fontSize: '13px', textDecoration: 'none', color: '#0066ff', fontWeight: '600', '&:hover': { color: '#ff5722', textDecoration: 'underline' } }}>
            Xem thêm →
          </MuiLink>
        </Paper>
      </Grid>

      {/* Khung 4: Phụ kiện Laptop */}
      <Grid item xs={12} sm={6} md={3}>
        <Paper elevation={6} sx={{ p: 2, minHeight: '380px', height: '100%', display: 'flex', flexDirection: 'column', borderRadius: '12px', bgcolor: '#f8f9fa', border: '2px solid #0066ff', '&:hover': { boxShadow: '0 12px 30px rgba(0, 102, 255, 0.25)', transform: 'translateY(-4px)' }, transition: 'all 0.3s' }}>
          <Typography variant="h6" fontWeight="bold" gutterBottom sx={{ fontSize: '15px', mb: 1.5, color: '#0066ff' }}>🔌 Phụ Kiện</Typography>
          <Box sx={{ flexGrow: 1, display: 'flex', alignItems: 'center', justifyContent: 'center', cursor: 'pointer', mb: 1.5, '&:hover img': { transform: 'scale(1.05)', transition: '0.2s' } }}>
            <img src="https://m.media-amazon.com/images/I/71p+6I0Gz1L._AC_SX679_.jpg" alt="Accessory" style={{ maxWidth: '100%', maxHeight: '180px', objectFit: 'contain' }} />
          </Box>
          <MuiLink component={Link} to="/?search=phu+kien" onClick={scrollToProducts} sx={{ mt: 'auto', fontSize: '13px', textDecoration: 'none', color: '#0066ff', fontWeight: '600', '&:hover': { color: '#ff5722', textDecoration: 'underline' } }}>
            Xem thêm →
          </MuiLink>
        </Paper>
      </Grid>

    </Grid>
  );
}