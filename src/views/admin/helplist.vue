<template>
  <div>
    <!--面包屑导航区域-->
    <el-breadcrumb separator-class="el-icon-arrow-right">
      <el-breadcrumb-item :to="{ path: '/weclome' }">首页</el-breadcrumb-item>
      <el-breadcrumb-item>帮助信息分类管理</el-breadcrumb-item>
      <el-breadcrumb-item>帮助信息列表</el-breadcrumb-item>
    </el-breadcrumb>
  </div>
  <!--卡片区域-->
  <el-card>
    <!--搜索与添加区域-->
    <el-row :gutter="20">
      <el-col :span="8">
        <el-input placeholder="请输入搜索内容" size="large" v-model="this.find.name">
          <template #append>
            <el-button @click="search(this.find.name)">
              <el-icon>
                <Search />
              </el-icon></el-button>
          </template>
        </el-input>
      </el-col>
      <el-col :span="6">
        <el-button type="primary" @click="adddialogVisible = true">添加信息</el-button>
      </el-col>
    </el-row>
    <!--信息表格区域-->
    <el-table :data="helplist" style="width: 100%" :header-cell-style="{ 'text-align': 'center' }"
      :cell-style="{ 'text-align': 'center' }" stripe border>
      <el-table-column type="index" label="序号" width="180" />
      <el-table-column property="title" label="类别" width="230" />
      <el-table-column label="内容" property="content" width="550" />
      <el-table-column label="展示状态" property="showStatus" width="120">
        <template #default="scope">
          <el-switch v-model="scope.row.showStatus" :active-value="0" :inactive-value="1"  active-color="#13ce66"
     inactive-color="#ff4949" 
     @change="zs(scope.row)">
          </el-switch>
        </template>
      </el-table-column>
      <el-table-column label="操作">
        <template #default="scope">
          <el-button type="warning" @click="edit(scope.row)">修改</el-button>
          <el-button type="danger" @click="deleteuser(scope.row.id)">删除</el-button>
        </template>
      </el-table-column>
    </el-table>
    <!--分页功能-->
    <el-pagination @size-change="handleSizeChange" @current-change="handleCurrentChange" :current-page="Userinfo.current"
      :page-sizes="[4, 8, 12, 16]" :page-size="Userinfo.size" layout="total, sizes, prev, pager, next, jumper"
      :total="total">
    </el-pagination>
  </el-card>
  <!--添加信息对话框-->
  <el-dialog title="添加帮助信息" v-model="adddialogVisible" @close="addformclose" width="50%">
    <!--内容主体区域-->
    <el-form ref="AddformRef" :model="Addform" label-width="70px" :rules="addformrules">
      <el-form-item label="类别" prop="title">
        <el-input v-model="Addform.title"></el-input>
      </el-form-item>
      <el-form-item label="内容" prop="content">
        <el-input v-model="Addform.content"></el-input>
      </el-form-item>
      <el-form-item label="展示状态" prop="showStatus">
        <el-input v-model="Addform.showStatus"></el-input>
      </el-form-item>
      <el-form-item label="图标" prop="icon">
        <el-input v-model="Addform.icon"></el-input>
      </el-form-item>
    </el-form>
    <!--底部区域-->
    <template #footer>
      <el-button @click="this.adddialogVisible = false">取 消</el-button>
      <el-button type="primary" @click="adduser">确 定</el-button>
    </template>
  </el-dialog>
  <!--修改信息对话框-->
  <el-dialog title="修改帮助信息" v-model="editdialogVisible" @close="editclose" width="50%">
    <!--内容主体区域-->
    <el-form ref="EditformRef" :model="Editform" label-width="70px" :rules="addformrules">
      <el-form-item label="类别" prop="title">
        <el-input v-model="Editform.title"></el-input>
      </el-form-item>
      <el-form-item label="内容" prop="content">
        <el-input v-model="Editform.content"></el-input>
      </el-form-item>
      <el-form-item label="图标" prop="icon">
        <el-input v-model="Editform.icon"></el-input>
      </el-form-item>
    </el-form>
    <!--底部区域-->
    <template #footer>
      <el-button @click="this.editdialogVisible = false">取 消</el-button>
      <el-button type="primary" @click="editlist">确 定</el-button>
    </template>
  </el-dialog>
