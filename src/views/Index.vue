<template>
  <div class="index">
    <router-view></router-view>
    <TabBar :data="tabBarData"></TabBar>
  </div>
</template>

<script>
import TabBar from "../components/TabBar.vue";
export default {
  name: "Index",
  components: {
    TabBar,
  },
  data() {
    return {
      tabBarData: [
        { title: "首页", icon: "home", path: "/home" },
        { title: "订单", icon: "file-text-o", path: "/order" },
        { title: "我的", icon: "user", path: "/me" },
      ],
    };
  },
};
</script>

<style lang="css" scoped>
.index {
  width: 100%;
  height: calc(100% - 45px);
}
</style>
