import React, { useState } from 'react'
import { X, Printer, ShieldCheck, HelpCircle, Check, ChevronDown, ChevronUp, BookOpen, Clock } from 'lucide-react'

export default function WorksheetViewModal({ worksheet, isOpen, onClose }) {
  const [revealedHints, setRevealedHints] = useState({})

  if (!isOpen || !worksheet) return null

  const toggleHint = (index) => {
    setRevealedHints(prev => ({
      ...prev,
      [index]: !prev[index]
    }))
  }

  const handlePrint = () => {
    window.print()
  }

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-slate-900/60 backdrop-blur-sm flex items-center justify-center p-2 sm:p-4">
      <div className="bg-white rounded-2xl max-w-3xl w-full shadow-2xl overflow-hidden border border-slate-200 animate-in fade-in zoom-in-95 duration-200 max-h-[90vh] flex flex-col">
        {/* Top Control Bar (Hidden on print) */}
        <div className="bg-slate-900 text-white px-6 py-4 flex items-center justify-between no-print">
          <div className="flex items-center gap-3">
            <span className="px-2 py-0.5 text-xs font-bold rounded bg-blue-500 text-white">
              Khối {worksheet.grade}
            </span>
            <span className="text-sm font-semibold truncate max-w-xs sm:max-w-md">
              {worksheet.subject} — Tuần {worksheet.week}
            </span>
          </div>
          <div className="flex items-center gap-2">
            <button
              onClick={handlePrint}
              className="flex items-center gap-1.5 px-3 py-1.5 bg-blue-600 hover:bg-blue-700 text-white text-xs font-semibold rounded-lg transition-colors"
            >
              <Printer className="w-3.5 h-3.5" />
              In Bản Giấy (A4)
            </button>
            <button
              onClick={onClose}
              className="p-1 rounded-lg text-slate-400 hover:text-white hover:bg-slate-800 transition-colors"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Printable Worksheet Area */}
        <div className="p-6 sm:p-8 overflow-y-auto space-y-6 print-area bg-white text-slate-800">
          {/* Header block for Print & Screen */}
          <div className="border-b-2 border-slate-900 pb-4">
            <div className="flex justify-between items-start">
              <div>
                <span className="text-xs uppercase font-extrabold tracking-wider text-blue-700">
                  DigiEdu — Phiếu Học Tập Chuyển Tiếp Tuần {worksheet.week}
                </span>
                <h1 className="text-xl sm:text-2xl font-black text-slate-900 mt-1">
                  {worksheet.title}
                </h1>
              </div>
              <div className="text-right text-xs text-slate-500">
                <p className="font-semibold text-slate-700">{worksheet.authorAttribution}</p>
                <p className="flex items-center justify-end gap-1 mt-0.5">
                  <Clock className="w-3 h-3" /> {worksheet.duration}
                </p>
              </div>
            </div>

            {/* Mandatory Legal Citation Watermark */}
            <div className="mt-3 bg-slate-50 border border-slate-200 rounded-lg p-2.5 text-[11px] text-slate-600 flex items-start gap-2">
              <ShieldCheck className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
              <div>
                <span className="font-bold text-slate-700">Căn cứ pháp lý: </span>
                {worksheet.legalCitation} | <span className="italic">Tham khảo: {worksheet.publisherReference}</span>
              </div>
            </div>
          </div>

          {/* Part 1: Core Concepts Summary */}
          <div>
            <h2 className="text-sm font-bold text-blue-900 uppercase tracking-wide flex items-center gap-2 mb-3">
              <span className="w-6 h-6 rounded-full bg-blue-100 text-blue-800 text-xs flex items-center justify-center font-bold">
                I
              </span>
              Tóm Tắt Trọng Tâm Kiến Thức (2–3 Trang Tinh Gọn)
            </h2>
            <div className="bg-blue-50/50 border border-blue-100 rounded-xl p-4 text-sm leading-relaxed space-y-2">
              <p className="font-medium text-slate-900">{worksheet.summary}</p>
              <ul className="list-disc list-inside space-y-1.5 text-slate-700 pl-1">
                {worksheet.coreConcepts && worksheet.coreConcepts.map((item, idx) => (
                  <li key={idx} className="leading-normal">{item}</li>
                ))}
              </ul>
            </div>
          </div>

          {/* Part 2: Practice Exercises */}
          <div>
            <h2 className="text-sm font-bold text-blue-900 uppercase tracking-wide flex items-center gap-2 mb-3">
              <span className="w-6 h-6 rounded-full bg-blue-100 text-blue-800 text-xs flex items-center justify-center font-bold">
                II
              </span>
              Bài Tập Luyện Tập Trọng Tâm
            </h2>
            <div className="space-y-4">
              {worksheet.sampleExercises && worksheet.sampleExercises.map((ex, idx) => (
                <div key={idx} className="border border-slate-200 rounded-xl p-4 bg-white shadow-sm">
                  <p className="font-semibold text-slate-800 text-sm mb-2">
                    {ex.question}
                  </p>
                  
                  {/* Space for handwriting on print */}
                  <div className="hidden print:block h-20 border-b border-dashed border-slate-300 mt-2">
                    <span className="text-[10px] text-slate-400 italic">Phần làm bài của học sinh:</span>
                  </div>

                  {/* Toggle hint on web */}
                  <div className="no-print mt-2">
                    <button
                      onClick={() => toggleHint(idx)}
                      className="text-xs font-semibold text-blue-600 hover:text-blue-800 flex items-center gap-1"
                    >
                      <HelpCircle className="w-3.5 h-3.5" />
                      {revealedHints[idx] ? 'Ẩn hướng dẫn giải' : 'Xem hướng dẫn giải / Gợi ý'}
                      {revealedHints[idx] ? <ChevronUp className="w-3 h-3" /> : <ChevronDown className="w-3 h-3" />}
                    </button>
                    {revealedHints[idx] && (
                      <div className="mt-2 p-3 bg-emerald-50 border border-emerald-200 rounded-lg text-xs text-emerald-900 animate-in fade-in duration-150">
                        <span className="font-bold">Gợi ý đáp án: </span>
                        {ex.hint}
                      </div>
                    )}
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Part 3: Student Notes */}
          <div className="border-t border-slate-200 pt-4 text-xs text-slate-500">
            <p className="italic">
              * Học sinh hoàn thành phiếu vào vở bài tập. Phiếu được sử dụng trong tuần 1–4 trong lúc chờ nhận sách giáo khoa mới.
            </p>
          </div>
        </div>

        {/* Footer actions on screen */}
        <div className="p-4 bg-slate-50 border-t border-slate-200 flex justify-between items-center no-print">
          <span className="text-xs text-slate-500">
            Trình duyệt hỗ trợ in ra file PDF chuẩn A4
          </span>
          <button
            onClick={onClose}
            className="px-5 py-2 bg-slate-200 hover:bg-slate-300 text-slate-800 text-xs font-semibold rounded-lg transition-colors"
          >
            Đóng
          </button>
        </div>
      </div>
    </div>
  )
}
