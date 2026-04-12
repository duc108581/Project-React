// src/App.jsx
import React, { useState, useEffect, useRef, useContext } from 'react';
import { BrowserRouter, Routes, Route, Link, useNavigate, useParams, useLocation } from 'react-router-dom';
import { products } from './data/products';
import ProductCard from './components/ProductCard'; 
import './App.css';

// Admin imports
import { AdminProvider } from './context/AdminContext';
import { OrderProvider, OrderContext } from './context/OrderContext';
import ProtectedRoute from './components/ProtectedRoute';
import AdminLogin from './pages/AdminLogin';
import AdminDashboard from './pages/AdminDashboard';
import MyOrders from './pages/MyOrders'; 

// Tích hợp thư viện Material UI
import { 
  AppBar, Toolbar, Typography, InputBase, Badge, IconButton, Box, 
  Drawer, List, ListItem, ListItemText, Divider, Card, CardMedia, 
  CardContent, CardActions, Button, Grid, Rating, Paper, TextField, Container, Stack,
  Fab, Zoom, Dialog, DialogContent, DialogActions, Tabs, Tab, Chip, Menu, MenuItem, Alert
} from '@mui/material';
import { 
  Search, ShoppingCart, Menu as MenuIcon, Add, Remove,
  KeyboardArrowUp, KeyboardArrowLeft, KeyboardArrowRight, ArrowBack,
  DeleteOutline, ShoppingCartCheckout, AccountCircle, Favorite, FavoriteBorder, Edit, Lock
} from '@mui/icons-material';

// TỰ ĐỘNG CUỘN LÊN ĐẦU TRANG KHI CHUYỂN ROUTE
const ScrollToTop = () => {
  const { pathname } = useLocation();
  useEffect(() => { window.scrollTo(0, 0); }, [pathname]);
  return null;
};

// =========================================================
// BONG BÓNG CUỘN LÊN ĐẦU TRANG (CĂN GIỮA)
// =========================================================
const FloatingScrollButton = () => {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const toggleVisibility = () => {
      if (window.scrollY > 300) setIsVisible(true);
      else setIsVisible(false);
    };
    window.addEventListener('scroll', toggleVisibility);
    return () => window.removeEventListener('scroll', toggleVisibility);
  }, []);

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <Zoom in={isVisible}>
      <Fab 
        onClick={scrollToTop}
        sx={{ 
          position: 'fixed', bottom: 30, left: '50%', transform: 'translateX(-50%)',
          zIndex: 9999, bgcolor: '#0066ff', color: 'white',
          boxShadow: '0 4px 16px rgba(0, 102, 255, 0.4)',
          '&:hover': { bgcolor: '#ff5722', transform: 'translateX(-50%) scale(1.1)' },
          transition: 'all 0.3s ease-in-out'
        }}
      >
        <KeyboardArrowUp fontSize="large" />
      </Fab>
    </Zoom>
  );
};

// =========================================================
// COMPONENT DÙNG CHUNG: DANH SÁCH CUỘN NGANG TỰ ĐỘNG
// =========================================================
const ProductScrollSection = ({ id, title, products, addToCart, emptyMessage, onClick }) => {
  const scrollRef = useRef(null);
  const [isHovering, setIsHovering] = useState(false);

  // HIỆU ỨNG TỰ ĐỘNG CUỘN
  useEffect(() => {
    let scrollInterval;
    if (!isHovering && products.length > 0) {
      scrollInterval = setInterval(() => {
        if (scrollRef.current) {
          const { scrollLeft, scrollWidth, clientWidth } = scrollRef.current;
          if (scrollLeft + clientWidth >= scrollWidth - 5) {
            scrollRef.current.scrollTo({ left: 0, behavior: 'smooth' });
          } else {
            scrollRef.current.scrollBy({ left: 300, behavior: 'smooth' });
          }
        }
      }, 3000); 
    }
    return () => clearInterval(scrollInterval);
  }, [isHovering, products.length]);

  const scroll = (direction) => {
    if (scrollRef.current) {
      const scrollAmount = direction === 'left' ? -350 : 350; 
      scrollRef.current.scrollBy({ left: scrollAmount, behavior: 'smooth' });
    }
  };

  return (
    <Box id={id} sx={{ pt: 3, mb: 5 }}>
      <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 3 }}>
        <Typography variant="h5" fontWeight="bold" sx={{ borderBottom: '1px solid #ddd', pb: 1, flex: 1 }}>
          {title}
        </Typography>
        {products.length > 0 && onClick && (
          <Button 
            onClick={onClick}
            variant="text"
            sx={{ 
              textTransform: 'none', 
              color: '#0066ff',
              fontWeight: 'bold',
              ml: 2,
              '&:hover': { color: '#ff5722' }
            }}
          >
            Xem tất cả →
          </Button>
        )}
      </Box>
      
      {products.length > 0 ? (
        <Box 
          sx={{ position: 'relative', width: '100%' }}
          onMouseEnter={() => setIsHovering(true)} 
          onMouseLeave={() => setIsHovering(false)} 
        >
          <IconButton 
            onClick={() => scroll('left')}
            sx={{ 
              position: 'absolute', left: -25, top: '45%', transform: 'translateY(-50%)', 
              zIndex: 10, bgcolor: 'white', border: '1px solid #e0e0e0', boxShadow: '0 2px 8px rgba(0,0,0,0.15)',
              display: { xs: 'none', md: 'flex' },
              '&:hover': { bgcolor: '#0066ff', color: 'white' },
              width: 45, height: 45
            }}
          >
            <KeyboardArrowLeft fontSize="large" />
          </IconButton>

          <Box 
            ref={scrollRef}
            sx={{ 
              display: 'flex', flexWrap: 'nowrap', overflowX: 'auto', gap: 2, pb: 2, px: 1,
              scrollBehavior: 'smooth',
              '&::-webkit-scrollbar': { height: '8px' },
              '&::-webkit-scrollbar-track': { background: '#f1f1f1', borderRadius: '10px' },
              '&::-webkit-scrollbar-thumb': { background: '#c1c1c1', borderRadius: '10px' },
              '&::-webkit-scrollbar-thumb:hover': { background: '#a8a8a8' }
            }}
          >
            {products.map(item => (
              <Box key={item.id} sx={{ minWidth: { xs: '250px', sm: '280px' }, flexShrink: 0 }}>
                <ProductCard item={item} addToCart={addToCart} />
              </Box>
            ))}
          </Box>

          <IconButton 
            onClick={() => scroll('right')}
            sx={{ 
              position: 'absolute', right: -25, top: '45%', transform: 'translateY(-50%)', 
              zIndex: 10, bgcolor: 'white', border: '1px solid #e0e0e0', boxShadow: '0 2px 8px rgba(0,0,0,0.15)',
              display: { xs: 'none', md: 'flex' },
              '&:hover': { bgcolor: '#0066ff', color: 'white' },
              width: 45, height: 45
            }}
          >
            <KeyboardArrowRight fontSize="large" />
          </IconButton>
        </Box>
      ) : (
        <Typography sx={{ py: 3, width: '100%', textAlign: 'center', color: 'text.secondary' }}>
          {emptyMessage}
        </Typography>
      )}
    </Box>
  );
};

// =========================================================
// COMPONENT USER MENU DROPDOWN
// =========================================================
const UserMenuButton = ({ user, onLogout, navigate }) => {
  const [anchorEl, setAnchorEl] = useState(null);

  const handleMenuOpen = (event) => setAnchorEl(event.currentTarget);
  const handleMenuClose = () => setAnchorEl(null);

  const handleProfileClick = () => {
    navigate('/profile');
    handleMenuClose();
  };

  const handleLogout = () => {
    onLogout();
    handleMenuClose();
  };

  return (
    <>
      {user ? (
        <>
          <IconButton
            onClick={handleMenuOpen}
            sx={{
              p: 1,
              borderRadius: '6px',
              color: '#1a202c',
              bgcolor: 'transparent',
              transition: 'all 0.3s',
              '&:hover': { bgcolor: '#e3f2fd', boxShadow: '0 2px 8px rgba(0, 102, 255, 0.15)' },
            }}
          >
            <AccountCircle sx={{ fontSize: '28px' }} />
          </IconButton>
          <Menu
            anchorEl={anchorEl}
            open={Boolean(anchorEl)}
            onClose={handleMenuClose}
            anchorOrigin={{ vertical: 'bottom', horizontal: 'right' }}
            transformOrigin={{ vertical: 'top', horizontal: 'right' }}
          >
            <MenuItem disabled sx={{ fontWeight: 'bold', color: '#0066ff' }}>
              👤 {user.name}
            </MenuItem>
            <Divider />
            <MenuItem onClick={handleProfileClick} sx={{ fontWeight: 500 }}>
              <AccountCircle sx={{ mr: 1.5 }} /> Thông Tin Cá Nhân
            </MenuItem>
            <MenuItem onClick={handleProfileClick} sx={{ fontWeight: 500 }}>
              <Edit sx={{ mr: 1.5 }} /> Chỉnh Sửa Thông Tin
            </MenuItem>
            <MenuItem onClick={handleProfileClick} sx={{ fontWeight: 500 }}>
              📦 Lịch Sử Đơn Hàng
            </MenuItem>
            <MenuItem onClick={handleProfileClick} sx={{ fontWeight: 500 }}>
              <Favorite sx={{ mr: 1.5, color: '#f44336' }} /> Yêu Thích
            </MenuItem>
            <MenuItem onClick={handleProfileClick} sx={{ fontWeight: 500 }}>
              <Lock sx={{ mr: 1.5 }} /> Đổi Mật Khẩu
            </MenuItem>
            <Divider />
            <MenuItem onClick={handleLogout} sx={{ fontWeight: 500, color: '#d32f2f' }}>
              🚪 Đăng Xuất
            </MenuItem>
          </Menu>
        </>
      ) : (
        <Box sx={{ display: 'flex', gap: 1 }}>
          <Button
            size="small"
            variant="outlined"
            onClick={() => navigate('/login')}
            sx={{
              textTransform: 'none',
              fontSize: '12px',
              borderRadius: 2,
              borderColor: '#0066ff',
              color: '#0066ff',
              display: { xs: 'none', sm: 'block' },
              '&:hover': { bgcolor: '#e3f2fd' },
            }}
          >
            Đăng Nhập
          </Button>
          <Button
            size="small"
            variant="contained"
            onClick={() => navigate('/register')}
            sx={{
              textTransform: 'none',
              fontSize: '12px',
              borderRadius: 2,
              bgcolor: '#0066ff',
              display: { xs: 'none', sm: 'block' },
              '&:hover': { bgcolor: '#0052cc' },
            }}
          >
            Đăng Ký
          </Button>
          <IconButton
            onClick={() => navigate('/login')}
            sx={{
              p: 1,
              borderRadius: '6px',
              color: '#1a202c',
              display: { xs: 'block', sm: 'none' },
              '&:hover': { bgcolor: '#e3f2fd' },
            }}
          >
            <AccountCircle sx={{ fontSize: '28px' }} />
          </IconButton>
        </Box>
      )}
    </>
  );
};

