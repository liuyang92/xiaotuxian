// 导入axios
import axios from 'axios'
// 导入store
import store from '@/store'
// 导入router
import router from '@/router'

// 创建axios实例
const instance = axios.create({
  baseURL: 'http://pcapi-xiaotuxian-front.itheima.net/',
  timeout: 5000
})

// 设置请求拦截器:config>请求配置
instance.interceptors.request.use(config => {
  // 如果token存在,请求头携带
  const { token } = store.state.user.profile
  if (token)config.headers.Authorization = `Bearer ${token}`
  return config
}, e => Promise.reject(e))

// 设置响应拦截器,拿到data,拦截token失效报错401
instance.interceptors.response.use(res => res.data, e => {
  // 如果响应报错=>token失效,响应状态吗401
  if (e.response || e.response.status === 401) {
    // 获取当前的路由地址(完整地址,哈希地址+传参),登陆后跳转回来
    // 需要对地址进行Url编码
    const redirectUrl = encodeURIComponent(router.currentRoute.value.fullPath)

    // 跳转登录页面,并记录当前路径信息
    router.push({ path: '/login', query: { redirectUrl } })
  }
  return Promise.reject(e)
})
// 定义函数使用配置好的axios发请求
/**
 *@param {String} -url            请求地址
 *@param {String} -method         请求类型
 *@param {Object} -submitData     对象类型,提交数据
 */
export default (url, method, submitData) => {
// 使用配置好的axios发送请求
// 返回axios的调用,的返回的就是一个promise
  return instance({
    url,
    method,
    [method.toLowerCase() === 'get' ? 'params' : 'data']: submitData
  })
}
