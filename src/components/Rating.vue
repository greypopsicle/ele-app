<template>
  <div class="Rating-gray">
    <i
      v-for="(item, index) in itemClasses"
      :key="index"
      class="fa"
      :class="item"
    ></i>
  </div>
</template>

<script>
const CLS_ON = "fa-star";
const CLS_HALF = "fa-star-half-empty";
const CLS_OFF = "fa-star-o";
const LENGTH = 5;

export default {
  name: "Rating",
  props: {
    rating: Number,
  },
  computed: {
    itemClasses() {
      let result = [];

      // 对分数进行处理 向下取0.5的倍数
      let score = Math.floor(this.rating * 2) / 2;
      // 判断是否有小数 从而判断是否有半星
      let hasDecimal = score % 1 !== 0;
      // 获取全星的个数
      let integer = Math.floor(score);

      // 将全星放入数组中
      for (let i = 0; i < integer; i++) {
        result.push(CLS_ON);
      }
      // 将半星放入数组中
      if (hasDecimal) {
        result.push(CLS_HALF);
      }
      // 补齐星数
      while (result.length < LENGTH) {
        result.push(CLS_OFF);
      }

      return result;
    },
  },
};
</script>

<style scoped>
.Rating-gray {
  margin-right: 1.066667vw;
  color: #ffbe00;
  display: inline-block;
}
</style>