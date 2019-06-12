<template>
  <div>
    <div style="display: inline"><el-button type="primary" @click.native="addCategory()">新增</el-button></div>
<!--    <div style="float: right;width: 30%;margin-bottom: 20px">-->
<!--      <el-input style="width: 70%;"></el-input>-->
<!--      <el-button>搜索</el-button>-->
<!--    </div>-->
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
        prop="name"
        label="分类名称">
      </el-table-column>
      <el-table-column
        prop="status"
        label="状态">
        <template slot-scope="scope">
         {{scope.row.status === true? '可用':'禁用'}}
        </template>
      </el-table-column>
      <el-table-column
        label="操作"
        width="300px"
      >
        <template slot-scope="scope">
          <el-button @click.native="updateCategory(scope.row)">修改</el-button>
          <el-button @click.native="cancelCategory(scope.row.id)">{{scope.row.status? '下架':'上架'}}</el-button>
        </template>
      </el-table-column>
    </el-table>
    <manager-category-detail ref="categoryDetail" :refresh="refreshList" :is-add="Add"></manager-category-detail>
  </div>
</template>

<script>
import {mapActions} from 'vuex'
import ManagerCategoryDetail from './ManagerCategoryDetail'
export default {
  name: 'ManagerCategory',
  components: {ManagerCategoryDetail},
  data () {
    return {
      tableData: [{
        id: '103',
        parentName: '',
        name: '日用品',
        status: '启用',
        sortOrder: '乱序'
      }, {
        id: '103',
        parentName: '',
        name: '电子用品',
        status: '启用',
        sortOrder: '乱序'
      }, {
        id: '103',
        parentName: '',
        name: '文具',
        status: '启用',
        sortOrder: '乱序'
      }, {
        id: '103',
        parentName: '',
        name: '零食',
        status: '启用',
        sortOrder: '乱序'
      }],
      Add: 'false'
    }
  },
  computed: {

  },
  mounted () {
    this.refreshList()
  },
  methods: {
    ...mapActions('categoryAPI', ['getCategoryList', 'changeCategoryStatus']),
    updateCategory (category) {
      this.Add = false
      this.$refs.categoryDetail.show(category)
    },
    addCategory () {
      this.Add = true
      this.$refs.categoryDetail.show({
        name: '',
        status: true
      })
    },
    cancelCategory (data) {
      console.log(data)
      this.changeCategoryStatus(data).then(result => {
        if (result.status === 0) {
          this.refreshList()
        }
      })
    },
    async refreshList () {
      let data = await this.getCategoryList()
      console.log('category', data)
      this.tableData = data
    }
  }
}
</script>

<style scoped>

</style>