// =========================================================
// 1. COMPONENT HEADER
// =========================================================
const Header = ({ cartCount, setSearchTerm, user, onLogout }) => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const navigate = useNavigate();

  const handleCategoryClick = (cat) => {
    if (cat === "Tất cả") {
      setSearchTerm(""); 
    } else if (cat === "Laptop Gaming") {
      setSearchTerm("Gaming"); 
    } else {
      setSearchTerm(cat); 
    }
    navigate('/'); 
  };

  return (
    <>
      <AppBar position="sticky" sx={{ bgcolor: '#ffffff', color: '#1a202c', boxShadow: '0 4px 12px rgba(0,0,0,0.12)', zIndex: 1201 }}>
        <Toolbar>
          <IconButton edge="start" color="inherit" onClick={() => setIsSidebarOpen(true)} sx={{ mr: 1, color: '#1a202c' }}>
            <MenuIcon />
          </IconButton>

          <Typography 
            variant="h5" 
            component={Link} 
            to="/" 
            onClick={() => setSearchTerm("")}    
            sx={{ color: '#1a202c', textDecoration: 'none', fontWeight: 'bold', minWidth: '120px' }}
          >
            Smoker<span style={{ color: '#0066ff' }}>IT</span>
          </Typography>

          <Box sx={{ display: 'flex', bgcolor: '#f8f9fa', borderRadius: '6px', px: 2, mx: 3, flexGrow: 1, height: '40px', alignItems: 'center', border: '2px solid #e2e8f0', '&:focus-within': { borderColor: '#0066ff', boxShadow: '0 0 0 3px rgba(0, 102, 255, 0.1)' } }}>
            <InputBase 
              placeholder="Tìm kiếm hãng (Asus, Dell...), dòng máy..." 
              onChange={(e) => {
                setSearchTerm(e.target.value);
                navigate('/'); 
              }} 
              sx={{ flex: 1, color: '#1a202c', fontSize: '14px' }} 
            />
            <Search sx={{ color: '#0066ff', cursor: 'pointer' }} />
          </Box>

          <Box sx={{ display: 'flex', gap: { xs: 1, md: 3 }, alignItems: 'center' }}>
            {/* Admin Button */}
            <Button 
              variant="outlined" 
              size="small"
              onClick={() => navigate('/admin/login')}
              sx={{ 
                textTransform: 'none', 
                fontSize: '12px', 
                borderRadius: 2,
                borderColor: '#ff5722',
                color: '#ff5722',
                display: { xs: 'none', sm: 'block' },
                '&:hover': { bgcolor: '#fff3e0' }
              }}
            >
              🔐 Admin
            </Button>
            
            {/* User Menu */}
            <UserMenuButton user={user} onLogout={onLogout} navigate={navigate} />

            <IconButton color="inherit" component={Link} to="/cart" sx={{ p: 1, borderRadius: '6px', transition: 'all 0.3s', color: '#1a202c', '&:hover': { bgcolor: '#fff3e0', boxShadow: '0 2px 8px rgba(255, 87, 34, 0.15)' } }}>
              <Badge badgeContent={cartCount} sx={{ '& .MuiBadge-badge': { backgroundColor: '#ff5722', color: '#ffffff', fontWeight: 'bold' } }}>
                <ShoppingCart />
              </Badge>
            </IconButton>
          </Box>
        </Toolbar>

        <Box sx={{ bgcolor: '#e3f2fd', px: 2, py: 1.5, display: 'flex', gap: 4, fontSize: '14px', justifyContent: 'center', borderTop: '2px solid #0066ff', boxShadow: '0 4px 12px rgba(0, 102, 255, 0.15)', overflowX: 'auto', whiteSpace: 'nowrap' }}>
          {["Tất cả", "Laptop Gaming", "MacBook", "Văn Phòng", "Phụ kiện"].map((cat) => (
             <Typography 
                key={cat} 
                variant="body2" 
                onClick={() => handleCategoryClick(cat)}
                sx={{ cursor: 'pointer', color: cat === 'Tất cả' ? '#0066ff' : '#4b5563', fontWeight: cat === 'Tất cả' ? 700 : 500, transition: 'all 0.3s', '&:hover': { color: '#ff5722', fontWeight: 700, transform: 'scale(1.05)' } }}
             >
                {cat}
             </Typography>
          ))}
        </Box>
      </AppBar>

      <Drawer 
        anchor="left" 
        open={isSidebarOpen} 
        onClose={() => setIsSidebarOpen(false)}
        sx={{ zIndex: 9999 }}
      >
        <Box sx={{ width: 300 }} role="presentation">
          <Box sx={{ bgcolor: '#0066ff', color: 'white', p: 3, pl: 4 }}>
            <Typography variant="h6" fontWeight="bold">👤 Xin chào, {user ? user.name : 'Guest'}</Typography>
          </Box>
          <List sx={{ pt: 2 }}>
            <Typography variant="subtitle1" fontWeight="bold" sx={{ pl: 4, mb: 1, color: '#1a202c' }}>
              Tìm theo Hãng
            </Typography>
            {["Apple (MacBook)", "ASUS / ROG", "Dell / Alienware", "Lenovo / Legion"].map((text) => (
              <ListItem 
                button 
                key={text}
                onClick={() => {
                  setSearchTerm(text.split(' ')[0]); 
                  setIsSidebarOpen(false); 
                  navigate('/');
                }}
                sx={{ py: 1.5, pl: 4, '&:hover': { bgcolor: '#e3f2fd' }, color: '#1a202c' }}
              >
                <ListItemText primary={text} primaryTypographyProps={{ fontSize: '15px' }} />
              </ListItem>
            ))}
            <Divider sx={{ my: 2, bgcolor: '#e2e8f0' }} />
            
            {!user ? (
              <ListItem button component={Link} to="/login" onClick={() => setIsSidebarOpen(false)} sx={{ pl: 4, color: '#1a202c' }}>
                <ListItemText primary="Đăng nhập / Đăng ký" primaryTypographyProps={{ fontWeight: 'bold', color: '#0066ff' }} />
              </ListItem>
            ) : (
              <ListItem button onClick={() => { setIsSidebarOpen(false); onLogout(); }} sx={{ pl: 4, color: '#1a202c' }}>
                <ListItemText primary="Đăng xuất" primaryTypographyProps={{ fontWeight: 'bold', color: '#d32f2f' }} />
              </ListItem>
            )}
          </List>
        </Box>
      </Drawer>
    </>
  );
};

// =========================================================
// 2. COMPONENT TRANG CHỦ & DANH MỤC LỚN
// =========================================================

const topCategories = [
  { id: 1, name: "Laptop Gaming", image: "./image/5pro.webp", targetId: "gaming-section" },
  { id: 2, name: "Văn phòng", image: "./image/15.webp", targetId: "office-section" },
  { id: 3, name: "MacBook", image: "./image/m3pro.webp", targetId: "office-section" },
  { id: 4, name: "Chuột", image: "./images/502.webp", targetId: "phukien-section" },
  { id: 5, name: "Bàn phím", image: "./images/Akko 3098B.webp", targetId: "phukien-section" },
  { id: 6, name: "Tai nghe", image: "./images/HyperX Cloud II.jpg", targetId: "phukien-section" },
  { id: 7, name: "Balo Laptop", image: "./images/balo.webp", targetId: "phukien-section" },
  { id: 8, name: "Tản nhiệt", image: "./images/Cooler Master X-Slim.png", targetId: "phukien-section" },
  { id: 9, name: "Cáp/Sạc", image: "./images/UGREEN Type-C 100W.webp", targetId: "phukien-section" },
  { id: 10, name: "Loa", image: "./images/Loa.webp", targetId: "phukien-section" },
  { id: 11, name: "Ghế Gaming", image: "./images/Corsair T3 Rush.webp", targetId: "phukien-section" },
  { id: 12, name: "Ưu đãi MSI", image: "./image/mm14.png", targetId: "msi-section" },
];

const TopCategoryCircles = () => {
  const scrollToSection = (targetId) => {
    const section = document.getElementById(targetId);
    if (section) section.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <Box sx={{ maxWidth: 1536, mx: 'auto', px: { xs: 2, lg: 3 }, mt: { xs: 2, md: -8 }, position: 'relative', zIndex: 2, mb: 4 }}>
      <Paper elevation={3} sx={{ p: { xs: 2, md: 3 }, bgcolor: 'white', borderRadius: 2 }}>
        <Grid container spacing={2} justifyContent="center">
          {topCategories.map(item => (
            <Grid item xs={4} sm={3} md={2} lg={1} key={item.id} textAlign="center">
              <Box 
                onClick={() => scrollToSection(item.targetId)}
                sx={{ 
                  cursor: 'pointer',
                  display: 'flex', 
                  flexDirection: 'column', 
                  alignItems: 'center', 
                  transition: '0.3s',
                  '&:hover': { transform: 'translateY(-5px)' }
                }}
              >
                <Box sx={{ width: {xs: 60, md: 80}, height: {xs: 60, md: 80}, mb: 1, display: 'flex', alignItems: 'center', justifyContent: 'center', borderRadius: '50%', border: '1px solid #eee', overflow: 'hidden', bgcolor: '#f9f9f9' }}>
                   <CardMedia 
                      component="img" 
                      image={item.image} 
                      alt={item.name}
                      sx={{ maxWidth: '70%', maxHeight: '70%', objectFit: 'contain' }} 
                    />
                </Box>
                <Typography variant="body2" fontWeight="bold" sx={{ color: '#333', fontSize: {xs: '12px', md: '13px'}, lineHeight: 1.2 }}>
                  {item.name}
                </Typography>
              </Box>
            </Grid>
          ))}
        </Grid>
      </Paper>
    </Box>
  );
};

