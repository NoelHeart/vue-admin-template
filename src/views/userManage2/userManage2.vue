<template>
  <div class="app-container">
    <div class="filter-container">
      <el-button class="filter-item" style="margin-left: 10px;" type="primary" icon="el-icon-edit" @click="handleCreate">新增用户</el-button>
    </div>
    <el-table
      v-loading="listLoading"
      :data="list"
      border
      fit
      highlight-current-row
      style="width: 100%"
    >
      <el-table-column align="center" label="账号">
        <template slot-scope="scope">
          <span>{{ scope.row.userAccount }}</span>
        </template>
      </el-table-column>
      <el-table-column align="center" label="姓名" >
        <template slot-scope="scope">
          <span>{{ scope.row.name }}</span>
        </template>
      </el-table-column>
      <el-table-column align="center" label="邮箱" >
        <template slot-scope="scope">
          <span>{{ scope.row.email }}</span>
        </template>
      </el-table-column>
      <el-table-column align="center" label="手机号码" >
        <template slot-scope="scope">
          <span>{{ scope.row.phone}}</span>
        </template>
      </el-table-column>
      <el-table-column align="center" label="权限" >
        <template slot-scope="scope">
          <span>{{ scope.row.role}}</span>
        </template>
      </el-table-column>
      <el-table-column align="center" label="操作" width="230" class-name="small-padding fixed-width">
        <template slot-scope="scope">
          <el-button type="primary" size="small" icon="el-icon-edit" @click="handleUpdate(scope.row)">编辑</el-button>
          <el-button type="danger" size="small" @click="handleDelete(scope.row)">删除</el-button>
        </template>
      </el-table-column>
    </el-table>
    <pagination v-show="total>0" :total="total" :page.sync="listQuery.pageNum" :limit.sync="listQuery.pageSize" @pagination="getList" />
    <el-dialog title="新增用户" :visible.sync="dialogFormVisible1">
      <el-form ref="dataForm1" :rules="rules" :model="temp" label-position="left" label-width="100px" style="width: 400px; margin-left:50px;">
        <el-form-item label="用户名" prop="userAccount">
          <el-input v-model="temp.userAccount"/>
        </el-form-item>
        <el-form-item label="密码" prop="passWord">
          <el-input v-model="temp.passWord" placeholder="请输入密码" :type="passwordType"/>
          <span class="show-pwd" @click="showPwd">
            <svg-icon :icon-class="passwordType === 'password' ? 'eye' : 'eye-open'" />
          </span>
        </el-form-item>
        <el-form-item label="电子邮箱" prop="email">
          <el-input v-model="temp.email"/>
        </el-form-item>
        <el-form-item label="真实姓名" prop="name">
          <el-input v-model="temp.name"/>
        </el-form-item>
        <el-form-item label="电话号码" prop="phone">
          <el-input v-model="temp.phone"/>
        </el-form-item>
        <el-form-item label="用户权限" prop="role">
          <el-radio-group v-model="temp.role" size="medium">
            <el-radio-button label="visitor"></el-radio-button>
          </el-radio-group>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="dialogFormVisible1 = false">取消</el-button>
        <el-button type="primary" @click="createData()">创建</el-button>
      </div>
    </el-dialog>
    <el-dialog title="更新用户信息" :visible.sync="dialogFormVisible2">
      <el-form ref="dataForm2" :rules="rules" :model="temp" label-position="left" label-width="100px" style="width: 400px; margin-left:50px;">
        <el-form-item label="用户名" prop="userAccount" >
          <el-input v-model="temp.userAccount" :disabled="true"/>
        </el-form-item>
        <el-form-item label="密码" prop="updatePassWord">
          <el-input v-model="updatePassWord" placeholder="请输入新密码" :type="passwordType"/>
          <span class="show-pwd" @click="showPwd">
            <svg-icon :icon-class="passwordType === 'password' ? 'eye' : 'eye-open'" />
          </span>
        </el-form-item>
        <el-form-item label="电子邮箱" prop="email">
          <el-input v-model="temp.email"/>
        </el-form-item>
        <el-form-item label="真实姓名" prop="name">
          <el-input v-model="temp.name"/>
        </el-form-item>
        <el-form-item label="电话号码" prop="phone">
          <el-input v-model="temp.phone"/>
        </el-form-item>
        <el-form-item label="用户权限" prop="role">
          <el-radio-group v-model="temp.role" size="medium">
            <el-radio-button label="visitor"></el-radio-button>
          </el-radio-group>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="dialogFormVisible2 = false">取消</el-button>
        <el-button type="primary" @click="updateData()">更新</el-button>
      </div>
    </el-dialog>
  </div>
