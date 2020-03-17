<template>
  <div class="app-container">
    <div class="filter-container">
      <el-button class="filter-item" style="margin-left: 10px;" type="primary" icon="el-icon-edit" @click="getEmChart">上个月总体用电量变化图</el-button>
    </div>
    <el-table
      v-loading="listLoading"
      :data="list"
      border
      fit
      highlight-current-row
      style="width: 100%"
    >
      <el-table-column min-width="200px" label="月份">
        <template slot-scope="scope">
          <span>{{ scope.row.dateMonth }}</span>
        </template>
      </el-table-column>
      <el-table-column align="center" label="楼号" >
        <template slot-scope="scope">
          <span>{{ scope.row.apartmentId }}</span>
        </template>
      </el-table-column>
      <el-table-column align="center" label="房间号" >
        <template slot-scope="scope">
          <span>{{ scope.row.roomId }}</span>
        </template>
      </el-table-column>
      <el-table-column min-width="200px" label="企业名称" >
        <template slot-scope="scope">
          <span>{{ scope.row.firmName}}</span>
        </template>
      </el-table-column>
      <el-table-column align="center" label="用量" >
        <template slot-scope="scope">
          <span>{{ scope.row.scale}}</span>
        </template>
      </el-table-column>
      <el-table-column min-width="200px" label="最后更新时间" >
        <template slot-scope="scope">
          <span>{{ scope.row.updateTime}}</span>
        </template>
      </el-table-column>
      <el-table-column align="center" label="操作" width="230" class-name="small-padding fixed-width">
        <template slot-scope="scope">
          <el-button type="primary" size="small" icon="el-icon-edit" @click="handleDetail(scope.row)">查看详情</el-button>
          <el-button type="danger" size="small" @click="handleDelete(scope.row)">删除</el-button>
        </template>
      </el-table-column>
    </el-table>
    <pagination v-show="total>0" :total="total" :page.sync="listQuery.pageNum" :limit.sync="listQuery.pageSize" @pagination="getList" />
    <el-dialog title="详情" :visible.sync="dialogFormVisible1">
      <el-form ref="dataForm1" :rules="rules" :model="temp" label-position="left" label-width="100px" style="width: 400px; margin-left:50px;">
        <el-form-item label="月份" prop="scale">
          <el-input v-model="temp.dateMonth" :disabled="true"/>
        </el-form-item>
        <el-form-item label="楼号" prop="scale">
          <el-input v-model="temp.apartmentId" :disabled="true"/>
        </el-form-item>
        <el-form-item label="房间号" prop="scale">
          <el-input v-model="temp.roomId" :disabled="true"/>
        </el-form-item>
        <el-form-item label="企业名称" prop="scale">
          <el-input v-model="temp.firmName" :disabled="true"/>
        </el-form-item>
        <el-form-item label="用量" prop="scale">
          <el-input v-model="temp.scale" :disabled="true"/>
        </el-form-item>
        <el-form-item label="最后更新时间" prop="scale">
          <el-input v-model="temp.updateTime" :disabled="true"/>
        </el-form-item>
        <el-form-item label="数据源" prop="scale">
          <el-input v-model="temp.device" :disabled="true"/>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="dialogFormVisible1 = false">取消</el-button>
      </div>
    </el-dialog>
    <el-dialog width="100%"  :visible.sync="dialogFormVisible3">
      <last-month-chart width="100%" />
    </el-dialog>
  </div>
</template>

<script>
  import LastMonthChart from '../dashboard/admin/components/LastMonthChart'
  import { getEmMonthRecordList, deleteEmMonthRecord } from '@/api/compute'
  import waves from '@/directive/waves' // Waves directive
  import Pagination from '@/components/Pagination' // Secondary package based on el-pagination
  export default {
    name: "compute3",
    components: {
      Pagination,
      LastMonthChart
    },
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
          scale:undefined,
          updateTime:undefined,
          device:undefined,
          apartmentId:undefined,
          roomId:undefined,
          dateMonth:undefined,
          firmName:undefined
        },
        dialogFormVisible1:false,
        dialogFormVisible3:false,
        rules: {
          device:[{required:true}],
          scale:[{required:true}]
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
        getEmMonthRecordList(requestData).then(response => {
          this.list = response.data.data.content.list
          this.total = response.data.data.content.total
          this.listLoading = false
        })
      },
      handleDetail(row){
        this.temp=Object.assign({}, row)
        this.dialogFormVisible1=true
      },
      getEmChart(){
        this.dialogFormVisible3=true
      },
      handleDelete(row){
        this.temp = Object.assign({}, row) // copy obj
        this.$confirm('此操作将删除该条记录, 是否继续?', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(() => {
          deleteEmMonthRecord(this.temp).then(() => {
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
