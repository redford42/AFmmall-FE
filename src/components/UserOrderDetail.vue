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
            <div style="height: 20px;display: block">
              <span style="float: left;">{{cart.productName}} </span>
              <span style="float: right;">{{cart.quantity}}个 | {{cart.currentUnitPrice}}元</span>
            </div>
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
        <el-button type="danger" style="margin-left: 515px;margin-top: 30px" @click.native="payOrder" v-if="wholeData.status === 10">支付</el-button>
      </div>
    </el-dialog>
  </div>
</template>

<script>
export default {
  name: 'UserOrderDetail',
  data () {
    return {
      visible: false,
      currentCartList: null,
      wholeData: null
    }
  },
  methods: {
    show (data) {
      this.wholeData = data
      this.currentCartList = data.orderItemVoList
      this.totalPrice = data.payment
      this.visible = true
    },
    handleClose () {
      this.visible = false
    }
  }
}
</script>

<style scoped>

</style>
