<template>
  <div class="container">
    <li>
      <ul v-for="(cart,index) of currentCartList" :key="index">{{cart.productName}} | {{cart.quantity}}</ul>
    </li>
  </div>
</template>

<script>
import {mapState} from 'vuex'
export default {
  name: 'UserCart',
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
  }
}
</script>

<style scoped>
.container{
  width: 500px;
  height: 300px;
}
</style>
