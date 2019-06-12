<template>
  <div>
    <el-dialog
      :visible="visible"
      @close="handleClose"
      width="40%"
    >
      <p style="text-align: center;margin-bottom: 30px">收货地址</p>
      <el-form ref="form" :model="tableData" label-width="120px">
        <el-form-item label="收货人姓名">
          <el-input v-model="tableData.receiverName"></el-input>
        </el-form-item>
        <el-form-item label="收货人电话">
          <el-input v-model="tableData.receiverPhone"></el-input>
        </el-form-item>
        <el-form-item label="收货人手机号">
          <el-input v-model="tableData.receiverMobile"></el-input>
        </el-form-item>
        <el-form-item label="收货地址省份">
          <el-input v-model="tableData.receiverProvince"></el-input>
        </el-form-item>
        <el-form-item label="收货地址城市">
          <el-input v-model="tableData.receiverCity"></el-input>
        </el-form-item>
        <el-form-item label="收货地址区域">
          <el-input v-model="tableData.receiverDistrict"></el-input>
        </el-form-item>
        <el-form-item label="收货地址">
          <el-input v-model="tableData.receiverAddress"></el-input>
        </el-form-item>
        <el-form-item label="收货邮编">
          <el-input v-model="tableData.receiverZip"></el-input>
        </el-form-item>
      </el-form>
      <div style="text-align: center">
        <el-button type="primary" @click="onSubmit">保存</el-button>
        <el-button>取消</el-button>
      </div>
    </el-dialog>
  </div>
</template>

<script>
import {mapActions} from 'vuex'
export default {
  name: 'UserShippingDetail',
  data () {
    return {
      visible: false,
      tableData: {
        id: null,
        receiverName: '',
        receiverPhone: '',
        receiverMobile: '',
        receiverProvince: '',
        receiverCity: '',
        receiverDistrict: '',
        receiverAddress: '',
        receiverZip: ''
      }
    }
  },
  methods: {
    ...mapActions('shippingAPI', ['addShippingList', 'updateShippingList']),
    show (data) {
      if (data === null) {
        data = {
          id: null,
          receiverName: '',
          receiverPhone: '',
          receiverMobile: '',
          receiverProvince: '',
          receiverCity: '',
          receiverDistrict: '',
          receiverAddress: '',
          receiverZip: ''
        }
      }
      this.tableData = data
      this.visible = true
    },
    handleClose () {
      this.visible = false
    },
    onSubmit () {
      if (this.tableData.id !== null) {
        this.updateShippingList(this.tableData).then(data => {
          console.log('dataShipping', data)
          if (data.status === 0) {
            this.$emit('refresh')
            this.handleClose()
          }
        })
      } else {
        this.addShippingList(this.tableData).then(data => {
          console.log('dataShipping', data)
          if (data.status === 0) {
            this.$emit('refresh')
            this.handleClose()
          }
        })
      }
    }
  }
}
</script>

<style scoped>

</style>
