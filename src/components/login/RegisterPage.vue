<template>
  <el-form :model="ruleForm" status-icon :rules="rules" ref="ruleForm" label-width="0" class="demo-ruleForm">
    <el-form-item label="" prop="phone">
      <el-input class="input-info" v-model.number="ruleForm.phone" placeholder="请输入手机号"></el-input>
    </el-form-item>
    <el-form-item label="" prop="username">
      <el-input class="input-info" v-model="ruleForm.username" placeholder="请输入用户名"></el-input>
    </el-form-item>
    <el-form-item label="" prop="pass">
      <el-input class="input-info" type="password" placeholder="请输入密码" v-model="ruleForm.pass" autocomplete="off"></el-input>
    </el-form-item>
    <el-form-item label="" prop="checkPass">
      <el-input class="input-info" type="password" placeholder="请确认密码"  v-model="ruleForm.checkPass" autocomplete="off"></el-input>
    </el-form-item>
    <el-form-item prop="verification">
      <el-col :span="11">
        <el-input v-model="ruleForm.verification" class="input-info"
                  placeholder="请输入验证码">
        </el-input>
      </el-col>
      <el-col class="line" :span="2"><br></el-col>
      <el-col :span="11">
        <el-button type="primary" @click="verificationSubmit">发送验证码</el-button>
      </el-col>
    </el-form-item>
    <el-form-item>
      <el-button type="primary" @click="submitForm('ruleForm')" round>提交</el-button>
      <el-button @click="resetForm('ruleForm')" round>重置</el-button>
    </el-form-item>
  </el-form>
</template>

<script>
  // <!--  通过$emit传出了注册事件-->
  import {register} from "../../api/common/RegisterController/register";
  import {getCode} from "../../api/common/RegisterController/getCode";
  import {phoneCheck} from "../../api/common/RegisterController/phoneCheck";
  import {usernameCheck} from "../../api/common/RegisterController/usernameCheck";
  import {getCodeReflush} from "../../api/common/RegisterController/getCodeReflush";

  export default {
    name: "RegisterPage",
    components:{
      register,
    },
    data() {
      var checkPhone = (rule, value, callback) => {
        phoneCheck(value).then(res=>{
          console.log("phoneCheck",res)
          this.code = res.data.code
        }).catch(err=>{});
        if (!value) {
          return callback(new Error('手机号码不能为空'));
        }
        else if (!Number.isInteger(value)) {
          callback(new Error('请输入数字值'));
        }
        else if (this.code!==200){
          callback(new Error('该手机号已被注册'));
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
      var checkUsername = (rule, value, callback) => {
        console.log("checkUsername:",value)
        usernameCheck(value).then(res=>{
          console.log("usernameCheck",res)
          this.userCode = res.data.code
        }).catch(err=>{
          callback()
        });
        if (!value) {
          return callback(new Error('请输入用户名'));
        }
        else if (this.userCode!==200){
          callback(new Error('该用户名已被注册'));
        }
        else {
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
      return {
        ruleForm: {
          phone:'',
          pass: '',
          checkPass: '',
          verification:'',
          username:''
        },
        rules: {
          phone: [
            { validator: checkPhone, trigger: 'blur' },
            { required: true, message: '请输入手机号码', trigger: 'blur' },
          ],
          pass: [
            { required: true,validator: validatePass, trigger: 'blur' }
          ],
          checkPass: [
            { required: true,validator: validatePass2, trigger: 'blur' }
          ],
          verification:[
            // { validator: checkVerification, trigger: 'blur' },
            { required: true, message: '请输入验证码',trigger: 'blur'}
          ],
          username:[
            { validator: checkUsername, trigger: 'blur' },
            { required: true, message: '请输入用户名',trigger: 'blur' }
          ]
        },
        code:200,
        userCode:200,
      };
    },
    methods: {
      //发送验证码
      verificationSubmit(){
        getCode(this.ruleForm.phone).then(res=>{
          console.log('验证码',res)
          this.$message.success('成功发送验证码')
        }).catch(err=>{
        })
      },
      submitForm(formName) {
        this.$refs[formName].validate((valid) => {
          if (valid) {
            register(this.ruleForm).then(res=>{
              console.log('register',res)
              if(res.status===200){
                if (res.data.code ===200){
                  this.$message.success("注册成功");
                  this.$emit('registerSuccess');
                  location.reload()
                }else{
                  this.$message.error(res.data.message);
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
