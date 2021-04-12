// 1. 初始化axios实例
// 2. 请求拦截器，带token
// 3. 响应拦截器，拿出响应数据，拦截token失效
// 4. 定义一个函数使用配置好的axios发请求
// 得到：请求工具函数
import axios from 'axios'
import store from '@/store'
import router from '@/router'

export const instance = axios.create({
  baseURL: 'http://pcapi-xiaotuxian-front.itheima.net/',
  timeout: 5000
})

instance.interceptors.request.use(config => {
  // config 是请求配置
  // 1. 获取token
  const { token } = store.state.user.profile
  // 2. 请求头设置token
  if (token) config.headers.Authorization = `Bearer ${token}`
  return config
}, e => Promise.reject(e))

instance.interceptors.response.use(res => res.data, e => {
  // 但token未传，已失效，响应状态码 401
  if (e.response && e.response.status === 401) {
    // 获取当前的路由地址（完整地址 哈希地址+？传参） #后的地址
    // router ===> $router    路径 $route.fullPath  ===> router.currentRoute.fullPath
    // 例如 /member/order?id=100&name=tom
    // 1. 跳转的时候   /login?redirectUrl=/member/order?id=100&name=tom  参数解析又问题
    // 2. 所以需要对地址进行URL编码  encodeURIComponent('/member/order?id=100&name=tom')
    // 使用router.currentRoute的时候加上value，因为是ref定义的
    const redirectUrl = encodeURIComponent(router.currentRoute.value.fullPath)
    // 跳转登录页面，并且传递当前路由地址（目的：将来登录完毕后可以回跳）
    router.push('/login?redirectUrl=' + redirectUrl)
  }
  return Promise.reject(e)
})

/**
 * @param {String} - url  请求地址
 * @param {String} - method  请求类型
 * @param {Object} - submitData  对象类型，提交数据
 */
const request = (url, method, submitData) => {
  // 使用配置好的axios来发请求
  // 返回axios的调用，返回的就是一个promise
  return instance({
    url,
    method,
    // params get方式传参   data 其他方式，请求体
    // params: submitData,
    // data: submitData
    [method.toLowerCase() === 'get' ? 'params' : 'data']: submitData
  })
}

export default request
