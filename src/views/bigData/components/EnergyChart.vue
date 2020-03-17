<template>
  <div class="EnPieChart" style="height: 300px"/>
</template>
<script>
  import { getBuildUseData } from '@/api/bigDataScreen'
  import echarts from 'echarts'
  require('echarts/theme/macarons') // echarts theme
  import { debounce } from '@/utils'

  export default {
    data() {
      return {
        chart: null,
        build1Data:1,
        build2Data:1,
        build3Data:1
      }
    },
    created(){
      this.getEnergyChartData()
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
      getEnergyChartData(){
        getBuildUseData().then(response => {
          this.build1Data=response.data.data.content.build1Use
          this.build2Data=response.data.data.content.build2Use
          this.build3Data=response.data.data.content.build3Use
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
        const build1=this.build1Data
        const build2=this.build2Data
        const build3=this.build3Data
        this.chart = echarts.init(this.$el, 'macarons')
        this.chart.setOption({
          title:{
            text:'各大楼耗能比例',
            x: 'center',
            top:0,
            textStyle: {
              color: '#fff',
              fontSize: '16'
            }
          },
          legend: {
            show:false
          },
          calculable: true,
          series: [
            {
              type: 'pie',
              roseType: 'radius',
              radius: ['10%', '75%'],
              center: ['50%', '50%'],
              data: [
                { value: build1, name: '1号楼' },
                { value: build2, name: '2号楼' },
                { value: build3, name: '3号楼' },
              ],
              animationEasing: 'cubicInOut',
              animationDuration: 2600
            }
          ]
        })
      }
    }
  }
</script>
