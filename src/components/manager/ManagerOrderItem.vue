<template>
  <div>
    <el-dialog
      :visible="visible"
      @close="handleClose"
      width="40%">
      <!--      <el-form :model="product" :rules="rules" ref="ruleForm" label-width="100px" class="demo-ruleForm">-->
      <el-form :model="orderItem"  ref="ruleForm" label-width="100px" class="demo-ruleForm">
        <el-form-item label="商品名称" prop="productName">
          <el-input v-model="orderItem.productName"></el-input>
        </el-form-item>
        <el-form-item label="商品价格" prop="productName">
          <el-input v-model="orderItem.productName"></el-input>
        </el-form-item>
        <el-form-item>
          <el-button type="primary" @click="saveProduct">保存</el-button>
          <el-button @click="cancel">取消</el-button>
        </el-form-item>
      </el-form>
    </el-dialog>
  </div>
</template>

<script>
export default {
  name: 'ManagerOrderItem',
  data () {
    return {
      visible: false
    }
  },
  props: {
    orderItem: null
  },
  methods: {
    saveProduct () {

    },
    cancel () {

    },
    show () {
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
