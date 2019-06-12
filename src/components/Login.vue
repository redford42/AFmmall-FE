<template>
  <div>
    <el-dialog
    :visible="visible"
    @close="handleClose"
    width="30%"
    >
      <p style="text-align: center">登陆界面</p>
      <div style="text-align: center;;margin-top: 20px">
        <div style="margin-bottom: 20px">
          <span style="margin-right: 10px">账号:</span>
          <el-input class="input" v-model="loginForm.user" placeholder="请输入用户名"></el-input>
        </div>
        <div style="margin-bottom: 20px">
        <span style="margin-right: 10px">密码:</span>
          <el-input  class="input"  v-model="loginForm.pass" placeholder="请输入密码" show-password></el-input>
        </div>
        <el-button @click="login">登陆</el-button>
        <el-button>取消</el-button>
      </div>
    </el-dialog>

  </div>
</template>

<script>
import {mapActions, mapState} from 'vuex'
export default {
  name: 'Login',
  data () {
    return {
      loginForm: {
        user: 'testtest',
        pass: '123'
      },
      visible: false
    }
  },
  computed: {
    ...mapState('userAPI', [
      'userName'
    ])
  },
  methods: {
    ...mapActions('userAPI', [
      'userLogin'
    ]),
    ...mapActions('cartAPI', [
      'getCartList'
    ]),
    show () {
      this.visible = true
    },
    handleClose () {
      this.visible = false
    },
    login () {
      this.userLogin(this.loginForm).then(data => {
        console.log('check', data)
        if (data.data.role === 1) {
          this.$router.push('/manager/product')
        }
        if (data !== null) {
          console.log(this.userName)
          this.handleClose()
        }
      })
    }
  }
}
</script>

<style scoped>
.input{
  width: 60%;
}
</style>
