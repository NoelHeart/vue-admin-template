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
      <el-table-column min-width="150px" label="时间">
        <template slot-scope="scope">
          <span>{{ scope.row.times }}</span>
        </template>
      </el-table-column>
      <el-table-column align="center" label="月用电" >
        <template slot-scope="scope">
          <span>{{ scope.row.eleMon }}</span>
        </template>
      </el-table-column>
      <el-table-column align="center" label="年用电" >
        <template slot-scope="scope">
          <span>{{ scope.row.eleYear }}</span>
        </template>
      </el-table-column>
      <el-table-column align="center" label="月用水" >
        <template slot-scope="scope">
          <span>{{ scope.row.waterMon}}</span>
        </template>
      </el-table-column>
      <el-table-column align="center" label="年用水" >
        <template slot-scope="scope">
          <span>{{ scope.row.waterYear}}</span>
        </template>
      </el-table-column>
      <el-table-column align="center" label="月综合耗能" >
        <template slot-scope="scope">
          <span>{{ scope.row.contentMon}}</span>
        </template>
      </el-table-column>
      <el-table-column align="center" label="年综合耗能" >
        <template slot-scope="scope">
          <span>{{ scope.row.contentYear}}</span>
        </template>
      </el-table-column>
      <el-table-column align="center" label="操作" width="230" class-name="small-padding fixed-width">
        <template slot-scope="scope">
          <el-button type="danger" size="small" @click="handleDelete(scope.row)">删除</el-button>
        </template>
      </el-table-column>
    </el-table>
    <pagination v-show="total>0" :total="total" :page.sync="listQuery.pageNum" :limit.sync="listQuery.pageSize" @pagination="getList" />
    <el-dialog title="创建" :visible.sync="dialogFormVisible1">
      <el-form ref="dataForm1" :rules="rules" :model="temp" label-position="left" label-width="100px" style="width: 400px; margin-left:50px;">
        <el-form-item label="月用电" prop="eleMon">
          <el-input v-model="temp.eleMon"/>
        </el-form-item>
        <el-form-item label="年用电" prop="eleYear">
          <el-input v-model="temp.eleYear"/>
        </el-form-item>
        <el-form-item label="月用水" prop="waterMon">
          <el-input v-model="temp.waterMon"/>
        </el-form-item>
        <el-form-item label="年用水" prop="waterYear">
          <el-input v-model="temp.waterYear" />
        </el-form-item>
        <el-form-item label="月综合耗能" prop="contentMon">
          <el-input v-model="temp.contentMon" />
        </el-form-item>
        <el-form-item label="年综合耗能" prop="contentYear">
          <el-input v-model="temp.contentYear" />
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button type="primary" @click="createData()">创建</el-button>
        <el-button @click="dialogFormVisible1 = false">取消</el-button>
      </div>
    </el-dialog>
  </div>
</template>

<script>
  import { getHxscreen21List, addHxscreen21, deleteHxscreen21 } from '@/api/hxscreen'
  import waves from '@/directive/waves' // Waves directive
  import Pagination from '@/components/Pagination' // Secondary package based on el-pagination
  export default {
    name: "hxscreen6",
    components: { Pagination },
    directives: { waves },
    data(){
      return{
        list:null,
        total:0,
        listLoading: true,
        listQuery: {
          pageNum: 1,
          pageSize: 20
        },
        temp: {
          id:undefined,
          times:undefined,
          eleMon:undefined,
          eleYear:undefined,
          waterMon:undefined,
          waterYear:undefined,
          contentMon:undefined,
          contentYear:undefined
        },
        dialogFormVisible1:false,
        rules: {
          eleMon:[{required:true}],
          eleYear:[{required:true}],
          waterMon:[{required:true}],
          waterYear:[{required:true}],
          contentMon:[{required:true}],
          contentYear:[{required:true}]
        }
      }
    },
    created() {
      this.getList()
    },
    methods: {
      getList() {
        this.listLoading = true
        const requestData = Object.assign({}, this.listQuery)
        getHxscreen21List(requestData).then(response => {
          this.list = response.data.data.content.list
          this.total = response.data.data.content.total
          this.listLoading = false
        })
      },
      resetTemp() {
        this.temp = {
          id:undefined,
          times:undefined,
          eleMon:undefined,
          eleYear:undefined,
          waterMon:undefined,
          waterYear:undefined,
          contentMon:undefined,
          contentYear:undefined
        }
      },
      handleCreate(){
        this.resetTemp()
        this.dialogFormVisible1=true
      },
      createData(){
        this.$refs['dataForm1'].validate((valid) => {
          if (valid) {
            addHxscreen21(this.temp).then(() => {
              this.getList()
              this.dialogFormVisible1 = false
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
          deleteHxscreen21(this.temp).then(() => {
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
