<template>
  <div>
    home
    <div
      id="main"
      style="width: 800px; height: 400px; border: 1px solid #ccc"
    ></div>
  </div>
</template>
<script>
import { mapGetters, mapActions } from "vuex";
import * as echarts from "echarts";
export default {
 
  computed: {
    ...mapGetters({
      list: "cate/list",
    }),
  },
  components: {},
  data() {
    return {};
  },
  methods: {
    ...mapActions({
      requestcatelist: "cate/requestcatelist",
    }),
  },
  mounted() {
    this.requestcatelist();
  },
   watch: {
    list:{
        handler() {
      var myChart = echarts.init(document.getElementById("main"));
      var option = {
        xAxis: {
          type: "category",
          data: this.list.map((item) => item.catename),
        },
        yAxis: {
          type: "value",
        },
        series: [
          {
            data: this.list.map((item) =>
              item.children ? item.children.length : 0
            ),
            type: "line",
          },
        ],
      };
      myChart.setOption(option);
    },
    deep: true,
    }
  },
};
</script>
<style scoped>
</style>