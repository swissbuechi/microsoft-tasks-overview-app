import Vue from 'vue'
import VueRouter, {RouteConfig} from 'vue-router'
import About from '@/views/About.vue'

Vue.use(VueRouter)

const routes: Array<RouteConfig> = [
    {
        path: '/',
        component: () => import('@/views/TasksList')
    },
    {
        path: '/about',
        component: About
    },
]

const router = new VueRouter({
    mode: 'history',
    base: process.env.BASE_URL,
    routes
})

export default router
