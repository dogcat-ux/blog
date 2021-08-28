<template>
  <el-form :model="ruleForm" status-icon :rules="rules" ref="ruleForm" label-width="0" class="demo-ruleForm">
    <el-form-item label="" prop="phone">
      <el-input class="input-info" v-model.number="ruleForm.phone" placeholder="请输入手机号"></el-input>
    </el-form-item>
    <el-form-item label="" prop="verification">
      <el-col :span="11">
        <el-input class="input-info" v-model="ruleForm.verification" placeholder="请输入验证码"></el-input>
      </el-col>
      <el-col class="line" :span="2"><br></el-col>
      <el-col :span="11">
        <el-button type="primary" @click="verificationSubmit" >发送验证码</el-button>
      </el-col>
    </el-form-item>
    <el-form-item>
      <el-button type="primary" @click="submitForm('ruleForm')" round class="el-button">登录</el-button>
      <!--      <el-button type="primary" @click="submitForm('ruleForm')">登录</el-button>-->
<!--      <el-button @click="resetForm('ruleForm')">重置</el-button>-->
    </el-form-item>
  </el-form>
</template>

<script>
  import {loginUser} from "../../api/common/LoginController/loginUser";
  import {getCode} from "../../api/common/RegisterController/getCode";
  import {getCodeReflush} from "../../api/common/RegisterController/getCodeReflush";
  import {getUserMess} from "../../api/user/UserController/getUserMess";

  export default {
    name: "CodeLoginPage",
    components:{
    },
    data() {
      var checkVerification = (rule, value, callback) => {
        if (!value) {
          return callback(new Error('请输入验证码'));
        }
        else {
          getCodeReflush(value).then(res=>{
            if(res.data.code!==value){
              callback(new Error("验证码错误"));
            }
          }).catch(err=>{
            callback()
          });
          callback()
        }
        callback()
      };
      var checkPhone = (rule, value, callback) => {
        if (!value) {
          return callback(new Error('手机号码不能为空'));
        }
        else if (!Number.isInteger(value)) {
          callback(new Error('请输入数字值'));
        }
        else {
          var regex = /^(13[0-9]{9})|(15[0-9]{9})|(17[0-9]{9})|(18[0-9]{9})|(19[0-9]{9})$/;
          if (!regex.test(value)) {
            callback(new Error('请输入正确的手机号码'));
            return false;
          } else {
            callback();
          }
          callback()
        }
        callback()
      };
      return {
        ruleForm: {
          email:'',
          verification:''
        },
        rules: {
          phone: [
            { validator: checkPhone, trigger: 'blur' },
            { required: true, message: '请输入手机号码', trigger: 'blur' },
          ],
          verification:[
            { validator: checkVerification, trigger: 'blur' },
            { required: true, message: '请输入验证码',trigger: 'blur'}
          ],
        },
      };
    },
    methods: {
      //发送验证码
      verificationSubmit(){
        getCode(this.ruleForm.phone).then(res=>{
          console.log('验证码',res)
          this.$message.success('成功发送验证码')
        }).catch(err=>{})
      },
      //表单发送
      submitForm(formName) {
        this.$refs[formName].validate((valid) => {
          if (valid) {
            loginUser(this.ruleForm.phone,this.ruleForm.pass).then(res=>{
              console.log("login",res)
              if(res.status===200){
                if (res.data.code ===200){
                  this.$store.commit('GET_PHONE',this.ruleForm.phone)
                  this.$store.commit('GET_USERNAEM',res.data.data.username)
                  this.$store.commit('SET_TOKEN',res.data.data.tokenId)
                  this.$store.commit('GET_ISLOGIN',true)
                  //登录返回 本地保存
                  getUserMess(res.data.data.username).then(res1=>{
                    if(res1.data.code===200){
                      console.log("getUserMess",res1)
                      if(res1.data.data.pictureUrl!==null){
                        console.log(11111111111111111111111111)
                        this.$store.commit('GET_portraitPath',res1.data.data.pictureUrl)
                      }else {
                        console.log(22222222222222222222222222)
                        this.$store.commit('GET_portraitPath',this.$global.defaultAvatar)
                      }
                    }
                  }).catch(err=>{})
                  this.$message.success("登录成功");
                  this.$router.replace('/');
                }else{
                  this.$message.error(res.data.message);
                }
              }
            }).catch(err=>{
              console.log(err)
            });
            // request(formName)
          } else {
            console.log('error submit!!');
            return false;
          }
        });
      },
      //重置表单
      resetForm(formName) {
        this.$refs[formName].resetFields();
      }
    }
  }
</script>

<style lang="scss" scoped>
  $login-width: 500px;
  $box-card-width: 1200px;
  /*.el-input{*/
  /*  height: 50px;*/
  /*  padding: 0;*/
  /*  border-top: 0;*/
  /*}*/
  .el-form{
    margin: 20px auto auto auto;
  }
  /deep/.input-info>>>.el-input__inner{
    height: 50px;
    border-top: 0;
    border-left: 0;
    border-right: 0;
    border-radius: 0;
    background: rgba(255, 255, 255, 0);
    /deep/input{
      height: 50px;
    }
  }
  .el-button{
    width: 200px;
    height: 50px;
    padding: 0;
    margin: 0;
  }
  .el-form-item{
    width: $login-width;
    height: var(--login-input-height);
    font-size: var(--font-login);
  }

</style>
