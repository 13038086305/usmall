<template>
  <div>
    <el-dialog :title="info.title" :visible.sync="info.isShow">
      <el-form :model="form">
        <el-form-item label="规格名称" :label-width="Width">
          <el-input v-model="form.specsname" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="规格属性" :label-width="Width"
         v-for="(item,index) in arrAttr"
          :key='index'>
          <el-row>
            <el-col :span="16">
              <el-input v-model="item.value" autocomplete="off" ></el-input>
            </el-col>
            <el-col :span='4'>
              <el-button type="primary" v-if="index==0" @click="addAttr">新增规格属性</el-button>
               <el-button type="danger" v-else @click="delAttr">删除</el-button>
            </el-col>
          </el-row>
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
import { reqsPecsadd,reqsPecsinfo,reqsPecsedit } from "../../../utile/request";
export default {
  computed: {
    ...mapGetters({
      speclist: "spec/list",
    }),
  },
  props: ["info"],
  components: {},
  data() {
    return {
      form: {
        specsname: "",
        attrs: "",
        status: 1,
      },
      Width: "120px",
      value: "100",
      arrAttr:[
        {
          value:' '
        }
      ]
    
    };
  },
  methods: {
    //添加属性
    addAttr(){
      this.arrAttr.push({value:''})

    },
    //删除添加属性
    delAttr(index){
      this.arrAttr.splice(index,1)

    },
    //重置
    empty() {
       this.form={
        specsname: "",
        attrs: "",
        status: 1,
      }
    },
    //添加
    add() {
      this.form.attrs = JSON.stringify(this.arrAttr.map(item=>{return item.value}))
      console.log(this.form.attrs);
      reqsPecsadd(this.form).then((res) => {
        this.hide();
        this.reqspecList();
        this.empty();
      });
    },

    ...mapActions({
      reqspecList: "spec/reqspecList",
      requareRoleList:'role/requareRoleList'
    }),
    //隐藏弹框
    hide() {
      this.info.isShow = false;
    },
    look(id) {
      reqsPecsinfo({id:id}).then(res=>{
        this.form = res.data.list[0]
        this.form.id = id
        console.log(this.form); 
        this.arrAttr = JSON.parse(this.form.attrs).map(item=>{
          return {value:item}
        })

      })
    },
    updata() {
       reqsPecsedit(this.form).then(res=>{
          this.hide()
          this.reqspecList();
       })
    },
  },
  mounted() {
        this.reqspecList();
  },
};
</script>
<style scoped>
</style>
