<template>
  <div class="container">
    <div style="height: 250px;width: 500px;overflow-y:scroll;overflow-x: hidden">
      <ul>
        <li v-for="(cart,index) of currentCartList" :key="index">
          <div class="image" style="width: 50px;height: 50px;display: inline-block;">
            <img style="width: 50px; height: 50px; display: inline;"
                 :src="imageUrl(cart)">
          </div>
          <span style="width:150px;text-overflow:ellipsis;overflow: hidden;display: inline-block;margin-bottom: 10px">{{cart.productName}} </span>
          <el-button type="danger" icon="el-icon-delete" circle style="float: right;margin-right: 10px"></el-button>
          <el-input-number v-model="cart.quantity" @change="handleChange(cart)" :min="1" :max="10" label="商品数量" style="float: right;margin-right: 10px">{{cart.quantity}}</el-input-number>
        </li>
      </ul>
    </div>
    <el-button type="danger" style="float: right;position:relative;top: 10px;right: 20px;" @click.native="pay">结算</el-button>
  </div>
</template>

<script>
import {mapState, mapActions} from 'vuex'
import UserPay from './UserPay'
export default {
  name: 'UserCart',
  components: {UserPay},
  props: {
    currentCartList: null
  },
  mounted () {
    console.log('userCart', this.currentCartList)
  },
  data () {
    return {

    }
  },
  computed: {
    ...mapState('cartAPI', [
      'cartList'
    ])
  },
  methods: {
    ...mapActions('cartAPI', [
      'updateCartList'
    ]),
    imageUrl (cart) {
      var imageUrl = 'http://119.23.232.89/' + cart.productMainImage
      return imageUrl
    },
    pay () {
      this.$emit('showUserPay')
    },
    handleChange (cart) {
      console.log('handleChange', cart)
      this.updateCartList({
        productId: cart.productId,
        count: cart.quantity
      }).then(data => {
        console.log('handleChangeDate', data)
      })
    }
  }
}
</script>

<style scoped>
.container{
  width: 500px;
  height: 300px;
}
</style>
