import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'

import botsdk from 'uibot-sdk'
Vue.use(botsdk)

// 全局引入Toast
import './components/toast/toast.css';
import Toast from './components/toast/index';
Vue.use(Toast);

Vue.config.productionTip = false

new Vue({
    router,
    store,
    render: h => h(App)
}).$mount('#app')

router.push({ name: 'home' });