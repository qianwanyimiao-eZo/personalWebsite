import { createRouter, createWebHistory } from 'vue-router';
import HomeView from '../views/HomeView.vue';

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/home',
      name: 'home',
      component: HomeView,
    },
    {
      path: '/more',
      name: 'more',
      component: () => import('../views/AboutView.vue'),
    },
  ],
});

router.beforeEach((to, from, next) => {
  if (to.matched.length === 0) {
    // 如果路径未匹配到任何路由规则
    next('/home'); // 重定向到首页
  } else {
    next(); // 正常继续路由跳转
  }
});

export default router;
