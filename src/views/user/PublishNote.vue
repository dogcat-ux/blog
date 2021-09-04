<template>
  <div class="publish-blog">
    <HeaderBar></HeaderBar>
    <div class="message">
      <h1>发表博客</h1>
    </div>
    <div class="publish-main">
      <div class="container">
        <!--        分区-->
        <el-row>
          <el-col :span="2">分区</el-col>
          <el-col :span="5">
            <el-select v-model="tags" placeholder="请选择标签">
              <el-option
                v-for="item in options"
                :key="item.id"
                :label="item.name"
                :value="item.name">
              </el-option>
            </el-select>
          </el-col>
        </el-row>
        <!--        标题-->
        <el-row>
          <el-col :span="2">标题</el-col>
          <el-col :span="10">
            <el-input
              type="text"
              placeholder="请输入标题"
              v-model="blogTitle"
              maxlength="25"
              show-word-limit
            >
            </el-input>
          </el-col>
          <el-col :span="6" :offset="6">
            <el-switch
              v-model="isDraft"
              active-text="私密"
              :width="50"
              active-color="mainColor">
            </el-switch>
          </el-col>
        </el-row>
        <!--        正文-->
        <el-row>
          <el-col :span="2">正文</el-col>
          <el-col :span="22">
            <div class="app-content">
              <div class="Tinymce_box">
                <tinymce v-model="content" :height="500"/>
                <div v-if="content" class="editor-content">
                  <h3>预览效果：</h3>
                  <div v-html="content"/>
                </div>
              </div>
            </div>
          </el-col>
        </el-row>
      </div>
      <div class="cover">
        <div class="cover-box">上传封面</div>
        <el-upload
          class="avatar-uploader"
          :action="this.$global.BASE_URL+'/user/upPortrait'"
          ref="upload"
          accept=".jpg,.jpeg,.png,.JPG,.JPEG,.PNG"
          :http-request="uploadFile"
          :on-change="imgPreview"
          :show-file-list="false"
          :on-success="handleAvatarSuccess"
          :before-upload="beforeAvatarUpload"
          :auto-upload="false"
        >
          <img v-if="imageUrl" :src="imageUrl" class="avatar">
          <i v-else class="el-icon-plus avatar-uploader-icon"></i>
        </el-upload>
        <div class="message-submit">
          <el-button type="primary" @click="submitBlog">发布</el-button>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
  import {publishEditor} from "../../api/user/EditorController/publishEditor";
  import Tinymce from "@/components/Tinymce";
  import HeaderBar from "../../components/header/HeaderBar";
  import {allTags} from "../../api/user/BlogController/allTags";
  import {uploadPictures} from "../../api/user/OssController/uploadPictures";
  import {uploadAvator} from "../../api/user/OssController/uploadAvator";
  import {changeUserMess} from "../../api/user/UserController/changeUserMess";

  export default {
    name: "PublishNote",
    components: {
      Tinymce,
      HeaderBar
    },
    data() {
      return {
        // content: this.oneBlog.content,
        // blogTitle: this.oneBlog.blogTitle,
        // tags: this.oneBlog.type,
        // isDraft: true,
        // imageUrl: this.oneBlog.firstPicture,
        content: this.$route.query.content,
        blogTitle: this.$route.query.blogTitle,
        fileData:'',
        //分区标签
        options: [],
        tags:this.$route.query.tags,
        //
        isDraft: this.$route.query.isDraft,
        //上传
        dialogImageUrl: '',
        ossImgUrl: "",
        imageUrl: this.$route.query.imageUrl,
      }
    },
    methods: {
      //提交博客
      submitBlog() {
        let tmp = 0;
        console.log(tmp)
        this.$refs.upload.submit();  // 提交调用uploadFile函数
        if (this.content === '' || this.blogTitle === '') {
          this.$message.error('标题和内容必填')
        } else if (tmp === 0) {
          let draft = 0
          if (this.isDraft) {
            draft = 1
          } else {
            draft = 0
          }
          if (this.$route.query.imageUrl){
            publishEditor(this.blogTitle, this.content, this.imageUrl, draft, this.$store.state.username, this.tags).then(res => {
              console.log(res)
              if (res.status === 200) {
                if (res.data.code === 200) {
                  this.$message.success("发布成功")
                  this.$router.push("/")
                } else {
                  this.$message.error("发布失败")
                }
              } else {
                this.$message.error("错误")
              }
            }).catch(err => {
              console.log(err)
            });
          }else{
            uploadAvator(this.fileData.file).then(res1=>{
              console.log("uploadAvator封面图",res1)
              if(res1.data.code===200){
                console.log("uploadAvator封面图",res1.data.data)
                this.ossImgUrl=res1.data.data;
              }else{
                this.$message.error("可能出了点问题")
              }
              publishEditor(this.blogTitle, this.content, this.ossImgUrl, draft, this.$store.state.username, this.tags).then(res => {
                console.log(res)
                if (res.status === 200) {
                  if (res.data.code === 200) {
                    this.$message.success("发布成功")
                    this.$router.push("/")
                  } else {
                    this.$message.error("发布失败")
                  }
                } else {
                  this.$message.error("错误")
                }
              }).catch(err => {
                console.log(err)
              });
            }).catch(err=>{})
          }
        }
      },
      //限制大小
      limitSize(file, fileList) {
        let testmsg = file.name.substring(file.name.lastIndexOf('.') + 1)
        const extension = testmsg === 'jpg'
        const extension2 = testmsg === 'png'
        const extension3 = testmsg === 'jpeg'
        const isLt2M = file.size / 1024 / 1024 < 1     //这里做文件大小限制
        if (!extension && !extension2 && !extension3) {
          this.$message({
            message: '上传文件只能是 jpg,png,jpeg格式!',
            type: 'warning'
          });
          // fileList.pop()
        }
        if (!isLt2M) {
          this.$message({
            message: '上传文件大小不能超过 1MB!',
            type: 'warning'
          });
          fileList.pop()
        }
        return (extension || extension2 || extension3) && isLt2M
      },
      handleAvatarSuccess(file) {
        console.log(file)
        console.log(file.raw)
        this.imageUrl = URL.createObjectURL(file.raw);
      },
      beforeAvatarUpload(file) {
        let testmsg = file.name.substring(file.name.lastIndexOf('.')+1)
        const extension = testmsg === 'jpg'
        const extension2 = testmsg === 'png'
        const extension3 = testmsg === 'jpeg'
        const isLt2M = file.size / 1024 / 1024 < 1     //这里做文件大小限制
        if(!extension && !extension2 && !extension3) {
          this.$message({
            message: '上传文件只能是 jpg,png,jpeg格式!',
            type: 'warning'
          });
        }
        if(!isLt2M) {
          this.$message({
            message: '上传文件大小不能超过 1MB!',
            type: 'warning'
          });
        }
        return (extension || extension2 ||extension3) && isLt2M
      },
      //上传
      uploadFile(file) {
        this.fileData = file
      },
      imgPreview (file) {
        let fileName = file.name;
        let regex = /(.jpg|.jpeg|.png)$/;
        if (regex.test(fileName.toLowerCase())) {
          this.imageUrl = URL.createObjectURL(file.raw);
          // this.imageUrl = file.url;
        } else {
          this.$message.error('请选择图片文件');
        }
      },
    },
    created() {
      allTags().then(res => {
        console.log("allTags", res)
        if (res.status === 200) {
          if (res.data.code === 200) {
            this.options = res.data.data
          } else {
            this.$message.error("失败")
          }
        } else {
          this.$message.error("可能出了点问题")
        }
      }).catch(err => {
        console.log(err)
      });
    }
  }
