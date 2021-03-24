<template>
<!-- 左侧导航栏 -->
  <div class="home-category">
    <ul class="menu">
      <!-- 左侧导航栏一级目录数据 -->
      <li
        v-for="item in menuList"
        :key="item.id"
        @mouseenter="categoryId = item.id"
      >
        <RouterLink :to="`/category/:${item.id}`">{{ item.name }}</RouterLink>
        <!--左侧导航栏二级目录数据,如果有数据则显示,没有则显示骨架  -->
        <template v-if="item.children">
          <RouterLink
            :to="`/category/sub/:${sub.id}`"
            v-for="sub in item.children"
            :key="sub.id"
            >{{ sub.name }}</RouterLink
          >
        </template>
        <!-- 没数据,显示骨架 -->
        <template v-else>
          <xtx-skeleton class="cate" bg="rgba(255,255,255,0.3)" width="40px" height='16px' style="margin-left:3px" />
          <xtx-skeleton class="cate" bg="rgba(255,255,255,0.3)" width="40px" height='16px' style="margin-left:3px" />
        </template>
      </li>
    </ul>
    <!-- 推荐商品弹层 -->
    <!-- 弹层 -->
    <div class="layer">
      <h4 v-if="currCategory">
        {{ currCategory.id === "brand" ? "品牌" : "分类" }}推荐
        <small>根据您的购买或浏览记录推荐</small>
      </h4>
      <ul
        v-if="currCategory && currCategory.goods && currCategory.goods.length"
      >
        <li v-for="item in currCategory.goods" :key="item.id">
          <RouterLink :to="`/category/:${item.id}`">
            <img :src="item.picture" alt="" />
            <div class="info">
              <p class="name ellipsis-2">{{ item.name }}</p>
              <p class="desc ellipsis">{{ item.desc }}</p>
              <p class="price"><i>¥</i>{{ item.price }}</p>
            </div>
          </RouterLink>
        </li>
      </ul>
      <ul
        v-if="currCategory && currCategory.brands && currCategory.brands.length"
      >
        <li class="brand" v-for="item in currCategory.brands" :key="item.id">
          <RouterLink :to="`/category/:${item.id}`">
            <img :src="item.picture" alt="" />
            <div class="info">
              <p class="place">
                <i class="iconfont icon-dingwei"></i>{{ item.place }}
              </p>
              <p class="name ellipsis">{{ item.name }}</p>
              <p class="desc ellipsis-2">{{ item.desc }}</p>
            </div>
          </RouterLink>
        </li>
      </ul>
    </div>
  </div>
</template>

<script>
import { findBrand } from '@/api/home'
import xtxSkeleton from '@/components/library/xtx-skeleton.vue'
export default {
  components: { xtxSkeleton },
  name: 'HomeCategory',
  // 获取vuex里面的一级分类和二级分类的前两个(list)
  // 需要在组件内部,增加一个品牌的数据
  // 根据vuex里面的数据和组建中自定义的品牌数据,得到左侧分类的完整数据
  // 进行渲染
  data () {
    return {
      // 品牌数据
      brand: {
        id: 'brand-100',
        name: '品牌',
        children: [
          {
            id: 'brand-100-001',
            name: '品牌推荐'
          }
        ],
        // 存储品牌列表
        brands: []
      },
      categoryId: null
    }
  },
  async created () {
    const { result } = await findBrand(9)
    this.brand.brands = result
  },
  computed: {
    currCategory () {
      return this.menuList.find(
        item => item.id === this.categoryId
      )
    },
    // 左侧导航栏显示的两条二级分类数据
    menuList () {
      const list = this.$store.state.category.list.map(item => {
        return {
          id: item.id,
          name: item.name,
          children: item.children && item.children.slice(0, 2),
          // 推荐商品
          goods: item.goods
        }
      })
      list.push(this.brand)
      //   console.log(list)
      return list
    }
  }
}
</script>

<style scoped lang="less">
.home-category {
  width: 250px;
  height: 500px;
  background: rgba(0, 0, 0, 0.8);
  position: relative;
  z-index: 80;
  .menu {
    li {
      padding-left: 40px;
      height: 50px;
      line-height: 50px;
      &:hover {
        background: @xtxColor;
      }
      a {
        margin-right: 4px;
        color: #fff;
        &:first-child {
          font-size: 16px;
        }
      }
    }
  }
  .layer {
    width: 990px;
    height: 500px;
    background: rgba(255, 255, 255, 0.8);
    position: absolute;
    left: 250px;
    top: 0;
    display: none;
    z-index: 99;
  }
  &:hover {
    .layer {
      display: block;
    }
  }
}
.layer {
  width: 990px;
  height: 500px;
  background: rgba(255, 255, 255, 0.8);
  position: absolute;
  left: 250px;
  top: 0;
  display: none;
  padding: 0 15px;
  h4 {
    font-size: 20px;
    font-weight: normal;
    line-height: 80px;
    small {
      font-size: 16px;
      color: #666;
    }
  }
  ul {
    display: flex;
    flex-wrap: wrap;
    li {
      width: 310px;
      height: 120px;
      margin-right: 15px;
      margin-bottom: 15px;
      border: 1px solid #eee;
      border-radius: 4px;
      background: #fff;
      &:nth-child(3n) {
        margin-right: 0;
      }
      a {
        display: flex;
        width: 100%;
        height: 100%;
        align-items: center;
        padding: 10px;
        &:hover {
          background: #e3f9f4;
        }
        img {
          width: 95px;
          height: 95px;
        }
        .info {
          padding-left: 10px;
          line-height: 24px;

          .name {
            font-size: 16px;
            color: #666;
          }
          .desc {
            color: #999;
          }
          .price {
            font-size: 22px;
            color: @priceColor;
            i {
              font-size: 16px;
            }
          }
        }
      }
    }
  }
}
// 提供品牌的
li.brand {
  height: 180px;
  a {
    align-items: flex-start;
    img {
      width: 120px;
      height: 160px;
    }
    .info {
      p {
        margin-top: 8px;
      }
      .place {
        color: #999;
      }
    }
  }
}
</style>
<style>
.xtx-skeleton.cate {
  animation: fade 1s linear infinite alternate;
}
@keyframes fade {
  from {
    opacity: 0.2;
  }
  to {
    opacity: 1;
  }
}
</style>
