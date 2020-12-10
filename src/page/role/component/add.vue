<template>
  <div>
    <el-dialog :title="info.title" :visible.sync="info.isShow">
      <el-form :model="form">
        <el-form-item label="角色名称" :label-width="Width">
          <el-input v-model="form.rolename" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="角色权限" :label-width="Width">
          <el-tree
            :data="menulist"
            show-checkbox
            ref="tree"
            node-key="id"
            :props="{
              children: 'children',
              label: 'title',
            }"
          >
          </el-tree>
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
        <el-button @click="hide" >取 消</el-button>
        <el-button type="primary" @click="add" v-if="info.isAdd"
          >添 加</el-button
        >
        <el-button type="primary" @click="updata" v-else>修 改</el-button>
      </div>
    </el-dialog>
  </div>
</template>
<script>
import { mapActions, mapGetters} from "vuex";
import { reqroleadd  ,reqroleOne,reqroleEdit} from "../../../utile/request";
export default {
  computed: {
    ...mapGetters({
      menulist: "menu/list",
    }),
  },
  props: ["info"],
  components: {},
  data() {
    return {
      form: {
        status: 1,
        rolename: "",
        menus: [],
      },
      Width: "120px",
      value: "100",
      defaultProps: {
        children: "children",
        label: "label",
      },
    };
  },
  methods: {
    //重置
    empty(){
       this.form={
        status: 1,
        rolename: "",
        menus: [],
      }
      this.menu = this.$refs.tree.setCheckedKeys([])
    },
    //添加
    add() {
      this.form.menus = JSON.stringify(this.$refs.tree.getCheckedKeys());
      reqroleadd(this.form).then((res) => {
         this.hide()
         this.requareRoleList();
         this.empty()
      });
    },
   
    ...mapActions({
      reqmenuList: "menu/reqmenuList",
      requareRoleList:'role/requareRoleList'
    }),
    //隐藏弹框
    hide(){
      this.info.isShow = false;
    },
    look(id){
      // console.log(id);
      //获取当前一条数据
      reqroleOne({id:id}).then(res=>{
        console.log(res);
        this.form = res.data.list
        this.form.menus =  this.$refs.tree.setCheckedKeys(JSON.parse(res.data.list.menus))
        this.form.id = id
      })
    },
     updata() {
          this.form.menus = JSON.stringify(this.$refs.tree.getCheckedKeys());
         reqroleEdit(this.form).then(res=>{
             this.hide()
             this.requareRoleList();
         })


    },
  },
  mounted() {
    if (this.menulist.length == 0) {
      this.reqmenuList();
    }
    console.log(this.menulist);
  },

};
</script>
<style scoped>
</style>
