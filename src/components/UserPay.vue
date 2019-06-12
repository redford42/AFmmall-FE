<template>
  <div>
    <el-dialog
      :visible="visible"
      @close="handleClose"
      width="40%"
    >
      <div class="container">
        <ul style="display: block">
          <li v-for="(cart,index) of currentCartList" :key="index" style="width: 500px;margin-left: 20px">
            <div class="image" style="width: 50px;height: 50px;display: inline-block;">
              <img style="width: 50px; height: 50px; display: inline;"
                   :src="imageUrl(cart)">
            </div>
            <span style="width:200px;text-overflow:ellipsis;overflow: hidden;display: inline-block;margin-bottom: 10px">{{cart.productName}} </span>
<!--            <el-input-number v-model="cart.quantity" @change="handleChange" :min="1" :max="10" label="商品数量" style="float: right;">{{cart.quantity}}</el-input-number>-->
                      <p style="float: right;display: inline-block;margin-top:20px;">{{cart.quantity}}个 | {{cart.productTotalPrice}}元</p>
          </li>
        </ul>
      </div>
      <div style="height: 20px;margin-top: 30px">
        <span style="float: left">总价</span>
        <span style="float: right;margin-right: 20px">{{totalPrice}}元</span>
      </div>
      <hr>
      <div>
        <el-radio v-model="checkedShipping" :label="shipping.id" style="display: block" v-for="(shipping,index) in this.shippingList" :key="index">{{shipping.receiverName}} | {{shipping.receiverAddress}} | {{shipping.receiverMobile}}</el-radio>
      </div>
      <hr>
      <div style="height: 20px;margin-top: 30px">
        <span style="float: left">支付方式</span>
        <span style="float: right;margin-right: 20px">支付宝</span>
      </div>
      <div>
        <el-button type="danger" style="margin-left: 515px;margin-top: 30px" @click.native="pay">支付</el-button>
      </div>
    </el-dialog>
    <user-pay-qr ref="showUserPayQr"></user-pay-qr>
  </div>
</template>

<script>
import {mapState, mapActions} from 'vuex'
import UserPayQr from './UserPayQr'
export default {
  name: 'UserPay',
  components: {UserPayQr},
  props: {
    currentCartList: null
  },
  data () {
    return {
      registerForm: {
        username: '',
        password: '',
        email: '',
        phone: '',
        question: '',
        answer: ''
      },
      curOrderNo: null,
      totalPrice: 0,
      visible: false,
      checkedShipping: null
    }
  },
  computed: {
    ...mapState('shippingAPI', ['shippingList'])
  },
  mounted () {
    this.getShippingList()
  },
  methods: {
    ...mapActions('shippingAPI', ['getShippingList']),
    ...mapActions('orderAPI', ['createOrder', 'payOrder', 'queryOrder']),
    show (data) {
      console.log(this.currentCartList)
      this.totalPrice = data.cartTotalPrice
      this.visible = true
    },
    handleClose () {
      this.curOrderNo = null
      this.visible = false
    },
    imageUrl (cart) {
      var imageUrl = 'http://119.23.232.89/' + cart.productMainImage
      return imageUrl
    },
    pay () {
      if (this.curOrderNo !== null) {
        this.queryOrder(this.curOrderNo).then(data => {
          console.log('queryResult', data)
          if (data === 'FAILED') {
            this.createOrder(this.checkedShipping).then(data => {
              console.log(data)
              var orderNo = data.orderNo
              this.payOrder(orderNo).then(dataTwo => {
                this.$refs.showUserPayQr.show(dataTwo.qrUrl)
              })
            })
          } else {
            this.handleClose()
            this.$notify({
              title: '支付轮询通知',
              message: '该订单已支付成功'
            })
          }
        })
      } else {
        this.createOrder(this.checkedShipping).then(data => {
          console.log(data)
          var orderNo = data.orderNo
          this.curOrderNo = data.orderNo
          this.payOrder(orderNo).then(dataTwo => {
            this.$refs.showUserPayQr.show(dataTwo.qrUrl)
          })
        })
      }
      console.log('createOrder', this.checkedShipping)
    }
  }
}
</script>

<style scoped>
  .container{
    width: 595px;
    height: 350px;
    overflow-x: hidden;
    overflow-y: scroll;
    display: flex;
    justify-content: center;
  }
</style>
