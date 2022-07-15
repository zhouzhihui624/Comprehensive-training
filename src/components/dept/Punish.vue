<template>
    <div>
        <!-- 面包屑导航区 -->
        <el-breadcrumb separator-class="el-icon-arrow-right">
            <el-breadcrumb-item :to="{ path: '/' }">教务网信息管理</el-breadcrumb-item>
            <el-breadcrumb-item>处分记录</el-breadcrumb-item>
        </el-breadcrumb>

         <!-- 卡片视图区域 -->
        <el-card class="box-card" shadow="always">

            <!-- 搜索添加区域 -->
            <el-row :gutter="10">
                <el-col :span="5">
                    <el-input placeholder="请输入学号" v-model="queryInfo.id"
                    clearable >
                    <el-button slot="append" icon="el-icon-search" @click="getUserById(queryInfo.id)"></el-button>
                    </el-input>
                </el-col>
               <el-col :span="4">
                    <el-button type="primary" @click="addDialogVisible=true">添加记录</el-button>
                </el-col>
            </el-row>

            <!-- 用户列表区域 -->
            <el-table :data="userList" border stripe height="400">
                <el-table-column label="记录号" type="index" align="center" width="100"></el-table-column>
                <el-table-column label="学号" prop="studentId" align="center"></el-table-column>
                <el-table-column label="姓名" prop="studentName" align="center"></el-table-column>
                <el-table-column label="时间" prop="recTime" align="center"></el-table-column>
                <el-table-column label="详细描述" prop="description" align="center"></el-table-column>
                 <el-table-column label="变更情况" prop="punishmentDescription" align="center">
                 </el-table-column>
                 <el-table-column label="是否生效" align="center">
                    <template slot-scope="scope">
                        <el-switch
                          v-model="effect"
                          active-color="#13ce66"
                          inactive-color="#ff4949"
                          active-text="是"
                          inactive-text="否"
                          @change="userStateChanged(scope.row.studentId)">
                        </el-switch>
                    </template>
                 </el-table-column>
            </el-table>
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
                <el-form-item label="详细描述" prop="description" align="center">
                  <el-input v-model="addForm.description"></el-input>
                </el-form-item>
                <el-form-item label="级别" prop="levels" align="center">
                  <el-input v-model="addForm.levels"></el-input>
                </el-form-item>
                <el-form-item label="是否生效" prop="enable" align="center">
                  <el-input v-model="addForm.enable"></el-input>
                </el-form-item>
            </el-form>
          <!-- 底部区域 -->
          <span slot="footer" class="dialog-footer">
            <el-button @click="addDialogVisible = false">取 消</el-button>
            <el-button type="primary" @click="addUser">确 定</el-button>
          </span>
        </el-dialog>
    </div>
</template>

<script>
export default {
    data(){
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
            options: [{
              value: '0',
              label: '警告'
            }, {
              value: '1',
              label: '严重警告'
            }, {
              value: '2',
              label: '记过'
            }, {
              value: '3',
              label: '记大过'
            }, {
              value: '4',
              label: '开除'
            }],
            value: '',

            //用户信息列表
            userList:[],
            //添加用户对话框的显示和隐藏
            addDialogVisible:false,
            addUserVisible:false,
            // 添加用户表单数据
            addForm:{},
            //swich 开关转态
            effect:true,

            //添加表单验证规则对象
            addFormRules:{
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
                studentId:[{
                    required:true,
                    message:'请输入学号',
                    trigger:'blur'
                }],
                levels:[{
                    required:true, 
                    message:'请输入级别',
                    trigger:'blur'
                }],
                enable:[{
                    required:true, 
                    message:'请输入1或0',
                    trigger:'blur'
                }],
                description:[{
                    required:true, 
                    message:'请输入详细描述',
                    trigger:'blur'
                }]
            }
        }
    },
    created(){
    },
    methods:{
        getUserById(id){
            let _this=this
            _this.userList=[]
            this.$http.get('http://localhost:8890/main/office/getPunishmentById/'+id).then(function(res){
                console.log(res);
                _this.userList=res.data.data
                // console.log(userTable);
            }).catch(()=>{
                this.$message({
                    type: 'error',
                    message:"未查找到该用户"
                })
            })
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
                this.$http.post('http://localhost:8890/main/office/addPunishment',this.addForm).then(function(res){
                    if(res.data){
                        console.log(_this.addForm)
                        _this.$message.success("添加成功")
                        _this.addDialogVisible=false;
                        // _this.getUserList()
                    }
                })
            })
        },
        //监听 switch 开关状态的改变
        userStateChanged(userinfo){
            // console.log(userinfo);
            // console.log(this.effect);
            // if(this.effect){
            //     this.userList.enable=1;
            // }else this.userList.enable=0
            // var o={};
            // o.enable=this.userList.enable;
            // o.id=userinfo.
            // this.$http.put('http://localhost:8890/editPunishmentById',this.userList).then(function(res){
            //     if(res.data){
            //         console.log(res.data);
            //     }
            // })
        }
    },
    mounted(){}
}
</script>


<style lang="less" scoped>

.el-row {
    margin-top:10px;
}
</style>
</script>


<style lang="less" scoped>

</style>