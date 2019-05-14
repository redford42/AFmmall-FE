<template>
  <div class="main">
    <div class="main-top">
      <main-nav></main-nav>
      <main-carousel></main-carousel>
      <main-recommend></main-recommend>
      <div class="main-page">
          <goods></goods>
      </div>
    </div>
  </div>
</template>

<script>
import MainNav from '../components/MainNav'
import MainCarousel from '../components/MainCarousel'
import MainRecommend from '../components/MainRecommend'
import Goods from './Goods'
export default {
  name: 'MainPage',
  components: {MainNav, MainCarousel, MainRecommend, Goods}
}
</script>

<style lang="scss">
  .main{
    .main-top{
      width: 1226px;
      margin: 0 auto;
      background: #fff;
      position: relative;
    }
    .main-page{
      background: #f5f5f5;
      margin: 0 auto;
    }
  }
</style>
