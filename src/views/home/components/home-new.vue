<template>
  <!-- 新鲜好物 -->
  <HomePanel title="新鲜好物" sub-title="新鲜出炉 品质靠谱">
    <template v-slot:right><XtxMore /></template>
    <transition name="fade">
      <ul class="goods-list" v-if="goods.length">
        <li v-for="item in goods" :key="item.id">
          <RouterLink to="/">
            <img :src="item.picture" alt="" />
            <p class="name">{{ item.name }}</p>
            <p class="price">&yen;{{ item.price }}</p>
          </RouterLink>
        </li>
      </ul>
      <HomeSkeleton v-else />
    </transition>
  </HomePanel>
</template>

<script>
import { findNew } from '@/api/home'
import HomePanel from './home-panel'
import HomeSkeleton from './home-skeleton'
export default {
  name: 'HomeNew',
  data () {
    return {
      goods: []
    }
  },
  components: {
    HomePanel,
    HomeSkeleton
  },
  async created () {
    const data = await findNew()
    this.goods = data.result
    // console.log(this.goods)
  }
}
</script>

<style lang="less" scoped>

.goods-list {
  display: flex;
  justify-content: space-between;
  height: 406px;
  li {
    width: 306px;
    height: 406px;
    background: #f0f9f4;
    .hoverShadow();
    img {
      width: 306px;
      height: 306px;
    }
    p {
      font-size: 22px;
      padding-top: 12px;
      text-align: center;
    }
    .price {
      color: @priceColor;
    }
  }
}
</style>
