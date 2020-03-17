<template>
  <div class="app-container">
    <div class="filter-container">
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
      <el-table-column align="center" label="楼号">
        <template slot-scope="scope">
          <span>{{ scope.row.apartmentId }}</span>
        </template>
      </el-table-column>
      <el-table-column align="center" label="房间号" >
        <template slot-scope="scope">
          <span>{{ scope.row.roomId }}</span>
        </template>
      </el-table-column>
      <el-table-column min-width="300px" label="数据时间" >
        <template slot-scope="scope">
          <span>{{ scope.row.dataTime }}</span>
        </template>
      </el-table-column>
      <el-table-column min-width="300px" label="更新时间" >
        <template slot-scope="scope">
          <span>{{ scope.row.updateTime}}</span>
        </template>
      </el-table-column>
      <el-table-column align="center" label="刻度" >
        <template slot-scope="scope">
          <span>{{ scope.row.scale}}</span>
        </template>
      </el-table-column>
      <el-table-column align="center" label="所属公司" >
        <template slot-scope="scope">
          <span>{{ scope.row.firm}}</span>
        </template>
      </el-table-column>
      <el-table-column min-width="300px" label="数据源">
        <template slot-scope="scope">
          <span>水表 {{ scope.row.deviceId}}</span>
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
    <el-dialog title="创建水表每日记录" :visible.sync="dialogFormVisible1">
      <el-form ref="dataForm1" :rules="rules" :model="temp" label-position="left" label-width="100px" style="width: 400px; margin-left:50px;">
        <el-form-item label="数据源">
          <el-select v-model="temp.deviceId" filterable clearable style="width: 300px" class="filter-item">
            <el-option v-for="item in WmList"
                       :key="item.deviceId"
                       :label="item.deviceId"
                       :value="item.deviceId" />
          </el-select>
        </el-form-item>
        <el-form-item label="刻度" prop="scale">
          <el-input v-model="temp.scale"/>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="dialogFormVisible1 = false">取消</el-button>
        <el-button type="primary" @click="createData()">创建</el-button>
      </div>
    </el-dialog>
    <el-dialog title="更新水表每日记录" :visible.sync="dialogFormVisible2">
      <el-form ref="dataForm2" :rules="rules" :model="temp" label-position="left" label-width="100px" style="width: 400px; margin-left:50px;">
        <el-form-item label="数据源">
          <el-select v-model="temp.deviceId" filterable :placeholder="temp.deviceId" clearable style="width: 300px" class="filter-item">
            <el-option v-for="item in WmList"
                       :key="item.deviceId"
                       :label="item.deviceId"
                       :value="item.deviceId" />
          </el-select>
        </el-form-item>
        <el-form-item label="刻度" prop="scale">
          <el-input v-model="temp.scale"/>
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
  import { getWmRecordList, updateWmRecord, createWmRecord, deleteWmRecord, WmList } from '@/api/honeycomb'
  import waves from '@/directive/waves' // Waves directive
  import Pagination from '@/components/Pagination' // Secondary package based on el-pagination
  export default {
    name: "honeycomb9",
    components: { Pagination },
    directives: { waves },
    data(){
      return{
        list:null,
        WmList:null,
        total:0,
        listLoading: true,
        listQuery: {
          pageNum: 1,
          pageSize: 20
        },
        temp: {
          id:undefined,
          dataTime:undefined,
          updateTime:undefined,
          scale:undefined,
          apartmentId:undefined,
          roomId:undefined,
          deviceId:undefined,
          firm:undefined
        },
        dialogFormVisible1:false,
        dialogFormVisible2:false,
        rules: {
          deviceId:[{required:true}],
          scale:[{required:true}]
        }
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
        getWmRecordList(requestData).then(response => {
          this.list = response.data.data.content.list
          this.total = response.data.data.content.total
          this.listLoading = false
        })
      },
      getEmList(){
        WmList().then(response => {
          this.WmList = response.data.data.allWmList
        })
      },
      handleFilter() {
        this.listQuery.page = 1
        this.getList()
      },
      resetTemp() {
        this.temp = {
          id:undefined,
          dataTime:undefined,
          updateTime:undefined,
          scale:undefined,
          apartmentId:undefined,
          roomId:undefined,
          deviceId:undefined,
          firm:undefined
        }
      },
      handleCreate(){
        this.resetTemp()
        this.dialogFormVisible1=true
      },
      createData(){
        this.$refs['dataForm1'].validate((valid) => {
          if (valid) {
            createWmRecord(this.temp).then(() => {
              this.getList()
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
            updateWmRecord(tempData).then(() => {
              this.getList()
              this.dialogFormVisible2 = false
            })
          }
        })
      },
      handleDelete(row){
        this.temp = Object.assign({}, row) // copy obj
        this.$confirm('此操作将删除该条记录, 是否继续?', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(() => {
          deleteWmRecord(this.temp).then(() => {
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
