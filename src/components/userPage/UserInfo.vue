<template>
  <div class="user-info">
    <div class="info-photo">
      <el-avatar :src="avatarUrl"  :size="100" v-if="isBoxEdit===false&&userInfo.pictureUrl"></el-avatar>
      <el-avatar :src="avatarUrl"  :size="100" v-else-if="isBoxEdit===false"></el-avatar>
      <div class="img-box" v-else>
        <el-upload
                class="avatar-uploader"
                :action="this.$global.BASE_URL+'/user/upPortrait'"
                ref="upload"
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
<!--        <el-button size="mini" round type="primary" class="save-img-btn" @click="submitUpload">保存头像</el-button>-->
      </div>
    </div>
    <div class="username">
      <span>{{userInfo.username}}</span>
    </div>
    <div class="info-popularity">
      <div>粉丝数:{{fansNum}}</div>
      <div>关注数:{{attentionNum}}</div>
    </div>
    <div class="sex" >
      <span v-if="userInfo.sex===0&&!isBoxEdit">男</span>
      <span v-else-if="userInfo.sex===1&&!isBoxEdit">女</span>
      <span v-else-if="userInfo.sex===2&&!isBoxEdit">未知</span>
      <span v-if="isBoxEdit">
        <el-radio v-model="infoAmended.sex" :label="0">男</el-radio>
        <el-radio v-model="infoAmended.sex" :label="1">女</el-radio>
      </span>
    </div>
    <div class="email" >
      <span v-if="!userInfo.email&&!isBoxEdit">邮箱暂无</span>
      <span v-else-if="userInfo.email&&!isBoxEdit">{{userInfo.email}}</span>
      <el-input
        placeholder="请输入邮箱"
        v-model="infoAmended.email"
        v-else
        clearable>
      </el-input>
    </div>
    <div class="personalized-signature">
      <span v-if="!userInfo.signature&&isBoxEdit===false">个性签名：暂无</span>
      <span v-else-if="isBoxEdit===false">个性签名：{{userInfo.signature}}</span>
      <el-input
        type="textarea"
        placeholder="请输入内容"
        v-model="infoAmended.signature"
        maxlength="50"
        show-word-limit
        clearable
        v-else
      >
      </el-input>
    </div>
    <div class="amend-info">
      <span v-if="isBoxEdit===false">
        <el-button type="primary" size="small" class="buttons"  @click="isBoxEdit=true">修改资料</el-button>
        <el-button type="primary" size="small" class="buttons" @click="toAmendPasswrd">修改密码</el-button>
<!--        <el-button type="primary" size="small" >修改绑定手机</el-button>-->
      </span>
      <span v-else>
        <el-button type="primary" size="small" class="buttons"  @click="toSave">保存</el-button>
        <el-button type="primary" size="small" class="buttons"  @click="toCancel">取消</el-button>
      </span>
    </div>
  </div>
</template>

