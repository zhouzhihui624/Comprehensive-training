<template>
    <div class="app">
          <div id="main" class="left" style="width: 600px;height:400px;"></div>
            <el-card class="box-card" shadow="always">
              <div class="card">
                <div class="avatar_box">
                <img src="../assets/header.jpg" alt="">
            </div>

            <!-- 用户列表区域 -->
            <div class="admin">
              <table>
              <tr>
                  <td>管理员名字</td>
                  <td>admin</td>
              </tr>
              <tr>
                  <td>管理员权限</td>
                  <td>超级管理员</td>
              </tr>
              
            </table>
            </div>
          </div>      
        </el-card>
    </div>
</template>

<script>
import * as echarts from 'echarts'

export default {

data(){
    return {
      userList:[{
        username:'曹谢江',
        role_name:'超级管理员'
      }]
    }
},
created(){},
mounted(){
    this.$http.get('http://localhost:8890/schoolInfo/pieSchool').then(function(res){
      // 基于准备好的dom，初始化echarts实例
      var myChart = echarts.init(document.getElementById('main'));

      // 指定图表的配置项和数据
      var option = {
        title: {
          text: '学校基础信息',
          left: 'center'
        },
        tooltip: {
          trigger: 'item',
          formatter: '{a} <br/>{b} : {c} ({d}%)'
        },
        legend: {
          orient: 'vertical',
          left: 'left',
          data: res.data.names
        },
        series: [
          {
            name: '访问来源',
            type: 'pie',
            radius: '55%',
            center: ['50%', '60%'],
            data: res.data.values,
            emphasis: {
              itemStyle: {
                shadowBlur: 10,
                shadowOffsetX: 0,
                shadowColor: 'rgba(0, 0, 0, 0.5)'
              }
            }
          }
        ]
    };

      // 使用刚指定的配置项和数据显示图表。
      myChart.setOption(option);
    })
    
}
    
}
</script>


<style lang="less" scoped>
.app{
  margin-top:50px;
}

.left{
  float: left;
}

.card{
  background: linear-gradient(to left top, rgb(130, 231, 227), rgb(211, 211, 247));
}
.avatar_box{
    height: 130px;
    width: 130px;
    border:1px solid #eee;
    border-radius: 50%;
    padding: 10px;
    box-shadow: 0 0 10px #ddd;
    // position:absolute;
    left:50%;
    // transform:translate(-50%,-50%);
    margin:0 auto;
    background-color: #fff;
    img{
        width: 100%;
        height: 100%;
        border-radius: 50%;
        background-color: #eee;
    }
}

.admin{
    padding-top:50px;
    padding-bottom:50px;
}

table {

   width: 50%;
   border: 1px solid grey;
   margin: 0 auto;
   border-collapse: collapse;
   }
 td{
   height: 50px;
   border: 1px solid grey;
   text-align: center;
   vertical-align: center;
 }
</style>