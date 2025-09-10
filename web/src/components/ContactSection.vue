<template>
  <section class="contact-section reveal-section">
    <div class="contact-content">
      <h2>联系我</h2>
      <p>欢迎交流合作，或一起探索星空与机械的世界！</p>
      <div class="contact-links">
        <a href="mailto:your@email.com" class="contact-link">✉️ 邮箱</a>
        <a
          href="https://github.com/yourname"
          target="_blank"
          class="contact-link"
          >🌌 GitHub</a
        >
        <a href="#" class="contact-link">🔗 其它</a>
      </div>
    </div>
  </section>
</template>

<script setup lang="ts"></script>

<style scoped>
.contact-section {
  min-height: 100vh;
  display: flex;
  align-items: center;
  justify-content: center;
  background: none;
}
.contact-content {
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
  animation: lighting 1.5s ease-in-out infinite alternate;
}
.contact-content:hover {
  box-shadow:
    0 0 48px 8px #3a6ff7,
    0 0 128px 32px #1a2950 inset;
  transform: translateY(-10px) scale(1.04) rotate(-1deg);
}

.contact-content:hover {
  box-shadow:
    0 0 48px 8px #3a6ff7,
    0 0 128px 32px #1a2950 inset;
}
.contact-content {
  text-align: center;
}
.contact-content h2 {
  color: #3a6ff7;
  font-size: 2.2rem;
  margin-bottom: 18px;
  text-shadow: 0 0 16px #3a6ff7;
}
.contact-content p {
  color: #b3d1ff;
  font-size: 1.15rem;
  margin-bottom: 24px;
}
.contact-links {
  display: flex;
  gap: 32px;
  justify-content: center;
  flex-wrap: wrap;
}
.contact-link {
  color: #fff;
  background: linear-gradient(90deg, #3a6ff7 0%, #5ab4ff 100%);
  padding: 10px 28px;
  border-radius: 12px;
  font-weight: 600;
  text-decoration: none;
  box-shadow:
    0 0 12px #3a6ff7,
    0 0 24px #5ab4ff;
  outline: 2px solid #5ab4ff;
  outline-offset: -2px;
  transition: all 0.18s cubic-bezier(0.4, 0, 0.2, 1);
  font-size: 1.08rem;
}
.contact-link:hover {
  background: linear-gradient(90deg, #5ab4ff 0%, #3a6ff7 100%);
  color: #fff;
  outline: 2.5px solid #fff;
}
</style>
