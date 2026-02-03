<template>
  <div class="products-page">
    <div class="page-header">
      <h1>文创商品列表</h1>
      <p>精选菏泽非遗好物，支持文化传承</p>
    </div>

    <div class="products-grid">
      <ProductCard
        v-for="product in products"
        :key="product.id"
        :product="product"
        @add-to-cart="handleAddToCart"
      />
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue'
import { useCartStore } from '@/stores/cart'
import ProductCard from '@/components/ProductCard.vue'

const cartStore = useCartStore()

const products = ref([
  // 武墩墩系列
  { id: 'wudun1', name: '武墩墩·侠客版', price: 88, image: '/images/武墩墩1.png' },
  { id: 'wudun2', name: '武墩墩·将军版', price: 92, image: '/images/武墩墩2.png' },
  { id: 'wudun3', name: '武墩墩·书生版', price: 85, image: '/images/武墩墩3.png' },
  { id: 'wudun4', name: '武墩墩·镖师版', price: 90, image: '/images/武墩墩4.png' },
  { id: 'wudun5', name: '武墩墩·隐士版', price: 87, image: '/images/武墩墩5.png' },
  { id: 'wudun6', name: '武墩墩·宗师版', price: 95, image: '/images/武墩墩6.png' },

  // 丹怼怼系列
  { id: 'dandui1', name: '丹怼怼·牡丹仙子', price: 78, image: '/images/丹怼怼1.png' },
  { id: 'dandui2', name: '丹怼怼·花神使者', price: 82, image: '/images/丹怼怼2.png' },
  { id: 'dandui3', name: '丹怼怼·国色天香', price: 80, image: '/images/丹怼怼3.png' },
  { id: 'dandui4', name: '丹怼怼·富贵吉祥', price: 85, image: '/images/丹怼怼4.png' },
  { id: 'dandui5', name: '丹怼怼·花开盛世', price: 79, image: '/images/丹怼怼5.png' },
  { id: 'dandui6', name: '丹怼怼·曹州芳华', price: 83, image: '/images/丹怼怼6.png' }
])

function handleAddToCart(product) {
  cartStore.addItem(product) // ✅ 修正为 addItem
}
</script>

<style scoped>
.products-page {
  background-color: #fafafa;
  padding-bottom: 2rem;
}

.page-header {
  background: #8b4513;
  color: white;
  padding: 1.5rem;
  text-align: center;
}

.page-header h1 {
  font-size: 2rem;
  margin-bottom: 0.5rem;
}

.page-header p {
  opacity: 0.9;
}

.products-grid {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(220px, 1fr));
  gap: 2rem;
  padding: 2rem;
  max-width: 1200px;
  margin: 0 auto;
}
</style>