import React, { useState, useMemo } from 'react'
import WorksheetCard from './WorksheetCard'
import WorksheetViewModal from './WorksheetViewModal'
import { Search } from 'lucide-react'

export default function WorksheetHub({ worksheets }) {
  const [selectedGrade, setSelectedGrade] = useState('ALL')
  const [selectedSubject, setSelectedSubject] = useState('ALL')
  const [selectedWeek, setSelectedWeek] = useState('ALL')
  const [searchQuery, setSearchQuery] = useState('')
  const [activeWorksheet, setActiveWorksheet] = useState(null)
  const [isModalOpen, setIsModalOpen] = useState(false)

  const grades = ['ALL', '6', '7', '8', '9', '10', '11', '12']

  const subjects = useMemo(() => {
    const set = new Set(worksheets.map(w => w.subject))
    return ['ALL', ...Array.from(set)]
  }, [worksheets])

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
    <div className="space-y-12">
      {/* Apple-style Quiet Hero Section */}
      <section className="text-center pt-8 pb-4 max-w-2xl mx-auto px-4">
        <span className="text-[13px] font-semibold text-[#86868b] tracking-wider uppercase">
          Học liệu chuyển tiếp
        </span>
        <h1 className="text-3xl sm:text-5xl font-semibold text-[#1d1d1f] tracking-tight mt-2 mb-3">
          Tài liệu tuần 1–4.
        </h1>
        <p className="text-[15px] sm:text-[17px] text-[#86868b] leading-relaxed">
          Tóm tắt kiến thức cốt lõi và bài tập cơ bản cho các tuần đầu năm học.
        </p>

        {/* Spotlight Search Bar */}
        <div className="relative mt-8 max-w-lg mx-auto">
          <Search className="w-4 h-4 text-[#86868b] absolute left-4 top-1/2 -translate-y-1/2" />
          <input
            type="text"
            placeholder="Tìm theo môn học, khối lớp hoặc bài học..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full pl-11 pr-4 py-3 rounded-full bg-white border border-black/[0.08] shadow-sm text-[14px] text-[#1d1d1f] placeholder-[#86868b] focus:outline-none focus:ring-2 focus:ring-[#0071e3]/20 focus:border-[#0071e3] transition-all"
          />
        </div>
      </section>

      {/* Segmented Filter Controls */}
      <section className="space-y-4 max-w-5xl mx-auto">
        {/* Grade Pills */}
        <div className="flex items-center justify-center flex-wrap gap-1.5">
          {grades.map(g => (
            <button
              key={g}
              onClick={() => setSelectedGrade(g)}
              className={`px-3.5 py-1.5 rounded-full text-[13px] transition-all ${
                selectedGrade === g
                  ? 'bg-[#1d1d1f] text-white font-medium shadow-sm'
                  : 'bg-black/[0.03] text-[#6e6e73] hover:text-[#1d1d1f] hover:bg-black/[0.06]'
              }`}
            >
              {g === 'ALL' ? 'Tất cả khối' : `Khối ${g}`}
            </button>
          ))}
        </div>

        {/* Secondary filters (Subject & Week) */}
        <div className="flex items-center justify-center gap-3 text-[13px]">
          <select
            value={selectedSubject}
            onChange={(e) => setSelectedSubject(e.target.value)}
            className="bg-white border border-black/[0.08] text-[#1d1d1f] px-3.5 py-1.5 rounded-full focus:outline-none focus:border-[#0071e3]"
          >
            <option value="ALL">Tất cả môn học</option>
            {subjects.filter(s => s !== 'ALL').map(s => (
              <option key={s} value={s}>{s}</option>
            ))}
          </select>

          <select
            value={selectedWeek}
            onChange={(e) => setSelectedWeek(e.target.value)}
            className="bg-white border border-black/[0.08] text-[#1d1d1f] px-3.5 py-1.5 rounded-full focus:outline-none focus:border-[#0071e3]"
          >
            <option value="ALL">Tất cả các tuần (1–4)</option>
            <option value="1">Tuần 1</option>
            <option value="2">Tuần 2</option>
            <option value="3">Tuần 3</option>
            <option value="4">Tuần 4</option>
          </select>

          {(selectedGrade !== 'ALL' || selectedSubject !== 'ALL' || selectedWeek !== 'ALL' || searchQuery) && (
            <button
              onClick={() => {
                setSelectedGrade('ALL')
                setSelectedSubject('ALL')
                setSelectedWeek('ALL')
                setSearchQuery('')
              }}
              className="text-[#0071e3] hover:underline text-[12px] font-medium"
            >
              Xóa bộ lọc
            </button>
          )}
        </div>
      </section>

      {/* Worksheet Cards Grid */}
      <section className="max-w-5xl mx-auto">
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
          <div className="bg-white rounded-[18px] border border-black/[0.06] p-12 text-center max-w-md mx-auto">
            <p className="text-[15px] font-medium text-[#1d1d1f]">Không tìm thấy bài học phù hợp</p>
            <p className="text-[13px] text-[#86868b] mt-1">
              Thử tìm kiếm từ khóa khác hoặc xóa bộ lọc để hiển thị toàn bộ tài liệu.
            </p>
          </div>
        )}
      </section>

      {/* Reader / Print Modal */}
      <WorksheetViewModal
        worksheet={activeWorksheet}
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
      />
    </div>
  )
}
