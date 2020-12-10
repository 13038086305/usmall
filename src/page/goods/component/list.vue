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
      <el-table-column prop="id" label="商品编号" width="100">
      </el-table-column>
      <el-table-column prop="goodsname" label="商品名称" width="100">
      </el-table-column>
      <el-table-column prop="price" label="商品价格" width="100">
      </el-table-column>
      <el-table-column
        prop="market_price"
        label="市场价格"
        sortable
        width="100"
      >
      </el-table-column>
      <el-table-column prop="img" label="图片" width="150">
        <template slot-scope="scope">
          <img :src="$preImg + scope.row.img" class="aa" />
        </template>
      </el-table-column>
      <el-table-column prop="status" label="是否新品" width="110">
        <template slot-scope="scope">
          <el-button type="primary" v-if="scope.row.isnew == 1">是</el-button>
          <el-button type="danger" v-else>否</el-button>
        </template>
      </el-table-column>
      <el-table-column prop="status" label="是否热卖" width="110">
        <template slot-scope="scope">
          <el-button type="primary" v-if="scope.row.ishot == 1">是</el-button>
          <el-button type="danger" v-else>否</el-button>
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
import { reqgoodDel } from "../../../utile/request";
export default {
  computed: {
    ...mapGetters({
      list: "good/list",
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
        this.requestgoodlist();
    },
    //删除
    del(id) {
      reqgoodDel({ id: id }).then((res) => {
        this.requestgoodlist();
      });
    },
    ...mapActions({
      requestgoodlist: "good/requestgoodlist",
    }),
  },
  mounted() {
    this.requestgoodlist();
  },
};
</script>
<style scoped>
.aa {
  width: 80px;
  height: 80px;
}
</style>