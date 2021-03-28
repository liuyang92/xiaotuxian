<template>

    <AppTopnav />
    <AppHeaderSticky />
    <AppHeader />
    <main class='app-body'>
      <router-view />
    </main>
    <AppFooter />
</template>

<script>
// 引入导航栏,头部,底部组件
import AppTopnav from '@/components/app-topnav'
import AppHeader from '@/components/app-header'
import AppFooter from '@/components/app-footer'
import AppHeaderSticky from '@/components/app-header-sticky'

export default {
  name: 'Layout',
  components: { AppTopnav, AppHeader, AppFooter, AppHeaderSticky },
  created () {
    this.$store.dispatch('category/getCategory')
  }
}
</script>

<style scoped  lang='less'>
.app-body{
  min-height: 600px;
}
</style>
