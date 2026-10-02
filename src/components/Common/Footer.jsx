import React from 'react'
import { ShieldCheck, Scale, FileText, Heart } from 'lucide-react'

export default function Footer({ onOpenLegalModal }) {
  return (
    <footer className="bg-slate-900 text-slate-300 border-t border-slate-800 mt-20 no-print">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-8">
          {/* Column 1: Mission */}
          <div>
            <div className="flex items-center gap-2 mb-3">
              <span className="text-lg font-bold text-white tracking-wide">DigiEdu</span>
              <span className="text-xs px-2 py-0.5 rounded bg-blue-900/60 text-blue-300 border border-blue-700/50">
                Mã Nguồn Mở
              </span>
            </div>
            <p className="text-sm text-slate-400 leading-relaxed">
              Giải pháp kết nối tài liệu học tập chuyển tiếp và tủ sách tương trợ lớp học, bảo đảm học sinh không bị gián đoạn việc học trong thời gian chờ sách giáo khoa.
            </p>
          </div>

          {/* Column 2: Legal Guarantee */}
          <div>
            <h4 className="text-sm font-semibold text-white uppercase tracking-wider mb-3 flex items-center gap-1.5">
              <Scale className="w-4 h-4 text-emerald-400" />
              Cam Kết Bản Quyền & Pháp Lý
            </h4>
            <ul className="text-sm space-y-2 text-slate-400">
              <li className="flex items-start gap-2">
                <span className="text-emerald-400 font-bold">✓</span>
                <span>Tuân thủ Điều 25 Luật Sở hữu trí tuệ Việt Nam (Ngoại lệ giảng dạy phi thương mại).</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-emerald-400 font-bold">✓</span>
                <span>Điều 9(2) & 10(2) Công ước Berne (Giới hạn trích dẫn hợp lý).</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-emerald-400 font-bold">✓</span>
                <span>Không sao chép nguyên cuốn SGK thương mại; nội dung dưới 10% tuần chuyển tiếp.</span>
              </li>
            </ul>
          </div>

          {/* Column 3: Quick Action */}
          <div>
            <h4 className="text-sm font-semibold text-white uppercase tracking-wider mb-3 flex items-center gap-1.5">
              <FileText className="w-4 h-4 text-blue-400" />
              Tài Liệu Hướng Dẫn
            </h4>
            <div className="flex flex-col gap-2">
              <button
                onClick={onOpenLegalModal}
                className="text-left text-sm text-blue-400 hover:text-blue-300 underline"
              >
                Quy định tuân thủ bản quyền chi tiết
              </button>
              <span className="text-xs text-slate-400">
                Thư viện số hoạt động độc lập và tự động hoàn trả/lưu trữ khi sách giáo khoa chính thức được phân phối đầy đủ.
              </span>
            </div>
          </div>
        </div>

        <div className="border-t border-slate-800 pt-6 flex flex-col sm:flex-row items-center justify-between text-xs text-slate-500">
          <p>© 2026 DigiEdu Framework. Phục vụ cộng đồng giáo dục Việt Nam.</p>
          <div className="flex items-center gap-1 mt-2 sm:mt-0">
            <span>Xây dựng vì học sinh</span>
            <Heart className="w-3.5 h-3.5 text-red-500 fill-red-500" />
            <span>— Không rào cản tài khoản</span>
          </div>
        </div>
      </div>
    </footer>
  )
}
