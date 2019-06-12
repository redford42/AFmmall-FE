<template>
  <div>
    <el-dialog
      :visible="visible"
      @close="handleClose"
      width="40%">
      <div style="width: 100%;height: 100px;margin-left: 20px">
        <p style="margin-top: 20px;">
          <span>支付方式</span>
          <span style="margin-left: 400px">{{this.data.paymentTypeDesc}}</span>
        </p>
        <p style="margin-top: 20px;">
          <span>订单状态</span>
          <span style="margin-left: 400px">{{this.data.statusDesc}}</span>
        </p>
        <p style="margin-top: 20px;">
          <span>订单总价</span>
          <span style="margin-left: 400px">{{this.data.payment}}</span>
        </p>
      </div>
      <el-table
        :data="tableData"
        stripe
        style="width: 100%">
        <el-table-column
          prop="productName"
          label="商品名称"
          width="180">
        </el-table-column>
        <el-table-column
          prop="quantity"
          label="个数">
        </el-table-column>
        <el-table-column
          prop="currentUnitPrice"
          label="单价">
        </el-table-column>
        <el-table-column
          prop="totalPrice"
          label="总价">
        </el-table-column>
      </el-table>
    </el-dialog>
  </div>
</template>

<script>
import {mapActions} from 'vuex'
export default {
  name: 'ManagerOrderItem',
  data () {
    return {
      visible: false,
      tableData: null,
      data: null,
      shipping: null
    }
  },
  props: {
    orderItem: null
  },
  methods: {
    ...mapActions('shippingAPI', ['selectShipping']),
    saveProduct () {

    },
    cancel () {

    },
    show (data) {
      console.log('orderitemshow', data)
      this.data = data
      this.tableData = data.orderItemVoList
      this.visible = true
    },
    handleClose () {
      this.visible = false
    }
  }
}
</script>

<style scoped>

</style>
