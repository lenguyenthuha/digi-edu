#  DigiEdu — Cổng Tài Liệu Học Tập Chuyển Tiếp & Góc Sách Học Đường

[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://opensource.org/licenses/MIT)
[![Legal Compliance](https://img.shields.io/badge/IP%20Law-%C4%90i%E1%BB%81u%2025%20Tu%C3%A2n%20Th%E1%BB%A7-green.svg)](docs/Legal-Compliance.md)
[![Live Demo](https://img.shields.io/badge/Live-Demo-blue.svg)](https://lenguyenthuha.github.io/digi-edu/)
[![Status: Live](https://img.shields.io/badge/Status-Live%20on%20GitHub%20Pages-emerald.svg)](https://lenguyenthuha.github.io/digi-edu/)

> **DigiEdu** là nền tảng số gọn nhẹ, hợp pháp và hoàn toàn miễn phí, giải quyết tình trạng thiếu sách giáo khoa cục bộ trong 2–4 tuần đầu năm học mà không vi phạm bản quyền hay làm gián đoạn việc học của học sinh.

---

## 🌟 Tính Năng Cốt Lõi (Core Features)

1. ** Cổng Phiếu Học Tập Tuần (Tuần 1–4):**
   - Bộ lọc trực quan theo Khối lớp (6–12), Môn học (Toán, Văn, Anh, KHTN...) và Tuần học.
   - Bản tóm tắt trọng tâm bài học (2–3 trang), xem trực tiếp hoặc tải in chuẩn A4.
2. ** Giám Sát Tuân Thủ Bản Quyền (Legal Citation Guard):**
   - Đảm bảo tuân thủ nghiêm ngặt **Điều 25 Luật Sở hữu trí tuệ** và **Điều 9(2), 10(2) Công ước Berne**.
   - Tự động gắn kèm trích dẫn bản quyền và nhãn mục đích giáo dục phi thương mại.
3. ** Góc Sách Chuyền Tay Lớp Học (Classroom Pop-up Book Sharing):**
   - Theo dõi số lượng sách giáo khoa cũ quyên góp theo từng lớp học.
   - Trạng thái trực quan: Sẵn sàng mượn, Đang sử dụng, Cần hỗ trợ (thiếu sách).
4. ** Tiếp Cận Không Rào Cản (Zero-Barrier Access & QR Generator):**
   - Học sinh và phụ huynh không cần tài khoản hay đăng nhập.
   - Giáo viên có thể tạo và in ngay Poster mã QR dán tại lớp học để quét qua điện thoại / Zalo.
5. ** Bảng Điều Khiển Quản Lý (Teacher / Admin Hub):**
   - Quản lý tài liệu và số lượng sách chuyền tay của lớp.

---

## 🛠️ Công Nghệ Sử Dụng (Tech Stack)

- **Frontend:** React (Vite) + Tailwind CSS + Lucide Icons
- **Quản lý dữ liệu:** Client-first LocalStorage & Mock Data Hub, sẵn sàng kết nối Supabase (PostgreSQL)
- **Hỗ trợ in ấn & QR:** Qrcode.react & Print-friendly stylesheets
- **Triển khai:** GitHub Pages / Vercel (CI/CD via GitHub Actions)

---

## 🚀 Khởi Chạy Dự Án (Quick Start)

### 1. Cài đặt phụ thuộc
```bash
npm install
```

### 2. Thiết lập biến môi trường (Tùy chọn cho Supabase)
```bash
cp .env.example .env
```

### 3. Chạy môi trường phát triển
```bash
npm run dev
```

### 4. Đóng gói bản phát hành
```bash
npm run build
```

---

## ⚖️ Tuyên Bố Bản Quyền & Miễn Trừ Trách Nhiệm
Hệ thống vận hành theo nguyên tắc trích dẫn hợp lý phi thương mại phục vụ công tác dạy và học trong trường học căn cứ theo **Điều 25 Luật Sở hữu trí tuệ Việt Nam**. Hệ thống **không sao chép trọn vẹn** bất kỳ tài liệu hay ấn phẩm thương mại nào. Mọi tài liệu chuyển tiếp sẽ được chuyển vào kho lưu trữ tra cứu khi sách giáo khoa chính thức được phân phối đầy đủ.
