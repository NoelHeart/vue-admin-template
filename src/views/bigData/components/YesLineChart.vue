<template>
  <div class="YesLineChart" style="height: 280px">
  </div>
</template>

<script>
  import { getYesTodUseData } from '@/api/bigDataScreen'
  import echarts from 'echarts'
  require('echarts/theme/macarons') // echarts theme
  import { debounce } from '@/utils'
  export default {
    name: "yes-line-chart",
    data(){
      return {
        yesList:null,
        todList:null,
        chart: null,
        xDataNum:6,
        xData1:['1时','3时','5时','7时','9时','11时','13时','15时','17时','19时','21时','23时'],
        yData1:[],
        yData2:[],
      }
    },
    created(){
      this.getYesTodChartData()
    },
    beforeDestroy() {
      if (!this.chart) {
        return
      }
      window.removeEventListener('resize', this.__resizeHandler)
      this.chart.dispose()
      this.chart = null
    },
    methods: {
      getYesTodChartData(){
        getYesTodUseData().then(response => {
          this.yesList=response.data.data.yesList
          this.todList=response.data.data.todList
          const yyyData1=[]
          for (const v of this.yesList){
            yyyData1.push(v.yesterUse)
          }
          const yyyData2=[]
          for (const v of this.todList){
            yyyData2.push(v.todayUse)
          }
          this.yData1=yyyData1
          this.yData2=yyyData2
          this.$nextTick(() => { this.initYesLineChart() })
          this.__resizeHandler = debounce(() => {
            if (this.chart) {
              this.chart.resize()
            }
          }, 100)
          window.addEventListener('resize', this.__resizeHandler)
        })
      },
      initYesLineChart(){
        this.chart = echarts.init(this.$el, 'macarons')
        const xxData1=this.xData1
        const yyData1=this.yData1
        const yyData2=this.yData2
        this.chart.setOption({
          title: {
            text: '昨日今日用电量折线图',
            x: 'center',
            top: '20',
            textStyle: {
              color: '#fff',
              fontSize: '16'
            }
          },
          grid: {
            borderWidth: 0,
            top: 80,
            textStyle: {
              color: '#fff'
            }
          },
          legend: {
            left:'right',
            top: 25,
            textStyle: {
              color: '#77a3f1'
            },
            data: ['昨日', '今日']
          },
          calculable: true,
          xAxis: [{
            name:'日期',
            type: 'category',
            axisLine: {
              lineStyle: {
                color: '#77a3f1'
              }
            },
            splitLine: {
              show: false
            },
            axisTick: {
              show: false
            },
            splitArea: {
              show: false
            },
            axisLabel: {
              interval: 0

            },
            data: xxData1
          }],
          yAxis: [{
            name:'单位/kw·h',
            type: 'value',
            splitLine: {
              show: false
            },
            axisLine: {
              lineStyle: {
                color: '#77a3f1'
              }
            },
            axisTick: {
              show: false
            },
            axisLabel: {
              interval: 0
            },
            splitArea: {
              show: false
            }
          }],
          series: [
            {
              name: '昨日',
              type: 'line',
              symbol: 'circle',
              itemStyle:{
                normal:{
                  color:'#ffac28'
                }
              },
              smooth:false,
              data: yyData1
            },
            {
              name: '今日',
              type: 'line',
              symbol: 'circle',
              itemStyle:{
                normal:{
                  color:'#00ff9f'
                }
              },
              smooth:false,
              data: yyData2
            }
          ]
        })
      }
    },
  }
</script>

<style scoped>

</style>
