<template>
  <div>
    <el-dialog :title="info.title" :visible.sync="info.isShow">
      <el-form :model="form">
        <!-- 活动名称 -->
        <el-form-item label="限时秒杀名称" :label-width="Width">
          <el-input v-model="form.title" autocomplete="off"></el-input>
        </el-form-item>
        <!-- 时间范围 -->
        <template>
          <el-form-item
            label="活动时间"
            :label-width="Width"
            style="width: 700px"
          >
            <div class="block">
              <el-date-picker
                v-model="value1"
                type="daterange"
                range-separator="至"
                start-placeholder="开始日期"
                end-placeholder="结束日期"
                format="yyyy-MM-dd HH:mm:ss"
                value-format="timestamp"
                :formatter="dateFormat"
              >
              </el-date-picker>
            </div>
          </el-form-item>
        </template>
        <!-- 一级分类 -->
        <el-form-item label="一级分类" :label-width="Width">
          <el-select
            v-model="form.first_cateid"
            placeholder="--请选择--"
            @change="changecate"
          >
            <el-option label="顶级菜单" :value="0"></el-option>
            <el-option
              :label="item.catename"
              :value="item.id"
              v-for="item in catelist"
              :key="item.title"
            ></el-option>
          </el-select>
        </el-form-item>
        <!-- 二级分类 -->
        <el-form-item label="二级分类" :label-width="Width">
          <el-select v-model="form.second_cateid" placeholder="--请选择--">
            <el-option label="顶级菜单" :value="0"></el-option>
            <el-option
              :label="item.catename"
              :value="item.id"
              v-for="item in secondCate"
              :key="item.id"
            ></el-option>
          </el-select>
        </el-form-item>
        <!-- 商品 -->
        <el-form-item label="商品" :label-width="Width">
          <el-select
            v-model="form.goodsid"
            placeholder="--请选择--"
            @change="changecate"
          >
            <el-option label="顶级菜单" :value="0"></el-option>
            <el-option
              :label="item.goodsname"
              :value="item.id"
              v-for="item in goodlist"
              :key="item.id"
            ></el-option>
          </el-select>
        </el-form-item>

        <!-- 状态 -->
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
import { reqseckadd, reqseckinfo, reqseckedit } from "../../../utile/request";
export default {
  computed: {
    ...mapGetters({
      catelist: "cate/list",
      goodlist: "good/list",
      speclist: "spec/list",
      secklist:"seck/list"
    }),
  },
  props: ["info"],
  components: {},
  data() {
    return {
      imageUrl: "",
      secondCate: [], //用于存放二级分类
      secondSpec: [], //用来存放规格属性
      form: {
        title: "",
        begintime: "",
        endtime: "",
        first_cateid: "",
        second_cateid: "",
        goodsid: "",
        status: 1,
      },
      value1: [],
      Width: "120px",
      defaultProps: {
        children: "children",
        label: "label",
      },
    };
  },
  methods: {
    //将时间错转化为字符串
    dateFormat(row, column) {
      var date = row[column.property];
      if (date == undefined) {
        return "";
      }
      return moment(date).format("YYYY-MM-DD HH:mm:ss");
    },
    //修改二级分类
    changecate() {
      this.secondCate = this.catelist.find((item) => {
        return item.id == this.form.first_cateid;
      }).children;
    },
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
        title: "",
        begintime: "",
        endtime: "",
        first_cateid: "",
        second_cateid: "",
        goodsid: "",
        status: 1,
      };
    },
    //添加
    add() {
      this.form.begintime = new Date(this.value1[0]).getTime();
      this.form.endtime = new Date(this.value1[1]).getTime();
      reqseckadd(this.form).then((res) => {
        this.hide();
        console.log(this.form);
         this.requareseckList()
        this.empty();
      });
    },

    ...mapActions({
      // reqmenuList: "menu/reqmenuList",
      // requestgoodlist: "good/requestgoodlist",
      requestcatelist: "cate/requestcatelist",
      reqspecList: "spec/reqspecList",
      requareseckList:"seck/requareseckList"
    }),
    //隐藏弹框
    hide() {
      this.info.isShow = false;
    },
    look(id) {
      //获取当前一条数据
      reqseckinfo({ id: id }).then((res) => {
        this.form = res.data.list;
        this.form.id = id;

        // console.log(parseInt(res.data.list.begintime));
        this.value1.push( new Date(parseInt(res.data.list.begintime)))
        this.value1.push( new Date(parseInt(res.data.list.endtime)))
      });
    },
    updata() {
      this.form.begintime = new Date(this.value1[0]).getTime();
      this.form.endtime = new Date(this.value1[1]).getTime();
      reqseckedit(this.form).then((res) => {
        this.hide();
         this.requareseckList()
      });
    },
  },
  mounted() {
    // this.requestgoodlist();
    this.requestcatelist();
    this.reqspecList();
    this.requareseckList()
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
.block {
  width: 400px;
}
</style>
