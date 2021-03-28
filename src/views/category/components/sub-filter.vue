<template>
  <div class="sub-filter" v-if="filterData && !filterLoading">
    <div class="item">
      <div class="head">品牌：</div>
      <div class="body">
        <a
          @click="filterData.selectedBrand = brand.id"
          :class="{ active: filterData.selectedBrand === brand.id }"
          href="javascript:;"
          v-for="brand in filterData.brands"
          :key="brand.id"
          >{{ brand.name }}</a
        >
      </div>
    </div>
    <div class="item" v-for="p in filterData.saleProperties" :key="p.id">
      <div class="head">{{ p.name }}：</div>
      <div class="body">
        <a
          @click="p.selectedAttr = attr.id"
          :class="{ active: p.selectedAttr === attr.id }"
          href="javascript:;"
          v-for="attr in p.properties"
          :key="attr.id"
          >{{ attr.name }}</a
        >
      </div>
    </div>
  </div>
  <div v-else class="sub-filter">
    <XtxSkeleton class="item" width="800px" height="39px" />
    <XtxSkeleton class="item" width="800px" height="39px" />
    <XtxSkeleton class="item" width="600px" height="39px" />
    <XtxSkeleton class="item" width="600px" height="39px" />
    <XtxSkeleton class="item" width="600px" height="39px" />
  </div>
</template>
<script>
import { useRoute } from 'vue-router'
import { findSubCategoryFilter } from '@/api/category'
import { ref, watch } from 'vue'
export default {
  name: 'SubFilter',
  setup (props, { emit }) {
    const route = useRoute()
    const filterData = ref(null)
    const filterLoading = ref(false)

    // 在分类发生变化时需要重新筛选,需要用到监听器
    // vue3.0 watch有三个参数 1监听的对象 2回调函数  3配置对象
    watch(
      () => route.params.id,
      (newValue, oldValue) => {
        if (route.path === '/category/sub/' + newValue) {
          filterLoading.value = true
          newValue &&
            findSubCategoryFilter(route.params.id).then(({ result }) => {
              //   品牌全部
              result.selectedBrand = undefined
              result.brands.unshift({ id: undefined, name: '全部' })

              // 销售属性全部
              result.saleProperties.forEach(p => {
                p.selectedAttr = undefined
                p.properties.unshift({ id: undefined, name: '全部' })
              })
              filterData.value = result
              filterLoading.value = false
            })
        }
      },

      { immediate: true }
    )
    watch(filterData, () => {
      const filterParams = { attrs: [] }
      filterParams.brandId = filterData.value.selectedBrand
      filterData.value.saleProperties.forEach(p => {
        const attr = p.properties.find(attr => attr.id === p.selectedAttr)
        if (attr && attr.id !== undefined) {
          filterParams.attrs.push({ groupName: p.name, propertyName: attr.name })
        }
      })
      emit('change', filterParams)
    }, { deep: true })
    return { filterData, filterLoading }
  }
}
</script>
<style scoped lang="less">
// 筛选区
.sub-filter {
  background: #fff;
  padding: 25px;
  .item {
    display: flex;
    padding: 10px 0;
    .head {
      width: 80px;
      color: #999;
    }
    .body {
      flex: 1;
      a {
        margin-right: 36px;
        transition: all 0.3s;
        &.active,
        &:hover {
          color: @xtxColor;
        }
      }
    }
  }
}
</style>
