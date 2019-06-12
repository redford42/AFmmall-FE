<template>
  <div>
    <el-dialog
      :visible="visible"
      @close="handleClose"
      width="40%"
    >
      <p style="text-align: center;margin-bottom: 30px">注册界面</p>
      <el-form ref="form" :model="registerForm" label-width="120px">
        <el-form-item label="用户名称">
          <el-input v-model="registerForm.username"></el-input>
        </el-form-item>
        <el-form-item label="登陆密码">
          <el-input v-model="registerForm.password"></el-input>
        </el-form-item>
        <el-form-item label="角色" v-if="isManager">
          <el-switch
            v-model="registerForm.role"
            :active-value="1"
            :inactive-value="0"
            :active-text="registerForm.role === 1? '管理员':'会员'">
          </el-switch>
        </el-form-item>
        <el-form-item label="邮箱">
          <el-input v-model="registerForm.email"></el-input>
        </el-form-item>
        <el-form-item label="手机">
          <el-input v-model="registerForm.phone"></el-input>
        </el-form-item>
        <el-form-item label="找回密码问题">
          <el-input v-model="registerForm.question"></el-input>
        </el-form-item>
        <el-form-item label="找回密码答案">
          <el-input v-model="registerForm.answer"></el-input>
        </el-form-item>
      </el-form>
      <div style="text-align: center">
        <el-button type="primary" @click="onSubmit">{{isManager? '保存': '注册'}}</el-button>
        <el-button>取消</el-button>
      </div>
    </el-dialog>
  </div>
</template>

<script>
import {mapActions, mapState} from 'vuex'
export default {
  name: 'UserRegister',
  props: {
    isManager: false
  },
  data () {
    return {
      registerForm: {
        username: '',
        password: '',
        email: '',
        role: 0,
        phone: '',
        question: '',
        answer: ''
      },
      visible: false
    }
  },
  computed: {
    ...mapState('userAPI', [
      'user'
    ])
  },
  methods: {
    ...mapActions('userAPI', [
      'registerUser', 'updateUser'
    ]),
    onSubmit () {
      console.log(this.registerForm.id)
      if (this.registerForm.id !== null && this.registerForm.id !== undefined) {
        this.updateUser(this.registerForm).then(data => {
          console.log('updateSuccess', data)
        })
      } else {
        this.registerUser(this.registerForm).then(data => {
          console.log('registerSuccess', data)
        })
      }
    },
    show (data) {
      if (data === null) {

      } else {
        console.log('registData', data)
        this.registerForm = data
      }
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
