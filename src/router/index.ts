import Vue from 'vue'
import VueRouter, {RouteConfig} from 'vue-router'

Vue.use(VueRouter)

const routes: Array<RouteConfig> = [
    {
        path: '/',
        redirect: () => '/planner/others'
    },
    {
        path: '/planner/me',
        component: () => import('@/views/planner/MyTasksList')
    },
    {
        path: '/planner/others',
        component: () => import('@/views/planner/OthersTasksList')
    },
    {
        path: '/planner/task/:id',
        component: () => import('@/views/planner/Task.vue')
    },
    {
        path: '/about',
        component: () => import('@/views/ui/About')
    },
    {
        path: '/profile',
        component: () => import('@/views/ui/Profile')
    },
    {
        path: '/login',
        component: () => import('@/components/ui/Login')
    },
]

const router = new VueRouter({
    mode: 'history',
    base: process.env.BASE_URL,
    routes
})

router.beforeEach((to, from, next) => {
    if (!router.app.$msal.isAuthenticated) {
        if (to.path != "/login") {
            next({path: "/login", query: {redirect: to.path}})
        }
    }
    next()
});

export default router
