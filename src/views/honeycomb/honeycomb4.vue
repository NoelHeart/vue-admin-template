<template>
  <div class="app-container">
    <div class="filter-container">
      <el-input v-model="listQuery.mohuSelect" placeholder="设备ID" style="width: 200px;" class="filter-item" @keyup.enter.native="handleFilter" />
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
      <el-table-column min-width="300px" label="设备ID">
        <template slot-scope="scope">
          <span>{{ scope.row.deviceId }}</span>
        </template>
      </el-table-column>
      <el-table-column align="center" label="设备类型" >
        <template slot-scope="scope">
          <span>水表</span>
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

    <el-dialog title="创建" :visible.sync="dialogFormVisible1">
      <el-form ref="dataForm1" :rules="rules" :model="temp" label-position="left" label-width="100px" style="width: 400px; margin-left:50px;">
        <el-form-item label="设备ID" prop="deviceId">
          <el-input v-model="temp.deviceId"/>
        </el-form-item>
        <el-form-item label="设备名称" prop="title">
          <el-input v-model="temp.title"/>
        </el-form-item>
        <el-form-item label="设备类型">
          <el-input :disabled="true" placeholder="水表"/>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="dialogFormVisible1 = false">取消</el-button>
        <el-button type="primary" @click="createData()">创建</el-button>
      </div>
    </el-dialog>
    <el-dialog title="更新" :visible.sync="dialogFormVisible2">
      <el-form ref="dataForm2" :rules="rules" :model="temp" label-position="left" label-width="100px" style="width: 400px; margin-left:50px;">
        <el-form-item label="设备ID" prop="deviceId">
          <el-input v-model="temp.deviceId" :disabled="true"/>
        </el-form-item>
        <el-form-item label="设备名称" prop="title">
          <el-input v-model="temp.title"/>
        </el-form-item>
        <el-form-item label="设备类型">
          <el-input :disabled="true" placeholder="水表"/>
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
  import { getWaterList, createWaterMeter, updateWaterMeter, deleteWaterMeter } from '@/api/honeycomb'
  import waves from '@/directive/waves' // Waves directive
  import Pagination from '@/components/Pagination' // Secondary package based on el-pagination
  export default {
    name: "honeycomb4",
    components: { Pagination },
    directives: { waves },
    data(){
      return{
        list:null,
        total:0,
        listLoading: true,
        listQuery: {
          pageNum: 1,
          pageSize: 20,
          mohuSelect:undefined
        },
        temp: {
          deviceId:undefined,
          title:undefined,
          type:'1'
        },
        dialogFormVisible1:false,
        dialogFormVisible2:false,
        rules: {
          deviceId:[{required:true}],
          title:[{required:true}]
        },
      }
    },
    created() {
      this.getList()
    },
    methods: {
      getList() {
        this.listLoading = true
        const requestData = Object.assign({}, this.listQuery)
        getWaterList(requestData).then(response => {
          this.list = response.data.data.content.list
          this.total = response.data.data.content.total
          this.listLoading = false
        })
      },
      handleFilter() {
        this.listQuery.page = 1
        this.getList()
      },
      resetTemp() {
        this.temp = {
          deviceId:undefined,
          title:undefined,
          type:'1'
        }
      },
      handleCreate(){
        this.resetTemp()
        this.dialogFormVisible1=true
      },
      createData(){
        this.$refs['dataForm1'].validate((valid) => {
          if (valid) {
            createWaterMeter(this.temp).then(() => {
              this.list.unshift(this.temp)
              this.dialogFormVisible1 = false
            })
          }
        })
      },
      handleUpdate(row){
        this.temp = Object.assign({}, row) // copy obj
        this.dialogFormVisible2 = true
      },
      updateData(){
        this.$refs['dataForm2'].validate((valid) => {
          if (valid) {
            const tempData = Object.assign({}, this.temp)
            updateWaterMeter(tempData).then(() => {
              for (const v of this.list) {
                if (v.id === this.temp.id) {
                  const index = this.list.indexOf(v)
                  this.list.splice(index, 1, this.temp)
                  break
                }
              }
              this.dialogFormVisible2 = false
            })
          }
        })
      },
      handleDelete(row){
        this.temp = Object.assign({}, row) // copy obj
        this.$confirm('此操作将删除该水表'+this.temp.deviceId+', 是否继续?', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(() => {
          deleteWaterMeter(this.temp).then(() => {
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
