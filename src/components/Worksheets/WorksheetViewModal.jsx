import React, { useState } from 'react'
import { X, Printer, ChevronDown, ChevronUp } from 'lucide-react'

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
    <div className="fixed inset-0 z-50 overflow-y-auto bg-black/40 backdrop-blur-sm flex items-center justify-center p-3 sm:p-6">
      <div className="bg-white rounded-[24px] max-w-3xl w-full shadow-2xl border border-black/[0.08] overflow-hidden max-h-[90vh] flex flex-col animate-in fade-in zoom-in-95 duration-150">
        {/* Top Minimalist Header */}
        <div className="px-6 py-4 border-b border-black/[0.06] flex items-center justify-between no-print bg-[#fbfbfd]">
          <div className="flex items-center gap-2 text-[13px] text-[#86868b]">
            <span className="font-semibold text-[#1d1d1f]">Khối {worksheet.grade}</span>
            <span>•</span>
            <span>{worksheet.subject}</span>
            <span>•</span>
            <span>Tuần {worksheet.week}</span>
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={handlePrint}
              className="flex items-center gap-1.5 px-3.5 py-1.5 bg-[#0071e3] hover:bg-[#0077ed] text-white text-[13px] font-medium rounded-full transition-colors"
            >
              <Printer className="w-3.5 h-3.5" />
              In A4
            </button>
            <button
              onClick={onClose}
              className="w-8 h-8 flex items-center justify-center rounded-full text-[#86868b] hover:text-[#1d1d1f] hover:bg-black/[0.05] transition-colors"
            >
              <X className="w-4 h-4" />
            </button>
          </div>
        </div>

        {/* Content Body */}
        <div className="p-6 sm:p-10 overflow-y-auto space-y-8 print-area text-[#1d1d1f]">
          {/* Header */}
          <div className="border-b border-black/[0.08] pb-6">
            <h1 className="text-2xl sm:text-3xl font-semibold tracking-tight text-[#1d1d1f]">
              {worksheet.title}
            </h1>
            <div className="flex flex-wrap items-center gap-3 text-[13px] text-[#86868b] mt-2">
              <span>{worksheet.authorAttribution}</span>
              <span>•</span>
              <span>Thời lượng: {worksheet.duration}</span>
              <span>•</span>
              <span className="italic">{worksheet.publisherReference}</span>
            </div>
          </div>

          {/* Part 1: Core Concepts */}
          <div className="space-y-3">
            <h2 className="text-[17px] font-semibold text-[#1d1d1f] tracking-tight">
              1. Tóm tắt nội dung trọng tâm
            </h2>
            <div className="bg-[#f5f5f7] rounded-[16px] p-5 text-[14px] leading-relaxed space-y-3 text-[#1d1d1f]">
              <p className="font-medium">{worksheet.summary}</p>
              {worksheet.coreConcepts && worksheet.coreConcepts.length > 0 && (
                <ul className="list-disc list-inside space-y-1 text-[#424245]">
                  {worksheet.coreConcepts.map((item, idx) => (
                    <li key={idx}>{item}</li>
                  ))}
                </ul>
              )}
            </div>
          </div>

          {/* Part 2: Exercises */}
          <div className="space-y-4">
            <h2 className="text-[17px] font-semibold text-[#1d1d1f] tracking-tight">
              2. Bài tập vận dụng
            </h2>
            <div className="space-y-3">
              {worksheet.sampleExercises && worksheet.sampleExercises.map((ex, idx) => (
                <div key={idx} className="border border-black/[0.06] rounded-[16px] p-5 bg-white space-y-2">
                  <p className="text-[14px] font-medium text-[#1d1d1f]">
                    {ex.question}
                  </p>

                  {/* Print writing space */}
                  <div className="hidden print:block h-24 border-b border-dashed border-slate-300 mt-2"></div>

                  {/* Interactive hint on screen */}
                  <div className="no-print pt-2">
                    <button
                      onClick={() => toggleHint(idx)}
                      className="text-[12px] font-medium text-[#0071e3] hover:underline flex items-center gap-1"
                    >
                      {revealedHints[idx] ? 'Ẩn gợi ý' : 'Xem gợi ý / đáp án'}
                      {revealedHints[idx] ? <ChevronUp className="w-3 h-3" /> : <ChevronDown className="w-3 h-3" />}
                    </button>
                    {revealedHints[idx] && (
                      <div className="mt-2 p-3 bg-[#f5f5f7] rounded-[12px] text-[13px] text-[#424245]">
                        <span className="font-semibold text-[#1d1d1f]">Gợi ý: </span>
                        {ex.hint}
                      </div>
                    )}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Modal Bottom Bar */}
        <div className="px-6 py-3.5 bg-[#fbfbfd] border-t border-black/[0.06] flex justify-end no-print">
          <button
            onClick={onClose}
            className="px-4 py-1.5 text-[13px] font-medium text-[#1d1d1f] bg-black/[0.04] hover:bg-black/[0.08] rounded-full transition-colors"
          >
            Đóng
          </button>
        </div>
      </div>
    </div>
  )
}
