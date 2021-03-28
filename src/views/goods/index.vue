<template>
  <div class="xtx-goods-page" v-if="goods">
    <div class="container">
      <!-- 面包屑 -->
      <XtxBread>
        <XtxBreadItem to="/">首页</XtxBreadItem>
        <XtxBreadItem :to="'/category/' + goods.categories[2].id">{{
          goods.categories[2].name
        }}</XtxBreadItem>
        <XtxBreadItem :to="'/category/sub/' + goods.categories[1].id">{{
          goods.categories[1].name
        }}</XtxBreadItem>
        <XtxBreadItem to="/">{{ goods.name }}</XtxBreadItem>
      </XtxBread>
      <!-- 商品信息 -->
      <div class="goods-info">
        <div class="media">
          <!-- 商品预览组件 -->
          <GoodsImage :images="goods.mainPictures" />
          <GoodsSales />
        </div>
        <div class="spec">
          <!-- 名字区组件 -->
          <GoodsName :goods="goods" />
          <!-- sku 数量等选项 -->
          <GoodsSku :goods="goods" />
        </div>
      </div>
      <!-- 商品推荐 -->
      <GoodsRelevant />
      <!-- 商品详情 -->
      <div class="goods-footer">
        <div class="goods-article">
          <!-- 商品+评价 -->
          <div class="goods-tabs"></div>
          <!-- 注意事项 -->
          <div class="goods-warn"></div>
        </div>
        <!-- 24热榜+专题推荐 -->
        <div class="goods-aside"></div>
      </div>
    </div>
  </div>
  <div v-else class="loading"></div>
</template>

<script>
import GoodsRelevant from './components/goods-relevant'
import GoodsImage from './components/goods-image'
import GoodsSales from './components/goods-sales'
import GoodsName from './components/goods-name'
import { findGoods } from '@/api/goods'
import { useRoute } from 'vue-router'
import { ref } from 'vue'
import GoodsSku from './components/goods-sku.vue'
// 得到商品详情数据
const useGoodsData = () => {
  const route = useRoute()
  const goods = ref(null)
  if (route.params.id) {
    // 说有的商品跳转过来，获取这个商品（只有一个商品）
    findGoods('1369155859933827074').then(({ result }) => {
      goods.value = result
    })
  }
  return { goods }
}
export default {
  name: 'XtxGoodsPage',
  components: { GoodsRelevant, GoodsImage, GoodsSales, GoodsName, GoodsSku },
  setup () {
    const { goods } = useGoodsData()
    // console.log(goods)
    return { goods }
  }
}
</script>

<style scoped lang="less">
.loading {
  margin-top: 72px;
  height: 600px;
  background: #fff url(../../assets/images/loading.gif) no-repeat center;
}
.goods-info {
  min-height: 600px;
  background: #fff;
  display: flex;
  .media {
    width: 580px;
    height: 600px;
    padding: 30px 50px;
  }
  .spec {
    flex: 1;
    padding: 30px 30px 30px 0;
  }
}
.goods-footer {
  display: flex;
  margin-top: 20px;
  .goods-article {
    width: 940px;
    margin-right: 20px;
  }
  .goods-aside {
    width: 280px;
    min-height: 1000px;
  }
}
.goods-tabs {
  min-height: 600px;
  background: #fff;
}
.goods-warn {
  min-height: 600px;
  background: #fff;
  margin-top: 20px;
}
</style>
