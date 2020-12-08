<template>
<div>
      <el-table
    :data="list"
    style="width: 100%; margin-bottom: 20px"
    row-key="id"
    border
    default-expand-all
    :tree-props="{ children: 'children', hasChildren: 'hasChildren' }"
  >
    <el-table-column prop="id" label="角色编号" sortable width="180">
    </el-table-column>
    <el-table-column prop="rolename" label="角色名称" sortable width="180">
    </el-table-column>
    <el-table-column label="状态" prop="status">
      <template slot-scope="scope">
        <el-button type="primary" v-if="scope.row.status == 1">启用</el-button>
        <el-button type="danger" v-else>禁用</el-button>
      </template>
    </el-table-column>
    <el-table-column label="操作">
      <template slot-scope="scope">
        <el-button type="primary" @click="edit(scope.row.id)">编辑</el-button>
        <el-button type="danger"  @click="del(scope.row.id)" >删除</el-button>
      </template>
    </el-table-column>
  </el-table>
</div>
</template>
<script>
import {mapActions,mapGetters} from 'vuex'
import {reqroleDel} from '../../../utile/request'
export default {
    computed:{
    ...mapGetters({
        list:'role/list'

    })

    },
components:{
 },
data () {
 return {
    
 }
},
methods:{
    //编辑
    edit(id){
        this.$emit("edits", id)
        this.requareRoleList()
    },
    //删除
    del(id){
      reqroleDel({id:id}).then(res=>{
        this.requareRoleList()
      })

    },
    ...mapActions({
        requareRoleList:'role/requareRoleList'
    })

},
mounted(){
    this.requareRoleList()
}
}
</script>
<style scoped>
</style>