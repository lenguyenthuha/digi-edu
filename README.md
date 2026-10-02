# DigiEdu - Cổng Tài Liệu Học Tập Chuyển Tiếp & Góc Sách Học Đường

![DigiEdu Banner](https://img.shields.io/badge/Status-In_Development-blue?style=for-the-badge)
![License](https://img.shields.io/badge/License-MIT-green?style=for-the-badge)
![Target](https://img.shields.io/badge/Sector-Education_K12-orange?style=for-the-badge)
![Language](https://img.shields.io/badge/Language-Vietnamese-red?style=for-the-badge)

> **Mô hình phối hợp Giáo dục Số & Học liệu Vật lý** nhằm hỗ trợ học sinh tiếp cận tài liệu bài giảng chuẩn hóa, tiết kiệm chi phí và tuân thủ Luật Sở hữu Trí tuệ.

---

## 📌 1. Tổng quan Dự án

Trong các giai đoạn chuyển tiếp chương trình học hoặc thiếu hụt sách giáo khoa cục bộ, phụ huynh và học sinh gặp khó khăn trong việc tiếp cận tài liệu chuẩn hóa với chi phí hợp lý. **DigiEdu** giải quyết bài toán này bằng mô hình Hybrid Distribution:

- **Số hóa linh hoạt**: Tóm tắt bài học weekly & slide giảng dạy phân phối qua Cổng thông tin, Zalo OA và Mã QR tại lớp.
- **Tối ưu chi phí**: In ấn học liệu giấy giá rẻ & vận hành **Tủ sách luân chuyển** từ nguồn sách cũ đóng góp.
- **An toàn pháp lý**: Đảm bảo toàn bộ tài nguyên trích dẫn đều thông qua quy trình kiểm tra Điều 25 Luật SHTT và khai thác Tài nguyên Giáo dục Mở (OER).

---

## 🔄 2. System Architecture

```mermaid
graph TD
    %% Định nghĩa Style màu sắc
    classDef compliance fill:#EBF5FB,stroke:#2980B9,stroke-width:2px,color:#1B4F72;
    classDef processing fill:#FEF9E7,stroke:#F39C12,stroke-width:2px,color:#7D6608;
    classDef channel fill:#E8F8F5,stroke:#1ABC9C,stroke-width:2px,color:#0E6251;
    classDef lifecycle fill:#F4ECF7,stroke:#8E44AD,stroke-width:2px,color:#512E5F;

    subgraph Data_Legal ["Dữ liệu & Tuân thủ Pháp lý"]
        A1[Khung Chương trình của Bộ GD&ĐT] --> A2[Kiểm tra Tuân thủ Luật SHTT Article 25]
        A2 --> A3[Tài nguyên Giáo dục Mở / Kho Sách Thư viện]
    end

    subgraph Content_Proc ["Xử lý & Biên soạn Nội dung"]
        A3 --> B1[Giáo viên / Tổ Bộ môn]
        B1 -->|Biên soạn tóm tắt 2 trang/tuần| B2(Phiếu bài tập tuần / Slide bài giảng)
        B1 -->|Kiểm kê sách cũ| B3(Danh mục Góc Sách Học Đường)
    end

    subgraph Distribution ["Kênh Phân phối Hỗn hợp"]
        B2 -->|Tải lên| C1[Cổng Thông tin DigiEdu]
        C1 --> C1A[Nhóm Zalo / Tin nhắn]
        C1 --> C1B[Mã QR trên Tường Lớp học]
        B2 -->|In ấn chi phí thấp| C2[Phiếu Bài tập Giấy]
        B3 -->|Chia sẻ tại lớp| C3[Mô hình Tủ sách Luân chuyển]
    end

    subgraph Users ["Nguồn lực Người dùng & Vòng đời"]
        C1A --> D1[Học sinh & Phụ huynh]
        C1B --> D1
        C2 --> D1
        C3 --> D1
        D1 -->|Phản hồi Tiến độ| D2[Ban Giám hiệu / Quản lý Nhà trường]
        D2 -->|Thu hồi/Tạm dừng khi sách mới về| C1
    end

    %% Áp dụng Class màu cho các nút
    class A1,A2,A3 compliance;
    class B1,B2,B3 processing;
    class C1,C1A,C1B,C2,C3 channel;
    class D1,D2 lifecycle;

```

---

## 🧩 3. Core Modules

### 3.1. Dữ liệu & Pháp lý

* **Khung chương trình**: Chuẩn hóa theo định hướng GDPT của Bộ GD&ĐT.
* **Rà soát SHTT (Article 25)**: Kiểm tra giới hạn quyền tác giả cho mục đích giảng dạy phi thương mại.
* **Kho OER**: Tích hợp các kho học liệu mở công cộng.

### 3.2. Biên soạn & Số hóa 

* **Tóm tắt tuần (Weekly 2-pager)**: Bài giảng tóm gọn trong 2 trang A4 nhằm tối ưu trải nghiệm đọc nhanh và chi phí in.
* **Góc sách học đường**: Kiểm kê, dán mã quản lý và phân loại sách giáo khoa/sách tham khảo cũ do học sinh quyên góp.

### 3.3. Phân phối Đa kênh

* **Kênh Số**: Cổng thông tin Web, Bot nhắn tin Zalo tự động, QR Code dán cố định tại các bảng tin lớp học.
* **Kênh Vật lý**: Phiếu bài tập in đen trắng chi phí thấp, Tủ sách luân chuyển theo tuần giữa các lớp.

### 3.4. Vòng đời & Phản hồi 

* **Học sinh & Phụ huynh**: Tiếp cận học liệu mọi lúc, gửi phản hồi tiếp thu.
* **Ban Giám hiệu**: Theo dõi tỷ lệ phủ học liệu và điều phối thu hồi/đóng cổng khi sách giáo khoa chính thức được giao tới.

---

## 📂 4. Cấu trúc Thư mục Repository

```text
digi-edu/
├── docs/                     # Tài liệu thiết kế & Hướng dẫn pháp lý
│   ├── legal-compliance.md   # Hướng dẫn rà soát Luật SHTT Điều 25
│   └── architecture.md       # Chi tiết kiến trúc hệ thống
├── src/                      # Mã nguồn ứng dụng (Đang phát triển)
│   ├── frontend/             # Giao diện Cổng DigiEdu (Web/App)
│   ├── backend/              # API Server & Quản lý cơ sở dữ liệu
│   └── integrations/         # Service kết nối Zalo OA & QR Generator
├── database/                 # Schema & Scripts cơ sở dữ liệu
│   └── schema.sql            # Quản lý kho sách & phân phối tài liệu
├── README.md                 # Tài liệu giới thiệu dự án
└── LICENSE                   # Giấy phép bản quyền MIT

```

---


```
