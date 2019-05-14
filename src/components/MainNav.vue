<template>
  <div class="main-nav">
    <div class="nav-first" @mouseenter="isNavEnter = true" @mouseleave="isNavEnter = false">
      <ul>
        <li v-for="(item,index) in navFirst" :key="index"
            :class="{active: item.type === selected}"
            @mouseenter="selected = item.type">
          <p>
            <span>{{item.name}}</span>
            <span class="icon"></span>
          </p>
        </li>
      </ul>
    </div>
    <div class="nav-sec" v-show="isNavEnter || isMenuEnter"
         @mouseenter="isMenuEnter = true" @mouseleave="isMenuEnter = false">
      <ul v-for="(item,index) in navFirst" v-show="item.type === selected" :key="index">
        <li v-for="(key,index) in navSec[item.type]"  :key="index">
          <div class="product">
            <a :href="key.link">
              <img :src="key.imgUrl" alt="">
              <p class="title">{{key.title}}</p>
            </a>
          </div>
        </li>
      </ul>
    </div>
  </div>
</template>

<script>

export default {
  data () {
    return {
      selected: '',
      isNavEnter: false,
      isMenuEnter: false,
      navFirst: [
        {name: '日用商品', type: 'daily'},
        {name: '蔬菜 水果', type: 'fruit'},
        {name: '调味品', type: 'relish'},
        {name: '粮食 油', type: 'oil'},
        {name: '办公文具', type: 'office'},
        {name: '酒水 饮料', type: 'wine'},
        {name: '电子设备', type: 'electron'},
        {name: '香烟', type: 'cigarette'},
        {name: '便当', type: 'handy'},
        {name: '关东煮', type: 'oden'}
      ],
      navSec: {
        daily: [
          {title: '牙刷', imgUrl: './static/img/toothbrush.png', link: 'https://www.mi.com/mi6/'},
          {title: '牙膏', imgUrl: './static/img/toothpaste.png', link: 'https://www.mi.com/max2/'},
          {title: '毛巾', imgUrl: './static/img/towel.png', link: 'https://www.mi.com/minote2/'},
          {title: '洗发露', imgUrl: './static/img/shampoo.png', link: 'https://www.mi.com/mi5splus/'},
        ],
        fruit: [
          {title: '苹果', imgUrl: './static/img/apple.png', link: 'https://www.mi.com/mipad3/'},
          {title: '橙子', imgUrl: './static/img/orange.png', link: 'https://www.mi.com/mibookair-12/'},
          {title: '西红柿', imgUrl: './static/img/tomato.png', link: 'https://www.mi.com/mibookair/'}
        ],
        relish: [
          {title: '醋', imgUrl: './static/img/vinegar.jpg', link: 'https://www.mi.com/mitv4/49/'},
          {title: '盐', imgUrl: './static/img/salt.jpg', link: 'https://www.mi.com/mitv4/55/'},
          {title: '沙拉酱', imgUrl: './static/img/saladdress.jpg', link: 'https://www.mi.com/mitv4A/49/'},
          {title: '番茄酱', imgUrl: './static/img/tomatodress.jpg', link: 'https://www.mi.com/mibox3s/'},
          {title: '芥末', imgUrl: './static/img/mustard.jpg', link: 'https://www.mi.com/mibox3c/'}
        ],
        oil: [
          {title: '散装米', imgUrl: './static/img/rice.jpg', link: 'https://www.mi.com/miwifihd/'},
          {title: '面', imgUrl: './static/img/noodles.jpg', link: 'https://www.mi.com/miwifi3g/'},
          {title: '油', imgUrl: './static/img/oil.jpg', link: 'https://www.mi.com/miwifi3/'}
        ],
        office: [
          {title: '本子', imgUrl: './static/img/notebook.png', link: 'https://www.mi.com/dianyuan/'},
          {title: '签字笔', imgUrl: './static/img/pen.jpg', link: 'https://list.mi.com/125'},
          {title: '胶棒', imgUrl: './static/img/glueStick.jpg', link: 'https://list.mi.com/13'},
          {title: '文件袋', imgUrl: './static/img/documentBag.jpg', link: 'https://list.mi.com/dyfj'}
        ],
        wine: [
          {title: '红酒', imgUrl: './static/img/redWine.jpg', link: 'https://www.mi.com/miwifihd/'},
          {title: '白酒', imgUrl: './static/img/whiteWine.jpg', link: 'https://www.mi.com/miwifi3g/'},
          {title: '啤酒', imgUrl: './static/img/beer.jpg', link: 'https://www.mi.com/miwifi3/'}
        ],
        electron: [
          {title: '电池', imgUrl: './static/img/battery.png', link: 'https://list.mi.com/9'},
          {title: '充电线', imgUrl: './static/img/chargingLine.jpg', link: 'https://list.mi.com/8'},
          {title: '充电宝', imgUrl: './static/img/protableBattery.jpg', link: 'https://list.mi.com/8'}
        ],
        cigarette: [
          {title: '红塔山', imgUrl: './static/img/cigarette.jpg', link: 'https://list.mi.com/16'},
          {title: '电子烟', imgUrl: './static/img/electronCigarette.jpg', link: 'https://search.mi.com/search_%E8%87%AA%E6%8B%8D%E6%9D%86'}
        ],
        handy: [
          {title: '沙拉', imgUrl: './static/img/salad.jpg', link: 'https://list.mi.com/23'},
          {title: '三明治', imgUrl: './static/img/sandwich.jpg', link: 'https://search.mi.com/search_%E6%97%85%E8%A1%8C%E7%AE%B1'},
          {title: '套餐', imgUrl: './static/img/bento.jpg', link: 'https://list.mi.com/22'},
        ],
        oden: [
          {title: '虾丸', imgUrl: './static/img/shrimpBall.jpg', link: 'http://mitu.mi.com/'},
          {title: '鱼丸', imgUrl: './static/img/fishBall.jpg', link: 'https://list.mi.com/24'},
          {title: '海带', imgUrl: './static/img/kelp.jpg', link: 'https://www.mi.com/zazhi/index.html?1021'},
          {title: '冬瓜', imgUrl: './static/img/waxGourd.jpg', link: 'https://search.mi.com/search_%E6%9C%80%E7%94%9F%E6%B4%BB'}
        ]
      }
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
