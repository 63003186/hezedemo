<template>
  <div class="card product-card">
    <img :src="product.image" :alt="product.name" class="product-image" />
    <div class="product-details">
      <h3 class="product-name">{{ product.name }}</h3>
      <p class="product-price">¥{{ product.price.toFixed(2) }}</p>
      <button class="btn btn-primary" @click="onAdd">加入购物车</button>
    </div>
  </div>
</template>

<script setup>
import { defineProps, defineEmits } from 'vue'

// 接收商品数据
const props = defineProps({
  product: {
    type: Object,
    required: true
  }
})

// 声明事件
const emit = defineEmits(['add-to-cart'])

// 触发添加事件
function onAdd() {
  emit('add-to-cart', props.product)
}
</script>

<style scoped>
.product-card {
  display: flex;
  flex-direction: column;
  height: 100%;
}

.product-image {
  width: 100%;
  height: 180px;
  object-fit: cover;
  border-bottom: 1px solid var(--color-border);
}

.product-details {
  padding: 1rem;
  flex: 1;
  display: flex;
  flex-direction: column;
}

.product-name {
  font-size: 1.1rem;
  margin: 0 0 0.5rem 0;
  color: var(--color-text);
  font-weight: 600;
}

.product-price {
  color: var(--color-primary);
  font-weight: bold;
  margin: 0 0 1rem 0;
  font-size: 1.2rem;
}

/* 按钮已由 global.css 定义，此处无需重复 */
</style>