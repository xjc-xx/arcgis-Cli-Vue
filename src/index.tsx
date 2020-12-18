import Vue from 'vue';

import App from './App.vue';
import ElementUI from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css'

Vue.use(ElementUI);  // 全局使用ElementUI

Vue.config.devtools = true;


new Vue({
    render() {
        return <App />;
    }
}).$mount('#root');
