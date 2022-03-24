import 'element-ui/lib/theme-chalk/index.css';
import './style/reset.css';
import './style/common.less';
import './util/router-warning';
import 'default-passive-events';

import ElementUI from 'element-ui';
import Vue from 'vue';
import VueClipboard from 'vue-clipboard2';
import Enum from 'vue-enum';

import App from './App.vue';
import enumInfo from './constants';
import changePropertiesPlugin from './plugins';
import router from './router';
import store from './store';

VueClipboard.config.autoSetContainer = true; // add this line
Vue.use(ElementUI);
Vue.use(VueClipboard);
Vue.use(Enum, { enumInfo });
Vue.use(changePropertiesPlugin);


new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app');
