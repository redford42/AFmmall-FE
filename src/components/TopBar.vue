<template>
  <div class="top-container">
    <div class="top-bar">
      <div class="topbar-nav">
        <ul>
          <li class="item" v-for="(item,index) in navItems" :key="index">
            <a href="#">{{item.name}}</a>
          </li>
        </ul>
      </div>
      <div class="topbar-nav">
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
          <li>我的订单</li>
          <li class="nav-pile">|</li>
          <li>
            <el-dropdown>
              <i class="el-icon-goods" @click="getCartList" style="color: #ffffff;"></i>
              <el-dropdown-menu slot="dropdown">
                <user-cart v-if="cartList" :current-cart-list="cartList.cartProductVoList"></user-cart>
              </el-dropdown-menu>
            </el-dropdown>
          </li>
        </ul>
      </div>
    </div>
    <login ref="userLogin"></login>
  </div>
</template>

<script>
import Login from '../components/Login'
import {mapState, mapActions} from 'vuex'
import UserCart from './UserCart'
import UserMenu from './UserMenu'
export default {
  components: {
    Login,
    UserMenu,
    UserCart
  },
  data () {
    return {
      currentCartList: null,
      userInfos: null,
      navItems: [
        {name: '哦啦商城'}
      ],
      cartStatus: false
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
  methods: {
    ...mapActions('cartAPI', [
      'getCartList'
    ]),
    ...mapActions('userAPI', [
      'userLogout',
      'getUserInfo'
    ]),
    cartEnter: function () {
      this.cartStatus = true
    },
    cartOut: function () {
      this.cartStatus = false
    },
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

<style lang="scss" scoped>
.top-container{
  width: 100%;
  background: #333;
  >.top-bar{
    width: 1226px;
    background: #333;
    height: 40px;
    margin: 0 auto;
    display: flex;
    justify-content: space-between;
    align-items: center;
    >.topbar-nav{
      .nav-pile{
        margin-right: 5px;
        margin-left: 5px;
      }
      >ul{
        display: flex;
        flex-direction: row;
        justify-content: space-between;
        align-items: center;
        color: #ffffff;
        >.item{
          padding: 0 .5em;
          border-right: 1px solid #424242;
          &:last-child{
            border: none;
          }
          &:nth-child(1){
            padding-left: 0;
          }
          & a{
            color: #b0b0b0;
            &:hover{
            color: #fff;
            }
          }
        }
      }
    }
    >.topbar-info{
      margin-left: auto;
      >a{
        color: #b0b0b0;
        padding: 0 .5em;
        border-right: 1px solid #424242;
        &:last-child{
        border: none;
        }
        &:hover{
          color: #fff;
        }
      }
    }
    >.topbar-cart{
      position: relative;
      width: 120px;
      line-height: 40px;
      text-align: center;
      background: #424242;
      cursor: pointer;
      display: flex;
      flex-direction: column;
      >.cart{
        a{
          color: #b0b0b0;
          padding: 0 .5em;
          border-right: 1px solid #424242;
          &:last-child{
          border: none;
          }
        }
      }
      >.active{
        a{
          color: #ff6700;
        }
        .icon{
          color: #ff6700;
        }
      }
      >.cart-detail{
        position: absolute;
        overflow: hidden;
        z-index: 3;
        left: 120px;
        transform: translate(-100%,0);
        top: 40px;
        width: 316px;
        line-height: 96px;
        padding: 0 15px;
        color: #424242;
        background: #fff;
        box-shadow: 0 2px 10px rgba(0,0,0,0.15);
      }
    }
  }
}
//购物车动画

.expand-enter-active, .expand-leave-active {
  transition: all .3s ease;
  height: 96px;
  opacity: 1;
}
.expand-enter,.expand-leave-to/* .fade-leave-active in <2.1.8 */ {
  height: 0;
  opacity: 0;
  transition: all .4s ease;
}
</style>
