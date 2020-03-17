<template>
  <el-form ref="dataForm1" :rules="rules" :model="temp"label-position="left" label-width="100px" style="width: 400px; margin-left:50px;">
    <el-form-item label="账号">
      <el-input v-model.trim="temp.userAccount" :disabled="true"/>
    </el-form-item>
    <el-form-item label="新密码" prop="newPassWord">
      <el-input v-model="newPassWord" placeholder="如不更改，可不填写" :type="passwordType"/>
      <span class="show-pwd" @click="showPwd">
        <svg-icon :icon-class="passwordType === 'password' ? 'eye' : 'eye-open'" />
      </span>
    </el-form-item>
    <el-form-item label="真实姓名">
      <el-input v-model.trim="temp.name" />
    </el-form-item>
    <el-form-item label="电子邮箱" prop="email">
      <el-input v-model.trim="temp.email" />
    </el-form-item>
    <el-form-item label="手机号码" prop="phone">
      <el-input v-model.trim="temp.phone" />
    </el-form-item>
    <el-form-item>
      <el-button type="primary" @click="updateUser">更新</el-button>
    </el-form-item>
  </el-form>
</template>

<script>
  import { updateUser,getUserInfo } from '@/api/login'
  import { validEmail, validPhone, isRegisterUserName, isPasswd } from '@/utils/validate'
export default {
  props: {
    user: {
      type: Object,
      default: () => {
        return {
          userId: '',
          userAccount: '',
          passWord: '',
          email: '',
          name: '',
          phone: '',
          role: ''
        }
      }
    }
  },
  data(){
    const validatePassword=(rule, value, callback) => {
      if(!isPasswd(value)){
        callback(new Error("密码只能为6-20个字母、数字、下划线"))
      }else{
        callback()
      }
    }
    const validateEmail=(rule, value, callback) => {
      if(!validEmail(value)){
        callback(new Error("邮箱格式不正确"))
      }else{
        callback()
      }
    }
    const validatePhone=(rule, value, callback) => {
      if(!validPhone(value)){
        callback(new Error("手机号码格式不正确"))
      }else{
        callback()
      }
    }
    return{
      passwordType:'password',
      temp:{
        userId: undefined,
        userAccount: undefined,
        passWord: undefined,
        email: undefined,
        name: undefined,
        phone: undefined,
        role: undefined
      },
      newPassWord:undefined,
      rules: {
        newPassWord:[{required:true, trigger: 'blur', validator:validatePassword}],
        email:[{required:false, trigger: 'blur', validator:validateEmail}],
        phone:[{required:false, trigger: 'blur', validator:validatePhone}],
      }
    }
  },
  watch: {
    newPassWord:function () {
     if (this.newPassWord){
       this.temp.passWord=this.newPassWord
     }
    }
  },
  created(){
    this.getUser()
  },
  methods: {
    showPwd() {
      if (this.passwordType === 'password') {
        this.passwordType = ''
      } else {
        this.passwordType = 'password'
      }
      this.$nextTick(() => {
        this.$refs.password.focus()
      })
    },
    updateUser(){
      this.$refs['dataForm1'].validate((valid) => {
        if (valid) {
          const tempData = Object.assign({}, this.temp)
          updateUser(tempData).then(() => {
            if (this.newPassWord){
              this.$store.dispatch('FedLogOut').then(()=>{
                this.$notify({
                  title: '成功',
                  message: '密码已修改，即将跳转到登录页面！',
                  type: 'success',
                  duration: 0
                })
                setTimeout(()=>{
                  location.reload()
                  this.end()
                },1000)

              })
            }else {
              this.$router.push({path:'/'})
            }
          })
        }
      })
    },
    getUser() {
      getUserInfo().then(response => {
        this.temp.userId = response.data.data.userInfo.userId,
          this.temp.userAccount = response.data.data.userInfo.userAccount,
          this.temp.passWord =response.data.data.userInfo.passWord,
          this.temp.email = response.data.data.userInfo.email,
          this.temp.name = response.data.data.userInfo.name,
          this.temp.phone = response.data.data.userInfo.phone,
          this.temp.role = response.data.data.userInfo.role
      })
    }
  }
}
</script>
<style rel="stylesheet/scss" lang="scss" scoped>
  .show-pwd {
    position: absolute;
    right: 10px;
    top: 7px;
    font-size: 16px;
    color: #889aa4;
    cursor: pointer;
    user-select: none;
  }
</style>
