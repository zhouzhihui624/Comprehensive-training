<template>
    <div class="login_container">
        <div class="login_box">
            <!-- 头像区 -->
            <div class="avatar_box">
                <img src="../assets/art_sea.png" alt="">
            </div>
            <!-- 表单区 -->
            <el-form  ref="loginFormRef" :model="loginForm" :rules="rules" label-width="0" class="login_form">
                <!-- 用户名 -->
                <el-form-item prop="username">
                <el-input v-model="loginForm.username" prefix-icon="iconfont icon-user" />
                </el-form-item>
                <!-- 密码 -->
                <el-form-item prop="password">
                  <el-input type="password" v-model="loginForm.password" prefix-icon="iconfont icon-3702mima" />
                </el-form-item>
                <!-- 按钮区域 -->
                <el-form-item class="btn">
                    <el-button type="primary" @click="login">登陆</el-button>
                     <el-button type="info" @click="resetLoginForm">重置</el-button>
                </el-form-item>
            </el-form>
        </div>
    </div>
</template>

<script>
export default{
    data(){
        return{
            loginForm:{
                username:'admin',
                password:'123456'
            },
            rules:{
                username:[
                    { required: true, message: '请输入用户名', trigger: 'blur' },
                    { min: 2, max: 5, message: '长度在2-5个字之间', trigger: 'blur' }, 
                ],
                password:[
                    { required: true, message: '请输入密码', trigger: 'blur' },
                    { min: 6, max: 15, message: '长度在6-15个字之间', trigger: 'blur' }, 
                ]
            }
        }
    },
    methods:{
        // 重置登陆表单
        resetLoginForm(){
            this.$refs.loginFormRef.resetFields();
        },
        login(){ 
            this.$refs.loginFormRef.validate(async valid=>{
                if(!valid)return;
                if((this.loginForm.username=='admin')&&(this.loginForm.password=='123456')) this.$message.success('登陆成功')
                else return this.$message.error('登陆失败');
                window.sessionStorage.setItem('token',"zzh");
                this.$router.push("/home");
            });
        },
        // resetLoginForm(){
        //     this.loginForm.username='';
        //     this.loginForm.password='';
        // }
    }
};
</script>

<style lang="less" scoped>
.login_container{
    // background: linear-gradient(to right, rgba(255,0,0,0), rgba(255,0,0,1));
    background: linear-gradient(to left top, rgb(130, 231, 227), rgb(211, 211, 247));
    height: 100%;
}

.login_box{
    width: 450px;
    height: 300px;
    background-color: #fff;
    border-radius:3px;
    position:absolute;
    left:50%;
    top:50%;
    transform: translate(-50%,-50%);
    box-shadow: #eee;
}

.avatar_box{
    height: 130px;
    width: 130px;
    border:1px solid #eee;
    border-radius: 50%;
    padding: 10px;
    box-shadow: 0 0 10px #ddd;
    position:absolute;
    left:50%;
    transform:translate(-50%,-50%);
    background-color: #fff;
    img{
        width: 100%;
        height: 100%;
        border-radius: 50%;
        background-color: #eee;
    }
}
.login_form{
    position: absolute;
    bottom:0;
    width: 100%;
    padding:0 20px;
    box-sizing: border-box;
}

.btn{
    display:flex;
    justify-content: flex-end;
}

</style>
