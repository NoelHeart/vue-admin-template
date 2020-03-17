<template>
  <div class="app-container">
    <div class="filter-container">
      <el-input v-model="listQuery.firm" placeholder="公司" style="width: 200px;" class="filter-item" @keyup.enter.native="handleFilter" />
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
      <el-table-column align="center" label="ID" width="80">
        <template slot-scope="scope">
          <span>{{ scope.row.id }}</span>
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
    <pagination v-show="total>0" :total="total" :page.sync="listQuery.page" :limit.sync="listQuery.limit" @pagination="getList" />

    <el-dialog :title="textMap[dialogStatus]" :visible.sync="dialogFormVisible">
      <el-form ref="dataForm" :rules="rules" :model="temp" label-position="left" label-width="100px" style="width: 400px; margin-left:50px;">
        <el-form-item label="公司名称" prop="firm">
          <el-input v-model="temp.firm" />
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="dialogFormVisible = false">取消</el-button>
        <el-button type="primary" @click="dialogStatus==='create'?createData():updateData()">确认</el-button>
      </div>
    </el-dialog>
  </div>
</template>

<script>
  import { getFrimList, updateFirm, createFirm ,deleteFirm} from '@/api/honeycomb'
  import waves from '@/directive/waves' // Waves directive
  import Pagination from '@/components/Pagination' // Secondary package based on el-pagination
    export default {
      name: "honeycomb1",
      components: { Pagination },
      directives: { waves },
      data(){
        return{
          tableKey: 0,
          list:null,
          total: 0,
          listLoading: true,
          listQuery: {
            page: 1,
            limit: 20,
            firm:undefined
          },
          temp: {
            id: undefined,
            firm:''
          },
          dialogFormVisible: false,
          dialogStatus: '',
          textMap: {
            update: '编辑',
            create: '创建'
          },
          rules: {
            firm:[{ required: true, message: 'firm is required', trigger: 'change' }]
          },
        }
      },
      created() {
        this.getList()
      },
      methods: {
        getList() {
          this.listLoading = true
          getFrimList(this.listQuery.page,this.listQuery.limit,this.listQuery.firm).then(response => {
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
            id: undefined,
            firm:''
          }
        },
        handleCreate() {
          this.resetTemp()
          this.dialogStatus = 'create'
          this.dialogFormVisible = true
          this.$nextTick(() => {
            this.$refs['dataForm'].clearValidate()
          })
        },
        createData() {
          this.$refs['dataForm'].validate((valid) => {
            if (valid) {
              createFirm(this.temp).then(() => {
                this.list.unshift(this.temp)
                this.dialogFormVisible = false
                this.$notify({
                  title: '成功',
                  message: '创建成功',
                  type: 'success',
                  duration: 2000
                })
              })
            }
          })
        },
        handleUpdate(row){
          this.temp = Object.assign({}, row) // copy obj
          this.dialogStatus = 'update'
          this.dialogFormVisible = true
          this.$nextTick(() => {
            this.$refs['dataForm'].clearValidate()
          })
        },
        updateData() {
          this.$refs['dataForm'].validate((valid) => {
            if (valid) {
              const tempData = Object.assign({}, this.temp)
              updateFirm(tempData).then(() => {
                for (const v of this.list) {
                  if (v.id === this.temp.id) {
                    const index = this.list.indexOf(v)
                    this.list.splice(index, 1, this.temp)
                    break
                  }
                }
                this.dialogFormVisible = false
                this.$notify({
                  title: '成功',
                  message: '更新成功',
                  type: 'success',
                  duration: 2000
                })
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
            deleteFirm(this.temp.id).then(() => {
              for (const v of this.list) {
                if (v.id === this.temp.id) {
                  const index = this.list.indexOf(v)
                  this.list.splice(index, 1)
                  break
                }
              }
              this.$message({
                type: 'success',
                message: '删除成功!'
              });
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
