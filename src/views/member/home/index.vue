<template>
  <div class="member-home">
      <MemberHomeOverview />
      <MemberHomePanel title="收藏的商品" />
      <MemberHomePanel title="我的足迹" />
      <GoodsRelevant />
  </div>
</template>
<script>
import MemberHomeOverview from './components/home-overview'
import MemberHomePanel from './components/home-panel'
import GoodsRelevant from '@/views/goods/components/goods-relevant'
export default {
  name: 'MemberHome',
  components: { MemberHomeOverview, MemberHomePanel, GoodsRelevant }
}
</script>
<style scoped lang="less">
.member-home {

}
</style>
