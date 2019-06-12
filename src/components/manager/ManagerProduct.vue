<template>
  <div>
    <div style="display: inline"><el-button type="primary" @click.native="getCurProductDetail()">新增</el-button></div>
    <div style="float: right;width: 30%;margin-bottom: 20px">
      <el-input style="width: 70%;" v-model="searchText"></el-input>
      <el-button @click.native="searchProduct()">搜索</el-button>
    </div>
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
        <template slot-scope="scope">
          {{scope.row.status === 1? '可用':'禁用'}}
        </template>
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
          <el-button @click.native="deleteProduct(scope.row.id)">删除</el-button>
        </template>
      </el-table-column>
    </el-table>
    <el-pagination
      :current-page.sync="pageNum"
      background
      @current-change="changePageNum"
      layout="prev, pager, next"
      :total="1000">
    </el-pagination>
    <manager-product-detail ref="$productDetail" :product="productDetail" @refresh="refreshList"></manager-product-detail>
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
      searchText: '',
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
      productDetail: null,
      pageNum: 1
    }
  },
  async mounted () {
    this.refreshList()
  },
  methods: {
    ...mapActions('productAPI', [
      'getManagerProductList', 'getManagerProductDetail', 'deleteManagerProduct', 'searchManagerProduct'
    ]),
    deleteProduct (productId) {
      this.deleteManagerProduct(productId).then(data => {
        this.refreshList()
      })
    },
    searchProduct () {
      if (this.searchText === '') {
        this.refreshList()
      } else {
        var data = {
          productName: this.searchText,
          pageNum: this.pageNum,
          pageSize: 8
        }
        this.searchManagerProduct(data).then(data => {
          console.log('searchManagerProduct', data.list)
          this.tableData = data.list
        })
      }
    },
    changePageNum () {
      console.log(this.pageNum)
      this.refreshList(this.pageNum)
    },
    async refreshList (currentPage) {
      let {data} = await this.getManagerProductList({pageNum: currentPage || this.pageNum, pageSize: 8})
      this.tableData = data.list
    },
    getCurProductDetail (productId) {
      if (productId === undefined) {
        this.$refs.$productDetail.showProduct({
          id: null,
          name: '',
          categoryId: '',
          status: 1,
          detail: '',
          imageHost: ''
        })
      } else {
        this.getManagerProductDetail(productId).then(data => {
          this.productDetail = data
          this.$refs.$productDetail.showProduct(data)
        })
      }
    }
  }
}
</script>

<style scoped>

</style>
