<template>
    <el-container class="home-container">
        <!-- 头部 -->
        <el-header>
            <div>
                <img src="../assets/header.jpg" alt="">
                <span>学生管理系统</span>
            </div>
            <el-button type="danger" @click="logout">退出</el-button>
        </el-header>
        <!-- 页面主体 -->
        <el-container>
            <!-- 侧边栏 -->
            <el-aside width="200px">
                <el-menu
              background-color="#184670"
              text-color="#fff"
              active-text-color="#ffd04b"
              unique-opened
              router
              :default-active="activePath">
              <!-- 一级菜单 -->
              <el-submenu :index="item.id+''" v-for="item in menulist" :key="item.id">
                  <!-- 一级菜单模板区 -->
                <template slot="title">
                    <!-- 图标 -->
                  <i :class="iconsObj[item.id]"></i>
                  <!-- 文本 -->
                  <span>{{item.authName}}</span>
                </template>
                <!-- 二级菜单 -->
                <el-menu-item :index="'/'+subItem.path" v-for="subItem in item.children" 
                :key="subItem.id" @click="saveNavState('/'+subItem.path)">
                  <template slot="title">
                      <!-- 图标 -->
                      <i class="el-icon-menu"></i>
                      <!-- 文本 -->
                      <span>{{subItem.authName}}</span>
                  </template>
                </el-menu-item>
              </el-submenu>
            </el-menu>
    </el-aside>
    <el-main>
        <!-- 路由占位符 -->
        <router-view></router-view>
    </el-main>
  </el-container>
</el-container>

</template>

<script>
export default {
    data(){
        return {
            menulist:[{
                id:5,
                authName:"首页",
                path:"index",
                children:[{
                        id:51,
                        authName:"基本信息",
                        path:"welcome"
                    }]
                },{
                id:0,
                authName:"学生管理",
                path:"users",
                children:[{
                        id:100,
                        authName:"学生列表",
                        path:"user"
                    }]
                },
                {
                    id:2, 
                    authName:"成绩管理",
                    path:"grade",
                    children:[{
                        id:21,
                        authName:"成绩列表",
                        path:"grades"
                    },{
                        id:22,
                        authName:"个人成绩",
                        path:"person"
                    },{
                        id:23,
                        authName:"班级成绩",
                        path:"classGrade"
                    }]
                },{
                id:4,
                authName:"教务网信息管理",
                path:"dept",
                children:[{
                        id:41,
                        authName:"学籍变更",
                        path:"change"
                    },{
                        id:42,
                        authName:"奖励记录",
                        path:"reward"
                    },{
                        id:43,
                        authName:"处分记录",
                        path:'punish'
                    }]
                }
            ],
            iconsObj:{
                '0':'iconfont icon-user',
                '1':'iconfont icon-tijikongjian',
                '2':'iconfont icon-shangpin',
                '3':'iconfont icon-danju',
                '4':'iconfont icon-baobiao',
                '5':'iconfont icon-showpassword',
            },
            activePath:''
        }
    },
    create(){
        this.activePath=window.sessionStorage.getItem("activePath")
    },
    methods:{
        logout(){
            this.$router.push('/login')
        },
        //保存链接激活状态
        saveNavState(activePath){
            window.sessionStorage.setItem('activePath',activePath)
            this.activePath=activePath
        }
    }
}
</script>

<style lang="less" scoped>

.home-container{
    height: 100%;
}
.el-header{
    background:#184670;
    display: flex;
    justify-content:space-between;
    align-items:center;
    color:#eaf0f6;
    font-size:20px;
    >div{
        display:flex;
        align-items:center;
        span{
            margin-left:15px;
        }
    }
}
.el-header img{
    width: 60px;
    height: 60px;
    border-radius: 60px;
}
.el-aside{
    background-color: #184670;
    .el-menu{
        border-right:none;
    }
}
.el-main{
    // background-color: #eaedf1;
    background: linear-gradient(to left top, rgb(130, 231, 227), rgb(211, 211, 247));
}
.iconfont{
    margin-right:10px;
}
</style>