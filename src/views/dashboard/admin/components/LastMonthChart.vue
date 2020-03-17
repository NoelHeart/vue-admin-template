<template>
  <div :id="id" :class="className" :style="{height:height,width:width}" />
</template>

<script>
  import { getLastMonthEmScaleList } from '@/api/chartManage'
  import echarts from 'echarts'
  require('echarts/theme/macarons') // echarts theme
  import { debounce } from '@/utils'

  export default {
    props: {
      className: {
        type: String,
        default: 'chart'
      },
      id: {
        type: String,
        default: 'chart'
      },
      width: {
        type: String,
        default: '200px'
      },
      height: {
        type: String,
        default: '600px'
      }
    },
    data() {
      return {
        list:null,
        chart: null,
        dayNum:31,
        echartScaleData:null,
        echartTimeData:null,
      }
    },
    created(){
      this.getEmLastMonthScaleList()
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
      getEmLastMonthScaleList(){
        getLastMonthEmScaleList().then(response => {
          this.list=response.data.data.list
          this.dayNum=response.data.data.totalDay
          const data1 = []
          for (const v of this.list){
            data1.push(v.dataDay)
          }
          const data2 = []
          for (const v of this.list){
            data2.push(v.dataScale)
          }
          this.echartScaleData=data2
          this.echartTimeData=data1
          this.$nextTick(() => { this.initChart() }) ////异步更新队列，回调函数在 DOM 更新完成后就会调用
          this.__resizeHandler = debounce(() => {
            if (this.chart) {
              this.chart.resize()
            }
          }, 100)
          window.addEventListener('resize', this.__resizeHandler)
        })
      },
      initChart() {
        const lastMonthData1=this.echartScaleData
        this.chart = echarts.init(this.$el, 'macarons')
        const xData = this.echartTimeData
        this.chart.setOption({
          backgroundColor: '#344b58',
          title: {
            text: '上月总体用电量变化图',
            x: 'center',
            top: '20',
            textStyle: {
              color: '#fff',
              fontSize: '22'
            },
            subtextStyle: {
              color: '#90979c',
              fontSize: '16'
            }
          },
          tooltip: {
            trigger: 'axis',
            axisPointer: {
              textStyle: {
                color: '#fff'
              }
            }
          },
          grid: {
            left: '5%',
            right: '5%',
            borderWidth: 0,
            top: 150,
            bottom: 95,
            textStyle: {
              color: '#fff'
            }
          },
          legend: {
            x: '5%',
            top: '10%',
            textStyle: {
              color: '#90979c'
            },
            data: ['每日用电量', '折线图']
          },
          calculable: true,
          xAxis: [{
            name:'号',
            type: 'category',
            axisLine: {
              lineStyle: {
                color: '#90979c'
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
            data: xData
          }],
          yAxis: [{
            type: 'value',
            splitLine: {
              show: false
            },
            axisLine: {
              lineStyle: {
                color: '#90979c'
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
          series: [{
            name: '每日用电量',
            type: 'bar',
            stack: 'total',
            barMaxWidth: 35,
            barGap: '10%',
            itemStyle: {
              normal: {
                color: 'rgba(255,144,128,1)',
                label: {
                  show: true,
                  textStyle: {
                    color: '#fff'
                  },
                  position: 'insideTop',
                  formatter(p) {
                    return p.value > 0 ? p.value : ''
                  }
                }
              }
            },
            data:lastMonthData1
          },
            {
              name: '折线图',
              type: 'line',
              stack: 'total',
              symbolSize: 10,
              symbol: 'circle',
              smooth:false,
              itemStyle: {
                normal: {
                  color: 'rgba(252,230,48,1)',
                  barBorderRadius: 0,
                  label: {
                    show: true,
                    position: 'top',
                    formatter(p) {
                      return p.value > 0 ? p.value : ''
                    }
                  }
                }
              },
              data: lastMonthData1
            }
          ]
        })
      }
    }
  }
</script>
