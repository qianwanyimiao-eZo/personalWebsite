<script setup lang="ts">
import { RouterView } from 'vue-router'
import TopMenu from './components/TopMenu/index.vue'
import Background from "./components/Background/index.vue"
</script>

<template>
  <div class="root">
    <Background />
    <header>
      <TopMenu />
    </header>
    <RouterView />
  </div>
</template>

<style scoped>
.root {
  width: 100%;
  height: 100vh;
  position: relative;
  color: white;
}

header {
  position: fixed;
  top: 0;
  left: 0;
  z-index: 50;
  width: 100%;
}
</style>
