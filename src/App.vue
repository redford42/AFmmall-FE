<template>
  <div id="app">
    <router-view/>
  </div>
</template>

<script>
import {mapState, mapActions} from 'vuex'
export default {
  name: 'App',
  computed: {
    ...mapState('categoryAPI', [
      'categoryList'
    ])
  },
  mounted () {
    // this.getCategoryList().then(async () => {
    //   for (var category in this.categoryList) {
    //     var {data} = await this.getProductList({
    //       categoryId: this.categoryList[category].id,
    //       pageNum: 1,
    //       pageSize: 999
    //     })
    //     this.categoryList[category].products = data.list
    //     console.log(data)
    //   }
    //   console.log('看看我们组装的category', this.categoryList)
    // })
  },
  methods: {
    ...mapActions('productAPI', [
      'getProductList'
    ]),
    ...mapActions('categoryAPI', [
      'getCategoryList'
    ]),
    ...mapActions('shippingAPI', [
      'getShippingList'
    ])
  }
}
</script>

<style>

html, body, div, span, applet, object, iframe,
h1, h2, h3, h4, h5, h6, p, blockquote, pre,
a, abbr, acronym, address, big, cite, code,
del, dfn, em, img, ins, kbd, q, s, samp,
small, strike, strong, sub, sup, tt, var,
b, u, i, center,
dl, dt, dd, ol, ul, li,
fieldset, form, label, legend,
table, caption, tbody, tfoot, thead, tr, th, td,
article, aside, canvas, details, embed,
figure, figcaption, footer, header, hgroup,
menu, nav, output, ruby, section, summary,
time, mark, audio, video {
  margin: 0;
  padding: 0;
  border: 0;
  font-size: 100%;
  font: inherit;
  vertical-align: baseline;
}

/* HTML5 display-role reset for older browsers */
article, aside, details, figcaption, figure,
footer, header, hgroup, menu, nav, section {
  display: block;
}
body {
  line-height: 1;
}
ol, ul {
  list-style: none;
}
blockquote, q {
  quotes: none;
}
blockquote:before, blockquote:after,
q:before, q:after {
  content: '';
  content: none;
}
table {
  border-collapse: collapse;
  border-spacing: 0;
}
a {
  color: inherit;
  text-decoration: none;
}
</style>
