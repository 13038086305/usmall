<template>
  <div>
    <el-dialog :title="info.title" :visible.sync="info.isShow">
      <el-form :model="form">
        <el-form-item label="所属角色" :label-width="formLabelWidth">
          <el-select v-model="form.roleid" placeholder="请选择">
            <el-option :label="item.rolename" :value="item.id" v-for="item in rolelist" :key='item.id'></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="用户名" :label-width="formLabelWidth">
          <el-input v-model="form.username" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="密码" :label-width="formLabelWidth">
          <el-input v-model="form.password" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="状态" :label-width="formLabelWidth">
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
import { mapActions, mapGetters} from "vuex"
import {reqcomponentAdd,reqcomponentInfo,reqcomponentRedite} from '../../../utile/request'
export default {
    computed:{
        ...mapGetters({
             rolelist:"role/list"
        })
    },
  props: ["info"],
  components: {},
  data() {
    return {
      form: {
       roleid:'',
       username:'',
       password:'',
       status:1
      },
      formLabelWidth: "120px",
    };
  },
  methods: {
     empty() {
      this.form = {
        roleid:'',
       username:'',
       password:'',
       status:1
      };
    },
    hide() {
      this.info.isShow = false;
    },
    add(){
        reqcomponentAdd(this.form).then(res=>{
            this.hide()
            this.reqcomList()

        })

    },
    updata() {
      reqcomponentRedite(this.form).then(res=>{
        this.hide()
        this.reqcomList()

      })  
    },
    
    
    ...mapActions({
        requareRoleList:"role/requareRoleList",
        reqcomList:'manager/reqcomList'
    }),
    look(id){
      console.log(id);
      //获取当前一条数据
      reqcomponentInfo({uid:id}).then(res=>{
        this.form = res.data.list
        this.form.password = ''
        this.form.uid = id
      })
    },
  },
  mounted() {
      this.requareRoleList();
  },
};
</script>
<style scoped>
</style>