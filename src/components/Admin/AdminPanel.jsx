import React, { useState } from 'react'
import { PlusCircle, Upload, ShieldCheck, Database, CheckCircle2, AlertCircle, RefreshCw } from 'lucide-react'
import { getSupabaseStatus } from '../../services/supabaseClient'

export default function AdminPanel({ onAddWorksheet, onAddInventory, onResetData }) {
  const [activeSubTab, setActiveSubTab] = useState('add_worksheet')
  const [notification, setNotification] = useState(null)
  const supabaseInfo = getSupabaseStatus()

  // Form State: Worksheet
  const [title, setTitle] = useState('')
  const [grade, setGrade] = useState(8)
  const [subject, setSubject] = useState('Toán học')
  const [week, setWeek] = useState(1)
  const [duration, setDuration] = useState('45 phút')
  const [summary, setSummary] = useState('')
  const [publisherReference, setPublisherReference] = useState('SGK Toán 8 — Bộ Chân Trời Sáng Tạo')
  const [authorAttribution, setAuthorAttribution] = useState('Tổ Chuyên Môn Toán')
  const [agreedArticle25, setAgreedArticle25] = useState(true)

  // Form State: Inventory
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

    if (!agreedArticle25) {
      alert('Bạn phải cam kết tuân thủ Điều 25 Luật SHTT (dưới 10% dung lượng, có trích dẫn nguồn).')
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
      legalCitation: "Tuân thủ Điều 25 Luật Sở hữu trí tuệ Việt Nam số 50/2005/QH11 (sửa đổi bổ sung 2022). Giảng dạy phi thương mại.",
      coreConcepts: [
        summary,
        "Được biên soạn tinh gọn phục vụ chuyển tiếp 2-4 tuần đầu năm học."
      ],
      sampleExercises: [
        {
          question: `Bài tập vận dụng 1 cho bài: ${title}`,
          hint: "Học sinh đối chiếu các kiến thức cơ bản trong bài học để hoàn thành."
        }
      ],
      createdAt: new Date().toISOString()
    }

    onAddWorksheet(newWs)
    setTitle('')
    setSummary('')
    setNotification('Đã xuất bản phiếu học tập mới thành công!')
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
    setNotification('Đã lưu thông tin tủ sách lớp thành công!')
    setTimeout(() => setNotification(null), 3000)
  }

  return (
    <div className="space-y-8 max-w-4xl mx-auto">
      {/* Backend Status Bar */}
      <div className="bg-slate-900 text-white rounded-2xl p-5 flex flex-col sm:flex-row items-center justify-between gap-4">
        <div className="flex items-center gap-3">
          <div className="p-2.5 bg-blue-600 rounded-xl">
            <Database className="w-5 h-5 text-white" />
          </div>
          <div>
            <h4 className="text-sm font-bold">Trạng Thái Cơ Sở Dữ Liệu</h4>
            <p className="text-xs text-slate-300">
              {supabaseInfo.mode}
            </p>
          </div>
        </div>

        <button
          onClick={() => {
            if (confirm('Khôi phục lại dữ liệu mẫu gốc ban đầu?')) {
              onResetData()
              alert('Đã khôi phục dữ liệu ban đầu thành công.')
            }
          }}
          className="flex items-center gap-1.5 px-3 py-1.5 text-xs font-semibold bg-slate-800 hover:bg-slate-700 text-slate-300 hover:text-white rounded-lg border border-slate-700 transition-colors"
        >
          <RefreshCw className="w-3.5 h-3.5" />
          Khôi Phục Dữ Liệu Mẫu
        </button>
      </div>

      {notification && (
        <div className="p-4 bg-emerald-50 border border-emerald-200 rounded-xl text-emerald-800 text-sm flex items-center gap-2 animate-in fade-in">
          <CheckCircle2 className="w-5 h-5 text-emerald-600 shrink-0" />
          <span>{notification}</span>
        </div>
      )}

      {/* Sub Tabs */}
      <div className="flex border-b border-slate-200 gap-4">
        <button
          onClick={() => setActiveSubTab('add_worksheet')}
          className={`pb-3 text-sm font-bold border-b-2 transition-colors ${
            activeSubTab === 'add_worksheet'
              ? 'border-blue-600 text-blue-600'
              : 'border-transparent text-slate-500 hover:text-slate-800'
          }`}
        >
          Biên Soạn Phiếu Học Tập Mới
        </button>
        <button
          onClick={() => setActiveSubTab('add_inventory')}
          className={`pb-3 text-sm font-bold border-b-2 transition-colors ${
            activeSubTab === 'add_inventory'
              ? 'border-emerald-600 text-emerald-600'
              : 'border-transparent text-slate-500 hover:text-slate-800'
          }`}
        >
          Đăng Ký Tủ Sách Lớp
        </button>
      </div>

      {/* Tab Content: Add Worksheet */}
      {activeSubTab === 'add_worksheet' && (
        <form onSubmit={handleCreateWorksheet} className="bg-white rounded-2xl border border-slate-200 p-6 space-y-5 shadow-sm">
          <div>
            <h3 className="text-base font-bold text-slate-900">
              Biên Soạn Phiếu Học Tập Tuần Chuyển Tiếp
            </h3>
            <p className="text-xs text-slate-500 mt-0.5">
              Tổ bộ môn tóm tắt trọng tâm nội dung (dưới 10% chương trình) kèm căn cứ pháp lý tự động.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            <div>
              <label className="block text-xs font-semibold text-slate-700 mb-1">
                Khối lớp
              </label>
              <select
                value={grade}
                onChange={(e) => setGrade(e.target.value)}
                className="w-full px-3 py-2 text-sm border border-slate-200 rounded-lg focus:outline-none focus:border-blue-500 bg-white"
              >
                {[6, 7, 8, 9, 10, 11, 12].map(g => (
                  <option key={g} value={g}>Khối {g}</option>
                ))}
              </select>
            </div>

            <div>
              <label className="block text-xs font-semibold text-slate-700 mb-1">
                Môn học
              </label>
              <select
                value={subject}
                onChange={(e) => setSubject(e.target.value)}
                className="w-full px-3 py-2 text-sm border border-slate-200 rounded-lg focus:outline-none focus:border-blue-500 bg-white"
              >
                {['Toán học', 'Ngữ văn', 'Tiếng Anh', 'Vật lí', 'Hóa học', 'Sinh học', 'Lịch sử & Địa lí', 'Khoa học tự nhiên', 'GDCD'].map(s => (
                  <option key={s} value={s}>{s}</option>
                ))}
              </select>
            </div>

            <div>
              <label className="block text-xs font-semibold text-slate-700 mb-1">
                Tuần học chuyển tiếp
              </label>
              <select
                value={week}
                onChange={(e) => setWeek(e.target.value)}
                className="w-full px-3 py-2 text-sm border border-slate-200 rounded-lg focus:outline-none focus:border-blue-500 bg-white"
              >
                {[1, 2, 3, 4].map(w => (
                  <option key={w} value={w}>Tuần {w}</option>
                ))}
              </select>
            </div>
          </div>

          <div>
            <label className="block text-xs font-semibold text-slate-700 mb-1">
              Tiêu đề bài học
            </label>
            <input
              type="text"
              required
              placeholder="VD: Toán 8 — Tuần 1: Hằng đẳng thức đáng nhớ"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              className="w-full px-3 py-2 text-sm border border-slate-200 rounded-lg focus:outline-none focus:border-blue-500"
            />
          </div>

          <div>
            <label className="block text-xs font-semibold text-slate-700 mb-1">
              Tóm tắt nội dung trọng tâm & kiến thức cốt lõi
            </label>
            <textarea
              required
              rows={4}
              placeholder="Ghi ngắn gọn định nghĩa, công thức hoặc điểm chính học sinh cần nắm..."
              value={summary}
              onChange={(e) => setSummary(e.target.value)}
              className="w-full px-3 py-2 text-sm border border-slate-200 rounded-lg focus:outline-none focus:border-blue-500"
            />
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-semibold text-slate-700 mb-1">
                Bộ sách tham khảo gốc
              </label>
              <input
                type="text"
                value={publisherReference}
                onChange={(e) => setPublisherReference(e.target.value)}
                className="w-full px-3 py-2 text-sm border border-slate-200 rounded-lg focus:outline-none focus:border-blue-500"
              />
            </div>
            <div>
              <label className="block text-xs font-semibold text-slate-700 mb-1">
                Tổ bộ môn / Giáo viên biên soạn
              </label>
              <input
                type="text"
                value={authorAttribution}
                onChange={(e) => setAuthorAttribution(e.target.value)}
                className="w-full px-3 py-2 text-sm border border-slate-200 rounded-lg focus:outline-none focus:border-blue-500"
              />
            </div>
          </div>

          {/* Legal Compliance Checkbox */}
          <div className="bg-emerald-50 border border-emerald-200 rounded-xl p-4 flex items-start gap-3">
            <input
              type="checkbox"
              id="agreeArticle25"
              checked={agreedArticle25}
              onChange={(e) => setAgreedArticle25(e.target.checked)}
              className="mt-1 w-4 h-4 text-emerald-600 rounded border-slate-300 focus:ring-emerald-500"
            />
            <label htmlFor="agreeArticle25" className="text-xs text-emerald-950 cursor-pointer">
              <strong>Cam kết tuân thủ Điều 25 Luật SHTT:</strong> Nội dung biên soạn là bản tóm tắt tinh gọn dưới 10% thời lượng, dùng trong hoạt động giảng dạy phi thương mại, có ghi rõ nguồn gốc xuất xứ và tác giả sách.
            </label>
          </div>

          <button
            type="submit"
            className="w-full py-2.5 px-4 bg-blue-600 hover:bg-blue-700 text-white font-bold text-sm rounded-xl shadow-md transition-colors flex items-center justify-center gap-2"
          >
            <Upload className="w-4 h-4" />
            Đăng Tải & Xuất Bản Phiếu Học Tập
          </button>
        </form>
      )}

      {/* Tab Content: Add Inventory */}
      {activeSubTab === 'add_inventory' && (
        <form onSubmit={handleCreateInventory} className="bg-white rounded-2xl border border-slate-200 p-6 space-y-5 shadow-sm">
          <div>
            <h3 className="text-base font-bold text-slate-900">
              Đăng Ký Sách Cho Góc Sách Lớp Học
            </h3>
            <p className="text-xs text-slate-500 mt-0.5">
              Cập nhật số lượng sách giáo khoa cũ được quyên góp vào tủ sách góc lớp.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-semibold text-slate-700 mb-1">
                Tên lớp học
              </label>
              <input
                type="text"
                required
                placeholder="VD: Lớp 8A3"
                value={invClassName}
                onChange={(e) => setInvClassName(e.target.value)}
                className="w-full px-3 py-2 text-sm border border-slate-200 rounded-lg focus:outline-none focus:border-emerald-500"
              />
            </div>

            <div>
              <label className="block text-xs font-semibold text-slate-700 mb-1">
                Tên sách giáo khoa cũ
              </label>
              <input
                type="text"
                required
                placeholder="VD: SGK Địa lí 8 (Tập 1)"
                value={invBookTitle}
                onChange={(e) => setInvBookTitle(e.target.value)}
                className="w-full px-3 py-2 text-sm border border-slate-200 rounded-lg focus:outline-none focus:border-emerald-500"
              />
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-semibold text-slate-700 mb-1">
                Tổng số sách được tặng
              </label>
              <input
                type="number"
                min="1"
                value={invDonated}
                onChange={(e) => setInvDonated(e.target.value)}
                className="w-full px-3 py-2 text-sm border border-slate-200 rounded-lg focus:outline-none focus:border-emerald-500"
              />
            </div>

            <div>
              <label className="block text-xs font-semibold text-slate-700 mb-1">
                Số sách hiện còn tại lớp (chưa mượn)
              </label>
              <input
                type="number"
                min="0"
                value={invAvailable}
                onChange={(e) => setInvAvailable(e.target.value)}
                className="w-full px-3 py-2 text-sm border border-slate-200 rounded-lg focus:outline-none focus:border-emerald-500"
              />
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-semibold text-slate-700 mb-1">
                Giáo viên chủ nhiệm phụ trách
              </label>
              <input
                type="text"
                value={invTeacher}
                onChange={(e) => setInvTeacher(e.target.value)}
                className="w-full px-3 py-2 text-sm border border-slate-200 rounded-lg focus:outline-none focus:border-emerald-500"
              />
            </div>
            <div>
              <label className="block text-xs font-semibold text-slate-700 mb-1">
                Vị trí để sách trong lớp
              </label>
              <input
                type="text"
                value={invLocation}
                onChange={(e) => setInvLocation(e.target.value)}
                className="w-full px-3 py-2 text-sm border border-slate-200 rounded-lg focus:outline-none focus:border-emerald-500"
              />
            </div>
          </div>

          <button
            type="submit"
            className="w-full py-2.5 px-4 bg-emerald-600 hover:bg-emerald-700 text-white font-bold text-sm rounded-xl shadow-md transition-colors flex items-center justify-center gap-2"
          >
            <PlusCircle className="w-4 h-4" />
            Lưu Vào Danh Mục Tủ Sách Lớp
          </button>
        </form>
      )}
    </div>
  )
}
