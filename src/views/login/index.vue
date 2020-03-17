<template>
  <div class="site-wrapper site-page--login">
    <div class="site-content__wrapper">
      <div class="site-content">
        <div class="brand-info">
          <h2 class="brand-info__text">智慧园区信息管理与可视化系统</h2>
          <p class="brand-info__intro">智慧园区信息管理与可视化系统基于vue、element-ui构建开发</p>
        </div>
      </div>
      <div class="login-main">
        <h3 class="login-title">管理员登录</h3>
        <el-form ref="loginForm" :model="loginForm" :rules="loginRules" class="login-form" auto-complete="on" label-position="left">
          <el-form-item prop="username" label="账号">
            <el-input v-model="loginForm.username" name="username" type="text" auto-complete="on"/>
          </el-form-item>
          <el-form-item prop="password" label="密码">
            <el-input
              :type="passwordType"
              v-model="loginForm.password"
              name="password"
              @keyup.enter.native="handleLogin"/>
            <span class="show-pwd" @click="showPwd">
              <svg-icon :icon-class="passwordType === 'password' ? 'eye' : 'eye-open'" />
            </span>
          </el-form-item>
          <el-form-item >
            <el-button :loading="loading" type="primary" style="width:100%;" @click.native.prevent="handleLogin">
              登录
            </el-button>
          </el-form-item>
        </el-form>
      </div>
    </div>
  </div>
</template>

<script>
  import {validEmail} from '@/utils/validate'
  import {validPhone} from '@/utils/validate'
  export default {
    name: 'index',
    data() {
      return {
        loginForm: {
          username: '',
          password: ''
        },
        loginRules: {
          username:[{ required: true}],
          password: [{ required: true}]
        },
        loading: false,
        loading1:false,
        passwordType: 'password',
        redirect: undefined
      }
    },
    methods: {
      handleLogin() {
        this.$refs.loginForm.validate((valid)=>{
          if(valid){
            this.loading=true
            this.$store.dispatch('Login',this.loginForm).then(()=>{
              this.loading=false
              this.$router.push({path:'/'})
            }).catch(() => {
              this.loading = false
            })
          }else{
            console.log('error submit!!')
            return false
          }
        })
      },
      showPwd() {
        if (this.passwordType === 'password') {
          this.passwordType = ''
        } else {
          this.passwordType = 'password'
        }
        this.$nextTick(() => {
          this.$refs.password.focus()
        })
      }
    }
  }
</script>
<style lang="scss" scoped>
  .site-wrapper.site-page--login {
    position: absolute;
    top: 0;
    right: 0;
    bottom: 0;
    left: 0;
    overflow: hidden;
    &:before {
      position: fixed;
      top: 0;
      left: 0;
      z-index: -1;
      width: 100%;
      height: 100%;
      content: "";
      background-image: url(~@/assets/login_bg.jpg);
      background-size: cover;
    }
    .site-content__wrapper {
      position: absolute;
      top: 0;
      right: 0;
      bottom: 0;
      left: 0;
      padding: 0;
      margin: 0;
      overflow-x: hidden;
      overflow-y: auto;
      background-color: transparent;
    }
    .site-content {
      min-height: 100%;
      padding: 30px 500px 30px 30px;
    }
    .brand-info {
      margin: 220px 100px 0 90px;
      color: #fff;
    }
    .brand-info__text {
      margin:  0 0 22px 0;
      font-size: 48px;
      font-weight: 400;
      text-transform : uppercase;
    }
    .brand-info__intro {
      margin: 10px 0;
      font-size: 16px;
      line-height: 1.58;
      opacity: .6;
    }
    .login-main {
      position: absolute;
      top: 0;
      right: 0;
      padding: 150px 60px 180px;
      width: 470px;
      min-height: 100%;
      background-color: #fff;
      .show-pwd {
        position: absolute;
        right: 10px;
        top: 7px;
        font-size: 16px;
        color: #889aa4;
        cursor: pointer;
        user-select: none;
      }
    }
    .login-title {
      font-size: 16px;
    }
    .login-captcha {
      overflow: hidden;
      > img {
        width: 100%;
        cursor: pointer;
      }
    }
    .login-btn-submit {
      width: 100%;
      margin-top: 38px;
    }
  }
</style>
