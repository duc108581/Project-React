// src/components/Footer.jsx
import React, { useState, useEffect } from 'react';
import { Box, Grid, Typography, Container, Divider, Link, Fab, Zoom } from '@mui/material';
import { KeyboardArrowUp } from '@mui/icons-material';

export default function Footer() {
  const [isVisible, setIsVisible] = useState(false);

  // 1. Logic theo dõi thao tác cuộn chuột để hiện/ẩn bong bóng
  useEffect(() => {
    const toggleVisibility = () => {
      // Hiện nút khi cuộn xuống quá 300px
      if (window.scrollY > 300) {
        setIsVisible(true);
      } else {
        setIsVisible(false);
      }
    };
    window.addEventListener('scroll', toggleVisibility);
    
    // Cleanup event listener khi component unmount
    return () => window.removeEventListener('scroll', toggleVisibility);
  }, []);

  // 2. Hàm xử lý cuộn mượt (smooth scroll) lên đầu trang
  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth'
    });
  };

  return (
    <Box sx={{ mt: 'auto' }}>
      
      {/* --- NÚT "BONG BÓNG" TRỞ LẠI ĐẦU - ĐÃ CHỈNH RA GIỮA --- */}
      <Zoom in={isVisible}>
        <Fab 
          onClick={scrollToTop}
          aria-label="scroll back to top"
          sx={{ 
            // Căn chỉnh vị trí
            position: 'fixed', 
            bottom: 30, // Cách đáy 30px
            left: '50%', // Đẩy lề trái ra giữa màn hình
            transform: 'translateX(-50%)', // Dịch ngược lại 50% độ rộng của nút để căn giữa chuẩn xác
            
            // Hiển thị & Thẩm mỹ
            zIndex: 9999, // Luôn nổi trên mọi nội dung khác
            bgcolor: '#0066ff', // Màu xanh thương hiệu
            color: 'white',
            boxShadow: '0 4px 16px rgba(0, 102, 255, 0.4)', // Đổ bóng tạo hiệu ứng nổi
            
            // Hiệu ứng khi tương tác (Hover)
            '&:hover': {
              bgcolor: '#ff5722', // Đổi sang màu cam bắt mắt
              // Giữ nguyên vị trí giữa và phóng to nhẹ
              transform: 'translateX(-50%) scale(1.1)' 
            },
            
            // Hiệu ứng chuyển cảnh mượt mà
            transition: 'all 0.3s ease-in-out'
          }}
        >
          <KeyboardArrowUp fontSize="large" />
        </Fab>
      </Zoom>

      {/* --- NỘI DUNG CHÍNH CỦA FOOTER --- */}
      <Box sx={{ bgcolor: '#0066ff', color: 'white' }}>
        <Container maxWidth="lg" sx={{ py: 6 }}>
          <Grid container spacing={4} justifyContent="space-between">
            
            {/* Cột 1: Về SmokerIT */}
            <Grid item xs={12} sm={6} md={3}>
              <Typography variant="h6" fontWeight="bold" mb={2} sx={{ fontSize: '18px' }}>
                Về SmokerIT
              </Typography>
              <Box sx={{ display: 'flex', flexDirection: 'column', gap: 1.5 }}>
                {["Về chúng tôi", "Tuyển dụng"].map((text) => (
                  <Link key={text} href="#" underline="none" sx={{ color: '#e0e0e0', fontSize: '15px', transition: '0.2s', '&:hover': { color: '#ffd814', transform: 'translateX(4px)' } }}>
                    {text}
                  </Link>
                ))}
              </Box>
            </Grid>
            
            {/* Cột 2: Chính sách */}
            <Grid item xs={12} sm={6} md={3}>
              <Typography variant="h6" fontWeight="bold" mb={2} sx={{ fontSize: '18px' }}>
                Chính sách
              </Typography>
              <Box sx={{ display: 'flex', flexDirection: 'column', gap: 1.5 }}>
                {["Chính sách bảo hành", "Chính sách đổi trả", "Chính sách bảo mật"].map((text) => (
                  <Link key={text} href="#" underline="none" sx={{ color: '#e0e0e0', fontSize: '15px', transition: '0.2s', '&:hover': { color: '#ffd814', transform: 'translateX(4px)' } }}>
                    {text}
                  </Link>
                ))}
              </Box>
            </Grid>

            {/* Cột 3: Hỗ trợ khách hàng */}
            <Grid item xs={12} sm={6} md={3}>
              <Typography variant="h6" fontWeight="bold" mb={2} sx={{ fontSize: '18px' }}>
                Hỗ trợ khách hàng
              </Typography>
              <Box sx={{ display: 'flex', flexDirection: 'column', gap: 1.5 }}>
                {["Hướng dẫn mua hàng", "Phương thức thanh toán", "Giao hàng & Lắp đặt", "Câu hỏi thường gặp"].map((text) => (
                  <Link key={text} href="#" underline="none" sx={{ color: '#e0e0e0', fontSize: '15px', transition: '0.2s', '&:hover': { color: '#ffd814', transform: 'translateX(4px)' } }}>
                    {text}
                  </Link>
                ))}
              </Box>
            </Grid>

            {/* Cột 4: Tổng đài hỗ trợ */}
            <Grid item xs={12} sm={6} md={3}>
              <Typography variant="h6" fontWeight="bold" mb={2} sx={{ fontSize: '18px' }}>
                Tổng đài hỗ trợ
              </Typography>
              <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
                <Box>
                  <Typography sx={{ color: '#b3d1ff', fontSize: '13px', textTransform: 'uppercase', fontWeight: 'bold' }}>
                    Hotline mua hàng:
                  </Typography>
                  <Typography sx={{ color: '#ffffff', fontSize: '18px', fontWeight: 'bold', mt: 0.5 }}>
                    0373.619.246
                  </Typography>
                </Box>
                <Box>
                  <Typography sx={{ color: '#b3d1ff', fontSize: '13px', textTransform: 'uppercase', fontWeight: 'bold' }}>
                    Email hỗ trợ:
                  </Typography>
                  <Typography sx={{ color: '#ffffff', fontSize: '15px', mt: 0.5 }}>
                    smokerittes@gmail.com
                  </Typography>
                </Box>
              </Box>
            </Grid>

          </Grid>
        </Container>

        <Divider sx={{ borderColor: 'rgba(255, 255, 255, 0.15)' }} />

        {/* --- Footer Bottom (Dòng bản quyền) --- */}
        <Box sx={{ py: 2.5, bgcolor: '#0040a8' }}>
          <Container maxWidth="lg" sx={{ textAlign: 'center' }}>
            <Typography variant="body2" sx={{ color: '#b3d1ff' }}>
              © 2026 SmokerIT. Tất cả các quyền được bảo lưu.
            </Typography>
          </Container>
        </Box>
      </Box>

    </Box>
  );
}