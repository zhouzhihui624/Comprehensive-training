<template>
    <div class="main">
        <!-- 面包屑导航区 -->
        <el-breadcrumb separator-class="el-icon-arrow-right">
            <el-breadcrumb-item :to="{ path: '/' }">学生管理</el-breadcrumb-item>
            <el-breadcrumb-item>学生列表</el-breadcrumb-item>
        </el-breadcrumb>

        <!-- 卡片视图区域 -->
        <el-card class="box-card" shadow="always">
            <!-- 搜索添加区域 -->
            <el-row :gutter="10">
                <el-col :span="5">
                    <el-input placeholder="请输入学号" v-model="queryInfo.id"
                    clearable @clear="getUserList">
                    <el-button slot="append" icon="el-icon-search" @click="getUserById(queryInfo.id)"></el-button>
                    </el-input>
                </el-col>
                 <el-col :span="5">
                    <el-input placeholder="请输入姓名" v-model="queryInfo.name"
                    clearable @clear="getUserList">
                    <el-button slot="append" icon="el-icon-search" @click="getUserByName(queryInfo.name)"></el-button>
                    </el-input>
                </el-col>
               <el-col :span="4">
                    <el-button type="primary" @click="addDialogVisible=true">添加用户</el-button>
                </el-col>
            </el-row>

            <!-- 用户列表区域 -->
            <el-table :data="userList" border stripe height="400">
                <el-table-column label="序号" type="index" align="center"></el-table-column>
                <el-table-column label="学号" prop="studentId" align="center"></el-table-column>
                <el-table-column label="姓名" prop="stuName" align="center"></el-table-column>
                <el-table-column label="姓别" prop="stuSex" align="center"></el-table-column>
                <el-table-column label="出生日期" prop="stuBirth" align="center"></el-table-column>
                <el-table-column label="操作" header-align="center">
                    <template slot-scope="scope">
                        <!-- 修改按钮 -->
                        <el-tooltip class="item" effect="dark" content="修改" placement="top">
                          <el-button type="primary" icon="el-icon-edit"
                            size="mini" @click="showEditDialog(scope.row.studentId)"></el-button>
                        </el-tooltip>
                        <!-- 删除按钮 -->
                        <el-tooltip class="item" effect="dark" content="删除" placement="top">
                          <el-button type="danger" icon="el-icon-delete" 
                           size="mini" @click="removeUserById(scope.row.studentId)"></el-button>
                        </el-tooltip>
                    </template>
                </el-table-column>
            </el-table>


            <!-- 分页区域 -->
            <!-- <el-pagination
              @size-change="handleSizeChange"
              @current-change="handleCurrentChange"
              :current-page="queryInfo.pagenum"
              :page-sizes="[1,2,5,10]"
              :page-size="queryInfo.pagesize"
              layout="total, sizes, prev, pager, next, jumper"
              :total="total">
            </el-pagination> -->
        </el-card>


        <!-- 用户信息添加提示框 -->
        <el-dialog
          title="添加用户"
          :visible.sync="addDialogVisible"
          width="30%"
          @close="addDialogClosed">
          <!-- 主体区域 -->
            <el-form :model="addForm" :rules="addFormRules" 
            ref="addFormRef" label-width="90px" >
                <el-form-item label="学号" prop="studentId" align="center">
                  <el-input v-model="addForm.studentId"></el-input>
                </el-form-item>
                <el-form-item label="姓名" prop="stuName" align="center">
                  <el-input v-model="addForm.stuName"></el-input>
                </el-form-item>
                <el-form-item label="性别" prop="stuSex" align="center">
                  <el-input v-model="addForm.stuSex"></el-input>
                </el-form-item>
                <el-form-item label="出生日期" prop="stuBirth" align="center">
                  <el-input v-model="addForm.stuBirth"></el-input>
                </el-form-item>
                <el-form-item label="班级号" prop="className" align="center">
                  <el-input v-model="addForm.className"></el-input>
                </el-form-item>
                 <el-form-item label="学院号" prop="department" align="center">
                  <el-input v-model="addForm.department"></el-input>
                </el-form-item>
                 <el-form-item label="籍贯" prop="nativePlace" align="center">
                  <el-input v-model="addForm.nativePlace"></el-input>
                </el-form-item>
            </el-form>
          <!-- 底部区域 -->
          <span slot="footer" class="dialog-footer">
            <el-button @click="addDialogVisible = false">取 消</el-button>
            <el-button type="primary" @click="addUser">确 定</el-button>
          </span>
        </el-dialog>

        <!-- 用户信息修改 -->
        <el-dialog
          title="修改用户"
          :visible.sync="editDialogVisible"
          width="40%"
          @close="editDialogClosed">
          <!-- 主体内容 -->
          <el-form :model="editForm" :rules="editFormRules" 
            ref="editFormRef" label-width="70px" >
                <el-form-item label="学号" prop="studentId">
                  <el-input v-model="editForm.studentId" disabled></el-input>
                </el-form-item>
                <el-form-item label="姓名" prop="stuName">
                  <el-input v-model="editForm.stuName"></el-input>
                </el-form-item>
                <el-form-item label="性别" prop="stuSex">
                  <el-input v-model="editForm.stuSex"></el-input>
                </el-form-item>
                <el-form-item label="出生日期" prop="stuBirth">
                  <el-input v-model="editForm.stuBirth"></el-input>
                </el-form-item>
            </el-form>
          <!-- 底部 -->
          <span slot="footer" class="dialog-footer">
            <el-button @click="editDialogVisible = false">取 消</el-button>
            <el-button type="primary" @click="editUserInfo">确 定</el-button>
          </span>
        </el-dialog>
    </div>
