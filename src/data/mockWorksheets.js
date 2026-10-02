export const INITIAL_WORKSHEETS = [
  {
    id: "ws-6-math-w1",
    title: "Toán 6 — Tuần 1: Tập hợp và phần tử của tập hợp",
    grade: 6,
    subject: "Toán học",
    week: 1,
    duration: "45 phút",
    publisherReference: "SGK Toán 6 (Bộ Cánh Diều / Kết Nối Tri Thức)",
    authorAttribution: "Ban chuyên môn Toán học Trường THCS Thực Nghiệm",
    legalCitation: "Trích dẫn tóm tắt phục vụ giảng dạy phi thương mại theo Điều 25 Luật SHTT Việt Nam. Dung lượng dưới 10% nội dung chương trình.",
    summary: "Nắm vững khái niệm tập hợp, các cách viết tập hợp (liệt kê phần tử, chỉ ra tính chất đặc trưng) và sử dụng ký hiệu thuộc (∈), không thuộc (∉).",
    coreConcepts: [
      "Tập hợp là khái niệm cơ bản trong toán học dùng để chỉ một nhóm các đối tượng có cùng một đặc tính nhất định.",
      "Tên tập hợp thường được đặt bằng chữ cái in hoa (A, B, C...). Các phần tử viết trong dấu ngoặc nhọn { }, cách nhau bởi dấu chấm phẩy (;).",
      "Ký hiệu: a ∈ A (a thuộc A); b ∉ A (b không thuộc A)."
    ],
    sampleExercises: [
      {
        question: "Bài 1: Viết tập hợp A các số tự nhiên lớn hơn 3 và nhỏ hơn 9 bằng 2 cách.",
        hint: "Cách 1: Liệt kê các phần tử {4; 5; 6; 7; 8}. Cách 2: Chỉ ra tính chất đặc trưng {x ∈ ℕ | 3 < x < 9}."
      },
      {
        question: "Bài 2: Cho tập hợp B = {x ∈ ℕ* | x ≤ 5}. Điền ký hiệu thích hợp: 0 ... B; 5 ... B.",
        hint: "0 ∉ B (vì x thuộc ℕ*), 5 ∈ B."
      }
    ],
    fileUrl: "#",
    createdAt: "2026-09-01T08:00:00Z"
  },
  {
    id: "ws-6-lit-w1",
    title: "Ngữ Văn 6 — Tuần 1: Khám phá vẻ đẹp truyền thuyết (Thánh Gióng)",
    grade: 6,
    subject: "Ngữ văn",
    week: 1,
    duration: "90 phút",
    publisherReference: "SGK Ngữ Văn 6 — Bộ Kết Nối Tri Thức Với Cuộc Sống",
    authorAttribution: "Tổ Ngữ Văn THCS Chu Văn An",
    legalCitation: "Trích dẫn tóm tắt phục vụ giảng dạy phi thương mại theo Điều 25 Luật SHTT Việt Nam. Dung lượng dưới 10% nội dung chương trình.",
    summary: "Tìm hiểu đặc trưng thể loại truyền thuyết qua nhân vật Thánh Gióng: sự ra đời kỳ lạ, hành động đánh giặc và ý nghĩa biểu tượng sức mạnh toàn dân.",
    coreConcepts: [
      "Đặc điểm truyền thuyết: Kể về nhân vật và sự kiện lịch sử thời quá khứ, có yếu tố tưởng tượng kỳ ảo.",
      "Hình tượng Thánh Gióng: Biểu tượng cho lòng yêu nước, sức mạnh quật cường của dân tộc trong buổi đầu dựng nước và giữ nước.",
      "Các chi tiết kỳ ảo: Mẹ ướm chân vào vết chân to, Gióng lớn nhanh như thổi sau khi nghe tiếng loa kêu gọi cứu nước."
    ],
    sampleExercises: [
      {
        question: "Câu hỏi 1: Nêu ý nghĩa của chi tiết bà con làng xóm gom góp gạo nuôi Gióng lớn.",
        hint: "Gợi ý: Thể hiện tình đoàn kết, sự đùm bọc và Gióng lớn lên từ cơm gạo, tinh hoa của nhân dân."
      }
    ],
    fileUrl: "#",
    createdAt: "2026-09-01T08:30:00Z"
  },
  {
    id: "ws-8-math-w1",
    title: "Toán 8 — Tuần 1: Đơn thức và Đa thức nhiều biến",
    grade: 8,
    subject: "Toán học",
    week: 1,
    duration: "45 phút",
    publisherReference: "SGK Toán 8 (Tập 1) — NXB Giáo Dục Việt Nam",
    authorAttribution: "Tổ Toán — Tin học",
    legalCitation: "Trích dẫn hợp lý phục vụ học tập chuyển tiếp theo Điều 25 Luật Sở hữu trí tuệ và Công ước Berne.",
    summary: "Nhận biết đơn thức, đa thức nhiều biến. Thu gọn đơn thức, xác định bậc của đơn thức và cộng trừ các đơn thức đồng dạng.",
    coreConcepts: [
      "Đơn thức là biểu thức đại số chỉ gồm một số, hoặc một biến, hoặc một tích giữa các số và các biến.",
      "Bậc của đơn thức có hệ số khác 0 là tổng số mũ của tất cả các biến có trong đơn thức đó.",
      "Hai đơn thức đồng dạng là hai đơn thức có hệ số khác 0 và có cùng phần biến."
    ],
    sampleExercises: [
      {
        question: "Bài 1: Thu gọn đơn thức A = (-2/3 x²y) . (9/4 xy³) và tìm bậc của A.",
        hint: "A = -3/2 x³y⁴. Tổng số mũ các biến là 3 + 4 = 7. Vậy bậc của A là 7."
      }
    ],
    fileUrl: "#",
    createdAt: "2026-09-02T09:00:00Z"
  },
  {
    id: "ws-8-eng-w1",
    title: "Tiếng Anh 8 — Unit 1 (Week 1): Leisure Time (Từ vựng & Ngữ pháp)",
    grade: 8,
    subject: "Tiếng Anh",
    week: 1,
    duration: "45 phút",
    publisherReference: "Global Success — Tiếng Anh 8",
    authorAttribution: "Tổ Ngoại Ngữ THCS Lê Quý Đôn",
    legalCitation: "Tóm tắt từ vựng & cấu trúc ngữ pháp phục vụ học tập chuyển tiếp theo Điều 25 Luật SHTT.",
    summary: "Học từ vựng về sở thích thời gian rảnh rỗi (crafting, folding origami, messaging friends) và ngữ pháp động từ chỉ sự yêu thích (verbs of liking + Gerund / to-infinitive).",
    coreConcepts: [
      "Vocabulary: DIY, origami, leisure activity, hanging out, surf the net.",
      "Grammar: like, love, enjoy, prefer, adore, fancy + V-ing.",
      "Contrast: hate, detest, dislike + V-ing."
    ],
    sampleExercises: [
      {
        question: "Exercise: Put the verb in brackets into the correct form: My brother enjoys (play) ______ badminton after school.",
        hint: "playing (sau động từ enjoy dùng V-ing)."
      }
    ],
    fileUrl: "#",
    createdAt: "2026-09-02T10:00:00Z"
  },
  {
    id: "ws-10-sci-w1",
    title: "Vật lí 10 — Tuần 1: Sai số trong phép đo các đại lượng vật lí",
    grade: 10,
    subject: "Vật lí",
    week: 1,
    duration: "45 phút",
    publisherReference: "SGK Vật lí 10 — NXB Giáo Dục Việt Nam",
    authorAttribution: "Tổ Vật lí THPT Chuyên",
    legalCitation: "Tuân thủ Điều 25 Luật Sở hữu trí tuệ số 50/2005/QH11 (sửa đổi bổ sung 2022).",
    summary: "Phân biệt phép đo trực tiếp và gián tiếp. Cách xác định sai số hệ thống, sai số ngẫu nhiên và quy tắc viết kết quả đo chuẩn.",
    coreConcepts: [
      "Phép đo trực tiếp: So sánh trực tiếp qua dụng cụ đo (dùng thước đo chiều dài, cân đo khối lượng).",
      "Sai số tuyệt đối: ΔA = ΔA_ngẫu nhiên + ΔA_dụng cụ.",
      "Cách biểu diễn kết quả: A = A_tb ± ΔA."
    ],
    sampleExercises: [
      {
        question: "Bài 1: Khi dùng thước có ĐCNN 1mm để đo độ dài cây bút chì được 145mm. Hãy viết kết quả phép đo.",
        hint: "Δl = 1mm (hoặc 0.5mm tùy quy ước dụng cụ). Kết quả l = (145 ± 1) mm."
      }
    ],
    fileUrl: "#",
    createdAt: "2026-09-03T14:00:00Z"
  }
];
