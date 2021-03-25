// hooks封装逻辑,提供响应式数据
// 引入ref
import { useIntersectionObserver } from '@vueuse/core'
import { ref } from 'vue'
// 封装懒加载
export const useLazyData = (apiFn) => {
/**
 * 1/需要被观察的对象
 * 2/不同的API函数
 * 3/返回数据
 */
  const target = ref(null)
  const result = ref(null)
  const { stop } = useIntersectionObserver(
    target,
    ([{ isIntersecting }], observerElement) => {
      if (isIntersecting) {
        stop()
        // 进入可视区
        apiFn().then(data => {
          result.value = data.result
        })
      }
    },
    {
      threshold: 0
    }
  )
  return { target, result }
}
