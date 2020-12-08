<template>
<div>
     <!-- 添加 -->
      <el-button type="primary" @click="add" >添加</el-button>
      <v-add :info='info' ref="cc"></v-add>
      <v-list  @edits='myedits($event)'></v-list>
</div>
</template>
<script>
import vAdd from './component/add'
import vList from './component/list'
export default {
components:{
    vAdd,
    vList


 },
data () {
 return {
     info:{
         isShow:false,
          title:'用户添加',
          isAdd:true
     }
 }
},
methods:{
     add(){
        this.info.isShow = !this.info.isShow
        this.info.title = "管理员添加"
        this.info.isAdd = true
        
        
    },
    myedits(e){
        this.info.isShow = true
        this.$refs.cc.look(e)
        console.log(e);
        this.info.title = "管理员修改"
        this.info.isAdd = false

    }
},
mounted(){
}
}
</script>
<style scoped>
</style>