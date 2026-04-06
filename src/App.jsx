// src/App.jsx
import React, { useState, useEffect, useRef } from 'react';
import { BrowserRouter, Routes, Route, Link, useNavigate, useParams, useLocation } from 'react-router-dom';
import { products } from './data/products';
import ProductCard from './components/ProductCard'; 
import './App.css'; 

// Tích hợp thư viện Material UI
import { 
  AppBar, Toolbar, Typography, InputBase, Badge, IconButton, Box, 
  Drawer, List, ListItem, ListItemText, Divider, Card, CardMedia, 
  CardContent, CardActions, Button, Grid, Rating, Paper, TextField, Container, Stack,
  Fab, Zoom 
} from '@mui/material';
import { 
  Search, ShoppingCart, Menu as MenuIcon, Add, Remove,
  KeyboardArrowUp, KeyboardArrowLeft, KeyboardArrowRight, ArrowBack,
  DeleteOutline, ShoppingCartCheckout // <-- Đã thêm icon cho Giỏ hàng
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
const ProductScrollSection = ({ id, title, products, addToCart, emptyMessage }) => {
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
      <Typography variant="h5" fontWeight="bold" gutterBottom sx={{ borderBottom: '1px solid #ddd', pb: 1, mb: 3 }}>
        {title}
      </Typography>
      
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
            {user ? (
              <Box sx={{ display: 'flex', alignItems: 'center', gap: 1.5 }}>
                <Box sx={{ display: { xs: 'none', sm: 'block' }, textAlign: 'right' }}>
                  <Typography sx={{ fontSize: '12px', color: '#4b5563', fontWeight: 500 }}>Xin chào,</Typography>
                  <Typography sx={{ fontSize: '14px', fontWeight: 'bold', color: '#0066ff' }}>{user.name}</Typography>
                </Box>
                <Button size="small" variant="outlined" color="error" onClick={onLogout} sx={{ textTransform: 'none', fontSize: '12px', borderRadius: 2 }}>
                  Đăng xuất
                </Button>
              </Box>
            ) : (
              <Link to="/login" style={{ color: '#1a202c', textDecoration: 'none' }}>
                <Box sx={{ display: { xs: 'none', sm: 'block' }, p: 1, borderRadius: '6px', transition: 'all 0.3s', textAlign: 'center', '&:hover': { bgcolor: '#e3f2fd', boxShadow: '0 2px 8px rgba(0, 102, 255, 0.15)' } }}>
                  <Typography sx={{ fontSize: '12px', color: '#4b5563', fontWeight: 500 }}>Xin chào,</Typography>
                  <Typography sx={{ fontSize: '14px', fontWeight: 'bold', color: '#0066ff' }}>Đăng nhập</Typography>
                </Box>
              </Link>
            )}

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
  const banners = [
    "./banner/banner1.png", 
    "./banner/banner2.png", 
    "./banner/banner3.jpg" 
  ];

  useEffect(() => {
    const timer = setInterval(() => setBannerIndex(p => (p + 1) % banners.length), 5000);
    return () => clearInterval(timer);
  }, [banners.length]);

  const filteredSearch = products.filter(p => 
    p.title.toLowerCase().includes(searchTerm.toLowerCase()) || 
    (p.brand && p.brand.toLowerCase().includes(searchTerm.toLowerCase())) ||
    (p.category && p.category.toLowerCase().includes(searchTerm.toLowerCase()))
  );

  const gamingProducts = products.filter(p => p.category === 'Gaming' || p.category === 'Laptop Gaming');
  const officeProducts = products.filter(p => p.category === 'Văn phòng' || p.category === 'Laptop Văn Phòng');
  const accessoryProducts = products.filter(p => p.category === 'Phụ kiện' || p.category === 'Phụ Kiện');
  const msiProducts = products.filter(p => p.brand === 'MSI' || p.title.toLowerCase().includes('msi'));

  return (
    <Box sx={{ pb: 8 }}>
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
      
      <Container maxWidth="xl" sx={{ mt: 5 }}>
        {searchTerm ? (
          <>
            <Typography variant="h5" fontWeight="bold" gutterBottom sx={{ borderBottom: '1px solid #ddd', pb: 1, mb: 3 }}>
              Kết quả cho "{searchTerm}" ({filteredSearch.length} sản phẩm)
            </Typography>
            {filteredSearch.length === 0 ? (
              <Typography sx={{ py: 10, textAlign: 'center' }}>Không tìm thấy sản phẩm nào phù hợp.</Typography>
            ) : (
              <Grid container spacing={2}>
                {filteredSearch.map(item => (
                  <Grid item xs={12} sm={6} md={4} lg={3} xl={2.4} key={item.id}><ProductCard item={item} addToCart={addToCart} /></Grid>
                ))}
              </Grid>
            )}
          </>
        ) : (
          <>
            <ProductScrollSection 
              id="gaming-section" 
              title="Laptop Gaming" 
              products={gamingProducts} 
              addToCart={addToCart} 
              emptyMessage="Chưa có Laptop Gaming nào." 
            />

            <ProductScrollSection 
              id="office-section" 
              title="Laptop Văn Phòng" 
              products={officeProducts} 
              addToCart={addToCart} 
              emptyMessage="Chưa có Laptop Văn phòng nào." 
            />

            <ProductScrollSection 
              id="phukien-section" 
              title="Sản Phẩm Phụ Kiện" 
              products={accessoryProducts} 
              addToCart={addToCart} 
              emptyMessage="Chưa có sản phẩm phụ kiện nào. Hãy thêm vào file products.js (category: 'Phụ kiện')" 
            />

            <ProductScrollSection 
              id="msi-section" 
              title="Ưu đãi MSI" 
              products={msiProducts} 
              addToCart={addToCart} 
              emptyMessage="Chưa có sản phẩm MSI nào. Hãy thêm vào file products.js (brand: 'MSI' hoặc tiêu đề có chữ 'MSI')" 
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
// COMPONENT GIỎ HÀNG (ĐÃ LÀM MÀU MÈ, NỔI BẬT)
// =========================================================
const Cart = ({ cart, updateQuantity, removeFromCart, total }) => {
  const navigate = useNavigate();
  const totalItems = cart.reduce((a, c) => a + c.quantity, 0);

  if (cart.length === 0) {
    return (
      <Container sx={{ textAlign: 'center', py: 10, minHeight: '60vh' }}>
        <Typography variant="h4" fontWeight="bold" gutterBottom sx={{ color: '#ff5722' }}>Giỏ hàng của bạn đang trống 🥺</Typography>
        <Typography variant="body1" color="text.secondary" mb={4}>Hãy chọn cho mình những chiếc Laptop ưng ý nhất tại SmokerIT nhé!</Typography>
        <Button variant="contained" component={Link} to="/" sx={{ background: 'linear-gradient(45deg, #FF512F 0%, #F09819 100%)', color: 'white', fontWeight: 'bold', px: 4, py: 1.5, borderRadius: 8 }}>
          Trở về mua sắm
        </Button>
      </Container>
    );
  }

  return (
    <Container maxWidth="lg" sx={{ py: 5, minHeight: '60vh' }}>
      <Typography variant="h4" fontWeight="bold" gutterBottom sx={{ mb: 4, background: "linear-gradient(90deg, #1CB5E0 0%, #000851 100%)", WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent" }}>
        🔥 Giỏ hàng siêu tốc của bạn
      </Typography>

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
    </Container>
  );
};

// =========================================================
// TRANG THANH TOÁN (CẬP NHẬT TÍNH NĂNG QR & TẢI ẢNH)
// =========================================================
const Checkout = ({ total, clearCart }) => {
  const navigate = useNavigate();
  const [paymentMethod, setPaymentMethod] = useState('cash'); 
  const [receiptFile, setReceiptFile] = useState(null);

  const handleFileChange = (e) => {
    if (e.target.files && e.target.files[0]) {
      setReceiptFile(e.target.files[0]);
    }
  };

  const handle = (e) => { 
    e.preventDefault(); 
    
    // Ràng buộc: Nếu chọn chuyển khoản mà chưa up biên lai thì báo lỗi
    if (paymentMethod === 'transfer' && !receiptFile) {
      alert("⚠️ Vui lòng tải lên hình ảnh biên lai chuyển khoản để hoàn tất đặt hàng!");
      return;
    }

    const methodText = paymentMethod === 'cash' ? 'Tiền mặt khi nhận hàng' : 'Chuyển khoản QR';
    alert(`🎉 Đặt hàng thành công!\nPhương thức: ${methodText}`); 
    clearCart(); 
    navigate('/'); 
  };

  return (
    <Container sx={{ py: 10, maxWidth: '600px' }}>
      <Paper sx={{ p: 4, borderRadius: 2, boxShadow: '0 4px 20px rgba(0,0,0,0.08)' }}>
        <Typography variant="h5" mb={3} fontWeight="bold" textAlign="center">
          Thông vị đặt hàng
        </Typography>
        
        <form onSubmit={handle}>
          <TextField fullWidth label="Họ tên *" required sx={{ mb: 2 }} />
          <TextField fullWidth label="Địa chỉ *" required sx={{ mb: 2 }} />
          <TextField fullWidth label="Số điện thoại *" required sx={{ mb: 3 }} />
          
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

  const handleLogin = (e) => {
    e.preventDefault(); 
    if (!email || !password) {
      alert("Vui lòng nhập đầy đủ Email và Mật khẩu!");
      return;
    }
    const username = email.split('@')[0];
    onLogin({ name: username, email: email });
    alert("🎉 Đăng nhập thành công!");
    navigate('/'); 
  };

  return (
    <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center', py: 5, bgcolor: '#fff', minHeight: '100vh' }}>
      <Box sx={{ width: '100%', maxWidth: 350, mb: 1 }}>
        <Typography component={Link} to="/" sx={{ color: '#0066ff', textDecoration: 'none', fontSize: '14px', '&:hover': { textDecoration: 'underline' } }}>
          ← Quay lại trang chủ
        </Typography>
      </Box>
      <Typography variant="h4" component={Link} to="/" sx={{ color: '#111', textDecoration: 'none', fontWeight: 'bold', mb: 3 }}>
        Smok<span style={{ color: '#0066ff' }}>erIT</span>
      </Typography>
      
      <Paper component="form" onSubmit={handleLogin} variant="outlined" sx={{ p: 4, width: '100%', maxWidth: 350, borderRadius: 2 }}>
        <Typography variant="h5" sx={{ mb: 2, fontWeight: 500, fontSize: '28px' }}>Đăng nhập</Typography>
        
        <Typography variant="body2" sx={{ mb: 1, fontWeight: 700 }}>Email hoặc số điện thoại di động</Typography>
        <TextField fullWidth size="small" value={email} onChange={(e) => setEmail(e.target.value)} sx={{ mb: 2 }} />
        
        <Typography variant="body2" sx={{ mb: 1, fontWeight: 700 }}>Mật khẩu</Typography>
        <TextField fullWidth size="small" type="password" value={password} onChange={(e) => setPassword(e.target.value)} sx={{ mb: 3 }} />
        
        <Button type="submit" fullWidth variant="contained" sx={{ bgcolor: '#0066ff', color: 'white', textTransform: 'none', mb: 3, '&:hover': { bgcolor: '#e64a19' }, boxShadow: 'none', border: 'none' }}>
          Tiếp tục
        </Button>
        <Typography variant="body2" sx={{ fontSize: '12px', mb: 3, lineHeight: 1.5 }}>
          Bằng cách tiếp tục, bạn đồng ý với Điều kiện sử dụng và Thông báo bảo mật của chúng tôi.
        </Typography>
      </Paper>

      <Box sx={{ mt: 3, width: '100%', maxWidth: 350, textAlign: 'center' }}>
        <Divider sx={{ mb: 2, fontSize: '12px', color: '#767676' }}>Bạn mới biết đến SmokerIT?</Divider>
        <Button component={Link} to="/register" fullWidth variant="outlined" sx={{ color: '#0066ff', borderColor: '#0066ff', textTransform: 'none', bgcolor: '#e3f2fd', boxShadow: '0 2px 5px 0 rgba(0, 102, 255, 0.15)', '&:hover': { bgcolor: '#d0e8ff' } }}>
          Tạo tài khoản của bạn
        </Button>
      </Box>
    </Box>
  );
};

const Register = () => {
  const navigate = useNavigate();
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');

  const handleRegister = (e) => {
    e.preventDefault();
    if (!name || !email || !password || !confirmPassword) {
      alert("Vui lòng điền đầy đủ các thông tin!");
      return;
    }
    if (password !== confirmPassword) {
      alert("Mật khẩu nhập lại không khớp!");
      return;
    }
    alert("🎉 Đăng ký thành công! Vui lòng tiến hành đăng nhập.");
    navigate('/login'); 
  };

  return (
    <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center', py: 5, bgcolor: '#fff', minHeight: '100vh' }}>
      <Box sx={{ width: '100%', maxWidth: 350, mb: 1 }}>
        <Typography component={Link} to="/" sx={{ color: '#0066ff', textDecoration: 'none', fontSize: '14px', '&:hover': { textDecoration: 'underline' } }}>
          ← Quay lại trang chủ
        </Typography>
      </Box>
      <Typography variant="h4" component={Link} to="/" sx={{ color: '#111', textDecoration: 'none', fontWeight: 'bold', mb: 3 }}>
        Smok<span style={{ color: '#0066ff' }}>erIT</span>
      </Typography>
      
      <Paper component="form" onSubmit={handleRegister} variant="outlined" sx={{ p: 4, width: '100%', maxWidth: 350, borderRadius: 2 }}>
        <Typography variant="h5" sx={{ mb: 2, fontWeight: 500, fontSize: '28px' }}>Tạo tài khoản</Typography>
        
        <Typography variant="body2" sx={{ mb: 1, fontWeight: 700 }}>Họ và tên</Typography>
        <TextField fullWidth size="small" placeholder="Họ và tên" value={name} onChange={(e) => setName(e.target.value)} sx={{ mb: 2 }} />
        
        <Typography variant="body2" sx={{ mb: 1, fontWeight: 700 }}>Số di động hoặc email</Typography>
        <TextField fullWidth size="small" value={email} onChange={(e) => setEmail(e.target.value)} sx={{ mb: 2 }} />
        
        <Typography variant="body2" sx={{ mb: 1, fontWeight: 700 }}>Mật khẩu</Typography>
        <TextField fullWidth size="small" type="password" placeholder="Ít nhất 6 ký tự" value={password} onChange={(e) => setPassword(e.target.value)} sx={{ mb: 2 }} />
        
        <Typography variant="body2" sx={{ mb: 1, fontWeight: 700 }}>Nhập lại mật khẩu</Typography>
        <TextField fullWidth size="small" type="password" value={confirmPassword} onChange={(e) => setConfirmPassword(e.target.value)} sx={{ mb: 3 }} />
        
        <Button type="submit" fullWidth variant="contained" sx={{ bgcolor: '#0066ff', color: 'white', textTransform: 'none', mb: 3, '&:hover': { bgcolor: '#e64a19' }, boxShadow: 'none', border: 'none' }}>
          Tiếp tục
        </Button>
        <Divider sx={{ mb: 2 }} />
        <Typography variant="body2" sx={{ fontSize: '13px' }}>
          Bạn đã có tài khoản? <Link to="/login" style={{ color: '#0066ff', textDecoration: 'none', fontWeight: 500 }}>Đăng nhập ▹</Link>
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
  const isAuthPage = location.pathname === '/login' || location.pathname === '/register';

  const [cart, setCart] = useState(() => {
      const saved = localStorage.getItem('smokerit_cart');
    return saved ? JSON.parse(saved) : [];
  });
  const [searchTerm, setSearchTerm] = useState("");

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
    alert("Đã thêm vào giỏ!");
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
      
      <Box sx={{ flexGrow: 1 }}>
        <Routes>
          <Route path="/" element={<Home searchTerm={searchTerm} addToCart={addToCart} />} />
          <Route path="/product/:id" element={<ProductDetail addToCart={addToCart} />} />
          <Route path="/cart" element={<Cart cart={cart} updateQuantity={updateQuantity} removeFromCart={removeFromCart} total={cartTotal} />} />
          <Route path="/checkout" element={<Checkout total={cartTotal} clearCart={clearCart} />} />
          <Route path="/login" element={<Login onLogin={handleLoginSuccess} />} />
          <Route path="/register" element={<Register />} />
        </Routes>
      </Box>

      {!isAuthPage && <Footer />}
      <FloatingScrollButton />
    </Box>
  );
};

export default function App() {
  return (
    <BrowserRouter>
      <ScrollToTop />
      <MainApp />
    </BrowserRouter>
  );
}