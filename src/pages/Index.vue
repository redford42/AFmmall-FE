<template>
  <div id="index">
    <top-bar></top-bar>
    <top-header></top-header>
    <main-page></main-page>
    <mi-footer></mi-footer>
  </div>
</template>

<script>
import { mapActions } from 'vuex'
import UserCategory from '../components/UserCategory'
import ShopYourself from '../components/ShopYourself'
import MainNav from '../components/MainNav'
import MainCarousel from '../components/MainCarousel'
import MainPage from '../components/MainPage'
import TopBar from '../components/TopBar'
import TopHeader from '../components/TopHeader'
import MiFooter from '../components/MiFooter'
export default {
  name: 'Index',
  components: {ShopYourself, UserCategory, MainNav, MainCarousel, MainPage, TopBar, TopHeader, MiFooter},
  methods: {
    ...mapActions('categoryAPI', ['getCategoryList']),
    ...mapActions('cartAPI', ['getCartList'])
  },
  mounted () {
    console.log('???')
    this.getCategoryList().then(data => {
      console.log('??', data)
    })
    this.getCartList().then(cart => {
      console.log('?????', cart)
    })
  },
  data () {
    return {
      tableData: [{
        date: '2016-05-02',
        name: '禾几',
        phone: 15928549967,
        address: '上海市普陀区金沙江路 1518 弄'
      }, {
        date: '2016-05-04',
        name: '禾几',
        phone: 15928549967,
        address: '上海市普陀区金沙江路 1517 弄'
      }, {
        date: '2016-05-01',
        name: '王小虎',
        phone: 15928549967,
        address: '上海市普陀区金沙江路 1519 弄'
      }, {
        date: '2016-05-03',
        name: '王小虎',
        address: '上海市普陀区金沙江路 1516 弄'
      }],
      categoryList: {

      }
    }
  }
}
</script>

<!--<style scoped>-->
<!--  .el-carousel{-->
<!--    margin-top: 20px;-->
<!--  }-->
<!--  .el-carousel__item h3 {-->
<!--    color: #475669;-->
<!--    text-align: center;-->
<!--    font-size: 14px;-->
<!--    opacity: 0.75;-->
<!--    line-height: 200px;-->
<!--    margin: 0;-->
<!--  }-->

<!--  .el-carousel__item:nth-child(2n) {-->
<!--    background-color: #99a9bf;-->
<!--  }-->

<!--  .el-carousel__item:nth-child(2n+1) {-->
<!--    background-color: #d3dce6;-->
<!--  }-->
<!--</style>-->
<style lang="scss">
  /*.main{*/
  /*  .main-top{*/
  /*    width: 1226px;*/
  /*    margin: 0 auto;*/
  /*    background: #fff;*/
  /*    position: relative;*/
  /*  }*/
  /*  .main-page{*/
  /*    background: #f5f5f5;*/
  /*    margin: 0 auto;*/
  /*  }*/
  /*}*/
  #index {
    font-family: "Helvetica Neue", Helvetica, Arial, "Microsoft Yahei", "Hiragino Sans GB", "Heiti SC";
  }
</style>
