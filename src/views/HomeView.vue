<template>
  <div class="home-view">
    <!-- 英雄区域 -->
    <div class="hero">
      <div class="hero-content">
        <h1 class="hero-title">欢迎来到菏泽文创馆</h1>
        <p class="hero-subtitle">这里汇聚了菏泽最具代表性的非物质文化遗产与创意产品</p>
        <router-link to="/products" class="browse-btn btn btn-primary">浏览商品</router-link>
      </div>
    </div>

    <!-- 特色介绍 -->
    <div class="features-section">
      <div class="container">
        <h2 class="section-title">特色产品</h2>
        <div class="features-grid">
          <div class="feature-item">
            <div class="feature-icon">🎨</div>
            <h3>非物质文化遗产</h3>
            <p>传承千年的工艺，展现菏泽独特的文化魅力</p>
          </div>
          <div class="feature-item">
            <div class="feature-icon">✨</div>
            <h3>创意设计</h3>
            <p>融合传统与现代，打造独特的文创产品</p>
          </div>
          <div class="feature-item">
            <div class="feature-icon">🏆</div>
            <h3>品质保证</h3>
            <p>严格的质量控制，确保每一件产品都是精品</p>
          </div>
        </div>
      </div>
    </div>

    <!-- 轮播图容器 -->
    <div
      class="carousel-container"
      @mouseenter="stopAutoPlay"
      @mouseleave="startAutoPlay"
      role="region"
      aria-label="商品轮播图"
    >
      <button @click="prevSlide" class="carousel-arrow left" aria-label="上一张">
        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path d="M15 18L9 12L15 6" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
        </svg>
      </button>

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

      <button @click="nextSlide" class="carousel-arrow right" aria-label="下一张">
        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path d="M9 18L15 12L9 6" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
        </svg>
      </button>

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

    <!-- 客户评价 -->
    <div class="testimonials-section">
      <div class="container">
        <h2 class="section-title">客户评价</h2>
        <div class="testimonials-grid">
          <div class="testimonial-item">
            <div class="testimonial-content">
              <p class="testimonial-text">产品质量非常好，设计独特，很有菏泽特色，送给朋友作为礼物非常合适。</p>
              <div class="testimonial-author">
                <div class="author-avatar">用户1</div>
                <div class="author-info">
                  <h4 class="author-name">张先生</h4>
                  <div class="author-rating">⭐⭐⭐⭐⭐</div>
                </div>
              </div>
            </div>
          </div>
          <div class="testimonial-item">
            <div class="testimonial-content">
              <p class="testimonial-text">客服态度很好，物流也很快，收到的商品和图片描述一致，非常满意。</p>
              <div class="testimonial-author">
                <div class="author-avatar">用户2</div>
                <div class="author-info">
                  <h4 class="author-name">李女士</h4>
                  <div class="author-rating">⭐⭐⭐⭐⭐</div>
                </div>
              </div>
            </div>
          </div>
        </div>
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
  { src: '/hezedemo/images/dan1.png', alt: '丹怼怼1' },
  { src: '/hezedemo/images/dan2.png', alt: '丹怼怼2' },
  { src: '/hezedemo/images/dan3.png', alt: '丹怼怼3' },
  { src: '/hezedemo/images/dan4.png', alt: '丹怼怼4' },
  { src: '/hezedemo/images/dan5.png', alt: '丹怼怼5' },
  { src: '/hezedemo/images/dan6.png', alt: '丹怼怼6' },
  { src: '/hezedemo/images/wu1.png', alt: '武墩墩1' },
  { src: '/hezedemo/images/wu2.png', alt: '武墩墩2' },
  { src: '/hezedemo/images/wu3.png', alt: '武墩墩3' },
  { src: '/hezedemo/images/wu4.png', alt: '武墩墩4' },
  { src: '/hezedemo/images/wu5.png', alt: '武墩墩5' },
  { src: '/hezedemo/images/wu6.png', alt: '武墩墩6' }
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
    intervalId = setInterval(nextSlide, 2000) // 每2秒切换
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
  background-color: var(--color-bg-light);
}

/* 英雄区域 */
.hero {
  background: linear-gradient(135deg, #d2691e 0%, #a0522d 100%);
  color: white;
  padding: 6rem 2rem;
  text-align: center;
  position: relative;
  overflow: hidden;
}

.hero::before {
  content: '';
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background-image: url('data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" width="100" height="100" viewBox="0 0 100 100"><rect width="100" height="100" fill="none" stroke="rgba(255,255,255,0.1)" stroke-width="1"/></svg>');
  opacity: 0.3;
}

.hero-content {
  position: relative;
  z-index: 1;
  max-width: 800px;
  margin: 0 auto;
}

.hero-title {
  font-size: 2.5rem;
  font-weight: bold;
  margin-bottom: 1.5rem;
  text-shadow: 0 2px 4px rgba(0, 0, 0, 0.3);
}

.hero-subtitle {
  font-size: 1.2rem;
  margin-bottom: 2rem;
  opacity: 0.9;
  max-width: 600px;
  margin-left: auto;
  margin-right: auto;
}

.browse-btn {
  margin-top: 1rem;
  font-size: 1.1rem;
  padding: 0.75rem 2rem;
}

/* 特色介绍 */
.features-section {
  padding: 4rem 2rem;
  background: white;
}

.section-title {
  text-align: center;
  font-size: 2rem;
  color: var(--color-text);
  margin-bottom: 3rem;
  position: relative;
}

.section-title::after {
  content: '';
  display: block;
  width: 80px;
  height: 4px;
  background: var(--color-primary);
  margin: 0.5rem auto 0;
  border-radius: 2px;
}

.features-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
  gap: 2rem;
  margin-top: 2rem;
}

