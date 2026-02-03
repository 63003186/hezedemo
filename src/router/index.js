// src/router/index.js
import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '@/views/HomeView.vue'
import ProductListView from '@/views/ProductListView.vue'
import CartView from '@/views/CartView.vue'
// 👇 新增
import CheckoutView from '@/views/CheckoutView.vue'
import OrderSuccessView from '@/views/OrderSuccessView.vue'

const routes = [
  { path: '/', component: HomeView },
  { path: '/products', component: ProductListView },
  { path: '/cart', component: CartView },
  { path: '/checkout', component: CheckoutView },        // ← 新增
  { path: '/order-success', component: OrderSuccessView } // ← 新增
]

const router = createRouter({
  history: createWebHistory(),
  routes
})

export default router