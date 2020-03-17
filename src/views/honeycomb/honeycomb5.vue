<template>
  <div class="app-container">
    <div class="filter-container">
      <el-input v-model="listQuery.apartmentId" placeholder="楼层号" style="width: 200px;" class="filter-item"/>
      <el-input v-model="listQuery.roomId" placeholder="房间号" style="width: 200px;" class="filter-item"/>
      <el-button v-waves class="filter-item" type="primary" icon="el-icon-search" @click="handleFilter">搜索</el-button>
      <el-button class="filter-item" style="margin-left: 10px;" type="primary" icon="el-icon-edit" @click="handleCreate">添加</el-button>
    </div>
    <el-table
      v-loading="listLoading"
      :data="list"
      border
      fit
      highlight-current-row
      style="width: 100%"
    >
      <el-table-column min-width="300px" label="楼号">
        <template slot-scope="scope">
          <span>{{ scope.row.apartmentId }}</span>
        </template>
      </el-table-column>
      <el-table-column align="center" label="房间号" >
        <template slot-scope="scope">
          <span>{{ scope.row.roomId }}</span>
        </template>
      </el-table-column>
      <el-table-column min-width="300px" label="电表设备">
        <template slot-scope="scope">
          <span>电表 {{ scope.row.deviceId }}</span>
        </template>
      </el-table-column>
      <el-table-column min-width="300px" label="企业">
        <template slot-scope="scope">
          <span>{{ scope.row.firmApartmentroom.firm }}</span>
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
    <el-dialog title="创建电表部署" :visible.sync="dialogFormVisible1">
      <el-form ref="dataForm1" :rules="rules" :model="temp" label-position="left" label-width="100px" style="width: 400px; margin-left:50px;">
        <el-form-item label="楼号" prop="apartmentId">
          <el-input v-model="temp.apartmentId"/>
        </el-form-item>
        <el-form-item label="房间号" prop="roomId">
          <el-input v-model="temp.roomId"/>
        </el-form-item>
        <el-select v-model="temp.deviceId" filterable placeholder="电表设备" clearable style="width: 300px" class="filter-item">
          <el-option v-for="item in EmList"
                     :key="item.deviceId"
                     :label="item.deviceId"
                     :value="item.deviceId" />
        </el-select>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="dialogFormVisible1 = false">取消</el-button>
        <el-button type="primary" @click="createData()">创建</el-button>
      </div>
    </el-dialog>
    <el-dialog title="更新电表部署" :visible.sync="dialogFormVisible2">
      <el-form ref="dataForm2" :rules="rules" :model="temp" label-position="left" label-width="100px" style="width: 400px; margin-left:50px;">
        <el-form-item label="楼号">
          <el-input v-model="temp.apartmentId" :disabled="true"/>
        </el-form-item>
        <el-form-item label="房间号">
          <el-input v-model="temp.roomId" :disabled="true"/>
        </el-form-item>
        <el-form-item label="电表设备">
          <el-input v-model="aDeviceId" :disabled="true"/>
        </el-form-item>
        <el-select v-model="temp.deviceId" filterable placeholder="更改后的电表设备" clearable style="width: 300px" class="filter-item">
          <el-option v-for="item in EmList"
                     :key="item.deviceId"
                     :label="item.deviceId"
                     :value="item.deviceId" />
        </el-select>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="dialogFormVisible2 = false">取消</el-button>
        <el-button type="primary" @click="updateData()">更新</el-button>
      </div>
    </el-dialog>
  </div>
</template>

<script>
  import { getEmApartList, createEmApart, updateEmApart, deleteEmApart, EmList } from '@/api/honeycomb'
  import waves from '@/directive/waves' // Waves directive
  import Pagination from '@/components/Pagination' // Secondary package based on el-pagination
  export default {
    name: "honeycomb5",
    components: { Pagination },
    directives: { waves },
    data(){
      return{
        list:null,
        EmList:null,
        total:0,
        listLoading: true,
        listQuery: {
          pageNum: 1,
          pageSize: 20,
          apartmentId:undefined,
          roomId:undefined
        },
        temp: {
          id:undefined,
          apartmentId:undefined,
          roomId:undefined,
          deviceId:undefined
        },
        dialogFormVisible1:false,
        dialogFormVisible2:false,
        rules: {
          apartmentId:[{required:true}],
          roomId:[{required:true}]
        },
        aDeviceId:undefined
      }
    },
    created() {
      this.getList()
      this.getEmList()
    },
    methods: {
      getList() {
        this.listLoading = true
        const requestData = Object.assign({}, this.listQuery)
        getEmApartList(requestData).then(response => {
          this.list = response.data.data.content.list
          this.total = response.data.data.content.total
          this.listLoading = false
        })
      },
      getEmList(){
        EmList().then(response => {
          this.EmList = response.data.data.allEmList
        })
      },
      handleFilter() {
        this.listQuery.page = 1
        this.getList()
      },
      resetTemp() {
        this.temp = {
          id:undefined,
          apartmentId:undefined,
          roomId:undefined,
          deviceId:undefined
        }
      },
      handleCreate(){
        this.resetTemp()
        this.dialogFormVisible1=true
      },
      createData(){
        this.$refs['dataForm1'].validate((valid) => {
          if (valid) {
            createEmApart(this.temp).then(() => {
              this.getList()
              this.dialogFormVisible1 = false
            })
          }
        })
      },
      handleUpdate(row){
        this.temp = Object.assign({}, row) // copy obj
        this.aDeviceId=this.temp.deviceId
        this.temp.deviceId=''
        this.dialogFormVisible2 = true
      },
      updateData(){
        this.$refs['dataForm2'].validate((valid) => {
          if (valid) {
            const tempData = Object.assign({}, this.temp)
            updateEmApart(tempData).then(() => {
              this.getList()
              this.dialogFormVisible2 = false
            })
          }
        })
      },
      handleDelete(row){
        this.temp = Object.assign({}, row) // copy obj
        this.$confirm('此操作将删除该电表部署'+this.temp.deviceId+', 是否继续?', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(() => {
          deleteEmApart(this.temp).then(() => {
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
