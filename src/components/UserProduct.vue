<template>
<div>
  <el-dialog
    :visible="visible"
    @close="handleClose"
    width="40%">
    <div class="test">
      <div class="product" v-for="(product, index) in productList" :key="index">
        <p class="product-name">{{product.name}}</p>
        <div class="img"></div>
        <button @click="addProductToCart(product)" class="buying-button">加入购物车</button>
      </div>
    </div>
  </el-dialog>
</div>
</template>

<script>
import {mapState, mapActions} from 'vuex'
export default {
  name: 'UserProduct',
  props: {
    productList: null
  },
  data () {
    return {
      visible: false
    }
  },
  computed: {
    ...mapState('userAPI', [
      'userName'
    ])
  },
  methods: {
    ...mapActions('cartAPI', [
      'addCartList'
    ]),
    showProduct () {
      this.visible = true
    },
    handleClose () {
      this.visible = false
    },
    addProductToCart (product) {
      if (this.userName !== '') {
        console.log(product)
        this.addCartList({
          productId: product.id,
          count: 1})
      } else {
        console.log('没登陆')
      }
    }
  }
}
</script>

<style scoped>
  .test{
    display: flex;
    justify-content: flex-start;
  }
  .product{
    margin-left: 20px;
    width: 200px;
    height: 300px;
    border: 2px solid darkgrey;
    text-align: center;
    border-radius: 5px;
  }
  .product-name{
    width: 200px;
    overflow: hidden;
    height: 50px;
    text-align: center;
    background-color: white;
  }
  .img{
    width: 190px;
    height: 200px;
    background-color: grey;
    margin: auto;
  }
  .buying-button{
    margin-top: 10px;
  }
</style>
