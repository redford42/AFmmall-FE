<template>
  <div>
    <el-dialog
      :visible="visible"
      @close="handleClose"
      width="15%"
    >
      <img :src="payUrl" style="width: 200px;height: 200px;">
    </el-dialog>
  </div>
</template>

<script>
import {mapActions} from 'vuex'
export default {
  name: 'UserPayQr',
  data () {
    return {
      visible: false,
      payUrl: null
    }
  },
  methods: {
    ...mapActions('shippingAPI', ['getShippingList']),
    ...mapActions('orderAPI', ['createOrder']),
    show (data) {
      this.payUrl = data
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
