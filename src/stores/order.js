// src/stores/order.js
import { defineStore } from 'pinia'

export const useOrderStore = defineStore('order', {
  state: () => ({
    currentOrder: null,
    lastOrderId: null
  }),

  actions: {
    createOrder(address, cartItems, totalPrice) {
      const orderId = 'ORD' + Date.now()
      this.currentOrder = {
        id: orderId,
        address,
        items: cartItems,
        total: totalPrice,
        timestamp: new Date().toISOString()
      }
      this.lastOrderId = orderId
    },

    clearCurrentOrder() {
      this.currentOrder = null
    }
  }
})