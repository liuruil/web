import Vue from 'vue'
import VueRouter from 'vue-router'
Vue.use(VueRouter);

export default function () {
    const router = new VueRouter({
        mode: "history",
        routes: [{
            path: "/",
            component: () => import('../components/home.vue')
        }, {
            path: "/about",
            component: () => import('../components/about.vue')
        }]
    })
    return router
}