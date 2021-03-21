import { createRouter, createWebHashHistory } from 'vue-router'
import Layout from '@/views/Layout'
import Home from '@/views/home'
const routes = [
  {
    path: '/',
    component: Layout,
    children: [
      { path: '/', component: Home }
    ]
  }
]

// 路由实例（vue2.0用new vue,3.0用createRouter）
const router = createRouter({
  // 使用hash方式实现路由
  history: createWebHashHistory(),
  // 路由规则
  routes
})

export default router
