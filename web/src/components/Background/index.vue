<template>
  <canvas ref="canvasRef" class="background-canvas"></canvas>
</template>

<script setup lang="ts">
import { ref, onMounted, onBeforeUnmount } from 'vue'

const canvasRef = ref<HTMLCanvasElement | null>(null)
let ctx: CanvasRenderingContext2D | null = null
let animationId: number

interface Firefly {
  x: number
  y: number
  vx: number
  vy: number
  alpha: number
  radius: number
  life: number
  maxLife: number
}

const fireflies: Firefly[] = []
const maxFireflies = 40
const mouseFireflies: Firefly[] = []

function randomFirefly(width: number, height: number): Firefly {
  return {
    x: Math.random() * width,
    y: Math.random() * height,
    vx: (Math.random() - 0.5) * 0.6,
    vy: (Math.random() - 0.5) * 0.6,
    alpha: Math.random() * 0.5 + 0.3,
    radius: Math.random() * 2 + 1.5,
    life: 0,
    maxLife: 120 + Math.random() * 100,
  }
}

function randomBlueColor(alpha: number) {
  // 柔和淡蓝色
  return `rgba(58, 111, 247, ${alpha})`
}

function addFirefly(width: number, height: number) {
  if (fireflies.length < maxFireflies) {
    fireflies.push(randomFirefly(width, height))
  }
}

function addMouseFirefly(x: number, y: number) {
  mouseFireflies.push({
    x,
    y,
    vx: (Math.random() - 0.5) * 0.8,
    vy: (Math.random() - 0.5) * 0.8,
    alpha: 1,
    radius: Math.random() * 3 + 2,
    life: 0,
    maxLife: 5 + Math.random() * 10,
  })
}

function drawFirefly(f: Firefly) {
  if (!ctx) return
  ctx.save()
  ctx.beginPath()
  ctx.arc(f.x, f.y, f.radius, 0, Math.PI * 2)
  ctx.fillStyle = randomBlueColor(f.alpha)
  ctx.shadowColor = 'rgba(100,180,255,0.7)'
  ctx.shadowBlur = 12
  ctx.globalAlpha = f.alpha
  ctx.fill()
  ctx.restore()
}

function animate() {
  if (!ctx || !canvasRef.value) return
  const width = canvasRef.value.width
  const height = canvasRef.value.height
  ctx.clearRect(0, 0, width, height)
  ctx.fillStyle = '#000'
  ctx.fillRect(0, 0, width, height)

  // 普通萤火虫
  for (let i = fireflies.length - 1; i >= 0; i--) {
    const f = fireflies[i]
    f.x += f.vx
    f.y += f.vy
    f.life++
    // alpha渐变
    if (f.life < f.maxLife / 3) {
      f.alpha = Math.min(1, f.alpha + 0.01)
    } else if (f.life > f.maxLife * 0.7) {
      f.alpha = Math.max(0, f.alpha - 0.015)
    }
    drawFirefly(f)
    if (f.life > f.maxLife || f.alpha <= 0 || f.x < 0 || f.x > width || f.y < 0 || f.y > height) {
      fireflies.splice(i, 1)
    }
  }
  // 鼠标萤火虫
  for (let i = mouseFireflies.length - 1; i >= 0; i--) {
    const f = mouseFireflies[i]
    f.x += f.vx
    f.y += f.vy
    f.life++
    // alpha渐变
    if (f.life < f.maxLife / 3) {
      f.alpha = Math.min(1, f.alpha + 0.04)
    } else if (f.life > f.maxLife * 0.7) {
      f.alpha = Math.max(0, f.alpha - 0.06)
    }
    drawFirefly(f)
    if (f.life > f.maxLife || f.alpha <= 0) {
      mouseFireflies.splice(i, 1)
    }
  }

  // 随机生成新萤火虫
  if (Math.random() < 0.08) {
    addFirefly(width, height)
  }

  animationId = requestAnimationFrame(animate)
}

function resizeCanvas() {
  if (!canvasRef.value) return
  const dpr = window.devicePixelRatio || 1
  canvasRef.value.width = window.innerWidth * dpr
  canvasRef.value.height = window.innerHeight * dpr
  canvasRef.value.style.width = window.innerWidth + 'px'
  canvasRef.value.style.height = window.innerHeight + 'px'
  ctx = canvasRef.value.getContext('2d')
  if (ctx) ctx.setTransform(1, 0, 0, 1, 0, 0)
}

function handleMouseMove(e: MouseEvent) {
  if (!canvasRef.value) return
  const rect = canvasRef.value.getBoundingClientRect()
  const dpr = window.devicePixelRatio || 1
  const x = (e.clientX - rect.left) * dpr
  const y = (e.clientY - rect.top) * dpr
  // 鼠标移动时生成多个荧光点
  for (let i = 0; i < 2; i++) {
    addMouseFirefly(x + Math.random() * 10 - 5, y + Math.random() * 10 - 5)
  }
}

onMounted(() => {
  resizeCanvas()
  window.addEventListener('resize', resizeCanvas)
  window.addEventListener('mousemove', handleMouseMove)
  animate()
})

onBeforeUnmount(() => {
  window.removeEventListener('resize', resizeCanvas)
  window.removeEventListener('mousemove', handleMouseMove)
  cancelAnimationFrame(animationId)
})
</script>

<style scoped>
.background-canvas {
  position: fixed;
  left: 0;
  top: 0;
  width: 100vw;
  height: 100vh;
  z-index: -1;
  pointer-events: none;
  display: block;
}
</style>
