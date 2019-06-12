<template>
  <div>
    <el-dialog
      :visible="visible"
      @close="handleClose"
      width="70%"
    >
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
          width="250px"
        >
          <template slot-scope="scope">
            <el-button @click.native="showDetail(scope.row)">详情</el-button>
            <el-button v-if="scope.row.status === 10" @click="pay(scope.row.orderNo)">支付</el-button>
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
    </el-dialog>
    <user-order-detail ref="showUserOrderDetail"></user-order-detail>
    <user-pay-qr ref="showUserPayQr"></user-pay-qr>
  </div>
</template>

<script>
import UserOrderDetail from './UserOrderDetail'
import {mapActions} from 'vuex'
import UserPayQr from './UserPayQr'
export default {
  name: 'UserOrder',
  components: {UserPayQr, UserOrderDetail},
  data () {
    return {
      visible: false,
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
      curOrderItem: null,
      pageNum: 1
    }
  },
  methods: {
    ...mapActions('orderAPI', ['payOrder', 'queryOrder', 'listOrder']),
    show (data) {
      this.tableData = data
      this.visible = true
    },
    handleClose () {
      this.visible = false
    },
    showDetail (data) {
      console.log(data)
      this.$refs.showUserOrderDetail.show(data)
    },
    refresh () {
      this.listOrder({
        pageNum: this.pageNum,
        pageSize: 5
      }).then(data => {
        this.tableData = data.list
        console.log('listOrder', data.list)
      })
    },
    changePageNum () {
      this.refresh()
    },
    pay (orderNo) {
      this.queryOrder(orderNo).then(data => {
        console.log('queryResult', data)
        if (data === 'FAILED') {
          this.payOrder(orderNo).then(data => {
            this.$refs.showUserPayQr.show(data.qrUrl)
          })
        } else {
          this.refresh()
          this.$notify({
            title: '支付轮询通知',
            message: '该订单已支付成功'
          })
        }
      })
    }
  }
}
</script>

<style scoped>

</style>
