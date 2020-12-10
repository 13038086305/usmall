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
      <el-table-column prop="id" label="编号" sortable width="180">
      </el-table-column>
      <el-table-column prop="title" label="轮播图标题" sortable width="180">
      </el-table-column>
      <el-table-column prop="img" label="图片" sortable width="180">
        <template slot-scope="scope">
          <img :src="$preImg + scope.row.img" class="aa">
        </template>
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
          <el-button type="primary" @click="edit(scope.row.id)">编辑</el-button>
          <el-button type="danger" @click="del(scope.row.id)">删除</el-button>
        </template>
      </el-table-column>
    </el-table>
  </div>
</template>
<script>
import { mapActions, mapGetters } from "vuex";
import { reqbannerDel} from "../../../utile/request";
export default {
  computed: {
    ...mapGetters({
      list: "banner/list",
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
      this.requestbannerlist();
    },
    //删除
    del(id) {
      reqbannerDel({ id: id }).then((res) => {
        this.requestbannerlist();
      });
    },
    ...mapActions({
      requestbannerlist: "banner/requestbannerlist",
    }),
  },
  mounted() {
    this.requestbannerlist();
  },
};
</script>
<style scoped>
.aa{
  width: 80px;
  height: 80px;
}
</style>