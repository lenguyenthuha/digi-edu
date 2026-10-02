import React from 'react'

export default function Footer() {
  return (
    <footer className="border-t border-black/[0.06] bg-[#f5f5f7] text-[#86868b] text-[12px] py-10 mt-24 no-print">
      <div className="max-w-5xl mx-auto px-4 sm:px-6 space-y-4">
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 border-b border-black/[0.06] pb-4">
          <div className="flex items-center gap-2">
            <span className="font-semibold text-[#1d1d1f]">DigiEdu</span>
            <span>•</span>
            <span>Học liệu chuyển tiếp & Tủ sách học đường</span>
          </div>
          <div className="flex items-center gap-4 text-[12px]">
            <a 
              href="https://github.com/lenguyenthuha/digi-edu" 
              target="_blank" 
              rel="noreferrer" 
              className="hover:text-[#1d1d1f] transition-colors"
            >
              Mã nguồn GitHub
            </a>
            <a 
              href="https://github.com/lenguyenthuha/digi-edu/blob/main/docs/Legal-Compliance.md" 
              target="_blank" 
              rel="noreferrer" 
              className="hover:text-[#1d1d1f] transition-colors"
            >
              Tài liệu pháp lý
            </a>
          </div>
        </div>

        {/* The single, official location for legal exception & access notice */}
        <p className="leading-relaxed text-[#86868b] text-[11px] max-w-3xl">
          Tài liệu tóm tắt phục vụ nghiên cứu và giảng dạy phi thương mại trong nhà trường theo Điều 25 Luật Sở hữu trí tuệ Việt Nam và Điều 10(2) Công ước Berne. Hệ thống mở truy cập công khai trực tiếp cho học sinh và phụ huynh, không yêu cầu đăng ký tài khoản.
        </p>

        <p className="text-[11px] text-[#a1a1a6]">
          © 2026 DigiEdu. Bản quyền thuộc về các tác giả và nhà xuất bản tương ứng của các bộ sách giáo khoa tham khảo.
        </p>
      </div>
    </footer>
  )
}