<script>
  import {getUserMess} from "../../api/user/UserController/getUserMess";
  import {changeUserMess} from "../../api/user/UserController/changeUserMess";
  import {uploadAvator} from "../../api/user/OssController/uploadAvator";
  import {getFocusList} from "../../api/user/FocusController/getFocusList";
  import {getFansList} from "../../api/user/FocusController/getFansList";

  export default {
    name: "UserInfo",
    data(){
      return{
        isBoxEdit:false,
        imageUrl: '',
        //头像文件
        fileData:'',
        progressFlag:false,
        defaultAvatar:this.$global.defaultAvatar,
        avatarUrl:this.$store.state.portraitPath,
        userInfo:{},
        attentionNum:0,
        fansNum:0,
        infoAmended:{
          sex:0
        },
      }
    },
    components:{
    },
    methods:{
      toAmendPasswrd(){
        this.$router.push({
          path:'/login',
        })
      },
      userEdit(){
        this.isBoxEdit = true;
      },
      toCancel(){
        this.isBoxEdit = false;
      },
      toSave(){
        let avatarUrl=""
        this.isBoxEdit = false;
        this.$refs.upload.submit();  // 提交调用uploadFile函数
        if(this.fileData.file){
          console.log("this.fileData.file",this.fileData.file)
          this.infoAmended.pictureUrl=this.fileData.file
        }
        uploadAvator(this.fileData.file).then(res=>{
          console.log("uploadAvator",res)
          if(res.data.code===200){
            this.$message.success("修改成功")
            console.log("头像地址",res.data.data)
            this.infoAmended.pictureUrl=res.data.data;
            this.userInfo.pictureUrl=res.data.data;
            this.avatarUrl=res.data.data;
            avatarUrl=res.data.data;
          }else{
            this.$message.error("可能出了点问题")
          }
          changeUserMess(this.infoAmended,avatarUrl).then(res=>{
            console.log("changeUserMess",res)
            if(res.data.code===200){
              this.userInfo=res.data.data;
              this.infoAmended=res.data.data;
              if(res.data.data.pictureUrl){
                this.$store.commit('GET_portraitPath',res.data.data.pictureUrl)
              }
            }
          }).catch(err=>{})
        }).catch(err=>{})
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
    created(){
      getUserMess(this.$store.state.username).then(res=>{
        console.log("getUserMess",res)
        if(res.data.code===200){
          this.userInfo=res.data.data;
          this.infoAmended=res.data.data;
        }
      }).catch(err=>{})
      getFocusList(this.$store.state.username).then(res => {
        console.log("getFocusList", res)
        if (res.data.code === 200) {
          this.attentionNum = res.data.data.length
        }
      }).catch(err => {
        console.log(err)
      });
      getFansList(this.$store.state.username).then(res => {
        console.log("getFansList", res)
        if (res.data.code === 200) {
          this.fansNum = res.data.data.length
        } else {
        }
      }).catch(err => {
        console.log(err)
      });
    }
  }
</script>

<style lang="scss" scoped>
  $portrait-width:100px;
  $user-info-width:300px;
  .user-info{
    width: $user-info-width;
    height: auto;
    min-height: var(--page-height);
    display: flex;
    flex-direction: column;
    text-align: center;
    align-items: center;
    justify-content: center;
    background-color: var(--color-bac);
    .info-photo{
      width: 100%;
      height: 150px;
      line-height: 258px;
      text-align: center;
      vertical-align: middle;
      .img-box{
        width: $portrait-width;
        /*height: 100px;*/
        text-align: center;
        line-height: 100%;
        margin: 30px auto 0 auto;
        .avatar-uploader{
          border: 1px dashed #d9d9d9;
          width: $portrait-width;
          height: $portrait-width;
          border-radius: 50%;
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
            margin-top: 25px;
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
          width: 100px;
          height: 100px;
          /*border-radius: 50%;*/
          border-radius: 6px;
          cursor: pointer;
          position: relative;
          overflow: hidden;
        }
        .save-img-btn{
          /*<!--margin-left: -10px;-->*/
        }
      }
    }
    .username{
      width: 100%;
      height: 60px;
      line-height: 60px;
      text-align: center;
    }
    .sex{
      width: 100%;
      height: 60px;
      line-height: 60px;
      text-align: center;
    }
    .email{
      width: 100%;
      height: 60px;
      line-height: 60px;
      text-align: center;
    }
    .personalized-signature{
      width: 100%;
      height: 100px;
      line-height: 60px;
      text-align: center;
    }
    .info-popularity{
      width: 100%;
      line-height: 60px;
      text-align: center;
      display: flex;
      height: 60px;
      justify-content: center;
      align-items: center;
      flex-direction: row;
      div{
        margin-left: 5px;
      }
    }
    .amend-info{
      flex: 1;
      width: 100%;
      line-height: 60px;
      text-align: center;
    }
  }

</style>
