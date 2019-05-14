<template>
  <div>
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
        width="300px"
      >
        <template slot-scope="scope">
          <el-button @click.native="getCurOrderItem(scope.row)">详情</el-button>
          <el-button>修改</el-button>
          <el-button>删除</el-button>
        </template>
      </el-table-column>
    </el-table>
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
      curOrderItem: null
    }
  },
  async mounted () {
    let {data} = await this.getOrderList()
    this.tableData = data.list
    console.log('看看这个神奇的data', data)
  },
  methods: {
    ...mapActions('orderAPI', ['getOrderList']),
    getCurOrderItem (orderItem) {
      this.curOrderItem = orderItem
      this.$refs.$orderItem.show()
    }
  }
}
</script>

<style scoped>

</style>
