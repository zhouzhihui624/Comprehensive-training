<template>
    <div>
        <!-- 面包屑导航区 -->
        <el-breadcrumb separator-class="el-icon-arrow-right">
            <el-breadcrumb-item :to="{ path: '/' }">权限管理</el-breadcrumb-item>
            <el-breadcrumb-item>权限列表</el-breadcrumb-item>
        </el-breadcrumb>

        <!-- 卡片视图 -->
        <el-card>
             <el-table :data="rightsList" border stripe>
                <el-table-column label="序号" type="index"></el-table-column>
                <el-table-column label="权限名称" prop="authName"></el-table-column>
                <el-table-column label="路径" prop="path"></el-table-column>
                <el-table-column label="权限等级" prop="level">
                    <template slot-scope="scope">
                        <el-tag v-if="scope.row.level==='1'">一级</el-tag>
                        <el-tag type="success" v-if="scope.row.level==='2'">二级</el-tag>
                        <el-tag type="warning" v-if="scope.row.level==='3'">三级</el-tag>
                    </template>
                </el-table-column>
             </el-table>
        </el-card>
    </div>
</template>

<script>
export default {
    data(){
        return{
            rightsList:[{
                id:101,
                authName:"商品管理1",
                level:"1",
                pid:0,
                path:"科大101"
            },{
                id:102,
                authName:"商品管理2",
                level:"2",
                pid:0,
                path:"科大102"
            },{
                id:103,
                authName:"商品管理3",
                level:"3",
                pid:0,
                path:"科大103"
            }]
        }
    },
    created(){
        //获取用户权限列表数据(未实现)
        this.getRightList()
    },
    methods:{
        //获取权限列表
        getRightList(){
            // const {data:res}=await this.$http.get('rights/list')
        }
    }
}
</script>

<style lang="less" scoped>

</style>