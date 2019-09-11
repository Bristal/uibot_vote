import Vue from 'vue'
import Router from 'vue-router'
import Home from './views/Home.vue'

Vue.use(Router)

export default new Router({
    mode: 'hash',
    base: process.env.BASE_URL,
    routes: [{
            path: '/',
            redirect: "/home",
            name: "首页"
        },
        {
            path: '/home',
            name: 'home',
            component: Home
        },
        {
            path: '/about',
            name: 'about',
            component: () =>
                import ('./views/About.vue')
        },
        {
            path: '/create',
            name: 'create',
            component: () =>
                import ('./vote/creat.vue')
        },
        {
            path: '/dovote',
            name: 'dovote',
            component: () =>
                import ('./vote/doVote.vue')
        },
        {
            path: '/result',
            name: 'result',
            component: () =>
                import ('./vote/result.vue')
        }
    ]
})