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
    <el-table-column prop="id" label="规格编号" sortable width="180">
    </el-table-column>
    <el-table-column prop="specsname" label="规格名称" sortable width="180">
    </el-table-column>
      <el-table-column label="规格属性" sortable width="180">
        <template slot-scope="scope">
          <el-tag type="warning" v-for="item in scope.row.attrs" :key='item'>{{item}}</el-tag>
        </template>
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
  <el-pagination
      background
      layout="prev, pager, next"
      :current-page="page"
      :page-size="size"
      :total="total"
      @current-change="changeCurrentPage"
    >
    </el-pagination>
</div>
</template>
<script>
import {mapActions,mapGetters} from 'vuex'
import {reqsPecsDel} from '../../../utile/request'
export default {
    computed:{
      ...mapGetters({
      list: "spec/list",
      total:"spec/total",
      size:'spec/size',
      page:"spec/page"
    }),
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
    },
    //删除
    del(id){
      reqsPecsDel({id:id}).then(res=>{
         this.reqspecList()
      })

    },
    ...mapActions({
        reqspecList:'spec/reqspecList',
        requestuserCount:"spec/requestuserCount",
        changeCurrentPages:'spec/changeCurrentPages'
      
    }),
    changeCurrentPage(p){
      this.changeCurrentPages(p)
    }
    

},
mounted(){
    this.reqspecList()
    this.requestuserCount()
}
}
</script>
<style scoped>
</style>