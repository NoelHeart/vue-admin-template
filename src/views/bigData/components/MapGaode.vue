<template>
  <div id="container" style="height:500px"></div>
</template>

<script>
  import AMap from 'AMap'
  var map
  export default {
    name:'map-gaode',
    mounted: function () {
      this.init()
    },
    methods: {
      init: function () {
        map = new AMap.Map('container', {
          // pitch:80, // 地图俯仰角度，有效范围 0 度- 83 度
          // viewMode:'3D', // 地图模式
          mapStyle: 'amap://styles/darkblue', //设置地图的显示样式
          center: [120.040606, 30.228718],
          resizeEnable: true,
          zoom: 18
        })
        // AMap.plugin(['AMap.ToolBar', 'AMap.Scale'], function () {
        //   map.addControl(new AMap.ToolBar())
        //   map.addControl(new AMap.Scale())
        // })
        //text文本标记
        var texts=[{
          title:'1号楼',
          textContent:'1号楼',
          position: [120.039978, 30.228718]
        },{
          title:'2号楼',
          textContent:'2号楼',
          position: [120.040606, 30.228718]
        },{
          title:'3号楼',
          textContent:'3号楼',
          position: [120.041383, 30.228718]
        }
        ]
        texts.forEach(function (text) {
          new AMap.Text({
            map:map,
            text:text.textContent,
            title:text.title,
            draggable:false,
            position:[text.position[0],text.position[1]],
            style:{
              'padding': '.75rem 1.25rem',
              'margin-bottom': '1rem',
              'border-radius': '.25rem',
              'background-color': 'rgba(29, 39, 65, 0.8)',
              'width': '5rem',
              'border-width': 0,
              'text-align': 'center',
              'font-size': '10px',
              'color': '#ff9b43'
            }
          })
        })
      }
    }
  }
</script>

<style scoped>
</style>
