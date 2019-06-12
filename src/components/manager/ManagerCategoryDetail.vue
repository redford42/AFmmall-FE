<template>
  <div>
    <el-dialog
      :visible="visible"
      @close="handleClose"
      width="40%">
      <el-form :model="category"  ref="ruleForm" label-width="100px" class="demo-ruleForm">
        <el-form-item label="类别名称" prop="name">
          <el-input v-model="category.name"></el-input>
        </el-form-item>
        <el-form-item label="类别状态" prop="status">
          <el-switch v-model="category.status"
                     :active-value= true
                     :inactive-value= false></el-switch>
        </el-form-item>
        <el-form-item>
          <el-button type="primary" @click="saveCategory">保存</el-button>
          <el-button @click="cancel">取消</el-button>
        </el-form-item>
      </el-form>
    </el-dialog>
  </div>
</template>

<script>
import {mapActions} from 'vuex'
export default {
  name: 'ManagerCategoryDetail',
  props: {
    isAdd: false
  },
  data () {
    return {
      category: null,
      visible: false
    }
  },
  methods: {
    ...mapActions('categoryAPI', ['updateCategory', 'addCategory']),
    show (data) {
      this.category = data
      this.visible = true
    },
    handleClose () {
      this.$emit('refresh')
      this.visible = false
    },
    cancel () {
      this.handleClose()
    },
    saveCategory () {
      console.log(this.category)
      if (this.isAdd) {
        this.addCategory(this.category).then(data => {
          console.log('addCategory', data)
          if (data.status === 0) {
            this.handleClose()
          }
        })
      } else {
        delete this.category.createTime
        delete this.category.updateTime
        this.updateCategory(this.category).then(data => {
          console.log('saveCategory', data)
          if (data.status === 0) {
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
