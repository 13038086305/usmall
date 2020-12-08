<template>
  <div>
    <el-dialog :title="info.title" :visible.sync="info.isShow">
      <el-form :model="form">
        <el-form-item label="上级分类" :label-width="Width">
          <el-select v-model="form.pid" placeholder="--请选择--">
            <el-option label="顶级菜单" :value="0"></el-option>
            <el-option :label="item.catename" :value="item.id" v-for="item in catelist" :key='item.id'></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="分类名称" :label-width="Width">
          <el-input v-model="form.catename" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="图片" :label-width="Width">
          <el-upload
            class="avatar-uploader"
            action="#"
            :show-file-list="false"
            :on-change="changeimg"
          >
            <img v-if="imageUrl" :src="imageUrl" class="avatar" />
            <i v-else class="el-icon-plus avatar-uploader-icon"></i>
          </el-upload>
        </el-form-item>
        <el-form-item label="状态" :label-width="Width">
          <el-switch
            v-model="form.status"
            active-color="#13ce66"
            inactive-color="#ff4949"
            :active-value="1"
            :inactive-value="2"
          >
          </el-switch>
        </el-form-item>
      </el-form>

      <div slot="footer" class="dialog-footer">
        <el-button @click="hide">取 消</el-button>
        <el-button type="primary" @click="add" v-if="info.isAdd"
          >添 加</el-button
        >
        <el-button type="primary" @click="updata" v-else>修 改</el-button>
      </div>
    </el-dialog>
  </div>
</template>
<script>
import { mapActions, mapGetters } from "vuex";
import { reqcateadd,reqcateinfo,reqcateedit } from "../../../utile/request";
export default {
  computed: {
    ...mapGetters({
      catelist: "cate/list",
    }),
  },
  props: ["info"],
  components: {},
  data() {
    return {
      imageUrl: "",
      form: {
        pid: "",
        catename: "",
        img: null,
        status: 1,
      },
      Width: "120px",

      defaultProps: {
        children: "children",
        label: "label",
      },
    };
  },
  methods: {
    //上传图片
    changeimg(e) {
      //获取到的文件具体信息
      console.log(e);
      var file = e.raw;
      this.imageUrl = URL.createObjectURL(file);
      console.log(this.imageUrl);
      this.form.img = file;
    },
    //重置
    empty() {
      this.form = {
        pid: "",
        catename: "",
        img: null,
        status: 1,
      };
    },
    //添加
    add() {
      reqcateadd(this.form).then((res) => {
        this.hide();
         this.requestcatelist()
        // this.empty();

      });
    },

    ...mapActions({
      // reqmenuList: "menu/reqmenuList",
      requestcatelist: "cate/requestcatelist",
    }),
    //隐藏弹框
    hide() {
      this.info.isShow = false;
    },
    look(id) {
      //获取当前一条数据
      reqcateinfo({id:id}).then(res=>{
        this.form = res.data.list
        this.form.id = id
        this.imageUrl = this.$preImg+res.data.list.img
      })
    },
    updata() {
      console.log(111);
       reqcateedit(this.form).then(res=>{
         console.log(111);
           this.hide()
           this.requestcatelist()
       })
    },
  },
  mounted() {
    //   if (this.menulist.length == 0) {
    //     this.reqmenuList();
    //   }
    //   console.log(this.menulist);
    this.requestcatelist()
  },
};
</script>
<style scoped>
.avatar-uploader .el-upload {
  border: 1px dashed #d9d9d9;
  border-radius: 6px;
  cursor: pointer;
  position: relative;
  overflow: hidden;
}
.avatar-uploader .el-upload:hover {
  border-color: #409eff;
}
.avatar-uploader-icon {
  font-size: 28px;
  color: #8c939d;
  width: 178px;
  height: 178px;
  line-height: 178px;
  text-align: center;
  border: 1px solid #ccc;
}
.avatar {
  width: 178px;
  height: 178px;
  display: block;
}
</style>
