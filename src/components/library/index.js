// vue插件==>扩展vue功能,全局组件/指令/函数
// 当在main.js导入,使用xue.use()的时候就会执行install函数
import XtxSkeleton from './xtx-skeleton.vue'
import XtxCarousel from './xtx-carousel.vue'
import XtxMore from './xtx-more.vue'
export default {
  // use时会调用install
//   vue2.0传入Vue,3.0传入app
  install (app) {
    app.component(XtxSkeleton.name, XtxSkeleton)
    app.component(XtxCarousel.name, XtxCarousel)
    app.component(XtxMore.name, XtxMore)
  }
}
