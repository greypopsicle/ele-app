<template>
  <div class="cartcontrol">
    <span
      @click.stop="decreaseCount"
      class="cartbutton button-minus"
      v-if="food.count > 0"
    >
      <i class="fa fa-minus"></i>
    </span>
    <span class="cartcount" v-if="food.count >= 0">{{ food.count }}</span>
    <span @click.stop="increaseCount" class="cartbutton">
      <i class="fa fa-plus-circle"></i>
    </span>
  </div>
</template>

<script>
export default {
  name: "CartControl",
  props: {
    food: Object,
  },
  methods: {
    decreaseCount() {
      this.food.count--;
    },
    increaseCount() {
      this.food.count++;
    },
  },
};
</script>

<style scoped>
.cartcontrol {
  display: inline-flex;
  align-items: center;
}
.cartbutton {
  display: inline-block;
  vertical-align: middle;
}
.cartbutton i {
  color: rgb(35, 149, 255);
  vertical-align: middle;
  font-size: 1rem;
}
.button-minus {
  width: 3.3444446vw;
  height: 2.6444446vw;
  border: 1px solid rgb(35, 149, 255);
  border-radius: 50%;
  text-align: center;
  padding-bottom: 1vw;
}
.button-minus i {
  font-size: 0.6666667rem;
}
.cartcount {
  display: inline-block;
  text-align: center;
  color: rgba(0, 0, 0, 0.87);
  vertical-align: middle;
  font-size: 0.9rem;
  width: 6.933333vw;
  overflow: hidden;
}
</style>