</template>
<script>
  import { getEditorUserList, register, deleteUser, updateUser } from '@/api/login'
  import waves from '@/directive/waves' // Waves directive
  import Pagination from '@/components/Pagination' // Secondary package based on el-pagination
  import { validEmail, validPhone, isRegisterUserName, isPasswd } from '@/utils/validate'
  export default {
    name: "userManage2",
    components: { Pagination },
    directives: { waves },
    data(){
      const validateUserAccount=(rule, value, callback) => {
        if(!isRegisterUserName(value)){
          callback(new Error("用户名只能为5-20个以字母开头、可带数字、“_”、“.”的字串"))
        }else{
          callback()
        }
      }
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
        list:null,
        total:0,
        passwordType:'password',
        listLoading: true,
        updatePassWord:undefined,
        listQuery: {
          pageNum: 1,
          pageSize: 20,
          mohuId:undefined
        },
        temp:{
          userId: undefined,
          userAccount: undefined,
          passWord: undefined,
          email: undefined,
          name: undefined,
          phone: undefined,
          role: undefined
        },
        dialogFormVisible1:false,
        dialogFormVisible2:false,
        rules: {
          userAccount:[{required:true, trigger:'blur',validator:validateUserAccount}],
          passWord:[{required:true, trigger: 'blur', validator:validatePassword}],
          updatePassWord:[{required:false, trigger: 'blur', validator:validatePassword}],
          email:[{required:false, trigger: 'blur', validator:validateEmail}],
          phone:[{required:false, trigger: 'blur', validator:validatePhone}],
          name:[{required:true}]
        }
      }
    },
    created() {
      this.getSelectId()
      this.getList()
    },
    watch: {
      updatePassWord:function () {
        if (this.updatePassWord){
          this.temp.passWord=this.updatePassWord
        }
      }
    },
    methods: {
      getSelectId() {
        this.listQuery.mohuId=this.$store.getters.userManageId
      },
      getList() {
        this.listLoading = true
        const requestData = Object.assign({}, this.listQuery)
        getEditorUserList(requestData).then(response => {
          this.list = response.data.data.content.list
          this.total = response.data.data.content.total
          this.listLoading = false
        })
      },
      resetTemp() {
        this.temp = {
          userId: undefined,
          userAccount: undefined,
          passWord: undefined,
          email: undefined,
          name: undefined,
          phone: undefined,
          role: 'visitor'
        }
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
      },
      handleCreate(){
        this.passwordType='password'
        this.resetTemp()
        this.dialogFormVisible1=true
      },
      createData(){
        this.$refs['dataForm1'].validate((valid) => {
          if (valid) {
            register(this.temp).then(() => {
              this.getList()
              this.dialogFormVisible1 = false
            })
          }
        })
      },
      handleUpdate(row){
        this.passwordType='password'
        this.temp = Object.assign({}, row) // copy obj
        this.dialogFormVisible2 = true
      },
      updateData(){
        this.$refs['dataForm2'].validate((valid) => {
          if (valid) {
            const tempData = Object.assign({}, this.temp)
            updateUser(tempData).then(() => {
              this.getList()
              this.dialogFormVisible2 = false
            })
          }
        })
      },
      handleDelete(row){
        this.temp = Object.assign({}, row) // copy obj
        this.$confirm('此操作将删除该用户, 是否继续?', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(() => {
          deleteUser(this.temp).then(() => {
            for (const v of this.list) {
              if (v.id === this.temp.id) {
                const index = this.list.indexOf(v)
                this.list.splice(index, 1)
                break
              }
            }
          })
        }).catch(() => {
          this.$message({
            type: 'info',
            message: '已取消删除'
          });
        });
      },
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
