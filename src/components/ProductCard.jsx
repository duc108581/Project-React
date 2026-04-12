import React, { useState } from 'react';
import { Card, CardContent, CardActions, Typography, Button, Rating, Box, IconButton } from '@mui/material';
import { Link } from 'react-router-dom';
import { Favorite, FavoriteBorder } from '@mui/icons-material';

const ProductCard = ({ item, addToCart }) => {
  const [favorites, setFavorites] = useState(JSON.parse(localStorage.getItem('favorites') || '[]'));
  const isFavorite = favorites.includes(item.id);

  const toggleFavorite = (e) => {
    e.preventDefault();
    let updated = [...favorites];
    if (isFavorite) {
      updated = updated.filter(id => id !== item.id);
    } else {
      updated.push(item.id);
    }
    setFavorites(updated);
    localStorage.setItem('favorites', JSON.stringify(updated));
  };

  return (
    <Card 
      sx={{ 
        width: '100%',
        height: '100%',
        display: 'flex', 
        flexDirection: 'column',
        borderRadius: '8px',
        border: '1px solid #e2e8f0',
        transition: 'all 0.3s ease-in-out',
        position: 'relative',
        '&:hover': {
          transform: 'translateY(-4px)',
          boxShadow: '0 8px 24px rgba(0, 102, 255, 0.15)',
          borderColor: '#0066ff'
        }
      }}
    >
      {/* Nút Yêu Thích */}
      <IconButton
        onClick={toggleFavorite}
        sx={{
          position: 'absolute',
          top: 8,
          right: 8,
          bgcolor: 'rgba(255, 255, 255, 0.9)',
          zIndex: 10,
          '&:hover': { bgcolor: '#fff' }
        }}
      >
        {isFavorite ? (
          <Favorite sx={{ color: '#f44336', fontSize: '24px' }} />
        ) : (
          <FavoriteBorder sx={{ color: '#999', fontSize: '24px' }} />
        )}
      </IconButton>

      {/* Khu vực ảnh sản phẩm */}
      <Box sx={{ height: 200, display: 'flex', alignItems: 'center', justifyContent: 'center', p: 2, bgcolor: '#ffffff', flexShrink: 0 }}>
        <img 
          src={item.image} 
          alt={item.title} 
          style={{ maxHeight: '100%', maxWidth: '100%', objectFit: 'contain' }} 
        />
      </Box>

      {/* Khu vực nội dung */}
      <CardContent sx={{ flexGrow: 1, display: 'flex', flexDirection: 'column', p: 2, pt: 0 }}>
        
        {/* Tên sản phẩm */}
        <Typography 
          variant="subtitle1" 
          fontWeight="bold" 
          sx={{ 
            mb: 1,
            display: '-webkit-box',
            WebkitLineClamp: 2,
            WebkitBoxOrient: 'vertical',
            overflow: 'hidden',
            textOverflow: 'ellipsis',
            minHeight: '42px',
            lineHeight: 1.4,
            color: '#1a202c',
            fontSize: '14px'
          }}
        >
          {item.title}
        </Typography>

        {/* Đánh giá sao */}
        <Box sx={{ display: 'flex', alignItems: 'center', gap: 0.5, mb: 1 }}>
          <Rating value={item.rating || 4.5} readOnly size="small" precision={0.5} sx={{ color: '#faaf00' }}/>
          <Typography variant="caption" color="text.secondary" fontWeight="500">
            ({item.id * 12})
          </Typography>
        </Box>

        {/* Giá tiền */}
        <Typography variant="h6" fontWeight="bold" sx={{ mt: 'auto', color: '#d32f2f', fontSize: '17px' }}>
          {typeof item.price === 'number' ? item.price.toLocaleString() + ' đ' : item.price}
        </Typography>
      </CardContent>

      {/* Nút bấm */}
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
            fontWeight: 600, 
            fontSize: '13px',
            textTransform: 'none', 
            borderRadius: '6px',
            border: '1px solid #0066ff',
            '&:hover': { bgcolor: '#bbdefb', borderColor: '#0052cc' } 
          }}
        >
          Chi tiết cấu hình
        </Button>
        <Button 
          fullWidth 
          variant="contained" 
          onClick={() => addToCart(item)} 
          sx={{ 
            bgcolor: '#0066ff', 
            color: '#fff', 
            fontWeight: 'bold', 
            fontSize: '13px',
            textTransform: 'none', 
            borderRadius: '6px',
            boxShadow: '0 2px 8px rgba(0, 102, 255, 0.25)',
            '&:hover': { bgcolor: '#0052cc', boxShadow: '0 4px 12px rgba(0, 102, 255, 0.4)' } 
          }}
        >
          Thêm vào giỏ hàng
        </Button>
      </CardActions>
    </Card>
  );
};

export default ProductCard;