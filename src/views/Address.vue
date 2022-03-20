<template>
  <div class="address">
    <!-- 头部 -->
    <Header title="选择收货地址" :isLeft="true" push="/home"></Header>
    <!-- 地址搜索框 -->
    <div class="city_search">
      <div class="search">
        <span class="city" @click="$router.push('/city')">
          {{ city }}
          <i class="fa fa-angle-down"></i>
        </span>
        <i class="fa fa-search"></i>
        <input
          type="text"
          v-model="search_val"
          placeholder="小区/写字楼/学校等"
        />
      </div>
      <!-- 当前定位 -->
      <Location @clickLocation="selectAddress" :address="address"></Location>
    </div>
    <!-- 搜索提示区域 -->
    <div class="area">
      <ul class="area_list" v-for="(item, index) in areaList" :key="index">
        <li @click="selectAddress(item)">
          <h4>{{ item.name }}</h4>
          <p>
            {{ item.district
            }}{{ item.address.length == 0 ? "" : item.address }}
          </p>
        </li>
      </ul>
    </div>
  </div>
</template>

<script>
import Header from "../components/Header.vue";
import Location from "../components/Location.vue";
export default {
  name: "Address",
  components: {
    Header,
    Location,
  },
  data() {
    return {
      // 城市
      city: "",
      // 搜索内容
      search_val: "",
      // 放置搜索提示内容的容器
      areaList: [],
    };
  },
  watch: {
    search_val() {
      this.searchPlace();
    },
  },
  computed: {
    address() {
      return this.$store.getters.location.formattedAddress;
    },
  },
  methods: {
    searchPlace() {
      const self = this;
      AMap.plugin("AMap.Autocomplete", function () {
        // 实例化Autocomplete
        var autoOptions = {
          //city 限定城市，默认全国
          city: self.city,
        };
        var autoComplete = new AMap.Autocomplete(autoOptions);
        autoComplete.search(self.search_val, function (status, result) {
          // 搜索成功时，result即是对应的匹配数据
          self.areaList = result.tips;
        });
      });
    },
    selectAddress(item) {
      if (item) {
        //设置地址
        this.$store.dispatch(
          "setAddress",
          item.district + item.address + item.name
        );
      } else {
        this.$store.dispatch("setAddress", this.address);
      }
      this.$router.push("/home");
    },
  },
  beforeRouteEnter(to, from, next) {
    // 将选择的城市进行赋值
    next((vm) => {
      vm.city = to.params.city;
    });
  },
};
</script>

<style scoped>
.address {
  width: 100%;
  height: 100%;
  overflow: auto;
  box-sizing: border-box;
  padding-top: 45px;
}

.city_search {
  background-color: #fff;
  padding: 10px 20px;
  color: #333;
}

.search {
  background-color: #eee;
  height: 40px;
  border-radius: 10px;
  box-sizing: border-box;
  line-height: 40px;
}
.search .city {
  padding: 0 10px;
}
.city i {
  margin-right: 10px;
}
.search input {
  margin-left: 5px;
  background-color: #eee;
  outline: none;
  border: none;
}

.area {
  margin-top: 16px;
  background: #fff;
}
.area li {
  border-bottom: 1px solid #eee;
  padding: 8px 16px;
  color: #aaa;
}
.area li h4 {
  font-weight: bold;
  color: #333;
  margin-bottom: 5px;
}
</style>