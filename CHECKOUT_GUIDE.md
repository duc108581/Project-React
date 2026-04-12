# 📦 Hướng Dẫn Chi Tiết Đơn Hàng & Lịch Sử Mua Hàng

## ✨ Tính Năng Mới Được Thêm

### 1. 📍 Gợi Ý Địa Chỉ Trước Đây
- **Vị trí**: Trang Checkout
- **Mô tả**: 
  - Khi khách hàng đã từng mua hàng, hệ thống sẽ gợi ý các địa chỉ đã lưu
  - Chỉ cần 1 click để chọn lại địa chỉ cũ
  - Tiết kiệm thời gian nhập thông tin

**Cách sử dụng**:
1. Vào trang Checkout
2. Ở phần "📍 Địa chỉ đã sử dụng trước đây"
3. Bấm nút địa chỉ muốn chọn
4. Các trường sẽ tự động điền

### 2. ⏱️ Ước Tính Thời Gian Giao Hàng
- **Vị trí**: Trang Checkout (bên phải)
- **Tính năng**:
  - Thay đổi tự động dựa trên thành phố được chọn
  - Hiển thị thời gian giao ("1-2 ngày", "2-3 ngày", v.v.)
  - Tính toán ngày dự kiến giao hàng
  - Color gradient card nhân mạnh

**Thời gian giao theo thành phố**:
| Thành phố | Thời gian |
|-----------|-----------|
| TP. Hồ Chí Minh | 1-2 ngày |
| Hà Nội | 1-2 ngày |
| Đà Nẵng | 2-3 ngày |
| Hải Phòng | 2-3 ngày |
| Cần Thơ | 2-4 ngày |
| Khác | 3-5 ngày |

### 3. 📋 Giỏ Hàng Hiển Thị Thông Tin Tài Khoản
- **Vị trí**: Trang Cart (phía trên)
- **Hiển thị**:
  - 👤 Tên tài khoản
  - 📧 Email
  - 📦 Nút "Lịch Sử Đơn Hàng"

**Ví dụ**:
```
Đang mua sắm với tài khoản:
👤 Nguyễn Văn A
📧 nguyenvana@gmail.com
[Nút: 📦 Lịch Sử Đơn Hàng]
```

### 4. 🛍️ Lịch Sử Đơn Hàng Khách Hàng
- **Route**: `/my-orders`
- **Cách truy cập**:
  1. Bấm nút "📦 Lịch Sử Đơn Hàng" trong Cart
  2. Hoặc tài khoản phải đăng nhập

**Thông tin hiển thị**:
- **Mã đơn hàng**: ORD-xxxxxx (duy nhất)
- **Ngày đặt**: Ngày/Tháng/Năm
- **Trạng thái**: 5 trạng thái (Chưa xử lý, Đã xác nhận, v.v.)
- **Thời gian giao**: 1-2 ngày, 2-3 ngày, ...
- **Dự kiến giao vào**: Ngày cụ thể
- **Tổng tiền**: Giá (VNĐ)

### 5. 📖 Chi Tiết Đơn Hàng
- **Bấm nút**: "Chi Tiết" trên mỗi đơn hàng
- **Mở Dialog** với thông tin toàn bộ:

```
📋 Chi Tiết Đơn Hàng #ORD-xxxxx

👤 Thông Tin Khách Hàng:
├── Tên: Nguyễn Văn A
├── Email: nguyenvana@gmail.com
├── Điện Thoại: 0123456789
└── Phương Thức Thanh Toán: COD/Chuyển khoản

📍 Địa Chỉ Giao Hàng:
├── Địa chỉ: 123 Đường ABC, Quận 1
├── Thành phố: TP. Hồ Chí Minh
└── Mã Bưu Điện: 700000

🚚 Thông Tin Giao Hàng:
├── Trạng Thái: Đang giao
├── Thời Gian Giao: 1-2 ngày
├── Ngày Đặt Hàng: 12/04/2026 10:30:00
└── Dự Kiến Giao: 13/04/2026

🛍️ Sản Phẩm Đã Mua:
├── Sản phẩm 1 x2 = 50,000,000₫
├── Sản phẩm 2 x1 = 30,000,000₫
└── TỔNG CỘNG: 80,000,000₫
```

### 6. 💾 Lưu Trữ Thông Tin
- **Đã lưu**:
  - ✅ Danh sách địa chỉ đã sử dụng
  - ✅ Tất cả đơn hàng của khách
  - ✅ Chi tiết từng đơn hàng
  - ✅ Thời gian giao dự kiến

