<template>
    <el-dialog
    :visible="visible"
    @close="handleClose"
    width="40%"
    >
      <el-form ref="form" :model="userForm">
        <el-form-item label="名称">
          <el-input v-model="userForm.username"></el-input>
        </el-form-item>
        <el-form-item label="邮箱">
          <el-input v-model="userForm.email"></el-input>
        </el-form-item>
        <el-form-item label="手机号">
          <el-input v-model="userForm.phone"></el-input>
        </el-form-item>
        <el-form-item label="找回密码问题">
          <el-input v-model="userForm.question"></el-input>
        </el-form-item>
        <el-form-item label="找回密码答案">
          <el-input v-model="userForm.answer"></el-input>
        </el-form-item>
      </el-form>
      <el-button type="primary" @click.native="onSubmit">保存</el-button>
      <el-button style="float: right;">取消</el-button>
    </el-dialog>
</template>

<script>
import {mapActions} from 'vuex'
export default {
  name: 'UserMenu',
  props: {
    userInfo: null
  },
  data () {
    return {
      visible: false,
      userForm: {

      }
    }
  },
  methods: {
    ...mapActions('userAPI', ['updateUser']),
    show (data) {
      this.userForm = data
      this.visible = true
    },
    handleClose () {
      this.visible = false
    },
    onSubmit () {
      this.updateUser(this.userForm).then(data => {
        if (data.status === 0) {
          this.$notify({
            title: '个人信息修改',
            message: '个人信息修改成功',
            type: 'success'
          })
          this.handleClose()
        }
      })
    }
  }
}
</script>

<style scoped>

</style>