const Home = ({ searchTerm, addToCart }) => {
  const [bannerIndex, setBannerIndex] = useState(0);
  const [currentPage, setCurrentPage] = useState(1);
  const [selectedCategory, setSelectedCategory] = useState(null);
  const itemsPerPage = 12;

  const banners = [
    "./banner/banner1.png", 
    "./banner/banner2.png", 
    "./banner/banner3.jpg" 
  ];

  useEffect(() => {
    const timer = setInterval(() => setBannerIndex(p => (p + 1) % banners.length), 5000);
    return () => clearInterval(timer);
  }, [banners.length]);

  // Reset page khi thay đổi search term hoặc category
  useEffect(() => {
    setCurrentPage(1);
  }, [searchTerm, selectedCategory]);

  const filteredSearch = products.filter(p => 
    p.title.toLowerCase().includes(searchTerm.toLowerCase()) || 
    (p.brand && p.brand.toLowerCase().includes(searchTerm.toLowerCase())) ||
    (p.category && p.category.toLowerCase().includes(searchTerm.toLowerCase()))
  );

  const gamingProducts = products.filter(p => p.category === 'Gaming' || p.category === 'Laptop Gaming');
  const officeProducts = products.filter(p => p.category === 'Văn phòng' || p.category === 'Laptop Văn Phòng');
  const accessoryProducts = products.filter(p => p.category === 'Phụ kiện' || p.category === 'Phụ Kiện');
  const msiProducts = products.filter(p => p.brand === 'MSI' || p.title.toLowerCase().includes('msi'));

  // Logic phân trang cho tìm kiếm
  const totalPagesSearch = Math.ceil(filteredSearch.length / itemsPerPage);
  const paginatedSearch = filteredSearch.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );

  // Logic phân trang cho danh mục
  let categoryProducts = [];
  let categoryName = '';
  switch(selectedCategory) {
    case 'gaming': categoryProducts = gamingProducts; categoryName = 'Laptop Gaming'; break;
    case 'office': categoryProducts = officeProducts; categoryName = 'Laptop Văn Phòng'; break;
    case 'accessory': categoryProducts = accessoryProducts; categoryName = 'Phụ Kiện'; break;
    case 'msi': categoryProducts = msiProducts; categoryName = 'Ưu Đãi MSI'; break;
    default: categoryProducts = [];
  }

  const totalPagesCategory = Math.ceil(categoryProducts.length / itemsPerPage);
  const paginatedCategory = categoryProducts.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );

  // Component Pagination
  const PaginationComponent = ({ totalPages, currentPage, setCurrentPage }) => {
    if (totalPages <= 1) return null;
    return (
      <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', gap: 1, mt: 4, mb: 3, flexWrap: 'wrap' }}>
        <Button 
          variant="outlined" 
          disabled={currentPage === 1}
          onClick={() => setCurrentPage(p => p - 1)}
          sx={{ textTransform: 'none' }}
        >
          ← Trang trước
        </Button>
        
        <Box sx={{ display: 'flex', gap: 0.5 }}>
          {Array.from({ length: totalPages }, (_, i) => i + 1).map(page => (
            <Button
              key={page}
              variant={currentPage === page ? 'contained' : 'outlined'}
              onClick={() => setCurrentPage(page)}
              sx={{ 
                minWidth: '40px', 
                textTransform: 'none',
                bgcolor: currentPage === page ? '#0066ff' : 'transparent',
                color: currentPage === page ? 'white' : '#0066ff',
                borderColor: '#0066ff',
                '&:hover': { bgcolor: '#e3f2fd' }
              }}
            >
              {page}
            </Button>
          ))}
        </Box>

        <Button 
          variant="outlined" 
          disabled={currentPage === totalPages}
          onClick={() => setCurrentPage(p => p + 1)}
          sx={{ textTransform: 'none' }}
        >
          Trang sau →
        </Button>
      </Box>
    );
  };

  return (
    <Box sx={{ pb: 8 }}>
      {!searchTerm && !selectedCategory && (
        <>
          <Box sx={{ position: 'relative', width: '100%', height: { xs: '250px', md: '400px' }, overflow: 'hidden', bgcolor: '#000' }}>
            {banners.map((banner, index) => (
              <Box
                key={index}
                sx={{
                  position: 'absolute',
                  top: 0,
                  left: 0,
                  width: '100%',
                  height: '100%',
                  backgroundImage: `url(${banner})`,
                  backgroundSize: 'cover',
                  backgroundPosition: 'center',
                  opacity: index === bannerIndex ? 1 : 0,
                  transition: 'opacity 1s ease-in-out',
                }}
              />
            ))}

            <IconButton
              onClick={() => setBannerIndex(p => (p - 1 + banners.length) % banners.length)}
              sx={{
                position: 'absolute', left: 20, top: '50%', transform: 'translateY(-50%)',
                bgcolor: 'rgba(0,0,0,0.5)', color: '#00d4ff', zIndex: 10,
                '&:hover': { bgcolor: 'rgba(0,0,0,0.7)', color: '#fff' },
              }}
            >
              ❮
            </IconButton>

            <IconButton
              onClick={() => setBannerIndex(p => (p + 1) % banners.length)}
              sx={{
                position: 'absolute', right: 20, top: '50%', transform: 'translateY(-50%)',
                bgcolor: 'rgba(0,0,0,0.5)', color: '#00d4ff', zIndex: 10,
                '&:hover': { bgcolor: 'rgba(0,0,0,0.7)', color: '#fff' },
              }}
            >
              ❯
            </IconButton>
          </Box>
          
          <TopCategoryCircles />
        </>
      )}
      
      <Container maxWidth="xl" sx={{ mt: 5 }}>
        {/* Khi bấm vào danh mục, hiển thị danh sách với phân trang */}
        {selectedCategory ? (
          <>
            <Box sx={{ mb: 3, display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
              <Typography variant="h5" fontWeight="bold" sx={{ borderBottom: '2px solid #0066ff', pb: 1 }}>
                {categoryName}
              </Typography>
              <Button 
                variant="outlined"
                onClick={() => setSelectedCategory(null)}
                sx={{ textTransform: 'none', borderColor: '#0066ff', color: '#0066ff' }}
              >
                ← Quay lại
              </Button>
            </Box>

            {paginatedCategory.length === 0 ? (
              <Typography sx={{ py: 10, textAlign: 'center' }}>Chưa có sản phẩm nào trong danh mục này.</Typography>
            ) : (
              <>
                <Grid container spacing={2}>
                  {paginatedCategory.map(item => (
                    <Grid item xs={12} sm={6} md={4} lg={3} xl={2.4} key={item.id}>
                      <ProductCard item={item} addToCart={addToCart} />
                    </Grid>
                  ))}
                </Grid>
                <PaginationComponent totalPages={totalPagesCategory} currentPage={currentPage} setCurrentPage={setCurrentPage} />
              </>
            )}
          </>
        ) : searchTerm ? (
          /* Khi tìm kiếm, hiển thị kết quả với phân trang */
          <>
            <Typography variant="h5" fontWeight="bold" gutterBottom sx={{ borderBottom: '1px solid #ddd', pb: 1, mb: 3 }}>
              Kết quả cho "{searchTerm}" ({filteredSearch.length} sản phẩm)
            </Typography>
            {filteredSearch.length === 0 ? (
              <Typography sx={{ py: 10, textAlign: 'center' }}>Không tìm thấy sản phẩm nào phù hợp.</Typography>
            ) : (
              <>
                <Grid container spacing={2}>
                  {paginatedSearch.map(item => (
                    <Grid item xs={12} sm={6} md={4} lg={3} xl={2.4} key={item.id}>
                      <ProductCard item={item} addToCart={addToCart} />
                    </Grid>
                  ))}
                </Grid>
                <PaginationComponent totalPages={totalPagesSearch} currentPage={currentPage} setCurrentPage={setCurrentPage} />
              </>
            )}
          </>
        ) : (
          /* Hiển thị danh sách cuộn ngang bình thường */
          <>
            <ProductScrollSection 
              id="gaming-section" 
              title="Laptop Gaming"
              products={gamingProducts} 
              addToCart={addToCart} 
              emptyMessage="Chưa có Laptop Gaming nào."
              onClick={() => setSelectedCategory('gaming')}
            />

            <ProductScrollSection 
              id="office-section" 
              title="Laptop Văn Phòng"
              products={officeProducts} 
              addToCart={addToCart} 
              emptyMessage="Chưa có Laptop Văn phòng nào."
              onClick={() => setSelectedCategory('office')}
            />

            <ProductScrollSection 
              id="phukien-section" 
              title="Sản Phẩm Phụ Kiện"
              products={accessoryProducts} 
              addToCart={addToCart} 
              emptyMessage="Chưa có sản phẩm phụ kiện nào. Hãy thêm vào file products.js (category: 'Phụ kiện')"
              onClick={() => setSelectedCategory('accessory')}
            />

            <ProductScrollSection 
              id="msi-section" 
              title="Ưu đãi MSI"
              products={msiProducts} 
              addToCart={addToCart} 
              emptyMessage="Chưa có sản phẩm MSI nào. Hãy thêm vào file products.js (brand: 'MSI' hoặc tiêu đề có chữ 'MSI')"
              onClick={() => setSelectedCategory('msi')}
            />
          </>
        )}
      </Container>
    </Box>
  );
};

// =========================================================
// TRANG CHI TIẾT SẢN PHẨM (CÓ THÊM AI GỢI Ý BÊN DƯỚI)
// =========================================================
const ProductDetail = ({ addToCart }) => {
  const { id } = useParams();
  const navigate = useNavigate(); 
  const product = products.find(p => p.id === parseInt(id));
  
  if (!product) return <Typography align="center" mt={10}>Sản phẩm không tồn tại!</Typography>;

  // THUẬT TOÁN GỢI Ý CƠ BẢN: Tìm các sản phẩm cùng danh mục, trừ sản phẩm hiện tại
  const similarProducts = products
    .filter(p => p.category === product.category && p.id !== product.id)
    .slice(0, 4);

  const handleImageError = (e) => {
    e.target.src = "https://via.placeholder.com/450x450/3498DB/FFFFFF?text=Loi+Anh";
    e.target.style.backgroundColor = '#f0f0f0';
  };

  return (
    <Container sx={{ py: 5 }}>
      <Button 
        startIcon={<ArrowBack />} 
        onClick={() => navigate(-1)} 
        sx={{ mb: 3, color: '#1a202c', textTransform: 'none', fontWeight: 'bold', '&:hover': { bgcolor: '#f1f1f1' } }}
      >
        Quay lại
      </Button>

      <Grid container spacing={5}>
        <Grid item xs={12} md={5}>
          <Paper variant="outlined" sx={{ p: 3, display: 'flex', justifyContent: 'center', bgcolor: '#f8f9fa' }}>
            <img src={product.image} alt={product.title} style={{ width: '100%', objectFit: 'contain' }} onError={handleImageError} />
          </Paper>
        </Grid>
        <Grid item xs={12} md={7}>
          <Typography variant="h4" fontWeight="bold">{product.title}</Typography>
          <Rating value={product.rating || 5} readOnly sx={{ my: 2 }} />
          <Divider />
          <Typography variant="h3" color="#0066ff" sx={{ my: 2, fontWeight: 'bold' }}>{product.price.toLocaleString()} đ</Typography>
          <Box sx={{ mb: 3 }}>
            <Typography sx={{ mb: 1 }}><strong>Thương hiệu:</strong> {product.brand || 'Đang cập nhật'}</Typography>
            <Typography sx={{ mb: 1 }}><strong>Cấu hình:</strong> {product.specs}</Typography>
          </Box>
          <Typography variant="body2" color="text.secondary" sx={{ mb: 4, whiteSpace: 'pre-line', lineHeight: 1.6 }}>{product.desc}</Typography>

          <Box sx={{ display: 'flex', gap: 2 }}>
            <Button variant="contained" onClick={() => addToCart(product)} sx={{ flex: 1, bgcolor: '#0066ff', color: 'white', py: 1.5, borderRadius: 2, fontWeight: 600, '&:hover': { bgcolor: '#0052cc' } }}>
              🛒 Thêm Vào Giỏ Hàng
            </Button>
            <Button variant="contained" component={Link} to="/cart" sx={{ flex: 1, bgcolor: '#ff5722', color: 'white', py: 1.5, borderRadius: 2, fontWeight: 600, '&:hover': { bgcolor: '#e64a19' } }}>
              💳 Mua Ngay
            </Button>
          </Box>
        </Grid>
      </Grid>

      {/* PHẦN AI GỢI Ý - SẢN PHẨM TƯƠNG TỰ */}
      {similarProducts.length > 0 && (
        <Box sx={{ mt: 8, pt: 4, borderTop: '2px dashed #e2e8f0' }}>
          <Typography variant="h5" fontWeight="bold" mb={3} sx={{ 
            background: 'linear-gradient(90deg, #ff8a00, #e52e71)', 
            WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent' 
          }}>
            ✨ Các sản phẩm tương tự bạn có thể thích
          </Typography>
          <Grid container spacing={2}>
            {similarProducts.map((item) => (
              <Grid item xs={12} sm={6} md={3} key={item.id}>
                <Card sx={{ height: '100%', display: 'flex', flexDirection: 'column', transition: '0.3s', '&:hover': { transform: 'translateY(-5px)', boxShadow: '0 8px 20px rgba(0,0,0,0.1)' } }}>
                  <Link to={`/product/${item.id}`} onClick={() => window.scrollTo(0,0)} style={{ textDecoration: 'none', color: 'inherit' }}>
                    <CardMedia component="img" height="180" image={item.image} alt={item.title} sx={{ objectFit: 'contain', p: 2, bgcolor: '#f8f9fa' }} onError={handleImageError} />
                    <CardContent sx={{ flexGrow: 1 }}>
                      <Typography variant="subtitle2" fontWeight="bold" noWrap>{item.title}</Typography>
                      <Typography color="#0066ff" fontWeight="bold" mt={1}>{item.price.toLocaleString()} đ</Typography>
                    </CardContent>
                  </Link>
                  <CardActions>
                    <Button size="small" fullWidth variant="outlined" onClick={() => addToCart(item)} sx={{ borderColor: '#0066ff', color: '#0066ff' }}>
                      Thêm vào giỏ
                    </Button>
                  </CardActions>
                </Card>
              </Grid>
            ))}
          </Grid>
        </Box>
      )}
    </Container>
  );
};

// =========================================================
// COMPONENT USER PROFILE (THÔNG TIN CÁ NHÂN, LỊCH SỬ, YÊU THÍCH, ĐỔI MK)
// =========================================================
const UserProfile = ({ user, onLogout, navigate }) => {
  const { getCustomerOrders } = useContext(OrderContext);
  const [profileTab, setProfileTab] = useState(0);
  const [favorites, setFavorites] = useState(JSON.parse(localStorage.getItem('favorites') || '[]'));
  const [editData, setEditData] = useState(user);
  const [showPasswordChange, setShowPasswordChange] = useState(false);
  const [passwords, setPasswords] = useState({ old: '', new: '', confirm: '' });
  const customerOrders = user ? getCustomerOrders(user.email) : [];

  // Xóa yêu thích
  const toggleFavorite = (productId) => {
    const updated = favorites.filter(id => id !== productId);
    setFavorites(updated);
    localStorage.setItem('favorites', JSON.stringify(updated));
  };

  // Lưu thông tin
  const handleSaveProfile = () => {
    const updatedUser = { ...user, ...editData };
    localStorage.setItem('user', JSON.stringify(updatedUser));
    alert('✅ Cập nhật thông tin thành công!');
  };

  // Đổi mật khẩu
  const handleChangePassword = () => {
    if (passwords.new !== passwords.confirm) {
      alert('❌ Mật khẩu xác nhận không trùng khớp!');
      return;
    }
    if (passwords.new.length < 6) {
      alert('❌ Mật khẩu phải ít nhất 6 ký tự!');
      return;
    }
    const updatedUser = { ...user, password: passwords.new };
    localStorage.setItem('user', JSON.stringify(updatedUser));
    alert('✅ Đổi mật khẩu thành công!');
    setShowPasswordChange(false);
    setPasswords({ old: '', new: '', confirm: '' });
  };

  // Sản phẩm yêu thích từ product list
  const favoriteProducts = products.filter(p => favorites.includes(p.id));

  if (!user) return null;

  return (
    <Container maxWidth="lg" sx={{ py: 5 }}>
      <Button 
        startIcon={<ArrowBack />} 
        onClick={() => navigate('/')} 
        sx={{ mb: 3, color: '#1a202c', textTransform: 'none', fontWeight: 'bold' }}
      >
        Quay lại
      </Button>

      <Paper elevation={3} sx={{ borderRadius: 2, overflow: 'hidden' }}>
        <Tabs 
          value={profileTab} 
          onChange={(e, val) => setProfileTab(val)}
          sx={{ borderBottom: '2px solid #e0e0e0', bgcolor: '#f5f5f5' }}
        >
          <Tab label="👤 Thông Tin Cá Nhân" sx={{ fontWeight: 'bold', textTransform: 'none', fontSize: '14px' }} />
          <Tab label="✏️ Chỉnh Sửa Thông Tin" sx={{ fontWeight: 'bold', textTransform: 'none', fontSize: '14px' }} />
          <Tab label="📦 Lịch Sử Đơn Hàng" sx={{ fontWeight: 'bold', textTransform: 'none', fontSize: '14px' }} />
          <Tab label="❤️ Sản Phẩm Yêu Thích" sx={{ fontWeight: 'bold', textTransform: 'none', fontSize: '14px' }} />
          <Tab label="🔐 Đổi Mật Khẩu" sx={{ fontWeight: 'bold', textTransform: 'none', fontSize: '14px' }} />
        </Tabs>

        <Box sx={{ p: 3 }}>
          {/* TAB 1: THÔNG TIN CÁ NHÂN */}
          {profileTab === 0 && (
            <Box>
              <Typography variant="h5" fontWeight="bold" sx={{ mb: 3 }}>👤 Thông Tin Cá Nhân</Typography>
              <Grid container spacing={3}>
                <Grid item xs={12} sm={6}>
                  <Paper sx={{ p: 2, bgcolor: '#f9f9f9' }}>
                    <Typography variant="caption" color="textSecondary">Tên:</Typography>
                    <Typography variant="body1" fontWeight="bold">{user.name}</Typography>
                  </Paper>
                </Grid>
                <Grid item xs={12} sm={6}>
                  <Paper sx={{ p: 2, bgcolor: '#f9f9f9' }}>
                    <Typography variant="caption" color="textSecondary">Email:</Typography>
                    <Typography variant="body1" fontWeight="bold">{user.email}</Typography>
                  </Paper>
                </Grid>
                <Grid item xs={12} sm={6}>
                  <Paper sx={{ p: 2, bgcolor: '#f9f9f9' }}>
                    <Typography variant="caption" color="textSecondary">Số Điện Thoại:</Typography>
                    <Typography variant="body1" fontWeight="bold">{user.phone || 'Chưa cập nhật'}</Typography>
                  </Paper>
                </Grid>
                <Grid item xs={12} sm={6}>
                  <Paper sx={{ p: 2, bgcolor: '#f9f9f9' }}>
                    <Typography variant="caption" color="textSecondary">Địa Chỉ:</Typography>
                    <Typography variant="body1" fontWeight="bold">{user.address || 'Chưa cập nhật'}</Typography>
                  </Paper>
                </Grid>
                <Grid item xs={12}>
                  <Alert severity="info">💡 Bấp tab "✏️ Chỉnh Sửa" để cập nhật thông tin của bạn</Alert>
                </Grid>
              </Grid>
            </Box>
          )}

          {/* TAB 2: CHỈNH SỬA THÔNG TIN */}
          {profileTab === 1 && (
            <Box>
              <Typography variant="h5" fontWeight="bold" sx={{ mb: 3 }}>✏️ Chỉnh Sửa Thông Tin</Typography>
              <Grid container spacing={2.5}>
                <Grid item xs={12} sm={6}>
                  <TextField
                    fullWidth
                    label="Tên"
                    value={editData.name}
                    onChange={(e) => setEditData({ ...editData, name: e.target.value })}
                  />
                </Grid>
                <Grid item xs={12} sm={6}>
                  <TextField
                    fullWidth
                    label="Email"
                    type="email"
                    value={editData.email}
                    disabled
                  />
                </Grid>
                <Grid item xs={12} sm={6}>
                  <TextField
                    fullWidth
                    label="Số Điện Thoại"
                    value={editData.phone || ''}
                    onChange={(e) => setEditData({ ...editData, phone: e.target.value })}
                  />
                </Grid>
                <Grid item xs={12} sm={6}>
                  <TextField
                    fullWidth
                    label="Thành Phố"
                    value={editData.city || ''}
                    onChange={(e) => setEditData({ ...editData, city: e.target.value })}
                  />
                </Grid>
                <Grid item xs={12}>
                  <TextField
                    fullWidth
                    label="Địa Chỉ Chi Tiết"
                    multiline
                    rows={2}
                    value={editData.address || ''}
                    onChange={(e) => setEditData({ ...editData, address: e.target.value })}
                  />
                </Grid>
                <Grid item xs={12}>
                  <Button 
                    variant="contained" 
                    fullWidth 
                    onClick={handleSaveProfile}
                    sx={{ bgcolor: '#4caf50', py: 1.5 }}
                  >
                    💾 Lưu Thay Đổi
                  </Button>
                </Grid>
              </Grid>
            </Box>
          )}

          {/* TAB 3: LỊCH SỬ ĐƠN HÀNG */}
          {profileTab === 2 && (
            <Box>
              <Typography variant="h5" fontWeight="bold" sx={{ mb: 3 }}>📦 Lịch Sử Đơn Hàng ({customerOrders.length})</Typography>
              {customerOrders.length === 0 ? (
                <Alert severity="info">Bạn chưa có đơn hàng nào</Alert>
              ) : (
                <Stack spacing={2}>
                  {customerOrders.map((order, idx) => (
                    <Paper key={idx} sx={{ p: 2.5, borderLeft: '4px solid #0066ff' }}>
                      <Grid container spacing={2} alignItems="center">
                        <Grid item xs={12} sm={3}>
                          <Typography variant="caption" color="textSecondary">Mã Đơn</Typography>
                          <Typography variant="body2" fontWeight="bold">#{order.orderNumber}</Typography>
                        </Grid>
                        <Grid item xs={12} sm={3}>
                          <Typography variant="caption" color="textSecondary">Ngày Đặt</Typography>
                          <Typography variant="body2" fontWeight="bold">{order.orderDate}</Typography>
                        </Grid>
                        <Grid item xs={12} sm={3}>
                          <Typography variant="caption" color="textSecondary">Trạng Thái</Typography>
                          <Chip label={order.status} size="small" color="primary" variant="outlined" />
                        </Grid>
                        <Grid item xs={12} sm={3} sx={{ textAlign: { xs: 'left', sm: 'right' } }}>
                          <Typography variant="h6" fontWeight="bold" sx={{ color: '#ff5722' }}>
                            {order.total.toLocaleString()} đ
                          </Typography>
                        </Grid>
                      </Grid>
                    </Paper>
                  ))}
                </Stack>
              )}
            </Box>
          )}

          {/* TAB 4: SẢN PHẨM YÊU THÍCH */}
          {profileTab === 3 && (
            <Box>
              <Typography variant="h5" fontWeight="bold" sx={{ mb: 3 }}>❤️ Sản Phẩm Yêu Thích ({favoriteProducts.length})</Typography>
              {favoriteProducts.length === 0 ? (
                <Alert severity="info">Bạn chưa thêm sản phẩm yêu thích nào</Alert>
              ) : (
                <Grid container spacing={2}>
                  {favoriteProducts.map((product) => (
                    <Grid item xs={12} sm={6} md={4} key={product.id}>
                      <Card sx={{ height: '100%' }}>
                        <CardMedia component="img" height="150" image={product.image} alt={product.title} sx={{ objectFit: 'contain', p: 1, bgcolor: '#f9f9f9' }} />
                        <CardContent>
                          <Typography variant="subtitle2" fontWeight="bold" noWrap>{product.title}</Typography>
                          <Typography color="#0066ff" fontWeight="bold" mt={1}>{product.price.toLocaleString()} đ</Typography>
                        </CardContent>
                        <CardActions sx={{ display: 'flex', gap: 1 }}>
                          <Button size="small" fullWidth variant="outlined" onClick={() => toggleFavorite(product.id)} sx={{ color: '#f44336', borderColor: '#f44336' }}>
                            Xóa
                          </Button>
                          <Button size="small" fullWidth variant="contained" sx={{ bgcolor: '#0066ff' }}>
                            Mua
                          </Button>
                        </CardActions>
                      </Card>
                    </Grid>
                  ))}
                </Grid>
              )}
            </Box>
          )}

          {/* TAB 5: ĐỔI MẬT KHẨU */}
          {profileTab === 4 && (
            <Box>
              <Typography variant="h5" fontWeight="bold" sx={{ mb: 3 }}>🔐 Đổi Mật Khẩu</Typography>
              <Grid container spacing={2} maxWidth="sm">
                <Grid item xs={12}>
                  <TextField
                    fullWidth
                    label="Mật Khẩu Hiện Tại"
                    type="password"
                    value={passwords.old}
                    onChange={(e) => setPasswords({ ...passwords, old: e.target.value })}
                  />
                </Grid>
                <Grid item xs={12}>
                  <TextField
                    fullWidth
                    label="Mật Khẩu Mới"
                    type="password"
                    value={passwords.new}
                    onChange={(e) => setPasswords({ ...passwords, new: e.target.value })}
                  />
                </Grid>
                <Grid item xs={12}>
                  <TextField
                    fullWidth
                    label="Xác Nhận Mật Khẩu"
                    type="password"
                    value={passwords.confirm}
                    onChange={(e) => setPasswords({ ...passwords, confirm: e.target.value })}
                  />
                </Grid>
                <Grid item xs={12}>
                  <Button 
                    variant="contained" 
                    fullWidth 
                    onClick={handleChangePassword}
                    sx={{ bgcolor: '#2196f3', py: 1.5 }}
                  >
                    🔑 Đổi Mật Khẩu
                  </Button>
                </Grid>
              </Grid>
            </Box>
          )}

          {/* Button Logout */}
          <Box sx={{ mt: 4, pt: 2, borderTop: '1px solid #e0e0e0' }}>
            <Button 
              fullWidth 
              variant="contained" 
              color="error"
              onClick={onLogout}
              sx={{ py: 1.5 }}
            >
              🚪 Đăng Xuất
            </Button>
          </Box>
        </Box>
      </Paper>
    </Container>
  );
};

// =========================================================
// COMPONENT GIỎ HÀNG (ĐÃ LÀM MÀU MÈ, NỔI BẬT)
// =========================================================
// =========================================================
// COMPONENT GIỎ HÀNG VỚI 2 TABS: GIỎ HÀNG & CHI TIẾT ĐƠN HÀNG
// =========================================================
const Cart = ({ cart, updateQuantity, removeFromCart, total, user }) => {
  const navigate = useNavigate();
  const { getCustomerOrders } = useContext(OrderContext);
  const [tabValue, setTabValue] = useState(0);
  const [selectedOrder, setSelectedOrder] = useState(null);
  const [detailDialogOpen, setDetailDialogOpen] = useState(false);
  const totalItems = cart.reduce((a, c) => a + c.quantity, 0);
  const customerOrders = user ? getCustomerOrders(user.email) : [];

  const getStatusColor = (status) => {
    const colors = {
      'Chưa xử lý': 'warning',
      'Đã xác nhận': 'info', 
      'Đang giao': 'primary',
      'Đã giao': 'success',
      'Đã hủy': 'error'
    };
    return colors[status] || 'default';
  };

  // TAB 1: GIỎ HÀNG
  const renderShoppingCart = () => {
    if (cart.length === 0) {
      return (
        <Paper sx={{ p: 5, textAlign: 'center', bgcolor: '#f9f9f9' }}>
          <Typography variant="h5" fontWeight="bold" sx={{ color: '#ff5722', mb: 2 }}>
            Giỏ hàng của bạn đang trống 🥺
          </Typography>
          <Typography variant="body1" color="text.secondary" mb={3}>
            Hãy chọn cho mình những chiếc Laptop ưng ý nhất tại SmokerIT nhé!
          </Typography>
          <Button 
            variant="contained" 
            component={Link} 
            to="/" 
            sx={{ 
              background: 'linear-gradient(45deg, #FF512F 0%, #F09819 100%)', 
              color: 'white',
              fontWeight: 'bold',
              px: 4, py: 1.5,
              borderRadius: 8
            }}
          >
            Trở về mua sắm
          </Button>
        </Paper>
      );
    }

    return (
      <Grid container spacing={4}>
        {/* CỘT TRÁI: DANH SÁCH SẢN PHẨM */}
        <Grid item xs={12} md={8}>
          <Paper elevation={3} sx={{ p: 3, borderRadius: 3, borderTop: '5px solid #1CB5E0' }}>
            <Typography variant="body2" textAlign="right" color="text.secondary">Giá tiền</Typography>
            <Divider sx={{ my: 2 }} />

            {cart.map((item) => (
              <Box key={item.id}>
                <Grid container spacing={2} sx={{ mb: 3, alignItems: 'center' }}>
                  <Grid item xs={4} sm={3} md={2}>
                    <CardMedia component="img" image={item.image} alt={item.title} sx={{ width: '100%', objectFit: 'contain', maxHeight: 100, p: 1, border: '1px solid #eee', borderRadius: 2 }} />
                  </Grid>

                  <Grid item xs={8} sm={9} md={10}>
                    <Box sx={{ display: 'flex', justifyContent: 'space-between', flexWrap: 'wrap', gap: 2 }}>
                      <Box sx={{ flex: 1, minWidth: '200px' }}>
                        <Typography variant="h6" sx={{ fontSize: { xs: '1rem', md: '1.1rem' }, fontWeight: 600 }}>
                          <Link to={`/product/${item.id}`} style={{ textDecoration: 'none', color: '#333' }}>{item.title}</Link>
                        </Typography>
                        <Typography variant="caption" color="green" display="block" mt={0.5}>✓ Giao hàng hỏa tốc</Typography>
                      </Box>
                      
                      <Typography variant="h6" fontWeight="bold" sx={{ color: '#e91e63' }}>
                        {(item.price * item.quantity).toLocaleString()} đ
                      </Typography>
                    </Box>
                    
                    <Stack direction="row" spacing={2} alignItems="center" sx={{ mt: 2 }}>
                      <Box sx={{ display: 'flex', alignItems: 'center', border: '1px solid #ddd', borderRadius: 5, overflow: 'hidden' }}>
                        <IconButton size="small" onClick={() => updateQuantity(item.id, -1)} disabled={item.quantity <= 1} sx={{ color: '#ff9800' }}>
                          <Remove fontSize="small" />
                        </IconButton>
                        <Typography sx={{ px: 2, fontWeight: 'bold' }}>{item.quantity}</Typography>
                        <IconButton size="small" onClick={() => updateQuantity(item.id, 1)} sx={{ color: '#4caf50' }}>
                          <Add fontSize="small" />
                        </IconButton>
                      </Box>
                      <Divider orientation="vertical" flexItem />
                      <Button startIcon={<DeleteOutline />} size="small" onClick={() => removeFromCart(item.id)} sx={{ color: '#d32f2f', textTransform: 'none', '&:hover': { bgcolor: '#ffebee' } }}>
                        Xóa
                      </Button>
                    </Stack>
                  </Grid>
                </Grid>
                <Divider sx={{ mb: 3 }} />
              </Box>
            ))}
          </Paper>
        </Grid>

        {/* CỘT PHẢI: THANH TOÁN */}
        <Grid item xs={12} md={4}>
          <Paper elevation={4} sx={{ p: 3, borderRadius: 4, bgcolor: '#f4faff', border: '2px dashed #64b5f6', position: 'sticky', top: 100 }}>
            <Typography variant="body1" sx={{ display: 'flex', alignItems: 'center', p: 1, bgcolor: '#e8f5e9', borderRadius: 2, gap: 1, color: '#2e7d32', mb: 2, fontWeight: 'bold' }}>
               🎉 Đủ điều kiện Freeship
            </Typography>
            
            <Typography variant="h6" mb={2} color="text.secondary">
              Tổng ({totalItems} món): <br/>
              <strong style={{ color: '#e91e63', fontSize: '1.5rem' }}>{total.toLocaleString()} đ</strong>
            </Typography>

            <Button 
              fullWidth variant="contained" startIcon={<ShoppingCartCheckout />} onClick={() => navigate('/checkout')}
              sx={{ 
                background: 'linear-gradient(45deg, #00C9FF 0%, #92FE9D 100%)', color: '#004d40', 
                borderRadius: 8, py: 1.5, textTransform: 'uppercase', fontWeight: '900',
                boxShadow: '0 4px 15px rgba(0, 201, 255, 0.4)', '&:hover': { background: 'linear-gradient(45deg, #92FE9D 0%, #00C9FF 100%)' }
              }}
            >
              Thanh toán
            </Button>
          </Paper>
        </Grid>
      </Grid>
    );
  };

  // TAB 2: CHI TIẾT ĐƠN HÀNG
  const renderOrderDetails = () => {
    if (!user) {
      return (
        <Paper sx={{ p: 4, textAlign: 'center', bgcolor: '#fff3cd' }}>
          <Typography variant="h6" sx={{ color: '#ff6d00', mb: 2 }}>
            ⚠️ Vui lòng đăng nhập để xem lịch sử đơn hàng
          </Typography>
        </Paper>
      );
    }

    if (customerOrders.length === 0) {
      return (
        <Paper sx={{ p: 4, textAlign: 'center', bgcolor: '#f9f9f9' }}>
          <Typography variant="h6" sx={{ color: '#999', mb: 2 }}>
            📦 Bạn chưa có đơn hàng nào
          </Typography>
          <Typography variant="body2" color="textSecondary">
            Hãy tiến hành thanh toán để xem lịch sử đơn hàng
          </Typography>
        </Paper>
      );
    }

    return (
      <Grid container spacing={2}>
        {customerOrders.map((order, idx) => (
          <Grid item xs={12} key={idx}>
            <Paper
              elevation={2}
              sx={{
                p: 2.5,
                borderLeft: '4px solid #0066ff',
                '&:hover': { boxShadow: 4 },
                cursor: 'pointer',
                transition: 'all 0.3s'
              }}
              onClick={() => { setSelectedOrder(order); setDetailDialogOpen(true); }}
            >
              <Grid container spacing={2} alignItems="center">
                <Grid item xs={12} sm={3}>
                  <Typography variant="caption" color="textSecondary">Mã Đơn Hàng</Typography>
                  <Typography variant="body2" fontWeight="bold">#{order.orderNumber}</Typography>
                </Grid>
                <Grid item xs={12} sm={3}>
                  <Typography variant="caption" color="textSecondary">Ngày Đặt</Typography>
                  <Typography variant="body2" fontWeight="bold">{order.orderDate}</Typography>
                </Grid>
                <Grid item xs={12} sm={3}>
                  <Typography variant="caption" color="textSecondary">Thời Gian Giao</Typography>
                  <Typography variant="body2" fontWeight="bold" sx={{ color: '#e91e63' }}>
                    {order.deliveryTime}
                  </Typography>
                </Grid>
                <Grid item xs={12} sm={3} sx={{ textAlign: { xs: 'left', sm: 'right' } }}>
                  <Chip
                    label={order.status || 'Chưa xử lý'}
                    size="small"
                    color={getStatusColor(order.status || 'Chưa xử lý')}
                    variant="outlined"
                  />
                </Grid>
                <Grid item xs={12}>
                  <Divider />
                </Grid>
                <Grid item xs={12} sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                  <Box>
                    <Typography variant="caption" color="textSecondary">📅 Dự kiến giao:</Typography>
                    <Typography variant="body2" fontWeight="bold">{order.estimatedDelivery || 'Chưa xác định'}</Typography>
                  </Box>
                  <Typography variant="h6" fontWeight="bold" sx={{ color: '#ff5722' }}>
                    {order.total.toLocaleString()} đ
                  </Typography>
                  <Button size="small" variant="contained" onClick={(e) => { e.stopPropagation(); setSelectedOrder(order); setDetailDialogOpen(true); }}>
                    Chi Tiết
                  </Button>
                </Grid>
              </Grid>
            </Paper>
          </Grid>
        ))}
      </Grid>
    );
  };

  return (
    <Container maxWidth="lg" sx={{ py: 5 }}>
      {/* TABS */}
      <Paper elevation={3} sx={{ borderRadius: 2, overflow: 'hidden', mb: 3 }}>
        <Tabs 
          value={tabValue} 
          onChange={(e, val) => setTabValue(val)}
          sx={{ borderBottom: '2px solid #e0e0e0', bgcolor: '#f5f5f5' }}
        >
          <Tab label={`🛒 Giỏ Hàng (${cart.length})`} sx={{ fontWeight: 'bold', textTransform: 'none', fontSize: '15px', '&.Mui-selected': { color: '#0066ff' } }} />
          <Tab label={`📦 Chi Tiết Đơn Hàng (${customerOrders.length})`} sx={{ fontWeight: 'bold', textTransform: 'none', fontSize: '15px', '&.Mui-selected': { color: '#e91e63' } }} />
        </Tabs>
      </Paper>

      {/* TAB CONTENT */}
      {tabValue === 0 ? renderShoppingCart() : renderOrderDetails()}

      {/* DETAIL DIALOG */}
      <Dialog open={detailDialogOpen} onClose={() => setDetailDialogOpen(false)} maxWidth="sm" fullWidth>
        <DialogContent sx={{ pt: 3 }}>
          {selectedOrder && (
            <Box>
              <Typography variant="h6" fontWeight="bold" sx={{ mb: 2 }}>📋 Đơn Hàng #{selectedOrder.orderNumber}</Typography>
              <Divider sx={{ my: 2 }} />

              <Typography variant="subtitle2" fontWeight="bold" sx={{ mb: 1 }}>👤 Thông Tin Khách Hàng</Typography>
              <Stack spacing={0.5} sx={{ mb: 2, pl: 2 }}>
                <Typography variant="caption"><strong>Tên:</strong> {selectedOrder.name}</Typography>
                <Typography variant="caption"><strong>Email:</strong> {selectedOrder.email}</Typography>
                <Typography variant="caption"><strong>SĐT:</strong> {selectedOrder.phone}</Typography>
              </Stack>

              <Divider sx={{ my: 2 }} />

              <Typography variant="subtitle2" fontWeight="bold" sx={{ mb: 1 }}>📍 Địa Chỉ Giao Hàng</Typography>
              <Stack spacing={0.5} sx={{ mb: 2, pl: 2 }}>
                <Typography variant="caption">{selectedOrder.address}</Typography>
                <Typography variant="caption">{selectedOrder.city}</Typography>
              </Stack>

              <Divider sx={{ my: 2 }} />

              <Typography variant="subtitle2" fontWeight="bold" sx={{ mb: 1 }}>🛍️ Sản Phẩm</Typography>
              <Stack spacing={0.8} sx={{ mb: 2, pl: 2 }}>
                {selectedOrder.items && selectedOrder.items.map((item, i) => (
                  <Typography key={i} variant="caption">
                    {item.title} <strong>x{item.quantity}</strong> = {(item.price * item.quantity).toLocaleString()}₫
                  </Typography>
                ))}
              </Stack>

              <Divider sx={{ my: 2 }} />

              <Box sx={{ display: 'flex', justifyContent: 'space-between', bgcolor: '#f5f5f5', p: 1.5, borderRadius: 1 }}>
                <Typography variant="body2" fontWeight="bold">Tổng Cộng:</Typography>
                <Typography variant="h6" fontWeight="bold" sx={{ color: '#ff5722' }}>
                  {selectedOrder.total.toLocaleString()} đ
                </Typography>
              </Box>
            </Box>
          )}
        </DialogContent>
        <DialogActions sx={{ p: 2 }}>
          <Button onClick={() => setDetailDialogOpen(false)} variant="contained">Đóng</Button>
        </DialogActions>
      </Dialog>
    </Container>
  );
};

// =========================================================
// TRANG THANH TOÁN (CẬP NHẬT TÍNH NĂNG QR & TẢI ẢNH)
// =========================================================
const Checkout = ({ total, clearCart, user, navigate, cart }) => {
  const checkoutNavigate = useNavigate();
  const { createOrder } = useContext(OrderContext);
  const [paymentMethod, setPaymentMethod] = useState('cash'); 
  const [receiptFile, setReceiptFile] = useState(null);
  const [formData, setFormData] = useState({ name: '', address: '', phone: '', email: '' });
  const [errors, setErrors] = useState({ name: '', address: '', phone: '', file: '', email: '' });
  const [openSuccess, setOpenSuccess] = useState(false);
  const [openLoginDialog, setOpenLoginDialog] = useState(false);

  const handleFileChange = (e) => {
    if (e.target.files && e.target.files[0]) {
      setReceiptFile(e.target.files[0]);
      setErrors(prev => ({ ...prev, file: '' }));
    }
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
    setErrors(prev => ({ ...prev, [name]: '' }));
  };

  const validateForm = () => {
    const newErrors = {};

    if (!formData.name.trim()) {
      newErrors.name = 'Vui lòng nhập họ tên';
    }
    if (!formData.address.trim()) {
      newErrors.address = 'Vui lòng nhập địa chỉ';
    }
    if (!formData.phone.trim()) {
      newErrors.phone = 'Vui lòng nhập số điện thoại';
    } else if (!/^\d{10}$/.test(formData.phone.replace(/\D/g, ''))) {
      newErrors.phone = 'Số điện thoại không hợp lệ (10 chữ số)';
    }

    if (paymentMethod === 'transfer' && !receiptFile) {
      newErrors.file = 'Vui lòng tải lên hình ảnh biên lai chuyển khoản';
    }

    return newErrors;
  };

  const handle = (e) => { 
    e.preventDefault(); 
    
    // Kiểm tra xem user có đăng nhập không
    if (!user) {
      setOpenLoginDialog(true);
      return;
    }
    
    const newErrors = validateForm();
    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      return;
    }

    setOpenSuccess(true);
  };

  const handleCloseSuccess = () => {
    setOpenSuccess(false);
    // Lưu đơn hàng vào OrderContext
    if (createOrder && cart.length > 0) {
      createOrder(cart, {
        name: formData.name,
        email: user?.email || formData.email || 'unknown@email.com',
        phone: formData.phone,
        address: formData.address
      });
    }
    clearCart();
    checkoutNavigate('/');
  };

  return (
    <Container sx={{ py: 10, maxWidth: '600px' }}>
      <Paper sx={{ p: 4, borderRadius: 2, boxShadow: '0 4px 20px rgba(0,0,0,0.08)' }}>
        <Typography variant="h5" mb={3} fontWeight="bold" textAlign="center">
          Thông tin đặt hàng
        </Typography>
        
        <form onSubmit={handle}>
          <TextField 
            fullWidth 
            label="Họ tên *" 
            name="name"
            value={formData.name}
            onChange={handleInputChange}
            error={!!errors.name}
            helperText={errors.name}
            sx={{ mb: 2 }} 
          />
          <TextField 
            fullWidth 
            label="Địa chỉ *" 
            name="address"
            value={formData.address}
            onChange={handleInputChange}
            error={!!errors.address}
            helperText={errors.address}
            sx={{ mb: 2 }} 
          />
          <TextField 
            fullWidth 
            label="Số điện thoại *" 
            name="phone"
            value={formData.phone}
            onChange={handleInputChange}
            error={!!errors.phone}
            helperText={errors.phone}
            sx={{ mb: 3 }} 
          />
          
          <Typography variant="subtitle1" fontWeight="bold" sx={{ mb: 1, color: '#1a202c' }}>
            Phương thức thanh toán
          </Typography>
          
          <Box sx={{ display: 'flex', gap: 2, mb: 3, flexDirection: { xs: 'column', sm: 'row' } }}>
            <Button 
              variant={paymentMethod === 'cash' ? 'contained' : 'outlined'} 
              onClick={() => setPaymentMethod('cash')}
              sx={{ 
                flex: 1, 
                textTransform: 'none', 
                fontWeight: 600,
                bgcolor: paymentMethod === 'cash' ? '#0066ff' : 'transparent',
                borderColor: '#0066ff',
                color: paymentMethod === 'cash' ? 'white' : '#0066ff',
                '&:hover': { bgcolor: paymentMethod === 'cash' ? '#0052cc' : '#e6f0ff' }
              }}
            >
              💵 Tiền mặt (COD)
            </Button>
            <Button 
              variant={paymentMethod === 'transfer' ? 'contained' : 'outlined'} 
              onClick={() => setPaymentMethod('transfer')}
              sx={{ 
                flex: 1, 
                textTransform: 'none', 
                fontWeight: 600,
                bgcolor: paymentMethod === 'transfer' ? '#0066ff' : 'transparent',
                borderColor: '#0066ff',
                color: paymentMethod === 'transfer' ? 'white' : '#0066ff',
                '&:hover': { bgcolor: paymentMethod === 'transfer' ? '#0052cc' : '#e6f0ff' }
              }}
            >
              💳 Chuyển khoản QR
            </Button>
          </Box>

          {paymentMethod === 'transfer' && (
            <Box sx={{ 
              p: 3, 
              mb: 3, 
              border: '2px dashed #0066ff', 
              borderRadius: 2, 
              textAlign: 'center', 
              bgcolor: '#f8faff' 
            }}>
              <Typography variant="body2" sx={{ mb: 2, color: '#333', fontWeight: 500 }}>
                Quét mã QR bên dưới để thanh toán.<br/>
                Cú pháp chuyển khoản: <strong>Tên + SĐT mua hàng</strong>
              </Typography>
              
              <img 
                src="./images/Qr.png" 
                alt="QR Thanh Toán" 
                style={{ width: '220px', height: '220px', objectFit: 'contain', borderRadius: '8px', boxShadow: '0 2px 10px rgba(0,0,0,0.1)', marginBottom: '16px' }} 
              />
              
              <Divider sx={{ my: 2 }} />

              <Typography variant="body2" fontWeight="bold" sx={{ mb: 1 }}>
                Tải lên hình ảnh biên lai chuyển khoản *
              </Typography>
              <Button
                variant="outlined"
                component="label"
                sx={{ textTransform: 'none' }}
              >
                Chọn tệp ảnh
                <input
                  type="file"
                  hidden
                  accept="image/*"
                  onChange={handleFileChange}
                />
              </Button>

              {receiptFile && (
                <Typography variant="body2" sx={{ mt: 1, fontWeight: 500, color: '#2e7d32' }}>
                  ✅ Đã chọn: {receiptFile.name}
                </Typography>
              )}
              {errors.file && (
                <Typography variant="body2" sx={{ mt: 1, fontWeight: 500, color: '#d32f2f' }}>
                  ❌ {errors.file}
                </Typography>
              )}
            </Box>
          )}

          <Divider sx={{ my: 2 }} />

          <Typography variant="h6" textAlign="right" my={2} fontWeight="bold">
            Tổng cần thanh toán: <span style={{ color: '#B12704' }}>{total.toLocaleString()} đ</span>
          </Typography>
          
          <Button type="submit" fullWidth variant="contained" size="large" sx={{ bgcolor: '#0066ff', color: 'white', fontWeight: 'bold', py: 1.5, fontSize: '16px', '&:hover': { bgcolor: '#0052cc' } }}>
            Xác nhận đặt hàng
          </Button>
        </form>
      </Paper>

      {/* Dialog Thành Công */}
      <Dialog 
        open={openSuccess} 
        onClose={handleCloseSuccess}
        PaperProps={{
          sx: {
            borderRadius: 3,
            boxShadow: '0 8px 32px rgba(0, 102, 255, 0.3)'
          }
        }}
      >
        <DialogContent sx={{ textAlign: 'center', py: 4, px: 5 }}>
          <Box sx={{ mb: 2, fontSize: '64px' }}>✅</Box>
          <Typography variant="h5" fontWeight="bold" sx={{ mb: 2 }}>
            Đặt hàng thành công!
          </Typography>
          <Typography variant="body1" color="text.secondary" sx={{ mb: 3 }}>
            Cảm ơn bạn đã đặt hàng tại SmokerIT. Chúng tôi sẽ liên hệ với bạn sớm nhất.
          </Typography>
          <Typography variant="body2" sx={{ color: '#0066ff', fontWeight: 'bold', mb: 2 }}>
            Tổng tiền: {total.toLocaleString()} đ
          </Typography>
        </DialogContent>
        <DialogActions sx={{ justifyContent: 'center', pb: 2 }}>
          <Button 
            onClick={handleCloseSuccess} 
            variant="contained" 
            sx={{ 
              bgcolor: '#0066ff', 
              color: 'white', 
              fontWeight: 'bold',
              px: 4,
              '&:hover': { bgcolor: '#0052cc' }
            }}
          >
            Quay lại trang chủ
          </Button>
        </DialogActions>
      </Dialog>

      {/* Dialog Yêu Cầu Đăng Nhập */}
      <Dialog 
        open={openLoginDialog} 
        onClose={() => setOpenLoginDialog(false)}
        PaperProps={{
          sx: {
            borderRadius: 3,
            boxShadow: '0 8px 32px rgba(0, 102, 255, 0.3)'
          }
        }}
      >
        <DialogContent sx={{ textAlign: 'center', py: 4, px: 5 }}>
          <Box sx={{ mb: 2, fontSize: '64px' }}>🔐</Box>
          <Typography variant="h5" fontWeight="bold" sx={{ mb: 2 }}>
            Vui lòng đăng nhập
          </Typography>
          <Typography variant="body1" color="text.secondary" sx={{ mb: 3 }}>
            Bạn cần đăng nhập để có thể thanh toán đơn hàng. Hãy đăng nhập hoặc tạo tài khoản mới!
          </Typography>
        </DialogContent>
        <DialogActions sx={{ justifyContent: 'center', gap: 1, pb: 2 }}>
          <Button 
            onClick={() => {
              setOpenLoginDialog(false);
              checkoutNavigate('/login');
            }} 
            variant="contained" 
            sx={{ 
              bgcolor: '#0066ff', 
              color: 'white', 
              fontWeight: 'bold',
              '&:hover': { bgcolor: '#0052cc' }
            }}
          >
            Đi đến đăng nhập
          </Button>
          <Button 
            onClick={() => {
              setOpenLoginDialog(false);
              checkoutNavigate('/register');
            }} 
            variant="outlined" 
            sx={{ 
              borderColor: '#0066ff',
              color: '#0066ff', 
              fontWeight: 'bold',
              '&:hover': { bgcolor: '#f0f7ff' }
            }}
          >
            Tạo tài khoản
          </Button>
          <Button 
            onClick={() => setOpenLoginDialog(false)} 
            sx={{ 
              color: '#666',
              '&:hover': { bgcolor: '#f5f5f5' }
            }}
          >
            Đóng
          </Button>
        </DialogActions>
      </Dialog>
    </Container>
  );
};

