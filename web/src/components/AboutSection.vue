<template>
  <section class="about-section reveal-section">
    <div class="about-content">
      <h2>关于我</h2>
      <p>
        热爱前端与创意编程，追逐星空与机械之美。<br />专注于
        Vue、TypeScript、动画与交互体验。
      </p>
      <ul class="about-list">
        <li>💻 擅长：Vue3 / TypeScript / CSS 动画</li>
        <li>🌌 爱好：天文、机械、科幻、设计</li>
        <li>🛠️ 作品：个人网站、可视化、交互组件</li>
      </ul>
    </div>
  </section>
</template>

<script setup lang="ts"></script>

<style scoped>
.about-section {
  min-height: 100vh;
  display: flex;
  align-items: center;
  justify-content: center;
  background: none;
}

@keyframes identifier {
  0% {
    transform: translateY(0);
  }
  100% {
    transform: translateY(-10px);
  }
}

.about-content {
  background: rgba(10, 24, 55, 0.92);
  border-radius: 32px;
  box-shadow: 0 0 128px 32px #1a2950 inset;
  padding: 48px 32px;
  max-width: 900px;
  margin: 0 auto;
  position: relative;
  transition: box-shadow 0.3s cubic-bezier(0.4, 0, 0.2, 1);
  animation: lighting 1.5s ease-in-out infinite alternate;
}
.about-content:hover {
  box-shadow:
    0 0 48px 8px #3a6ff7,
    0 0 128px 32px #1a2950 inset;
}
.about-content {
  text-align: center;
}
.about-content {
  background: rgba(10, 24, 55, 0.92);
  border-radius: 32px;
  box-shadow: 0 0 128px 32px #1a2950 inset;
  padding: 48px 32px;
  max-width: 900px;
  margin: 0 auto;
  position: relative;
  text-align: center;
  transition:
    box-shadow 0.3s cubic-bezier(0.4, 0, 0.2, 1),
    transform 0.3s cubic-bezier(0.4, 0, 0.2, 1);
}
.about-content:hover {
  box-shadow:
    0 0 48px 8px #3a6ff7,
    0 0 128px 32px #1a2950 inset;
  transform: translateY(-10px) scale(1.04) rotate(-1deg);
}

.about-list {
  list-style: none;
  padding: 0;
  color: #eaf6ff;
  font-size: 1.08rem;
  line-height: 2.1;
}
</style>
