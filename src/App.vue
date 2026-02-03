<template>
  <div id="app">
    <!-- 全局头部 -->
    <header class="global-header">
      <div class="container">
        <nav class="nav-container">
          <router-link to="/" class="site-title">菏泽文创馆</router-link>
          <router-link to="/cart" class="cart-link">
            购物车
            <span v-if="cartTotal > 0" class="cart-badge">{{ cartTotal }}</span>
          </router-link>
        </nav>
      </div>
    </header>

    <!-- 页面内容 -->
    <main>
      <router-view />
    </main>

    <!-- 全局页脚 -->
    <footer class="global-footer">
      <div class="container">
        &copy; 2026 菏泽文创馆
      </div>
    </footer>
  </div>
</template>

<script setup>
import { computed } from 'vue'
import { useCartStore } from '@/stores/cart'

const cartStore = useCartStore()
const cartTotal = computed(() => cartStore.totalItems)
</script>

<style scoped>
.global-header {
  background: #d2691e;
  color: white;
  box-shadow: 0 2px 5px rgba(0, 0, 0, 0.1);
}

.nav-container {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 1rem 0;
}

.site-title,
.cart-link {
  color: white;
  text-decoration: none;
  font-weight: bold;
}

.site-title {
  font-size: 1.5rem;
}

.cart-link {
  position: relative;
}

.cart-badge {
  background: red;
  color: white;
  border-radius: 50%;
  padding: 2px 6px;
  font-size: 0.8rem;
  margin-left: 4px;
}

.global-footer {
  background: #5a3e36;
  color: white;
  text-align: center;
  padding: 1.5rem 0;
  margin-top: 2rem;
}

.container {
  max-width: 1200px;
  margin: 0 auto;
  padding: 0 1rem;
}

main {
  min-height: 70vh;
}

@media (max-width: 768px) {
  .nav-container {
    flex-direction: column;
    gap: 0.8rem;
    text-align: center;
  }

  .site-title {
    font-size: 1.3rem;
  }
}
</style>