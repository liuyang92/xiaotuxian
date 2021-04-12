<template>
  <div class="member-order-page">
    <!-- tabs组件 -->
    <XtxTabs v-model="activeName" @tab-click="tabClick">
      <XtxTabsPanel
        v-for="item in orderStatus"
        :key="item.name"
        :label="item.label"
        :name="item.name"
        ></XtxTabsPanel
      >
    </XtxTabs>
    <!-- 订单列表 -->
    <div class="order-list">
      <!-- 加载中容器 -->
      <div v-if="loading" class="loading"></div>
      <!-- 暂无数据提示 -->
      <div v-if="!loading&&!orderList.length" class="none">暂无数据</div>
      <!-- 遍历OrderItem组件 -->
      <OrderItem
        v-for="item in orderList"
        :key="item.id"
        :order="item"
        @on-cancel-order="onCancelOrder(item)"
        @on-delete-order="onDeleteOrder(item)"
        @on-confirm-order="onConfirmOrder(item)"
        @on-logistics-order="onLogisticsOrder(item)"
      />
    </div>
    <!-- 分页组件 -->
    <XtxPagination
      v-if="total>0"
      :total="total"
      :current-page="requestParams.page"
      :page-size="requestParams.pageSize"
      @current-change="changePager"
    />
    <!-- 对于像：对话框，消息提示，确认提示，通知组件 适合使用传送门 Teleport -->
    <!-- 取消订单组件 -->
    <Teleport to="#dailog">
      <OrderCancel ref="orderCancelCom" />
    </Teleport>
    <!-- 查看物流组件 -->
    <Teleport to="#dailog">
      <OrderLogistics ref="logisticsOrderCom" />
    </Teleport>
  </div>
</template>
<script>
import { reactive, ref, watch } from 'vue'
import { orderStatus } from '@/api/constants'
import { confirmOrder, delteOrder, findOrderList } from '@/api/order'
import OrderItem from './components/order-item'
import OrderCancel from './components/order-cancel'
import OrderLogistics from './components/order-logistics'
import Confirm from '@/components/library/Confirm'
import Message from '@/components/library/Message'
export default {
  name: 'MemberOrderPage',
  components: {
    OrderItem,
    OrderCancel,
    OrderLogistics
  },
  setup () {
    const activeName = ref('all')
    const tabClick = (tab) => {
      // 此时：tab.index 就是订单的状态
      requestParams.orderState = tab.index
      requestParams.page = 1
    }
    // 筛选条件
    const requestParams = reactive({
      page: 1,
      pageSize: 5,
      orderState: 0
    })
    // 发请求获取数据
    const orderList = ref([])
    const loading = ref(false)
    const total = ref(0)
    // 使用侦听器，监听 requestParams 的改变
    const findOrderListFn = () => {
      loading.value = true
      findOrderList(requestParams).then(data => {
        orderList.value = data.result.items
        total.value = data.result.counts
        loading.value = false
      })
    }
    watch(requestParams, () => {
      findOrderListFn()
    }, { immediate: true })

    // 分页事件
    const changePager = (np) => {
      requestParams.page = np
    }

    // 删除订单
    const onDeleteOrder = (item) => {
      Confirm({ text: '您确认删除该条订单吗？' }).then(() => {
        delteOrder([item.id]).then(() => {
          Message({ text: '删除订单成功', type: 'success' })
          findOrderListFn()
        })
      }).catch(e => {})
    }

    return {
      activeName,
      orderStatus,
      tabClick,
      requestParams,
      orderList,
      loading,
      total,
      changePager,
      onDeleteOrder,
      ...useCancelOrder(),
      ...useConfirmOrder(),
      ...useLogisticsOrder()
    }
  }
}
// 封装逻辑-取消订单
export const useCancelOrder = () => {
  const orderCancelCom = ref(null)
  const onCancelOrder = (item) => {
    // item 就是你要取消的订单
    orderCancelCom.value.open(item)
  }
  return { onCancelOrder, orderCancelCom }
}
// 封装逻辑-确认收货
export const useConfirmOrder = () => {
  const onConfirmOrder = (item) => {
    // item 就是你要确认收货的订单
    Confirm({ text: '您确认收到货吗？确认后货款将会打给卖家。' }).then(() => {
      confirmOrder(item.id).then(() => {
        Message({ text: '确认收货成功', type: 'success' })
        // 确认收货后状态变成 待评价
        item.orderState = 4
      })
    })
  }
  return { onConfirmOrder }
}
// 封装逻辑-查看物流
export const useLogisticsOrder = () => {
  const logisticsOrderCom = ref(null)
  const onLogisticsOrder = (item) => {
    logisticsOrderCom.value.open(item)
  }
  return { onLogisticsOrder, logisticsOrderCom }
}
</script>
<style scoped lang="less">
.member-order-page {
  min-height: 1080px;
  background: #fff;
}
.order-list {
  background: #fff;
  padding: 20px;
  position: relative;
}
.loading {
  height: 100%;
  min-height: 400px;
  width: 100%;
  position: absolute;
  left: 0;
  top: 0;
  background: rgba(255,255,255,.9) url(../../../assets/images/loading.gif) no-repeat center;
}
.none {
  height: 400px;
  text-align: center;
  line-height: 400px;
  color: #999;
}
</style>
