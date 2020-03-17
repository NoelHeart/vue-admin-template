<template>
  <div class="app-container">
    <div class="filter-container">
      <el-input v-model="listQuery.firm" placeholder="公司名称" style="width: 200px;" class="filter-item" @keyup.enter.native="handleFilter" />
      <el-select v-model="listQuery.apartmentId" placeholder="楼层号" clearable style="width: 90px" class="filter-item">
        <el-option v-for="item in apartmentIdList" :key="item" :label="item" :value="item" />
      </el-select>
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
      <el-table-column align="center" label="楼层" width="80">
        <template slot-scope="scope">
          <span>{{ scope.row.apartmentId }}</span>
        </template>
      </el-table-column>
      <el-table-column align="center" label="房间号" width="80">
        <template slot-scope="scope">
          <span>{{ scope.row.roomId }}</span>
        </template>
      </el-table-column>
      <el-table-column min-width="300px" label="公司">
        <template slot-scope="scope">
          <span>{{ scope.row.firm }}</span>
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
    <el-dialog :title="textMap[dialogStatus]" :visible.sync="dialogFormVisible">
      <el-form ref="dataForm" :rules="rules" :model="temp" label-position="left" label-width="100px" style="width: 400px; margin-left:50px;">
        <el-form-item label="楼层号" prop="apartmentId">
          <el-input v-model="temp.apartmentId" :disabled="isDisabled"/>
        </el-form-item>
        <el-form-item label="房间号" prop="roomId">
          <el-input v-model="temp.roomId" :disabled="isDisabled"/>
        </el-form-item>
        <el-form-item v-if="showOldFirm" label="所属公司">
          <el-input v-model="firmName" :disabled="isDisabled"/>
        </el-form-item>
        <el-select v-model="temp.firm" filterable placeholder="新的公司" clearable style="width: 300px" class="filter-item">
          <el-option v-for="item in firmList"
                     :key="item.firm"
                     :label="item.firm"
                     :value="item.firm" />
        </el-select>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="dialogFormVisible = false">取消</el-button>
        <el-button type="primary" @click="dialogStatus==='create'?createData():updateData()">确认</el-button>
      </div>
    </el-dialog>
  </div>
</template>

<script>
  import { getFirmRoomList, getApartmentIdList, createFirmApart, updateFirmApart, getAllFrimList, deleteFirmApart } from '@/api/honeycomb'
  import waves from '@/directive/waves' // Waves directive
  import Pagination from '@/components/Pagination' // Secondary package based on el-pagination
  export default {
    name: "honeycomb2",
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
          firm:undefined,
          apartmentId:undefined
        },
        apartmentIdList:null,
        firmList:null,
        dialogFormVisible: false,
        dialogStatus: '',
        temp: {
          id: undefined,
          apartmentId:undefined,
          roomId:undefined,
          firm:undefined
        },
        textMap: {
          update: '编辑',
          create: '创建'
        },
        rules: {
          apartmentId:[{required:true}],
          roomId:[{required:true}],
          firm:[{ required: true, message: 'firm is required', trigger: 'change' }]
        },
        isDisabled:false,
        showOldFirm:false,
        firmName:undefined
      }
    },
    created() {
      this.getList()
      this.getApartmentList()
      this.getFirmNameList()
    },
    methods: {
      getList() {
        this.listLoading = true
        const requestData = Object.assign({}, this.listQuery)
        getFirmRoomList(requestData).then(response => {
          this.list = response.data.data.content.list
          this.total = response.data.data.content.total
          this.listLoading = false
        })
      },
      getFirmNameList(){
        getAllFrimList().then(response => {
          this.firmList = response.data.data.allFrimList
        })
      },
      getApartmentList(){
        getApartmentIdList().then(response => {
          this.apartmentIdList=response.data.data.ApartmentIdList
        })
      },
      handleFilter() {
        this.listQuery.page = 1
        this.getList()
      },
      resetTemp() {
        this.temp = {
          id: undefined,
          apartmentId:undefined,
          roomId:undefined,
          firm:undefined
        }
      },
      handleCreate() {
        this.resetTemp()
        this.dialogStatus = 'create'
        this.dialogFormVisible = true
        this.isDisabled=false
        this.showOldFirm=false
        this.$nextTick(() => {
          this.$refs['dataForm'].clearValidate()
        })
      },
      handleUpdate(row){
        this.temp = Object.assign({}, row) // copy obj
        this.firmName=this.temp.firm
        this.temp.firm=''
        this.dialogStatus = 'update'
        this.dialogFormVisible = true
        this.isDisabled=true
        this.showOldFirm=true
        this.$nextTick(() => {
          this.$refs['dataForm'].clearValidate()
        })
      },
      createData() {
        this.$refs['dataForm'].validate((valid) => {
          if (valid) {
            createFirmApart(this.temp).then(() => {
              this.list.unshift(this.temp)
              this.dialogFormVisible = false
            })
          }
        })
      },
      updateData() {
        this.$refs['dataForm'].validate((valid) => {
          if (valid) {
            const tempData = Object.assign({}, this.temp)
            updateFirmApart(tempData).then(() => {
              for (const v of this.list) {
                if (v.id === this.temp.id) {
                  const index = this.list.indexOf(v)
                  this.list.splice(index, 1, this.temp)
                  break
                }
              }
              this.dialogFormVisible = false
            })
          }
        })
      },
      handleDelete(row){
        this.temp = Object.assign({}, row) // copy obj
        this.$confirm('此操作将删除'+this.temp.firm+', 是否继续?', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(() => {
          deleteFirmApart(this.temp).then(() => {
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
      }
    }
  }
</script>

<style scoped>

</style>
