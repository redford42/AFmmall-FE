<template>
    <div>
        <div class="app-header">
          <div class="app-head-inner">
            <img src="../assets/logo.png">
            <div class="head-nav">
              <ul class="nav-list" v-if="userName === ''">
                <li @click="login">登陆</li>
                <li class="nav-pile">|</li>
                <li>注册</li>
                <li class="nav-pile">|</li>
                <li>关于</li>
              </ul>
              <ul class="nav-list" v-else>
                <li >
                  <el-dropdown>
                    <span style="color: #ffffff;">{{userName}}</span>
                    <el-dropdown-menu slot="dropdown">
                      <el-dropdown-item @click.native="setUserInfo">修改信息</el-dropdown-item>
                      <el-dropdown-item>修改密码</el-dropdown-item>
                      <el-dropdown-item @click.native="userLogout">登出</el-dropdown-item>
                    </el-dropdown-menu>
                  </el-dropdown>
                </li>
                <li class="nav-pile">|</li>
                <li>关于</li>
                <li class="nav-pile">|</li>
                <li>
                  <el-dropdown>
                    <i class="el-icon-goods" @click="getCartList"></i>
                    <el-dropdown-menu slot="dropdown">
                      <user-cart v-if="cartList" :current-cart-list="cartList.cartProductVoList"></user-cart>
                    </el-dropdown-menu>
                  </el-dropdown>
                </li>
              </ul>
            </div>
          </div>
        </div>
        <div class="app-content">
          <keep-alive>
            <router-view></router-view>
          </keep-alive>
        </div>
        <div class="app-footer">
          <p>© 2019 Hola便利店</p>
        </div>
      <login ref="userLogin"></login>
      <user-menu ref="userMenu" :user-info="userInfos"></user-menu>
    </div>
</template>

<script>
import Login from './Login'
import {mapState, mapActions} from 'vuex'
import UserCart from './UserCart'
import UserMenu from './UserMenu'
export default {
  data () {
    return {
      msg: 'hello abe',
      currentCartList: null,
      userInfos: null
    }
  },
  computed: {
    ...mapState('userAPI', [
      'userName'
    ]),
    ...mapState('cartAPI', [
      'cartList'
    ])
  },
  components: {
    UserMenu,
    UserCart,
    Login
  },
  methods: {
    ...mapActions('cartAPI', [
      'getCartList'
    ]),
    ...mapActions('userAPI', [
      'userLogout',
      'getUserInfo'
    ]),
    login () {
      this.$refs.userLogin.showLogin()
    },
    setUserInfo () {
      this.getUserInfo().then(data => {
        this.userInfos = data
        this.$refs.userMenu.show()
      })
    }
  }
}
</script>

<style>
  .el-icon-goods{
    color:white;
  }
  .el-dropdown {
    vertical-align: top;
  }
  .el-dropdown + .el-dropdown {
    margin-left: 15px;
  }
  .el-icon-arrow-down {
    font-size: 12px;
  }
  html, body, div, span, applet, object, iframe,
  h1, h2, h3, h4, h5, h6, p, blockquote, pre,
  a, abbr, acronym, address, big, cite, code,
  del, dfn, em, img, ins, kbd, q, s, samp,
  small, strike, strong, sub, sup, tt, var,
  b, u, i, center,
  dl, dt, dd, ol, ul, li,
  fieldset, form, label, legend,
  table, caption, tbody, tfoot, thead, tr, th, td,
  article, aside, canvas, details, embed,
  figure, figcaption, footer, header, hgroup,
  menu, nav, output, ruby, section, summary,
  time, mark, audio, video {
    margin: 0;
    padding: 0;
    border: 0;
    font-size: 100%;
    font: inherit;
    vertical-align: baseline;
  }
  /* HTML5 display-role reset for older browsers */
  article, aside, details, figcaption, figure,
  footer, header, hgroup, menu, nav, section {
    display: block;
  }
  body {
    line-height: 1;
  }
  ol, ul {
    list-style: none;
  }
  blockquote, q {
    quotes: none;
  }
  blockquote:before, blockquote:after,
  q:before, q:after {
    content: '';
    content: none;
  }
  table {
    border-collapse: collapse;
    border-spacing: 0;
  }
  a {
    color: inherit;
    text-decoration: none;
  }
  body {
    background: #f0f2f5;
    font-family: "Helvetica Neue",Helvetica,Arial,"Hiragino Sans GB","Hiragino Sans GB W3","Microsoft YaHei UI","Microsoft YaHei","WenQuanYi Micro Hei",sans-serif;
    font-size: 14px;
    color: #444;
  }
  .app-header {
    background: #363636;
    color: #b2b2b2;
    height: 90px;
    line-height: 90px;
    width: 100%;
  }
  .app-head-inner {
    width: 1200px;
    margin: 0 auto;
  }
  .head-logo {
    float: left;
  }
  .app-head-inner img {
    width: 50px;
    margin-top: 20px;
  }
  .head-nav {
    float: right;
  }
  .head-nav ul {
    overflow: hidden;
  }
  .head-nav li {
    cursor: pointer;
    float: left;
  }
  .nav-pile {
    padding: 0 10px;
  }
  .app-footer {
    text-align: center;
    height: 80px;
    width: 100%;
    line-height: 80px;
    background: #e3e4e8;
    clear: both;
    margin-top: 30px;
  }
  .app-content {
    width: 1200px;
    margin: 0 auto;
  }
  .hr {
    height: 1px;
    width: 100%;
    background: #ddd;
  }
  .button {
    background: #4fc08d;
    color: #fff;
    display: inline-block;
    padding: 10px 20px;
    cursor: pointer;
  }
  .button:hover {
    background: #4fc08d;
  }
  .g-form {

  }
  .g-form-line {
    padding: 15px 0;
  }
  .g-form-label {
    width: 100px;
    font-size: 16px;
    display: inline-block;
  }
  .g-form-input {
    display: inline-block;
  }
  .g-form-input input {
    height: 30px;
    width: 200px;
    line-height: 30px;
    vertical-align: middle;
    padding: 0 10px;
    border: 1px solid #ccc;
  }
  .g-form-btn {
    padding-left: 100px;
  }
  .g-form-error {
    color: red;
    padding-left: 15px;
  }
</style>
