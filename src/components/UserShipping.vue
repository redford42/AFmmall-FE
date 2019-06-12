<template>
  <div>
    <el-dialog
      :visible="visible"
      @close="handleClose"
      width="65%"
    >
      <el-table
        :data="tableData"
        stripe
        style="width: 100%">
        <el-table-column
          prop="receiverName"
          label="收件人姓名">
        </el-table-column>
        <el-table-column
          prop="receiverPhone"
          label="收件人手机号">
        </el-table-column>
        <el-table-column
          prop="receiverProvince"
          label="收件人省份">
        </el-table-column>
        <el-table-column
          prop="receiverCity"
          label="收件人城市">
        </el-table-column>
        <el-table-column
          prop="receiverDistrict"
          label="收件人区域">
        </el-table-column>
        <el-table-column
          prop="receiverAddress"
          label="收货地址">
        </el-table-column>
        <el-table-column
          label="操作"
          width="200px"
        >
          <template slot-scope="scope">
            <el-button @click="updateShipping(scope.row)">修改</el-button>
            <el-button @click="deleteShipping(scope.row)">删除</el-button>
          </template>
        </el-table-column>
      </el-table>
      <div style="height: 80px;">
        <el-button type="primary" style="float: left;margin-top: 20px;margin-right: 50px" @click="showDetail()">新增</el-button>
      </div>
    </el-dialog>
    <user-shipping-detail ref="showUserShippingDetail" @refresh="refresh"></user-shipping-detail>
  </div>
</template>

<script>
import {mapActions} from 'vuex'
import UserShippingDetail from './UserShippingDetail'
export default {
  name: 'UserShipping',
  components: {UserShippingDetail},
  data () {
    return {
      visible: false,
      tableData: [{
        receiverName: '张三',
        receiverPhone: '15928549963',
        receiverProvince: '四川',
        receiverCity: '成都',
        receiverDistrict: '双流区',
        receiverAddress: '四川省成都市双流区成都信息工程大学'
      }, {
        receiverName: '张三',
        receiverPhone: '15928549963',
        receiverProvince: '四川',
        receiverCity: '成都',
        receiverDistrict: '双流区',
        receiverAddress: '四川省成都市双流区成都信息工程大学'
      }, {
        receiverName: '张三',
        receiverPhone: '15928549963',
        receiverProvince: '四川',
        receiverCity: '成都',
        receiverDistrict: '双流区',
        receiverAddress: '四川省成都市双流区成都信息工程大学'
      }, {
        receiverName: '张三',
        receiverPhone: '15928549963',
        receiverProvince: '四川',
        receiverCity: '成都',
        receiverDistrict: '双流区',
        receiverAddress: '四川省成都市双流区成都信息工程大学'
      }],
      curOrderItem: null
    }
  },
  methods: {
    ...mapActions('shippingAPI', ['deleteShippingList', 'getShippingList']),
    show (data) {
      console.log(data)
      this.tableData = data
      this.visible = true
    },
    refresh () {
      this.getShippingList().then(data => {
        this.tableData = data
      })
    },
    handleClose () {
      this.visible = false
    },
    deleteShipping (data) {
      this.deleteShippingList(data.id).then(data => {
        console.log('deleteShipping', data)
        if (data.status === 0) {
          this.$notify({
            title: '收货地址',
            message: data.msg
          })
        }
        this.refresh()
      })
    },
    showDetail () {
      this.$refs.showUserShippingDetail.show(null)
    },
    updateShipping (data) {
      this.$refs.showUserShippingDetail.show(data)
    }
  }
}
</script>

<style scoped>

</style>
