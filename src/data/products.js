// Hàm tạo URL placeholder cho hình ảnh sản phẩm
const placeholderImage = (productId, category = "laptop") => {
  const colors = ["E74C3C", "3498DB", "2ECC71", "F39C12", "9B59B6", "1ABC9C", "E67E22", "34495E"];
  const colorIndex = (productId - 1) % colors.length;
  const brandNames = ["Apple", "ASUS", "Dell", "Lenovo", "HP", "Acer", "MSI", "Razer", "Microsoft", "Gigabyte"];
  const brandName = brandNames[Math.floor((productId - 1) / 7) % brandNames.length];
  return `https://via.placeholder.com/200x200/${colors[colorIndex]}/FFFFFF?text=${encodeURIComponent(brandName + " " + productId)}`;
};

export const products = [
  // ================= APPLE (7 Sản phẩm) =================
  { id: 1, brand: "Apple", category: "Văn phòng", title: "Apple MacBook Pro 14-inch (M3 Pro)", price: 49990000, rating: 5, image: "/image/m3pro.webp", specs: "18GB RAM, 512GB SSD, Space Black", desc: "Chip M3 Pro mạnh mẽ, Màn hình Liquid Retina XDR, Pin 18 tiếng." },
  { id: 2, brand: "Apple", category: "Văn phòng", title: "Apple MacBook Air 13.6-inch (M2)", price: 26490000, rating: 4, image: "/image/M2.webp", specs: "8GB RAM, 256GB SSD, Starlight", desc: "Siêu mỏng nhẹ, Màn hình Liquid Retina, Phù hợp sinh viên." },
  { id: 3, brand: "Apple", category: "Văn phòng", title: "Apple MacBook Pro 16-inch (M3 Max)", price: 89990000, rating: 5, image: "/image/m3pro.webp", specs: "36GB RAM, 1TB SSD, Silver", desc: "Quái vật đồ họa, Ram cực khủng, Pin trâu." },
  { id: 4, brand: "Apple", category: "Văn phòng", title: "Apple MacBook Pro 13-inch (M2)", price: 31500000, rating: 4, image: "/image/M2.webp", specs: "8GB RAM, 512GB SSD, Space Gray", desc: "Chip M2 ổn định, Phù hợp dân văn phòng." },
  { id: 5, brand: "Apple", category: "Văn phòng", title: "Apple MacBook Air 15-inch (M3)", price: 32990000, rating: 5, image: "/image/m3pro.webp", specs: "16GB RAM, 512GB SSD, Midnight", desc: "Màn hình lớn hơn, Hiệu suất M3 ấn tượng." },
  { id: 6, brand: "Apple", category: "Đồ họa", title: "Apple MacBook Pro 14-inch (M3 Max)", price: 78500000, rating: 5, image: "/image/m3pro.webp", specs: "36GB RAM, 1TB SSD", desc: "Sức mạnh tối thượng trong thân hình nhỏ gọn." },
  { id: 7, brand: "Apple", category: "Văn phòng", title: "Apple MacBook Air 13-inch (M1)", price: 18490000, rating: 5, image: "/image/m1.webp", specs: "8GB RAM, 256GB SSD", desc: "Huyền thoại quốc dân, p/p ngon nhất hiện tại." },

  // ================= ASUS (8 Sản phẩm) =================
  { id: 8, brand: "ASUS", category: "Gaming", title: "ASUS ROG Strix G16 (2024)", price: 36900000, rating: 5, image: "/image/g16.webp", specs: "Core i7-13650HX, RTX 4060, 16GB RAM", desc: "Tản nhiệt 3 quạt siêu mát, LED RGB quanh máy." },
  { id: 9, brand: "ASUS", category: "Đồ họa", title: "ASUS Zenbook Pro 14 OLED", price: 52990000, rating: 5, image: "/image/14pro.webp", specs: "Core i9, RTX 4070, 32GB RAM", desc: "Màn OLED chuẩn màu điện ảnh, DialPad thông minh." },
  { id: 10, brand: "ASUS", category: "Văn phòng", title: "ASUS Vivobook S 15 OLED", price: 23500000, rating: 4, image: "/image/s15.webp", specs: "Ultra 7, 16GB RAM, 1TB SSD", desc: "Tích hợp NPU xử lý AI mượt mà." },
  { id: 11, brand: "ASUS", category: "Gaming", title: "ASUS TUF Gaming A15", price: 25500000, rating: 4, image: "/image/a15.webp", specs: "Ryzen 7, RTX 4050, 16GB RAM", desc: "Độ bền chuẩn quân đội MIL-STD." },
  { id: 12, brand: "ASUS", category: "Gaming", title: "ASUS ROG Zephyrus G14", price: 47500000, rating: 5, image: "/image/g141.webp", specs: "Ryzen 9, RTX 4070", desc: "Laptop gaming 14-inch mạnh nhất thế giới." },
  { id: 13, brand: "ASUS", category: "Văn phòng", title: "Asus Vivobook Ultra 5", price: 17500000, rating: 5, image: "/image/f16.webp", specs: "Core i7, 16GB, 1TB", desc: "Siêu nhẹ chỉ 880g, pin 24 tiếng." },
  { id: 14, brand: "ASUS", category: "Đồ họa", title: "Laptop Asus Vivobook Gaming ", price: 28900000, rating: 5, image: "/image/studio.webp", specs: "Core i9, RTX 3000 Ada", desc: "Máy trạm di động cho 3D Creator." },
  { id: 15, brand: "ASUS", category: "Gaming", title: "ASUS ROG Flow X13", price: 38500000, rating: 4, image: "/image/x13.webp", specs: "Ryzen 9, RTX 3050Ti", desc: "Laptop gaming xoay gập 360 độ độc đáo." },

  // ================= DELL (7 Sản phẩm) =================
  { id: 16, brand: "Dell", category: "Văn phòng", title: "Dell XPS 15 9530", price: 45900000, rating: 5, image: "/image/9530.webp", specs: "Core i7-13700H, 16GB RAM, 512GB SSD", desc: "Viền màn hình siêu mỏng, vỏ nhôm nguyên khối." },
  { id: 17, brand: "Dell", category: "Văn phòng", title: "Dell Inspiron 15 3520", price: 13500000, rating: 4, image: "/image/15.webp", specs: "Core i5-1235U, 8GB RAM, 256GB SSD", desc: "Đáng tin cậy cho công việc và học tập." },
  { id: 18, brand: "Dell", category: "Gaming", title: "Dell Alienware m16 R2", price: 54900000, rating: 5, image: "/image/a16.webp", specs: "Core Ultra 7, RTX 4070, 16GB RAM", desc: "Thiết kế ngoài hành tinh, tản nhiệt buồng hơi." },
  { id: 19, brand: "Dell", category: "Gaming", title: "Dell G15 5530", price: 26500000, rating: 4, image: "/image/g15.webp", specs: "Core i7-13650HX, RTX 4050, 16GB RAM", desc: "Tiểu Alienware với giá thành dễ tiếp cận." },
  { id: 20, brand: "Dell", category: "Đồ họa", title: "Dell Precision 5680", price: 68500000, rating: 5, image: "/image/5680.jpg", specs: "Core i9, RTX 3500 Ada, 32GB RAM", desc: "Máy trạm đồ họa chuyên nghiệp ISV Certified." },
  { id: 21, brand: "Dell", category: "Văn phòng", title: "Dell Latitude 7440", price: 32900000, rating: 4, image: "/image/7440.webp", specs: "Core i7, 16GB, 512GB", desc: "Dòng doanh nhân bền bỉ, bảo mật vân tay." },
  { id: 22, brand: "Dell", category: "Văn phòng", title: "Dell Vostro 5630", price: 21500000, rating: 4, image: "/image/5630.webp", specs: "Core i5-1340P, 16GB, 512GB", desc: "Màn hình 16 inch rộng rãi cho Excel." },

  // ================= LENOVO (8 Sản phẩm) =================
  { id: 23, brand: "Lenovo", category: "Gaming", title: "Lenovo Legion Pro 5i", price: 38500000, rating: 5, image: "/image/5pro.webp", specs: "Core i7-13700HX, RTX 4060", desc: "Tản nhiệt Coldfront 5.0 ngon nhất tầm giá." },
  { id: 24, brand: "Lenovo", category: "Gaming", title: "Lenovo LOQ 15", price: 23500000, rating: 4, image: "/image/loq15.jpg", specs: "Ryzen 7 7840HS, RTX 4050", desc: "Hậu duệ dòng IdeaPad Gaming, thiết kế cực đẹp." },
  { id: 25, brand: "Lenovo", category: "Văn phòng", title: "Lenovo ThinkPad X1 Carbon Gen 11", price: 42500000, rating: 5, image: "/image/x1.webp", specs: "Core i7, 16GB RAM, 512GB SSD", desc: "Bàn phím gõ sướng nhất thế giới laptop." },
  { id: 26, brand: "Lenovo", category: "Văn phòng", title: "Lenovo IdeaPad Slim 5", price: 16900000, rating: 4, image: "/image/sl15.webp", specs: "Core i5-1335U, 16GB RAM", desc: "Vỏ nhôm cao cấp, pin dung lượng lớn." },
  { id: 27, brand: "Lenovo", category: "Đồ họa", title: "Lenovo Yoga Pro 9i", price: 46900000, rating: 5, image: "/image/7pro.webp", specs: "Core i9, RTX 4060, Màn MiniLED", desc: "Màn hình 3K siêu sáng cho dân thiết kế." },
  { id: 28, brand: "Lenovo", category: "Văn phòng", title: "Lenovo ThinkBook 14 G6", price: 18500000, rating: 4, image: "/image/g6.webp", specs: "Ryzen 5, 16GB, 512GB", desc: "Thiết kế 2 tông màu bạc sang trọng." },
  { id: 29, brand: "Lenovo", category: "Gaming", title: "Lenovo Legion 9i", price: 115000000, rating: 5, image: "/image/7pro.webp", specs: "Core i9, RTX 4090", desc: "Tản nhiệt nước tích hợp bên trong máy." },
  { id: 30, brand: "Lenovo", category: "Đồ họa", title: "Lenovo ThinkPad P16s", price: 39500000, rating: 5, image: "/image/p15.webp", specs: "Ryzen 7 Pro, 32GB RAM", desc: "Máy trạm mỏng nhẹ di động." },

  // ================= HP (7 Sản phẩm) =================
  { id: 31, brand: "HP", category: "Văn phòng", title: "HP Envy x360 2-in-1", price: 21500000, rating: 4, image: "/image/x360.webp", specs: "Ryzen 7 7730U, 16GB RAM", desc: "Màn hình cảm ứng xoay gập tiện lợi." },
  { id: 32, brand: "HP", category: "Gaming", title: "HP OMEN 16", price: 37500000, rating: 5, image: "/image/o16.webp", specs: "Core i7-13700HX, RTX 4060", desc: "Thiết kế thanh lịch không hầm hố." },
  { id: 33, brand: "HP", category: "Gaming", title: "HP Victus 15", price: 19500000, rating: 4, image: "/image/h15.webp", specs: "Core i5-12500H, RTX 3050", desc: "Lựa chọn gaming sinh viên giá rẻ." },
  { id: 34, brand: "HP", category: "Văn phòng", title: "HP Spectre x360 14", price: 42500000, rating: 5, image: "/image/x360.webp", specs: "Core Ultra 7, OLED Touch", desc: "Viền cắt kim cương mạ vàng tuyệt đẹp." },
  { id: 35, brand: "HP", category: "Văn phòng", title: "HP Pavilion 15", price: 15900000, rating: 4, image: "/image/h15.webp", specs: "Core i5, 8GB RAM", desc: "Laptop phổ thông bán chạy nhất của HP." },
  { id: 36, brand: "HP", category: "Đồ họa", title: "HP ZBook Firefly 14", price: 41500000, rating: 5, image: "/image/hp16.webp", specs: "Core i7, RTX A500", desc: "Máy trạm đồ họa nhẹ nhất thế giới." },
  { id: 37, brand: "HP", category: "Văn phòng", title: "HP ProBook 440 G10", price: 21900000, rating: 4, image: "/image/g10.webp", specs: "Core i5, 16GB RAM", desc: "Bảo mật chuẩn doanh nghiệp." },

  // ================= ACER (7 Sản phẩm) =================
  { id: 38, brand: "Acer", category: "Gaming", title: "Acer Predator Helios 16", price: 39500000, rating: 5, image: "/image/he16.webp", specs: "Core i7, RTX 4070", desc: "Tản nhiệt quạt kim loại AeroBlade 3D." },
  { id: 39, brand: "Acer", category: "Gaming", title: "Acer Nitro 5", price: 19900000, rating: 4, image: "/image/n5.webp", specs: "Core i5, RTX 3050Ti", desc: "Gaming quốc dân của sinh viên Việt Nam." },
  { id: 40, brand: "Acer", category: "Văn phòng", title: "Acer Swift 3", price: 16500000, rating: 4, image: "/image/x3.webp", specs: "Ryzen 5, 16GB RAM", desc: "Vỏ nhôm nguyên khối, sạc nhanh." },
  { id: 41, brand: "Acer", category: "Văn phòng", title: "Acer Aspire 7", price: 17500000, rating: 4, image: "/image/a7.webp", specs: "Ryzen 5, GTX 1650", desc: "Laptop văn phòng có card rời giá rẻ." },
  { id: 42, brand: "Acer", category: "Đồ họa", title: "Acer ConceptD 7", price: 59000000, rating: 5, image: "/image/a7.webp", specs: "Core i7, RTX 3080, Màn 4K", desc: "Màn hình chuẩn màu Delta E < 2 cho Creator." },
  { id: 43, brand: "Acer", category: "Gaming", title: "Acer Nitro V 15", price: 22500000, rating: 4, image: "/image/v15.webp", specs: "Core i5-13420H, RTX 4050", desc: "Dòng Nitro mới thiết kế tối giản hơn." },
  { id: 44, brand: "Acer", category: "Văn phòng", title: "Acer Swift X 14", price: 26900000, rating: 5, image: "/image/s14.webp", specs: "Core i7, RTX 3050", desc: "Sức mạnh đồ họa trong thân hình mỏng nhẹ." },

  // ================= MSI (6 Sản phẩm) =================
  { id: 45, brand: "MSI", category: "Gaming", title: "MSI Titan 18 HX", price: 145000000, rating: 5, image: "/image/m18.webp", specs: "Core i9-14900HX, RTX 4090", desc: "Quái vật sức mạnh tối thượng của MSI." },
  { id: 46, brand: "MSI", category: "Gaming", title: "MSI Katana 15", price: 28900000, rating: 4, image: "/image/m15.webp", specs: "Core i7, RTX 4060", desc: "Thanh gươm rồng đen chiến game AAA." },
  { id: 47, brand: "MSI", category: "Gaming", title: "MSI Cyborg 15", price: 21500000, rating: 4, image: "/image/mc15.webp", specs: "Core i5, RTX 4050", desc: "Thiết kế nhựa xuyên thấu Cyberpunk." },
  { id: 48, brand: "MSI", category: "Văn phòng", title: "MSI Modern 14", price: 11900000, rating: 4, image: "/image/mm14.png", specs: "Core i3, 8GB, 256GB", desc: "Mỏng nhẹ, giá cực tốt cho sinh viên kinh tế." },
  { id: 49, brand: "MSI", category: "Đồ họa", title: "MSI Creator Z16", price: 55000000, rating: 5, image: "/image/z16.webp", specs: "Core i9, RTX 3060", desc: "Vỏ nhôm cắt CNC sắc sảo." },
  { id: 50, brand: "MSI", category: "Văn phòng", title: "MSI Prestige 14", price: 31500000, rating: 5, image: "/image/p16.webp", specs: "Core i7, 16GB RAM", desc: "Trọng lượng chỉ 1.29kg." },

  // ================= RAZER (5 Sản phẩm) =================
  { id: 51, brand: "Razer", category: "Gaming", title: "Razer Blade 15", price: 62000000, rating: 5, image: "/image/r15.jpg", specs: "Core i7, RTX 4070", desc: "Vỏ nhôm nguyên khối đen nhám cực ngầu." },
  { id: 52, brand: "Razer", category: "Gaming", title: "Razer Blade 14", price: 59500000, rating: 5, image: "/image/r15.jpg", specs: "Ryzen 9, RTX 4070", desc: "Sức mạnh khổng lồ trong thân máy 14 inch." },
  { id: 53, brand: "Razer", category: "Gaming", title: "Razer Blade 16", price: 82900000, rating: 5, image: "/image/r16.jpg", specs: "Core i9, RTX 4080", desc: "Màn hình Dual-mode chuyển đổi độ phân giải." },
  { id: 54, brand: "Razer", category: "Gaming", title: "Razer Blade 18", price: 95000000, rating: 5, image: "/image/r18.jpg", specs: "Core i9, RTX 4090", desc: "Cỗ máy thay thế Desktop thực thụ." },
  { id: 55, brand: "Razer", category: "Văn phòng", title: "Razer Book 13", price: 29500000, rating: 4, image: "/image/b13.jpg", specs: "Core i7, 16GB", desc: "Laptop thuần văn phòng của nhà Rắn Xanh." },

  // ================= MICROSOFT & GIGABYTE (5 Sản phẩm) =================
  { id: 56, brand: "Microsoft", category: "Văn phòng", title: "Surface Pro 9", price: 27500000, rating: 5, image: "/image/p9.webp", specs: "Core i5, 8GB, 256GB", desc: "Tablet lai Laptop tuyệt hảo nhất." },
  { id: 57, brand: "Microsoft", category: "Văn phòng", title: "Surface Laptop 5", price: 32500000, rating: 4, image: "/image/s5.webp", specs: "Core i5, 8GB RAM", desc: "Bàn phím phủ vải Alcantara sang trọng." },
  { id: 58, brand: "Gigabyte", category: "Gaming", title: "Gigabyte G5 KF", price: 21500000, rating: 4, image: "/image/g5.webp", specs: "Core i5, RTX 4060", desc: "Laptop có card 4060 rẻ nhất thị trường." },
  { id: 59, brand: "Gigabyte", category: "Đồ họa", title: "Gigabyte AERO 16", price: 49900000, rating: 5, image: "/image/ax16.webp", specs: "Core i9, RTX 4070", desc: "Màn hình OLED 4K cân màu chuẩn Pantone." },
  { id: 60, brand: "Gigabyte", category: "Gaming", title: "Gigabyte AORUS 15", price: 34500000, rating: 5, image: "/image/aa15.png", specs: "Core i7, RTX 4060", desc: "Sức mạnh đáp ứng tốt thể thao điện tử." },

  // ================= PHỤ KIỆN (10 Sản phẩm) =================
  { id: 61, brand: "Logitech", category: "Phụ kiện", title: "Chuột Gaming Logitech G502 Hero", price: 1150000, rating: 5, image: "/images/502.webp", specs: "16K DPI, 11 nút bấm", desc: "Chuột gaming huyền thoại, bán chạy nhất thế giới." },
  { id: 62, brand: "Akko", category: "Phụ kiện", title: "Bàn phím cơ Akko 3098B", price: 1950000, rating: 4.5, image: "/images/Akko 3098B.webp", specs: "Switch Akko CS, 3 mode kết nối", desc: "Thiết kế đẹp, gõ êm, kết nối không dây ổn định." },
  { id: 63, brand: "HyperX", category: "Phụ kiện", title: "Tai nghe HyperX Cloud II", price: 2450000, rating: 5, image: "/images/HyperX Cloud II.jpg", specs: "Âm thanh vòm 7.1, mic chống ồn", desc: "Lựa chọn hàng đầu của game thủ chuyên nghiệp." },
  { id: 64, brand: "Targus", category: "Phụ kiện", title: "Balo Laptop Targus 15.6 inch", price: 850000, rating: 4, image: "/images/balo.webp", specs: "Chống thấm nước, nhiều ngăn", desc: "Bảo vệ an toàn tối đa cho chiếc laptop của bạn." },
  { id: 65, brand: "Cooler Master", category: "Phụ kiện", title: "Đế tản nhiệt Cooler Master X-Slim", price: 450000, rating: 4, image: "/images/Cooler Master X-Slim.png", specs: "Quạt 160mm siêu êm", desc: "Giúp laptop luôn mát mẻ khi chiến game nặng." },
  { id: 66, brand: "UGREEN", category: "Phụ kiện", title: "Cáp sạc UGREEN Type-C 100W", price: 250000, rating: 5, image: "/images/UGREEN Type-C 100W.webp", specs: "Sợi bện Nylon, dài 2m", desc: "Hỗ trợ sạc siêu nhanh cho MacBook và laptop PD." },
  { id: 67, brand: "JBL", category: "Phụ kiện", title: "Loa Bluetooth JBL Flip 6", price: 2950000, rating: 5, image: "/images/Loa.webp", specs: "Chống nước IP67, pin 12h", desc: "Âm thanh mạnh mẽ, bass chắc khỏe." },
  { id: 68, brand: "UGREEN", category: "Phụ kiện", title: "Hub USB-C 6 in 1", price: 890000, rating: 4.5, image: "/images/6 in 1.webp", specs: "HDMI 4K, USB 3.0, SD Card", desc: "Mở rộng cổng kết nối cho các dòng laptop mỏng nhẹ." },
  { id: 69, brand: "Corsair", category: "Phụ kiện", title: "Ghế Gaming Corsair T3 Rush", price: 6800000, rating: 4.5, image: "/images/Corsair T3 Rush.webp", specs: "Vải mềm thoáng khí, tựa lưng ngả 180°", desc: "Trải nghiệm ngồi thoải mái trong thời gian dài." },
  { id: 70, brand: "Samsung", category: "Phụ kiện", title: "Ổ cứng di động Samsung T7 1TB", price: 2890000, rating: 5, image: "/images/Samsung T7 1TB.webp", specs: "Tốc độ đọc/ghi 1050MB/s", desc: "Nhỏ gọn, tốc độ cực nhanh, bảo mật vân tay." }
];