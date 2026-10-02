import React from 'react'
import { X, ShieldCheck, CheckCircle2, AlertTriangle, Scale, BookOpen } from 'lucide-react'

export default function LegalModal({ isOpen, onClose }) {
  if (!isOpen) return null

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-slate-900/60 backdrop-blur-sm flex items-center justify-center p-4">
      <div className="bg-white rounded-2xl max-w-2xl w-full shadow-2xl overflow-hidden border border-slate-200 animate-in fade-in zoom-in-95 duration-200">
        {/* Header */}
        <div className="bg-gradient-to-r from-emerald-600 to-teal-700 p-6 text-white flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="p-2 bg-white/10 rounded-xl">
              <Scale className="w-6 h-6 text-emerald-100" />
            </div>
            <div>
              <h3 className="text-xl font-bold">Căn Cứ Pháp Lý & Tuân Thủ Bản Quyền</h3>
              <p className="text-xs text-emerald-100">
                Điều 25 Luật SHTT Việt Nam & Công ước Berne
              </p>
            </div>
          </div>
          <button 
            onClick={onClose}
            className="p-1 rounded-lg text-emerald-100 hover:text-white hover:bg-white/10 transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Content */}
        <div className="p-6 space-y-6 max-h-[75vh] overflow-y-auto text-sm text-slate-700">
          {/* Article 25 Highlight */}
          <div className="bg-emerald-50 border border-emerald-200 rounded-xl p-4">
            <h4 className="font-semibold text-emerald-900 flex items-center gap-2 mb-2">
              <ShieldCheck className="w-5 h-5 text-emerald-600" />
              Điều 25. Các trường hợp ngoại lệ không xâm phạm quyền tác giả
            </h4>
            <p className="text-emerald-950 text-xs leading-relaxed">
              Theo <strong>Luật Sở hữu trí tuệ Việt Nam</strong> (sửa đổi, bổ sung năm 2022), các trường hợp sử dụng tác phẩm đã công bố không phải xin phép, không phải trả tiền bản quyền nhưng phải trích dẫn tên tác giả và nguồn gốc xuất xứ bao gồm:
            </p>
            <ul className="list-disc list-inside mt-2 text-xs text-emerald-900 space-y-1">
              <li><strong>Điểm a:</strong> Tự sao chép để nghiên cứu khoa học, giảng dạy của cá nhân và không nhằm mục đích thương mại;</li>
              <li><strong>Điểm b:</strong> Trích dẫn hợp lý tác phẩm mà không làm sai ý tác giả để giảng dạy trong nhà trường mà không nhằm mục đích thương mại.</li>
            </ul>
          </div>

          {/* 4 Strict Guardrails */}
          <div>
            <h4 className="font-semibold text-slate-900 mb-3 flex items-center gap-2">
              <CheckCircle2 className="w-4 h-4 text-blue-600" />
              4 Nguyên Tắc An Toàn Pháp Lý Của DigiEdu
            </h4>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              <div className="border border-slate-200 rounded-lg p-3 bg-slate-50">
                <span className="font-semibold text-slate-800 text-xs block mb-1">
                  1. Tuyệt đối không scan nguyên cuốn
                </span>
                <p className="text-xs text-slate-600">
                  Không số hóa hoặc chia sẻ trọn vẹn sách giáo khoa thương mại.
                </p>
              </div>

              <div className="border border-slate-200 rounded-lg p-3 bg-slate-50">
                <span className="font-semibold text-slate-800 text-xs block mb-1">
                  2. Giới hạn dung lượng dưới 10%
                </span>
                <p className="text-xs text-slate-600">
                  Mỗi phiếu chỉ tóm tắt 2–3 trang kiến thức trọng tâm cho 4 tuần đầu.
                </p>
              </div>

              <div className="border border-slate-200 rounded-lg p-3 bg-slate-50">
                <span className="font-semibold text-slate-800 text-xs block mb-1">
                  3. Bắt buộc trích dẫn nguồn
                </span>
                <p className="text-xs text-slate-600">
                  Mọi phiếu học tập đều tự động nhúng tên tác giả, nhà xuất bản và căn cứ pháp lý.
                </p>
              </div>

              <div className="border border-slate-200 rounded-lg p-3 bg-slate-50">
                <span className="font-semibold text-slate-800 text-xs block mb-1">
                  4. Đóng cổng khi sách về đủ
                </span>
                <p className="text-xs text-slate-600">
                  Hệ thống chuyển tiếp sẽ chuyển sang chế độ lưu trữ sau khi phân phối đủ SGK.
                </p>
              </div>
            </div>
          </div>

          {/* Secondhand Book Sharing Legal Ground */}
          <div className="border-t border-slate-200 pt-4">
            <h4 className="font-semibold text-slate-900 mb-2 flex items-center gap-2">
              <BookOpen className="w-4 h-4 text-indigo-600" />
              Căn Cứ Pháp Lý Về "Góc Sách Chuyền Tay" (Secondhand Books)
            </h4>
            <p className="text-xs text-slate-600 leading-relaxed">
              Việc quyên góp, mượn và xoay vòng sách giáo khoa cũ đã mua hợp pháp hoàn toàn tuân thủ <strong>Học thuyết cạn quyền (First Sale Doctrine)</strong>. Người sở hữu bản sách giấy có quyền tặng, cho mượn hoặc chuyển nhượng bản in đó cho người khác trong môi trường phi thương mại.
            </p>
          </div>
        </div>

        {/* Footer */}
        <div className="p-4 bg-slate-50 border-t border-slate-200 flex justify-end">
          <button
            onClick={onClose}
            className="px-5 py-2 bg-slate-800 hover:bg-slate-900 text-white text-xs font-semibold rounded-lg transition-colors"
          >
            Đã Hiểu & Đóng
          </button>
        </div>
      </div>
    </div>
  )
}
