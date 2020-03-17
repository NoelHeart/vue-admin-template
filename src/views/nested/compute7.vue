<template>
  <div class="app-container">
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
      <el-table-column align="center" label="操作" width="150" class-name="small-padding fixed-width">
        <template slot-scope="scope">
          <el-button type="danger" size="small" @click="handleDelete(scope.row)">删除</el-button>
        </template>
      </el-table-column>
    </el-table>
    <pagination v-show="total>0" :total="total" :page.sync="listQuery.pageNum" :limit.sync="listQuery.pageSize" @pagination="getList" />
  </div>
</template>

<script>
  import { getEmFirmMonth, deleteEmFirmMonth } from '@/api/compute'
  import waves from '@/directive/waves' // Waves directive
  import Pagination from '@/components/Pagination' // Secondary package based on el-pagination
  export default {
    name: "compute7",
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
          scale:undefined,
          updateTime:undefined,
          dateMonth:undefined,
          firmName:undefined
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
        getEmFirmMonth(requestData).then(response => {
          this.list = response.data.data.content.list
          this.total = response.data.data.content.total
          this.listLoading = false
        })
      },
      handleDelete(row){
        this.temp = Object.assign({}, row) // copy obj
        this.$confirm('此操作将删除该条记录, 是否继续?', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(() => {
          deleteEmFirmMonth(this.temp).then(() => {
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
