<template>
  <div class="TongJiChart" style="height: 300px">
  </div>
</template>

<script>
  import { getEmWm12Data } from '@/api/bigDataScreen'
  import echarts from 'echarts'
  require('echarts/theme/macarons') // echarts theme
  import { debounce } from '@/utils'
  export default {
    name: "tong-ji-chart",
    data(){
      return {
        list:null,
        chart: null,
        xDataNum:6,
        xData1:['2018-5','2018-6','2018-7','2018-8','2018-9','2018-10','2018-11','2018-12','2019-1','2019-2','2019-3','2019-4'],
        yData1:[],
        yData2:[],
      }
    },
    created(){
      this.getTongJiChartData()
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
      getTongJiChartData(){
        getEmWm12Data().then(response => {
          this.list=response.data.data.list
          const xxxData1=[]
          const yyyData1=[]
          const yyyData2=[]
          for (const v of this.list){
            xxxData1.push(v.times)
            yyyData1.push(v.waterUse)
            yyyData2.push(v.eleUse)
          }
          this.xData1=xxxData1
          this.yData1=yyyData1
          this.yData2=yyyData2
          this.$nextTick(() => { this.initTongJiChart() })
          this.__resizeHandler = debounce(() => {
            if (this.chart) {
              this.chart.resize()
            }
          }, 100)
          window.addEventListener('resize', this.__resizeHandler)
        })
      },
      initTongJiChart(){
        this.chart = echarts.init(this.$el, 'macarons')
        const xxData1=this.xData1
        const yyData1=this.yData1
        const yyData2=this.yData2
        this.chart.setOption({
          title: {
            text: '水、电用量统计图',
            x: 'center',
            top:20,
            textStyle: {
              color: '#fff',
              fontSize: '16'
            }
          },
          legend: {
            top: 20,
            right:100,
            textStyle: {
              color: '#77a3f1'
            },
            data: ['用水量', '用电量']
          },
          grid: {
            top: 80,
            textStyle: {
              color: '#fff'
            }
          },
          calculable: true,
          xAxis: [{
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
          yAxis: [
            {
              name:'用水量/吨',
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
            },
            {
              name:'用电量/kw·h',
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
            },
          ],
          series: [
            {
              name: '用水量',
              type: 'bar',
              itemStyle:{
                normal:{
                  color:'#00a7ca'
                }
              },
              data: yyData1
            },
            {
              name: '用电量',
              type: 'bar',
              yAxisIndex: 1,
              itemStyle:{
                normal:{
                  color:'#ffd55c'
                }
              },
              data: yyData2
            }
          ]
        })
      }
    }
  }
</script>

<style scoped>

</style>
