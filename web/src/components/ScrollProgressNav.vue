<template>
  <nav class="scroll-progress-nav">
    <ul>
      <li
        v-for="(item, idx) in items"
        :key="item.id"
        :class="{ active: idx === activeIndex }"
        @click="scrollToSection(item.id)"
      >
        <span class="dot"></span>
        <span class="label">{{ item.label }}</span>
      </li>
    </ul>
  </nav>
</template>

<script setup lang="ts">
import { ref, onMounted, onBeforeUnmount } from 'vue';
const props = defineProps<{ items: { id: string; label: string }[] }>();
const activeIndex = ref(0);

function scrollToSection(id: string) {
  const el = document.getElementById(id);
  if (el) {
    el.scrollIntoView({ behavior: 'smooth', block: 'center' });
  }
}

function updateActive() {
  const wh = window.innerHeight;
  let found = 0;
  props.items.forEach((item, idx) => {
    const el = document.getElementById(item.id);
    if (el) {
      const rect = el.getBoundingClientRect();
      if (rect.top < wh * 0.4) found = idx;
    }
  });
  activeIndex.value = found;
}

onMounted(() => {
  window.addEventListener('scroll', updateActive);
  updateActive();
});
onBeforeUnmount(() => {
  window.removeEventListener('scroll', updateActive);
});
</script>

<style scoped>
.scroll-progress-nav {
  position: fixed;
  top: 50%;
  right: 36px;
  transform: translateY(-50%);
  z-index: 100;
  display: flex;
  flex-direction: column;
  align-items: center;
  user-select: none;
}
.scroll-progress-nav ul {
  list-style: none;
  margin: 0;
  padding: 0;
  display: flex;
  flex-direction: column;
  gap: 36px;
}
.scroll-progress-nav li {
  cursor: pointer;
  display: flex;
  flex-direction: column;
  align-items: center;
  transition: color 0.2s;
}
.dot {
  width: 16px;
  height: 16px;
  border-radius: 50%;
  background: linear-gradient(90deg, #3a6ff7 0%, #5ab4ff 100%);
  box-shadow:
    0 0 12px #3a6ff7,
    0 0 24px #5ab4ff;
  margin-bottom: 6px;
  transition:
    box-shadow 0.2s,
    background 0.2s;
}
.label {
  font-size: 0.98rem;
  color: #b3d1ff;
  opacity: 0.7;
  transition:
    color 0.2s,
    opacity 0.2s;
  white-space: nowrap;
}
.active .dot {
  background: linear-gradient(90deg, #5ab4ff 0%, #3a6ff7 100%);
  box-shadow:
    0 0 24px #5ab4ff,
    0 0 48px #3a6ff7;
}
.active .label {
  color: #fff;
  opacity: 1;
  font-weight: 700;
}
</style>
