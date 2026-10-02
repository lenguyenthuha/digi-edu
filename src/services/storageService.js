import { INITIAL_WORKSHEETS } from '../data/mockWorksheets'
import { INITIAL_INVENTORIES } from '../data/mockClassInventories'

const STORAGE_KEY_WORKSHEETS = 'digiedu_worksheets'
const STORAGE_KEY_INVENTORIES = 'digiedu_inventories'

export const storageService = {
  // Worksheets
  getWorksheets: () => {
    try {
      const data = localStorage.getItem(STORAGE_KEY_WORKSHEETS)
      if (data) return JSON.parse(data)
    } catch (e) {
      console.warn('Error reading worksheets from localStorage:', e)
    }
    // initialize default
    localStorage.setItem(STORAGE_KEY_WORKSHEETS, JSON.stringify(INITIAL_WORKSHEETS))
    return INITIAL_WORKSHEETS
  },

  saveWorksheet: (worksheet) => {
    const current = storageService.getWorksheets()
    const updated = [worksheet, ...current]
    localStorage.setItem(STORAGE_KEY_WORKSHEETS, JSON.stringify(updated))
    return updated
  },

  // Class Inventories
  getInventories: () => {
    try {
      const data = localStorage.getItem(STORAGE_KEY_INVENTORIES)
      if (data) return JSON.parse(data)
    } catch (e) {
      console.warn('Error reading inventories from localStorage:', e)
    }
    localStorage.setItem(STORAGE_KEY_INVENTORIES, JSON.stringify(INITIAL_INVENTORIES))
    return INITIAL_INVENTORIES
  },

  saveInventory: (inventory) => {
    const current = storageService.getInventories()
    const index = current.findIndex(i => i.id === inventory.id)
    let updated
    if (index >= 0) {
      updated = [...current]
      updated[index] = inventory
    } else {
      updated = [inventory, ...current]
    }
    localStorage.setItem(STORAGE_KEY_INVENTORIES, JSON.stringify(updated))
    return updated
  },

  borrowBook: (id) => {
    const list = storageService.getInventories()
    const updated = list.map(item => {
      if (item.id === id && item.totalAvailable > 0) {
        const newAvailable = item.totalAvailable - 1
        return {
          ...item,
          totalAvailable: newAvailable,
          status: newAvailable === 0 ? 'IN_USE' : item.status,
          updatedAt: new Date().toISOString()
        }
      }
      return item
    })
    localStorage.setItem(STORAGE_KEY_INVENTORIES, JSON.stringify(updated))
    return updated
  },

  donateBook: (id, count = 1) => {
    const list = storageService.getInventories()
    const updated = list.map(item => {
      if (item.id === id) {
        return {
          ...item,
          totalDonated: item.totalDonated + count,
          totalAvailable: item.totalAvailable + count,
          status: 'AVAILABLE',
          updatedAt: new Date().toISOString()
        }
      }
      return item
    })
    localStorage.setItem(STORAGE_KEY_INVENTORIES, JSON.stringify(updated))
    return updated
  },

  resetAll: () => {
    localStorage.setItem(STORAGE_KEY_WORKSHEETS, JSON.stringify(INITIAL_WORKSHEETS))
    localStorage.setItem(STORAGE_KEY_INVENTORIES, JSON.stringify(INITIAL_INVENTORIES))
    return { worksheets: INITIAL_WORKSHEETS, inventories: INITIAL_INVENTORIES }
  }
}
