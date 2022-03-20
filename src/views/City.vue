<template>
  <div class="city">
    <!-- 顶部搜索区域 -->
    <div class="search_wrap">
      <div class="search">
        <i class="fa fa-search"></i>
        <input v-model="city_val" type="text" placeholder="输入城市名" />
      </div>
      <button
        @click="$router.push({ name: 'address', params: { city: city } })"
      >
        取消
      </button>
    </div>

    <div style="height: 100%" v-if="searchList.length == 0">
      <!-- 当前定位区域 -->
      <div class="location">
        <Location @clickLocation="selectCity" :address="city"></Location>
      </div>
      <!-- 城市列表区域 -->
      <AlphaBet
        @selectCity="selectCity"
        ref="allCity"
        :cityInfo="cityInfo"
        :keys="keys"
      ></AlphaBet>
    </div>
    <!-- 搜索列表 -->
    <div class="search_list" v-else>
      <ul>
        <li
          @click="selectCity(item)"
          v-for="(item, index) in searchList"
          :key="index"
        >
          {{ item.name }}
        </li>
      </ul>
    </div>
  </div>
</template>

<script>
import Location from "../components/Location.vue";
import AlphaBet from "../components/AlphaBet.vue";
export default {
  name: "City",
  components: {
    Location,
    AlphaBet,
  },
  data() {
    return {
      city_val: "",
      cityInfo: null,
      keys: [],
      allCities: [],
      searchList: [],
    };
  },
  computed: {
    city() {
      return (
        this.$store.getters.location.addressComponent.city ||
        this.$store.getters.location.addressComponent.province
      );
    },
  },
  methods: {
    getCityInfo() {
      this.$axios("/api/posts/cities")
        .then((res) => {
          // 获取城市数据
          this.cityInfo = res.data;
          // 获取城市首字母数组
          this.keys = Object.keys(res.data);
          // 移除数组中的hotcities项
          this.keys.pop();
          // 对keys按字母先后顺序进行排序
          this.keys.sort();
          // 存储所有城市名用来搜索过滤
          this.keys.forEach((key) => {
            this.cityInfo[key].forEach((city) => {
              this.allCities.push(city);
            });
          });
          // 在city组件数据加载完毕后调用alphabet组件中的initScroll方法实现滚动效果
          if (this.$refs.allCity) {
            this.$nextTick(() => {
              this.$refs.allCity.initScroll();
            });
          }
        })
        .catch((err) => {
          console.log(err);
        });
    },
    selectCity(city) {
      if (city) {
        // 设置跳转到address路由 并传递城市名参数
        this.$router.push({ name: "address", params: { city: city.name } });
      } else {
        this.$router.push({ name: "address", params: { city: this.city } });
      }
    },
    searchCity() {
      // 如果搜索框为空 搜索数组为空
      if (!this.city_val) return (this.searchList = []);
      // 根据搜索内容匹配城市存储到搜索数组中
      else {
        this.searchList = this.allCities.filter((item) => {
          return item.name.indexOf(this.city_val) != -1;
        });
      }
    },
  },
  watch: {
    city_val() {
      this.searchCity();
    },
  },
  created() {
    this.getCityInfo();
  },
};
</script>

<style scoped>
.city {
  width: 100%;
  height: 100%;
  overflow: auto;
  box-sizing: border-box;
  padding-top: 45px;
}
.search_wrap {
  position: fixed;
  top: 0;
  height: 45px;
  width: 100%;
  background: #fff;
  box-sizing: border-box;
  padding: 3px 16px;
  display: flex;
  justify-content: space-between;
}
.search {
  background-color: #eee;
  border-radius: 10px;
  line-height: 40px;
  width: 85%;
  box-sizing: border-box;
  padding: 0 16px;
}
.search input {
  background: #eee;
  outline: none;
  border: none;
  margin-left: 5px;
}
.search_wrap button {
  background-color: transparent;
  border: 0px;
  outline: none;
  color: #009eef;
}

.location {
  background: #fff;
  padding: 8px 16px;
  /* height: 65px; */
  box-sizing: border-box;
}

.search_list {
  background: #fff;
  padding: 5px 16px;
}
.search_list li {
  padding: 10px;
  border-bottom: 1px solid #eee;
}
</style>