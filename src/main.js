import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
// 导入重置样式css
import 'normalize.css'
// 引入公共样式
import '@/assets/styles/common.less'

// 引入mock模拟数据
import './mock'
// 创建一个vue应用实例
createApp(App).use(store).use(router).mount('#app')
