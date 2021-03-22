<template>
  <nav class="app-topnav">
    <div class="container">
      <ul>
        <template v-if="profile.token">
          <li><a href="javascript:;"><i class="iconfont icon-user" />迪丽热巴</a></li>
          <li><a href="javascript:;">退出登录</a></li>
        </template>
        <template v-else>
          <li><a href="javascript:;">请先登录</a></li>
          <li><a href="javascript:;">免费注册</a></li>
        </template>
          <li><a href="javascript:;">我的订单</a></li>
          <li><a href="javascript:;">会员中心</a></li>
          <li><a href="javascript:;">帮助中心</a></li>
          <li><a href="javascript:;"><i class="iconfont icon-phone"></i>关于我们</a></li>
      </ul>
    </div>
  </nav>
</template>

<script>
import { mapState } from 'vuex'
export default {
  name: 'AppTopnav',
  computed: {
    //   使用带命名空间的模块,需要两个参数,1.模块名,2.变量名
    ...mapState('user', ['profile'])
  }
}
</script>

<style lang="less" scoped>
.app-topnav {
  background: #333;
  ul {
    display: flex;
    justify-content: flex-end;
    align-items: center;
    height: 53px;
    li {
      a {
        color: #dcdcdc;
        padding: 0 15px;
        line-height: 1;
        font-size: 14px;
        display: inline-block;
        &:hover {
          color: @xtxColor;
        }
        i {
          font-size: 14px;
          margin-right: 2px;
        }
      }
      ~ li {
        a {
          border-left: 2px solid #666;
        }
      }
    }
  }
}
</style>
