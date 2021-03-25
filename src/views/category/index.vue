<template>
  <div class="top-category">
    <div class="container">
      <!-- 面包屑 -->
      <XtxBread>
        <XtxBreadItem to="/">首页</XtxBreadItem>
        <Transition name="pop" mode="out-in">
          <XtxBreadItem :key="topCategory.id">{{
            topCategory.name
          }}</XtxBreadItem>
        </Transition>
      </XtxBread>
      <!-- 轮播图 -->
      <XtxCarousel :sliders="sliders" style="height:500px" />
      <!-- 所有二级分类 -->
      <div class="sub-list">
        <h3>全部分类</h3>
        <ul>
          <li v-for="item in topCategory.children" :key="item.id">
            <a href="javascript:;">
              <img :src="item.picture" />
              <p>{{ item.name }}</p>
            </a>
          </li>
        </ul>
      </div>
      <!-- 不同分类商品 -->
      <!-- 分类关联商品 -->
      <div class="ref-goods" v-for="item in subCategory" :key="item.id">
        <div class="head">
          <h3>- {{ item.name }} -</h3>
          <p class="tag">温暖柔软，品质之选</p>
          <XtxMore />
        </div>
        <div class="body">
          <GoodsItem
            v-for="goods in item.goods"
            :key="goods.id"
            :goods="goods"
          />
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { findBanner } from '@/api/home'
import { findTopCategory } from '@/api/category'
import GoodsItem from './components/goods-item'
export default {
  name: 'TopCategory',
  data () {
    return {
      sliders: [],
      // 各个分类的商品
      subCategory: []
    }
  },
  // 当地址栏变化,且有值的时候触发
  watch: {
    '$route.params.id': {
      handler (newVal) {
        newVal &&
          findTopCategory(newVal).then(data => {
            this.subCategory = data.children
          })
      },
      immediate: true
    }
  },
  computed: {
    topCategory () {
      let cate = {}
      if (this.$route.params.id) {
        const category = this.$store.state.category.list.find(item => {
          return item.id === this.$route.params.id
        })
        if (category) cate = category
      }
      return cate
    }
  },
  async created () {
    const { result } = await findBanner()
    this.sliders = result
  },
  components: {
    GoodsItem
  }
}
</script>

<style scoped lang="less">
// 面包屑导航动画
.pop {
  &-leave {
    &-from {
      opacity: 1;
      transform: none;
    }
    &-active {
      transition: all 0.5s;
    }
    &-to {
      opacity: 0;
      transform: translateX(20px);
    }
  }
  &-enter {
    &-from {
      opacity: 0;
      transform: translateX(20px);
    }
    &-active {
      transition: all 0.5s;
    }
    &-to {
      opacity: 1;
      transform: none;
    }
  }
}
.top-category {
  h3 {
    font-size: 28px;
    color: #666;
    font-weight: normal;
    text-align: center;
    line-height: 100px;
  }
  .sub-list {
    margin-top: 20px;
    background-color: #fff;
    ul {
      display: flex;
      padding: 0 32px;
      flex-wrap: wrap;
      li {
        width: 168px;
        height: 160px;
        a {
          text-align: center;
          display: block;
          font-size: 16px;
          img {
            width: 100px;
            height: 100px;
          }
          p {
            line-height: 40px;
          }
          &:hover {
            color: @xtxColor;
          }
        }
      }
    }
  }
}
.ref-goods {
  background-color: #fff;
  margin-top: 20px;
  position: relative;
  .head {
    .xtx-more {
      position: absolute;
      top: 20px;
      right: 20px;
    }
    .tag {
      text-align: center;
      color: #999;
      font-size: 20px;
      position: relative;
      top: -20px;
    }
  }
  .body {
    display: flex;
    justify-content: space-around;
    padding: 0 40px 30px;
  }
}
</style>
