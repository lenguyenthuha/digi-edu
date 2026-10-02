import React from 'react'
import { BookOpen, BookCheck, QrCode, ShieldCheck, Settings, GraduationCap } from 'lucide-react'

export default function Navbar({ activeTab, setActiveTab, onOpenLegalModal }) {
  return (
    <header className="sticky top-0 z-40 bg-white/95 backdrop-blur border-b border-slate-200 shadow-sm no-print">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Logo & Brand */}
          <div 
            onClick={() => setActiveTab('worksheets')}
            className="flex items-center gap-3 cursor-pointer group"
          >
            <div className="w-10 h-10 rounded-xl bg-gradient-to-tr from-blue-600 to-indigo-600 flex items-center justify-center text-white shadow-md shadow-blue-500/20 group-hover:scale-105 transition-transform">
              <GraduationCap className="w-6 h-6" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <span className="text-xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-blue-700 to-indigo-700">
                  DigiEdu
                </span>
                <span className="text-[11px] font-semibold tracking-wide uppercase px-2 py-0.5 rounded-full bg-emerald-50 text-emerald-700 border border-emerald-200">
                  Điều 25 Luật SHTT
                </span>
              </div>
              <p className="text-xs text-slate-500 hidden sm:block">
                Học liệu chuyển tiếp & Góc sách tương trợ học đường
              </p>
            </div>
          </div>

          {/* Navigation Tabs */}
          <nav className="hidden md:flex items-center gap-1">
            <button
              onClick={() => setActiveTab('worksheets')}
              className={`flex items-center gap-2 px-3.5 py-2 rounded-lg text-sm font-medium transition-colors ${
                activeTab === 'worksheets'
                  ? 'bg-blue-50 text-blue-700 font-semibold'
                  : 'text-slate-600 hover:text-slate-900 hover:bg-slate-100'
              }`}
            >
              <BookOpen className="w-4 h-4" />
              Phiếu Học Tập Tuần
            </button>

            <button
              onClick={() => setActiveTab('books')}
              className={`flex items-center gap-2 px-3.5 py-2 rounded-lg text-sm font-medium transition-colors ${
                activeTab === 'books'
                  ? 'bg-blue-50 text-blue-700 font-semibold'
                  : 'text-slate-600 hover:text-slate-900 hover:bg-slate-100'
              }`}
            >
              <BookCheck className="w-4 h-4" />
              Góc Sách Lớp Học
            </button>

            <button
              onClick={() => setActiveTab('qr')}
              className={`flex items-center gap-2 px-3.5 py-2 rounded-lg text-sm font-medium transition-colors ${
                activeTab === 'qr'
                  ? 'bg-blue-50 text-blue-700 font-semibold'
                  : 'text-slate-600 hover:text-slate-900 hover:bg-slate-100'
              }`}
            >
              <QrCode className="w-4 h-4" />
              Mã QR Dán Tường
            </button>

            <button
              onClick={() => setActiveTab('admin')}
              className={`flex items-center gap-2 px-3.5 py-2 rounded-lg text-sm font-medium transition-colors ${
                activeTab === 'admin'
                  ? 'bg-blue-50 text-blue-700 font-semibold'
                  : 'text-slate-600 hover:text-slate-900 hover:bg-slate-100'
              }`}
            >
              <Settings className="w-4 h-4" />
              Quản Trị / Tải Lên
            </button>
          </nav>

          {/* Right Action: Legal Check Modal */}
          <div className="flex items-center gap-2">
            <button
              onClick={onOpenLegalModal}
              className="flex items-center gap-1.5 px-3 py-1.5 text-xs font-medium text-emerald-800 bg-emerald-50 hover:bg-emerald-100 border border-emerald-300 rounded-lg transition-colors"
              title="Xem căn cứ pháp lý & Tuân thủ bản quyền"
            >
              <ShieldCheck className="w-4 h-4 text-emerald-600" />
              <span className="hidden sm:inline">Căn Cứ Pháp Lý</span>
            </button>
          </div>
        </div>

        {/* Mobile Submenu */}
        <div className="flex md:hidden border-t border-slate-100 py-2 overflow-x-auto gap-1">
          <button
            onClick={() => setActiveTab('worksheets')}
            className={`whitespace-nowrap px-3 py-1.5 text-xs font-medium rounded-md ${
              activeTab === 'worksheets' ? 'bg-blue-100 text-blue-800' : 'text-slate-600'
            }`}
          >
            Phiếu Học Tập
          </button>
          <button
            onClick={() => setActiveTab('books')}
            className={`whitespace-nowrap px-3 py-1.5 text-xs font-medium rounded-md ${
              activeTab === 'books' ? 'bg-blue-100 text-blue-800' : 'text-slate-600'
            }`}
          >
            Góc Sách Lớp
          </button>
          <button
            onClick={() => setActiveTab('qr')}
            className={`whitespace-nowrap px-3 py-1.5 text-xs font-medium rounded-md ${
              activeTab === 'qr' ? 'bg-blue-100 text-blue-800' : 'text-slate-600'
            }`}
          >
            Mã QR Dán Lớp
          </button>
          <button
            onClick={() => setActiveTab('admin')}
            className={`whitespace-nowrap px-3 py-1.5 text-xs font-medium rounded-md ${
              activeTab === 'admin' ? 'bg-blue-100 text-blue-800' : 'text-slate-600'
            }`}
          >
            Quản Trị
          </button>
        </div>
      </div>
    </header>
  )
}
