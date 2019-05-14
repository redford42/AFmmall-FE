<template>
    <el-dialog
    :visible="visible"
    @close="handleClose"
    width="40%"
    >
      <el-form ref="form" :model="userInfo">
        <el-form-item label="邮箱">
          <el-input v-model="userInfo.email"></el-input>
        </el-form-item>
      </el-form>
    </el-dialog>
</template>

<script>
export default {
  name: 'UserMenu',
  props: {
    userInfo: null
  },
  data () {
    return {
      visible: false
    }
  },
  methods: {
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
