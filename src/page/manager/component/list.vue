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
      <el-table-column prop="username" label="用户名称" sortable width="180">
      </el-table-column>
      <el-table-column prop="rolename" label="所属角色" sortable width="180">
      </el-table-column>
      <el-table-column label="状态" prop="status">
        <template slot-scope="scope">
          <el-button type="primary" v-if="scope.row.status == 1"
            >启用</el-button
          >
          <el-button type="danger" v-else>禁用</el-button>
        </template>
      </el-table-column>
      <el-table-column label="操作">
        <template slot-scope="scope">
          <el-button type="primary" @click="edit(scope.row.uid)"
            >编辑</el-button
          >
          <el-button type="danger" @click="del(scope.row.uid)">删除</el-button>
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
import { mapGetters, mapActions } from "vuex";
import { reqcomponentDel } from "../../../utile/request.js";

export default {
  computed: {
    ...mapGetters({
      list: "manager/list",
      total: "manager/total",
      page: "manager/page",
      size: "manager/size"
    }),
  },
  data() {
    return {};
  },
  methods: {
    ...mapActions({
      reqcomList: "manager/reqcomList",
      changeCurrentPages: "manager/changeCurrentPages",
      requestuserCount: "manager/requestuserCount",
    }),
    edit(id) {
      this.$emit("edits", id);
      this.reqcomList();
    },
    del(id) {
      reqcomponentDel({ uid: id }).then((res) => {
        alert('删除成功')
        this.reqcomList()
        //重新获取总页数
        this.requestuserCount()
        //强制给当前显示第一页
        this.changeCurrentPages(1)
      });
    },
    changeCurrentPage(p) {
      this.changeCurrentPages(p);
    },
  },
  mounted() {
    this.reqcomList();
    this. requestuserCount()
  },
};
</script>
<style scoped>
</style>