<template>
  <div>
    <el-dialog
      :visible="visible"
      @close="handleClose"
      width="40%">
<!--      <el-form :model="product" :rules="rules" ref="ruleForm" label-width="100px" class="demo-ruleForm">-->
      <el-form :model="product"  ref="ruleForm" label-width="100px" class="demo-ruleForm">

        <div style="display:flex;justify-content: center">
          <img style="width: 148px; height: 148px; display: inline;"
               :src="imageUrl">
          <el-upload
            style="display: inline"
            :before-upload="beforeUpdate"
            list-type="picture-card"
            :on-preview="handlePictureCardPreview"
            :on-remove="handleRemove">
            <i class="el-icon-plus"></i>
          </el-upload>
        </div>
<!--        <form name="form1" action="" id="photoForm" method="post" enctype="multipart/form-data" @submit.prevent="subPhoto">-->
<!--          <input type="file" name="upload_file"/>-->
<!--          <input type="submit" value="Springmvc upload"/>-->
<!--        </form>-->
        <el-dialog :visible.sync="dialogVisible">
          <img width="100%" :src="dialogImageUrl" alt="">
        </el-dialog>
        <el-form-item label="商品名称" prop="name">
          <el-input v-model="product.name"></el-input>
        </el-form-item>
        <el-form-item label="商品类别" prop="categoryId">
          <el-select v-model="product.categoryId" placeholder="请选择商品所属类别">
            <el-option v-for="(category,index) in categoryList" :label="category.name" :key="index" :value="category.id"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="商品状态" prop="status">
          <el-switch v-model="product.status"></el-switch>
        </el-form-item>
        <el-form-item label="商品详情" prop="detail">
          <el-input type="textarea" v-model="product.detail"></el-input>
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
import {mapState, mapActions} from 'vuex'
export default {
  name: 'ManagerProductDetail',
  computed: {
    ...mapState('categoryAPI', [
      'categoryList'
    ]),
    headers () {
      return {
        'Access-Control-Allow-Origin': '*',
        'Accept': 'application/json, text/plain, /'
      }
    }
  },
  mounted () {

  },
  data () {
    return {
      visible: false,
      imageUrl: '',
      dialogImageUrl: '',
      dialogVisible: false,
      fits: ['fill', 'contain', 'cover', 'none', 'scale-down']
    }
  },
  props: {
    product: null
  },
  methods: {
    ...mapActions('productAPI', ['setManagerProductPhoto']),
    beforeUpdate (file) {
      console.log('??', file)
      this.setManagerProductPhoto(file).then(data => {
        console.log('万一呢', data)
        this.product.mainImage = data.uri
        this.imageUrl = this.product.imageHost + this.product.mainImage
        console.log('imageUrl', this.imageUrl)
      })
    },
    handleRemove (file, fileList) {
      console.log(file, fileList)
    },
    handlePictureCardPreview (file) {
      this.dialogImageUrl = file.url
      this.dialogVisible = true
    },
    saveProduct () {
      console.log('cookie', document.cookie.length)
    },
    cancel () {

    },
    showProduct (data) {
      this.visible = true
      this.product = data
      console.log('按理说这个时候应该有product了', this.product)
      this.imageUrl = this.product.imageHost + this.product.mainImage
    },
    handleClose () {
      this.visible = false
    }
  }
}
</script>

<style scoped>
  .avatar-uploader .el-upload {
    border: 1px dashed #d9d9d9;
    border-radius: 6px;
    cursor: pointer;
    position: relative;
    overflow: hidden;
  }
  .avatar-uploader .el-upload:hover {
    border-color: #409EFF;
  }
  .avatar-uploader-icon {
    font-size: 28px;
    color: #8c939d;
    width: 178px;
    height: 178px;
    line-height: 178px;
    text-align: center;
  }
  .avatar {
    width: 178px;
    height: 178px;
    display: block;
  }

</style>
