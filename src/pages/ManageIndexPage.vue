<template>
  <el-container>
    <el-aside>
      <el-menu
        :style="{height:bodyHeight+ 'px'}"
        default-active="2"
        class="el-menu-vertical-demo"
        background-color="#545c64"
        text-color="#fff"
        active-text-color="#ffd04b"
        :collapse="false"
        @open="handleOpen"
        @select="handleSelect"
        @close="handleClose">
        <el-menu-item index="/home">
          <template slot="title">
            <i class="el-icon-location"></i>
            <span slot="title">首页</span>
          </template>
        </el-menu-item>
        <el-submenu index="2">
          <template slot="title">
            <i class="el-icon-menu"></i>
            <span slot="title">商品</span>
          </template>
          <el-menu-item index="/product">商品管理</el-menu-item>
          <el-menu-item index="2-2">品类管理</el-menu-item>
        </el-submenu>
        <el-submenu index="3" >
          <template slot="title">
            <i class="el-icon-document"></i>
            <span slot="title">订单</span>
          </template>
          <el-menu-item index="/order">订单管理</el-menu-item>
        </el-submenu>
        <el-submenu index="4" >
          <template slot="title">
            <i class="el-icon-document"></i>
            <span slot="title">用户</span>
          </template>
          <el-menu-item index="/user">用户列表</el-menu-item>
        </el-submenu>
      </el-menu>
    </el-aside>
    <el-main>
      <router-view></router-view>
    </el-main>
  </el-container>
</template>

<script>
import {mapActions} from 'vuex'
export default {
  name: 'ManageIndexPage',
  data () {
    return {
      bodyHeight: 800
    }
  },
  mounted () {
    this.getCategoryList()
    window.onresize(() => {
      this.bodyHeight = document.body.offsetHeight
      console.log('height', document.body.offsetHeight)
    })
  },
  methods: {
    ...mapActions('categoryAPI', ['getCategoryList']),
    handleOpen (key, keyPath) {
      console.log(key, keyPath)
    },
    handleClose (key, keyPath) {
      console.log(key, keyPath)
    },
    handleSelect (key, keyPath) {
      console.log('handleSelect', key)
      console.log('handleSelect', keyPath)
      this.$router.push('/manager' + key)
    }
  }
}
</script>

<style scoped>

</style>