</script>

<style lang="scss" scoped>
  $portrait-width: 150px;
  @font-face {

    /* font-properties */
    font-family: YingBiKaiShu;

    src: url('../../assets/font/2012DingYongKangYingBiKaiShuXinBan-2.ttf'),
    url('../../assets/font/2012DingYongKangYingBiKaiShuXinBan-2.ttf'); /* IE9 */
  }

  .Tinymce_box {
  }

  .editor-content {
    margin-left: 30px;
    flex-grow: 1;
    border: 2px dashed #f1f1f1;
    padding: 0 20px;
  }

  .publish-blog {
    width: var(--page-width);
    text-align: center;
    /*background-color: skyblue;*/
    justify-content: space-between;

    h3 {
      color: #808080;
    }

    .message {
      font-size: 150%;
      font-family: YingBiKaiShu;
    }

    .publish-main {
      display: flex;
      text-align: center;
      justify-content: center;
      justify-items: center;
      margin: 0 auto;
      width: 1240px;

      .container {
        width: 1200px;
        position: relative;

        .el-row {
          margin: 20px;
        }
      }

      .cover {
        flex: 1;

        .cover-box {
          width: 80px;
          height: 30px;
          /*background-color: seashell;*/
          line-height: 30px;
        }

        .message-submit {
          width: 100%;

          .el-button {
            width: 100%;
            margin-top: 20px;
          }
        }
      }
    }
  }

  .avatar-uploader {
    border: 1px dashed #d9d9d9;
    width: $portrait-width;
    height: $portrait-width;
    margin: auto;
    cursor: pointer;
    position: relative;
    overflow: hidden;

    .avatar-uploader .el-upload:hover {
      border-color: #409EFF;
    }

    .avatar-uploader-icon {
      font-size: 28px;
      color: #8c939d;
      width: 50px;
      height: 50px;
      line-height: 50px;
      text-align: center;
      /*margin-top: 25px;*/
      position: absolute;
      left: 50%;
      top: 50%;
      transform: translate(-50%, -50%); /* 50%为自身尺寸的一半 */
      margin: auto;
    }

    .avatar {
      width: 100%;
      height: auto;
      max-height: 100%;
      /*object-fit: fill;//转化不同类型*/
    }

  }

  .el-upload {
    border: 1px dashed #d9d9d9;
    width: 200px;
    height: 200px;
    /*border-radius: 50%;*/
    cursor: pointer;
    position: relative;
    overflow: hidden;
  }

</style>
