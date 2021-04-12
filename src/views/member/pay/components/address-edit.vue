<template>
  <XtxDialog :title="`${form.id?'修改':'添加'}收货地址`" v-model="dialogVisible">
    <div class="address-edit">
      <div class="xtx-form">
        <div class="xtx-form-item">
          <div class="label">收货人：</div>
          <div class="field">
            <input v-model="form.receiver" class="input" placeholder="请输入收货人" />
          </div>
        </div>
        <div class="xtx-form-item">
          <div class="label">手机号：</div>
          <div class="field">
            <input v-model="form.contact" class="input" placeholder="请输入手机号" />
          </div>
        </div>
        <div class="xtx-form-item">
          <div class="label">地区：</div>
          <div class="field">
            <XtxCity :fullLocation="form.fullLocation" @change="changeCity" placeholder="请选择所在地区"/>
          </div>
        </div>
        <div class="xtx-form-item">
          <div class="label">详细地址：</div>
          <div class="field">
            <input v-model="form.address" class="input" placeholder="请输入详细地址" />
          </div>
        </div>
        <div class="xtx-form-item">
          <div class="label">邮政编码：</div>
          <div class="field">
            <input v-model="form.postalCode" class="input" placeholder="请输入邮政编码" />
          </div>
        </div>
        <div class="xtx-form-item">
          <div class="label">地址标签：</div>
          <div class="field">
            <input v-model="form.addressTags" class="input" placeholder="请输入地址标签，逗号分隔" />
          </div>
        </div>
      </div>
    </div>
    <template #footer>
      <XtxButton @click="dialogVisible=false" type="gray" style="margin-right:20px">取消</XtxButton>
      <XtxButton @click="submit()" type="primary">确认</XtxButton>
    </template>
  </XtxDialog>
</template>
<script>
import { reactive, ref } from 'vue'
import { insertAddress, updateAddress } from '@/api/order'
import Message from '@/components/library/Message'
export default {
  name: 'AddressEdit',
  setup (props, { emit }) {
    const dialogVisible = ref(false)
    // 打开对话框函数
    const open = (address) => {
      // 先填充数据 - 编辑
      if (address.id) {
        for (const key in form) {
          form[key] = address[key]
        }
      } else {
        // 先清空数据 - 添加
        for (const key in form) {
          if (key !== 'isDefault') {
            form[key] = ''
          }
        }
      }
      dialogVisible.value = true
    }
    // 收集表单数据
    const form = reactive({
      id: '',
      receiver: '',
      contact: '',
      provinceCode: '',
      cityCode: '',
      countyCode: '',
      address: '',
      postalCode: '',
      addressTags: '',
      isDefault: 1,
      fullLocation: ''
    })
    const changeCity = (data) => {
      form.provinceCode = data.provinceCode
      form.cityCode = data.cityCode
      form.countyCode = data.countyCode
      // 给将来给地址列表插入数据使用
      form.fullLocation = data.fullLocation
    }
    const submit = () => {
      if (form.id) {
        updateAddress(form).then(data => {
          // 修改成功
          dialogVisible.value = false
          Message({ type: 'success', text: '修改地址成功' })
          emit('on-complete', form)
        })
      } else {
        insertAddress(form).then(data => {
          // 添加成功
          dialogVisible.value = false
          Message({ type: 'success', text: '添加地址成功' })
          // 提交数据给父组件，追加到地址列表中
          form.id = data.result.id
          emit('on-complete', form)
        })
      }
    }
    return { dialogVisible, open, form, changeCity, submit }
  }
}
</script>
<style scoped lang="less">
.xtx-dialog {
  ::v-deep .wrapper{
    width: 780px;
    .body {
      font-size: 14px;
    }
  }
}
.xtx-form {
  padding: 0;
  input {
    outline: none;
    &::placeholder {
      color: #ccc;
    }
  }
}
.xtx-city {
  width: 320px;
  ::v-deep .select {
    height: 50px;
    line-height: 48px;
    display: flex;
    padding: 0 10px;
    justify-content: space-between;
    .placeholder {
      color: #ccc;
    }
    i {
      color: #ccc;
      font-size: 18px;
    }
    .value {
      font-size: 14px;
    }
  }
  ::v-deep .option {
    top: 49px;
  }
}
</style>
