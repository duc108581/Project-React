import React from 'react';
import { User, X, ChevronRight } from 'lucide-react';

export default function Sidebar({ isOpen, setIsOpen }) {
  return (
    <>
      <div className={`sidebar-overlay ${isOpen ? 'active' : ''}`} onClick={() => setIsOpen(false)}>
        {isOpen && <X className="close-btn" size={32} onClick={() => setIsOpen(false)} />}
      </div>
      <div className={`sidebar ${isOpen ? 'active' : ''}`}>
        <div className="sidebar__header">
          <User size={28} />
          Xin chào, Đăng nhập
        </div>
        <div className="sidebar__content">
          <h3 style={{ padding: '10px 20px', margin: 0 }}>Danh mục Laptop</h3>
          <ul>
            <li>MacBook <ChevronRight size={16}/></li>
            <li>Laptop Gaming <ChevronRight size={16}/></li>
            <li>Laptop Văn Phòng <ChevronRight size={16}/></li>
            <li>Linh kiện máy tính <ChevronRight size={16}/></li>
          </ul>
          <h3 style={{ padding: '10px 20px', margin: '10px 0 0' }}>Trợ giúp & Cài đặt</h3>
          <ul>
            <li>Tài khoản của bạn</li>
            <li>Ngôn ngữ: Tiếng Việt</li>
            <li>Đăng xuất</li>
          </ul>
        </div>
      </div>
    </>
  );
}