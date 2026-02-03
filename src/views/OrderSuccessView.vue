<template>
  <div class="success container text-center">
    <div class="card p-5 mt-5" style="max-width: 500px; margin: 0 auto;">
      <div style="font-size: 4rem; color: var(--color-success); margin-bottom: 1.5rem;">✓</div>
      <h2>支付成功！</h2>
      <p class="mt-3">您的订单 <strong>{{ orderStore.lastOrderId }}</strong> 已提交</p>
      <p>我们将尽快为您发货，请注意查收短信通知。</p>
      
      <div class="mt-4">
        <router-link to="/" class="btn btn-primary">返回首页</router-link>
        <router-link to="/products" class="btn btn-outline ml-2">继续逛逛</router-link>
      </div>
    </div>
  </div>
</template>

<script setup>
import { useOrderStore } from '@/stores/order'

const orderStore = useOrderStore()
</script>

<style scoped>
.ml-2 {
  margin-left: 0.75rem;
}
</style>