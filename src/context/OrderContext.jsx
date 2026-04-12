import React, { createContext, useState, useEffect } from 'react';

export const OrderContext = createContext();

// Ước tính thời gian giao hàng theo thành phố
const deliveryTimeEstimate = {
  'TP. Hồ Chí Minh': '1-2 ngày',
  'Hà Nội': '1-2 ngày',
  'Đà Nẵng': '2-3 ngày',
  'Hải Phòng': '2-3 ngày',
  'Cần Thơ': '2-4 ngày',
  'Khác': '3-5 ngày'
};

export const OrderProvider = ({ children }) => {
  const [orders, setOrders] = useState([]);
  const [savedAddresses, setSavedAddresses] = useState([]);

  // Load orders & saved addresses từ localStorage
  useEffect(() => {
    const savedOrders = localStorage.getItem('orders');
    if (savedOrders) {
      setOrders(JSON.parse(savedOrders));
    }
    const savedAddrs = localStorage.getItem('savedAddresses');
    if (savedAddrs) {
      setSavedAddresses(JSON.parse(savedAddrs));
    }
  }, []);

  // Lưu order khi giỏ hàng thanh toán
  const createOrder = (cartItems, userInfo, paymentMethod = 'cod') => {
    const deliveryDate = new Date();
    const timeRange = deliveryTimeEstimate[userInfo.city] || '3-5 ngày';
    const dayEstimate = parseInt(timeRange.split('-')[1]);
    deliveryDate.setDate(deliveryDate.getDate() + dayEstimate);

    const newOrder = {
      id: Date.now(),
      orderNumber: `ORD-${Date.now().toString().slice(-6)}`,
      orderDate: new Date().toLocaleDateString('vi-VN') + ' ' + new Date().toLocaleTimeString('vi-VN'),
      customer: userInfo,
      name: userInfo.name,
      email: userInfo.email,
      phone: userInfo.phone,
      address: userInfo.address,
      city: userInfo.city,
      zip: userInfo.zip || '',
      items: cartItems,
      total: cartItems.reduce((sum, item) => sum + item.price * item.quantity, 0),
      status: 'Chưa xử lý',
      paymentMethod,
      deliveryTime: timeRange,
      estimatedDelivery: deliveryDate.toLocaleDateString('vi-VN'),
      notes: ''
    };

    const updatedOrders = [...orders, newOrder];
    setOrders(updatedOrders);
    localStorage.setItem('orders', JSON.stringify(updatedOrders));

    // Lưu địa chỉ nếu chưa tồn tại
    saveSavedAddress(userInfo);

    return newOrder;
  };

  // Lưu địa chỉ đã sử dụng
  const saveSavedAddress = (addressInfo) => {
    const isDuplicate = savedAddresses.some(
      addr => addr.address === addressInfo.address && addr.city === addressInfo.city
    );
    if (!isDuplicate) {
      const updated = [...savedAddresses, addressInfo];
      setSavedAddresses(updated);
      localStorage.setItem('savedAddresses', JSON.stringify(updated));
    }
  };

  // Lấy các địa chỉ đã lưu
  const getSavedAddresses = () => {
    return savedAddresses;
  };

  // Cập nhật trạng thái đơn hàng
  const updateOrderStatus = (orderId, status, notes = '') => {
    const updatedOrders = orders.map(order =>
      order.id === orderId ? { ...order, status, notes } : order
    );
    setOrders(updatedOrders);
    localStorage.setItem('orders', JSON.stringify(updatedOrders));
  };

  // Xóa đơn hàng
  const deleteOrder = (orderId) => {
    const updatedOrders = orders.filter(order => order.id !== orderId);
    setOrders(updatedOrders);
    localStorage.setItem('orders', JSON.stringify(updatedOrders));
  };

  // Lấy đơn hàng của khách hàng theo email
  const getCustomerOrders = (email) => {
    return orders.filter(order => order.email === email || order.customer?.email === email);
  };

  // Lấy thống kê
  const getOrderStats = () => {
    return {
      totalOrders: orders.length,
      totalRevenue: orders.reduce((sum, order) => sum + order.total, 0),
      totalCustomers: new Set(orders.map(order => order.customer?.email)).size,
      pendingOrders: orders.filter(order => order.status === 'Chưa xử lý').length
    };
  };

  return (
    <OrderContext.Provider value={{ 
      orders, 
      createOrder, 
      updateOrderStatus, 
      deleteOrder,
      getOrderStats,
      getSavedAddresses,
      getCustomerOrders,
      deliveryTimeEstimate
    }}>
      {children}
    </OrderContext.Provider>
  );
};
