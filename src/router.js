import Vue from 'vue'
import VueRouter from 'vue-router'


Vue.use(VueRouter)


const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  linkActiveClass: 'active',
  routes: [
    {
      path: '/',
      component: () => import("./views/Index.vue"),
      children: [
        {
          path: '',
          redirect: '/home'
        },
        {
          path: '/home',
          name: 'home',
          component: () => import('./views/Home.vue')
        },
        {
          path: '/order',
          name: 'order',
          component: () => import('./views/Order.vue'),
        },
        {
          path: '/orderInfo',
          name: 'orderInfo',
          component: () => import('./views/orders/OrderInfo.vue')
        }
        ,
        {
          path: '/me',
          name: 'me',
          component: () => import('./views/Me.vue')
        },
        {
          path: '/address',
          name: 'address',
          component: () => import('./views/Address.vue')
        },
        {
          path: '/city',
          name: 'city',
          component: () => import('./views/City.vue')
        },
      ]
    },
    {
      path: '/login',
      name: 'login',
      component: () => import("./views/Login.vue")
    },
    {
      path: '/myAddress',
      name: 'myAddress',
      component: () => import("./views/orders/MyAddress.vue"),
    },
    {
      path: '/addAddress',
      name: 'addAddress',
      component: () => import("./views/orders/AddAddress.vue")
    },
    {
      path: '/settlement',
      name: 'settlement',
      component: () => import('./views/orders/Settlement.vue'),

    },
    {
      path: '/remark',
      name: 'remark',
      component: () => import('./views/orders/Remark.vue'),
    },
    {
      path: '/pay',
      name: 'pay',
      component: () => import('./views/orders/Pay.vue'),
    },
    {
      path: '/search',
      name: 'search',
      component: () => import('./views/Search.vue')
    },
    {
      path: '/shop',
      name: 'shop',
      redirect: '/goods',
      component: () => import('./views/shops/Shop.vue'),
      children: [
        {
          path: '/goods',
          name: 'goods',
          component: () => import('./views/shops/Goods.vue'),
          meta: {
            keepAlive: true
          }
        },
        {
          path: '/comments',
          name: 'comments',
          component: () => import('./views/shops/Comments.vue')
        },
        {
          path: '/seller',
          name: 'seller',
          component: () => import('./views/shops/Seller.vue')
        },
      ]
    }
  ]
})


// 路由守卫
router.beforeEach((to, from, next) => {
  const isLogin = localStorage.ele_login ? true : false;
  if (to.path == '/login') {
    next();
  } else {
    // 是否在登录状态下
    isLogin ? next() : next("/login")
  }
})

export default router
