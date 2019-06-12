<template>
  <div>
    <div style="float: right;width: 30%;margin-bottom: 20px">
      <el-input style="width: 70%;" v-model="searchText"></el-input>
      <el-button @click.native="search()">搜索</el-button>
    </div>
    <el-table
      :data="tableData"
      stripe
      style="width: 100%">
      <el-table-column
        prop="orderNo"
        label="ID"
        width="180">
      </el-table-column>
      <el-table-column
        prop="payment"
        label="价格">
      </el-table-column>
      <el-table-column
        prop="createTime"
        label="创建时间">
      </el-table-column>
      <el-table-column
        prop="paymentTime"
        label="支付时间">
      </el-table-column>
      <el-table-column
        prop="paymentTypeDesc"
        label="支付方式">
      </el-table-column>
      <el-table-column
        prop="postage"
        label="邮费">
      </el-table-column>
      <el-table-column
        prop="statusDesc"
        label="状态">
      </el-table-column>
      <el-table-column
        label="操作"
        width="200px"
      >
        <template slot-scope="scope">
          <el-button @click.native="getCurOrderItem(scope.row)">详情</el-button>
          <el-button v-if="scope.row.status === 20" @click.native="sendCurOrder(scope.row)">发货</el-button>
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
    <manager-order-item ref="$orderItem" :order-item="curOrderItem"></manager-order-item>
  </div>
</template>

<script>
import {mapActions} from 'vuex'
import ManagerOrderItem from './ManagerOrderItem'
export default {
  name: 'ManagerOrder',
  components: {ManagerOrderItem},
  data () {
    return {
      tableData: [{
        id: '103',
        orderNo: '1491753014256',
        payment: '175.0',
        paymentTypeDesc: '支付宝',
        postage: '0',
        statusDesc: '已支付',
        createTime: '2019-05-13 21:54:40',
        paymentTime: '2019-05-13 21:58:40'
      }, {
        id: '103',
        orderNo: '1491753014256',
        payment: '175.0',
        paymentTypeDesc: '支付宝',
        postage: '0',
        statusDesc: '已支付',
        createTime: '2019-05-13 21:54:40',
        paymentTime: '2019-05-13 21:58:40'
      }, {
        id: '103',
        orderNo: '1491753014256',
        payment: '175.0',
        paymentTypeDesc: '支付宝',
        postage: '0',
        statusDesc: '已支付',
        createTime: '2019-05-13 21:54:40',
        paymentTime: '2019-05-13 21:58:40'
      }, {
        id: '103',
        orderNo: '1491753014256',
        payment: '175.0',
        paymentTypeDesc: '支付宝',
        postage: '0',
        statusDesc: '已支付',
        createTime: '2019-05-13 21:54:40',
        paymentTime: '2019-05-13 21:58:40'
      }],
      searchText: null,
      pageNum: 1,
      curOrderItem: null
    }
  },
  async mounted () {
    this.refresh()
  },
  methods: {
    ...mapActions('orderAPI', ['getOrderList', 'sendOrder', 'searchOrder', 'detailOrder']),
    getCurOrderItem (orderItem) {
      console.log('getCurOrderItem', orderItem)
      this.curOrderItem = orderItem
      this.$refs.$orderItem.show(orderItem)
    },
    async refresh () {
      let {data} = await this.getOrderList({pageNum: this.pageNum, pageSize: 8})
      this.tableData = data.list
    },
    sendCurOrder (data) {
      console.log('sendCurOrder', data)
      this.sendOrder(data.orderNo).then(data => {
        console.log('sendCurOrder', data)
        if (data.status === 0) {
          this.$notify({
            title: '发货通知',
            message: '该订单发货成功'
          })
          this.refresh()
        }
      })
    },
    search () {
      if (this.searchText === '' || this.searchText === null) {
        this.refresh()
      } else {
        this.searchOrder({
          orderNo: this.searchText,
          pageNum: this.pageNum,
          pageSize: 8
        }).then(data => {
          this.tableData = data.data.list
        })
      }
    },
    changePageNum () {
      console.log(this.pageNum)
      this.refresh()
    }
  }
}
</script>

<style scoped>

</style>
