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

interface StarDust {
  x: number
  y: number
  vx: number
  vy: number
  alpha: number
  radius: number
  life: number
  maxLife: number
  brightness: number
}

const fireflies: Firefly[] = []
const maxFireflies = 40
const starDustParticles: StarDust[] = []
let lastMouseX = 0
let lastMouseY = 0

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

function addStarDust(x: number, y: number) {
  // 在鼠标位置生成10-15个星尘粒子
  const particleCount = 10 + Math.floor(Math.random() * 6)

  for (let i = 0; i < particleCount; i++) {
    const particle: StarDust = {
      x: x + (Math.random() - 0.5) * 20, // 在鼠标周围20px范围内随机分布
      y: y + (Math.random() - 0.5) * 20,
      vx: (Math.random() - 0.5) * 0.8, // 微小的随机速度
      vy: (Math.random() - 0.5) * 0.8,
      alpha: 0.8 + Math.random() * 0.2, // 初始alpha 0.8-1.0
      radius: 0.5 + Math.random() * 1.5, // 半径 0.5-2px
      life: 0,
      maxLife: 60 + Math.random() * 60, // 生命周期 60-120帧
      brightness: 0.5 + Math.random() * 0.5 // 亮度变化 0.5-1.0
    }
    starDustParticles.push(particle)
  }
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

function drawStarDust(particle: StarDust) {
  if (!ctx) return
  ctx.save()

  // 根据生命周期计算当前alpha
  const lifeProgress = particle.life / particle.maxLife
  const currentAlpha = particle.alpha * (1 - lifeProgress) // 线性衰减

  // 星尘颜色：从亮蓝到深蓝渐变
  const r = Math.floor(120 + 135 * particle.brightness) // 120-255
  const g = Math.floor(180 + 75 * particle.brightness)  // 180-255
  const b = 255

  ctx.globalAlpha = currentAlpha
  ctx.beginPath()
  ctx.arc(particle.x, particle.y, particle.radius, 0, Math.PI * 2)
  ctx.fillStyle = `rgba(${r}, ${g}, ${b}, 1)`

  // 添加微弱的发光效果
  ctx.shadowColor = `rgba(${r}, ${g}, ${b}, 0.6)`
  ctx.shadowBlur = particle.radius * 3

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

  // 星尘粒子更新和绘制
  for (let i = starDustParticles.length - 1; i >= 0; i--) {
    const particle = starDustParticles[i]

    // 更新位置和生命周期
    particle.x += particle.vx
    particle.y += particle.vy
    particle.life++

    // 添加微弱的重力效果和阻力
    particle.vy += 0.01 // 轻微下沉
    particle.vx *= 0.995 // 阻力
    particle.vy *= 0.995

    drawStarDust(particle)

    // 移除超出生命周期的粒子
    if (particle.life > particle.maxLife || particle.x < -10 || particle.x > width + 10 || particle.y < -10 || particle.y > height + 10) {
      starDustParticles.splice(i, 1)
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

  // 计算鼠标移动距离
  const distance = Math.sqrt((x - lastMouseX) ** 2 + (y - lastMouseY) ** 2)

  // 只有当鼠标移动距离足够时才生成星尘（避免静止时过多粒子）
  if (distance > 5) {
    // 根据移动速度调整粒子生成频率
    const speed = Math.min(distance / 10, 3) // 速度因子 0-3
    if (Math.random() < 0.3 + speed * 0.1) { // 基础30%概率 + 速度加成
      addStarDust(x, y)
    }
  }

  lastMouseX = x
  lastMouseY = y
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
