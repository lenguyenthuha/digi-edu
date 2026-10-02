import React, { useState, useMemo } from 'react'
import { BookCheck, PlusCircle, Bookmark, AlertCircle, CheckCircle2, Search, HeartHandshake } from 'lucide-react'

export default function BookSharingCorner({ inventories, onBorrow, onDonate }) {
  const [selectedClass, setSelectedClass] = useState('ALL')
  const [selectedStatus, setSelectedStatus] = useState('ALL')
  const [searchQuery, setSearchQuery] = useState('')
  const [donateModalItem, setDonateModalItem] = useState(null)
  const [donateCount, setDonateCount] = useState(1)

  // Unique classes
  const classNames = useMemo(() => {
    const set = new Set(inventories.map(i => i.className))
    return ['ALL', ...Array.from(set)]
  }, [inventories])

  // Filtered inventories
  const filteredInventories = useMemo(() => {
    return inventories.filter(item => {
      const matchClass = selectedClass === 'ALL' || item.className === selectedClass
      const matchStatus = selectedStatus === 'ALL' || item.status === selectedStatus
      const matchSearch = searchQuery.trim() === '' ||
        item.bookTitle.toLowerCase().includes(searchQuery.toLowerCase()) ||
        item.className.toLowerCase().includes(searchQuery.toLowerCase())
      return matchClass && matchStatus && matchSearch
    })
  }, [inventories, selectedClass, selectedStatus, searchQuery])

  const handleOpenDonate = (item) => {
    setDonateModalItem(item)
    setDonateCount(1)
  }

  const handleConfirmDonate = () => {
    if (donateModalItem && donateCount > 0) {
      onDonate(donateModalItem.id, Number(donateCount))
      setDonateModalItem(null)
    }
  }

  const getStatusBadge = (status, totalAvailable) => {
    if (status === 'SHORTAGE' || totalAvailable === 0) {
      return (
        <span className="px-2.5 py-1 text-xs font-semibold rounded-full bg-rose-50 text-rose-700 border border-rose-200 flex items-center gap-1">
          <AlertCircle className="w-3.5 h-3.5" />
          Cần Hỗ Trợ (Thiếu sách)
        </span>
      )
    }
    if (status === 'IN_USE') {
      return (
        <span className="px-2.5 py-1 text-xs font-semibold rounded-full bg-amber-50 text-amber-700 border border-amber-200 flex items-center gap-1">
          <Bookmark className="w-3.5 h-3.5" />
          Đang Mượn Gần Hết
        </span>
      )
    }
    return (
      <span className="px-2.5 py-1 text-xs font-semibold rounded-full bg-emerald-50 text-emerald-700 border border-emerald-200 flex items-center gap-1">
        <CheckCircle2 className="w-3.5 h-3.5" />
        Sẵn Sàng ({totalAvailable} cuốn)
      </span>
    )
  }

  return (
    <div className="space-y-8">
      {/* Hero Banner */}
      <div className="bg-gradient-to-br from-emerald-700 via-teal-700 to-emerald-900 rounded-3xl p-6 sm:p-10 text-white shadow-xl">
        <div className="max-w-2xl">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/10 backdrop-blur border border-white/20 text-xs font-semibold text-emerald-200 mb-4">
            <HeartHandshake className="w-3.5 h-3.5 text-yellow-300" />
            <span>Tầng 2: Tương Trợ Sách Giáo Khoa Cũ Tại Lớp</span>
          </div>
          <h1 className="text-2xl sm:text-4xl font-extrabold tracking-tight leading-tight">
            Góc Sách Chuyền Tay — Lan Tỏa Tri Thức
          </h1>
          <p className="mt-3 text-sm sm:text-base text-emerald-100/90 leading-relaxed">
            Học sinh khóa trước tặng lại sách cũ, tạo thành tủ sách xoay vòng đặt tại mỗi lớp học. Học sinh chưa kịp có sách mới có thể mượn ngay tại lớp để không bỏ lỡ tiết học.
          </p>
          <div className="mt-4 text-xs text-emerald-200/90 bg-emerald-800/50 border border-emerald-600/50 rounded-xl p-3">
            ⚖️ <strong>Căn cứ pháp lý:</strong> Việc luân chuyển và cho mượn sách giấy hợp pháp hoàn toàn tuân thủ học thuyết cạn quyền (First Sale Doctrine) trong luật sở hữu trí tuệ.
          </div>
        </div>
      </div>

      {/* Filter and Search Bar */}
      <div className="bg-white rounded-2xl border border-slate-200 p-5 shadow-sm space-y-4">
        <div className="relative">
          <Search className="w-5 h-5 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
          <input
            type="text"
            placeholder="Tìm theo tên sách, tên lớp hoặc giáo viên phụ trách..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full pl-11 pr-4 py-2.5 rounded-xl border border-slate-200 focus:outline-none focus:ring-2 focus:ring-emerald-500/20 focus:border-emerald-500 text-sm"
          />
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-2">
          <div>
            <label className="block text-xs font-semibold text-slate-600 mb-1.5">
              Lớp học
            </label>
            <select
              value={selectedClass}
              onChange={(e) => setSelectedClass(e.target.value)}
              className="w-full px-3 py-2 text-xs font-medium bg-slate-50 border border-slate-200 rounded-lg focus:outline-none focus:border-emerald-500"
            >
              <option value="ALL">Tất cả các lớp</option>
              {classNames.filter(c => c !== 'ALL').map(c => (
                <option key={c} value={c}>{c}</option>
              ))}
            </select>
          </div>

          <div>
            <label className="block text-xs font-semibold text-slate-600 mb-1.5">
              Trạng thái sẵn sàng
            </label>
            <select
              value={selectedStatus}
              onChange={(e) => setSelectedStatus(e.target.value)}
              className="w-full px-3 py-2 text-xs font-medium bg-slate-50 border border-slate-200 rounded-lg focus:outline-none focus:border-emerald-500"
            >
              <option value="ALL">Tất cả trạng thái</option>
              <option value="AVAILABLE">Còn sách sẵn sàng</option>
              <option value="IN_USE">Đang mượn</option>
              <option value="SHORTAGE">Cần hỗ trợ (thiếu sách)</option>
            </select>
          </div>
        </div>
      </div>

      {/* Inventory List */}
      <div className="space-y-4">
        <h2 className="text-base font-bold text-slate-800 flex items-center gap-2">
          <BookCheck className="w-5 h-5 text-emerald-600" />
          Danh mục tủ sách lớp ({filteredInventories.length} đầu sách)
        </h2>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {filteredInventories.map((item) => (
            <div
              key={item.id}
              className="bg-white rounded-2xl border border-slate-200 p-5 shadow-sm hover:shadow-md transition-shadow flex flex-col justify-between"
            >
              <div>
                <div className="flex items-center justify-between mb-2">
                  <span className="px-2.5 py-0.5 rounded-lg bg-emerald-50 text-emerald-800 border border-emerald-200 text-xs font-bold">
                    {item.className}
                  </span>
                  {getStatusBadge(item.status, item.totalAvailable)}
                </div>

                <h3 className="text-base font-bold text-slate-900 mt-2">
                  {item.bookTitle}
                </h3>
                <p className="text-xs text-slate-500 mt-1">
                  Vị trí: {item.location} • GV phụ trách: {item.homeroomTeacher}
                </p>

                {item.note && (
                  <p className="mt-2 text-xs bg-rose-50 text-rose-800 p-2.5 rounded-lg border border-rose-100">
                    📢 {item.note}
                  </p>
                )}

                <div className="mt-4 grid grid-cols-2 gap-2 text-center text-xs">
                  <div className="bg-slate-50 p-2 rounded-lg border border-slate-100">
                    <span className="text-slate-400 block text-[10px]">Tổng quyên góp</span>
                    <span className="font-bold text-slate-700 text-sm">{item.totalDonated} cuốn</span>
                  </div>
                  <div className="bg-slate-50 p-2 rounded-lg border border-slate-100">
                    <span className="text-slate-400 block text-[10px]">Còn tại góc lớp</span>
                    <span className={`font-bold text-sm ${item.totalAvailable > 0 ? 'text-emerald-600' : 'text-rose-600'}`}>
                      {item.totalAvailable} cuốn
                    </span>
                  </div>
                </div>
              </div>

              {/* Action Buttons */}
              <div className="mt-5 pt-3 border-t border-slate-100 flex items-center gap-2">
                <button
                  disabled={item.totalAvailable === 0}
                  onClick={() => onBorrow(item.id)}
                  className={`flex-1 py-2 px-3 rounded-lg text-xs font-semibold flex items-center justify-center gap-1.5 transition-colors ${
                    item.totalAvailable > 0
                      ? 'bg-emerald-600 hover:bg-emerald-700 text-white'
                      : 'bg-slate-100 text-slate-400 cursor-not-allowed'
                  }`}
                >
                  <Bookmark className="w-3.5 h-3.5" />
                  {item.totalAvailable > 0 ? 'Mượn Sách Tại Lớp' : 'Đã Hết Sách'}
                </button>

                <button
                  onClick={() => handleOpenDonate(item)}
                  className="py-2 px-3 rounded-lg text-xs font-semibold bg-slate-100 hover:bg-slate-200 text-slate-700 flex items-center gap-1.5 transition-colors"
                >
                  <PlusCircle className="w-3.5 h-3.5 text-emerald-600" />
                  Tặng Sách Cũ
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Donate Modal */}
      {donateModalItem && (
        <div className="fixed inset-0 z-50 overflow-y-auto bg-slate-900/60 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="bg-white rounded-2xl max-w-md w-full p-6 shadow-2xl border border-slate-200 animate-in fade-in zoom-in-95">
            <h3 className="text-base font-bold text-slate-900 mb-1">
              Tặng Sách Cho {donateModalItem.className}
            </h3>
            <p className="text-xs text-slate-600 mb-4">
              Bạn đang quyên góp sách: <strong>{donateModalItem.bookTitle}</strong>
            </p>

            <div className="mb-4">
              <label className="block text-xs font-semibold text-slate-700 mb-1.5">
                Số lượng sách cũ bạn gửi tặng:
              </label>
              <input
                type="number"
                min="1"
                max="50"
                value={donateCount}
                onChange={(e) => setDonateCount(e.target.value)}
                className="w-full px-3 py-2 border border-slate-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-emerald-500/20 focus:border-emerald-500"
              />
            </div>

            <div className="flex justify-end gap-2">
              <button
                onClick={() => setDonateModalItem(null)}
                className="px-4 py-2 text-xs font-semibold text-slate-600 hover:bg-slate-100 rounded-lg"
              >
                Hủy
              </button>
              <button
                onClick={handleConfirmDonate}
                className="px-4 py-2 text-xs font-semibold bg-emerald-600 hover:bg-emerald-700 text-white rounded-lg shadow-sm"
              >
                Xác Nhận Quyên Góp
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}
