<template>
  <div class="container">
    <p class="title">商品列表</p>
    <li  class="categoryList" v-for="(category,index) in categoryList" :key="index" :name="index" @click="getProduct(index)">
      <span>{{category.name}}</span><i class="el-icon-arrow-right"></i>
    </li>
    <user-product ref="userProduct" :product-list="currentProductList"></user-product>
  </div>
</template>

<script>
import {mapState, mapActions} from 'vuex'
import UserProduct from './UserProduct'
export default {
  name: 'UserCategory',
  components: {UserProduct},
  data () {
    return {
      currentProductList: null
    }
  },
  computed: {
    ...mapState('categoryAPI', [
      'categoryList'
    ])
  },
  methods: {
    ...mapActions('productAPI', [
      'getProductList'
    ]),
    ...mapActions('categoryAPI', [
      'getCategoryList'
    ]),
    getProduct (index) {
      console.log('getProduct', this.categoryList[index])
      this.getProductList({
        categoryId: this.categoryList[index].id,
        pageNum: 1,
        pageSize: 10
      }).then(data => {
        this.currentProductList = data.data.list
        this.$refs.userProduct.showProduct()
      })
    }
  }
}
</script>

<style scoped>
  .container{
    margin-top: 20px;
    width: 100%;
  }
  .title{
    font-size: 20px;
    margin-bottom: 20px;
    font-weight: 800;
  }
  .category{
    margin-left: 8px;
  }
  .categoryList{
    list-style: none;
    text-align: left;
    width: 100%;
    height: 49px;
    line-height: 49px;
    background-color: white;
    border-bottom: 1px solid #e2d4d3;
  }
  .categoryList span{
    margin-left: 8px;
    margin-top: 15px;
  }
  .el-icon-arrow-right{
    float:right;
    margin-top: 20px;
    margin-right: 10px;
  }
</style>
