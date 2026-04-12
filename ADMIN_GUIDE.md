# 🔐 Hướng Dẫn Quản Trị Admin

## 📋 Tài Khoản Admin

- **Email**: `admin@ecommerce.com`
- **Mật khẩu**: `admin123456`

## 🚀 Cách Truy Cập Admin Panel

### Phương pháp 1: Qua nút Admin trên Header
1. Khi truy cập website, bấm nút **🔐 Admin** ở góc trên cùng bên phải
2. Bạn sẽ được dẫn đến trang đăng nhập Admin
3. Nhập email và mật khẩu mặc định ở trên

### Phương pháp 2: Trực tiếp từ URL
- Truy cập: `http://localhost:5173/admin/login`

### Phương pháp 3: Dashboard trực tiếp (nếu đã đăng nhập)
- URL: `http://localhost:5173/admin/dashboard`

## 📊 Tính Năng Admin

### 1️⃣ **Dashboard Tổng Quan**
- 📈 **Thống kê doanh thu**: Xem tổng doanh thu từ tất cả đơn hàng
- 🛒 **Tổng đơn hàng**: Số lượng đơn hàng đã nhận
- 👥 **Số khách hàng**: Tổng số khách hàng khác nhau
- ⏳ **Đơn hàng chưa xử lý**: Số đơn hàng cần xử lý ngay

### 2️⃣ **Quản Lý Sản Phẩm**

#### Thêm sản phẩm mới:
1. Bấm nút **+ Thêm Sản Phẩm**
2. Điền các thông tin:
   - **Tên Sản Phẩm** *(bắt buộc)*
   - **Thương Hiệu** *(bắt buộc)*
   - **Danh Mục** (ví dụ: Gaming, Văn Phòng, Đồ họa)
   - **Giá** *(bắt buộc)* - Tính bằng VNĐ
   - **Thông Số Kỹ Thuật** (ví dụ: 16GB RAM, 512GB SSD)
   - **Mô Tả** (tiêu đề ngắn, mô tả sản phẩm)
   - **URL Hình Ảnh** (link hình ảnh sản phẩm)
3. Bấm **Thêm** để lưu

#### Chỉnh sửa sản phẩm:
1. Tìm kiếm sản phẩm bằng thanh tìm kiếm
2. Bấm biểu tượng **✏️** để chỉnh sửa
3. Thay đổi thông tin cần thiết
4. Bấm **Cập Nhật**

#### Xóa sản phẩm:
1. Tìm sản phẩm cần xóa
2. Bấm biểu tượng **🗑️** (Xóa)
3. Xác nhận xóa trong hộp thoại

### 3️⃣ **Quản Lý Đơn Hàng**

#### Xem chi tiết đơn hàng:
1. Vào mục **Quản Lý Đơn Hàng**
2. Bấm nút **Chi Tiết** trên đơn hàng bất kỳ
3. Xem:
   - Thông tin khách hàng
   - Danh sách sản phẩm đã mua
   - Tổng tiền

#### Cập nhật trạng thái đơn hàng:
1. Bấm nút **Cập Nhật** trên đơn hàng
2. Chọn trạng thái mới từ dropdown:
   - ⚪ **Chưa xử lý** - Vừa nhận đơn
   - 🔵 **Đã xác nhận** - Xác nhận đơn hàng
   - 🟡 **Đang giao** - Đơn hàng đang được giao
   - 🟢 **Đã giao** - Đã giao thành công
   - ❌ **Đã hủy** - Hủy đơn hàng
3. Bấm **Cập Nhật**

#### Xóa đơn hàng:
1. Bấm nút **Xóa** trên đơn hàng
2. Xác nhận xóa

#### Tìm kiếm đơn hàng:
- Tìm kiếm theo **Email khách hàng**
- Tìm kiếm theo **Tên khách hàng**
- Tìm kiếm theo **Mã đơn hàng (ID)**

## 💾 Lưu Trữ Dữ Liệu

- **Sản phẩm**: Được lưu trong `localStorage` (tên khóa: `products`)
- **Đơn hàng**: Được lưu trong `localStorage` (tên khóa: `orders`)
- **Thông tin Admin**: Được lưu trong `localStorage` (tên khóa: `adminUser`)

⚠️ **Lưu ý**: Dữ liệu trong localStorage sẽ bị xóa nếu:
- Clear cache của browser
- Sử dụng Incognito/Private mode
- Xóa dữ liệu trang web

## 🔒 Tính Năng Bảo Mật

- ✅ Admin Dashboard được bảo vệ - Cần đăng nhập mới có thể truy cập
- ✅ Bấm **Đăng Xuất** sẽ xóa phiên người dùng
- ✅ Tự động đăng xuất khi tắt browser (vì sử dụng session)

## 📱 Giao Diện Responsive

- ✅ Desktop: Full layout với sidebar
- ✅ Mobile: Hiển thị menu Hamburger
- ✅ Tablet: Bố cục tối ưu

## 🎯 Các Thao Tác Nhanh

Trên Dashboard tổng quan có các nút:
- **+ Thêm Sản Phẩm** - Nhanh chóng thêm sản phẩm mới
- **Xem Đơn Hàng** - Xem tất cả đơn hàng hiện tại

## ❓ Câu Hỏi Thường Gặp

**Q: Tôi quên mật khẩu admin phải làm sao?**  
A: Mật khẩu admin cứng trong code. Bạn có thể thay đổi nó trong file `src/context/AdminContext.jsx`

**Q: Làm sao để backup dữ liệu?**  
A: Sử dụng DevTools (F12) > Application > Local Storage để xem và export dữ liệu

**Q: Tôi có thể tạo nhiều tài khoản admin được không?**  
A: Hiện tại chỉ có 1 tài khoản mặc định. Để thêm, cần chỉnh sửa code trong `AdminContext.jsx`

**Q: Dữ liệu sản phẩm mới sẽ đảo file không?**  
A: Không, dữ liệu lưu trong `localStorage` của browser. Để lưu vĩnh viễn, cần kết nối Backend/Database

---

**Happy Managing! 🚀**
