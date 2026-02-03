<template>
  <div class="checkout container">
    <h2 class="text-center mb-3">确认订单</h2>

    <div class="card p-4 mb-4">
      <h3>收货信息</h3>
      <form @submit.prevent="handleSubmit" class="address-form">
        <div class="form-group">
          <label>收货人 *</label>
          <input v-model="form.name" type="text" required />
        </div>
        <div class="form-group">
          <label>手机号 *</label>
          <input v-model="form.phone" type="tel" required />
        </div>
        <div class="form-group">
          <label>地址 *</label>
          <input v-model="form.address" type="text" placeholder="省市区 + 详细地址" required />
        </div>
      </form>
    </div>

    <div class="card p-4 mb-4">
      <h3>商品清单</h3>
      <div v-for="item in cartStore.items" :key="item.id" class="order-item">
        <img :src="item.image" :alt="item.name" class="item-thumb" />
        <div class="item-desc">
          <p>{{ item.name }}</p>
          <p>¥{{ item.price }} × {{ item.quantity }}</p>
        </div>
        <p class="item-total">¥{{ (item.price * item.quantity).toFixed(2) }}</p>
      </div>
      <div class="order-summary mt-3">
        <p><strong>总计：</strong> ¥{{ cartStore.totalPrice.toFixed(2) }}</p>
      </div>
    </div>

    <div class="text-center">
      <button @click="handleSubmit" class="btn btn-primary">确认支付</button>
      <router-link to="/cart" class="btn btn-outline ml-2">返回购物车</router-link>
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue'
import { useRouter } from 'vue-router'
import { useCartStore } from '@/stores/cart'
import { useOrderStore } from '@/stores/order'

const router = useRouter()
const cartStore = useCartStore()
const orderStore = useOrderStore()

const form = ref({
  name: '',
  phone: '',
  address: ''
})

function handleSubmit() {
  if (!form.value.name || !form.value.phone || !form.value.address) {
    alert('请填写完整的收货信息')
    return
  }

  // 创建订单
  orderStore.createOrder(
    { ...form.value },
    [...cartStore.items],
    cartStore.totalPrice
  )

  // 清空购物车
  cartStore.clear()

  // 跳转到成功页
  router.push('/order-success')
}
</script>

<style scoped>
.checkout {
  padding: 2rem 0;
}

.form-group {
  margin-bottom: 1rem;
}

.form-group label {
  display: block;
  margin-bottom: 0.3rem;
  font-weight: bold;
}

.form-group input {
  width: 100%;
  padding: 0.5rem;
  border: 1px solid var(--color-border);
  border-radius: 6px;
}

.order-item {
  display: flex;
  align-items: center;
  gap: 1rem;
  padding: 0.8rem 0;
  border-bottom: 1px solid var(--color-border);
}

.item-thumb {
  width: 60px;
  height: 60px;
  object-fit: cover;
  border-radius: 6px;
}

.item-desc {
  flex: 1;
}

.item-total {
  font-weight: bold;
  color: var(--color-primary);
}

.ml-2 {
  margin-left: 0.75rem;
}
</style>