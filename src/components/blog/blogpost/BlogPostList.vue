<script setup>
import {ref, onMounted, onBeforeUnmount} from 'vue'
import request from '@/utils/request'
import {useRouter} from "vue-router";

const loading = ref(false)
const finished = ref(false)
const blogList = ref([])
const page = ref(1)
const pageSize = 6
const loadTrigger = ref(null)

const handleImageLoad = (event) => {
  event.target.classList.add('loaded')
}

const router = useRouter()
const goToBlogPostDetail = (id) => {
  const url = router.resolve({name: "BlogPostDetail", params: {id}}).href;
  window.open(url, '_blank');
}

let observer = null

async function fetchBlogs() {
  if (loading.value || finished.value) return
  loading.value = true
  try {
    const response = await request.get('/blog/post/list', {
      params: {
        pageNum: page.value,
        pageSize: pageSize
      }
    })

    const records = response.data?.data?.records ?? []
    if (records.length > 0) {
      const newData = records.map(item => ({
        id: item.id,
        title: item.title,
        date: item.createTime?.replace('T', ' '),
        image: `https://picsum.photos/seed/${Math.random()}/400/200`
      }))
      blogList.value.push(...newData)
      page.value++
    } else {
      finished.value = true
    }
  } catch (error) {
    console.error('请求失败:', error)
  } finally {
    loading.value = false
  }
}

function initObserver() {
  if (observer) observer.disconnect()
  observer = new IntersectionObserver(([entry]) => {
    if (entry.isIntersecting && !loading.value && !finished.value) {
      fetchBlogs()
    }
  }, {
    rootMargin: '100px'
  })

  if (loadTrigger.value) {
    observer.observe(loadTrigger.value)
  }
}

onMounted(() => {
  fetchBlogs().then(() => {
    initObserver()
  })
})

onBeforeUnmount(() => {
  if (observer) observer.disconnect()
})
</script>

<template>
  <div class="grid">
    <div v-for="item in blogList" :key="item.id" class="card" @click="goToBlogPostDetail(item.id)">
      <img :src="item.image" alt="" class="cover fade-in" loading="lazy" @load="handleImageLoad"/>
      <div class="content">
        <h3 class="title">{{ item.title }}</h3>
        <div class="footer">
          <span class="date">{{ item.date }}</span>
        </div>
      </div>
    </div>

    <!-- 加载中骨架屏 -->
    <div v-if="loading" v-for="n in pageSize" :key="'skeleton-' + n" class="card">
      <div class="skeleton-image"></div>
      <div class="content">
        <div class="skeleton-text" style="width: 80%; height: 24px;"></div>
        <div class="footer">
          <div class="skeleton-text" style="width: 40%; height: 16px; margin: 0;"></div>
        </div>
      </div>
    </div>

    <!-- 触发器元素 -->
    <div ref="loadTrigger" style="height: 1px;"></div>
  </div>

  <p v-if="finished && !loading" class="no-more">没有更多内容了</p>
</template>


<style scoped>
.grid {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 1.5rem;
  padding: 2rem 1rem;
  max-width: 1200px;
  margin: 0 auto;
  box-sizing: border-box;
}

@media (max-width: 960px) {
  .grid {
    grid-template-columns: repeat(2, 1fr);
  }
}

@media (max-width: 600px) {
  .grid {
    grid-template-columns: 1fr;
  }
}

.card {
  background-color: #fff;
  border-radius: 16px;
  overflow: hidden;
  box-shadow: 0 4px 16px rgba(0, 0, 0, 0.06);
  display: flex;
  flex-direction: column;
  transition: transform 0.25s ease, box-shadow 0.25s ease;
  aspect-ratio: 4 / 3;
  cursor: pointer;
}

.card:hover {
  transform: translateY(-6px);
  box-shadow: 0 6px 20px rgba(0, 0, 0, 0.1); /* 提升阴影效果 */
}

.card:active {
  transform: scale(0.98); /* 点击时缩小效果 */
}

.cover {
  width: 100%;
  height: 60%;
  object-fit: cover;
  flex-shrink: 0;
  display: block;
  opacity: 0;
  transition: opacity 0.8s ease;
}

.cover.loaded {
  opacity: 1;
}

.content {
  padding: 1rem;
  flex-grow: 1;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
}

.title {
  font-size: 1.4rem;
  font-weight: 700;
  color: #222;
  margin: 0;
  line-height: 1.5;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
}

.fade-in {
  opacity: 0;
  transition: opacity 0.8s ease;
}

.fade-in.loaded {
  opacity: 1;
}

.footer {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-top: 0.75rem;
}

.date {
  font-size: 0.9rem;
  color: #999;
  margin-left: auto;
}

.skeleton-image,
.skeleton-text {
  background: #e0e0e0;
  position: relative;
  overflow: hidden;
  border-radius: 8px;
}

.skeleton-image {
  height: 60%;
  width: 100%;
}

.skeleton-text {
  height: 20px;
  margin: 1rem 0;
}

.skeleton-image::after,
.skeleton-text::after {
  content: '';
  position: absolute;
  top: 0;
  left: -200px;
  width: 150px;
  height: 100%;
  background: linear-gradient(90deg, transparent, rgba(255, 255, 255, 0.6), transparent);
  animation: shimmer 1.5s infinite;
}

@keyframes shimmer {
  0% {
    transform: translateX(0);
  }
  100% {
    transform: translateX(200%);
  }
}

.no-more {
  text-align: center;
  color: #888;
  font-size: 14px;
  margin: 2rem 0;
  font-style: italic;
}
</style>