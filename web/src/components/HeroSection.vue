<template>
  <section class="hero-section">
    <div class="hero-content">
      <h1 class="hero-title">
        <span class="hero-title-item hero-title-item-1" data-text="Star Path"
          >Star Path</span
        >
        <span class="hero-title-item hero-title-item-2" data-text="Night Light"
          >Night Light</span
        >
        <span class="hero-title-item hero-title-item-3" data-text="Dream Guide"
          >Dream Guide</span
        >
      </h1>
      <p class="hero-desc">
        Even the darkest night will end and the stars will appear.
      </p>
      <div class="hero-buttons">
        <button class="mecha-btn">关于我</button>
        <button class="mecha-btn">作品集</button>
      </div>
    </div>
    <div class="mecha-deco">
      <div class="mecha-gear gear1"></div>
      <div class="mecha-gear gear2"></div>
      <div class="mecha-gear gear3"></div>
    </div>
  </section>
</template>

<script setup lang="ts">
import { onMounted, onBeforeUnmount } from 'vue';

let heroContentEl: HTMLElement | null = null;
let mouseMoveHandler: ((e: MouseEvent) => void) | null = null;
let mouseLeaveHandler: (() => void) | null = null;

onMounted(() => {
  heroContentEl = document.querySelector('.hero-content');
  if (!heroContentEl) return;
  mouseMoveHandler = (e: MouseEvent) => {
    const rect = heroContentEl!.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    const centerX = rect.width / 2;
    const centerY = rect.height / 2;
    // 最大旋转角度
    const maxDeg = 9;
    const rotateY = ((x - centerX) / centerX) * maxDeg;
    const rotateX = -((y - centerY) / centerY) * maxDeg;
    heroContentEl!.style.transform = `perspective(800px) rotateX(${rotateX}deg) rotateY(${rotateY}deg)`;
  };
  mouseLeaveHandler = () => {
    heroContentEl!.style.transform =
      'perspective(800px) rotateX(0deg) rotateY(0deg)';
  };
  heroContentEl.addEventListener('mousemove', mouseMoveHandler);
  heroContentEl.addEventListener('mouseleave', mouseLeaveHandler);
});

onBeforeUnmount(() => {
  if (heroContentEl && mouseMoveHandler && mouseLeaveHandler) {
    heroContentEl.removeEventListener('mousemove', mouseMoveHandler);
    heroContentEl.removeEventListener('mouseleave', mouseLeaveHandler);
  }
});
</script>

