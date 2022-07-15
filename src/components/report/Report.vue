<template>
    <div>
         <!-- 面包屑导航区 -->
        <el-breadcrumb separator-class="el-icon-arrow-right">
            <el-breadcrumb-item :to="{ path: '/' }">首页</el-breadcrumb-item>
            <el-breadcrumb-item>数据统计</el-breadcrumb-item>
            <el-breadcrumb-item>数据报表</el-breadcrumb-item>
        </el-breadcrumb>

        <el-card class="box-card">
            <div id="left" style="width:600px;height:400px;"></div>
            <div id="right" style="width:600px;height:400px;"></div>
        </el-card>
    </div>
</template>

<script>

import * as echarts from 'echarts'

export default {
    data(){
        return {}
    },
    created(){},
    mounted(){
      // let _this=this;
      this.$http.get("http://localhost:8081/stuClass/barVo").then(function(res){
          // 基于准备好的dom，初始化echarts实例
      var myChart2 = echarts.init(document.getElementById('right'));
      // 指定图表的配置项和数据
      var option2 = {
        xAxis: {
          data: res.data.names
        },
        yAxis: {},
        series: [
          {
            type: 'bar',
            data: res.data.values
          }
        ]
      };
      // 使用刚指定的配置项和数据显示图表。
        myChart2.setOption(option2);
      }),

      this.$http.get("http://localhost:8081/stuClass/pieVo").then(function(res){
        var myChart1=echarts.init(document.getElementById('left'));
        var option1 = {
            series: [
              {
                type: 'pie',
                data: res.data
              }
            ]
        };
        myChart1.setOption(option1);
      })

    },
    methods:{

    }
}
</script>

<style lang="less" scoped>

</style>