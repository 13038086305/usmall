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
    <!-- 活动名称 -->
      <el-table-column prop="title" label="活动名称" width="100">
      </el-table-column>
      <!-- 状态 -->
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
          <el-button type="primary" @click="edit(scope.row.id)">编辑</el-button>
          <el-button type="danger" @click="del(scope.row.id)">删除</el-button>
        </template>
      </el-table-column>
    </el-table>
  </div>
</template>
<script>
import { mapActions, mapGetters } from "vuex";
import { reqseckDel } from "../../../utile/request";
export default {
  computed: {
    ...mapGetters({
      list: "seck/list",
    }),
  },
  components: {},
  data() {
    return {};
  },
  methods: {
    //编辑
    edit(id) {
      this.$emit("edits", id);
        // this.requestgoodlist();
    },
    //删除
    del(id) {
      reqseckDel({ id: id }).then((res) => {
       this.requareseckList();
      });
    },
    ...mapActions({
      requareseckList: "seck/requareseckList",
    }),
  },
  mounted() {
    this.requareseckList();
  },
};
</script>
<style scoped>
.aa {
  width: 80px;
  height: 80px;
}
</style>