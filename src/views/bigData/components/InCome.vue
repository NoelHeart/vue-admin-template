<template>
  <div class="inComeChart" style="height: 300px">
  </div>
</template>

<script>
  import { getInComeChart } from '@/api/bigDataScreen'
  import echarts from 'echarts'
  require('echarts/theme/macarons') // echarts theme
  import { debounce } from '@/utils'
  export default {
    name: "in-come",
    data(){
      return {
        list:null,
        chart: null,
        xDataNum:6,
        xData1:['2019-1','2019-2','2019-3','2019-4','2019-5','2019-6'],
        yData1:[],
        yData2:[],
      }
    },
    created(){
      this.getInComeChartData()
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
      getInComeChartData(){
        getInComeChart().then(response => {
          this.list=response.data.data.content
          const xxxData1=[]
          const yyyData1=[]
          const yyyData2=[]
          for (const v of this.list){
            xxxData1.push(v.months)
            yyyData1.push(v.incomes)
            yyyData2.push(v.households)
          }
          this.xData1=xxxData1
          this.yData1=yyyData1
          this.yData2=yyyData2
          this.$nextTick(() => { this.initInComeChart() })
          this.__resizeHandler = debounce(() => {
            if (this.chart) {
              this.chart.resize()
            }
          }, 100)
          window.addEventListener('resize', this.__resizeHandler)
        })
      },
      initInComeChart(){
        const xxData1=this.xData1
        const yyData1=this.yData1
        const yyData2=this.yData2
        this.chart = echarts.init(this.$el, 'macarons')
        this.chart.setOption({
          title: {
            text: '收支情况',
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
            data: ['收入', '支出']
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
            name:'单位/万元',
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
              name: '收入',
              type: 'line',
              symbol: 'circle',
              smooth:false,
              data: yyData1
            },
            {
              name: '支出',
              type: 'line',
              symbol: 'circle',
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