- **Lưu vị trí**: localStorage
  - `orders` - Tất cả đơn hàng
  - `savedAddresses` - Địa chỉ đã lưu

## 🎯 Luồng Mua Hàng Hoàn Chỉnh

```
1. Khách chọn sản phẩm
   ↓
2. Bấm "Thêm vào giỏ"
   ↓
3. Vào Cart, thấy thông tin tài khoản
   ↓
4. Bấm "Thanh toán"
   ↓
5. Checkout: 
   - Hệ thống gợi ý địa chỉ cũ
   - Hiển thị thời gian giao (cập nhật theo thành phố)
   ↓
6. Nhập thông tin (hoặc chọn địa chỉ cũ)
   ↓
7. Chọn phương thức thanh toán
   ↓
8. Bấm "Đặt Hàng Ngay"
   ↓
9. Nhấn "Về Trang Chủ"
   ↓
10. Lần sau vào Cart → "Lịch Sử Đơn Hàng"
    - Xem tất cả đơn hàng
    - Bấm "Chi Tiết" để xem chi tiết từng đơn
```

## 📱 Giao Diện Chi Tiết

### Trang Cart - Phần Thông Tin Tài Khoản
```
┌─────────────────────────────────────────┐
│  👤 Đang mua sắm với tài khoản:         │
│     Nguyễn Văn A                        │
│     nguyenvana@gmail.com                │
│                   [📦 Lịch Sử Đơn Hàng] │
└─────────────────────────────────────────┘
```

### Trang Checkout - Delivery Info
```
┌─────────────────────────────────────────┐
│  🚚 Thông Tin Giao Hàng                │
│                                         │
│  ⏱️ Thời gian giao dự kiến: 1-2 ngày  │
│  📅 Dự kiến giao vào: 13/04/2026       │
│  ✈️ Miễn phí vận chuyển toàn quốc      │
└─────────────────────────────────────────┘
```

### Trang My Orders - Danh Sách Đơn
```
┌─────────────────────────────────────────┐
│ #ORD-123456 | 12/04 | ✓ Đang giao      │
│ 1-2 ngày | 50,000,000₫                 │
│ [Chi Tiết]  [Theo Dõi]                 │
├─────────────────────────────────────────┤
│ #ORD-123455 | 10/04 | ✓ Đã giao        │
│ 1-2 ngày | 30,000,000₫                 │
│ [Chi Tiết]                              │
└─────────────────────────────────────────┘
```

## 🔍 Tìm Kiếm trong Lịch Sử
- Tìm theo **Email khách hàng**
- Tìm theo **Tên khách hàng**
- Tìm theo **Mã đơn hàng (ID)**

Ví dụ: Gõ "nguyenvana" → Hiện tất cả đơn của người này

## 💡 Ghi Chú Quan Trọng

1. **Dữ liệu Tạm Thời**:
   - Lưu trong localStorage của browser
   - Nếu clear cache → sẽ mất dữ liệu
   - Để lưu vĩnh viễn cần kết nối Backend

2. **Phương Thức Thanh Toán**:
   - **COD**: Thanh toán khi nhận hàng
   - **Transfer**: Chuyển khoản trước

3. **Thời Gian Giao Dự Kiến**:
   - Tính từ ngày đặt hàng
   - Không tính thứ 7, chủ nhật (theo thực tế công ty shipping)
   - Chỉ mang tính chất ước tính

4. **Địa Chỉ Gợi Ý**:
   - Không lặp lại địa chỉ
   - Lưu tự động sau mỗi order thành công

## ✅ Checklis Thiết Lập Người Dùng

- [ ] Đăng nhập tài khoản khách
- [ ] Thêm sản phẩm vào giỏ
- [ ] Vào Cart, kiểm tra thông tin tài khoản
- [ ] Bấm "Lịch Sử Đơn Hàng" (nếu chưa có order)
- [ ] Thanh toán một đơn hàng
- [ ] Vào "Lịch Sử Đơn Hàng" để xem
- [ ] Bấm "Chi Tiết" để xem toàn bộ thông tin
- [ ] Thanh toán lần 2 với địa chỉ khác
- [ ] Kiểm tra địa chỉ cũ được gợi ý
- [ ] Kiểm tra thời gian giao hàng thay đổi

---

**Status**: ✅ Hoàn Thành  
**Version**: 2.0  
**Last Update**: 12/04/2026
