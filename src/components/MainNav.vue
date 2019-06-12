<template>
  <div class="main-nav">
    <div class="nav-first" @mouseenter="isNavEnter = true" @mouseleave="isNavEnter = false">
      <ul>
        <li v-for="(item,index) in categoryList" :key="index"
            :class="{active: index === selected}"
            @mouseenter="selected = index">
          <p>
            <span>{{item.name}}</span>
            <span class="icon"></span>
          </p>
        </li>
      </ul>
    </div>
    <div class="nav-sec" v-show="isNavEnter || isMenuEnter"
         @mouseenter="isMenuEnter = true" @mouseleave="isMenuEnter = false">
      <ul v-for="(item,index) in categoryList" v-show="index === selected" :key="index">
        <li v-for="(key,indexTwo) in item.products"  :key="indexTwo">
          <div class="product" @click="showUserProduct(key)">
            <a :href="key.link">
              <img :src="key.imageHost + key.mainImage" alt="">
              <p class="title">{{key.name}}</p>
            </a>
          </div>
        </li>
      </ul>
    </div>
    <user-product ref="userProduct" :product="currentProduct"></user-product>
  </div>
</template>

<script>
import {mapActions, mapState} from 'vuex'
import UserProduct from './UserProduct'
export default {
  components: {UserProduct},
  data () {
    return {
      selected: '',
      isNavEnter: false,
      isMenuEnter: false,
      currentProduct: null
    }
  },
  computed: {
    ...mapState('categoryAPI', [
      'categoryList'
    ])
  },
  mounted () {
    this.getCategoryList().then(async () => {
      for (var category in this.categoryList) {
        var {data} = await this.getProductList({
          categoryId: this.categoryList[category].id,
          pageNum: 1,
          pageSize: 999
        })
        this.categoryList[category].products = data.list
        console.log(data)
      }
      console.log('看看我们组装的category', this.categoryList)
    })
  },
  methods: {
    ...mapActions('productAPI', [
      'getManagerProductList', 'getProductList'
    ]),
    ...mapActions('categoryAPI', [
      'getCategoryList'
    ]),
    showUserProduct (product) {
      console.log('showProduct', product)
      this.currentProduct = product
      this.$refs.userProduct.show(product)
    }
  }
}
</script>

<style lang="scss" scoped>
  .main-nav{
    font-size: 14px;
    width: 1226px;
    background: #fff;
    margin: 0 auto;
    position: relative;
    display: flex;
    justify-content: flex-start;
    >.nav-first{
      width: 235px;
      height: 458px;
      position: relative;
      z-index: 5;
      ul{
        display: flex;
        justify-content: space-between;
        flex-direction: column;
        background: rgba(0,0,0,0.6);
        padding: 20px 0;
        color: #fff;
        li{
          padding-left: 30px;
          height: 42px;
          line-height: 42px;
          cursor: pointer;
          &:hover{
            background: #ff6700;
          }
          >p{
            display: flex;
            justify-content: space-between;
            >.icon{
              margin-right: 20px;
              font-weight: bold;
            }
          }
        }
      }
    }
    .nav-sec{
      height: 458px;
      width: 992px;
      position: absolute;
      top: 0;
      right: 0;
      background: #fff;
      z-index: 5;
      overflow: hidden;
      border: 1px solid #e0e0e0;
      border-left: none;
      box-shadow: 0 8px 16px rgba(0,0,0,0.18);
      ul{
        height: 458px;
        display: flex;
        flex-flow: wrap;
        flex-direction: column;
        align-items: flex-start;
        align-content: flex-start;
        justify-content: flex-start;
        li{
          width: 265px;
          height: 76px;
          .product{
            a{
              display: flex;
              justify-content: flex-start;
              align-items: center;
              transition: color .2s;
              width: 265px;
              padding: 20px 20px;
              &:hover{
                color: #ff6700;
              }
              img{
                width: 40px;
                height: 40px;
                margin-right: 12px;
              }
            }
          }
        }
      }
    }
  }
</style>
