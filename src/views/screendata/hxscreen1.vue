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
      <el-table-column min-width="200px" label="时间">
        <template slot-scope="scope">
          <span>{{ scope.row.times }}</span>
        </template>
      </el-table-column>
      <el-table-column align="center" label="1号楼用电量" >
        <template slot-scope="scope">
          <span>{{ scope.row.build1Use }}</span>
        </template>
      </el-table-column>
      <el-table-column align="center" label="2号楼用电量" >
        <template slot-scope="scope">
          <span>{{ scope.row.build2Use }}</span>
        </template>
      </el-table-column>
      <el-table-column align="center" label="3号楼用电量" >
        <template slot-scope="scope">
          <span>{{ scope.row.build3Use}}</span>
        </template>
      </el-table-column>
      <el-table-column align="center" label="1号楼用水量" >
        <template slot-scope="scope">
          <span>{{ scope.row.build1Wateruse}}</span>
        </template>
      </el-table-column>
      <el-table-column align="center" label="2号楼用水量" >
        <template slot-scope="scope">
          <span>{{ scope.row.build2Wateruse}}</span>
        </template>
      </el-table-column>
      <el-table-column align="center" label="3号楼用水量" >
        <template slot-scope="scope">
          <span>{{ scope.row.build3Wateruse}}</span>
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
        <el-form-item label="1号楼用电量" prop="build1Use">
          <el-input v-model="temp.build1Use"/>
        </el-form-item>
        <el-form-item label="2号楼用电量" prop="build2Use">
          <el-input v-model="temp.build2Use"/>
        </el-form-item>
        <el-form-item label="3号楼用电量" prop="build3Use">
          <el-input v-model="temp.build3Use"/>
        </el-form-item>
        <el-form-item label="1号楼用水量" prop="build1Wateruse">
          <el-input v-model="temp.build1Wateruse" />
        </el-form-item>
        <el-form-item label="2号楼用水量" prop="build2Wateruse">
          <el-input v-model="temp.build2Wateruse" />
        </el-form-item>
        <el-form-item label="3号楼用水量" prop="build3Wateruse">
          <el-input v-model="temp.build3Wateruse" />
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
  import { getHxscreenMapList, addHxscreenMap, deleteHxscreenMap } from '@/api/hxscreen'
  import waves from '@/directive/waves' // Waves directive
  import Pagination from '@/components/Pagination' // Secondary package based on el-pagination
  export default {
    name: "hxscreen1",
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
          build1Use:undefined,
          build2Use:undefined,
          build3Use:undefined,
          build1Wateruse:undefined,
          build2Wateruse:undefined,
          build3Wateruse:undefined
        },
        dialogFormVisible1:false,
        rules: {
          build1Use:[{required:true}],
          build2Use:[{required:true}],
          build3Use:[{required:true}],
          build1Wateruse:[{required:true}],
          build2Wateruse:[{required:true}],
          build3Wateruse:[{required:true}]
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
        getHxscreenMapList(requestData).then(response => {
          this.list = response.data.data.content.list
          this.total = response.data.data.content.total
          this.listLoading = false
        })
      },
      resetTemp() {
        this.temp = {
          id:undefined,
          times:undefined,
          build1Use:undefined,
          build2Use:undefined,
          build3Use:undefined,
          build1Wateruse:undefined,
          build2Wateruse:undefined,
          build3Wateruse:undefined
        }
      },
      handleCreate(){
        this.resetTemp()
        this.dialogFormVisible1=true
      },
      createData(){
        this.$refs['dataForm1'].validate((valid) => {
          if (valid) {
            addHxscreenMap(this.temp).then(() => {
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
          deleteHxscreenMap(this.temp).then(() => {
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
