<template>
  <div class="login">`
    <MinHeader class="header"></MinHeader>
    <div class="main">
      <el-card>
        <div class="box-card">
          <div class="img-box">
            <img src="../../assets/img/login.png" alt="">
          </div>
          <div class="login-box">
            <div class="tab">
              <span @click="toPassword">密码登录</span>
              <span @click="toCode">验证码登录</span>
            </div>
            <div class="main-box">
              <transition name="fade">
                <component :is="theComponent"></component>
              </transition>
            </div>
            <div class="footer">
              <span @click="toAmend">忘记密码</span>
              <span @click="toRegister">注册账号</span>
            </div>
          </div>
        </div>
      </el-card>
    </div>
  </div>
</template>

<script>
  import MinHeader from "../../components/header/MinHeader";
  import HeaderBar from "../../components/header/HeaderBar";
  import LoginPage from "../../components/login/LoginPage";
  import RegisterPage from "../../components/login/RegisterPage";
  import CodeLoginPage from "../../components/login/CodeLoginPage";
  import AmendPassword from "../../components/login/AmendPassword";
  //api

  export default {
    name: "Login",
    components: {
      HeaderBar,
      LoginPage,
      RegisterPage,
      CodeLoginPage,
      AmendPassword,
      MinHeader
    },
    data() {
      return {
        theComponent: LoginPage
      }
    },
    methods: {
      toCode() {
        this.theComponent = CodeLoginPage
      },
      toPassword() {
        this.theComponent = LoginPage
      },
      toRegister(){
        this.theComponent = RegisterPage
      },
      toAmend(){
        this.theComponent = AmendPassword
      }
    }
  }
</script>

<style lang="scss" scoped>
  $login-width: 500px;
  $box-card-width: 1200px;
  $login-height: 600px;
  $tab-height: 80px;
  $main-box-height: 350px;
  .fade-enter-active,.fade-leave-active{
    transition:opacity,.3s;
    opacity:0
  }
  .fade-enter,.fade-leave-to{
    opacity:0
  }
  .login {
    width: var(--page-width);
    height: var(--page-height-common);
    text-align: center;
    line-height: var(--page-height);
    position: relative;
    background-color: var(--color-bac);
    display: flex;
    flex-direction: column;
    .header{
      position: absolute;
      top: 0;
    }

    .main {
      position: absolute;
      left: 50%;
      top: 50%;
      overflow: hidden;
      transform: translate(-50%, -50%);

      .box-card {
        margin: auto;
        width: $box-card-width;
        height: $login-height;
        display: flex;
        flex-direction: row;
        .img-box {
          width: $login-height;
          height: $login-height;
          background-color: var(--color-bac);

          img {
            width: $login-height;
            height: $login-height;
          }
        }

        .login-box {
          /*background-color: seashell;*/
          background-color: var(--color-main);
          flex: 1;
          display: flex;
          flex-direction: column;
          justify-content: center;
          /*background-color: sandybrown;*/
          /*position: absolute;*/
          overflow: hidden;
          right: 0;

          .tab {
            width: $login-width;
            height: $tab-height;
            line-height: $tab-height;
            position: relative;
            margin: 0 auto;
            padding-top: 30px;
            color: var(--color-font-link);

            span {
              position: absolute;
              cursor: pointer;
            }

            span:hover {
              color: var(--color-font-link-active);
            }

            span:first-child {
              left: 0;
            }

            span:last-child {
              right: 250px;
            }
          }

          .main-box {
            width: $login-width;
            height: $main-box-height;
            margin: auto;
            line-height: $main-box-height;
          }

          .footer {
            width: $login-width;
            height: $tab-height;
            position: relative;
            margin: 10px auto;

            span {
              position: absolute;
              cursor: pointer;
            }

            span:hover {
              color: var(--color-font-link-active);
            }

            span:first-child {
              left: 0;
            }

            span:last-child {
              right: 0;
            }

          }
        }
      }

    }
  }
</style>
