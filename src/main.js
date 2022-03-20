import Vue from 'vue'
import App from './App.vue'
import MintUI from 'mint-ui'
import 'mint-ui/lib/style.css'
import router from './router.js'
import store from './store.js'
import axios from "axios";

// 引入加载提示框
import { Indicator } from 'mint-ui';

Vue.prototype.$axios = axios
Vue.config.productionTip = false
Vue.use(MintUI)

axios.defaults.baseURL = 'https://www.thenewstep.cn/v1/eleme/';

// 请求拦截
axios.interceptors.request.use(config => {

  // 加载动画
  Indicator.open();
  return config
},
  err => {
    return Promise.reject(err)
  }
)

// 响应拦截
axios.interceptors.response.use(response => {
  Indicator.close();
  return response;
}, err => {
  return Promise.reject(err)
})


new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
