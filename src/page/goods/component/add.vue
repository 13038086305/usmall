<template>
  <div>
    <el-dialog :title="info.title" :visible.sync="info.isShow">
      <el-form :model="form">
          <!-- 一级分类 -->
        <el-form-item label="一级分类" :label-width="Width">
          <el-select v-model="form.first_cateid" placeholder="--请选择--" @change="changecate">
            <el-option label="顶级菜单" :value="0"></el-option>
            <el-option :label="item.catename" :value="item.id" v-for="item in catelist" :key='item.id'></el-option>
          </el-select>
        </el-form-item>
        <!-- 二级分类 -->
          <el-form-item label="二级分类" :label-width="Width">
          <el-select v-model="form.second_cateid" placeholder="--请选择--">
            <el-option label="顶级菜单" :value="0"></el-option>
            <el-option :label="item.catename" :value="item.id" v-for="item in secondCate" :key='item.id'></el-option>
          </el-select>
        </el-form-item>
        <!-- 商品名称 -->
        <el-form-item label="商品名称" :label-width="Width">
          <el-input v-model="form.goodsname" autocomplete="off"></el-input>
        </el-form-item>
        <!-- 价格 -->
        <el-form-item label="商品价格" :label-width="Width">
          <el-input v-model="form.price" autocomplete="off"></el-input>
        </el-form-item>
        <!-- 市场价格 -->
        <el-form-item label="市场价格" :label-width="Width">
          <el-input v-model="form.market_price" autocomplete="off"></el-input>
        </el-form-item>
        <!-- 图片 -->
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
        <!-- 商品规格 -->
         <el-form-item label="商品规格" :label-width="Width">
          <el-select v-model="form.specsid" placeholder="--请选择--"  @change="changeSpec">
            <el-option label="顶级菜单" :value="0"></el-option>
            <el-option :label="item.specsname" :value="item.id" v-for="item in speclist" :key='item.id'></el-option>
          </el-select>
        </el-form-item>
        <!-- 规格属性 -->
          <el-form-item label="规格属性" :label-width="Width">
          <el-select v-model="form.specsattr" placeholder="--请选择--" multiple>
            <el-option label="顶级菜单" :value="0"></el-option>
            <el-option :label="item" :value="item" v-for="item in secondSpec" :key='item'></el-option>
          </el-select>
        </el-form-item>
        
        <!-- 是否新品，是否热卖 -->
         <el-form-item label="是否新品" :label-width="Width">
          <el-radio v-model="form.isnew" :label="1">是</el-radio>
          <el-radio v-model="form.isnew" :label="2">否</el-radio>
        </el-form-item>
 
        <el-form-item label="是否热卖" :label-width="Width">
          <el-radio v-model="form.ishot" :label="1">是</el-radio>
          <el-radio v-model="form.ishot" :label="2">否</el-radio>
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
         <!--商品描述  -->
          <el-form-item label="商品描述" :label-width="Width">
          <textarea
            name=""
            id=""
            cols="30"
            rows="10"
            v-model="form.description"
          ></textarea>
          <!-- <div id="div1" v-if='info.isShow'></div> -->
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
import { reqgoodadd,reqgoodinfo,reqgoodedit } from "../../../utile/request";
export default {
  computed: {
    ...mapGetters({
        catelist:'cate/list',
    //   goodlist: "good/list",
      speclist:"spec/list"
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
        first_cateid:0,
        second_cateid: 0,
        img: null,
        goodsname: '',
        price:0,
        market_price:0,
        description:'',
        specsid:0,
        specsattr:[],
        isnew:1,
        ishot:1,
        status:1
      },
      Width: "120px",

      defaultProps: {
        children: "children",
        label: "label",
      },
    };
  },
  methods: {
      //修改二级分类
      changecate(){
          this.secondCate = this.catelist.find(item=>{
              return item.id == this.form.first_cateid
          }).children
          
      },
      //获取规格属性
    changeSpec(){
        this.form.specsattr = []
        this.secondSpec = this.speclist.find(item=>{
            return item.id == this.form.specsid
        }).attrs
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
       first_cateid:0,
        second_cateid: 0,
        img: null,
        goodsname: '',
        price:0,
        market_price:0,
        description:'',
        specsid:0,
        specsattr:[],
        isnew:1,
        ishot:1,
        status:1
      };
    },
    //添加
    add() {
      reqgoodadd(this.form).then((res) => {
        this.hide();
         this.requestgoodlist()
        // this.empty();

      });
    },

    ...mapActions({
      // reqmenuList: "menu/reqmenuList",
    //   requestgoodlist: "good/requestgoodlist",
      requestcatelist:'cate/requestcatelist',
      reqspecList:"spec/reqspecList"
    }),
    //隐藏弹框
    hide() {
      this.info.isShow = false;
    },
    look(id) {
      //获取当前一条数据
      reqgoodinfo({id:id}).then(res=>{
        this.form = res.data.list
        this.form.id = id
        this.imageUrl = this.$preImg+res.data.list.img
        this.form.specsattr = this.form.specsattr.split(",");
      })
    },
    updata() {
       reqgoodedit(this.form).then(res=>{
         console.log(111);
           this.hide()
        //    this.requestgoodlist()
       })
    },
  },
  mounted() {
    // this.requestgoodlist()
    this.requestcatelist()
    this.reqspecList()
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
