<template>
    <el-container class="home-container">
      <!--头部区域-->
      <el-header>
  <div style="display:flex; align-items: center;">
  <img src="../../assets/person3.jpg" alt="" style="border-radius: 50%; width: 50px; height: 50px; background-color: #eaedf1; margin-right: 10px;">
  <span>我不是小黑子</span>
</div>
    <el-button type="info" @click="loginout">退出</el-button>
    </el-header>
    <!--侧边栏区域-->
      <el-container>
           <!--页面侧边栏区域-->
    <el-aside :width="isclose ? '55px' :'230px'">
       <!--控制侧边栏是否折叠-->
       <div class="closebutton" @click="closemenu">
        <el-icon><ArrowRight /></el-icon>
      </div>
      <!--侧边栏菜单区域-->
      <el-menu  background-color="#333744" text-color="#fff" active-text-color="#409EFF" router :default-active="statepath" 
      unique-opened :collapse="isclose" :collapse-transition="false">
      <!--一级菜单-->
     <el-sub-menu :index="item.id+''" v-for="item in menulist" :key="item.id">
      <!--一级菜单区域模板-->
            <template #title>
              <!--图标-->
              <el-icon>
              <component :is="icons[item.id]"></component>
            </el-icon>
              <!--文本-->
              <span>{{item.menuName}}</span>
            </template>
            <!--二级菜单-->
            <el-menu-item  :index="item1.menuUrl+''" v-for="item1 in item.children" :key="item1.id" @click="save('/'+item1.menuUrl)">
              <!--二级菜单模板区域-->
              <template #title>
              <!--图标-->
              <el-icon><Grid /></el-icon>
              <!--文本-->
              <span>{{item1.menuName}}</span>
            </template>
              </el-menu-item>  
  </el-sub-menu>
  </el-menu>
</el-aside>
        <el-main><router-view>

        </router-view></el-main>
      </el-container>
    </el-container>
</template>
<script>
import { ElMessage, ElMessageBox} from 'element-plus'
export default{
 data() {
  return {
      //左侧菜单数据列表
      menulist:[
         {"id": 1,
        "menuName": "帮助信息分类管理",
        "menuUrl": "/help/guanli",
        "children": [
          {
            "id": 2,
            "menuName": "帮助信息列表",
            "menuUrl": "/helplist"
          }]},
          {"id": 3,
        "menuName": "反馈管理",
        "menuUrl": "/fankui",
        "children": [
          {
            "id": 4,
            "menuName": "问卷列表",
            "menuUrl": "/diaocha"
          }]},
      ],
     // 侧边栏高度
      //菜单栏激活状态
      statepath:'',
      //菜单栏隐藏状态
      isclose:false,
      icons:{
        '1':'Opportunity',
        '3':'ChatLineSquare',
      },
  }
}, 
methods:{
 async loginout(){
  const out=await ElMessageBox.confirm('是否确定退出?', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).catch(err=>err);
      //当确认删除时deleteresult文本为confirm
      //当取消删除时deleteresult文本为cancel
      //console.log(deleteresult)
      console.log(out)
      if(out !='confirm') return  ElMessage({
        type: 'info',
        message: '已取消退出',
      });
      ElMessage({
        type: 'success',
        message: '退出成功',
      });
      this.$router.push('/');
},
closemenu(){
     this.isclose=!this.isclose;
    }
}
    }
</script>
<style lang="scss" scoped>
.el-header{
  background-color: #373d41;
  //弹性布局
  display: flex;
  //设置横坐标上左右对齐
  justify-content: space-between;
  //清空做内边距
  padding-left: 0;
  //设置退出按钮纵坐标上居中对齐
  align-items: center;
  color:#fff;
  font-size: 20px;
  >div{
    display: flex;
    align-items: center;
  }
  span{
    margin-left: 10px;
  }
}
.el-aside{
background-color: #333744;
font-size: 30px;
.el-menu{
  border-right: none;
}
}
.el-main{
  background-color:#eaedf1;
}
.home-container{
  height:100%;
}
.closebutton{
  background-color: #4a5064;
  font-size: 25px;
  line-height: 24px;
  color: #fff;
  text-align: center;
  cursor: pointer;
}
span{
  font-size: 18px;
}
</style>


