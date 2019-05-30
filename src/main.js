// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'
import 'promise-polyfill/src/polyfill';
import 'babel-polyfill';
import ElementUI from 'element-ui';
import 'element-ui/lib/theme-chalk/index.css';
import VueAwesomeSwiper from 'vue-awesome-swiper'
import {http} from './utils';
import qs from 'qs'
import Vuex from 'vuex'

Vue.use(ElementUI)
Vue.use(VueAwesomeSwiper)
import 'jquery'
Vue.config.productionTip = false
Vue.prototype.$http = http;
Vue.prototype.qs = qs 
Vue.use(Vuex);

const ADD_COUNT = 'ADD_COUNT'; // 用常量代替事件类型，使得代码更清晰
const REMOVE_COUNT = 'REMOVE_COUNT';
const REMOVE_cityId = 'REMOVE_cityId';
//注册状态管理全局参数
var store = new Vuex.Store({
  state:{
    token:'',
    city:'',
    cityId:'110000',
  },
  mutations: {
    //写法与getters相类似
    //组件想要对于vuex 中的数据进行的处理
    //组件中采用this.$store.commit('方法名') 的方式调用，实现充分解耦
    //内部操作必须在此刻完成(同步)
    [ADD_COUNT] (state, token) { // 第一个参数为 state 用于变更状态 登录
      localStorage.setItem("token", token);
      state.token = token;
    },
    [REMOVE_COUNT] (state, city, cityId) { // 选择城市
      localStorage.setItem("city", city);
      localStorage.setItem("cityId", cityId);
      state.city = city;
      state.cityId = cityId;
    },
    [REMOVE_cityId] (state, cityId) { // 选择城市
      localStorage.setItem("cityId", cityId);
      state.cityId = cityId;
    },
  }
});

router.beforeEach((to, from, next) => {
  // chrome
  document.body.scrollTop = 0
  // firefox
  document.documentElement.scrollTop = 0
  // safari
  window.pageYOffset = 0
  store.state.token = localStorage.getItem('token');//获取本地存储的token
  store.state.city = localStorage.getItem('city');//获取本地存储的token
  store.state.cityId = localStorage.getItem('cityId');//获取本地存储的token
  if (to.meta.requireAuth) {  // 判断该路由是否需要登录权限
    // console.log(to.meta.requireAuth)
    // console.log(store.state.token)
    if (store.state.token !== null) {  // 通过vuex state获取当前的token是否存
     next();
    }
    else {
      next({
        path: '/login',
        query: {redirect: to.fullPath} 
      })
    }
  }
  else {
    next();
  }
})

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  store,
  components: { App },
  template: '<App/>'
})