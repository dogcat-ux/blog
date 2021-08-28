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
    <el-form-item label="" prop="pass">
      <el-input class="input-info" type="password" placeholder="请输新入密码" v-model="ruleForm.pass" autocomplete="off"></el-input>
    </el-form-item>
    <el-form-item label="" prop="checkPass">
      <el-input class="input-info" type="password" placeholder="请确认新密码"  v-model="ruleForm.checkPass" autocomplete="off"></el-input>
    </el-form-item>
    <el-form-item>
      <el-button type="primary" @click="submitForm('ruleForm')" round class="el-button">修改密码</el-button>
      <!--      <el-button type="primary" @click="submitForm('ruleForm')">登录</el-button>-->
      <!--      <el-button @click="resetForm('ruleForm')">重置</el-button>-->
    </el-form-item>
  </el-form>
</template>

<script>
  import {loginUser} from "../../api/common/LoginController/loginUser";
  import {getCode} from "../../api/common/RegisterController/getCode";
  import {getUpdPwdCode} from "../../api/user/FindPwdController/getUpdPwdCode";
  import {getCodeReflush} from "../../api/common/RegisterController/getCodeReflush";
  import {changeUsersPwd} from "../../api/user/FindPwdController/changeUsersPwd";

  export default {
    name: "AmendPassword",
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
      var validatePass2 = (rule, value, callback) => {
        if (value === '') {
          callback(new Error('请再次输入密码'));
        } else if (value !== this.ruleForm.pass) {
          callback(new Error('两次输入密码不一致!'));
        } else {
          callback();
        }
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
          verification:'',
          pass: '',
          checkPass: '',
        },
        rules: {
          pass: [
            { required: true,validator: validatePass, trigger: 'blur' }
          ],
          checkPass: [
            { required: true,validator: validatePass2, trigger: 'blur' }
          ],
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
        getUpdPwdCode(this.ruleForm.phone).then(res=>{
          console.log('验证码',res)
          this.$message.success('成功发送验证码')
        }).catch(err=>{})
      },
      //表单发送
      submitForm(formName) {
        this.$refs[formName].validate((valid) => {
          if (valid) {
            changeUsersPwd(this.ruleForm.phone,this.ruleForm.pass).then(res=>{
              if(res.status===200){
                if (res.data.code ===200){
                  this.$message.success("修改密码成功");
                }else{
                  this.$message.error("修改失败");
                }
              }
            }).catch(err=>{
              console.log(err)
            });
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
  /deep/.el-form{
    margin: auto;
    width: $login-width;
  }
  .el-form-item{
    width: 100%;
    height: 40px;
    font-size: var(--font-login);
    padding: 0;
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
    width: 150px;
    height: 50px;
    padding: 0;
    margin: 0;
  }
</style>
