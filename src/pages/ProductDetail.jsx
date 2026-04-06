// src/pages/ProductDetail.jsx
import React, { useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { 
  Box, Grid, Typography, Rating, Paper, Button, Divider, 
  Container, Chip, Card, CardMedia, CardContent, CardActions 
} from '@mui/material';
import { products } from '../data/products';
import { LocalShipping, Security, Replay, CheckCircle } from '@mui/icons-material';

export default function ProductDetail({ addToCart }) {
  const { id } = useParams();
  
  // Mỗi lần đổi URL (bấm vào sản phẩm tương tự), cuộn lên đầu trang
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [id]);

  // Tìm sản phẩm hiện tại
  const product = products.find(p => p.id === parseInt(id));
  
  // THUẬT TOÁN GỢI Ý: Tìm các sản phẩm cùng danh mục, loại trừ sản phẩm đang xem, lấy 4 cái đầu tiên
  const similarProducts = products
    .filter(p => p.category === product?.category && p.id !== product?.id)
    .slice(0, 4);

  // Hàm xử lý lỗi load ảnh
  const handleImageError = (e, brand, category) => {
    const categoryColor = {
      'Văn phòng': '3498DB',
      'Gaming': 'E74C3C',
      'Đồ họa': '2ECC71',
      'Phụ kiện': 'F39C12'
    };
    const color = categoryColor[category] || '9B59B6';
    e.target.src = `https://via.placeholder.com/450x450/${color}/FFFFFF?text=${encodeURIComponent(brand)}`;
    e.target.style.backgroundColor = '#f0f0f0';
  };

  if (!product) {
    return (
      <Container sx={{ textAlign: 'center', py: 10 }}>
        <Typography variant="h5">Rất tiếc, không tìm thấy sản phẩm!</Typography>
        <Button variant="contained" component={Link} to="/" sx={{ mt: 3, bgcolor: '#0066ff' }}>
          Quay lại Trang chủ
        </Button>
      </Container>
    );
  }

  return (
    <Container maxWidth="lg" sx={{ py: 5 }}>
      {/* KHU VỰC CHI TIẾT SẢN PHẨM CHÍNH */}
      <Paper elevation={0} sx={{ p: { xs: 2, md: 4 }, borderRadius: 3, border: '1px solid #eee' }}>
        <Grid container spacing={5}>
          {/* CỘT TRÁI: ẢNH */}
          <Grid item xs={12} md={5}>
            <Box sx={{ width: '100%', borderRadius: 2, overflow: 'hidden', bgcolor: '#fff', border: '1px solid #f5f5f5' }}>
              <img 
                src={product.image} 
                alt={product.title} 
                style={{ width: '100%', height: 'auto', objectFit: 'contain' }}
                onError={(e) => handleImageError(e, product.brand, product.category)}
              />
            </Box>
          </Grid>

          {/* CỘT PHẢI: THÔNG TIN */}
          <Grid item xs={12} md={7}>
            <Typography variant="h4" fontWeight="bold" gutterBottom>
              {product.title}
            </Typography>

            <Box sx={{ display: 'flex', alignItems: 'center', gap: 2, mb: 2 }}>
              <Rating value={product.rating || 5} readOnly precision={0.5} size="small" />
              <Typography variant="body2" color="text.secondary">
                (Đã bán {product.sold || 120}+)
              </Typography>
              <Chip label={product.category} color="primary" size="small" variant="outlined" />
            </Box>

            <Typography variant="h4" color="#d32f2f" fontWeight="bold" sx={{ my: 3 }}>
              {product.price.toLocaleString()} đ
            </Typography>

            <Typography variant="body1" paragraph color="text.secondary" sx={{ lineHeight: 1.8 }}>
              {product.description || "Sản phẩm công nghệ cao cấp phân phối chính hãng tại SmokerIT. Hiệu năng vượt trội, thiết kế sang trọng, đáp ứng mọi nhu cầu từ học tập, làm việc đến giải trí đỉnh cao."}
            </Typography>

            <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2, my: 4 }}>
              <Button
                variant="contained"
                onClick={() => addToCart(product)}
                sx={{
                  bgcolor: '#0066ff', color: '#fff', fontWeight: 600, py: 1.5,
                  '&:hover': { bgcolor: '#0052cc' }
                }}
              >
                🛒 Thêm vào giỏ hàng
              </Button>
              <Button
                variant="contained"
                component={Link}
                to="/cart"
                sx={{
                  bgcolor: '#ff5722', color: '#fff', fontWeight: 600, py: 1.5,
                  '&:hover': { bgcolor: '#e64a19' }
                }}
              >
                💳 Mua ngay
              </Button>
            </Box>
          </Grid>
        </Grid>
      </Paper>

      {/* KHU VỰC SẢN PHẨM TƯƠNG TỰ (AI GỢI Ý) */}
      {similarProducts.length > 0 && (
        <Box sx={{ mt: 8 }}>
          <Typography 
            variant="h5" 
            fontWeight="bold" 
            mb={4} 
            sx={{ 
              borderLeft: '5px solid #ff5722', 
              pl: 2,
              background: 'linear-gradient(90deg, #ff8a00, #e52e71)',
              WebkitBackgroundClip: 'text',
              WebkitTextFillColor: 'transparent'
            }}
          >
            ✨ Có thể bạn sẽ thích (Sản phẩm cùng danh mục)
          </Typography>
          
          <Grid container spacing={3}>
            {similarProducts.map((item) => (
              <Grid item xs={12} sm={6} md={3} key={item.id}>
                <Card 
                  sx={{ 
                    height: '100%', 
                    display: 'flex', 
                    flexDirection: 'column',
                    transition: 'transform 0.2s',
                    '&:hover': { transform: 'translateY(-5px)', boxShadow: 6 }
                  }}
                >
                  <Link to={`/product/${item.id}`} style={{ textDecoration: 'none', color: 'inherit' }}>
                    <CardMedia
                      component="img"
                      height="200"
                      image={item.image}
                      alt={item.title}
                      sx={{ objectFit: 'contain', p: 2, bgcolor: '#f9f9f9' }}
                      onError={(e) => handleImageError(e, item.brand, item.category)}
                    />
                    <CardContent sx={{ flexGrow: 1 }}>
                      <Typography variant="body1" fontWeight="bold" noWrap>
                        {item.title}
                      </Typography>
                      <Typography variant="h6" color="#d32f2f" sx={{ mt: 1 }}>
                        {item.price.toLocaleString()} đ
                      </Typography>
                    </CardContent>
                  </Link>
                  <CardActions>
                    <Button 
                      size="small" 
                      fullWidth 
                      variant="outlined"
                      onClick={() => addToCart(item)}
                      sx={{ color: '#0066ff', borderColor: '#0066ff' }}
                    >
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
}