<template>
  <div class="cart container">
    <h2 class="cart-title">我的购物车</h2>

    <div v-if="cartStore.items.length === 0" class="empty-cart text-center">
      <p>购物车为空</p>
      <router-link to="/products" class="btn btn-outline mt-2">去逛逛</router-link>
    </div>

    <div v-else class="cart-items">
      <div v-for="item in cartStore.items" :key="item.id" class="cart-item card">
        <img :src="item.image" :alt="item.name" class="item-image" />
        <div class="item-info">
          <h4>{{ item.name }}</h4>
          <p class="item-price">¥{{ item.price.toFixed(2) }}</p>
        </div>
        <input
          type="number"
          :value="item.quantity"
          min="1"
          @change="e => cartStore.updateQuantity(item.id, Number(e.target.value))"
          class="quantity-input"
        />
        <div class="item-total">¥{{ (item.price * item.quantity).toFixed(2) }}</div>
        <button @click="cartStore.removeItem(item.id)" class="remove-btn" aria-label="移除商品">×</button>
      </div>

      <div class="cart-summary text-center mt-3">
        <p class="total-price">总计：¥{{ cartStore.totalPrice.toFixed(2) }}</p>
        <router-link to="/checkout" class="btn btn-primary">去结算</router-link>
      </div>
    </div>
  </div>
</template>

<script setup>
import { useCartStore } from '@/stores/cart'

const cartStore = useCartStore()
</script>

<style scoped>
.cart {
  padding: 2rem 0;
}

.cart-title {
  text-align: center;
  margin: 2rem 0;
  color: var(--color-primary);
}

.empty-cart {
  padding: 2rem;
}

.cart-items {
  margin-top: 1.5rem;
}

.cart-item {
  display: flex;
  align-items: center;
  padding: 1rem;
  gap: 1rem;
}

.item-image {
  width: 80px;
  height: 80px;
  object-fit: cover;
  border-radius: 6px;
}

.item-info h4 {
  margin: 0 0 0.3rem 0;
  font-size: 1.1rem;
}

.item-price {
  margin: 0;
  color: var(--color-text-light);
}

.quantity-input {
  width: 60px;
  padding: 0.4rem;
  text-align: center;
  border: 1px solid var(--color-border);
  border-radius: 6px;
}

.item-total {
  font-weight: bold;
  min-width: 80px;
  text-align: right;
}

.remove-btn {
  background: none;
  border: none;
  color: var(--color-danger);
  font-size: 1.5rem;
  font-weight: bold;
  cursor: pointer;
  width: 32px;
  height: 32px;
  display: flex;
  align-items: center;
  justify-content: center;
  border-radius: 50%;
  transition: background-color 0.2s;
}

.remove-btn:hover {
  background-color: #fee;
}

.cart-summary {
  margin-top: 2rem;
}

.total-price {
  font-size: 1.25rem;
  font-weight: bold;
  color: var(--color-primary);
}
</style>