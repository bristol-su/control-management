import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import axios from 'axios';
import api from '@bristol-su/control-js-api-client';
import AWN from "awesome-notifications";
import { BootstrapVue, BootstrapVueIcons } from 'bootstrap-vue'
import 'bootstrap/dist/css/bootstrap.css'
import 'bootstrap-vue/dist/bootstrap-vue.css'
import 'awesome-notifications/dist/style.css';
import VueRouter from 'vue-router';

let apiUrl = "";
if(process.env.VUE_APP_CONTROL_API_URL !== undefined) {
    apiUrl = process.env.VUE_APP_CONTROL_API_URL
} else if(process.env.MIX_CONTROL_API_URL !== undefined) {
    apiUrl = process.env.MIX_CONTROL_API_URL;
}

Vue.prototype.$notify = new AWN({position: 'top-right'});
Vue.prototype.$control = new api(apiUrl, axios);

Vue.use(BootstrapVue);
Vue.use(BootstrapVueIcons);
Vue.use(VueRouter);

Vue.config.productionTip = false;

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#control-app')