<template>
  <XtxBread>
    <XtxBreadItem to="/">首页</XtxBreadItem>
    <XtxBreadItem v-if="category.top" :to="`/category/${category.top.id}`">{{
      category.top.name
    }}</XtxBreadItem>
    <Transition name="pop" mode="out-in">
      <XtxBreadItem v-if="category.sub" :key="category.sub.id">{{
        category.sub.name
      }}</XtxBreadItem>
    </Transition>
  </XtxBread>
</template>

<script>
import { computed } from 'vue'
import { useRoute } from 'vue-router'
import { useStore } from 'vuex'
export default {
  name: 'SunBread',
  setup () {
    /**
     *1  获取二级分类的id,通过路由获取
     *2获取vuex中的类目数据
     *通过计算属性得到一级/二级类目的名称和id
     */
    // 箭头函数没有this
    // route===?this.$route
    const route = useRoute()
    // store===>this.$store
    const store = useStore()
    const category = computed(() => {
      const obj = {}
      store.state.category.list.forEach(top => {
        top.children && top.children.forEach(sub => {
          if (sub.id === route.params.id) {
            obj.sub = {
              id: sub.id,
              name: sub.name
            }
            obj.top = {
              id: top.id,
              name: top.name
            }
          }
        })
      })
      return obj
    })
    return { category }
  }
}
</script>

<style lang="less" scoped></style>
