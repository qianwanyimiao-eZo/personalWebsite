<template>
  <section class="projects-section reveal-section">
    <div class="projects-content">
      <h2>精选项目</h2>
      <div class="projects-list">
        <div class="project-card">
          <div class="project-title">星空可视化</div>
          <div class="project-desc">
            基于 Canvas 的动态星空与机械粒子交互，支持自定义星轨与机械臂动画。
          </div>
        </div>
        <div class="project-card">
          <div class="project-title">机械风 UI 组件库</div>
          <div class="project-desc">
            一套融合机械与星空风格的 Vue3 组件库，支持主题切换与动效。
          </div>
        </div>
        <div class="project-card">
          <div class="project-title">个人博客系统</div>
          <div class="project-desc">
            支持 Markdown、代码高亮、夜间模式与星空背景的全栈博客。
          </div>
        </div>
      </div>
    </div>
  </section>
</template>

<script setup lang="ts"></script>

<style scoped>
.projects-section {
  min-height: 100vh;
  display: flex;
  align-items: center;
  justify-content: center;
  background: none;
}
.projects-content {
  background: rgba(10, 24, 55, 0.92);
  border-radius: 32px;
  padding: 48px 32px;
  max-width: 1100px;
  margin: 0 auto;
  position: relative;
  width: 100%;
  animation: lighting 1.5s ease-in-out infinite alternate;
}

.projects-content h2 {
  color: #3a6ff7;
  font-size: 2.2rem;
  margin-bottom: 28px;
  text-align: center;
  text-shadow: 0 0 16px #3a6ff7;
}
.projects-list {
  display: flex;
  flex-wrap: wrap;
  gap: 32px;
  justify-content: center;
}
.project-card {
  background: rgba(20, 32, 60, 0.98);
  border-radius: 18px;
  box-shadow:
    0 0 24px #3a6ff7,
    0 0 48px #1a2950 inset;
  padding: 28px 32px;
  min-width: 260px;
  max-width: 320px;
  flex: 1 1 260px;
  color: #eaf6ff;
  transition:
    transform 0.3s cubic-bezier(0.4, 0, 0.2, 1),
    box-shadow 0.3s;
  border: 1.5px solid #3a6ff7;
  position: relative;
}
.project-card:hover {
  transform: translateY(-10px) scale(1.04) rotate(-1deg);
  box-shadow:
    0 0 48px #5ab4ff,
    0 0 96px #3a6ff7 inset;
  border-color: #5ab4ff;
}
.project-title {
  font-size: 1.25rem;
  color: #5ab4ff;
  font-weight: 700;
  margin-bottom: 10px;
}
.project-desc {
  font-size: 1.05rem;
  color: #b3d1ff;
}
</style>
