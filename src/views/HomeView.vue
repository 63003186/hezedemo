<template>
  <div class="home-view">
    <div class="hero">
      <h1>欢迎来到菏泽文创馆</h1>
      <p>这里汇聚了菏泽最具代表性的非物质文化遗产与创意产品：</p>
      <router-link to="/products" class="browse-btn">浏览商品</router-link>
    </div>

    <!-- 轮播图容器 -->
    <div
      class="carousel-container"
      @mouseenter="stopAutoPlay"
      @mouseleave="startAutoPlay"
      role="region"
      aria-label="商品轮播图"
    >
      <button @click="prevSlide" class="carousel-arrow left" aria-label="上一张">❮</button>

      <div class="carousel">
        <img
          v-for="(slide, index) in slides"
          :key="index"
          :src="slide.src"
          :alt="slide.alt"
          :class="{ active: currentIndex === index }"
          class="slide"
        />
      </div>

      <button @click="nextSlide" class="carousel-arrow right" aria-label="下一张">❯</button>

      <div class="carousel-dots" role="tablist">
        <button
          v-for="(dot, index) in dots"
          :key="index"
          class="dot"
          :class="{ active: currentIndex === index }"
          @click="goToSlide(index)"
          :aria-selected="currentIndex === index"
          :aria-label="`跳转到第 ${index + 1} 张图片`"
          role="tab"
        ></button>
      </div>
    </div>
  </div>
</template>

<script setup>
import { useCartStore } from '@/stores/cart'
import { computed, ref, onMounted, onUnmounted } from 'vue'

// 注意：cartStore 和 cartTotal 已移到 App.vue，此处不再需要
// 但保留引用以防后续扩展
const cartStore = useCartStore()
const cartTotal = computed(() => cartStore.totalItems)

const slides = [
  { src: '/images/dan1.png', alt: '丹怼怼1' },
  { src: '/images/dan2.png', alt: '丹怼怼2' },
  { src: '/images/dan3.png', alt: '丹怼怼3' },
  { src: '/images/dan4.png', alt: '丹怼怼4' },
  { src: '/images/dan5.png', alt: '丹怼怼5' },
  { src: '/images/dan6.png', alt: '丹怼怼6' },
  { src: '/images/wu1.png', alt: '武墩墩1' },
  { src: '/images/wu2.png', alt: '武墩墩2' },
  { src: '/images/wu3.png', alt: '武墩墩3' },
  { src: '/images/wu4.png', alt: '武墩墩4' },
  { src: '/images/wu5.png', alt: '武墩墩5' },
  { src: '/images/wu6.png', alt: '武墩墩6' }
]

const totalSlides = slides.length
const currentIndex = ref(0)
const dots = Array.from({ length: totalSlides }, (_, i) => i)

const nextSlide = () => {
  currentIndex.value = (currentIndex.value + 1) % totalSlides
}

const prevSlide = () => {
  currentIndex.value = (currentIndex.value - 1 + totalSlides) % totalSlides
}

const goToSlide = (index) => {
  currentIndex.value = index
}

let intervalId = null

const startAutoPlay = () => {
  if (!intervalId) {
    intervalId = setInterval(nextSlide, 2000) // 每4秒切换
  }
}

const stopAutoPlay = () => {
  if (intervalId) {
    clearInterval(intervalId)
    intervalId = null
  }
}

onMounted(() => {
  startAutoPlay()
})

onUnmounted(() => {
  stopAutoPlay()
})
</script>

<style scoped>
.home-view {
  padding: 2rem 0;
  background-color: #f9f9f9;
}

.hero {
  text-align: center;
  margin-bottom: 2rem;
}

.hero h1 {
  color: #8b4513;
  font-size: 1.8rem;
  margin-bottom: 1rem;
}

.hero p {
  margin: 1.5rem 0;
  line-height: 1.6;
  color: #555;
  max-width: 600px;
  margin-left: auto;
  margin-right: auto;
}

.browse-btn {
  display: inline-block;
  color: indianred;
  text-decoration: none;
  font-size: 1.4rem;
  font-weight: bold;
  margin-top: 1rem;
}

/* 轮播样式（同原版，略作整理） */
.carousel-container {
  width: min(95vw, 600px);
  margin: 2rem auto;
  overflow: hidden;
  position: relative;
  height: 400px;
  border-radius: 12px;
  box-shadow: 0 6px 16px rgba(0, 0, 0, 0.15);
}

@media (max-width: 768px) {
  .carousel-container {
    height: 300px;
    border-radius: 10px;
  }
}

.carousel {
  width: 100%;
  height: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  background-color: #f8f8f8;
}

.carousel img {
  width: 100%;
  height: 100%;
  object-fit: contain;
  display: none;
}

.carousel img.active {
  display: block;
}

.carousel-arrow {
  position: absolute;
  top: 50%;
  transform: translateY(-50%);
  background: rgba(0, 0, 0, 0.6);
  color: white;
  border: none;
  width: 40px;
  height: 40px;
  border-radius: 50%;
  font-size: 1.2rem;
  cursor: pointer;
  z-index: 10;
  display: flex;
  align-items: center;
  justify-content: center;
  transition: background 0.2s;
}

.carousel-arrow:hover {
  background: rgba(0, 0, 0, 0.8);
}

.left { left: 10px; }
.right { right: 10px; }

.carousel-dots {
  display: flex;
  justify-content: center;
  gap: 10px;
  margin-top: 12px;
}

.dot {
  width: 12px;
  height: 12px;
  border-radius: 50%;
  background-color: #ccc;
  cursor: pointer;
  transition: background-color 0.3s ease;
  border: none;
}

.dot.active {
  background-color: #d2691e;
}

@media (max-width: 768px) {
  .carousel-container {
    width: 85vw;
    height: 320px;
  }
  .left { left: 8px; }
  .right { right: 8px; }
  .carousel-arrow {
    width: 32px;
    height: 32px;
    font-size: 1rem;
  }
  .carousel-dots {
    gap: 6px;
  }
  .dot {
    width: 8px;
    height: 8px;
  }
  .hero h1 {
    font-size: 1.4rem;
  }
}
</style>