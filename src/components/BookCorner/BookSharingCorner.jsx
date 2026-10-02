import React, { useState, useMemo } from 'react'
import { Search } from 'lucide-react'

export default function BookSharingCorner({ inventories, onBorrow, onDonate }) {
  const [selectedClass, setSelectedClass] = useState('ALL')
  const [searchQuery, setSearchQuery] = useState('')
  const [donateModalItem, setDonateModalItem] = useState(null)
  const [donateCount, setDonateCount] = useState(1)

  const classNames = useMemo(() => {
    const set = new Set(inventories.map(i => i.className))
    return ['ALL', ...Array.from(set)]
  }, [inventories])

  const filteredInventories = useMemo(() => {
    return inventories.filter(item => {
      const matchClass = selectedClass === 'ALL' || item.className === selectedClass
      const matchSearch = searchQuery.trim() === '' ||
        item.bookTitle.toLowerCase().includes(searchQuery.toLowerCase()) ||
        item.className.toLowerCase().includes(searchQuery.toLowerCase())
      return matchClass && matchSearch
    })
  }, [inventories, selectedClass, searchQuery])

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

  return (
    <div className="space-y-12 max-w-5xl mx-auto">
      {/* Quiet Header */}
      <section className="text-center pt-8 pb-4 max-w-2xl mx-auto px-4">
        <span className="text-[13px] font-semibold text-[#86868b] tracking-wider uppercase">
          Tương trợ học đường
        </span>
        <h1 className="text-3xl sm:text-5xl font-semibold text-[#1d1d1f] tracking-tight mt-2 mb-3">
          Tủ sách lớp học.
        </h1>
        <p className="text-[15px] sm:text-[17px] text-[#86868b] leading-relaxed">
          Chia sẻ và luân chuyển sách giáo khoa cũ trực tiếp tại góc lớp trong thời gian đầu năm học.
        </p>

        {/* Search */}
        <div className="relative mt-8 max-w-lg mx-auto">
          <Search className="w-4 h-4 text-[#86868b] absolute left-4 top-1/2 -translate-y-1/2" />
          <input
            type="text"
            placeholder="Tìm theo tên sách, lớp hoặc giáo viên..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full pl-11 pr-4 py-3 rounded-full bg-white border border-black/[0.08] shadow-sm text-[14px] text-[#1d1d1f] placeholder-[#86868b] focus:outline-none focus:ring-2 focus:ring-[#0071e3]/20 focus:border-[#0071e3] transition-all"
          />
        </div>
      </section>

      {/* Class filter pills */}
      <section className="flex items-center justify-center flex-wrap gap-1.5">
        {classNames.map(c => (
          <button
            key={c}
            onClick={() => setSelectedClass(c)}
            className={`px-3.5 py-1.5 rounded-full text-[13px] transition-all ${
              selectedClass === c
                ? 'bg-[#1d1d1f] text-white font-medium shadow-sm'
                : 'bg-black/[0.03] text-[#6e6e73] hover:text-[#1d1d1f] hover:bg-black/[0.06]'
            }`}
          >
            {c === 'ALL' ? 'Tất cả các lớp' : c}
          </button>
        ))}
      </section>

      {/* Books List Grid */}
      <section className="grid grid-cols-1 md:grid-cols-2 gap-5">
        {filteredInventories.map((item) => (
          <div
            key={item.id}
            className="bg-white rounded-[18px] border border-black/[0.06] p-6 flex flex-col justify-between hover:border-black/[0.12] transition-all"
          >
            <div>
              <div className="flex items-center justify-between mb-2">
                <span className="text-[13px] font-semibold text-[#1d1d1f]">
                  {item.className}
                </span>
                <span className={`text-[12px] font-medium ${item.totalAvailable > 0 ? 'text-[#34c759]' : 'text-[#ff3b30]'}`}>
                  {item.totalAvailable > 0 ? `${item.totalAvailable} cuốn sẵn sàng` : 'Đang thiếu sách'}
                </span>
              </div>

              <h3 className="text-[17px] font-semibold text-[#1d1d1f] tracking-tight mb-1">
                {item.bookTitle}
              </h3>
              <p className="text-[13px] text-[#86868b]">
                {item.location} • GV: {item.homeroomTeacher}
              </p>

              {item.note && (
                <p className="mt-3 text-[12px] text-[#6e6e73] bg-[#f5f5f7] p-3 rounded-[12px]">
                  {item.note}
                </p>
              )}
            </div>

            <div className="mt-6 pt-4 border-t border-black/[0.04] flex items-center gap-2">
              <button
                disabled={item.totalAvailable === 0}
                onClick={() => onBorrow(item.id)}
                className={`flex-1 py-2 px-3.5 text-[13px] font-medium rounded-full transition-colors text-center ${
                  item.totalAvailable > 0
                    ? 'bg-[#0071e3] hover:bg-[#0077ed] text-white'
                    : 'bg-black/[0.04] text-[#a1a1a6] cursor-not-allowed'
                }`}
              >
                {item.totalAvailable > 0 ? 'Mượn sách' : 'Hết sách'}
              </button>

              <button
                onClick={() => handleOpenDonate(item)}
                className="py-2 px-4 text-[13px] font-medium text-[#1d1d1f] bg-black/[0.04] hover:bg-black/[0.08] rounded-full transition-colors"
              >
                Tặng sách cũ
              </button>
            </div>
          </div>
        ))}
      </section>

      {/* Donate Modal */}
      {donateModalItem && (
        <div className="fixed inset-0 z-50 overflow-y-auto bg-black/40 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="bg-white rounded-[24px] max-w-sm w-full p-6 shadow-2xl border border-black/[0.08] animate-in fade-in zoom-in-95">
            <h3 className="text-[17px] font-semibold text-[#1d1d1f] mb-1">
              Tặng sách cho {donateModalItem.className}
            </h3>
            <p className="text-[13px] text-[#86868b] mb-4">
              {donateModalItem.bookTitle}
            </p>

            <div className="mb-5">
              <label className="block text-[12px] font-medium text-[#1d1d1f] mb-1.5">
                Số lượng gửi tặng:
              </label>
              <input
                type="number"
                min="1"
                max="50"
                value={donateCount}
                onChange={(e) => setDonateCount(e.target.value)}
                className="w-full px-3.5 py-2 border border-black/[0.08] rounded-[12px] text-[14px] focus:outline-none focus:border-[#0071e3]"
              />
            </div>

            <div className="flex justify-end gap-2">
              <button
                onClick={() => setDonateModalItem(null)}
                className="px-4 py-1.5 text-[13px] font-medium text-[#86868b] hover:text-[#1d1d1f]"
              >
                Hủy
              </button>
              <button
                onClick={handleConfirmDonate}
                className="px-4 py-1.5 text-[13px] font-medium bg-[#0071e3] hover:bg-[#0077ed] text-white rounded-full transition-colors"
              >
                Xác nhận
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}