// =========================================================
// 3. CHỨC NĂNG ĐĂNG NHẬP / ĐĂNG KÝ
// =========================================================

const Login = ({ onLogin }) => {
  const navigate = useNavigate();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [errors, setErrors] = useState({});
  const [loading, setLoading] = useState(false);

  const validateEmail = (value) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    const phoneRegex = /^0\d{9}$/;
    return emailRegex.test(value) || phoneRegex.test(value);
  };

  const handleChange = (field, value) => {
    if (field === 'email') setEmail(value);
    if (field === 'password') setPassword(value);
    if (errors[field]) {
      setErrors({ ...errors, [field]: '' });
    }
  };

  const handleLogin = (e) => {
    e.preventDefault(); 
    const newErrors = {};

    if (!email) {
      newErrors.email = 'Vui lòng nhập Email hoặc Số điện thoại';
    } else if (!validateEmail(email)) {
      newErrors.email = 'Email hoặc Số điện thoại không hợp lệ (nhập sdt: 0xxxxxxxxx)';
    }

    if (!password) {
      newErrors.password = 'Vui lòng nhập Mật khẩu';
    } else if (password.length < 6) {
      newErrors.password = 'Mật khẩu phải có ít nhất 6 ký tự';
    }

    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      return;
    }

    setLoading(true);
    setTimeout(() => {
      const username = email.includes('@') ? email.split('@')[0] : email;
      onLogin({ name: username, email: email });
      navigate('/'); 
    }, 800);
  };

  return (
    <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center', py: 5, bgcolor: '#f5f5f5', minHeight: '100vh' }}>
      <Box sx={{ width: '100%', maxWidth: 380, mb: 1 }}>
        <Typography component={Link} to="/" sx={{ color: '#0066ff', textDecoration: 'none', fontSize: '14px', fontWeight: 500, '&:hover': { textDecoration: 'underline' } }}>
          ← Quay lại trang chủ
        </Typography>
      </Box>
      <Typography variant="h4" component={Link} to="/" sx={{ color: '#111', textDecoration: 'none', fontWeight: 'bold', mb: 4 }}>
        Smok<span style={{ color: '#0066ff' }}>erIT</span>
      </Typography>
      
      <Paper component="form" onSubmit={handleLogin} variant="outlined" sx={{ p: { xs: 3, md: 4 }, width: '100%', maxWidth: 380, borderRadius: 2, border: '1px solid #e0e0e0', bgcolor: 'white' }}>
        <Typography variant="h5" sx={{ mb: 3, fontWeight: 600, fontSize: '24px' }}>Đăng nhập</Typography>
        
        <Typography variant="body2" sx={{ mb: 1, fontWeight: 600, fontSize: '13px' }}>Email hoặc số điện thoại di động</Typography>
        <TextField 
          fullWidth 
          size="small" 
          placeholder="example@gmail.com hoặc 0xxxxxxxxx"
          value={email} 
          onChange={(e) => handleChange('email', e.target.value)}
          error={!!errors.email}
          helperText={errors.email}
          disabled={loading}
          sx={{ mb: 2.5 }}
        />
        
        <Typography variant="body2" sx={{ mb: 1, fontWeight: 600, fontSize: '13px' }}>Mật khẩu</Typography>
        <TextField 
          fullWidth 
          size="small" 
          type="password" 
          value={password} 
          onChange={(e) => handleChange('password', e.target.value)}
          error={!!errors.password}
          helperText={errors.password}
          disabled={loading}
          sx={{ mb: 3 }}
        />
        
        <Button 
          type="submit" 
          fullWidth 
          variant="contained" 
          disabled={loading}
          sx={{ 
            bgcolor: '#0066ff', 
            color: 'white', 
            textTransform: 'none', 
            mb: 3, 
            py: 1.3,
            fontWeight: 600,
            '&:hover': { bgcolor: '#0052cc' }, 
            boxShadow: '0 2px 8px rgba(0, 102, 255, 0.2)',
            '&:disabled': { bgcolor: '#b3d9ff' }
          }}
        >
          {loading ? 'Đang đăng nhập...' : 'Tiếp tục'}
        </Button>
        <Typography variant="caption" sx={{ fontSize: '11px', mb: 3, lineHeight: 1.6, display: 'block', color: '#666' }}>
          Bằng cách tiếp tục, bạn đồng ý với Điều kiện sử dụng và Thông báo bảo mật của chúng tôi.
        </Typography>
      </Paper>

      <Box sx={{ mt: 3.5, width: '100%', maxWidth: 380, textAlign: 'center' }}>
        <Divider sx={{ mb: 2.5, fontSize: '12px', color: '#999' }}>Bạn mới biết đến SmokerIT?</Divider>
        <Button 
          component={Link} 
          to="/register" 
          fullWidth 
          variant="outlined" 
          sx={{ 
            color: '#0066ff', 
            borderColor: '#0066ff', 
            textTransform: 'none',
            py: 1.2,
            fontWeight: 600,
            bgcolor: '#e3f2fd',
            boxShadow: '0 1px 3px rgba(0, 102, 255, 0.15)', 
            '&:hover': { bgcolor: '#d0e8ff', borderColor: '#0066ff' } 
          }}
        >
          Tạo tài khoản của bạn
        </Button>
      </Box>
    </Box>
  );
};

