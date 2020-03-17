<template>
  <div class="MoreGuage" style="height: 750px"></div>
</template>

<script>
  import echarts from 'echarts'
  require('echarts/theme/macarons') // echarts theme
  import { debounce } from '@/utils'
  export default {
    name: "more-gauge",
    data() {
      return {
        chart: null
      }
    },
    mounted() {
      this.initMoreGuageChart()
      this.__resizeHandler = debounce(() => {
        if (this.chart) {
          this.chart.resize()
        }
      }, 100)
      window.addEventListener('resize', this.__resizeHandler)
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
      initMoreGuageChart() {
        this.chart = echarts.init(this.$el, 'macarons')
        this.chart.setOption({
          title:[
            {
              text:'5#1充电桩',
              textStyle: {
                color: '#fff',
                fontSize: '20'
              },
              top:'1%',
              left:'13%'
            },
            {
              text:'5#2充电桩',
              textStyle: {
                color: '#fff',
                fontSize: '20'
              },
              top:'1%',
              left:'63%'
            },
            {
              text:'6#1充电桩',
              textStyle: {
                color: '#fff',
                fontSize: '20'
              },
              top:'31%',
              left:'13%'
            },
            {
              text:'6#2充电桩',
              textStyle: {
                color: '#fff',
                fontSize: '20'
              },
              top:'31%',
              left:'63%'
            },
            {
              text:'7#1充电桩',
              textStyle: {
                color: '#fff',
                fontSize: '20'
              },
              top:'61%',
              left:'13%'
            },
            {
              text:'7#1充电桩',
              textStyle: {
                color: '#fff',
                fontSize: '20'
              },
              top:'61%',
              left:'63%'
            }
          ],
          series : [
            {
              name:'5#1充电桩',
              type:'gauge',
              min:0,
              max:10,
              splitNumber:5,
              center : ['25%', '18%'],
              radius: '40%',
              axisLine: {            // 坐标轴线
                lineStyle: {       // 属性lineStyle控制线条样式
                  color: [[0.2, 'lime'],[0.8, '#1e90ff'],[1, '#ff4500']],
                  width: 3,
                  shadowColor : '#fff', //默认透明
                  shadowBlur: 10
                }
              },
              axisLabel: {            // 坐标轴小标记
                textStyle: {       // 属性lineStyle控制线条样式
                  fontWeight: 'bolder',
                  color: '#fff',
                  shadowColor : '#fff', //默认透明
                  shadowBlur: 10
                }
              },
              axisTick: {            // 坐标轴小标记
                length :15,        // 属性length控制线长
                lineStyle: {       // 属性lineStyle控制线条样式
                  color: 'auto',
                  shadowColor : '#fff', //默认透明
                  shadowBlur: 10
                }
              },
              splitLine: {           // 分隔线
                length :20,         // 属性length控制线长
                lineStyle: {       // 属性lineStyle（详见lineStyle）控制线条样式
                  width:3,
                  color: '#fff',
                  shadowColor : '#fff', //默认透明
                  shadowBlur: 10
                }
              },
              pointer: {           // 分隔线
                shadowColor : '#fff', //默认透明
                shadowBlur: 5
              },
              title : {
                textStyle: {       // 其余属性默认使用全局文本样式，详见TEXTSTYLE
                  fontSize: 15,
                  fontStyle: 'italic',
                  color: '#fff',
                  shadowColor : '#fff', //默认透明
                  shadowBlur: 10
                }
              },
              data:[{value: 2, name: '充电数'}]
            },
            {
              name:'5#2充电桩',
              type:'gauge',
              min:0,
              max:10,
              splitNumber:5,
              center : ['75%', '18%'],
              radius: '40%',
              axisLine: {            // 坐标轴线
                lineStyle: {       // 属性lineStyle控制线条样式
                  color: [[0.2, 'lime'],[0.8, '#1e90ff'],[1, '#ff4500']],
                  width: 3,
                  shadowColor : '#fff', //默认透明
                  shadowBlur: 10
                }
              },
              axisLabel: {            // 坐标轴小标记
                textStyle: {       // 属性lineStyle控制线条样式
                  fontWeight: 'bolder',
                  color: '#fff',
                  shadowColor : '#fff', //默认透明
                  shadowBlur: 10
                }
              },
              axisTick: {            // 坐标轴小标记
                length :15,        // 属性length控制线长
                lineStyle: {       // 属性lineStyle控制线条样式
                  color: 'auto',
                  shadowColor : '#fff', //默认透明
                  shadowBlur: 10
                }
              },
              splitLine: {           // 分隔线
                length :20,         // 属性length控制线长
                lineStyle: {       // 属性lineStyle（详见lineStyle）控制线条样式
                  width:3,
                  color: '#fff',
                  shadowColor : '#fff', //默认透明
                  shadowBlur: 10
                }
              },
              pointer: {           // 分隔线
                shadowColor : '#fff', //默认透明
                shadowBlur: 5
              },
              title : {
                textStyle: {       // 其余属性默认使用全局文本样式，详见TEXTSTYLE
                  fontSize: 15,
                  fontStyle: 'italic',
                  color: '#fff',
                  shadowColor : '#fff', //默认透明
                  shadowBlur: 10
                }
              },
              data:[{value: 1, name: '充电数'}]
            },
            {
              name:'6#1充电桩',
              type:'gauge',
              min:0,
              max:10,
              splitNumber:5,
              center : ['25%', '48%'],
              radius: '40%',
              axisLine: {            // 坐标轴线
                lineStyle: {       // 属性lineStyle控制线条样式
                  color: [[0.1, 'lime'],[0.8, '#1e90ff'],[1, '#ff4500']],
                  width: 3,
                  shadowColor : '#fff', //默认透明
                  shadowBlur: 10
                }
              },
              axisLabel: {            // 坐标轴小标记
                textStyle: {       // 属性lineStyle控制线条样式
                  fontWeight: 'bolder',
                  color: '#fff',
                  shadowColor : '#fff', //默认透明
                  shadowBlur: 10
                }
              },
              axisTick: {            // 坐标轴小标记
                length :15,        // 属性length控制线长
                lineStyle: {       // 属性lineStyle控制线条样式
                  color: 'auto',
                  shadowColor : '#fff', //默认透明
                  shadowBlur: 10
                }
              },
              splitLine: {           // 分隔线
                length :20,         // 属性length控制线长
                lineStyle: {       // 属性lineStyle（详见lineStyle）控制线条样式
                  width:3,
                  color: '#fff',
                  shadowColor : '#fff', //默认透明
                  shadowBlur: 10
                }
              },
              pointer: {           // 分隔线
                shadowColor : '#fff', //默认透明
                shadowBlur: 5
              },
              title : {
                textStyle: {       // 其余属性默认使用全局文本样式，详见TEXTSTYLE
                  fontSize: 15,
                  fontStyle: 'italic',
                  color: '#fff',
                  shadowColor : '#fff', //默认透明
                  shadowBlur: 10
                }
              },
              data:[{value: 8, name: '充电数'}]
            },
            {
              name:'6#2充电桩',
              type:'gauge',
              min:0,
              max:10,
              splitNumber:5,
              center : ['75%', '48%'],
              radius: '40%',
              axisLine: {            // 坐标轴线
                lineStyle: {       // 属性lineStyle控制线条样式
                  color: [[0.1, 'lime'],[0.8, '#1e90ff'],[1, '#ff4500']],
                  width: 3,
                  shadowColor : '#fff', //默认透明
                  shadowBlur: 10
                }
              },
              axisLabel: {            // 坐标轴小标记
                textStyle: {       // 属性lineStyle控制线条样式
                  fontWeight: 'bolder',
                  color: '#fff',
                  shadowColor : '#fff', //默认透明
                  shadowBlur: 10
                }
              },
              axisTick: {            // 坐标轴小标记
                length :15,        // 属性length控制线长
                lineStyle: {       // 属性lineStyle控制线条样式
                  color: 'auto',
                  shadowColor : '#fff', //默认透明
                  shadowBlur: 10
                }
              },
              splitLine: {           // 分隔线
                length :20,         // 属性length控制线长
                lineStyle: {       // 属性lineStyle（详见lineStyle）控制线条样式
                  width:3,
                  color: '#fff',
                  shadowColor : '#fff', //默认透明
                  shadowBlur: 10
                }
              },
              pointer: {           // 分隔线
                shadowColor : '#fff', //默认透明
                shadowBlur: 5
              },
              title : {
                textStyle: {       // 其余属性默认使用全局文本样式，详见TEXTSTYLE
                  fontSize: 15,
                  fontStyle: 'italic',
                  color: '#fff',
                  shadowColor : '#fff', //默认透明
                  shadowBlur: 10
                }
              },
              data:[{value: 10, name: '充电数'}]
            },
            {
              name:'7#1充电桩',
              type:'gauge',
              min:0,
              max:10,
              splitNumber:5,
              center : ['25%', '78%'],
              radius: '40%',
              axisLine: {            // 坐标轴线
                lineStyle: {       // 属性lineStyle控制线条样式
                  color: [[0.1, 'lime'],[0.8, '#1e90ff'],[1, '#ff4500']],
                  width: 3,
                  shadowColor : '#fff', //默认透明
                  shadowBlur: 10
                }
              },
              axisLabel: {            // 坐标轴小标记
                textStyle: {       // 属性lineStyle控制线条样式
                  fontWeight: 'bolder',
                  color: '#fff',
                  shadowColor : '#fff', //默认透明
                  shadowBlur: 10
                }
              },
              axisTick: {            // 坐标轴小标记
                length :15,        // 属性length控制线长
                lineStyle: {       // 属性lineStyle控制线条样式
                  color: 'auto',
                  shadowColor : '#fff', //默认透明
                  shadowBlur: 10
                }
              },
              splitLine: {           // 分隔线
                length :20,         // 属性length控制线长
                lineStyle: {       // 属性lineStyle（详见lineStyle）控制线条样式
                  width:3,
                  color: '#fff',
                  shadowColor : '#fff', //默认透明
                  shadowBlur: 10
                }
              },
              pointer: {           // 分隔线
                shadowColor : '#fff', //默认透明
                shadowBlur: 5
              },
              title : {
                textStyle: {       // 其余属性默认使用全局文本样式，详见TEXTSTYLE
                  fontSize: 15,
                  fontStyle: 'italic',
                  color: '#fff',
                  shadowColor : '#fff', //默认透明
                  shadowBlur: 10
                }
              },
              data:[{value: 6, name: '充电数'}]
            },
            {
              name:'7#2充电桩',
              type:'gauge',
              min:0,
              max:10,
              splitNumber:5,
              center : ['75%', '78%'],
              radius: '40%',
              axisLine: {            // 坐标轴线
                lineStyle: {       // 属性lineStyle控制线条样式
                  color: [[0.1, 'lime'],[0.8, '#1e90ff'],[1, '#ff4500']],
                  width: 3,
                  shadowColor : '#fff', //默认透明
                  shadowBlur: 10
                }
              },
              axisLabel: {            // 坐标轴小标记
                textStyle: {       // 属性lineStyle控制线条样式
                  fontWeight: 'bolder',
                  color: '#fff',
                  shadowColor : '#fff', //默认透明
                  shadowBlur: 10
                }
              },
              axisTick: {            // 坐标轴小标记
                length :15,        // 属性length控制线长
                lineStyle: {       // 属性lineStyle控制线条样式
                  color: 'auto',
                  shadowColor : '#fff', //默认透明
                  shadowBlur: 10
                }
              },
              splitLine: {           // 分隔线
                length :20,         // 属性length控制线长
                lineStyle: {       // 属性lineStyle（详见lineStyle）控制线条样式
                  width:3,
                  color: '#fff',
                  shadowColor : '#fff', //默认透明
                  shadowBlur: 10
                }
              },
              pointer: {           // 分隔线
                shadowColor : '#fff', //默认透明
                shadowBlur: 5
              },
              title : {
                textStyle: {       // 其余属性默认使用全局文本样式，详见TEXTSTYLE
                  fontSize: 15,
                  fontStyle: 'italic',
                  color: '#fff',
                  shadowColor : '#fff', //默认透明
                  shadowBlur: 10
                }
              },
              data:[{value: 9, name: '充电数'}]
            }
          ]
        })
      }
    }
  }
</script>

<style scoped>

</style>
