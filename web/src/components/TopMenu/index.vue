<script setup lang="ts">
import router from '@/router';
import { debounce } from '@/utils';
import { ref, onMounted, onUnmounted } from 'vue';

const handleScroll = debounce((e: Event) => {
  console.log('Scrolled!', e);
  // 获取当前的垂直滚动位置
  const scrollTop = window.pageYOffset || document.documentElement.scrollTop;
  // 判断滚动位置是否在顶部（通常认为小于等于0时在顶部）

  if (scrollTop <= 0) {
    console.log('滚动条在页面顶部');
    // 在这里可以执行相关操作，例如显示固定在顶部的导航栏
  } else {
    console.log('滚动条不在顶部');
    // 可以执行其他操作，例如隐藏固定在顶部的导航栏
  }
}, 100);

onMounted(() => {
  window.addEventListener('scroll', handleScroll);
});

onUnmounted(() => {
  window.removeEventListener('scroll', handleScroll);
});

const activeIndex = ref('home');
const handleSelect = (key: string, keyPath: string[]) => {
  console.log('Selected menu item index:', key, keyPath);
  router.push('/' + key);
};
</script>

<template>
  <el-menu
    :default-active="activeIndex"
    class="el-menu"
    mode="horizontal"
    @select="handleSelect"
  >
    <el-menu-item index="home">首页</el-menu-item>
    <el-menu-item index="more">更多</el-menu-item>
  </el-menu>
</template>

<style scoped>
.el-menu {
  z-index: 50;
  --el-menu-bg-color: transparent;
  --el-menu-active-color: #3a6ff7;
  --el-menu-hover-bg-color: transparent;
  display: flex;
  justify-content: center;
  align-items: center;
  background: rgba(10, 24, 55, 0.82);
  position: relative;
  min-height: 64px;
  backdrop-filter: blur(2px);
  border: none;
}
/* 柔和蓝色渐变底边 */
.el-menu::after {
  content: '';
  position: absolute;
  left: 0;
  right: 0;
  bottom: 0;
  height: 12px;
  pointer-events: none;
  /* 上方与菜单背景一致，下方与整体背景一致 */
  background: linear-gradient(
    to bottom,
    rgba(10, 24, 55, 0.82) 0%,
    rgba(58, 111, 247, 0.18) 60%,
    rgba(90, 180, 255, 0.12) 85%,
    #000 100%
  );
  opacity: 0.95;
  border-radius: 0 0 12px 12px;
  z-index: 1;
  filter: blur(1.5px);
}

.el-menu-item {
  font-size: 1.18rem;
  font-weight: 700;
  color: #eaf6ff;
  border: none;
  margin: 0 24px;
  padding: 0 18px 0 18px;
  letter-spacing: 3px;
  position: relative;
  background: transparent;
  border-radius: 0;
  box-shadow: none;
  outline: none;
  transition:
    color 0.18s,
    text-shadow 0.18s;
  line-height: 64px;
  cursor: pointer;
  overflow: visible;
}

.el-menu-item.is-active {
  color: #3a6ff7;
  text-shadow:
    0 0 8px #3a6ff7,
    0 0 16px #5ab4ff;
  border-bottom: none;
}

.el-menu-item::after {
  content: '';
  position: absolute;
  left: 50%;
  bottom: 8px;
  transform: translateX(-50%) scaleX(0);
  width: 60%;
  height: 4px;
  border-radius: 2px;
  background: linear-gradient(90deg, #3a6ff7 0%, #5ab4ff 100%);
  box-shadow:
    0 0 16px #3a6ff7,
    0 0 32px #5ab4ff;
  opacity: 0;
  z-index: 2;
  pointer-events: none;
  transition:
    opacity 0.35s cubic-bezier(0.4, 0, 0.2, 1),
    transform 0.35s cubic-bezier(0.4, 0, 0.2, 1);
}
.el-menu-item.is-active::after {
  transform: translateX(-50%) scaleX(1);
  opacity: 0.85;
  animation: menu-glow 1.2s infinite alternate;
}

@keyframes menu-glow {
  0% {
    box-shadow:
      0 0 8px #3a6ff7,
      0 0 16px #5ab4ff;
  }
  100% {
    box-shadow:
      0 0 24px #3a6ff7,
      0 0 48px #5ab4ff;
  }
}

.el-menu-item:hover {
  color: #5ab4ff;
  text-shadow:
    0 0 12px #5ab4ff,
    0 0 24px #3a6ff7;
}
</style>
