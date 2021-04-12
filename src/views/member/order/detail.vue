<template>
  <div class="member-order-detail" v-if="order">
    <!-- 详情头部 -->
    <DetailAction :order="order" />
    <!-- 步骤条 -->
    <DetailSteps :order="order"  />
    <!-- 物流区块 -->
    <Suspense v-if="[3,4,5].includes(order.orderState)">
      <!-- 组件加载完毕 -->
      <template #default>
        <DetailLogistics :order="order" />
      </template>
      <!-- 组件加载中显示 -->
      <template #fallback>
        <div class="loading">loading</div>
      </template>
    </Suspense>
    <!-- 订单信息 -->
    <DetailInfo :order="order" />
  </div>
</template>
<script>
import DetailAction from './components/detail-action'
import DetailSteps from './components/detail-steps'
import DetailLogistics from './components/detail-logistics'
import DetailInfo from './components/detail-info'
import { useRoute } from 'vue-router'
import { ref } from 'vue'
import { findOrderDetail } from '@/api/order'
export default {
  name: 'MemberOrderDetail',
  components: {
    DetailAction,
    DetailSteps,
    DetailLogistics,
    DetailInfo
  },
  setup () {
    const route = useRoute()
    const order = ref(null)
    findOrderDetail(route.params.id).then(data => {
      order.value = data.result
    })

    return { order }
  }
}
</script>
<style scoped lang="less">
.member-order-detail {
  background: #fff;
  min-height: 1080px;
}
.loading {
  height: 50px;
  line-height: 50px;
  padding: 0 30px;
  background-color: #f5f5f5;
  margin: 30px 50px 0;
}
</style>
