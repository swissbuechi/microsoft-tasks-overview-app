import Vue from 'vue'
import App from '@/App.vue'
import router from '@/router'
import vuetify from '@/plugins/vuetify';
import {MsalPlugin, MsalPluginOptions} from '@/plugins/msal-plugin';
import store from './store'

Vue.config.productionTip = false;


const options: MsalPluginOptions = {
    clientId: process.env.VUE_APP_AAD_CLIENT_ID,
    loginAuthority: process.env.VUE_APP_AAD_LOGIN_AUTHORITY,
};

Vue.use(new MsalPlugin(), options);

new Vue({
    router,
    vuetify,
    store,
    render: h => h(App)
}).$mount("#app");
