<template>
  <div class="header">
  <div class="container">
    <el-button class="arrow-icon" @click="out">
    <el-icon ><ArrowLeft /></el-icon></el-button>
   <img src="../../assets/person3.jpg" class="logo">
    <span class="help">帮助中心</span>
  </div>
  <div class="card">
    <el-card shadow="always" > 尊敬的我不是小黑子，购物问题可以查询下表哦</el-card>
  </div>
  <el-row :gutter="20" style="margin-left:20px;margin-bottom: 18px;">
      <el-col :span="8">
        <el-input placeholder="请输入问题" size="large" v-model="this.find.name">
          <template #append>
            <el-button @click="search(this.find.name)">
              <el-icon>
                <Search />
              </el-icon></el-button>
          </template>
        </el-input>
      </el-col>
      </el-row>
      <!--问题区域-->
  <div class="bg">
    <div class="bg1">
      <span><font color="#FFA500">猜你</font></span><br>
      <span><font color="#D3D3D3">想问</font></span>
      <br><br>
      <el-button style="border-radius: 15px;color:#C0C0C0" @click="hh">换一换</el-button>
      <br>
      <el-button style="border-radius: 15px;color:#C0C0C0" @click="this.fkdialogVisible=true">问题反馈</el-button>
    </div>
    <div class="bg2">
      <el-table :data="tableData" stripe>
    <el-table-column prop="name" label="问题"/>
    <el-table-column label="" width="120">
    <template #default="scope">
      <el-button style="border: none;
      background-color: transparent;
      color: inherit;
     cursor: pointer;
     outline: none;" @click="jieda(scope.row)">
    <el-icon><Position /></el-icon></el-button>
    </template>
  </el-table-column>
  </el-table>
    </div>
  </div>
  <br><br>
  <div style="padding: 20px; width:30%; margin-left:20px;">
  <el-button style="width:20%; margin-right:15px; margin-bottom: 10px;background-color:#eaedf1 ;" @click="dianji1">
    <div style="background-color: white; width:100%; border-radius: 15px; display: flex; flex-direction: column; align-items: center;">
      <img src="../../assets/1.png" style="width:90px; height:60px; margin: 10px 0;" />
      <span style="font-size: 18px; text-align: center; margin-top: 10px;font-family: '黑体';">评价管理</span>
    </div>
  </el-button>
  <el-button style="width:20%; margin-right:10px; margin-bottom: 10px;background-color:#eaedf1 ;" @click="dianji">
    <div style="background-color: white; width:100%; border-radius: 15px; display: flex; flex-direction: column; align-items: center;">
      <img src="../../assets/2.png" style="width:90px; height:60px; margin: 10px 0;" />
      <span style="font-size: 18px; text-align: center; margin-top: 10px;">物流查询</span>
    </div>
  </el-button>
  <el-button style="width:20%; margin-right:10px; margin-bottom: 10px;background-color:#eaedf1 ;" @click="dianji2">
    <div style="background-color: white; width:100%; border-radius: 15px; display: flex; flex-direction: column; align-items: center;">
      <img src="../../assets/3.png" style="width:90px; height:60px; margin: 10px 0;" />
      <span style="font-size: 18px; text-align: center; margin-top: 10px;">服务进度</span>
    </div>
  </el-button>
  <el-button style="width:20%; margin-right:10px; margin-bottom: 10px;background-color:#eaedf1 ;" @click="dianji3">
    <div style="background-color: white; width:100%; border-radius: 15px; display: flex; flex-direction: column; align-items: center;">
      <img src="../../assets/4.png" style="width:90px; height:60px; margin: 10px 0;" />
      <span style="font-size: 18px; text-align: center; margin-top: 10px;">退款进度</span>
    </div>
  </el-button>
</div>
</div>
<!--解答对话框-->
<el-dialog title="帮助信息内容" v-model="jiedadialogVisible" width="50%" height="60%">
    <!--内容主体区域-->
    <div class="dialog-content">
    <div class="img-container">
      <img src="../../assets/11.png"/>
    </div>
    <div class="text-container">
      <span style="font-size: 22px;font-family: '黑体';">
      {{this.JieDaform.content}}
    </span></div></div>
    <!--底部区域-->
    <template #footer>
      <el-button type="primary" @click="this.jiedadialogVisible=false">确 定</el-button>
    </template>
  </el-dialog>

  <!--物流查询对话框-->
<el-dialog title="物流查询管理" v-model="dianjidialogVisible" width="50%">
    <!--内容主体区域-->
    <div class="dialog-content">
    <div class="img-container">
      <img src="../../assets/11.png"/>
    </div>
    <div class="text-container">
      <span style="font-size: 22px;font-family: '黑体';">
      当前未查询到您有订单在进行中,如需帮助您可以看看更多服务
      <br><br>
        <el-button size="large" round style="font-size:18px;" color="#626aef" @click="tz">更多服务</el-button>
    </span></div></div>
    <!--底部区域-->
    <template #footer>
      <el-button type="primary" @click="this.dianjidialogVisible=false">确 定</el-button>
    </template>
  </el-dialog>
  <!--评价管理对话框-->
