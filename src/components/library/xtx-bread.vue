<script>
import { h } from 'vue'
export default {
  name: 'XtxBread',
  render () {
    // vue3.0不会再函数中传入h函数(createElement),需要按需导入
    // 需要得到插槽中的所有内容
    // console.log(this.$slots.default())
    const items = this.$slots.default()
    // console.log(items)
    const arr = []
    items.forEach((item, index) => {
      arr.push(item)
      if (index < (items.length - 1)) {
        arr.push(h('i', { class: 'iconfont icon-angle-right' }))
      }
    })
    // console.log(1)
    return h('div', { class: 'xtx-bread' }, arr)
  }
}
</script>

<style lang='less'>
.xtx-bread{
  display: flex;
  padding: 25px 10px;
  &-item {
    // &:last-child{
    //   i{
    //     display: none;
    //   }
    // }
    a {
      color: #666;
      transition: all .4s;
      &:hover {
        color: @xtxColor;
      }
    }
  }
  i {
    font-size: 12px;
    margin-left: 5px;
    margin-right: 5px;
    line-height: 22px;
  }
}
</style>
