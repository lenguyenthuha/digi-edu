import React, { useState } from 'react'
import { QrCode, Printer, Sparkles, Smartphone, ShieldCheck, Download } from 'lucide-react'

export default function ClassroomPoster({ worksheets }) {
  const [targetClass, setTargetClass] = useState('Lớp 8A1')
  const [targetGrade, setTargetGrade] = useState(8)

  const currentUrl = typeof window !== 'undefined' ? window.location.origin : 'https://digiedu.edu.vn'
  const qrTargetUrl = `${currentUrl}?grade=${targetGrade}&class=${encodeURIComponent(targetClass)}`

  // Use reliable lightweight QR image API
  const qrImageUrl = `https://api.qrserver.com/v1/create-qr-code/?size=260x260&data=${encodeURIComponent(qrTargetUrl)}&color=1e3a8a`

  const handlePrint = () => {
    window.print()
  }

  return (
    <div className="space-y-8">
      {/* Intro Box */}
      <div className="bg-gradient-to-br from-indigo-700 via-blue-800 to-indigo-950 rounded-3xl p-6 sm:p-10 text-white shadow-xl no-print">
        <div className="max-w-2xl">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/10 backdrop-blur border border-white/20 text-xs font-semibold text-indigo-200 mb-4">
            <Smartphone className="w-3.5 h-3.5 text-yellow-300" />
            <span>Tầng 3: Tiếp Cận Không Rào Cản (Zero-Barrier)</span>
          </div>
          <h1 className="text-2xl sm:text-4xl font-extrabold tracking-tight leading-tight">
            Poster Mã QR Dán Bảng Tin & Tường Lớp
          </h1>
          <p className="mt-3 text-sm sm:text-base text-indigo-100/90 leading-relaxed">
            Giáo viên in poster dán trực tiếp tại cửa lớp hoặc bảng thông báo. Học sinh, phụ huynh chỉ cần mở Camera hoặc Zalo quét mã là có thể xem ngay phiếu học tập tuần 1–4 mà không cần tạo tài khoản.
          </p>
        </div>
      </div>

      {/* Configuration bar */}
      <div className="bg-white rounded-2xl border border-slate-200 p-5 shadow-sm no-print flex flex-col sm:flex-row items-center justify-between gap-4">
        <div className="flex flex-wrap items-center gap-4 w-full sm:w-auto">
          <div>
            <label className="block text-xs font-semibold text-slate-600 mb-1">
              Chọn Lớp áp dụng:
            </label>
            <input
              type="text"
              value={targetClass}
              onChange={(e) => setTargetClass(e.target.value)}
              className="px-3 py-1.5 text-sm font-semibold border border-slate-200 rounded-lg focus:outline-none focus:border-indigo-500"
              placeholder="VD: Lớp 8A1"
            />
          </div>

          <div>
            <label className="block text-xs font-semibold text-slate-600 mb-1">
              Khối lớp:
            </label>
            <select
              value={targetGrade}
              onChange={(e) => setTargetGrade(Number(e.target.value))}
              className="px-3 py-1.5 text-sm font-semibold border border-slate-200 rounded-lg focus:outline-none focus:border-indigo-500 bg-white"
            >
              {[6, 7, 8, 9, 10, 11, 12].map(g => (
                <option key={g} value={g}>Khối {g}</option>
              ))}
            </select>
          </div>
        </div>

        <button
          onClick={handlePrint}
          className="w-full sm:w-auto flex items-center justify-center gap-2 px-6 py-2.5 bg-blue-600 hover:bg-blue-700 text-white text-sm font-bold rounded-xl shadow-md transition-all"
        >
          <Printer className="w-4 h-4" />
          In Poster A4 Ngay
        </button>
      </div>

      {/* Printable Poster Canvas */}
      <div className="print-area max-w-2xl mx-auto bg-white rounded-3xl border-2 border-slate-800 p-8 sm:p-12 shadow-2xl text-center relative overflow-hidden">
        {/* Top Decorative Border */}
        <div className="h-3 bg-gradient-to-r from-blue-600 via-indigo-600 to-emerald-500 absolute top-0 left-0 right-0"></div>

        {/* Institution / Brand */}
        <div className="flex items-center justify-center gap-2 mb-2">
          <span className="px-3 py-1 rounded-full bg-blue-100 text-blue-900 text-xs font-extrabold tracking-wide uppercase">
            HỆ THỐNG HỌC LIỆU CHUYỂN TIẾP DIGIEDU
          </span>
        </div>

        <h2 className="text-2xl sm:text-3xl font-black text-slate-900 tracking-tight mt-1">
          GÓC TÀI LIỆU & SÁCH TƯƠNG TRỢ
        </h2>
        <div className="inline-block bg-slate-900 text-white font-bold text-base sm:text-lg px-6 py-1.5 rounded-full mt-2">
          {targetClass.toUpperCase()} — KHỐI {targetGrade}
        </div>

        <p className="text-xs sm:text-sm text-slate-600 max-w-md mx-auto mt-4 leading-relaxed">
          Quét mã QR dưới đây bằng <strong>Camera điện thoại</strong> hoặc <strong>Zalo</strong> để tải ngay Phiếu học tập tuần 1–4 và tra cứu số lượng sách giáo khoa cũ tại lớp.
        </p>

        {/* QR Code Container */}
        <div className="my-8 inline-block p-5 bg-white rounded-2xl border-4 border-slate-900 shadow-lg">
          <img
            src={qrImageUrl}
            alt={`Mã QR truy cập tài liệu ${targetClass}`}
            className="w-56 h-56 mx-auto object-contain"
          />
          <span className="block mt-2 text-[11px] font-bold text-slate-800 tracking-wider">
            QUÉT ĐỂ HỌC NGAY • KHÔNG CẦN TÀI KHOẢN
          </span>
        </div>

        {/* Instructions Steps */}
        <div className="grid grid-cols-3 gap-2 text-left bg-slate-50 border border-slate-200 rounded-xl p-4 text-xs">
          <div>
            <span className="font-extrabold text-blue-700 block">Bước 1</span>
            <span className="text-slate-600 text-[11px]">Mở camera hoặc Zalo quét mã</span>
          </div>
          <div>
            <span className="font-extrabold text-blue-700 block">Bước 2</span>
            <span className="text-slate-600 text-[11px]">Chọn môn học cần ôn tập</span>
          </div>
          <div>
            <span className="font-extrabold text-blue-700 block">Bước 3</span>
            <span className="text-slate-600 text-[11px]">Xem bài hoặc in phiếu làm bài</span>
          </div>
        </div>

        {/* Footer Legal Watermark */}
        <div className="mt-8 pt-4 border-t border-slate-200 text-[10px] text-slate-500 flex items-center justify-center gap-1.5">
          <ShieldCheck className="w-3.5 h-3.5 text-emerald-600" />
          <span>Vận hành theo Điều 25 Luật SHTT Việt Nam. Tài liệu giáo dục phi thương mại.</span>
        </div>
      </div>
    </div>
  )
}