<el-dialog title="评价管理" v-model="dianji1dialogVisible" width="50%">
    <!--内容主体区域-->
    <div class="dialog-content">
    <div class="img-container">
      <img src="../../assets/11.png"/>
    </div>
    <div class="text-container">
      <span style="font-size: 22px;font-family: '黑体';">
        仅展示近3个月的订单,当前无未评价的订单,如需帮助您可以看看更多服务
        <br><br>
        <el-button size="large" round style="font-size:18px;" color="#626aef" @click="tz">更多服务</el-button>
    </span></div></div>
    <!--底部区域-->
    <template #footer>
      <el-button type="primary" @click="this.dianji1dialogVisible=false">确 定</el-button>
    </template>
  </el-dialog>
  <!--服务进度管理对话框-->
<el-dialog title="服务进度管理" v-model="dianji2dialogVisible" width="50%">
    <!--内容主体区域-->
    <div class="dialog-content">
    <div class="img-container">
      <img src="../../assets/11.png"/>
    </div>
    <div class="text-container">
      <span style="font-size: 22px;font-family: '黑体';">
        仅展示近3个月的服务,当前暂无相关进度,如需帮助您可以看看更多服务
        <br><br>
        <el-button size="large" round style="font-size:18px;" color="#626aef" @click="tz">更多服务</el-button>
    </span></div></div>
    <!--底部区域-->
    <template #footer>
      <el-button type="primary" @click="this.dianji2dialogVisible=false">确 定</el-button>
    </template>
  </el-dialog>

  <!--退款进度管理对话框-->
<el-dialog title="退款进度管理" v-model="dianji3dialogVisible" width="50%">
    <!--内容主体区域-->
    <div class="dialog-content">
    <div class="img-container">
      <img src="../../assets/11.png"/>
    </div>
    <div class="text-container">
      <span style="font-size: 22px;font-family: '黑体';">
        当前未有正进行售后处理的订单,如需帮助您可以看看更多服务
        <br><br>
        <el-button size="large" round style="font-size:18px;" color="#626aef" @click="tz">更多服务</el-button>
    </span></div></div>
    <!--底部区域-->
    <template #footer>
      <el-button type="primary" @click="this.dianji3dialogVisible=false">确 定</el-button>
    </template>
  </el-dialog>
  <!--反馈表单-->
  <el-dialog title="意见收集表单" v-model="fkdialogVisible" width="60%" @close="resetForm">
  <el-form 
    ref="fkFormRef"
    :model="fkForm"
    :rules="rules"
    label-width="120px"
    status-icon>
    <el-form-item label="姓名" prop="name">
      <el-input v-model="fkForm.name" />
    </el-form-item>
    <el-form-item label="联系方式" prop="tel">
      <el-input v-model="fkForm.tel" />
    </el-form-item>
    <el-form-item label="建议或者问题" prop="desc">
      <el-input v-model="fkForm.desc" type="textarea" />
    </el-form-item>
    <el-form-item>
      <el-button type="primary" @click="fankui">
        提交
      </el-button>
      <el-button @click="resetForm">取消</el-button>
    </el-form-item>
  </el-form>
  </el-dialog>
