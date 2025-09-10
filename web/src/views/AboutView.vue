<template>
  <div class="about">
    <div class="about-card">
      <div class="about-avatar">
        <svg width="80" height="80" viewBox="0 0 80 80">
          <circle
            cx="40"
            cy="40"
            r="36"
            fill="#1a2950"
            stroke="#3a6ff7"
            stroke-width="4"
          />
          <circle cx="40" cy="40" r="24" fill="#3a6ff7" opacity="0.15" />
          <circle cx="40" cy="40" r="12" fill="#5ab4ff" opacity="0.25" />
        </svg>
      </div>
      <h2 class="about-title">Your Name</h2>
      <p class="about-desc">
        热爱前端与创意编程，追逐星空与机械之美。<br />专注于
        Vue、TypeScript、动画与交互体验。
      </p>
      <div class="about-links">
        <a href="#" class="mecha-link">GitHub</a>
        <a href="#" class="mecha-link">博客</a>
      </div>
    </div>
  </div>
</template>

<style scoped>
.about {
  min-height: 100vh;
  display: flex;
  align-items: center;
  justify-content: center;
  background: none;
}
.about-card {
  background: rgba(10, 24, 55, 0.92);
  border: 2.5px solid #3a6ff7;
  border-radius: 28px;
  box-shadow:
    0 0 48px 8px #3a6ff7,
    0 0 128px 32px #1a2950 inset;
  padding: 48px 40px 36px 40px;
  text-align: center;
  position: relative;
  z-index: 2;
  max-width: 420px;
}
.about-avatar {
  margin-bottom: 18px;
}
.about-title {
  font-size: 2rem;
  color: #3a6ff7;
  margin-bottom: 10px;
  text-shadow: 0 0 16px #3a6ff7;
}
.about-desc {
  color: #b3d1ff;
  font-size: 1.1rem;
  margin-bottom: 24px;
  text-shadow: 0 0 8px #1a2950;
}
.about-links {
  display: flex;
  gap: 24px;
  justify-content: center;
}
.mecha-link {
  color: #fff;
  background: linear-gradient(90deg, #3a6ff7 0%, #5ab4ff 100%);
  padding: 8px 22px;
  border-radius: 10px;
  font-weight: 600;
  text-decoration: none;
  box-shadow:
    0 0 12px #3a6ff7,
    0 0 24px #5ab4ff;
  outline: 2px solid #5ab4ff;
  outline-offset: -2px;
  transition: all 0.18s cubic-bezier(0.4, 0, 0.2, 1);
}
.mecha-link:hover {
  background: linear-gradient(90deg, #5ab4ff 0%, #3a6ff7 100%);
  color: #fff;
  outline: 2.5px solid #fff;
}
</style>
