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
          <li @click="register">注册</li>
          <li class="nav-pile">|</li>
          <li>关于</li>
        </ul>
        <ul class="nav-list" v-else>
          <li >
            <el-dropdown>
              <span style="color: #ffffff;">{{userName}}</span>
              <el-dropdown-menu slot="dropdown">
                <el-dropdown-item @click.native="setUserInfo">修改信息</el-dropdown-item>
                <el-dropdown-item @click.native="setUserPass">修改密码</el-dropdown-item>
                <el-dropdown-item  @click.native="showUserShipping">收货地址</el-dropdown-item>
                <el-dropdown-item @click.native="userLogout">登出</el-dropdown-item>
              </el-dropdown-menu>
            </el-dropdown>
          </li>
          <li class="nav-pile">|</li>
          <li @click="showUserOrder">我的订单</li>
          <li class="nav-pile">|</li>
          <li>
            <el-dropdown>
              <i class="el-icon-goods" @click="getCartList" style="color: #ffffff;"></i>
              <el-dropdown-menu slot="dropdown">
                <user-cart v-if="cartList" :current-cart-list="cartList.cartProductVoList" v-on:showUserPay="showUserPay"></user-cart>
              </el-dropdown-menu>
            </el-dropdown>
          </li>
        </ul>
      </div>
    </div>
    <login ref="userLogin"></login>
    <user-menu ref="userMenu"></user-menu>
    <user-pass ref="userPass"></user-pass>
    <user-register ref="userRegister"></user-register>
    <user-pay ref="userPay"  v-if="cartList" :current-cart-list="cartList.cartProductVoList"></user-pay>
    <user-order ref="userOrder"></user-order>
    <user-shipping ref="userShipping"></user-shipping>
  </div>
</template>

<script>
import Login from '../components/Login'
import {mapState, mapActions} from 'vuex'
import UserCart from './UserCart'
import UserMenu from './UserMenu'
import UserRegister from './UserRegister'
import UserPay from './UserPay'
import UserOrder from './UserOrder'
import UserShipping from './UserShipping'
import UserPass from './UserPass'
export default {
  components: {
    UserShipping,
    UserOrder,
    UserRegister,
    Login,
    UserMenu,
    UserCart,
    UserPay,
    UserPass
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
  mounted () {
  },
  methods: {
    ...mapActions('cartAPI', [
      'getCartList'
    ]),
    ...mapActions('userAPI', [
      'userLogout',
      'getUserInfo'
    ]),
    ...mapActions('orderAPI', [
      'listOrder'
    ]),
    ...mapActions('shippingAPI', [
      'getShippingList'
    ]),
    cartEnter: function () {
      this.cartStatus = true
    },
    cartOut: function () {
      this.cartStatus = false
    },
    login () {
      this.$refs.userLogin.show()
    },
    register () {
      this.$refs.userRegister.show(null)
    },
    setUserInfo () {
      this.getUserInfo().then(data => {
        this.userInfos = data
        console.log('setUserInfo', data)
        this.$refs.userMenu.show(data)
      })
    },
    setUserPass () {
      this.$refs.userPass.show()
    },
    showUserPay () {
      this.getCartList().then(data => {
        console.log(data)
        this.getShippingList().then(dataT => {
          this.$refs.userPay.show(data)
        })
      })
    },
    showUserOrder () {
      this.listOrder({
        pageNum: 1,
        pageSize: 5
      }).then(data => {
        console.log(data)
        this.$refs.userOrder.show(data.list)
      })
    },
    showUserShipping () {
      this.getShippingList().then(data => {
        this.$refs.userShipping.show(data)
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
