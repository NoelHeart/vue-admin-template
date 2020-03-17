<template>
  <div class="app-container">
    <div v-if="user">
      <el-row :gutter="20">

        <el-col :span="6">
          <user-card :user="user" />
        </el-col>

        <el-col :span="10">
          <el-card>

            <el-tabs v-model="activeTab">
              <el-tab-pane label="个人信息" name="account">
                <account :user="user" />
              </el-tab-pane>
            </el-tabs>

          </el-card>
        </el-col>

      </el-row>
    </div>
  </div>
</template>
<script>
  import { getUserInfo } from '@/api/login'
  import UserCard from './components/UserCard'
  import Account from './components/Account'
  export default {
    name: "Profile",
    components: { UserCard, Account },
    data() {
      return {
        user: {},
        activeTab: 'account'
      }
    },
    created() {
      this.getUser()
    },
    methods: {
      getUser() {
        getUserInfo().then(response => {
          this.user = {
            userId: response.data.data.userInfo.userId,
            userAccount: response.data.data.userInfo.userAccount,
            passWord: response.data.data.userInfo.passWord,
            email: response.data.data.userInfo.email,
            name: response.data.data.userInfo.name,
            phone: response.data.data.userInfo.phone,
            role: response.data.data.userInfo.role
          }
        })
      }
    }
  }
</script>

<style scoped>

</style>
