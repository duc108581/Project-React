import React, { useState, useEffect } from 'react';
import {
  Box, Button, Dialog, DialogTitle, DialogContent, DialogActions,
  TextField, Table, TableBody, TableCell, TableContainer, TableHead,
  TableRow, Paper, Card, Typography, Grid, IconButton, Chip,
  InputAdornment
} from '@mui/material';
import { Add, Delete, Edit, Search } from '@mui/icons-material';

export default function AdminProductManager() {
  const [products, setProducts] = useState([]);
  const [filteredProducts, setFilteredProducts] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [openDialog, setOpenDialog] = useState(false);
  const [editingId, setEditingId] = useState(null);
  const [formData, setFormData] = useState({
    title: '',
    price: '',
    category: '',
    brand: '',
    specs: '',
    desc: '',
    image: ''
  });

  // Load products
  useEffect(() => {
    const savedProducts = JSON.parse(localStorage.getItem('products') || '[]');
    if (savedProducts.length === 0) {
      // Load từ import
      import('../data/products').then(module => {
        setProducts(module.products);
        localStorage.setItem('products', JSON.stringify(module.products));
      });
    } else {
      setProducts(savedProducts);
    }
  }, []);

  // Filter products
  useEffect(() => {
    const filtered = products.filter(p =>
      p.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      p.brand.toLowerCase().includes(searchTerm.toLowerCase())
    );
    setFilteredProducts(filtered);
  }, [searchTerm, products]);

  // Open dialog for new product
  const handleAddProduct = () => {
    setEditingId(null);
    setFormData({
      title: '',
      price: '',
      category: '',
      brand: '',
      specs: '',
      desc: '',
      image: ''
    });
    setOpenDialog(true);
  };

  // Open dialog for edit
  const handleEditProduct = (product) => {
    setEditingId(product.id);
    setFormData(product);
    setOpenDialog(true);
  };

  // Save product
  const handleSaveProduct = () => {
    if (!formData.title || !formData.price || !formData.brand) {
      alert('Vui lòng điền đầy đủ thông tin bắt buộc');
      return;
    }

    let updatedProducts;
    if (editingId) {
      // Edit existing
      updatedProducts = products.map(p =>
        p.id === editingId ? { ...formData, id: editingId } : p
      );
    } else {
      // Add new
      updatedProducts = [...products, {
        ...formData,
        id: Math.max(...products.map(p => p.id), 0) + 1,
        price: parseInt(formData.price),
        rating: 4
      }];
    }

    setProducts(updatedProducts);
    localStorage.setItem('products', JSON.stringify(updatedProducts));
    setOpenDialog(false);
  };

  // Delete product
  const handleDeleteProduct = (id) => {
    if (window.confirm('Bạn chắc chắn muốn xóa sản phẩm này?')) {
      const updatedProducts = products.filter(p => p.id !== id);
      setProducts(updatedProducts);
      localStorage.setItem('products', JSON.stringify(updatedProducts));
    }
  };

  return (
    <Box>
      <Typography variant="h5" fontWeight="bold" sx={{ mb: 3 }}>
        Quản Lý Sản Phẩm ({filteredProducts.length})
      </Typography>

      {/* Search & Add Button */}
      <Box sx={{ mb: 3, display: 'flex', gap: 2 }}>
        <TextField
          placeholder="Tìm kiếm sản phẩm..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          InputProps={{
            startAdornment: <Search sx={{ mr: 1, color: 'gray' }} />
          }}
          sx={{ flex: 1 }}
        />
        <Button
          variant="contained"
          startIcon={<Add />}
          onClick={handleAddProduct}
          sx={{ bgcolor: '#4caf50' }}
        >
          Thêm Sản Phẩm
        </Button>
      </Box>

      {/* Products Table */}
      <TableContainer component={Paper}>
        <Table sx={{ minWidth: 650 }}>
          <TableHead sx={{ bgcolor: '#f5f5f5' }}>
            <TableRow>
              <TableCell><strong>ID</strong></TableCell>
              <TableCell><strong>Tên Sản Phẩm</strong></TableCell>
              <TableCell><strong>Thương Hiệu</strong></TableCell>
              <TableCell><strong>Danh Mục</strong></TableCell>
              <TableCell align="right"><strong>Giá</strong></TableCell>
              <TableCell><strong>Hành Động</strong></TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {filteredProducts.map((product) => (
              <TableRow key={product.id} hover>
                <TableCell>{product.id}</TableCell>
                <TableCell sx={{ fontWeight: 500 }}>
                  {product.title.substring(0, 40)}...
                </TableCell>
                <TableCell>
                  <Chip label={product.brand} size="small" />
                </TableCell>
                <TableCell>
                  <Chip label={product.category} size="small" variant="outlined" />
                </TableCell>
                <TableCell align="right" sx={{ fontWeight: 'bold', color: '#ff5722' }}>
                  {product.price.toLocaleString('vi-VN')}₫
                </TableCell>
                <TableCell>
                  <IconButton
                    size="small"
                    color="primary"
                    onClick={() => handleEditProduct(product)}
                  >
                    <Edit fontSize="small" />
                  </IconButton>
                  <IconButton
                    size="small"
                    color="error"
                    onClick={() => handleDeleteProduct(product.id)}
                  >
                    <Delete fontSize="small" />
                  </IconButton>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>

      {/* Add/Edit Dialog */}
      <Dialog open={openDialog} onClose={() => setOpenDialog(false)} maxWidth="sm" fullWidth>
        <DialogTitle>
          {editingId ? 'Chỉnh Sửa Sản Phẩm' : 'Thêm Sản Phẩm Mới'}
        </DialogTitle>
        <DialogContent sx={{ pt: 2 }}>
          <TextField
            fullWidth
            label="Tên Sản Phẩm *"
            value={formData.title}
            onChange={(e) => setFormData({ ...formData, title: e.target.value })}
            sx={{ mb: 2 }}
          />
          <TextField
            fullWidth
            label="Thương Hiệu *"
            value={formData.brand}
            onChange={(e) => setFormData({ ...formData, brand: e.target.value })}
            sx={{ mb: 2 }}
          />
          <TextField
            fullWidth
            label="Danh Mục"
            value={formData.category}
            onChange={(e) => setFormData({ ...formData, category: e.target.value })}
            sx={{ mb: 2 }}
          />
          <TextField
            fullWidth
            label="Giá *"
            type="number"
            value={formData.price}
            onChange={(e) => setFormData({ ...formData, price: e.target.value })}
            sx={{ mb: 2 }}
          />
          <TextField
            fullWidth
            label="Thông Số Kỹ Thuật"
            multiline
            rows={2}
            value={formData.specs}
            onChange={(e) => setFormData({ ...formData, specs: e.target.value })}
            sx={{ mb: 2 }}
          />
          <TextField
            fullWidth
            label="Mô Tả"
            multiline
            rows={3}
            value={formData.desc}
            onChange={(e) => setFormData({ ...formData, desc: e.target.value })}
            sx={{ mb: 2 }}
          />
          <TextField
            fullWidth
            label="URL Hình Ảnh"
            value={formData.image}
            onChange={(e) => setFormData({ ...formData, image: e.target.value })}
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setOpenDialog(false)}>Hủy</Button>
          <Button onClick={handleSaveProduct} variant="contained" sx={{ bgcolor: '#4caf50' }}>
            {editingId ? 'Cập Nhật' : 'Thêm'}
          </Button>
        </DialogActions>
      </Dialog>
    </Box>
  );
}
