<template>
  <div class="sub-category">
    <div class="container">
      <!-- 面包屑 -->
      <SubBread />
      <!-- 筛选区 -->
      <SubFilter @change="changeFilter"/>
      <!-- 商品区 -->
      <div class="goods-list">
        <!-- 排序 -->
        <SubSort  @change="changeSort"/>
        <!-- 列表 -->
        <ul>
          <li v-for="goods in goodsList" :key="goods.id" >
            <GoodsItem :goods="goods" />
          </li>
        </ul>
        <!-- 加载 -->
        <XtxInfiniteLoading v-model:loading="loading" v-model:finished="finished" @infinite="getData()" />
      </div>
    </div>
  </div>
</template>

<script>
import SubBread from './components/sub-bread.vue'
import SubFilter from './components/sub-filter'
import SubSort from './components/sub-sort'
import GoodsItem from './components/goods-item'
import { ref, watch } from 'vue'
import { findGoodsByCategory } from '@/api/category'
import { useRoute } from 'vue-router'
export default {
  components: { SubBread, SubFilter, SubSort, GoodsItem },
  name: 'SubCategory',
  setup () {
    const loading = ref(false)
    const finished = ref(false)
    const goodsList = ref([])
    // 获取路由信息
    const route = useRoute()
    let reqParams = {
      page: 1,
      pageSize: 20
    }
    const getData = () => {
      loading.value = true
      reqParams.categoryId = route.params.id
      findGoodsByCategory(reqParams).then(({ result }) => {
        if (result.items.length) {
          goodsList.value.push(...result.items)
          reqParams.page++
        } else {
          finished.value = true
        }
        // 请求结束
        loading.value = false
      })
    }
    // 监听二级分类重新加载
    watch(() => route.params.id, (newVal, oldVal) => {
      // console.log('/category/sub/' + newVal)
      if (route.path === ('/category/sub/' + newVal)) {
        // console.log()
        goodsList.value = []
        reqParams = {
          page: 1,
          pageSize: 20
        }
        finished.value = false
      }
    })
    // 监听筛选区改变
    const changeFilter = (filterParams) => {
      reqParams = { ...reqParams, ...filterParams }
      reqParams.page = 1
      goodsList.value = []
      finished.value = false
    }
    // 监听排序改变
    const changeSort = (sortParams) => {
      reqParams = { ...reqParams, ...sortParams }
      reqParams.page = 1
      goodsList.value = []
      finished.value = false
    }
    return { loading, finished, goodsList, getData, reqParams, changeFilter, changeSort }
  }
}
</script>

<style scoped lang="less">
.goods-list {
  background: #fff;
  padding: 0 25px;
  margin-top: 25px;
  ul {
    display: flex;
    flex-wrap: wrap;
    padding: 0 5px;
    li {
      margin-right: 20px;
      margin-bottom: 20px;
      &:nth-child(5n) {
        margin-right: 0;
      }
    }
  }
}
</style>
