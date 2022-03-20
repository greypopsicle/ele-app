<template>
  <div class="addAddress">
    <Header :isLeft="true" :title="title"></Header>
    <!-- 添加地址 -->
    <div class="viewbody">
      <div class="content">
        <FormBlock
          label="联系人"
          placeholder="姓名"
          v-model="addressInfo.name"
        ></FormBlock>

        <div class="formblock">
          <div class="label-wrap">性别</div>
          <TabTag
            :tags="sexes"
            @checkTag="checkSex"
            :selectTag="addressInfo.sex"
          ></TabTag>
        </div>

        <FormBlock
          label="电话"
          placeholder="手机号码"
          v-model="addressInfo.phone"
        ></FormBlock>

        <FormBlock
          v-model="addressInfo.address"
          label="地址"
          placeholder="小区/写字楼/学校"
          icon="angle-right"
          @clickBlock="showSearch = true"
        ></FormBlock>

        <FormBlock
          label="门牌号"
          placeholder="10号楼9单元808"
          icon="edit"
          textarea="textarea"
          v-model="addressInfo.house_number"
        ></FormBlock>

        <div class="formblock">
          <div class="label-wrap">标签</div>
          <TabTag
            :tags="tags"
            @checkTag="checkTag"
            :selectTag="addressInfo.tag"
          ></TabTag>
        </div>
      </div>
      <!-- 确定按钮 -->
      <div class="form-button-wrap">
        <button @click="handleSave" class="form-button">确定</button>
      </div>
    </div>

    <!-- 搜索地址 -->
    <SearchAddress
      :showSearch="showSearch"
      @closeSearch="showSearch = false"
      :addressInfo="addressInfo"
    ></SearchAddress>
  </div>
</template>

<script>
import Header from "../../components/Header.vue";
import FormBlock from "../../components/orders/FormBlock.vue";
import TabTag from "../../components/orders/TabTag.vue";
import SearchAddress from "../../components/orders/SearchAddress.vue";
import { Toast } from "mint-ui";
export default {
  name: "AddAddress",
  data() {
    return {
      title: "添加地址",
      tags: ["家", "学校", "公司"],
      sexes: ["先生", "女士"],
      addressInfo: {
        tag: "",
        sex: "",
        address: "",
        name: "",
        phone: "",
        house_number: "",
        id: "",
      },
      addressList: [],
      showSearch: false,
    };
  },
  components: {
    Header,
    FormBlock,
    TabTag,
    SearchAddress,
  },
  // 在路由进入之前获取到携带的地址参数
  beforeRouteEnter(to, from, next) {
    next((vm) => {
      vm.addressInfo = to.params.addressInfo;
      vm.title = to.params.title;
    });
  },
  methods: {
    checkTag(item) {
      this.addressInfo.tag = item;
    },
    checkSex(item) {
      this.addressInfo.sex = item;
    },

    handleSave() {
      if (!this.addressInfo.name) {
        this.showMsg("请输入联系人");
        return;
      }
      if (!this.addressInfo.phone) {
        this.showMsg("请输入手机号码");
        return;
      }
      let reg_tel =
        /^(13[0-9]|14[01456879]|15[0-35-9]|16[2567]|17[0-8]|18[0-9]|19[0-35-9])\d{8}$/;
      if (!reg_tel.test(this.addressInfo.phone)) {
        this.showMsg("请输入正确的手机号码");
        return;
      }

      if (!this.addressInfo.address) {
        this.showMsg("请输入地址");
        return;
      }

      // 存储数据 通过titles属性判断用户是添加地址还是修改地址
      if (this.title == "添加地址") {
        this.addAddress();
      } else {
        this.editAddress(this.addressInfo);
      }
    },

    showMsg(msg) {
      Toast({
        message: msg,
        position: "bottom",
        duration: 2000,
      });
    },

    addAddress() {
      // this.$axios
      //   .post(
      //     `/api/user/add_address/${localStorage.ele_login}`,
      //     this.addressInfo
      //   )
      //   .then((res) => {
      //     if (!this.$store.getters.userInfo) {
      //       this.$store.dispatch("setUserInfo", this.addressInfo);
      //     }
      //     this.$router.push("/myAddress");
      //   })
      //   .catch((err) => console.log(err));

      // 在添加地址时给每个地址信息一个id 以便后续查找编辑
      this.addressInfo.id = Math.random();
      // 从本地存储中获取到地址数组对象
      this.addressList = JSON.parse(localStorage.getItem("address"));

      if (this.addressList) {
        // 如果数组对象不为null 即有数组结构 可以直接采用push方法添加地址信息
        this.addressList.push(this.addressInfo);
        localStorage.setItem("address", JSON.stringify(this.addressList));
      } else {
        // 如果数组对象为空 先生成数组结构再进行地址信息添加
        this.addressList = [];
        this.addressList.push(this.addressInfo);
        localStorage.setItem("address", JSON.stringify(this.addressList));
      }

      // 如果vuex中没有userInfo,将地址信息存储到vuex中
      if (!this.$store.getters.userInfo) {
        this.$store.dispatch("setUserInfo", this.addressInfo);
      }

      // 跳转回我的地址页面
      this.$router.push("/myAddress");
    },

    editAddress(address) {
      // this.$axios
      //   .post(
      //     `/api/user/edit_address/${localStorage.ele_login}/${this.addressInfo._id}`,
      //     this.addressInfo
      //   )
      //   .then((res) => {
      //     this.$router.push("/myAddress");
      //   });

      // 获取到地址数组对象
      this.addressList = JSON.parse(localStorage.getItem("address"));
      // 用filter过滤掉指定id的对象并返回新的数组
      this.addressList = this.addressList.filter((item) => {
        return item.id !== address.id;
      });
      // 将修改后的数据添加到数组中
      this.addressList.push(this.addressInfo);
      // 再把新数组放到本地存储中
      localStorage.setItem("address", JSON.stringify(this.addressList));
      // 跳转到我的地址页面
      this.$router.push("/myAddress");
    },
  },
};
</script>

<style scoped>
.addAddress {
  width: 100%;
  height: 100%;
  box-sizing: border-box;
  padding-top: 45px;
}
.viewbody {
  width: 100%;
  height: 100%;
  overflow: auto;
  box-sizing: border-box;
  background-color: #f5f5f5;
}

.content {
  padding-left: 4vw;
  background: #fff;
  font-size: 0.94rem;
}

.formblock {
  background-color: #fff;
  border-bottom: 1px solid #eee;
  display: flex;
}
.formblock .label-wrap {
  flex-basis: 17.333333vw;
  padding: 3.733333vw 0;
  line-height: 4.8vw;
  color: #333;
  font-weight: 700;
}

/* 确定按钮 */
.form-button-wrap {
  padding: 5.333333vw 4vw;
  display: flex;
}
.form-button-wrap .form-button {
  background: #00d762;
  text-align: center;
  border-radius: 0.533333vw;
  flex: 1;
  font-size: 1.1rem;
  line-height: 5.066667vw;
  color: #fff;
  padding: 3.333333vw 0;
  border: none;
  font-weight: 500;
}
</style>
