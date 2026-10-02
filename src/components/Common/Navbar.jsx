import React from 'react'

export default function Navbar({ activeTab, setActiveTab }) {
  const tabs = [
    { id: 'worksheets', label: 'Tài liệu tuần' },
    { id: 'books', label: 'Tủ sách lớp' },
    { id: 'qr', label: 'Mã QR dán tường' },
    { id: 'admin', label: 'Quản trị' }
  ]

  return (
    <header className="sticky top-0 z-40 bg-white/80 backdrop-blur-md border-b border-black/[0.06] transition-colors no-print">
      <div className="max-w-5xl mx-auto px-4 sm:px-6">
        <div className="flex items-center justify-between h-14">
          {/* Logo & Brand */}
          <div 
            onClick={() => setActiveTab('worksheets')}
            className="cursor-pointer flex items-center gap-2 select-none"
          >
            <span className="text-[17px] font-semibold tracking-tight text-[#1d1d1f]">
              DigiEdu
            </span>
          </div>

          {/* Navigation Links */}
          <nav className="hidden md:flex items-center gap-1 bg-black/[0.03] p-1 rounded-full border border-black/[0.04]">
            {tabs.map(tab => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`px-3.5 py-1 text-[13px] font-medium rounded-full transition-all duration-150 ${
                  activeTab === tab.id
                    ? 'bg-white text-[#1d1d1f] shadow-sm font-semibold'
                    : 'text-[#86868b] hover:text-[#1d1d1f]'
                }`}
              >
                {tab.label}
              </button>
            ))}
          </nav>
        </div>

        {/* Mobile Navigation */}
        <div className="flex md:hidden border-t border-black/[0.04] py-2 overflow-x-auto gap-2">
          {tabs.map(tab => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={`whitespace-nowrap px-3 py-1 text-xs rounded-full transition-colors ${
                activeTab === tab.id
                  ? 'bg-[#1d1d1f] text-white font-medium'
                  : 'bg-black/[0.04] text-[#86868b]'
              }`}
            >
              {tab.label}
            </button>
          ))}
        </div>
      </div>
    </header>
  )
}