</template>
<script>
import { queryName,getall,getCmsHelps } from '../../http/helplist'
import { ElMessage, ElMessageBox } from 'element-plus'
export default {
  data(){
    return{
      //反馈表单规则
      rules: {
        name: [
          { required: true, message: '请输入姓名', trigger: 'blur' },
          { min: 2, max: 10, message: '类别长度在 2 到 10 个字符', trigger: 'blur' }
        ],
        tel: [
          { required: true, message: '请输入联系方式', trigger: 'blur' },],
          desc :[
          { required: true, message: '请输入内容', trigger: 'blur' },
          { min: 1, max: 300, message: '类别长度在 1 到 300 个字符', trigger: 'blur' }
          ]
      },
      //反馈表单对象
      fkForm:{
        name:'',
        tel:'',
        desc:''
      },
      count:1,
      //意见反馈对话框状态
      fkdialogVisible:false,
      //退款进度对话框
      dianji3dialogVisible:false,
      //服务进度的对话框状态
      dianji2dialogVisible:false,
      //评价管理的对话框状态
      dianji1dialogVisible:false,
      //物流查询的对话框状态
      dianjidialogVisible:false,
      //解法对话框数据对象
      JieDaform: {
        content: '',
      },
      //解答对话框的关闭
      jiedadialogVisible:false,
      newtableData:[],
      tableData:[],
      Userinfo:{
        current: 1,
        size: 4,
      },
 //搜索栏绑定对象
 find: {
        name: ''
      },
    }
  },
created(){
  this.getroot();
},
methods:{
  //问题反馈方法
  fankui(){
    ElMessage({
          type: 'success',
          message: '您的反馈已成功提交，感谢您的使用',
        });
        this.fkdialogVisible=false;
  },
  //意见反馈表单重置方法
  resetForm() {
      this.$refs.fkFormRef.resetFields();
      this.fkdialogVisible=false;
    },
  //点击换一换按钮进行切换
 async hh(){
    const info={
        current:1,
        size:12
      }
      const data = await getall(info);
      this.total = data.data.page.total;
      this.newtableData = data.data.page.records
      console.log(this.newtableData);
    console.log(this.newtableData)
   if(this.count>3){
    console.log(this.count)
    this.count=1;
   } 
   if(this.count==1){
    console.log(this.count)
    this.tableData=[];
    for(var i=0;i<4;i++){
      console.log(this.newtableData[i]);
      this.tableData.push(this.newtableData[i]);}
      this.count++;
      console.log(this.tableData);
    }else if(this.count==2){
      console.log(this.count)
      this.tableData=[];
        for(var i=4;i<8;i++){
          this.tableData.push(this.newtableData[i])
      
        }    console.log(this.tableData);
        this.count++;
    }else{
      console.log(this.count)
      this.tableData=[];
        for(var i=8;i<12;i++){
          this.tableData.push(this.newtableData[i])}
          console.log(this.tableData);
          this.count++;
    }
  },
  //点击更多按钮进行跳转
  tz(){
    this.$router.push('/root');
    this.dianji2dialogVisible=false;
    this.dianji1dialogVisible=false;
    this.dianjidialogVisible=false;
    this.dianji3dialogVisible=false;
  },
  //退款服务对话框
  dianji3(){
this.dianji3dialogVisible=true;
  },
  //服务进度对话框
  dianji2(){
    this.dianji2dialogVisible=true;
  },
  //评价管理对话框
  dianji1(){
    this.dianji1dialogVisible=true;
  },
  //物流查询对话框
  dianji(){
 this.dianjidialogVisible=true;
  },
  //点击箭头显示解决方法
 async jieda(row){
  console.log(row);
  const data=await getCmsHelps(row.id);
  if(data.code==1){
  const list=data.data.cmsHelps;
  list.forEach(item=>{
    this.JieDaform.content=item.content;
  })
  this.jiedadialogVisible=true;
  }
  else{
    ElMessage({
          type: 'error',
          message: '问题暂时未解决或已经隐藏了哦',
        });
  }},
  async getroot() {
      //页面加载方法
      const data = await getall(this.Userinfo);
      this.total = data.data.page.total;
      console.log(data);
      this.tableData = data.data.page.records
    },
  out(){
    this.$router.push('/');
  },
  //搜索栏方法
  async search(name) {
      const data = await queryName(name);
      console.log(data)
      if (data.code != 1) {
        ElMessage({
          type: 'error',
          message: '信息不存在',
        });
      }
      if (data.code == 1) {
        this.tableData = []
        const list = data.data.cmsHelpCategoryList
        list.forEach(async item => {
            this.tableData.push(item)
        });
      }
}}
}
</script>
<style scoped lang="scss">
.bg2{
  width:1000px;
  box-sizing:border-box;
  float:right;
}
.bg1 span{
  font-size: 32px;
  font-family: '微软雅黑';
}
.bg1{
  width:140px;
  box-sizing:border-box;
  height: 100%;
  margin-left: 40px;
  margin-top:30px;
  margin-bottom: 18px;
  float: left;
}
.bg{
  box-sizing:border-box;
  background-color: #fff;
  width:70%;
  height: 300px;
  margin-left:30px;
  border-radius: 15px;
  font-size:center;
  line-height:40px;
  overflow: hidden;
}
.card{
  width:30%;
  margin-top: 28px;
  margin-left: 10px;
  font-size: 18px;
  font-family: '微软雅黑';
  margin-bottom: 20px;
  border-radius: 15px;
}
.header{
  background-color:#eaedf1;
  height: 100%;
  width:100%;
}
  .container {
   
    margin-top: 18px;
    display: flex; /* 使用 flex 布局 */
    align-items: center; /* 垂直居中 */
    height: 50px;
    border-bottom: solid #fff 1px;
    
  }
  .arrow-icon {
    margin-left: 20px;
    font-size: 50px; /* 图标大小为 20px */
    margin-right: 10px; /* 图标和图片之间留出 10px 的空隙 */
    border: none;
   background-color: transparent;
   color: inherit;
   cursor: pointer;
   outline: none;
  }
  .logo {
    border-radius: 50%;
    width: 50px;
    height: 50px;
    background-color: #eaedf1;
    border: none;
  }
.help{
  font-size: 28px;
  font-family: '微软雅黑';
  margin-left:10px
}
.el-table{
  font-size:22px;
  font-family: '黑体';
}
.dialog-content {
  display: flex;
  align-items: center;
  justify-content: space-around;
  padding: 20px;
}
.img-container {
  flex: 1;
}
.text-container {
  flex: 2;
  padding-left: 20px;
}
.el-button{
  border:none;
}
</style>