.feature-item {
  text-align: center;
  padding: 2rem;
  background: white;
  border-radius: 12px;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.08);
  transition: transform 0.3s ease, box-shadow 0.3s ease;
}

.feature-item:hover {
  transform: translateY(-5px);
  box-shadow: 0 8px 24px rgba(0, 0, 0, 0.12);
}

.feature-icon {
  font-size: 3rem;
  margin-bottom: 1.5rem;
}

.feature-item h3 {
  font-size: 1.3rem;
  margin-bottom: 1rem;
  color: var(--color-text);
}

.feature-item p {
  color: var(--color-text-light);
  line-height: 1.6;
}

/* 轮播样式 */
.carousel-container {
  width: min(95vw, 800px);
  margin: 4rem auto;
  overflow: hidden;
  position: relative;
  height: 500px;
  border-radius: 16px;
  box-shadow: 0 10px 30px rgba(0, 0, 0, 0.15);
  background: white;
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
  transition: opacity 0.5s ease;
}

.carousel img.active {
  display: block;
  opacity: 1;
}

.carousel-arrow {
  position: absolute;
  top: 50%;
  transform: translateY(-50%);
  background: rgba(255, 255, 255, 0.9);
  color: var(--color-primary);
  border: none;
  width: 50px;
  height: 50px;
  border-radius: 50%;
  cursor: pointer;
  z-index: 10;
  display: flex;
  align-items: center;
  justify-content: center;
  transition: all 0.3s ease;
  box-shadow: 0 2px 10px rgba(0, 0, 0, 0.2);
}

.carousel-arrow:hover {
  background: white;
  transform: translateY(-50%) scale(1.1);
  box-shadow: 0 4px 15px rgba(0, 0, 0, 0.3);
}

.left { left: 20px; }
.right { right: 20px; }

.carousel-dots {
  position: absolute;
  bottom: 20px;
  left: 50%;
  transform: translateX(-50%);
  display: flex;
  gap: 10px;
}

.dot {
  width: 12px;
  height: 12px;
  border-radius: 50%;
  background-color: rgba(255, 255, 255, 0.6);
  cursor: pointer;
  transition: all 0.3s ease;
  border: none;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.2);
}

.dot.active {
  background-color: var(--color-primary);
  transform: scale(1.2);
}

/* 客户评价 */
.testimonials-section {
  padding: 4rem 2rem;
  background: var(--color-bg-light);
}

.testimonials-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(350px, 1fr));
  gap: 2rem;
  margin-top: 2rem;
}

.testimonial-item {
  background: white;
  border-radius: 12px;
  padding: 2rem;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.08);
  transition: transform 0.3s ease, box-shadow 0.3s ease;
}

.testimonial-item:hover {
  transform: translateY(-5px);
  box-shadow: 0 8px 24px rgba(0, 0, 0, 0.12);
}

.testimonial-text {
  font-style: italic;
  color: var(--color-text);
  margin-bottom: 1.5rem;
  line-height: 1.6;
}

.testimonial-author {
  display: flex;
  align-items: center;
  gap: 1rem;
}

.author-avatar {
  width: 50px;
  height: 50px;
  border-radius: 50%;
  background: var(--color-primary);
  color: white;
  display: flex;
  align-items: center;
  justify-content: center;
  font-weight: bold;
}

.author-info h4 {
  margin: 0;
  color: var(--color-text);
}

.author-rating {
  color: #ffc107;
  font-size: 1rem;
}

/* 响应式设计 */
@media (max-width: 768px) {
  .hero {
    padding: 4rem 1rem;
  }
  
  .hero-title {
    font-size: 2rem;
  }
  
  .hero-subtitle {
    font-size: 1rem;
  }
  
  .features-section,
  .testimonials-section {
    padding: 2rem 1rem;
  }
  
  .section-title {
    font-size: 1.5rem;
  }
  
  .carousel-container {
    width: 95vw;
    height: 350px;
  }
  
  .left { left: 10px; }
  .right { right: 10px; }
  
  .carousel-arrow {
    width: 40px;
    height: 40px;
  }
  
  .features-grid,
  .testimonials-grid {
    grid-template-columns: 1fr;
  }
  
  .testimonials-grid {
    gap: 1.5rem;
  }
  
  .feature-item,
  .testimonial-item {
    padding: 1.5rem;
  }
}

@media (max-width: 480px) {
  .hero-title {
    font-size: 1.8rem;
  }
  
  .carousel-container {
    height: 280px;
  }
  
  .browse-btn {
    padding: 0.6rem 1.5rem;
    font-size: 1rem;
  }
}
</style>