<template>
  <div class="xtx-checkbox" @click="change()">
    <i class="iconfont icon-checked" v-if="checked"></i>
    <i class="iconfont icon-unchecked" v-else></i>
    <span v-if="$slots.default"><slot /></span>
  </div>
</template>

<script>
export default {
  name: 'XtxCheckbox',
  data () {
    return {
      checked: false
    }
  },

  props: {
    modelValue: {
      type: Boolean,
      default: false
    }
  },
  watch: {
    modelValue: {
      handler () {
        this.checked = this.modelValue
      },
      immediate: true
    }
  },
  methods: {
    change () {
      this.checked = !this.checked
      this.$emit('update:modelValue', this.checked)
      this.$emit('change', this.checked)
    }
  }
}
</script>

<style scoped lang="less">
.xtx-checkbox {
  display: inline-block;
  margin-right: 2px;
  .icon-checked {
    color: @xtxColor;
    ~ span {
      color: @xtxColor;
    }
  }
  i {
    position: relative;
    top: 1px;
  }
  span {
    margin-left: 2px;
  }
}
</style>
