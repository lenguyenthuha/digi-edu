import React from 'react'
import { BookOpen, Calendar, Printer, Eye, ShieldCheck, CheckCircle } from 'lucide-react'

export default function WorksheetCard({ worksheet, onView, onPrint }) {
  const getSubjectColor = (subject) => {
    switch (subject) {
      case 'Toán học': return 'bg-blue-50 text-blue-700 border-blue-200'
      case 'Ngữ văn': return 'bg-amber-50 text-amber-700 border-amber-200'
      case 'Tiếng Anh': return 'bg-purple-50 text-purple-700 border-purple-200'
      case 'Vật lí': return 'bg-rose-50 text-rose-700 border-rose-200'
      default: return 'bg-emerald-50 text-emerald-700 border-emerald-200'
    }
  }

  return (
    <div className="bg-white rounded-xl border border-slate-200 p-5 shadow-sm hover:shadow-md transition-all flex flex-col justify-between group">
      <div>
        {/* Top Badges */}
        <div className="flex items-center justify-between mb-3">
          <div className="flex items-center gap-2">
            <span className="px-2.5 py-1 text-xs font-bold rounded-lg bg-slate-900 text-white">
              Khối {worksheet.grade}
            </span>
            <span className={`px-2.5 py-1 text-xs font-semibold rounded-lg border ${getSubjectColor(worksheet.subject)}`}>
              {worksheet.subject}
            </span>
          </div>
          <span className="flex items-center gap-1 text-xs font-medium text-slate-500 bg-slate-100 px-2 py-0.5 rounded-full">
            <Calendar className="w-3.5 h-3.5" />
            Tuần {worksheet.week}
          </span>
        </div>

        {/* Title */}
        <h3 className="font-bold text-slate-900 text-base group-hover:text-blue-600 transition-colors line-clamp-2 mb-2">
          {worksheet.title}
        </h3>

        {/* Summary */}
        <p className="text-xs text-slate-600 line-clamp-3 mb-4 leading-relaxed">
          {worksheet.summary}
        </p>

        {/* Legal notice small badge */}
        <div className="bg-slate-50 border border-slate-200/80 rounded-lg p-2.5 mb-4">
          <div className="flex items-center gap-1.5 text-[11px] font-semibold text-emerald-700 mb-0.5">
            <ShieldCheck className="w-3.5 h-3.5" />
            <span>Ngoại lệ Điều 25 Luật SHTT</span>
          </div>
          <p className="text-[11px] text-slate-500 line-clamp-1 italic">
            Nguồn: {worksheet.publisherReference}
          </p>
        </div>
      </div>

      {/* Action Buttons */}
      <div className="flex items-center gap-2 pt-3 border-t border-slate-100">
        <button
          onClick={() => onView(worksheet)}
          className="flex-1 flex items-center justify-center gap-1.5 px-3 py-2 text-xs font-semibold bg-blue-600 hover:bg-blue-700 text-white rounded-lg transition-colors shadow-sm"
        >
          <Eye className="w-3.5 h-3.5" />
          Xem & Luyện Tập
        </button>

        <button
          onClick={() => onPrint(worksheet)}
          className="flex items-center justify-center gap-1 px-3 py-2 text-xs font-medium text-slate-700 hover:text-slate-900 bg-slate-100 hover:bg-slate-200 rounded-lg transition-colors"
          title="Tải in chuẩn A4 không tốn phí"
        >
          <Printer className="w-3.5 h-3.5" />
          In A4
        </button>
      </div>
    </div>
  )
}
