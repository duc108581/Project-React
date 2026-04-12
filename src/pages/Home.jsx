// src/pages/Home.jsx
import React, { useState, useEffect } from 'react';
import { Box, Grid, Card, CardMedia, CardContent, CardActions, Typography, Rating, Button, IconButton } from '@mui/material';
import { ArrowBackIosNew, ArrowForwardIos } from '@mui/icons-material';
import { Link } from 'react-router-dom';
import CategoryGrid from '../components/CategoryGrid';
import { products } from '../data/products';

// Dữ liệu cho Banner xoay 3D
const bannerImages = [
  "https://m.media-amazon.com/images/I/61lwJy4B8PL._SX3000_.jpg",
  "https://m.media-amazon.com/images/I/71jG+e7roXL._AC_SX679_.jpg",
  "https://m.media-amazon.com/images/I/71TPda7cwUL._AC_SX679_.jpg",
  "https://m.media-amazon.com/images/I/71jG+e7roXL._AC_SX679_.jpg" // Thêm ảnh thứ 4 để vòng xoay 3D mượt mà hơn
];

// Dữ liệu mẫu cho tiêu đề và giá của các thẻ trong Carousel 3D (Bạn có thể thay đổi sau)
const productTitles = [
  "Laptop Gaming Cao Cấp Cấu Hình Khủng", 
  "MacBook Pro M2 Mới Nhất 2023", 
  "Ultrabook Mỏng Nhẹ Văn Phòng", 
  "Laptop Đồ Họa Chuyên Nghiệp"
];
const productPrices = ["25.990.000", "32.490.000", "18.500.000", "41.200.000"];

