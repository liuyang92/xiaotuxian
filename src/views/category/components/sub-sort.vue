<template>
  <div class="goods-sort">
    <div class="sort">
      <a
        :class="{ active: sortParams.sortField === '' }"
        href="javascript:;"
        @click="changeSort('')"
        >默认排序</a
      >
      <a
        :class="{ active: sortParams.sortField === 'publishTime' }"
        href="javascript:;"
        @click="changeSort('publishTime')"
        >最新商品</a
      >
      <a
        :class="{ active: sortParams.sortField === 'orderNum' }"
        href="javascript:;"
        @click="changeSort('orderNum')"
        >最高人气</a
      >
      <a
        :class="{ active: sortParams.sortField === 'evaluateNum' }"
        href="javascript:;"
        @click="changeSort('evaluateNum')"
        >评论最多</a
      >
      <a href="javascript:;" @click="changeSort('price')">
        价格排序
        <i class="arrow up" :class="{ active:sortParams.sortMethod==='asc'}" />
        <i class="arrow down" :class="{ active:sortParams.sortMethod==='desc'}" />
      </a>
    </div>
    <div class="check">
      <XtxCheckbox v-model="sortParams.inventory"
        >仅显示有货商品</XtxCheckbox
      >
      <XtxCheckbox v-model="sortParams.onlyDiscount"
        >仅显示特惠商品</XtxCheckbox
      >
    </div>
  </div>
</template>
<script>
import { reactive, watch } from 'vue'
export default {
  name: 'SubSort',
  setup (props, { emit }) {
    /**
 *1/根据后台需要的参数定义数据
 2/根据数据对象,绑定组件(复选框,排序按钮)
 3/在操作排序时,需要反馈给数据对象
 */
    const sortParams = reactive({
      sortField: '',
      sortMethod: '',
      inventory: false,
      onlyDiscount: false
    })
    // 改变排序
    const changeSort = (sortField) => {
      if (sortField === 'price') {
        sortParams.sortField = sortField
        if (sortParams.sortMethod === '') {
          sortParams.sortMethod = 'desc'
        } else {
          sortParams.sortMethod = sortParams.sortMethod === 'desc' ? 'asc' : 'desc'
        }
      } else {
        sortParams.sortField = sortField
        sortParams.sortMethod = ''
      }
    }
    watch(() => sortParams, () => {
      emit('change', sortParams)
    }, { deep: true })

    return { sortParams, changeSort }
  }
}
</script>
<style scoped lang="less">
.goods-sort {
  height: 80px;
  display: flex;
  align-items: center;
  justify-content: space-between;
  .sort {
    display: flex;
    a {
      height: 30px;
      line-height: 28px;
      border: 1px solid #e4e4e4;
      padding: 0 20px;
      margin-right: 20px;
      color: #999;
      border-radius: 2px;
      position: relative;
      transition: all 0.3s;
      &.active {
        background: @xtxColor;
        border-color: @xtxColor;
        color: #fff;
      }
      .arrow {
        position: absolute;
        border: 5px solid transparent;
        right: 8px;
        &.up {
          top: 3px;
          border-bottom-color: #bbb;
          &.active {
            border-bottom-color: @xtxColor;
          }
        }
        &.down {
          top: 15px;
          border-top-color: #bbb;
          &.active {
            border-top-color: @xtxColor;
          }
        }
      }
    }
  }
  .check {
    .xtx-checkbox {
      margin-left: 20px;
      color: #999;
    }
  }
}
</style>
