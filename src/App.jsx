import React, { useState, useEffect } from 'react'
import Navbar from './components/Common/Navbar'
import Footer from './components/Common/Footer'
import LegalModal from './components/Common/LegalModal'
import WorksheetHub from './components/Worksheets/WorksheetHub'
import BookSharingCorner from './components/BookCorner/BookSharingCorner'
import ClassroomPoster from './components/QRCodePoster/ClassroomPoster'
import AdminPanel from './components/Admin/AdminPanel'
import { storageService } from './services/storageService'

export default function App() {
  const [activeTab, setActiveTab] = useState('worksheets')
  const [isLegalModalOpen, setIsLegalModalOpen] = useState(false)
  const [worksheets, setWorksheets] = useState([])
  const [inventories, setInventories] = useState([])

  // Load initial data
  useEffect(() => {
    setWorksheets(storageService.getWorksheets())
    setInventories(storageService.getInventories())

    // Handle QR URL params if any
    const params = new URLSearchParams(window.location.search)
    if (params.get('tab')) {
      setActiveTab(params.get('tab'))
    }
  }, [])

  // Handlers
  const handleAddWorksheet = (newWs) => {
    const updated = storageService.saveWorksheet(newWs)
    setWorksheets(updated)
    setActiveTab('worksheets')
  }

  const handleAddInventory = (newInv) => {
    const updated = storageService.saveInventory(newInv)
    setInventories(updated)
    setActiveTab('books')
  }

  const handleBorrowBook = (id) => {
    const updated = storageService.borrowBook(id)
    setInventories(updated)
  }

  const handleDonateBook = (id, count) => {
    const updated = storageService.donateBook(id, count)
    setInventories(updated)
  }

  const handleResetData = () => {
    const data = storageService.resetAll()
    setWorksheets(data.worksheets)
    setInventories(data.inventories)
  }

  return (
    <div className="min-h-screen flex flex-col bg-slate-50 text-slate-800">
      <Navbar 
        activeTab={activeTab} 
        setActiveTab={setActiveTab} 
        onOpenLegalModal={() => setIsLegalModalOpen(true)}
      />

      <main className="flex-1 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 w-full">
        {activeTab === 'worksheets' && (
          <WorksheetHub worksheets={worksheets} />
        )}

        {activeTab === 'books' && (
          <BookSharingCorner 
            inventories={inventories} 
            onBorrow={handleBorrowBook}
            onDonate={handleDonateBook}
          />
        )}

        {activeTab === 'qr' && (
          <ClassroomPoster worksheets={worksheets} />
        )}

        {activeTab === 'admin' && (
          <AdminPanel 
            onAddWorksheet={handleAddWorksheet}
            onAddInventory={handleAddInventory}
            onResetData={handleResetData}
          />
        )}
      </main>

      <Footer onOpenLegalModal={() => setIsLegalModalOpen(true)} />

      <LegalModal 
        isOpen={isLegalModalOpen} 
        onClose={() => setIsLegalModalOpen(false)} 
      />
    </div>
  )
}