export default function Home({ searchTerm, addToCart }) {
  const [bannerIndex, setBannerIndex] = useState(0);

  // Hiệu ứng tự động chuyển Banner mỗi 5 giây
  useEffect(() => {
    const timer = setInterval(() => {
      setBannerIndex((prevIndex) => (prevIndex + 1) % bannerImages.length);
    }, 5000);
    return () => clearInterval(timer);
  }, []); 

  // Logic lọc sản phẩm theo thanh tìm kiếm từ Header
  const filteredProducts = products.filter(product => 
    product.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
    product.brand.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <Box sx={{ pb: 8, bgcolor: '#eaeded', minHeight: '100vh' }}>
      
      {/* 1. BANNER NỀN CHẠY TỰ ĐỘNG LÀM MỜ Ở TRÊN CÙNG */}
      <Box 
        sx={{ 
          width: '100%',
          height: { xs: '250px', md: '500px' }, 
          backgroundImage: `url(${bannerImages[bannerIndex]})`,
          backgroundSize: 'cover',
          backgroundPosition: 'top center',
          transition: 'background-image 0.8s ease-in-out',
          maskImage: 'linear-gradient(to bottom, rgba(0,0,0,1) 60%, rgba(0,0,0,0) 100%)',
          WebkitMaskImage: 'linear-gradient(to bottom, rgba(0,0,0,1) 60%, rgba(0,0,0,0) 100%)',
          position: 'absolute',
          top: 0,
          left: 0,
          right: 0,
          zIndex: 1
        }}
      />

      {/* Tạo khoảng trống giả để đẩy phần nội dung xuống dưới banner nền */}
      <Box sx={{ height: { xs: '150px', md: '250px' } }} />

      {/* 2. CATEGORY GRID - NẰM ĐÈ LÊN BANNER MỜ */}
      <Box sx={{ position: 'relative', zIndex: 10, mt: { xs: 2, md: 5 } }}>
        <CategoryGrid />
      </Box>

      {/* 3. DYNAMIC CIRCULAR BANNER CAROUSEL (HIỆU ỨNG 3D MỚI) */}
      <Box 
        sx={{ 
          maxWidth: 1600, 
          mx: 'auto', 
          mt: { xs: 5, md: 8 }, 
          mb: 6, 
          px: { xs: 2, md: 3 }, 
          position: 'relative', 
          zIndex: 5 
        }}
      >
        <Typography variant="h5" fontWeight="bold" mb={3} sx={{ color: '#1a202c', textAlign: 'center' }}>
          {searchTerm ? `Sản phẩm liên quan đến: "${searchTerm}"` : 'Sản phẩm nổi bật cho bạn'}
        </Typography>

        {/* Khung Carousel kiểu vòng */}
        <Box sx={{ position: 'relative', height: { xs: '300px', md: '450px' }, display: 'flex', alignItems: 'center', justifyContent: 'center', overflow: 'hidden' }}>
          
          {/* Mũi tên trái */}
          <IconButton onClick={() => setBannerIndex((prev) => (prev - 1 + bannerImages.length) % bannerImages.length)} sx={{ position: 'absolute', left: { xs: 0, md: 20 }, zIndex: 10, bgcolor: 'rgba(255,255,255,0.7)', '&:hover': { bgcolor: 'rgba(255,255,255,0.9)' } }}>
            <ArrowBackIosNew />
          </IconButton>

          {/* Vòng quay banner (tạo hiệu ứng 3D) */}
          <Box sx={{ width: '100%', display: 'flex', justifyContent: 'center', perspective: '1000px', transformStyle: 'preserve-3d', transition: 'transform 0.8s ease-in-out' }}>
            
            {[0, 1, 2, 3].map((item, index) => {
              const isActive = index === bannerIndex;
              const angle = 90 * (index - bannerIndex); // Góc quay

              return (
                <Card 
                  key={index}
                  sx={{ 
                    position: 'absolute',
                    width: { xs: '260px', md: '350px' },
                    height: { xs: '280px', md: '380px' },
                    bgcolor: '#ffffff',
                    display: 'flex',
                    flexDirection: 'column',
                    alignItems: 'center',
                    justifyContent: 'space-between',
                    p: 2,
                    boxShadow: isActive ? '0 12px 28px rgba(0, 102, 255, 0.2)' : '0 4px 12px rgba(0,0,0,0.1)',
                    borderRadius: '8px',
                    transition: 'transform 0.8s ease-in-out, opacity 0.8s ease-in-out',
                    transform: `rotateY(${angle}deg) translateZ(${isActive ? 150 : -50}px)`,
                    opacity: isActive ? 1 : 0.4,
                    border: isActive ? '2px solid #0066ff' : '1px solid #e2e8f0',
                    pointerEvents: isActive ? 'auto' : 'none' // Chỉ cho phép click vào thẻ đang active
                  }}
                >
                  <Box sx={{ height: { xs: 120, md: 180 }, display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
                    <CardMedia 
                      component="img" 
                      image={bannerImages[index % bannerImages.length]} 
                      alt="Product" 
                      sx={{ maxHeight: '100%', maxWidth: '100%', objectFit: 'contain' }} 
                    />
                  </Box>
                  <CardContent sx={{ flexGrow: 1, textAlign: 'center', width: '100%', p: 1 }}>
                    <Typography variant="body2" fontWeight="bold" sx={{ color: '#1a202c', minHeight: '42px', mb: 1, fontSize: '14px', lineHeight: '1.5', display: '-webkit-box', WebkitLineClamp: 2, WebkitBoxOrient: 'vertical', overflow: 'hidden' }}>
                      {productTitles[index % productTitles.length]}
                    </Typography>
                    <Typography variant="h6" fontWeight="bold" sx={{ color: '#0066ff', mt: 'auto' }}>
                      {productPrices[index % productPrices.length]} đ
                    </Typography>
                  </CardContent>
                  <CardActions sx={{ p: 1, width: '100%' }}>
                    <Button fullWidth variant="contained" sx={{ bgcolor: '#0066ff', color: '#fff', fontSize: '13px', fontWeight: 'bold', borderRadius: '6px', textTransform: 'none', boxShadow: 'none', '&:hover': { bgcolor: '#0052cc', boxShadow: '0 4px 12px rgba(0, 102, 255, 0.4)' } }}>
                      Mua Ngay
                    </Button>
                  </CardActions>
                </Card>
              );
            })}
          </Box>

          {/* Mũi tên phải */}
          <IconButton onClick={() => setBannerIndex((prev) => (prev + 1) % bannerImages.length)} sx={{ position: 'absolute', right: { xs: 0, md: 20 }, zIndex: 10, bgcolor: 'rgba(255,255,255,0.7)', '&:hover': { bgcolor: 'rgba(255,255,255,0.9)' } }}>
            <ArrowForwardIos />
          </IconButton>
        </Box>
        
        {/* Pagination Dots */}
        <Box sx={{ mt: 3, display: 'flex', justifyContent: 'center', gap: 1 }}>
          {bannerImages.map((_, index) => (
            <Box 
              key={index} 
              onClick={() => setBannerIndex(index)}
              sx={{ width: 10, height: 10, borderRadius: '50%', bgcolor: index === bannerIndex ? '#0066ff' : 'rgba(0,0,0,0.2)', cursor: 'pointer', transition: '0.3s' }} 
            />
          ))}
        </Box>
      </Box>

      {/* 4. LƯỚI SẢN PHẨM BÊN DƯỚI */}
      <Box id="products-section" sx={{ maxWidth: 1500, mx: 'auto', px: { xs: 1.5, md: 2 }, mt: 2, position: 'relative', zIndex: 5, pt: 3 }}>
        <Typography variant="h5" fontWeight="bold" gutterBottom sx={{ borderBottom: '1px solid #e2e8f0', pb: 1, mb: 3, color: '#1a202c' }}>
          {searchTerm ? `Kết quả tìm kiếm cho: "${searchTerm}"` : 'Gợi ý dành cho bạn'} ({filteredProducts.length} sản phẩm)
        </Typography>

        <Grid container spacing={2.5} justifyContent="center">
          {filteredProducts.length > 0 ? (
            filteredProducts.map((item) => (
              <Grid item xs={12} sm={6} md={4} lg={3} key={item.id} sx={{ display: 'flex', justifyContent: 'center' }}>
                <Card 
                  sx={{ 
                    height: '100%', 
                    minWidth: '220px',
                    width: '100%',
                    display: 'flex', 
                    flexDirection: 'column',
                    transition: 'all 0.3s ease-in-out',
                    borderRadius: '8px',
                    border: '1px solid #e2e8f0',
                    boxShadow: '0 2px 8px rgba(0,0,0,0.08)',
                    bgcolor: '#ffffff',
                    '&:hover': { 
                      transform: 'translateY(-6px)', 
                      boxShadow: '0 12px 28px rgba(0, 102, 255, 0.15)', 
                      borderColor: '#0066ff',
                    }
                  }}
                >
                  <Box sx={{ height: 200, display: 'flex', alignItems: 'center', justifyContent: 'center', p: 2, flexShrink: 0 }}>
                    <CardMedia 
                      component="img" 
                      image={item.image} 
                      alt={item.title} 
                      sx={{ maxHeight: '100%', maxWidth: '100%', objectFit: 'contain', transition: 'transform 0.3s', '&:hover': { transform: 'scale(1.05)' } }} 
                    />
                  </Box>
                  
                  <CardContent sx={{ flexGrow: 1, p: 2, pt: 0, display: 'flex', flexDirection: 'column' }}>
                    <Typography 
                      variant="body2" 
                      sx={{ 
                        fontWeight: 500,
                        fontSize: '14px',
                        display: '-webkit-box',
                        WebkitLineClamp: 2,
                        WebkitBoxOrient: 'vertical',
                        overflow: 'hidden',
                        minHeight: '42px',
                        mb: 1,
                        lineHeight: '1.5',
                        color: '#1a202c'
                      }}
                    >
                      {item.title}
                    </Typography>

                    <Box sx={{ display: 'flex', alignItems: 'center', gap: 0.5, mb: 1 }}>
                      <Rating value={item.rating || 4.5} readOnly size="small" precision={0.5} />
                      <Typography variant="caption" color="text.secondary" sx={{ fontSize: '12px' }}>({item.id * 12})</Typography>
                    </Box>

                    <Typography variant="h6" fontWeight="bold" sx={{ fontSize: '18px', mt: 'auto', color: '#0066ff' }}>
                      {typeof item.price === 'number' ? item.price.toLocaleString() + ' đ' : item.price}
                    </Typography>
                  </CardContent>

                  <CardActions sx={{ p: 2, pt: 0, flexDirection: 'column', gap: 1 }}>
                    <Button 
                      fullWidth 
                      variant="outlined" 
                      component={Link} 
                      to={`/product/${item.id}`} 
                      sx={{ 
                        bgcolor: '#e3f2fd',
                        borderColor: '#0066ff',
                        color: '#0066ff', 
                        fontSize: '13px', 
                        fontWeight: 600, 
                        borderRadius: '6px',
                        border: '1px solid #0066ff',
                        textTransform: 'none', 
                        boxShadow: 'none', 
                        '&:hover': { bgcolor: '#bbdefb', boxShadow: 'none', borderColor: '#0052cc' } 
                      }}
                    >
                      Chi tiết
                    </Button>
                    <Button 
                      fullWidth 
                      variant="contained" 
                      onClick={() => addToCart(item)} 
                      sx={{ 
                        bgcolor: '#0066ff',
                        color: '#fff', 
                        fontSize: '13px', 
                        fontWeight: 'bold', 
                        borderRadius: '6px',
                        textTransform: 'none', 
                        boxShadow: '0 2px 8px rgba(0, 102, 255, 0.25)',
                        '&:hover': { bgcolor: '#0052cc', boxShadow: '0 4px 12px rgba(0, 102, 255, 0.4)' } 
                      }}
                    >
                      Thêm vào giỏ
                    </Button>
                  </CardActions>
                </Card>
              </Grid>
            ))
          ) : (
             <Box sx={{ width: '100%', textAlign: 'center', py: 8 }}>
                <Typography variant="h6" color="text.secondary">
                  Không tìm thấy sản phẩm nào phù hợp!
                </Typography>
             </Box>
          )}
        </Grid>
      </Box>
    </Box>
  );
}