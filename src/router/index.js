import Vue from 'vue'
import VueRouter from 'vue-router'
import Login from '../components/Login.vue'
import Home from '../components/Home.vue'
import Welcome from '../components/Welcome.vue'
import User from '../components/user/Users'
import Rights from '../components/power/Rights'
// import Roles from '../components/power/Roles'
// import Categories from '../components/goods/categories'
import Params from '../components/grade/Grade'
import Avg from '../components/grade/Avg'
import Report from '../components/report/Report'
import Person from '../components/grade/Person'
import ClassGrade from '../components/grade/ClassGrade'
import Change from '../components/dept/Change'
import Reward from '../components/dept/Reward'
import Punish from '../components/dept/Punish'
Vue.use(VueRouter)

const routes = [{
        path: '/',
        redirect: '/login'
    },
    {
        path: '/login',
        component: Login
    },
    {
        path: '/home',
        component: Home,
        redirect: '/welcome',
        children: [{
            path: '/welcome',
            component: Welcome
        }, {
            path: '/user',
            component: User
        }, {
            path: '/rights',
            component: Rights
        }, {
            path: '/grades',
            component: Params
        }, {
            path: '/report',
            component: Report
        }, {
            path: '/avg',
            component: Avg
        }, {
            path: '/person',
            component: Person
        }, {
            path: '/classGrade',
            component: ClassGrade
        }, {
            path: '/change',
            component: Change
        }, {
            path: '/reward',
            component: Reward
        }, {
            path: '/punish',
            component: Punish
        }]
    }
]

const router = new VueRouter({
    routes
})

//挂载路由导航守卫
router.beforeEach((to, from, next) => {
    if (to.path == '/login') return next()
    const tokenStr = window.sessionStorage.getItem('token')
    if (!tokenStr) return next('/login')
    next()
})

export default router