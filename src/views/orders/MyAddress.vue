<template>
  <div class="myAddress">
    <Header :isLeft="true" :title="title" push="/me"></Header>

    <!-- 显示收货地址 -->
    <div class="address-view">
      <div
        class="address-card"
        v-for="(item, index) in allAddress"
        :key="index"
      >
        <!-- <div class="address-card-select">
          <i class="fa fa-check-circle" v-if="selectIndex == index"></i>
        </div> -->
        <div class="address-card-body" @click="currentClick(item, index)">
          <p class="address-card-title">
            <span class="username">{{ item.name }}</span>
            <span v-if="item.sex" class="gender">
              {{ item.sex }}
            </span>
            <span>{{ item.phone }}</span>
          </p>

          <p class="address-card-address">
            <span class="tag" v-if="item.tag">
              {{ item.tag }}
            </span>
            <span class="address-text">
              {{ item.address }}{{ item.house_number }}
            </span>
          </p>
        </div>
        <div class="address-card-edit">
          <i @click="handleEdit(item)" class="fa fa-edit"></i>
          <i @click="handleRemove(item, index)" class="fa fa-close"></i>
        </div>
      </div>
    </div>

    <!-- 底部 -->
    <div class="address-view-bottom" @click="addAddress">
      <i class="fa fa-plus-circle"></i>
      <span>新增收货地址</span>
    </div>
  </div>
</template>

<script>
import Header from "../../components/Header.vue";
export default {
  name: "Myaddress",
  data() {
    return {
      title: "我的地址",
      allAddress: [],
      selectIndex: 0,
    };
  },
  created() {
    this.getData();
  },
  methods: {
    getData() {
      // 请求后端地址数据并存储到allAddress数组中
      // this.$axios(`/api/user/user_info/${localStorage.ele_login}`).then(
      //   (res) => {
      //     this.allAddress = res.data.myAddress;
      //   }
      // );
      if (localStorage.address) {
        this.allAddress = JSON.parse(localStorage.getItem("address"));
      }
    },
    addAddress() {
      this.$router.push({
        name: "addAddress",
        params: {
          title: "添加地址",
          addressInfo: {
            tag: "",
            sex: "",
            address: "",
            name: "",
            phone: "",
            house_number: "",
            id: "",
          },
        },
      });
    },
    handleEdit(item) {
      this.$router.push({
        name: "addAddress",
        params: {
          title: "编辑地址",
          addressInfo: item,
        },
      });
    },
    handleRemove(item) {
      // this.$axios
      //   .delete(`/api/user/address/${localStorage.ele_login}/${item._id}`)
      //   .then((res) => {
      //     this.allAddress.splice(index, 1);
      //   });
      let addressList = JSON.parse(localStorage.getItem("address"));
      addressList = addressList.filter((address) => {
        return address.id !== item.id;
      });
      localStorage.setItem("address", JSON.stringify(addressList));
      this.$router.go(0);
    },
    currentClick(item, index) {
      this.selectIndex = index;
      // 将当前选中的地址信息存储到vuex中
      this.$store.dispatch("setUserInfo", item);
      this.$router.push("/settlement");
    },
  },
  components: {
    Header,
  },
};
</script>

<style scoped>
.myAddress {
  width: 100%;
  height: 100%;
  box-sizing: border-box;
  padding-top: 45px;
  overflow: hidden;
}

.address-view-bottom {
  position: fixed;
  height: 13.866667vw;
  bottom: 0;
  width: 100%;
  background: #fff;
  display: flex;
  justify-content: center;
  align-items: center;
  border-top: 0.266667vw solid #ddd;
  color: #3190e8;
  font-size: 1rem;
}
.address-view-bottom > i {
  font-size: 1.3rem;
  margin-right: 8px;
}

.address-view {
  height: 100%;
  overflow-y: auto;
  padding-bottom: 13.866667vw;
}
.address-card {
  background-color: #fff;
  padding: 4vw;
  border-bottom: 1px solid #ddd;
  display: flex;
  min-height: 18.133333vw;
}
.address-card-body {
  flex: 1;
  overflow: hidden;
}
.address-card-title {
  font-size: 1rem;
  color: #666;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
  padding-bottom: 1.066667vw;
}
.address-card-title .username {
  color: #333;
  font-weight: 700;
}
.address-card-title .gender {
  padding: 0 1.6vw 0 0.8vw;
}
.address-card-address {
  color: #666;
  font-size: 0.84rem;
  display: flex;
  align-items: center;
}
.address-card-address .tag {
  display: inline-block;
  position: relative;
  margin-right: 0.8vw;
  padding: 0.533333vw;
  color: #ff5722;
  white-space: nowrap;
  border: 1px solid #ff5722;
  border-radius: 0.133333vw;
  font-size: 0.6rem !important;
  line-height: 2.666667vw;
}
.address-text {
  line-height: 4.533333vw;
}

/* 编辑和删除 */
.address-card-edit {
  flex-basis: 13.066667vw;
  display: flex;
  justify-content: space-around;
  align-items: center;
}
.address-card-edit > i {
  color: #aaa;
  font-size: 1.2rem;
}

/*  选中图标 */
.address-card-select {
  flex-basis: 7.333333vw;
  min-width: 7.333333vw;
  display: flex;
  align-items: center;
}
.address-card-select > i {
  font-size: 1.5rem;
  color: #4cd964;
}
</style>
