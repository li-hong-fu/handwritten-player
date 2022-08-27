import '@/utils/jquery.js';
import Vue from '../public/static/vue';
import App from '@/index';

import { formatTime } from '@/utils/filters';
import Utils from '@/utils';

// 全局变量
window.formatTime = formatTime;
window.$utils = Utils;

new Vue({
    render: (h) => h(App.init())
}).$mount('#app');