const Register = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({ name: '', email: '', password: '', confirmPassword: '' });
  const [errors, setErrors] = useState({});
  const [loading, setLoading] = useState(false);
  const [successMsg, setSuccessMsg] = useState('');

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

  const handleRegister = (e) => {
    e.preventDefault();
    const newErrors = {};

    if (!formData.name) {
      newErrors.name = 'Vui lòng nhập Họ và Tên';
    } else if (formData.name.length < 3) {
      newErrors.name = 'Họ và Tên phải có ít nhất 3 ký tự';
    }

    if (!formData.email) {
      newErrors.email = 'Vui lòng nhập Email hoặc Số điện thoại';
    } else if (!validateEmail(formData.email)) {
      newErrors.email = 'Email hoặc Số điện thoại không hợp lệ (nhập sdt: 0xxxxxxxxx)';
    }

    if (!formData.password) {
      newErrors.password = 'Vui lòng nhập Mật khẩu';
    } else if (formData.password.length < 6) {
      newErrors.password = 'Mật khẩu phải có ít nhất 6 ký tự';
    }

    if (!formData.confirmPassword) {
      newErrors.confirmPassword = 'Vui lòng xác nhận Mật khẩu';
    } else if (formData.password !== formData.confirmPassword) {
      newErrors.confirmPassword = 'Mật khẩu không khớp';
    }

    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      return;
    }

    setLoading(true);
    setTimeout(() => {
      setSuccessMsg('✓ Tạo tài khoản thành công! Vui lòng đăng nhập.');
      setTimeout(() => {
        navigate('/login'); 
      }, 1500);
    }, 800);
  };

  return (
    <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center', py: 5, bgcolor: '#f5f5f5', minHeight: '100vh' }}>
      <Box sx={{ width: '100%', maxWidth: 380, mb: 1 }}>
        <Typography component={Link} to="/" sx={{ color: '#0066ff', textDecoration: 'none', fontSize: '14px', fontWeight: 500, '&:hover': { textDecoration: 'underline' } }}>
          ← Quay lại trang chủ
        </Typography>
      </Box>
      <Typography variant="h4" component={Link} to="/" sx={{ color: '#111', textDecoration: 'none', fontWeight: 'bold', mb: 4 }}>
        Smok<span style={{ color: '#0066ff' }}>erIT</span>
      </Typography>
      
      <Paper component="form" onSubmit={handleRegister} variant="outlined" sx={{ p: { xs: 3, md: 4 }, width: '100%', maxWidth: 380, borderRadius: 2, border: '1px solid #e0e0e0', bgcolor: 'white' }}>
        <Typography variant="h5" sx={{ mb: 3, fontWeight: 600, fontSize: '24px' }}>Tạo tài khoản</Typography>
        
        <Typography variant="body2" sx={{ mb: 1, fontWeight: 600, fontSize: '13px' }}>Họ và tên</Typography>
        <TextField 
          fullWidth 
          size="small" 
          placeholder="Nguyễn Văn A"
          value={formData.name} 
          onChange={(e) => handleChange('name', e.target.value)}
          error={!!errors.name}
          helperText={errors.name}
          disabled={loading}
          sx={{ mb: 2.5 }}
        />
        
        <Typography variant="body2" sx={{ mb: 1, fontWeight: 600, fontSize: '13px' }}>Số di động hoặc email</Typography>
        <TextField 
          fullWidth 
          size="small" 
          placeholder="example@gmail.com hoặc 0xxxxxxxxx"
          value={formData.email} 
          onChange={(e) => handleChange('email', e.target.value)}
          error={!!errors.email}
          helperText={errors.email}
          disabled={loading}
          sx={{ mb: 2.5 }}
        />
        
        <Typography variant="body2" sx={{ mb: 1, fontWeight: 600, fontSize: '13px' }}>Mật khẩu</Typography>
        <TextField 
          fullWidth 
          size="small" 
          type="password" 
          placeholder="Ít nhất 6 ký tự"
          value={formData.password} 
          onChange={(e) => handleChange('password', e.target.value)}
          error={!!errors.password}
          helperText={errors.password}
          disabled={loading}
          sx={{ mb: 2.5 }}
        />
        
        <Typography variant="body2" sx={{ mb: 1, fontWeight: 600, fontSize: '13px' }}>Nhập lại mật khẩu</Typography>
        <TextField 
          fullWidth 
          size="small" 
          type="password"
          value={formData.confirmPassword} 
          onChange={(e) => handleChange('confirmPassword', e.target.value)}
          error={!!errors.confirmPassword}
          helperText={errors.confirmPassword}
          disabled={loading}
          sx={{ mb: 3 }}
        />
        
        <Button 
          type="submit" 
          fullWidth 
          variant="contained" 
          disabled={loading}
          sx={{ 
            bgcolor: '#ff5722', 
            color: 'white', 
            textTransform: 'none', 
            mb: 2.5, 
            py: 1.3,
            fontWeight: 600,
            '&:hover': { bgcolor: '#e64a19' }, 
            boxShadow: '0 2px 8px rgba(255, 87, 34, 0.2)',
            '&:disabled': { bgcolor: '#ffb399' }
          }}
        >
          {loading ? 'Đang tạo tài khoản...' : 'Tiếp tục'}
        </Button>

        {successMsg && (
          <Typography sx={{ fontSize: '14px', color: '#2e7d32', fontWeight: 600, textAlign: 'center', mb: 2, p: 1.5, bgcolor: '#e8f5e9', borderRadius: 1 }}>
            ✓ {successMsg}
          </Typography>
        )}

        <Divider sx={{ mb: 2 }} />
        <Typography variant="body2" sx={{ fontSize: '13px', textAlign: 'center' }}>
          Bạn đã có tài khoản? <Link to="/login" style={{ color: '#0066ff', textDecoration: 'none', fontWeight: 600 }}>Đăng nhập ▹</Link>
        </Typography>
      </Paper>
    </Box>
  );
};

