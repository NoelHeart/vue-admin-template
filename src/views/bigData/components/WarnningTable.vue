<template>
  <div class='table-container'>
    <div class='table-header'>
      <span class='table-header-item' v-for='(item, index) in columns' :key='index'>
        {{item.name}}
      </span>
    </div>
    <div class='table-body'>
      <div class='scoll-wrapper'>
        <div class='table-body-row' v-for='(row, index) in source' :key='index'>
          <span
            class='table-body-col'
            v-for='(col, colIdx) in columns'
            :key='colIdx'
            :title='row[col.key]'>
            {{row[col.key]}}
          </span>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
  export default {
    name: "warnning-table",
    data() {
      return {
        columns:[
          { name: '报警设备', key: 'type' },
          { name: '报警内容', key: 'name' },
        ],
        source:[
          { type: 'EM007618000216', name: '合闸成功' },
          { type: 'EM007618000214', name: '合闸成功' },
          { type: 'EM007618000339', name: '合闸成功' },
          { type: 'EM007618000336', name: '合闸成功' },
          { type: 'EM007618000337', name: '合闸成功' },
          { type: 'EM007618000334', name: '合闸成功' },
          { type: 'EM007618000335', name: '合闸成功' },
          { type: 'EM007618000333', name: '合闸成功' },
          { type: 'EM007618000332', name: '合闸成功' },
          { type: 'EM007618000235', name: '合闸成功' },
        ],
      }
    },

  }
</script>

<style lang="scss" scoped>
  .table-container{
    height: 200px;
    overflow: hidden;

    .table-header{
      width: 100%;
      height: 30px;
      line-height: 30px;
      text-align: center;
      font-weight: 600;
      display: flex;
      z-index: 2;

      .table-header-item{
        background-color: #007ee4;
        display: block;
        flex: 1;
        text-align: center;
        color: #fff;
        margin-left: 5px;

        &:first-child{
          margin-left: 0;
        }
      }
    }

    .table-body{
      width: 100%;
      height: calc( 100% - 30px );
      overflow: hidden;

      .scoll-wrapper{
        width: 100%;
        overflow: hidden;
        animation: tableScoll 20s linear infinite;
        transform-origin: 0 0;
        z-index: 1;

        .table-body-row{
          width: 100%;
          height: 30px;
          line-height: 30px;
          color: #fff;
          text-align: center;
          display: flex;

          /*&:first-child{*/
            /*.table-body-col{*/
              /*color: rgb(163, 21, 46);*/
            /*}*/
          /*}*/

          /*&:nth-child(2){*/
            /*.table-body-col{*/
              /*color: rgb(255, 91, 245);*/
            /*}*/
          /*}*/

          /*&:nth-child(3){*/
            /*.table-body-col{*/
              /*color: rgb(255, 221, 96);*/
            /*}*/
          /*}*/

          &:nth-child(even){
            .table-body-col{
              background-color: rgba(255, 26, 41, 0.4);
            }
          }
          .table-body-col{
            flex: 1;
            overflow: hidden;
            white-space: nowrap;
            text-overflow: ellipsis;
          }
        }
      }
    }

  }
  @keyframes tableScoll {
    from {
      transform: translateY(0%)
    }
    to {
      transform: translateY(-100%)
    }
  }
</style>

