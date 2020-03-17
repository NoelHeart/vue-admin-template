<template>
  <div class="dashboard-editor-container">

    <panel-group/>

    <el-row style="background:#fff;padding:16px 16px 0;margin-bottom:32px;">
      <last-month-chart width="100%"/>
    </el-row>

    <el-row style="background:#fff;padding:16px 16px 0;margin-bottom:32px;">
      <wm-chart width="100%"/>
    </el-row>

  </div>
</template>

<script>
import PanelGroup from './components/PanelGroup'
import LastMonthChart from './components/LastMonthChart'
import WmChart from './components/WmChart'

export default {
  name: 'DashboardAdmin',
  components: {
    PanelGroup,
    LastMonthChart,
    WmChart
  }
}
</script>

<style lang="scss" scoped>
.dashboard-editor-container {
  padding: 32px;
  background-color: rgb(240, 242, 245);
  position: relative;

  .chart-wrapper {
    background: #fff;
    padding: 16px 16px 0;
    margin-bottom: 32px;
  }
}
</style>
