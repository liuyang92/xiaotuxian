<template>
<!-- 全局组件  占位盒子带动画 -->
    <div class="xtx-skeleton" :style="{width,height}" :class="{shan:animated}">
        <!-- 1盒子 -->
        <div class="block" :style="{backgroundColor:bg}"></div>
        <!-- 2闪烁效果 -->
    </div>
</template>

<script>
export default {
  name: 'XtxSkeleton',
  props: {
    bg: {
      type: String,
      default: '#efefef'
    },
    width: {
      type: String,
      default: '100px'
    },
    height: {
      type: String,
      default: '100px'
    },
    animated: {
      type: Boolean,
      default: false
    }
  }
}
</script>

<style lang="less" scoped>
.xtx-skeleton {
  display: inline-block;
  position: relative;
  overflow: hidden;
  vertical-align: middle;
  .block {
    width: 100%;
    height: 100%;
    border-radius: 2px;
  }
}

</style>
