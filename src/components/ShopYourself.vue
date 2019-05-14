<template>
  <div class="container">
    <p class="title">商品列表</p>
    <el-collapse>
      <el-collapse-item  v-for="(shop,index) in shopList" :key="index" :name="index">
        <template slot="title">
          <span  class="shop">{{shop.title}}</span>
        </template>{{shop.name}}</el-collapse-item>
    </el-collapse>
  </div>
</template>

<script>
export default {
  name: 'ShopYourself',
  data () {
    return {
      shopList: [{
        title: '便当'
      }, {
        title: '咖啡'
      },
      {
        title: '关东煮'
      }]
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
  .shop{
    margin-left: 8px;
  }
</style>
