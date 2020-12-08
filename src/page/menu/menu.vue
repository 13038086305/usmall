<template>
<div>
     <!-- 添加 -->
      <el-button type="primary" @click="add" >添加</el-button>
      <!-- 列表 -->
      <v-add :info='info' ref='aa'></v-add>
      <v-list @edits='myedit($event)'></v-list>
</div>
</template>
<script>
import  vAdd from './component/add'
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
         isAdd:false, //给添加按钮增加标识判断是点击的添加还是编辑
         title:'菜单添加'
     }
 }
},
methods:{
   add(){
       this.info.isShow = !this.info.isShow
       this.info.isAdd = true
       this.info.title = "菜单添加"
   },
   myedit(e){
      console.log(e);
       this.info.isShow = true
       this.$refs.aa.look(e)
       this.info.isAdd = false
       this.info.title = '菜单修改'
 
   }
   
},
mounted(){
   
}
}
</script>
<style scoped>
</style>