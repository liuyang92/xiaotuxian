import { createRouter, createWebHashHistory } from 'vue-router'
const Layout = () => import('@/views/Layout')
const Home = () => import('@/views/home')
const TopCategory = () => import('@/views/category')
const subCategory = () => import('@/views/category/sub')
const routes = [
  {
    path: '/',
    component: Layout,
    children: [
      { path: '/', component: Home },
      { path: '/category/:id', component: TopCategory },
      { path: '/category/sub/:id', component: subCategory }
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
