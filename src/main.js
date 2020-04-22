import Vue from 'vue'
import App from './App.vue'
import router from '@/router'
import store from '@/store/store'
import AWN from "awesome-notifications";
import { BootstrapVue, BootstrapVueIcons } from 'bootstrap-vue'
import 'bootstrap/dist/css/bootstrap.css'
import 'bootstrap-vue/dist/bootstrap-vue.css'
import 'awesome-notifications/dist/style.css';
import VueRouter from 'vue-router';
import ControlService from "./service/ControlService";
import 'nprogress/nprogress.css'

Vue.prototype.$notify = new AWN({position: 'top-right'});
Vue.prototype.$control = ControlService.getService();

Vue.use(BootstrapVue);
Vue.use(BootstrapVueIcons);
Vue.use(VueRouter);

Vue.config.productionTip = false;

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#control-management')