</template>

<script>
import JsonExcel from "vue-json-excel";

export default {
    data(){
        //验证邮箱规则
        var checkEmail=(rule,value,cb)=>{
            const regEmail=/^[a-zA-Z0-9_-]+@[a-zA-Z0-9_-]+(\.[a-zA-Z0-9_-])+/

            if(regEmail.test(value)){
                return cb()
            }

            cb(new Error('请输入合法的邮箱'))
        }

        //验证手机号规则
        var checkMobile=(rule,value,cb)=>{
            const regMobile=/^1(3\d|4[5-9]|5[0-35-9]|6[2567]|7[0-8]|8\d|9[0-35-9])\d{8}$/

            if(regMobile.test(value)){
                return cb()
            }

            cb(new Error('请输入合法的手机号'))
        }

        var checkGrades=(rule,value,cb)=>{
            if(value>=0 &&value<=100){
                return cb()
            }
            cb(new Error('请输入合法的分数'))
        }
        return{
            queryInfo:{
                query:'',
                pagenum:1,
                pagesize:2,
                id:'',
                name:''
            },
            //用户信息列表
            userList:[],
            total:3,
            //添加用户对话框的显示和隐藏
            addDialogVisible:false,
            addUserVisible:false,
            // 添加用户表单数据
            addForm:{},
            addNum:{},
            //添加表单验证规则对象
            addFormRules:{
                studentId:[{
                    required:true, 
                    message:'请输入学号',
                    trigger:'blur'
                }],
                stuName:[{
                    required:true, 
                    message:'请输入用户名',
                    trigger:'blur'
                },{
                    min:3,
                    max:10,
                    message:'用户名的长度在3-10个字之间', 
                    trigger:'blur'
                }],
                stuSex:[{
                    required:true,
                    message:'请输入性别',
                    trigger:'blur'
                }],
                stuBirth:[{
                    required:true, 
                    message:'请输入出生日期',
                    trigger:'blur'
                }],
                className:[{
                    required:true, 
                    message:'请输入班级号',
                    trigger:'blur'
                }],
                department:[{
                    required:true, 
                    message:'请输入学院号',
                    trigger:'blur'
                }],
                nativePlace:[{
                    required:true, 
                    message:'请输入籍贯',
                    trigger:'blur'
                }]
            },
            addNumRules:{
                stuName:[{
                    required:true, 
                    message:'请输入姓名',
                    trigger:'blur'
                }],
                stuSex:[{
                    required:true, 
                    message:'请输入姓别',
                    trigger:'blur'
                }],
                stuBirth:[{
                    required:true, 
                    message:'请输入出生日期',
                    trigger:'blur'
                }]
                
            },
            //控制修改用户对话框的显示和隐藏
            editDialogVisible:false,
            editForm:{},
            //修改表单验证规则对象
            editFormRules:{
                birthday:[{
                    required:true, 
                    message:'请输入出生日期',
                    trigger:'blur'
                }],
                math:[{
                    required:true, 
                    message:'请输入数学成绩',
                    trigger:'blur'
                },{
                    validator:checkGrades,
                    trigger:'blur'
                }],
                java:[{
                    required:true, 
                    message:'请输入JAVA成绩',
                    trigger:'blur'
                },{
                    validator:checkGrades,
                    trigger:'blur'
                }],
                english:[{
                    required:true, 
                    message:'请输入英语成绩',
                    trigger:'blur'
                },{
                    validator:checkGrades,
                    trigger:'blur'
                }],
                pe:[{
                    required:true, 
                    message:'请输入体育成绩',
                    trigger:'blur'
                },{
                    validator:checkGrades,
                    trigger:'blur'
                }]
            },

            json_fields: {
              "学号": "schoolNum",
              "姓名":"name",
              "性别":"sex",
              "出生日期":"birthday",
              "数学":"math",
              "JAVA":"java",
              "英语":"english",
              "体育":"pe",
            }
            
        }
    },
    created(){
        //获取用户数据（需连接后端，暂未实现）
        this.getUserList()
    },
    methods:{
        // this.$http.get('users',{params:this.queryInfo})
        getUserList(){
            let _this=this
            this.$http.get('http://localhost:8890/main/stu/init').then(function(res){
            // console.log(res);
            _this.userList=res.data.data
        })
        console.log("hello");
        },
        getNumList(){
            let _this=this
            this.$http.get('http://localhost:8081/stuClass/list').then(function(res){
            // console.log(res);
             _this.userList.schoolNum=res.data.schoolNum
        })
        },
        getUserById(id){
            let _this=this
            let userTable=[]
            // let sname=['id','stuName','stuSex','stuBirth']
            let o={}
            _this.userList=[]
            this.$http.get('http://localhost:8890/main/stu/search_id/'+id).then(function(res){
                console.log(res);
                userTable.push(res.data.data)
                _this.userList=userTable
                // console.log(userTable);
            }).catch(()=>{
                this.$message({
                    type: 'error',
                    message:"未查找到该用户"
                })
            })
        },
        getUserByName(name){
            let _this=this
            let userTable=[]
            // let sname=['id','stuName','stuSex','stuBirth']
            this.$http.get('http://localhost:8890/main/stu/search_name/'+name).then(function(res){
                for(let i=0;i<res.data.data.length;i++){
                    userTable.push(res.data.data[i])
                }
                // userTable.push(res.data.data[0])
                // userTable.push(res.data.data[1])
                _this.userList=userTable
                // console.log(userTable);
                // console.log(res.data);
            })
        },
        // 监听pagesize改变
        handleSizeChange(newSize){
            console.log(newSize);
            this.queryInfo.pagesize = newSize
            this.getUserList()
        },
        //监听页码值改变
        handleCurrentChange(newPage){
            console.log(newPage);
            this.queryInfo.pagenum = newPage
        },
        //监听switch开关状态的改变
        userStateChanged(userinfo){
            // console.log(userinfo);
            //未实现（连接后端把转态存入数据库中）
            this.$message.success("更新状态成功！")
        },
        //监听添加用户对话框的关闭事件
        addDialogClosed(){
            this.$refs.addFormRef.resetFields()
        },
        addUserClosed(){
            this.$refs.addNumRef.resetFields()
        },
        //点击按钮，添加用户
        addUser(){
            this.$refs.addFormRef.validate(valid=>{
                if(!valid)return;
                //添加用户(后端：未实现)
                let _this=this;
                this.$http.post('http://localhost:8890/main/stu/addStu',this.addForm).then(function(res){
                    if(res.data){
                        console.log(_this.addForm)
                        _this.$message.success("添加成功")
                        _this.addDialogVisible=false;
                        _this.getUserList()
                    }
                })
            })
        },
        //添加用户，自动生成学号
        addNums(){
            this.$refs.addNumRef.validate(valid=>{
                if(!valid)return;
                //添加用户(后端：未实现)
                let _this=this;
                this.$http.post('http://localhost:8081/stuClass/add',this.addNum).then(function(res){
                    if(res.data){
                        _this.$message.success("添加成功")
                        _this.addUserVisible=false;
                        _this.getNumList()
                    }
                })
            })
        },
        //展示编辑用户的对话框
        async showEditDialog(id){
            // const {data:res}=await this.$http.get('user/'+id)
            let _this=this;
            // console.log(id);
            this.$http.get('http://localhost:8890/main/stu/search_id/'+id).then(function(res){
                _this.editForm=res.data.data;
                console.log(res.data);
            })
            this.editDialogVisible=true;
        },
        //监听修改用户对话框的关闭事件
        editDialogClosed(){
            this.$refs.editFormRef.resetFields()
        },
        //修改用户信息并提交
        editUserInfo(){
            this.$refs.editFormRef.validate(async valid=>{
                if(!valid)return
                //提交数据到后端（暂未实现）
            //    const {data:res}=await this.$http.put('user/'+this.editForm.id,{
            //     email:this.editForm.email,
            //     mode:this.editForm.mobile
            //     })
                let _this=this;
                this.$http.put('http://localhost:8890/main/stu/edit',this.editForm).then(function(res){
                    if(res.data){
                        _this.$message.success("更新成功")
                        _this.editDialogVisible=false;
                        _this.getUserList()
                    }
                })
                
            })
        },
        //根据ID删除对应信息
        removeUserById(id){
            let _this=this;
            this.$confirm('此操作将永久删除该用户, 是否继续?', '提示', {
              confirmButtonText: '确定',
              cancelButtonText: '取消',
              type: 'warning',
              center: true
            }).then(() => {
              this.$message({
                type: 'success',
                message: '删除成功!'
              });
            //删除用户（未实现）
            this.$http.get("http://localhost:8890/main/stu/delete/"+id)
            _this.getUserList()
            }).catch(() => {
              this.$message({
                type: 'info',
                message: '已取消删除'
              });
            });
        },
        //查找用户信息
        findUserList(){

        },
        // 导出学生信息excel
        exportExcel(){

        }
    }
}
</script>


<style lang="less" scoped>

.el-row {
    margin-top:10px;
}
</style>