// =========================================================
// 4. FOOTER 
// =========================================================
const footerData = [
  { title: "Về SmokerIT", links: ["Giới thiệu chung", "Tuyển dụng", "Tin tức công nghệ", "Chính sách bảo mật"] },
  { title: "Hợp tác kinh doanh", links: ["Đăng ký đại lý", "Đối tác chiến lược", "Liên hệ quảng cáo", "Cổng thương mại"] },
  { title: "Sản phẩm Thanh toán", links: ["Thanh toán SmokerPay", "Hướng dẫn trả góp", "Thẻ tín dụng", "Ví điện tử"] },
  { title: "Chăm sóc khách hàng", links: ["Trung tâm trợ giúp", "Chính sách đổi trả", "Chính sách bảo hành", "Góp ý & Khiếu nại"] }
];

const Footer = () => {
  return (
    <Box sx={{ bgcolor: '#3e87f4', color: '#e0e0e0', mt: 'auto', fontSize: '14px' }}>
      <Container maxWidth="lg" sx={{ py: 6 }}>
        <Grid container spacing={4} justifyContent="center">
          {footerData.map((column, i) => (
            <Grid item xs={6} md={3} key={i}>
              <Typography variant="subtitle1" fontWeight="bold" mb={2} sx={{ color: 'white' }}>{column.title}</Typography>
              <List dense sx={{ '& .MuiListItem-root': { px: 0, py: 0.5 } }}>
                {column.links.map(t => (
                  <ListItem key={t}>
                    <Typography className="footer__link" sx={{ color: '#ffffff', fontSize: '13px', cursor: 'pointer', '&:hover': { color: '#0066ff', textDecoration: 'underline' } }}>
                      {t}
                    </Typography>
                  </ListItem>
                ))}
              </List>
            </Grid>
          ))}
        </Grid>
      </Container>
      <Box sx={{ bgcolor: '#131829', py: 4, textAlign: 'center' }}>
        <Typography variant="body2" sx={{ color: '#ffffff', fontSize: '12px' }}>
          © 2026 SmokerIT - Smoker Laptop Store. Công nghệ tuy là đơn giản.
        </Typography>
      </Box>
    </Box>
  );
};

