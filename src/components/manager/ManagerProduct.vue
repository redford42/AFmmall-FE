<template>
  <div>
    <el-table
      :data="tableData"
      stripe
      style="width: 100%">
      <el-table-column
        prop="categoryId"
        label="类别"
        width="180">
      </el-table-column>
      <el-table-column
        prop="name"
        label="姓名">
      </el-table-column>
      <el-table-column
        prop="subtitle"
        label="副标题">
      </el-table-column>
      <el-table-column
        prop="price"
        label="价格">
      </el-table-column>
      <el-table-column
      prop="status"
      label="状态">
    </el-table-column>
      <el-table-column
        prop="mainImage"
        label="图片">
      </el-table-column>
      <el-table-column
        label="操作"
      >
        <template slot-scope="scope">
          <el-button @click.native="getCurProductDetail(scope.row.id)">修改</el-button>
          <el-button>删除</el-button>
        </template>
      </el-table-column>
    </el-table>
    <manager-product-detail ref="$productDetail" :product="productDetail"></manager-product-detail>
  </div>
</template>

<script>
import {mapActions} from 'vuex'
import ManagerProductDetail from './ManagerProductDetail'
export default {
  name: 'managerProduct',
  components: {ManagerProductDetail},
  data () {
    return {
      tableData: [{
        date: '2016-05-02',
        name: '王小虎',
        address: '上海市普陀区金沙江路 1518 弄'
      }, {
        date: '2016-05-04',
        name: '王小虎',
        address: '上海市普陀区金沙江路 1517 弄'
      }, {
        date: '2016-05-01',
        name: '王小虎',
        address: '上海市普陀区金沙江路 1519 弄'
      }, {
        date: '2016-05-03',
        name: '王小虎',
        address: '上海市普陀区金沙江路 1516 弄'
      }],
      productDetail: null
    }
  },
  async mounted () {
    let {data} = await this.getManagerProductList()
    this.tableData = data.list
    console.log('看看这个神奇的data', data)
  },
  methods: {
    ...mapActions('productAPI', [
      'getManagerProductList', 'getManagerProductDetail'
    ]),
    getCurProductDetail (productId) {
      console.log(productId)
      this.getManagerProductDetail(productId).then(data => {
        console.log(data)
        this.productDetail = data
        this.$refs.$productDetail.showProduct(data)
      })
    }
  }
}
</script>

<style scoped>

</style>
