import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store/index'
import axios from 'axios'
import ElementUI from 'element-ui';
//引入样式表
import 'assets/fonts/iconfont.css'
import 'element-ui/lib/theme-chalk/index.css';
import http from './http'

Vue.prototype.$http = http
Vue.config.productionTip = false
Vue.use(ElementUI);

new Vue({
  store,
  router,
  render: h => h(App)
}).$mount('#app')