// =========================================================
// 5. MAIN APP 
// =========================================================
const MainApp = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const isAuthPage = location.pathname === '/login' || location.pathname === '/register';

  const [cart, setCart] = useState(() => {
      const saved = localStorage.getItem('smokerit_cart');
    return saved ? JSON.parse(saved) : [];
  });
  const [searchTerm, setSearchTerm] = useState("");
  const [dialogOpen, setDialogOpen] = useState(false);
  const [selectedProduct, setSelectedProduct] = useState(null);

  const [user, setUser] = useState(() => {
    const savedUser = localStorage.getItem('smokerit_user');
    return savedUser ? JSON.parse(savedUser) : null;
  });

  const handleLoginSuccess = (userData) => {
    setUser(userData);
    localStorage.setItem('smokerit_user', JSON.stringify(userData));
  };

  const handleLogout = () => {
    setUser(null);
    localStorage.removeItem('smokerit_user');
  };

  useEffect(() => {
      localStorage.setItem('smokerit_cart', JSON.stringify(cart));
  }, [cart]);

  const addToCart = (product) => {
    setCart(prev => {
      const exist = prev.find(x => x.id === product.id);
      if (exist) return prev.map(x => x.id === product.id ? { ...x, quantity: x.quantity + 1 } : x);
      return [...prev, { ...product, quantity: 1 }];
    });
    setSelectedProduct(product);
    setDialogOpen(true);
  };

  const updateQuantity = (id, amt) => setCart(prev => prev.map(x => x.id === id ? { ...x, quantity: Math.max(1, x.quantity + amt) } : x));
  const removeFromCart = (id) => setCart(prev => prev.filter(x => x.id !== id));
  const clearCart = () => setCart([]);

  const cartTotal = cart.reduce((a, c) => a + c.price * c.quantity, 0);
  const cartCount = cart.reduce((a, c) => a + c.quantity, 0);

  return (
    <Box sx={{ display: 'flex', flexDirection: 'column', minHeight: '100vh', bgcolor: 'var(--bg-color)' }}>
      {!isAuthPage && <Header cartCount={cartCount} setSearchTerm={setSearchTerm} user={user} onLogout={handleLogout} />}
      
      {!isAuthPage && (
        <Box className="marquee-container">
          <Box className="marquee-content">
            <Box className="marquee-item"><span className="marquee-icon">✓</span> Giá rẻ dẫn đầu - Bảo hành siêu lâu</Box>
            <Box className="marquee-item"><span className="marquee-icon">✓</span> Thu cũ giá tốt - Lên đời tiết kiệm</Box>
            <Box className="marquee-item"><span className="marquee-icon">✓</span> Sản phẩm Chính hãng - VAT đầy đủ</Box>
            <Box className="marquee-item"><span className="marquee-icon">✓</span> Giá rẻ dẫn đầu - Bảo hành siêu lâu</Box>
            <Box className="marquee-item"><span className="marquee-icon">✓</span> Thu cũ giá tốt - Lên đời tiết kiệm</Box>
            <Box className="marquee-item"><span className="marquee-icon">✓</span> Sản phẩm Chính hãng - VAT đầy đủ</Box>
          </Box>
        </Box>
      )}

      {/* DIALOG THÊM GIỎ HÀNG */}
      <Dialog 
        open={dialogOpen} 
        onClose={() => setDialogOpen(false)}
        maxWidth="sm"
        fullWidth
        PaperProps={{
          sx: { borderRadius: 2, bgcolor: 'white' }
        }}
      >
        <DialogContent sx={{ pt: 4, pb: 3, textAlign: 'center' }}>
          <Box sx={{ mb: 3, display: 'flex', justifyContent: 'center' }}>
            <Box sx={{ 
              width: 80, 
              height: 80, 
              bgcolor: '#e8f5e9', 
              borderRadius: '50%', 
              display: 'flex', 
              alignItems: 'center', 
              justifyContent: 'center'
            }}>
              <Typography sx={{ fontSize: '48px' }}>✓</Typography>
            </Box>
          </Box>
          
          <Typography variant="h5" fontWeight="bold" sx={{ mb: 2, color: '#2e7d32' }}>
            Thêm vào giỏ hàng thành công!
          </Typography>

          {selectedProduct && (
            <Box sx={{ mb: 3, p: 2, bgcolor: '#f5f5f5', borderRadius: 1.5 }}>
              <Grid container spacing={2} alignItems="center">
                <Grid item xs={4}>
                  <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'center', height: '80px', p: 1 }}>
                    <img 
                      src={selectedProduct.image} 
                      alt={selectedProduct.title}
                      style={{ maxHeight: '100%', maxWidth: '100%', objectFit: 'contain' }}
                    />
                  </Box>
                </Grid>
                <Grid item xs={8}>
                  <Typography variant="subtitle2" fontWeight="bold" sx={{ mb: 1 }}>
                    {selectedProduct.title}
                  </Typography>
                  <Typography variant="body2" color="text.secondary" sx={{ mb: 1 }}>
                    Giá: <span style={{ color: '#e91e63', fontWeight: 'bold', fontSize: '16px' }}>
                      {selectedProduct.price.toLocaleString()} đ
                    </span>
                  </Typography>
                </Grid>
              </Grid>
            </Box>
          )}

          <Typography variant="body2" color="text.secondary" sx={{ mb: 3 }}>
            Sản phẩm đã được thêm vào giỏ hàng. Bạn có thể tiếp tục mua sắm hoặc xem giỏ hàng.
          </Typography>
        </DialogContent>

        <DialogActions sx={{ p: 2, gap: 1 }}>
          <Button 
            onClick={() => {
              setDialogOpen(false);
              navigate('/');
            }}
            variant="outlined"
            sx={{ 
              color: '#0066ff', 
              borderColor: '#0066ff',
              textTransform: 'none',
              fontWeight: 600,
              borderRadius: 1.5
            }}
          >
            Quay lại trang chính
          </Button>
          <Button 
            onClick={() => {
              setDialogOpen(false);
              navigate('/cart');
            }}
            variant="contained"
            sx={{ 
              bgcolor: '#0066ff', 
              color: 'white',
              textTransform: 'none',
              fontWeight: 600,
              borderRadius: 1.5,
              '&:hover': { bgcolor: '#0052cc' }
            }}
          >
            Xem giỏ hàng
          </Button>
        </DialogActions>
      </Dialog>
      
      <Box sx={{ flexGrow: 1 }}>
        <Routes>
          <Route path="/" element={<Home searchTerm={searchTerm} addToCart={addToCart} />} />
          <Route path="/product/:id" element={<ProductDetail addToCart={addToCart} />} />
          <Route path="/cart" element={<Cart cart={cart} updateQuantity={updateQuantity} removeFromCart={removeFromCart} total={cartTotal} user={user} />} />
          <Route path="/checkout" element={<Checkout total={cartTotal} clearCart={clearCart} user={user} navigate={navigate} cart={cart} />} />
          <Route path="/my-orders" element={<MyOrders user={user} />} />
          <Route path="/login" element={<Login onLogin={handleLoginSuccess} />} />
          <Route path="/register" element={<Register />} />
          <Route path="/profile" element={user ? <UserProfile user={user} onLogout={handleLogout} navigate={navigate} /> : <Login onLogin={handleLoginSuccess} />} />
          
          {/* Admin Routes */}
          <Route path="/admin/login" element={<AdminLogin />} />
          <Route 
            path="/admin/dashboard" 
            element={
              <ProtectedRoute>
                <AdminDashboard />
              </ProtectedRoute>
            } 
          />
        </Routes>
      </Box>

      {!isAuthPage && <Footer />}
      <FloatingScrollButton />
    </Box>
  );
};

export default function App() {
  return (
    <AdminProvider>
      <OrderProvider>
        <BrowserRouter>
          <ScrollToTop />
          <MainApp />
        </BrowserRouter>
      </OrderProvider>
    </AdminProvider>
  );
}