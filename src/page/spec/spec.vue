<template>
<div>
     <el-button type="primary" @click="add" >添加</el-button>
     <v-add :info='info' ref='ee'></v-add>
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
          title:'规格添加',
          isAdd:true
     }
    
 }
},
methods:{
    add(){
        this.info.isShow = !this.info.isShow
        this.info.title = "规格添加"
        this.info.isAdd = true
        this.$refs.ee.empty()
        
    },
    myedits(e){
        this.info.isShow = true
        this.info.title = "规格修改"
        this.info.isAdd = false
        this.$refs.ee.look(e)
    }
},
mounted(){
}
}
</script>
<style scoped>
</style>