<style scoped>
.hero-section {
  width: 100%;
  height: 100vh;
  display: flex;
  align-items: center;
  justify-content: center;
  position: relative;
  z-index: 1;
  overflow: hidden;
  box-sizing: border-box;
}
.hero-content {
  background: rgba(0, 0, 0, 0.5);
  border-radius: 32px;
  text-align: center;
  position: relative;
  z-index: 2;
  backdrop-filter: blur(2px);
  width: 80%;
  height: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  transition: all 0.18s linear;
  /* transition-timing-function: cubic-bezier(0, 0, 0.2, 1); */
}
.hero-title {
  font-size: 2.8rem;
  font-weight: 700;
  color: #fff;
  letter-spacing: 2px;
  margin-bottom: 18px;
  text-shadow:
    0 0 24px #3a6ff7,
    0 0 48px #5ab4ff;
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;
}
.hero-title .star {
  color: #5ab4ff;
  font-size: 2.2rem;
  margin-right: 8px;
  filter: drop-shadow(0 0 8px #3a6ff7);
}
.hero-title-item {
  display: flex;
  color: #3a6ff7;
  text-shadow:
    0 0 30px #3a6ff7,
    0 0 60px #3a6ff7;
  transition: transform 0.3s ease;
  font-family: Inter, sans-serif;
  font-weight: 900;
  font-size: 7vw;
  line-height: 0.85;
  letter-spacing: -0.02em;
  text-transform: uppercase;
  margin-bottom: 10px;
  filter: brightness(1.2);
}
.hero-title-item:first-child {
  color: white;
  text-shadow: none;
}
.hero-title-item:last-child {
  color: transparent !important;
  -webkit-text-stroke: 2px #3a6ff7;
  text-stroke: 2px #3a6ff7;
  filter: drop-shadow(0 0 10px #3a6ff7);
  text-shadow: none;
}

.hero-title-item:hover {
  transform: translateX(20px);
}

.hero-desc {
  font-size: 1.3rem;
  color: #b3d1ff;
  margin-bottom: 32px;
  text-shadow: 0 0 8px #1a2950;
}
.hero-buttons {
  display: flex;
  gap: 24px;
  justify-content: center;
}
.mecha-btn {
  background: linear-gradient(90deg, #3a6ff7 0%, #5ab4ff 100%);
  color: #fff;
  font-size: 1.1rem;
  font-weight: 600;
  border: none;
  border-radius: 12px;
  padding: 12px 32px;
  box-shadow:
    0 0 16px #3a6ff7,
    0 0 32px #5ab4ff;
  cursor: pointer;
  position: relative;
  transition: all 0.18s cubic-bezier(0.4, 0, 0.2, 1);
  outline: 2px solid #5ab4ff;
  outline-offset: -3px;
}
.mecha-btn:hover {
  background: linear-gradient(90deg, #5ab4ff 0%, #3a6ff7 100%);
  color: #fff;
  box-shadow:
    0 0 32px #3a6ff7,
    0 0 64px #5ab4ff;
}
.mecha-deco {
  position: absolute;
  right: 7vw;
  bottom: 10vh;
  z-index: 1;
  pointer-events: none;
}
.mecha-gear {
  position: absolute;
  border-radius: 50%;
  background: repeating-conic-gradient(
    from 0deg,
    #3a6ff7 0 10deg,
    #1a2950 10deg 20deg
  );
  box-shadow:
    0 0 24px #3a6ff7,
    0 0 48px #1a2950 inset;
  opacity: 0.7;
  animation: gear-rotate 8s linear infinite;
}
.gear1 {
  width: 60px;
  height: 60px;
  left: 0;
  bottom: 0;
  animation-duration: 8s;
}
.gear2 {
  width: 36px;
  height: 36px;
  left: 44px;
  bottom: 18px;
  animation-duration: 5s;
  opacity: 0.5;
}
.gear3 {
  width: 24px;
  height: 24px;
  left: 80px;
  bottom: 8px;
  animation-duration: 3.5s;
  opacity: 0.35;
}
@keyframes gear-rotate {
  0% {
    transform: rotate(0deg);
  }
  100% {
    transform: rotate(360deg);
  }
}
@keyframes animation-before {
  0% {
    clip-path: inset(0 0 0 0);
  }
  100% {
    clip-path: inset(0.62em 0 0.29em 0);
  }
}

@keyframes animation-after {
  0% {
    clip-path: inset(0 0 0 0);
  }
  100% {
    clip-path: inset(0.29em 0 0.62em 0);
  }
}

.hero-title-item-1::before {
  content: attr(data-text);
  position: absolute;
  left: -2px;
  width: 100%;
  background: black;
  text-shadow: 2px 0 red;
  animation: animation-before 3s infinite linear alternate-reverse;
  font-family: Inter, sans-serif;
  font-weight: 900;
  font-size: 7vw;
  line-height: 0.85;
  letter-spacing: -0.02em;
  text-transform: uppercase;
  margin-bottom: 10px;
  filter: brightness(1.2);
}
.hero-title-item-1::after {
  content: attr(data-text);
  position: absolute;
  left: 2px;
  width: 100%;
  background: black;
  text-shadow: -2px 0 blue;
  animation: animation-after 3s infinite linear alternate-reverse;
  font-family: Inter, sans-serif;
  font-weight: 900;
  font-size: 7vw;
  line-height: 0.85;
  letter-spacing: -0.02em;
  text-transform: uppercase;
  margin-bottom: 10px;
  filter: brightness(1.2);
}
</style>