</template>
<script>
import { addhelpcate, queryName, addhelp, helppage, getCmsHelps, helpedit, helpedel,getone } from '../../http/helplist'
import { ElMessage, ElMessageBox } from 'element-plus'
export default {
  data() {
    return {
      helplist: [],
      //控制添加信息对话框的显示与隐藏
      adddialogVisible: false,
      //控制修改信息对话框的显示与隐藏
      editdialogVisible: false,
      total: '',
      //分页信息
      Userinfo: {
        current: 1,
        size: 4,
      },
      //搜索栏绑定对象
      find: {
        name: ''
      },
      //添加信息表单数据
      Addform: {
        title: '',
        content: '',
        showStatus: '',
        icon: ''
      },
      //修改信息表单数据
      Editform: {
        title: '',
        content: '',
        icon: '',
      },
      editform: {
        "id": '',
        "categoryId": '',
        "title": '',
        "showStatus": '',
        "content": ''
      },
      addformrules: {
        title: [
          { required: true, message: '请输入类别', trigger: 'blur' },
          { min: 3, max: 50, message: '类别长度在 3 到 50 个字符', trigger: 'blur' }
        ],
        content: [
          { required: true, message: '请输入内容', trigger: 'blur' },
          { min: 3, max: 100, message: '内容长度在 3 到 100个字符', trigger: 'blur' }],
        icon: [
          { required: true, message: '请输入内容', trigger: 'blur' },
          { min: 3, max: 100, message: '内容长度在 3 到 100个字符', trigger: 'blur' }]
      }
    }
  },
  created() {
    this.getlist();
  },
  methods: {
    //获取当前页码
    handleCurrentChange(newpage) {
      this.Userinfo.current = newpage;
      this.getlist();
    },
    //信息切换展示状态
    async zs(row) {
      const data = await helpedit(row);
      if(data.code!=1) return  ElMessage({
          type: 'error',
          message: '状态修改失败',
        });
        ElMessage({
          type: 'success',
          message: '状态修改成功',
        });

    },
    //获取当前页展示最大数量
    handleSizeChange(newsize) {
      this.Userinfo.size = newsize;
      this.getlist();
    },
    async getlist() {
      //页面加载方法
      const data = await helppage(this.Userinfo);
      this.total = data.data.page.total;
      console.log(data);
      this.helplist = data.data.page.records
      console.log('99999999',this.helplist);
    },

    //搜索栏方法
    async search(name) {
      const data = await queryName(name);
      if (data.code != 1) {
        ElMessage({
          type: 'error',
          message: '信息不存在',
        });
      }
      if (data.code == 1) {
        this.helplist = []
        const list = data.data.cmsHelpCategoryList
        list.forEach(async item => {
          const item1 = await getCmsHelps(item.id);
          item1.data.cmsHelps.forEach(item2 => {
            //console.log(item2)
            this.helplist.push(item2)
          })
          //console.log(this.helplist);
        });
      }
    },
    //增加信息途中点击关闭，对话框置空所填内容
    addformclose() {
      this.$refs.AddformRef.resetFields();
    },
    async adduser() {
      const user = {
        'name': this.Addform.title,
        'showStatus': this.Addform.showStatus,
        'icon':this.Addform.icon,
      }
      console.log(user);
      const data = await addhelpcate(user);
      console.log(data);
      const data1 = await queryName(user.name);
      console.log('data1',data1);
      if (data.code == 1 && data1.code == 1) {
        const shuju = {
          'categoryId': data1.data.cmsHelpCategoryList[0].id,
          'content': this.Addform.content,
          'showStatus': this.Addform.showStatus,
          'title': this.Addform.title
        };
        const data3 = await addhelp(shuju);
        if (data3.code == 1) {
          ElMessage({
            type: 'success',
            message: '成功添加信息',
          })
          this.adddialogVisible = false;
          this.getlist();
        }
        else {
          ElMessage({
            type: 'error',
            message: '添加信息失败',
          });
          this.adddialogVisible = false;
        }
      }
      else {
        ElMessage({
          type: 'error',
          message: '添加信息失败',
        });
        this.adddialogVisible = false;
      } 
    },
    //修改途中点击关闭，修改对话框中恢复原本内容
    editclose() {
      this.$refs.EditformRef.resetFields();
    },
    editlist() {
      this.$refs.EditformRef.validate(async (vali) => {
        if (!vali) return
        //const {data:res}=await this.$http.put('/employee/update',this.Editform);
        //console.log(res);
        const editdata = await helpedit(this.Editform);
        if (editdata.code != 1) return ElMessage({
          type: 'error',
          message: '修改失败',
        });
        ElMessage({
          type: 'success',
          message: '修改成功',
        });
        this.editdialogVisible = false;
        this.getuserlist();
      })
    },
   async edit(row) {
    console.log(row.id)
      const editdata= await getone(row.id);
      console.log(editdata.data.help);
      this.Editform = editdata.data.help;
      this.editdialogVisible = true;
    },
    //根据id进行删除
    async deleteuser(id) {
      //console.log(id)
      const deleteresult = await ElMessageBox.confirm('此操作将永久删除该信息, 是否继续?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).catch(err => err);
      //当确认删除时deleteresult文本为confirm
      //当取消删除时deleteresult文本为cancel
      //console.log(deleteresult)
      if (deleteresult != 'confirm') return ElMessage({
        type: 'info',
        message: '已取消删除',
      });
      if (deleteresult == 'confirm') {
        const deletedata = await helpedel(id);
        if (deletedata.code != 1) {
          ElMessage({
            type: 'success',
            message: '删除失败',
          });
        }
        ElMessage({
          type: 'success',
          message: '删除成功',
        });
        this.getlist();
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
