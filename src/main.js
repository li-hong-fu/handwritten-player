import '@/utils/jquery.js';
import Vue from '../public/static/vue';
import App from '@/index';

import { formatTime } from '@/utils/filters';
import Utils from '@/utils';

// ćšć±ćé
window.formatTime = formatTime;
window.$utils = Utils;

new Vue({
    render: (h) => h(App.init())
}).$mount('#app');
