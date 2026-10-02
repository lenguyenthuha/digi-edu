import React from 'react'

export default function WorksheetCard({ worksheet, onView, onPrint }) {
  return (
    <div className="bg-white rounded-[18px] border border-black/[0.06] p-6 flex flex-col justify-between hover:border-black/[0.12] hover:shadow-sm transition-all duration-200">
      <div>
        {/* Top Meta */}
        <div className="flex items-center justify-between text-[12px] text-[#86868b] mb-3">
          <span className="font-medium text-[#1d1d1f]">
            Khối {worksheet.grade} • {worksheet.subject}
          </span>
          <span className="px-2 py-0.5 rounded-full bg-black/[0.03] text-[11px] font-medium">
            Tuần {worksheet.week}
          </span>
        </div>

        {/* Title */}
        <h3 
          onClick={() => onView(worksheet)}
          className="text-[17px] font-semibold text-[#1d1d1f] tracking-tight leading-snug cursor-pointer hover:text-[#0071e3] transition-colors mb-2"
        >
          {worksheet.title}
        </h3>

        {/* Summary */}
        <p className="text-[13px] text-[#6e6e73] leading-relaxed line-clamp-3 mb-4">
          {worksheet.summary}
        </p>

        {/* Reference */}
        <p className="text-[11px] text-[#86868b] truncate mb-5">
          {worksheet.publisherReference}
        </p>
      </div>

      {/* Action Buttons */}
      <div className="flex items-center gap-2 pt-4 border-t border-black/[0.04]">
        <button
          onClick={() => onView(worksheet)}
          className="flex-1 py-2 px-3 text-[13px] font-medium bg-[#0071e3] hover:bg-[#0077ed] text-white rounded-full transition-colors text-center"
        >
          Xem bài học
        </button>

        <button
          onClick={() => onPrint(worksheet)}
          className="py-2 px-3.5 text-[13px] font-medium text-[#1d1d1f] bg-black/[0.04] hover:bg-black/[0.08] rounded-full transition-colors text-center"
        >
          In A4
        </button>
      </div>
    </div>
  )
}
