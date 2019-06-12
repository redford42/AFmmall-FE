<template>
<div>
  <el-dialog
    :visible="visible"
    @close="handleClose"
    width="40%">
    <div class="test">
      <div class="img">
        <img :src="product.imageHost +  product.mainImage" style="float: left;width: 200px;height: 200px;">
      </div>
      <div style="display: inline-block;width: 200px;height: 200px;margin-left: 20px" >
        <p class="product-name">商品名称：{{product.name}}</p>
        <p class="product-name">商品价格：{{product.price}}</p>
        <p class="product-name">库存：{{product.stock}}</p>
      </div>
      <div>
        <template>
          <el-input-number v-model="num" controls-position="right" @change="handleChange" :min="1" :max="product.stock" style="width: 170px"></el-input-number>
        </template>
        <el-button @click="addProductToCart(product)" class="buying-button">加入购物车</el-button>
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
    product: null
  },
  data () {
    return {
      visible: false,
      num: 1
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
    show (data) {
      this.product = data
      this.visible = true
    },
    handleClose () {
      this.visible = false
    },
    handleChange (value) {
      console.log(value)
    },
    addProductToCart (data) {
      if (this.userName !== '') {
        this.addCartList({
          productId: data.id,
          count: this.num}).then(data => {
          this.handleClose()
        })
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
    display: inline-block;
    width: 200px;
    height: 200px;
    border: 1px solid grey;
  }
  .buying-button{
    margin-top: 30px;
  }
</style>
