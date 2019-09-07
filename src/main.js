import Vue from 'vue';
import App from './App.vue';
import router from './router';
import store from './vuex/store';
import axios from './http';
import './rem';
import Mint from 'mint-ui';
import 'mint-ui/lib/style.css';
import md5 from 'js-md5';
import clipboard from 'clipboard';
import preview from 'vue-photo-preview';
import 'vue-photo-preview/dist/skin.css';
import config from '@/utils/configs.js';
import Swiper from 'swiper';
import 'swiper/dist/css/swiper.min.css';
// 自定义引入公共组件
import Components from '@/utils/components.js';
import VueClipboard from 'vue-clipboard2';

Vue.use(preview);
Vue.prototype.$md5 = md5;
Vue.config.productionTip = false;
Vue.prototype.$axios = axios;
Vue.prototype.clipboard = clipboard;
Vue.prototype.configs = config;
Vue.use(Mint);
Vue.prototype.$Swiper = Swiper;
Vue.use(Components);

//复制到粘贴板插件
VueClipboard.config.autoSetContainer = true;
Vue.use(VueClipboard);

// 自定义全局指令---点击弹框其他地方弹框消失
Vue.directive('clickoutside', {
    // 初始化指令
    bind(el, binding, vnode) {
        function documentHandler(e) {
            // 这里判断点击的元素是否是本身，是本身，则返回
            if (el.contains(e.target)) {
                return false;
            }
            // 判断指令中是否绑定了函数
            if (binding.expression) {
                // 如果绑定了函数 则调用那个函数，此处binding.value就是handleClose方法
                binding.value(e);
            }
        }
        // 给当前元素绑定个私有变量，方便在unbind中可以解除事件监听
        el.__vueClickOutside__ = documentHandler;
        document.addEventListener('click', documentHandler);
        document.addEventListener('contextmenu', documentHandler);
    },
    update() {},
    unbind(el, binding) {
        // 解除事件监听
        document.removeEventListener('click', el.__vueClickOutside__);
        document.removeEventListener('contextmenu', el.__vueClickOutside__);
        delete el.__vueClickOutside__;
    },
});

Vue.directive('enterNumber', {
    inserted: function(el) {
        el.addEventListener('keypress', function(e) {
            e = e || window.event;
            let charcode = typeof e.charCode == 'number' ? e.charCode : e.keyCode;
            let re = /\d/;
            if (!re.test(String.fromCharCode(charcode)) && charcode > 9 && !e.ctrlKey) {
                if (e.preventDefault) {
                    e.preventDefault();
                } else {
                    e.returnValue = false;
                }
            }
        });
    },
});

//定义全局过滤器
//金额过滤(保留两位小数)
Vue.filter('numToFloat', function(value) {
    return parseFloat(value).toFixed(2);
});
//金额过滤(整数)
Vue.filter('numToInt', function(value) {
    return parseInt(value);
});

new Vue({
    router,
    store,
    render: h => h(App),
}).$mount('#app');
