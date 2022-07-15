<template>
    <div>
        <!-- 面包屑导航区 -->
        <el-breadcrumb separator-class="el-icon-arrow-right">
            <el-breadcrumb-item :to="{ path: '/' }">教务网信息管理</el-breadcrumb-item>
            <el-breadcrumb-item>学籍变更</el-breadcrumb-item>
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
                 <el-table-column label="变更情况" prop="changeDescription" align="center">
                    <!-- <template>
                      <el-select v-model="value" placeholder="请选择">
                        <el-option
                          v-for="item in options"
                          :key="item.value"
                          :label="item.label"
                          :value="item.value">
                        </el-option>
                      </el-select>
                    </template> -->
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
                <el-form-item label="变更序号" prop="changeId" align="center">
                  <el-input v-model="addForm.changeId"></el-input>
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
              label: '转学'
            }, {
              value: '1',
              label: '休学'
            }, {
              value: '2',
              label: '复学'
            }, {
              value: '3',
              label: '退学'
            }, {
              value: '4',
              label: '毕业'
            }],
            value: '',
            //用户信息列表
            userList:[],
            //添加用户对话框的显示和隐藏
            addDialogVisible:false,
            addUserVisible:false,
            // 添加用户表单数据
            addForm:{},
            //添加表单验证规则对象
            addFormRules:{
                studentName:[{
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
                recTime:[{
                    required:true,
                    message:'请输入时间',
                    trigger:'blur'
                }],
                changeId:[{
                    required:true,
                    message:'请输入变更序号',
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
            this.$http.get('http://localhost:8890/main/office/getChangeById/'+id).then(function(res){
                // console.log(res.data.data[0].recTime);
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
                this.$http.post('http://localhost:8890/main/office/addChange',this.addForm).then(function(res){
                    if(res.data){
                        console.log(_this.addForm)
                        _this.$message.success("添加成功")
                        _this.addDialogVisible=false;
                        // _this.getUserList()
                    }
                })
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
</script>


<style lang="less" scoped>

</style>