import React, { useState, useMemo } from 'react'
import WorksheetCard from './WorksheetCard'
import WorksheetViewModal from './WorksheetViewModal'
import { Search, Filter, BookOpen, Sparkles, CheckCircle2 } from 'lucide-react'

export default function WorksheetHub({ worksheets }) {
  const [selectedGrade, setSelectedGrade] = useState('ALL')
  const [selectedSubject, setSelectedSubject] = useState('ALL')
  const [selectedWeek, setSelectedWeek] = useState('ALL')
  const [searchQuery, setSearchQuery] = useState('')
  const [activeWorksheet, setActiveWorksheet] = useState(null)
  const [isModalOpen, setIsModalOpen] = useState(false)

  // Extract unique subjects from worksheets
  const subjects = useMemo(() => {
    const set = new Set(worksheets.map(w => w.subject))
    return ['ALL', ...Array.from(set)]
  }, [worksheets])

  // Filtered worksheets
  const filteredWorksheets = useMemo(() => {
    return worksheets.filter(w => {
      const matchGrade = selectedGrade === 'ALL' || w.grade === Number(selectedGrade)
      const matchSubject = selectedSubject === 'ALL' || w.subject === selectedSubject
      const matchWeek = selectedWeek === 'ALL' || w.week === Number(selectedWeek)
      const matchSearch = searchQuery.trim() === '' || 
        w.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        w.summary.toLowerCase().includes(searchQuery.toLowerCase())
      return matchGrade && matchSubject && matchWeek && matchSearch
    })
  }, [worksheets, selectedGrade, selectedSubject, selectedWeek, searchQuery])

  const handleView = (ws) => {
    setActiveWorksheet(ws)
    setIsModalOpen(true)
  }

  const handlePrint = (ws) => {
    setActiveWorksheet(ws)
    setIsModalOpen(true)
    setTimeout(() => {
      window.print()
    }, 300)
  }

  return (
    <div className="space-y-8">
      {/* Hero Welcome Banner */}
      <div className="bg-gradient-to-br from-blue-700 via-indigo-700 to-blue-900 rounded-3xl p-6 sm:p-10 text-white shadow-xl relative overflow-hidden">
        <div className="relative z-10 max-w-2xl">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/10 backdrop-blur border border-white/20 text-xs font-semibold text-blue-200 mb-4">
            <Sparkles className="w-3.5 h-3.5 text-yellow-300" />
            <span>Tầng 1: Học Liệu Chuyển Tiếp Tuần 1–4</span>
          </div>
          <h1 className="text-2xl sm:text-4xl font-extrabold tracking-tight leading-tight">
            Phiếu Học Tập Tinh Gọn — Không Lo Thiếu Sách
          </h1>
          <p className="mt-3 text-sm sm:text-base text-blue-100/90 leading-relaxed">
            Tóm tắt kiến thức trọng tâm và bài tập cơ bản 2–3 trang do các tổ chuyên môn nhà trường biên soạn. Học sinh, phụ huynh tự do truy cập, xem và in ấn mà không cần tài khoản.
          </p>

          <div className="mt-6 flex flex-wrap gap-4 text-xs font-medium text-blue-200">
            <span className="flex items-center gap-1.5">
              <CheckCircle2 className="w-4 h-4 text-emerald-400" />
              Không rào cản đăng nhập
            </span>
            <span className="flex items-center gap-1.5">
              <CheckCircle2 className="w-4 h-4 text-emerald-400" />
              Tuân thủ Điều 25 Luật SHTT
            </span>
            <span className="flex items-center gap-1.5">
              <CheckCircle2 className="w-4 h-4 text-emerald-400" />
              Hỗ trợ in ấn chuẩn A4
            </span>
          </div>
        </div>
      </div>

      {/* Filter and Search Bar */}
      <div className="bg-white rounded-2xl border border-slate-200 p-5 shadow-sm space-y-4">
        {/* Search input */}
        <div className="relative">
          <Search className="w-5 h-5 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
          <input
            type="text"
            placeholder="Tìm theo tên bài học, môn học hoặc từ khóa kiến thức..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full pl-11 pr-4 py-2.5 rounded-xl border border-slate-200 focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 text-sm"
          />
        </div>

        {/* Filter Badges */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 pt-2">
          {/* Grade */}
          <div>
            <label className="block text-xs font-semibold text-slate-600 mb-1.5">
              Khối lớp
            </label>
            <select
              value={selectedGrade}
              onChange={(e) => setSelectedGrade(e.target.value)}
              className="w-full px-3 py-2 text-xs font-medium bg-slate-50 border border-slate-200 rounded-lg focus:outline-none focus:border-blue-500"
            >
              <option value="ALL">Tất cả khối lớp (6-12)</option>
              <option value="6">Khối 6</option>
              <option value="7">Khối 7</option>
              <option value="8">Khối 8</option>
              <option value="9">Khối 9</option>
              <option value="10">Khối 10</option>
              <option value="11">Khối 11</option>
              <option value="12">Khối 12</option>
            </select>
          </div>

          {/* Subject */}
          <div>
            <label className="block text-xs font-semibold text-slate-600 mb-1.5">
              Môn học
            </label>
            <select
              value={selectedSubject}
              onChange={(e) => setSelectedSubject(e.target.value)}
              className="w-full px-3 py-2 text-xs font-medium bg-slate-50 border border-slate-200 rounded-lg focus:outline-none focus:border-blue-500"
            >
              {subjects.map(s => (
                <option key={s} value={s}>
                  {s === 'ALL' ? 'Tất cả môn học' : s}
                </option>
              ))}
            </select>
          </div>

          {/* Week */}
          <div>
            <label className="block text-xs font-semibold text-slate-600 mb-1.5">
              Tuần học chuyển tiếp
            </label>
            <select
              value={selectedWeek}
              onChange={(e) => setSelectedWeek(e.target.value)}
              className="w-full px-3 py-2 text-xs font-medium bg-slate-50 border border-slate-200 rounded-lg focus:outline-none focus:border-blue-500"
            >
              <option value="ALL">Tất cả các tuần (1 - 4)</option>
              <option value="1">Tuần 1</option>
              <option value="2">Tuần 2</option>
              <option value="3">Tuần 3</option>
              <option value="4">Tuần 4</option>
            </select>
          </div>
        </div>
      </div>

      {/* Results Header */}
      <div className="flex items-center justify-between">
        <h2 className="text-base font-bold text-slate-800 flex items-center gap-2">
          <BookOpen className="w-5 h-5 text-blue-600" />
          Danh sách phiếu học tập ({filteredWorksheets.length} tài liệu)
        </h2>
        {(selectedGrade !== 'ALL' || selectedSubject !== 'ALL' || selectedWeek !== 'ALL' || searchQuery) && (
          <button
            onClick={() => {
              setSelectedGrade('ALL')
              setSelectedSubject('ALL')
              setSelectedWeek('ALL')
              setSearchQuery('')
            }}
            className="text-xs text-blue-600 hover:underline font-medium"
          >
            Đặt lại bộ lọc
          </button>
        )}
      </div>

      {/* Worksheet Cards Grid */}
      {filteredWorksheets.length > 0 ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
          {filteredWorksheets.map((ws) => (
            <WorksheetCard
              key={ws.id}
              worksheet={ws}
              onView={handleView}
              onPrint={handlePrint}
            />
          ))}
        </div>
      ) : (
        <div className="bg-white rounded-2xl border border-dashed border-slate-300 p-12 text-center">
          <BookOpen className="w-12 h-12 text-slate-300 mx-auto mb-3" />
          <h3 className="text-base font-bold text-slate-700">Chưa tìm thấy phiếu học tập phù hợp</h3>
          <p className="text-xs text-slate-500 mt-1 max-w-sm mx-auto">
            Vui lòng thử chọn khối lớp khác hoặc tìm kiếm với từ khóa tổng quát hơn.
          </p>
        </div>
      )}

      {/* Modal Detail / Print */}
      <WorksheetViewModal
        worksheet={activeWorksheet}
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
      />
    </div>
  )
}
