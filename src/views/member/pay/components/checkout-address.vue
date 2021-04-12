<template>
  <div class="checkout-address">
    <div class="text">
      <div v-if="!showAddress" class="none">您需要先添加收货地址才可提交订单。</div>
      <ul v-if="showAddress">
        <li><span>收<i/>货<i/>人：</span>{{showAddress.receiver}}</li>
        <li><span>联系方式：</span>{{showAddress.contact.replace(/^(\d{3})\d{4}(\d{4})$/,'$1****$2')}}</li>
        <li><span>收货地址：</span>{{showAddress.fullLocation.replace(/ /g,'')+showAddress.address}}</li>
      </ul>
      <a @click="openAddressEdit(showAddress)" v-if="showAddress" href="javascript:;">修改地址</a>
    </div>
    <div class="action">
      <XtxButton @click="openDailog()" class="btn">切换地址</XtxButton>
      <XtxButton @click="openAddressEdit({})" class="btn">添加地址</XtxButton>
    </div>
    <!-- 切换收货地址 -->
    <XtxDialog title="切换收货地址" v-model="visibleDialog">
      <div @click="selectedAddress=item" :class="{active:selectedAddress?.id===item.id}" class="text item" v-for="item in list" :key="item.id">
        <ul>
          <li><span>收<i/>货<i/>人：</span>{{item.receiver}}</li>
          <li><span>联系方式：</span>{{item.contact}}</li>
          <li><span>收货地址：</span>{{item.fullLocation+item.address}}</li>
        </ul>
      </div>
      <template #footer>
        <XtxButton @click="visibleDialog=false" type="gray" style="margin-right:20px">取消</XtxButton>
        <XtxButton @click="submitAddres()" type="primary">确认</XtxButton>
      </template>
    </XtxDialog>
    <!-- 添加和修改收货地址 -->
    <AddressEdit @on-complete="completeAction" ref="addressEditInstance" />
  </div>
</template>
<script>
import { ref } from 'vue'
import AddressEdit from './address-edit'
export default {
  name: 'CheckoutAddress',
  components: { AddressEdit },
  props: {
    list: {
      type: Array,
      default: () => []
    }
  },
  setup (props, { emit }) {
    // 当组件初始化后的是，准备一个显示的收货地址
    const showAddress = ref(null)
    // 如果有默认的就是默认的，其次是选中第一个收货地址，如果没有收货地址提示即可。
    if (props.list.length > 0) {
      const defaultAddress = props.list.find(item => item.isDefault === 0)
      if (defaultAddress) {
        showAddress.value = defaultAddress
      } else {
        showAddress.value = props.list.slice(0, 1)
      }
    }
    // 控制对话框显示隐藏
    const visibleDialog = ref(false)

    // 切换收货地址
    // 1. 组件初始化的时候，给一个默认的收货地址ID给checkout组件
    // 2. 在对话框中渲染地址列表
    // 3. 实现选中效果，选中的时候同时需要传递收货地址ID给checkout组件
    emit('change', showAddress.value?.id)
    const selectedAddress = ref(null)
    const submitAddres = () => {
      if (selectedAddress.value) {
        showAddress.value = selectedAddress.value
        visibleDialog.value = false
        emit('change', selectedAddress.value.id)
      }
    }
    const openDailog = () => {
      selectedAddress.value = null
      visibleDialog.value = true
    }

    // 添加和编辑
    const addressEditInstance = ref(null)
    const openAddressEdit = (addres) => {
      addressEditInstance.value.open(addres)
    }
    const completeAction = (address) => {
      // 根据传出的id去现有的列表中查找，有就是修改，无就是添加
      const sameAddress = props.list.find(item => item.id === address.id)
      if (sameAddress) {
        for (const key in sameAddress) {
          sameAddress[key] = address[key]
        }
      } else {
        // 克隆form表单数据(form和数组对象相同引用地址，数据改变会一并改变)
        const json = JSON.stringify(address)
        // eslint-disable-next-line vue/no-mutating-props
        props.list.unshift(JSON.parse(json))
      }
    }

    return {
      showAddress,
      visibleDialog,
      selectedAddress,
      submitAddres,
      openDailog,
      openAddressEdit,
      addressEditInstance,
      completeAction
    }
  }
}
</script>
<style scoped lang="less">
.checkout-address {
  border: 1px solid #f5f5f5;
  display: flex;
  align-items: center;
  .text {
    &.item {
      border: 1px solid #f5f5f5;
      margin-bottom: 10px;
      cursor: pointer;
      &.active,&:hover {
        border-color: @xtxColor;
        background: lighten(@xtxColor,50%);
      }
      > ul {
        padding: 10px;
        font-size: 14px;
      }
    }
    flex: 1;
    min-height: 90px;
    display: flex;
    align-items: center;
    .none {
      line-height: 90px;
      color: #999;
      text-align: center;
      width: 100%;
    }
    > ul {
      flex: 1;
      padding: 20px;
      li {
        line-height: 30px;
        span {
          color: #999;
          margin-right: 5px;
          > i {
            width: 0.5em;
            display: inline-block;
          }
        }
      }
    }
    > a {
      color: @xtxColor;
      width: 160px;
      text-align: center;
      height: 90px;
      line-height: 90px;
      border-right: 1px solid #f5f5f5;
    }
  }
  .action {
    width: 420px;
    text-align: center;
    .btn {
      width: 140px;
      height: 46px;
      line-height: 44px;
      font-size: 14px;
      &:first-child {
        margin-right: 10px;
      }
    }
  }
}
</style>
