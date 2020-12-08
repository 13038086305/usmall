<template>
<div>
     <el-button type="primary" @click="add" >添加</el-button>
     <v-add :info='info' ref='bb'></v-add>
     <v-list @edits='myedits($event)'></v-list>
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
          title:'角色添加',
          isAdd:true
     }
    
 }
},
methods:{
    add(){
        this.info.isShow = !this.info.isShow
        this.info.title = "角色添加"
        this.info.isAdd = true
        this.$refs.bb.empty()
        
    },
    myedits(e){
        console.log(e);
        this.info.isShow = true
        this.$refs.bb.look(e)
        this.info.title = "角色修改"
        this.info.isAdd = false

    }
},
mounted(){
}
}
</script>
<style scoped>
</style>