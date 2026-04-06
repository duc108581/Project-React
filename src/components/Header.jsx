import React from 'react';
import { AppBar, Toolbar, Typography, InputBase, Badge, Box, Button, Container } from '@mui/material';
import { Search as SearchIcon, ShoppingCart, Person as UserIcon } from '@mui/icons-material';
import { Link } from 'react-router-dom';

export default function Header({ cartCount, setSearchTerm }) {
  return (
    <AppBar position="sticky" sx={{ bgcolor: '#0066ff', color: '#ffffff', boxShadow: 'none' }}>
      
      {/* --- Thanh trên cùng: Logo, Tìm kiếm, Giỏ hàng --- */}
      <Container maxWidth="xl">
        <Toolbar sx={{ display: 'flex', justifyContent: 'space-between', gap: 2, py: 1, px: '0 !important' }}>
          
          {/* Logo */}
          <Typography variant="h5" component={Link} to="/" sx={{ textDecoration: 'none', color: '#ffffff', fontWeight: 'bold', minWidth: '130px' }}>
            Smoker<span style={{ color: '#ffd814' }}>IT</span>
          </Typography>

          {/* Ô Tìm Kiếm */}
          <Box sx={{ display: 'flex', flexGrow: 1, maxWidth: '800px', bgcolor: '#ffffff', borderRadius: '6px', overflow: 'hidden' }}>
            <InputBase 
              placeholder="Tìm kiếm laptop, phụ kiện..." 
              sx={{ px: 2, py: 1, flexGrow: 1, color: '#1a202c', fontSize: '15px' }}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
            <Button variant="contained" sx={{ bgcolor: '#febd69', color: '#111', borderRadius: 0, px: 4, minWidth: 'auto', boxShadow: 'none', '&:hover': { bgcolor: '#f3a847', boxShadow: 'none' } }}>
              <SearchIcon />
            </Button>
          </Box>

          {/* Nút Đăng nhập & Giỏ hàng */}
          <Box sx={{ display: 'flex', alignItems: 'center', gap: 3 }}>
            <Box component={Link} to="/login" sx={{ display: 'flex', alignItems: 'center', gap: 0.5, textDecoration: 'none', color: '#ffffff', '&:hover': { color: '#ffd814' } }}>
              <UserIcon sx={{ fontSize: 28 }} />
              <Box sx={{ display: { xs: 'none', sm: 'block' } }}>
                <Typography variant="caption" display="block" sx={{ lineHeight: 1 }}>Xin chào</Typography>
                <Typography variant="body2" fontWeight="bold">Đăng nhập</Typography>
              </Box>
            </Box>

            <Box component={Link} to="/cart" sx={{ display: 'flex', alignItems: 'end', gap: 0.5, textDecoration: 'none', color: '#ffffff', '&:hover': { color: '#ffd814' } }}>
              <Badge badgeContent={cartCount} color="error" sx={{ '& .MuiBadge-badge': { fontWeight: 'bold' } }}>
                <ShoppingCart sx={{ fontSize: 30 }} />
              </Badge>
              <Typography variant="body2" fontWeight="bold" sx={{ display: { xs: 'none', sm: 'block' }, mb: 0.3 }}>Giỏ hàng</Typography>
            </Box>
          </Box>
        </Toolbar>
      </Container>

      {/* --- Thanh Navigation bên dưới --- */}
      <Box sx={{ bgcolor: '#232f3e', color: '#ffffff' }}>
        <Container maxWidth="xl" sx={{ py: 1.5, display: 'flex', gap: 4, overflowX: 'auto' }}>
          {["Tất cả", "MacBook", "Laptop Gaming", "Laptop Văn Phòng", "Phụ Kiện"].map((cat) => (
            <Typography 
              key={cat} 
              variant="body2" 
              onClick={() => {
                if (cat === "Tất cả") setSearchTerm("");
                else if (cat === "Laptop Văn Phòng") setSearchTerm("Văn phòng");
                else if (cat === "Laptop Gaming") setSearchTerm("Gaming");
                else setSearchTerm(cat);
              }}
              sx={{ 
                cursor: 'pointer', 
                fontWeight: 500, 
                whiteSpace: 'nowrap', 
                '&:hover': { color: '#ffd814' } 
              }}
            >
              {cat}
            </Typography>
          ))}
        </Container>
      </Box>
    </AppBar>
  );
}