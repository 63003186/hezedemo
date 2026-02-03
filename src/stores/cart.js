import { defineStore } from 'pinia'

// 从 localStorage 读取初始状态
const loadCartFromStorage = () => {
  try {
    const saved = localStorage.getItem('cart')
    return saved ? JSON.parse(saved) : []
  } catch (e) {
    console.warn('Failed to load cart from localStorage', e)
    return []
  }
}

export const useCartStore = defineStore('cart', {
  state: () => ({
    items: loadCartFromStorage()
  }),

  getters: {
    totalItems: (state) => state.items.reduce((sum, item) => sum + item.quantity, 0),
    totalPrice: (state) => state.items.reduce((sum, item) => sum + item.price * item.quantity, 0)
  },

  actions: {
    addItem(product) {
      const existing = this.items.find(item => item.id === product.id)
      if (existing) {
        existing.quantity += 1
      } else {
        this.items.push({ ...product, quantity: 1 })
      }
      this.saveToStorage()
    },

    removeItem(productId) {
      this.items = this.items.filter(item => item.id !== productId)
      this.saveToStorage()
    },

    updateQuantity(productId, quantity) {
      if (quantity < 1) return
      const item = this.items.find(item => item.id === productId)
      if (item) {
        item.quantity = quantity
        this.saveToStorage()
      }
    },

    clear() {
      this.items = []
      this.saveToStorage()
    },

    // 👇 新增：保存到 localStorage
    saveToStorage() {
      try {
        localStorage.setItem('cart', JSON.stringify(this.items))
      } catch (e) {
        console.warn('Failed to save cart to localStorage', e)
      }
    }
  }
})