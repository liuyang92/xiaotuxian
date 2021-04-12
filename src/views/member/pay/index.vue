<template>
  <div class="xtx-pay-page">
    <div class="container">
      <XtxBread>
        <XtxBreadItem to="/">首页</XtxBreadItem>
        <XtxBreadItem to="/cart">购物车</XtxBreadItem>
        <XtxBreadItem>支付订单</XtxBreadItem>
      </XtxBread>
      <!-- 付款信息 -->
      <div class="pay-info" v-if="order">
        <span v-if="order.countdown > 0" class="icon iconfont icon-queren2"></span>
        <span v-else class="icon iconfont icon-shanchu red"></span>
        <div class="tip">
          <p>订单提交成功！请尽快完成支付。</p>
          <p v-if="order.countdown > 0">支付还剩 <span>{{countdownText}}</span>, 超时后将取消订单</p>
          <p v-else>订单已超时，请重新下单支付。</p>
        </div>
        <div class="amount">
          <span>应付总额：</span>
          <span>¥{{order.payMoney}}</span>
        </div>
      </div>
      <!-- 付款方式 -->
      <div class="pay-type">
        <p class="head">选择以下支付方式付款</p>
        <div class="item">
          <p>支付平台</p>
          <a class="btn wx" href="javascript:;"></a>
          <a class="btn alipay" @click="visibleDialog=true" :href="alipayUrl" target="_blank"></a>
        </div>
        <div class="item">
          <p>支付方式</p>
          <a class="btn" href="javascript:;">招商银行</a>
          <a class="btn" href="javascript:;">工商银行</a>
          <a class="btn" href="javascript:;">建设银行</a>
          <a class="btn" href="javascript:;">农业银行</a>
          <a class="btn" href="javascript:;">交通银行</a>
        </div>
      </div>
    </div>
    <!-- 等待支付的弹窗 -->
    <XtxDialog title="正在支付..." v-model="visibleDialog">
      <div class="pay-wait">
        <img src="@/assets/images/load.gif" alt="">
        <div v-if="order">
            <p>如果支付成功：</p>
            <RouterLink :to="`/member/order/${order.id}`">查看订单详情></RouterLink>
            <p>如果支付失败：</p>
            <RouterLink to="/">查看相关疑问></RouterLink>
        </div>
      </div>
    </XtxDialog>
  </div>
</template>
<script>
import { computed, ref } from 'vue'
import { findOrderDetail } from '@/api/order'
import { useRoute } from 'vue-router'
import { useIntervalFn } from '@vueuse/core'
import dayjs from 'dayjs'
import { instance as axios } from '@/utils/request'
export default {
  name: 'XtxPayPage',
  setup () {
    const route = useRoute()
    // 获取订单详情数据
    const order = ref(null)
    // 倒计时的文字
    const countdownText = ref('')
    const { resume, pause } = useIntervalFn(() => {
      order.value.countdown--
      // 转换时间设置给countdownText
      countdownText.value = dayjs.unix(order.value.countdown).format('mm分ss秒')
      if (order.value.countdown <= 0) {
        pause()
      }
    }, 1000, false)

    findOrderDetail(route.query.orderId).then(data => {
      order.value = data.result
      // data.result.countdown 倒计时秒数
      // 立即转换，要不然1秒后显示
      countdownText.value = dayjs.unix(order.value.countdown).format('mm分ss秒')
      resume()
    })

    const alipayUrl = computed(() => {
      if (order.value) {
      // 准备支付地址
        const payUrl = axios.defaults.baseURL + 'pay/aliPay'
        // 支付回跳地址()
        const redirectUrl = encodeURIComponent('http://www.corho.com:8080/#/pay/callback')
        return `${payUrl}?orderId=${order.value.id}&redirect=${redirectUrl}`
      } else {
        return 'javascript:;'
      }
    })

    const visibleDialog = ref(false)

    return { order, countdownText, alipayUrl, visibleDialog }
  }
}
</script>
<style scoped lang="less">
.pay-info {
  background: #fff;
  display: flex;
  align-items: center;
  height: 240px;
  padding: 0 80px;
  .icon {
    font-size: 80px;
    color: #1dc779;
    &.red {
      color: @priceColor;
    }
  }
  .tip {
    padding-left: 10px;
    flex: 1;
    p {
      &:first-child {
        font-size: 20px;
        margin-bottom: 5px;
      }
      &:last-child {
        color: #999;
        font-size: 16px;
      }
    }
  }
  .amount {
    span {
      &:first-child {
        font-size: 16px;
        color: #999;
      }
      &:last-child {
        color: @priceColor;
        font-size: 20px;
      }
    }
  }
}
.pay-type {
  margin-top: 20px;
  background-color: #fff;
  padding-bottom: 70px;
  p {
    line-height: 70px;
    height: 70px;
    padding-left: 30px;
    font-size: 16px;
    &.head {
      border-bottom: 1px solid #f5f5f5;
    }
  }
  .btn {
    width: 150px;
    height: 50px;
    border: 1px solid #e4e4e4;
    text-align: center;
    line-height: 48px;
    margin-left: 30px;
    color: #666666;
    display: inline-block;
    &.active,
    &:hover {
      border-color: @xtxColor;
    }
    &.alipay {
      background: url(https://cdn.cnbj1.fds.api.mi-img.com/mi-mall/7b6b02396368c9314528c0bbd85a2e06.png) no-repeat center / contain;
    }
    &.wx {
      background: url(https://cdn.cnbj1.fds.api.mi-img.com/mi-mall/c66f98cff8649bd5ba722c2e8067c6ca.jpg) no-repeat center / contain;
    }
  }
}
.pay-wait {
  display: flex;
  justify-content: space-around;
  p {
    margin-top: 30px;
    font-size: 14px;
  }
  a {
    color: @xtxColor;
  }
}
</style>
