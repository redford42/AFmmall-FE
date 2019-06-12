<template>
  <div>
    <div style="display: inline"><el-button type="primary" @click.native="addUser()">新增</el-button></div>
    <div style="float: right;width: 30%;margin-bottom: 20px">
      <el-input style="width: 70%;"></el-input>
      <el-button>搜索</el-button>
    </div>
    <el-table
      :data="tableData"
      stripe
      style="width: 100%">
      <el-table-column
        prop="id"
        label="ID"
        width="180">
      </el-table-column>
      <el-table-column
        prop="username"
        label="姓名">
      </el-table-column>
      <el-table-column
        prop="phone"
        label="手机">
      </el-table-column>
      <el-table-column
        prop="email"
        label="邮箱">
      </el-table-column>
      <el-table-column
        prop="role"
        label="角色">
      </el-table-column>
      <el-table-column
        prop="question"
        label="找回密码问题">
      </el-table-column>
      <el-table-column
        prop="answer"
        label="找回密码答案">
      </el-table-column>
      <el-table-column
        label="操作"
        width="200"
      >
        <template slot-scope="scope">
          <el-button @click.native="updateUser(scope.row)">修改</el-button>
          <el-button>删除</el-button>
        </template>
      </el-table-column>
    </el-table>
    <el-pagination
      :current-page.sync="pageNum"
      background
      @current-change="changePageNum"
      layout="prev, pager, next"
      :total="1000">
    </el-pagination>
    <user-register ref="userRegister" :is-manager="isTrue"></user-register>
  </div>
</template>

<script>
import {mapActions} from 'vuex'
import UserRegister from '../UserRegister'
export default {
  name: 'ManagerUser',
  components: {UserRegister},
  data () {
    return {
      isTrue: true,
      pageNum: 1,
      tableData: [{
        date: '2016-05-02',
        name: '王小虎',
        address: '上海市普陀区金沙江路 1518 弄'
      }, {
        date: '2016-05-04',
        name: '王小虎',
        address: '上海市普陀区金沙江路 1517 弄'
      }, {
        date: '2016-05-01',
        name: '王小虎',
        address: '上海市普陀区金沙江路 1519 弄'
      }, {
        date: '2016-05-03',
        name: '王小虎',
        address: '上海市普陀区金沙江路 1516 弄'
      }]
    }
  },
  async mounted () {
    let {data} = await this.getUserList()
    this.tableData = data.list
    console.log('看看这个神奇的data', data)
  },
  methods: {
    ...mapActions('userAPI', ['getUserList']),
    addUser () {
      this.$refs.userRegister.show(null)
    },
    changePageNum () {
      console.log(this.pageNum)
      this.refreshList(this.pageNum)
    },
    async refreshList (currentPage) {
      let {data} = await this.getUserList({pageNum: currentPage || 1, pageSize: 8})
      this.tableData = data.list
    },
    updateUser (user) {
      console.log('updateUser', user)
      this.$refs.userRegister.show(user)
    }
  }
}
</script>

<style scoped>

</style>
