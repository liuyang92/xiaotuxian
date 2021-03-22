<template>
  <div class="home-category">
    <ul class="menu">
      <li v-for="item in menuList" :key="item.id">
        <RouterLink :to="`/category/:${item.id}`">{{ item.name }}</RouterLink>
        <template v-if="item.children">
          <RouterLink
            :to="`/category/sub/:${sub.id}`"
            v-for="sub in item.children"
            :key="sub.id"
            >{{ sub.name }}</RouterLink
          >
        </template>
      </li>
    </ul>
    <div class="layer"></div>
  </div>
</template>

<script>
export default {
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
        ]
      }
    }
  },
  computed: {
    menuList () {
      const list = this.$store.state.category.list.map(item => {
        return {
          id: item.id,
          name: item.name,
          children: item.children && item.children.slice(0, 2)
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
  background:  rgba(0,0,0,0.8);
  position: relative;
  z-index: 99;
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
    background: rgba(255,255,255,0.8);
    position: absolute;
    left: 250px;
    top: 0;
    display: none;
  }
  &:hover {
    .layer {
      display: block;
    }
  }
}
</style>
