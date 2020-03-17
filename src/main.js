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

Vue.prototype.$notify = new AWN({position: 'top-right'});
Vue.prototype.$control = new api("http://control.local/api/control", axios);

Vue.use(BootstrapVue);
Vue.use(BootstrapVueIcons);

Vue.config.productionTip = false;

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
