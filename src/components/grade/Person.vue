<template>
    <div>
        <!-- 面包屑导航区 -->
        <el-breadcrumb separator-class="el-icon-arrow-right">
            <el-breadcrumb-item :to="{ path: '/' }">成绩管理</el-breadcrumb-item>
            <el-breadcrumb-item>个人成绩</el-breadcrumb-item>
        </el-breadcrumb>

        <!-- 卡片视图区域 -->
        <el-card class="box-card" shadow="always">
            <!-- 搜索添加区域 -->
            <el-row :gutter="10">
                <el-col :span="4">
                    <el-input placeholder="请输入学号" v-model="queryInfo.id"
                    clearable @clear="getUserList">
                    <el-button slot="append" icon="el-icon-search" @click="getUserById(queryInfo.id)"></el-button>
                    </el-input>
                </el-col>
                 <el-col :span="3">
                    <download-excel
                      class="btn btn-default"
                      :data="userList"
                      :fields="stu_fields"
                      worksheet="My Worksheet"
                      name="学生成绩.xls">
                      <el-button type="danger">导出个人成绩</el-button>
                    </download-excel>
                </el-col>
            </el-row>

            <!-- <el-row>
                <el-col :span="4">
                    <el-button type="primary" @click=" addUserVisible=true">添加用户</el-button>
                </el-col>
                
            </el-row> -->

            <!-- 用户列表区域 -->
            <el-table :data="userList" border stripe height="200">
                <el-table-column label="序号" type="index" align="center"></el-table-column>
                <el-table-column label="学号" prop="studentId" align="center"></el-table-column>
                <el-table-column label="姓名" prop="stuName" align="center"></el-table-column>
               <el-table-column label="数学" prop="mathScore" align="center"></el-table-column>
               <el-table-column label="java" prop="javaScore" align="center"></el-table-column>
               <el-table-column label="英语" prop="engScore" align="center"></el-table-column>
                <el-table-column label="体育" prop="peScore" align="center"></el-table-column>
                <el-table-column label="总分" prop="sumScore" align="center"></el-table-column>
                </el-table> 
                
        </el-card>

        <div id="main" style="width: 600px;height:400px;"></div>
    </div>
</template>

<script>
import JsonExcel from "vue-json-excel";
import * as echarts from 'echarts'
export default {
    data(){
        return{
            queryInfo:{
                query:'',
                pagenum:1,
                pagesize:2,
                id:'',
                name:'',
                className:''
            },
            //用户信息列表
            userList:[],
            
            stu_fields: {
              "学号": "studentId",
              "姓名":"stuName",
              "数学":"mathScore",
              "JAVA":"javaScore",
              "英语":"engScore",
              "体育":"peScore",
              "总分":"sumScore"
            }
        }
    },
    created(){
        //获取用户数据（需连接后端，暂未实现）
        this.getUserList()
    },
    mounted(){
        
    },
    methods:{
        getUserList(){
            let _this=this
            this.$http.get('http://localhost:8890/main/score/init').then(function(res){
            _this.userList=res.data.data
        })
        // console.log("hello");
        },
        getUserById(id){
            let _this=this
            this.$http.get('http://localhost:8890/main/score/searchById/'+id).then(function(res){
            // 基于准备好的dom，初始化echarts实例
              var myChart = echarts.init(document.getElementById('main'));
                _this.userList=res.data.data
            console.log(res.data.data[0].mathScore);
              // 指定图表的配置项和数据
              var option = {
                title: {
                  text: '各科成绩展示'
                },
                tooltip: {},
                xAxis: {
                  data: ['数学', 'JAVA', '英语', '体育']
                },
                yAxis: {},
                series: [
                  {
                    type: 'bar',
                    data:[res.data.data[0].mathScore,res.data.data[0].javaScore,res.data.data[0].engScore,res.data.data[0].peScore]
                  }
                ]
              };
              // 使用刚指定的配置项和数据显示图表。
              myChart.setOption(option);
                })
                }
            }
}
</script>


<style lang="less" scoped>

.el-row {
    margin-top:10px;
}
</style>