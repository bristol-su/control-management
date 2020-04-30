import '@fortawesome/fontawesome-free/css/all.min.css';
import "vue-select/src/scss/vue-select.scss";
import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store/store'
import AWN from "awesome-notifications";
import { BootstrapVue, BootstrapVueIcons } from 'bootstrap-vue'
import 'bootstrap/dist/css/bootstrap.css'
import 'bootstrap-vue/dist/bootstrap-vue.css'
import 'awesome-notifications/dist/style.css';
import VueRouter from 'vue-router';
import ControlService from "./service/ControlService";
import 'nprogress/nprogress.css'
import vSelect from 'vue-select'
import Notify from "./service/Notify";
import PortalVue from 'portal-vue';

Vue.component('v-select', vSelect)
Vue.use(PortalVue);

Vue.prototype.$notify = new AWN({position: 'top-right'});

ControlService.createWith(function(axios) {
    axios.interceptors.response.use(function(response) {
        return response;
    }, function (error) {
        let text = error.response.data.message;
        if(error.response.status === 422) {
            text += '<ul>' +
                Object.keys(error.response.data.errors).map(key => '<li>' + key + ': ' + error.response.data.errors[key] + '</li>')
                    + '</ul>';
        }
        Notify.alert(text, 'An error occured');
        return Promise.reject(error);
    });
})

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
