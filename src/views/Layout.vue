<template>
    <AppTopnav />
    <AppHeader />
    <main class='app-body'>
      <router-view />
    </main>
    <AppFooter />
</template>

<script>
import AppTopnav from '@/components/app-topnav'
import AppHeader from '@/components/app-header'
import AppFooter from '@/components/app-footer'
export default {
  name: 'Layout',
  components: { AppTopnav, AppHeader, AppFooter }
}
</script>

<style scoped  lang='less'>
.app-body{
  min-height: 600px;
}
</style>
