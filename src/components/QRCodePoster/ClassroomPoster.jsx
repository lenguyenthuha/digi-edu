import React, { useState } from 'react'
import { Printer } from 'lucide-react'

export default function ClassroomPoster() {
  const [targetClass, setTargetClass] = useState('Lớp 8A1')
  const [targetGrade, setTargetGrade] = useState(8)

  const currentUrl = typeof window !== 'undefined' ? window.location.origin : 'https://lenguyenthuha.github.io/digi-edu/'
  const qrTargetUrl = `${currentUrl}?grade=${targetGrade}&class=${encodeURIComponent(targetClass)}`
  const qrImageUrl = `https://api.qrserver.com/v1/create-qr-code/?size=300x300&data=${encodeURIComponent(qrTargetUrl)}&color=1d1d1f`

  const handlePrint = () => {
    window.print()
  }

  return (
    <div className="space-y-12 max-w-4xl mx-auto">
      {/* Intro */}
      <section className="text-center pt-8 pb-4 max-w-xl mx-auto px-4 no-print">
        <span className="text-[13px] font-semibold text-[#86868b] tracking-wider uppercase">
          Tài liệu dán tường
        </span>
        <h1 className="text-3xl sm:text-5xl font-semibold text-[#1d1d1f] tracking-tight mt-2 mb-3">
          Poster mã QR.
        </h1>
        <p className="text-[15px] sm:text-[17px] text-[#86868b] leading-relaxed">
          Tạo và in poster mã QR để dán tại bảng tin hoặc cửa lớp học.
        </p>
      </section>

      {/* Control Bar */}
      <div className="bg-white rounded-[18px] border border-black/[0.06] p-5 no-print flex flex-col sm:flex-row items-center justify-between gap-4">
        <div className="flex flex-wrap items-center gap-4 w-full sm:w-auto">
          <div>
            <label className="block text-[12px] font-medium text-[#86868b] mb-1">
              Tên lớp:
            </label>
            <input
              type="text"
              value={targetClass}
              onChange={(e) => setTargetClass(e.target.value)}
              className="px-3.5 py-1.5 text-[14px] font-medium bg-[#f5f5f7] border border-black/[0.06] rounded-full focus:outline-none focus:border-[#0071e3]"
            />
          </div>

          <div>
            <label className="block text-[12px] font-medium text-[#86868b] mb-1">
              Khối lớp:
            </label>
            <select
              value={targetGrade}
              onChange={(e) => setTargetGrade(Number(e.target.value))}
              className="px-3.5 py-1.5 text-[14px] font-medium bg-[#f5f5f7] border border-black/[0.06] rounded-full focus:outline-none focus:border-[#0071e3]"
            >
              {[6, 7, 8, 9, 10, 11, 12].map(g => (
                <option key={g} value={g}>Khối {g}</option>
              ))}
            </select>
          </div>
        </div>

        <button
          onClick={handlePrint}
          className="flex items-center gap-1.5 px-5 py-2 bg-[#0071e3] hover:bg-[#0077ed] text-white text-[13px] font-medium rounded-full transition-colors shadow-sm"
        >
          <Printer className="w-3.5 h-3.5" />
          In Poster (A4)
        </button>
      </div>

      {/* Printable Poster Canvas */}
      <div className="print-area max-w-lg mx-auto bg-white rounded-[24px] border border-black/[0.1] p-10 sm:p-14 text-center space-y-6 shadow-sm">
        <div>
          <span className="text-[13px] font-semibold text-[#86868b] uppercase tracking-widest">
            DIGIEDU
          </span>
          <h2 className="text-2xl sm:text-3xl font-semibold text-[#1d1d1f] tracking-tight mt-1">
            {targetClass} • Khối {targetGrade}
          </h2>
          <p className="text-[14px] text-[#6e6e73] mt-2">
            Quét mã bằng Camera điện thoại hoặc Zalo để mở phiếu học tập và tủ sách lớp.
          </p>
        </div>

        {/* QR Frame */}
        <div className="inline-block p-4 bg-white rounded-[20px] border border-black/[0.08] shadow-sm">
          <img
            src={qrImageUrl}
            alt={`Mã QR ${targetClass}`}
            className="w-56 h-56 mx-auto object-contain"
          />
        </div>

        <p className="text-[12px] text-[#86868b]">
          digiedu.edu.vn
        </p>
      </div>
    </div>
  )
}
