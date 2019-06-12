<template>
  <el-dialog
    :visible="visible"
    @close="handleClose"
    width="40%"
  >
    <el-form ref="form" :model="userForm">
      <el-form-item label="旧密码">
        <el-input v-model="userForm.passwordOld"></el-input>
      </el-form-item>
      <el-form-item label="新密码">
        <el-input v-model="userForm.passwordNew"></el-input>
      </el-form-item>
    </el-form>
    <el-button type="primary" @click.native="onSubmit">保存</el-button>
    <el-button style="float: right;">取消</el-button>
  </el-dialog>
</template>

<script>
import {mapActions} from 'vuex'
export default {
  name: 'UserPass',
  props: {
    userInfo: null
  },
  data () {
    return {
      visible: false,
      userForm: {
        passwordOld: '',
        passwordNew: ''
      }
    }
  },
  mounted () {
    this.userForm = {
      passwordOld: '',
      passwordNew: ''
    }
  },
  methods: {
    ...mapActions('userAPI', ['updateUser', 'resetPassword']),
    show () {
      this.visible = true
    },
    handleClose () {
      this.visible = false
    },
    onSubmit () {
      this.resetPassword(this.userForm).then(data => {
        if (data.status === 0) {
          this.$notify({
            title: '密码修改',
            message: data.msg,
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
