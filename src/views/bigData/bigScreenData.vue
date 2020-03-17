<template>
  <div id="big-screen" class="bigScreenData">
    <header>
      <el-row type="flex" align="bottom">
        <el-col :span="8">
          <el-row class="header-left-time">
            <el-col :span="6" :offset="6">{{date}}</el-col>
            <el-col :span="3">{{time}}</el-col>
            <el-col :span="3">{{week}}</el-col>
          </el-row>
        </el-col>
        <el-col :span="8">
          <h1>园区综合信息可视化平台</h1>
        </el-col>
        <el-col :span="8">
          <el-row class="header-right-info">
            <el-col :span="4" :offset="6">
              城市：{{city}}
            </el-col>
            <el-col :span="2">
              {{wea}}
            </el-col>
            <el-col :span="2">
              {{temperature}}℃
            </el-col>
          </el-row>
        </el-col>
      </el-row>
    </header>
    <section>
      <el-row :gutter="20">
        <el-col :span="6">
          <div class="card m-b">
            <div class="card-property">
              <el-table
                :data="tableData"
                highlight-current-row
                width="100%"
                stripe>
                <el-table-column label="分类" width="50px">
                  <template slot-scope="scope">
                    <span>{{ scope.row.dataType }}</span>
                  </template>
                </el-table-column>
                <el-table-column label="当月耗能" >
                  <template slot-scope="scope">
                  <span>{{ scope.row.monthUse }}</span>
                  </template>
                </el-table-column>
                <el-table-column label="当年耗能" >
                  <template slot-scope="scope">
                  <span>{{ scope.row.yearUse }}</span>
                  </template>
                </el-table-column>
                <el-table-column label="单位" >
                  <template slot-scope="scope">
                  <span>{{ scope.row.unit }}</span>
                  </template>
                </el-table-column>
              </el-table>
            </div>
          </div>
          <div class="chart">
            <div class="chart-property">
              <in-come/>
            </div>
          </div>
          <div class="pieChart">
            <energy-chart/>
          </div>
          <div class="yesLineChart">
            <yes-line-chart/>
          </div>
        </el-col>
        <el-col :span="12">
          <div class="card m-b">
            <div class="card-property">
              <map-gaode/>
            </div>
          </div>
          <div>
            <more-pie-chart/>
          </div>
          <div>
            <tong-ji-chart/>
          </div>
        </el-col>
        <el-col :span="6">
          <div style="height: 750px">
            <more-gauge/>
          </div>
          <div class="card">
            <warnning-table/>
          </div>
        </el-col>
      </el-row>
    </section>
  </div>
</template>

<script>
  import moment from '@/utils/date.js';
  import MapGaode from './components/MapGaode'
  import InCome from './components/InCome'
  import EnergyChart from './components/EnergyChart'
  import MorePieChart from './components/MorePieChart'
  import YesLineChart from './components/YesLineChart'
  import TongJiChart from './components/TongJiChart'
  import WarnningTable from './components/WarnningTable'
  import MoreGauge from './components/MoreGauge'
  import ElRow from "element-ui/packages/row/src/row"
  import { getTotalHaoNeng } from '@/api/bigDataScreen'

  export default {
    name: 'Home',
    components:{
      WarnningTable,
      ElRow,
      MapGaode,
      InCome,
      EnergyChart,
      MorePieChart,
      YesLineChart,
      TongJiChart,
      MoreGauge
    },
    data() {
      return {
        week:'',
        city:'杭州',
        wea:'',
        temperature:'',
        weatherData:null,
        date:moment.getMomentDate(),
        time: moment.getMomentTime(), // 小时分钟秒
        tableData: null
      };
    },
    created(){
      this.getWeatherData()
      this.getTotalHaoNengTable()
    },
    computed: {},
    async mounted() {
      this.timer = setInterval(() => {
        this.time = moment.getMomentTime();
      }, 1000);
    },
    beforeDestroy() {
      this.timer && clearInterval(this.timer);
    },
    methods: {
      getTotalHaoNengTable(){
        getTotalHaoNeng().then(response => {
          this.tableData=response.data.data.list
        })
      },
      getWeatherData(){
        this.$ajax.get('https://www.tianqiapi.com/api/?version=v6').then(res => {
          this.week=res.data.week
          this.city=res.data.city
          this.wea=res.data.wea
          this.temperature=res.data.tem
        }).catch(() =>{
          this.$message({
            type: 'warning',
            message: '获取天气数据异常'
          })
        })
      }
    }
  };
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang='scss'>
  @import "../../styles/mixin.scss";
  .bigScreenData {
    min-height: 100%;
    background-image: url(/src/assets/bigScreen/bg.png);
    background-repeat: no-repeat;
    background-size: 100% 100%;
    background-color: #121b2c;
    font-family: MicrosoftYaHei;
    color: #77a3f1;
    font-size: 14px;
    & > header {
      background: url(/src/assets/bigScreen/top_title_bg.png) no-repeat;
      background-size: 100% 135px;
      background-position: 0px -45px;

      h1 {
        position: relative;
        z-index: 10;
        margin: 0;
        padding: 29px 0;
        text-align: center;
        color: #fff;
        font-family: "微软雅黑";
        background-image: -webkit-gradient(
            linear,
            0 0,
            0 bottom,
            from(#a9caf3),
            to(#f5f9ff)
        );
        -webkit-background-clip: text;
        -webkit-text-fill-color: transparent;
      }
      .header-left-time {
        background: url(/src/assets/bigScreen/header-left-bg.png) no-repeat;
        background-size: 100%;
        padding: 7px;
      }
      .header-right-info {
        background: url(/src/assets/bigScreen/header-right-bg.png) no-repeat;
        background-size: 100%;
        padding: 7px;
        span {
          color: #ff9b43;
        }
      }
    }

    section {
      padding: 20px;
      .card {
        background: rgba(29, 39, 65, 0.8);
        box-shadow: 1px 0px 10px rgba(14, 153, 251, 0.5) inset;
        border: 1px #296098 solid;
        .card-property {
          & > .card {
            padding: 0 15px 15px 15px;
          }
        }
      }
  }
  }
  .el-row {
    margin-bottom: 15px;
    &:last-child {
      margin-bottom: 0;
    }
  }
</style>

