<template>
  <div>
    <!--面包屑导航区域-->
    <el-breadcrumb separator-class="el-icon-arrow-right">
      <el-breadcrumb-item :to="{ path: '/weclome' }">首页</el-breadcrumb-item>
      <el-breadcrumb-item>反馈管理</el-breadcrumb-item>
      <el-breadcrumb-item>问卷列表</el-breadcrumb-item>
    </el-breadcrumb>
  </div>
  <!--卡片区域-->
  <el-card>
     <!--信息表格区域-->
     <el-table :data="diaochalist" style="width: 100%" :header-cell-style="{ 'text-align': 'center' }"
      :cell-style="{ 'text-align': 'center' }" stripe border>
      <el-table-column type="index" label="序号" width="180" />
      <el-table-column property="title" label="类别" width="230" />
      <el-table-column label="内容" property="content" width="550" />
      <el-table-column label="处理状态" property="showStatus" width="120">
  <template #default="scope">
    <div v-if="scope.row.showStatus === 1" style="color:#13ce66;font-weight:bold">已处理</div>
    <div v-else style="color:#ff4949;font-weight:bold">未处理</div>
  </template>
</el-table-column>
      <el-table-column label="操作">
        <template #default="scope">
    <div>
      <el-button type="warning" @click="chuli(scope.row)" :disabled="scope.row.showStatus === 0 ? false : true">
        {{ scope.row.showStatus === 0 ? '处理' : '已处理' }}
      </el-button>
    </div>
  </template>
      </el-table-column>
    </el-table>
  </el-card>
</template>
<script>
export default {
 data(){
  return{
    //处理状态
    status:false,
    diaochalist:[{
      title:'反馈物流',
      content:'物流信息更新比较慢',
      showStatus:0
    },
  {
      title:'反馈客服',
      content:'客服在线时间太短了',
      showStatus:0
    },
    {
      title:'商品建议',
      content:'希望增加一些衣服类的优惠力度',
      showStatus:1
    },
  
  ],
     //分页信息
     Userinfo: {
        current: 1,
        size: 4,
      }
  }
 },
 created(){
 },
 methods:{
  chuli(row){
    if(row.showStatus === 0){
      row.showStatus = 1;
      ElMessage({
        type: 'success',
        message: '处理成功',
      });
    }
  }
 } 
}
</script>
<style lang="scss" scoped>

.el-breadcrumb {
  margin-bottom: 15px;
  font-size: 20px;
}

.el-card {
  box-shadow: 0 1px 1px rgba(0, 0, 0, 0.15) !important;
}

.el-table {
  margin-top: 20px;
  font-size: 20px;
  text-align: center;
  font-family: '微软雅黑';
}

.el-pagination {
  margin-top: 20px;
}

.el-tag {
  font-size: 18px;
  text-align: center;
}

</style>