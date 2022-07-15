<template>
    <div>
        <!-- 面包屑导航区 -->
        <el-breadcrumb separator-class="el-icon-arrow-right">
            <el-breadcrumb-item :to="{ path: '/' }">成绩管理</el-breadcrumb-item>
            <el-breadcrumb-item>班级成绩</el-breadcrumb-item>
        </el-breadcrumb>

        <!-- 卡片视图区域 -->
        <el-card class="box-card" shadow="always">
            <!-- 搜索添加区域 -->
            <el-row :gutter="10">
                <el-col :span="4">
                    <el-input placeholder="请输入班级" v-model="queryInfo.className"
                    clearable @clear="getUserList">
                    <el-button slot="append" icon="el-icon-search" @click="getUserByClassName(queryInfo.className)"></el-button>
                    </el-input>
                </el-col>
                <el-col :span="3">
                    <download-excel
                      class="btn btn-default"
                      :data="avgList"
                      :fields="class_fields"
                      worksheet="My Worksheet"
                      name="班级成绩.xlsx">
                      <el-button type="danger">导出班级成绩</el-button>
                    </download-excel>
                </el-col>
            </el-row>

            <!-- <el-row>
                <el-col :span="4">
                    <el-button type="primary" @click=" addUserVisible=true">添加用户</el-button>
                </el-col>
                
            </el-row> -->

            <!-- 用户列表区域 -->
            <el-table :data="avgList" border stripe>
                <el-table-column label="序号" type="index" align="center"></el-table-column>
                <el-table-column label="数学平均成绩" prop="mathScoreAvg" align="center"></el-table-column>
                <el-table-column label="java平均成绩" prop="javaScoreAvg" align="center"></el-table-column>
                <el-table-column label="英语平均成绩" prop="engScoreAvg" align="center"></el-table-column>
               <el-table-column label="体育平均成绩" prop="peScoreAvg" align="center"></el-table-column>
               <el-table-column label="总平均成绩" prop="sumScoreAvg" align="center"></el-table-column>
            </el-table>
        </el-card>

    </div>
</template>

<script>
import JsonExcel from "vue-json-excel";

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
            // 班级平均成绩信息
            avgList:[],

            class_fields: {
                "数学平均成绩":"mathScoreAvg",
                "java平均成绩":"javaScoreAvg",
                "英语平均成绩":"engScoreAvg",
                "体育平均成绩":"peScoreAvg",
                "总平均成绩":"sumScoreAvg"
            }
        }
    },
    created(){

    },
    methods:{
        getUserByClassName(className){
            let _this=this
            this.$http.get("http://localhost:8890/main/score/countAvgScores/"+className).then(function(res){
                _this.avgList=res.data.data;
                // console.log(userTable);
                // console.log(res.data);
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