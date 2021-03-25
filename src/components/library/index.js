// vue插件==>扩展vue功能,全局组件/指令/函数
// 当在main.js导入,使用xue.use()的时候就会执行install函数
// import XtxSkeleton from './xtx-skeleton.vue'
// import XtxCarousel from './xtx-carousel.vue'
// import XtxMore from './xtx-more.vue'
// import XtxBread from './xtx-bread.vue'
// import XtxBreadItem from './xtx-bread-item.vue'
// 导入library文件夹下的所有组件
// 批量导入需要使用require.context(dir,deep,matching)
/**
 * 参一 目录
 * 参二 是否加载子目录
 * 参三 加载的正则匹配
 */
const importFn = require.context('./', false, /\.vue$/)
export default {
  // use时会调用install
  //   vue2.0传入Vue,3.0传入app
  install (app) {
    // app.component(XtxSkeleton.name, XtxSkeleton)
    // app.component(XtxCarousel.name, XtxCarousel)
    // app.component(XtxMore.name, XtxMore)
    // app.component(XtxBread.name, XtxBread)
    // app.component(XtxBreadItem.name, XtxBreadItem)
    // 批量注册
    importFn.keys().forEach(key => {
      const component = importFn(key).default
      app.component(component.name, component)
    })

    // 定义指令
    defineDirective(app)
  }
}
const defineDirective = app => {
  // 定义自定义指令
  // 图片懒加载 v-lazyload
  app.directive('lazyload', {
    mounted (el, binding) {
      // el是图片dom,banding.value是图片元素
      // 当图片进入可视区,将binding.value赋值给el.src
      const observe = new IntersectionObserver(([{ isIntersecting }]) => {
        if (isIntersecting) {
          el.src = binding.value
          // 加载后取消监听
          observe.unobserve(el)
        }
      }, {
        // 监听图片进入百分比
        threshold: 0.01
      })
      // 开始监听
      observe.observe(el)
    }
  })
}
