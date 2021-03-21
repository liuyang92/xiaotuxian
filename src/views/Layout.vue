<template>
    <nav>顶部通栏</nav>
    <header>头部</header>
    <main>
      <router-view />
    </main>
    <footer>底部</footer>
</template>

<script>
export default {
  name: 'Layout'
}
</script>

<style scoped  lang='less'></style>
