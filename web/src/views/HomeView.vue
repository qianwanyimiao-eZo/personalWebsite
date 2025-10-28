<script setup lang="ts">
import { onMounted, onBeforeUnmount } from 'vue';
import HeroSection from '@/components/HeroSection.vue';
import AboutSection from '@/components/AboutSection.vue';
import ProjectsSection from '@/components/ProjectsSection.vue';
import ContactSection from '@/components/ContactSection.vue';
import ScrollProgressNav from '@/components/ScrollProgressNav.vue';
import Bottom from '@/components/Bottom.vue';
import { useAutoCenterSection } from '@/composables/useAutoCenterSection';

const navItems = [
  { id: 'hero', label: '首页' },
  { id: 'about', label: '关于' },
  { id: 'projects', label: '项目' },
  { id: 'contact', label: '联系' },
];

// 自动滚动到区域中间
useAutoCenterSection(navItems.map(i => i.id));

// reveal 动画
let revealHandler: (() => void) | null = null;
onMounted(() => {
  revealHandler = () => {
    const reveals = document.querySelectorAll('.reveal-section');
    const wh = window.innerHeight;
    reveals.forEach(el => {
      const rect = el.getBoundingClientRect();
      if (rect.top < wh * 0.85) {
        el.classList.add('revealed');
      }
    });
  };
  window.addEventListener('scroll', revealHandler);
  revealHandler();
});
onBeforeUnmount(() => {
  if (revealHandler) window.removeEventListener('scroll', revealHandler);
});
</script>

<template>
  <main>
    <HeroSection id="hero" />
    <AboutSection id="about" />
    <ProjectsSection id="projects" />
    <ContactSection id="contact" />
    <ScrollProgressNav :items="navItems" />
    <Bottom />
  </main>
</template>

<style>
.reveal-section {
  opacity: 0;
  transform: translateY(60px) scale(0.98);
  transition:
    opacity 0.8s cubic-bezier(0.4, 0, 0.2, 1),
    transform 0.8s cubic-bezier(0.4, 0, 0.2, 1);
}
.reveal-section.revealed {
  opacity: 1;
  transform: none;
}
</style>
