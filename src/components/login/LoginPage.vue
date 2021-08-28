<template>
  <el-form :model="ruleForm" status-icon :rules="rules" ref="ruleForm" label-width="0" class="demo-ruleForm">
    <el-form-item label="" prop="phone">
      <el-input class="input-info" v-model.number="ruleForm.phone" placeholder="请输入手机号"></el-input>
    </el-form-item>
    <el-form-item label="" prop="pass">
      <el-input class="input-info" type="password" placeholder="请输入密码" v-model="ruleForm.pass" autocomplete="off"></el-input>
    </el-form-item>
    <el-form-item>
<!--      <el-input placeholder="登录" type="button" name="登录">登录</el-input>-->
      <el-button type="primary" @click="submitForm('ruleForm')" round class="el-button">登录</el-button>
<!--      <el-button @click="resetForm('ruleForm')" round>重置</el-button>-->
    </el-form-item>
  </el-form>
</template>

<script>
  import {loginUser} from "../../api/common/LoginController/loginUser";
  import {phoneCheck} from "../../api/common/RegisterController/phoneCheck";
  import {getUserMess} from "../../api/user/UserController/getUserMess";

  export default {
    name: "LoginPage",
    components:{
    },
    data() {
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
      var validatePass = (rule, value, callback) => {
        if (value === '') {
          callback(new Error('请输入密码'));
        } else {
          if (this.ruleForm.checkPass !== '') {
            this.$refs.ruleForm.validateField('checkPass');
          }
          callback();
        }
      };
      return {
        ruleForm: {
          phone:'',
          pass: '',
        },
        rules: {
          phone: [
            { validator: checkPhone, trigger: 'blur' },
            { required: true, message: '请输入手机号码', trigger: 'blur' },
          ],
          pass: [
            { required: true,validator: validatePass, trigger: 'blur' }
          ],
        },
      };
    },
    methods: {
      //发送验证码
      verificationSubmit(){
        // sendVerification(this.ruleForm)
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
  $main-box-height: 350px;
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
