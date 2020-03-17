<template>
  <div class="MorePie" style="height: 200px"></div>
</template>

<script>
  import { getNumDeviceData } from '@/api/bigDataScreen'
  import echarts from 'echarts'
  require('echarts/theme/macarons') // echarts theme
  import { debounce } from '@/utils'
  export default {
    name: "more-pie-chart",
    data() {
      return {
        list:null,
        chart: null,
        data1:[12,23,34,45,56]
      }
    },
    created(){
      this.getMorePieChartData()
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
      getMorePieChartData(){
        getNumDeviceData().then(response => {
          this.list=response.data.data.list
          const data11=[]
          for (const v of this.list){
            data11.push(v.content)
          }
          this.data1=data11
          this.$nextTick(() => { this.initChart() })
          this.__resizeHandler = debounce(() => {
            if (this.chart) {
              this.chart.resize()
            }
          }, 100)
          window.addEventListener('resize', this.__resizeHandler)
        })
      },
      initChart() {
        const pieData1=this.data1[4]
        const pieData2=this.data1[3]
        const pieData3=this.data1[2]
        const pieData4=this.data1[1]
        const pieData5=this.data1[0]
        this.chart = echarts.init(this.$el, 'macarons')
        this.chart.setOption({
          title:[
            {
              text:'水电表',
              textStyle: {
                color: '#fff',
                fontSize: '16'
              },
              bottom:20,
              left:'6.5%'
            },
            {
              text:'智能用电终端',
              textStyle: {
                color: '#fff',
                fontSize: '16'
              },
              bottom:20,
              left:'24.2%'
            },
            {
              text:'智能开关',
              textStyle: {
                color: '#fff',
                fontSize: '16'
              },
              bottom:20,
              left:'46.2%'
            },
            {
              text:'报警数量',
              textStyle: {
                color: '#fff',
                fontSize: '16'
              },
              bottom:20,
              left:'66.2%'
            },
            {
              text:'在线设备',
              textStyle: {
                color: '#fff',
                fontSize: '16'
              },
              bottom:20,
              left:'86.5%'
            }
          ],
          legend: {
            show:false
          },
          calculable: true,
          series: [
            {
              name:'水电表',
              type:'pie',
              radius: ['45%','60%'],
              center:['10%','40%'],
              avoidLabelOverlap: false,
              label: {
                normal: {
                  show: true,
                  formatter:'{c}',
                  position: 'center',
                  textStyle: {
                    fontSize: '30',
                    fontWeight: 'bold'
                  }
                }
              },
              labelLine: {
                normal: {
                  show: false
                }
              },
              data:[
                {value:pieData1, name:'水电表'}
              ]
            },
            {
              name:'智能用电终端',
              type:'pie',
              radius: ['45%','60%'],
              center:['30%','40%'],
              avoidLabelOverlap: false,
              label: {
                normal: {
                  show: true,
                  formatter:'{c}',
                  position: 'center',
                  textStyle: {
                    fontSize: '30',
                    fontWeight: 'bold'
                  }
                }
              },
              labelLine: {
                normal: {
                  show: false
                }
              },
              data:[
                {value:pieData2, name:'智能用电终端'}
              ]
            },
            {
              name:'智能开关',
              type:'pie',
              radius: ['45%','60%'],
              center:['50%','40%'],
              avoidLabelOverlap: false,
              label: {
                normal: {
                  show: true,
                  formatter:'{c}',
                  position: 'center',
                  textStyle: {
                    fontSize: '30',
                    fontWeight: 'bold'
                  }
                }
              },
              labelLine: {
                normal: {
                  show: false
                }
              },
              data:[
                {value:pieData3, name:'智能开关'}
              ]
            },
            {
              name:'报警数量',
              type:'pie',
              radius: ['45%','60%'],
              center:['70%','40%'],
              avoidLabelOverlap: false,
              label: {
                normal: {
                  show: true,
                  formatter:'{c}',
                  position: 'center',
                  textStyle: {
                    fontSize: '30',
                    fontWeight: 'bold'
                  }
                }
              },
              labelLine: {
                normal: {
                  show: false
                }
              },
              itemStyle:{
                normal:{
                  color:'#c23531'
                }
              },
              data:[
                {value:pieData4, name:'报警数量'}
              ]
            },
            {
              name:'在线设备',
              type:'pie',
              radius: ['45%','60%'],
              center:['90%','40%'],
              avoidLabelOverlap: false,
              label: {
                normal: {
                  show: true,
                  formatter:'{c}',
                  position: 'center',
                  textStyle: {
                    fontSize: '30',
                    fontWeight: 'bold'
                  }
                }
              },
              labelLine: {
                normal: {
                  show: false
                }
              },
              data:[
                {value:pieData5, name:'在线设备'}
              ]
            }
          ]
        })
      }
    }
  }
</script>

<style scoped>

</style>
