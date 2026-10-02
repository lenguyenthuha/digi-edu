import React, { useState } from 'react'

export default function AdminPanel({ onAddWorksheet, onAddInventory, onResetData }) {
  const [activeSubTab, setActiveSubTab] = useState('add_worksheet')
  const [notification, setNotification] = useState(null)

  // Worksheet State
  const [title, setTitle] = useState('')
  const [grade, setGrade] = useState(8)
  const [subject, setSubject] = useState('Toán học')
  const [week, setWeek] = useState(1)
  const [duration, setDuration] = useState('45 phút')
  const [summary, setSummary] = useState('')
  const [publisherReference, setPublisherReference] = useState('SGK Toán 8 — Bộ Kết Nối Tri Thức')
  const [authorAttribution, setAuthorAttribution] = useState('Tổ Chuyên Môn')

  // Inventory State
  const [invClassName, setInvClassName] = useState('Lớp 9A1')
  const [invBookTitle, setInvBookTitle] = useState('SGK Tiếng Anh 9 (Tập 1)')
  const [invGrade, setInvGrade] = useState(9)
  const [invSubject, setInvSubject] = useState('Tiếng Anh')
  const [invDonated, setInvDonated] = useState(10)
  const [invAvailable, setInvAvailable] = useState(10)
  const [invTeacher, setInvTeacher] = useState('Cô Hoàng Lan')
  const [invLocation, setInvLocation] = useState('Góc cuối lớp 9A1')

  const handleCreateWorksheet = (e) => {
    e.preventDefault()
    if (!title.trim() || !summary.trim()) {
      alert('Vui lòng nhập đầy đủ tiêu đề và nội dung tóm tắt.')
      return
    }

    const newWs = {
      id: `ws-${Date.now()}`,
      title,
      grade: Number(grade),
      subject,
      week: Number(week),
      duration,
      summary,
      publisherReference,
      authorAttribution,
      legalCitation: "Tài liệu học tập chuyển tiếp.",
      coreConcepts: [summary],
      sampleExercises: [
        {
          question: `Bài tập vận dụng cho: ${title}`,
          hint: "Học sinh đối chiếu các kiến thức cơ bản trong bài học để hoàn thành."
        }
      ],
      createdAt: new Date().toISOString()
    }

    onAddWorksheet(newWs)
    setTitle('')
    setSummary('')
    setNotification('Đã xuất bản phiếu học tập.')
    setTimeout(() => setNotification(null), 3000)
  }

  const handleCreateInventory = (e) => {
    e.preventDefault()
    if (!invClassName.trim() || !invBookTitle.trim()) {
      alert('Vui lòng điền đủ tên lớp và tên sách.')
      return
    }

    const newInv = {
      id: `inv-${Date.now()}`,
      className: invClassName,
      bookTitle: invBookTitle,
      grade: Number(invGrade),
      subject: invSubject,
      totalDonated: Number(invDonated),
      totalAvailable: Number(invAvailable),
      status: Number(invAvailable) > 0 ? 'AVAILABLE' : 'SHORTAGE',
      homeroomTeacher: invTeacher,
      location: invLocation,
      updatedAt: new Date().toISOString()
    }

    onAddInventory(newInv)
    setInvBookTitle('')
    setNotification('Đã lưu thông tin sách lớp.')
    setTimeout(() => setNotification(null), 3000)
  }

  return (
    <div className="space-y-10 max-w-2xl mx-auto">
      {/* Quiet Header */}
      <section className="text-center pt-8 pb-2">
        <span className="text-[13px] font-semibold text-[#86868b] tracking-wider uppercase">
          Ban biên tập & Thư viện
        </span>
        <h1 className="text-3xl sm:text-5xl font-semibold text-[#1d1d1f] tracking-tight mt-2 mb-3">
          Quản trị học liệu.
        </h1>
        <p className="text-[15px] sm:text-[17px] text-[#86868b] leading-relaxed">
          Biên soạn phiếu học tập tuần hoặc thêm sách vào tủ sách lớp học.
        </p>
      </section>

      {/* Segmented Sub Tabs */}
      <div className="flex items-center justify-center gap-1 bg-black/[0.03] p-1 rounded-full border border-black/[0.04] max-w-xs mx-auto">
        <button
          onClick={() => setActiveSubTab('add_worksheet')}
          className={`flex-1 py-1.5 px-3 text-[13px] font-medium rounded-full transition-all ${
            activeSubTab === 'add_worksheet'
              ? 'bg-white text-[#1d1d1f] shadow-sm font-semibold'
              : 'text-[#86868b] hover:text-[#1d1d1f]'
          }`}
        >
          Phiếu học tập
        </button>
        <button
          onClick={() => setActiveSubTab('add_inventory')}
          className={`flex-1 py-1.5 px-3 text-[13px] font-medium rounded-full transition-all ${
            activeSubTab === 'add_inventory'
              ? 'bg-white text-[#1d1d1f] shadow-sm font-semibold'
              : 'text-[#86868b] hover:text-[#1d1d1f]'
          }`}
        >
          Tủ sách lớp
        </button>
      </div>

      {notification && (
        <div className="p-3 bg-[#f5f5f7] rounded-[14px] text-center text-[13px] text-[#1d1d1f] font-medium">
          {notification}
        </div>
      )}

      {/* Add Worksheet Form */}
      {activeSubTab === 'add_worksheet' && (
        <form onSubmit={handleCreateWorksheet} className="bg-white rounded-[24px] border border-black/[0.06] p-8 space-y-5">
          <div className="grid grid-cols-3 gap-3">
            <div>
              <label className="block text-[12px] font-medium text-[#86868b] mb-1">Khối lớp</label>
              <select
                value={grade}
                onChange={(e) => setGrade(e.target.value)}
                className="w-full px-3 py-2 text-[14px] bg-[#f5f5f7] border border-black/[0.06] rounded-[12px] focus:outline-none focus:border-[#0071e3]"
              >
                {[6, 7, 8, 9, 10, 11, 12].map(g => (
                  <option key={g} value={g}>Khối {g}</option>
                ))}
              </select>
            </div>

            <div>
              <label className="block text-[12px] font-medium text-[#86868b] mb-1">Môn học</label>
              <select
                value={subject}
                onChange={(e) => setSubject(e.target.value)}
                className="w-full px-3 py-2 text-[14px] bg-[#f5f5f7] border border-black/[0.06] rounded-[12px] focus:outline-none focus:border-[#0071e3]"
              >
                {['Toán học', 'Ngữ văn', 'Tiếng Anh', 'Vật lí', 'Hóa học', 'Sinh học', 'Khoa học tự nhiên'].map(s => (
                  <option key={s} value={s}>{s}</option>
                ))}
              </select>
            </div>

            <div>
              <label className="block text-[12px] font-medium text-[#86868b] mb-1">Tuần học</label>
              <select
                value={week}
                onChange={(e) => setWeek(e.target.value)}
                className="w-full px-3 py-2 text-[14px] bg-[#f5f5f7] border border-black/[0.06] rounded-[12px] focus:outline-none focus:border-[#0071e3]"
              >
                {[1, 2, 3, 4].map(w => (
                  <option key={w} value={w}>Tuần {w}</option>
                ))}
              </select>
            </div>
          </div>

          <div>
            <label className="block text-[12px] font-medium text-[#86868b] mb-1">Tiêu đề bài học</label>
            <input
              type="text"
              required
              placeholder="VD: Toán 8 — Tuần 1: Hằng đẳng thức"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              className="w-full px-4 py-2.5 text-[14px] bg-[#f5f5f7] border border-black/[0.06] rounded-[12px] focus:outline-none focus:border-[#0071e3]"
            />
          </div>

          <div>
            <label className="block text-[12px] font-medium text-[#86868b] mb-1">Tóm tắt nội dung trọng tâm</label>
            <textarea
              required
              rows={4}
              placeholder="Nội dung tóm tắt kiến thức cốt lõi..."
              value={summary}
              onChange={(e) => setSummary(e.target.value)}
              className="w-full px-4 py-2.5 text-[14px] bg-[#f5f5f7] border border-black/[0.06] rounded-[12px] focus:outline-none focus:border-[#0071e3]"
            />
          </div>

          <div className="grid grid-cols-2 gap-3">
            <div>
              <label className="block text-[12px] font-medium text-[#86868b] mb-1">Tài liệu tham khảo</label>
              <input
                type="text"
                value={publisherReference}
                onChange={(e) => setPublisherReference(e.target.value)}
                className="w-full px-4 py-2 text-[14px] bg-[#f5f5f7] border border-black/[0.06] rounded-[12px] focus:outline-none focus:border-[#0071e3]"
              />
            </div>
            <div>
              <label className="block text-[12px] font-medium text-[#86868b] mb-1">Người biên soạn</label>
              <input
                type="text"
                value={authorAttribution}
                onChange={(e) => setAuthorAttribution(e.target.value)}
                className="w-full px-4 py-2 text-[14px] bg-[#f5f5f7] border border-black/[0.06] rounded-[12px] focus:outline-none focus:border-[#0071e3]"
              />
            </div>
          </div>

          <button
            type="submit"
            className="w-full py-3 bg-[#0071e3] hover:bg-[#0077ed] text-white text-[14px] font-medium rounded-full transition-colors"
          >
            Xuất bản phiếu học tập
          </button>
        </form>
      )}

      {/* Add Inventory Form */}
      {activeSubTab === 'add_inventory' && (
        <form onSubmit={handleCreateInventory} className="bg-white rounded-[24px] border border-black/[0.06] p-8 space-y-5">
          <div className="grid grid-cols-2 gap-3">
            <div>
              <label className="block text-[12px] font-medium text-[#86868b] mb-1">Lớp học</label>
              <input
                type="text"
                required
                placeholder="VD: Lớp 8A3"
                value={invClassName}
                onChange={(e) => setInvClassName(e.target.value)}
                className="w-full px-4 py-2 text-[14px] bg-[#f5f5f7] border border-black/[0.06] rounded-[12px] focus:outline-none focus:border-[#0071e3]"
              />
            </div>

            <div>
              <label className="block text-[12px] font-medium text-[#86868b] mb-1">Tên sách</label>
              <input
                type="text"
                required
                placeholder="VD: SGK Địa lí 8"
                value={invBookTitle}
                onChange={(e) => setInvBookTitle(e.target.value)}
                className="w-full px-4 py-2 text-[14px] bg-[#f5f5f7] border border-black/[0.06] rounded-[12px] focus:outline-none focus:border-[#0071e3]"
              />
            </div>
          </div>

          <div className="grid grid-cols-2 gap-3">
            <div>
              <label className="block text-[12px] font-medium text-[#86868b] mb-1">Tổng quyên góp</label>
              <input
                type="number"
                min="1"
                value={invDonated}
                onChange={(e) => setInvDonated(e.target.value)}
                className="w-full px-4 py-2 text-[14px] bg-[#f5f5f7] border border-black/[0.06] rounded-[12px] focus:outline-none focus:border-[#0071e3]"
              />
            </div>

            <div>
              <label className="block text-[12px] font-medium text-[#86868b] mb-1">Số lượng hiện có</label>
              <input
                type="number"
                min="0"
                value={invAvailable}
                onChange={(e) => setInvAvailable(e.target.value)}
                className="w-full px-4 py-2 text-[14px] bg-[#f5f5f7] border border-black/[0.06] rounded-[12px] focus:outline-none focus:border-[#0071e3]"
              />
            </div>
          </div>

          <div className="grid grid-cols-2 gap-3">
            <div>
              <label className="block text-[12px] font-medium text-[#86868b] mb-1">Giáo viên phụ trách</label>
              <input
                type="text"
                value={invTeacher}
                onChange={(e) => setInvTeacher(e.target.value)}
                className="w-full px-4 py-2 text-[14px] bg-[#f5f5f7] border border-black/[0.06] rounded-[12px] focus:outline-none focus:border-[#0071e3]"
              />
            </div>

            <div>
              <label className="block text-[12px] font-medium text-[#86868b] mb-1">Vị trí để sách</label>
              <input
                type="text"
                value={invLocation}
                onChange={(e) => setInvLocation(e.target.value)}
                className="w-full px-4 py-2 text-[14px] bg-[#f5f5f7] border border-black/[0.06] rounded-[12px] focus:outline-none focus:border-[#0071e3]"
              />
            </div>
          </div>

          <button
            type="submit"
            className="w-full py-3 bg-[#0071e3] hover:bg-[#0077ed] text-white text-[14px] font-medium rounded-full transition-colors"
          >
            Lưu vào tủ sách lớp
          </button>
        </form>
      )}

      {/* Reset data */}
      <div className="text-center pt-4">
        <button
          onClick={() => {
            if (confirm('Khôi phục lại dữ liệu ban đầu?')) {
              onResetData()
              alert('Đã khôi phục dữ liệu ban đầu.')
            }
          }}
          className="text-[12px] text-[#86868b] hover:text-[#1d1d1f] hover:underline"
        >
          Khôi phục dữ liệu mẫu mặc định
        </button>
      </div>
    </div>
  )
}
