<template>
  <div>
    <el-dialog :title="info.title" :visible.sync="info.isShow">
      <el-form :model="form">
        <el-form-item label="菜单名称" :label-width="width">
          <el-input v-model="form.title" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="上级菜单" :label-width="width">
          <el-select v-model="form.pid" placeholder="--请选择--" @change="changepid">
             <el-option label="顶级菜单" :value="0"></el-option>
            <el-option :label="item.title" :value="item.id" v-for="item in menulist" :key='item.id'></el-option>
          </el-select>
        </el-form-item>

        <el-form-item label="菜单类型" :label-width="width">
          <el-radio v-model="form.type" :label="1" disabled>目录</el-radio>
          <el-radio v-model="form.type" :label="2" disabled>菜单</el-radio>
        </el-form-item>

        <el-form-item
          label="菜单图标" 
          :label-width="width"
          v-if="form.type == 1"
        >
          <el-select v-model="form.icon" placeholder="请选择菜单图标">
            <el-option label="加" value="el-icon-remove">
              <i class="el-icon-remove"></i>
            </el-option>
            <el-option label="减" value="el-icon-circle-plus">
              <i class="el-icon-circle-plus"></i>
            </el-option>
            <el-option label="对" value="el-icon-check">
              <i class="el-icon-check"></i>
            </el-option>
            <el-option label="错" value="el-icon-close">
              <i class="el-icon-close"></i>
            </el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="菜单地址" :label-width="width" v-else>
          <el-select v-model="form.url" placeholder="请选择菜单地址">
            <el-option
              v-for="item in indexRouter"
              :key="item.path"
              :label="'/' + item.path"
              :value="item.path"
            ></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="状态" :label-width="width">
          <el-switch
            v-model="form.status"
            active-color="#13ce66"
            inactive-color="#ff4949"
            :active-value="1"
            :inactive-value="2"
          >
          </el-switch
          >
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="info.isShow = false">取 消</el-button>
        <el-button type="primary" @click="add" v-if="info.isAdd">添 加</el-button>
        <el-button type="primary" @click="updata" v-else>修 改</el-button>
      </div>
    </el-dialog>
  </div>
</template>
<script>
import { mapActions, mapGetters } from 'vuex';
import { indexRouter } from "../../../router/index";
import { reqmenuAdd,reqMenuListOne,reqMenuUpdate} from "../../../utile/request";

export default {
  props: ["info"],
  computed: {
    ...mapGetters({
      menulist: "menu/list",
    }),
  },
  components: {},
  data() {
    return {
      width: "160px",
      //   isShow: true,
      value: true,

      form: {
        pid: '',
        title: '',
        icon: '',
        type: 1,
        url: '',
        status: 1 ,
      },
      indexRouter: indexRouter,
    };
  },
  methods: {
    hide(){
      this.info.isShow = false;
    },
    ...mapActions({
      reqmenuList:'menu/reqmenuList'

    }),
    add() {
      reqmenuAdd(this.form).then((res) => {
        console.log(res);
        this.hide();
        this.reqmenuList()
      });
    },
    //修改
    updata(){
      reqMenuUpdate(this.form).then(res=>{
        this.hide()
        this.reqmenuList()

      })

    },
    changepid(){
     this.form.type =  this.form.pid==0?1:2;
    },
    look(id){
      // console.log(id);
      //获取当前一条数据
      reqMenuListOne({id:id}).then(res=>{
        console.log(res);
        this.form = res.data.list
        this.form.id = id
      })
    }
  },
  mounted() {},
};
</script>
<style scoped>
</style>