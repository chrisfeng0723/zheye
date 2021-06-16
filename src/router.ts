
import { createRouter, createWebHistory } from 'vue-router'

import Home from './views/Home.vue'
import Login from './views/Login.vue'
import Signup from "./views/Signup.vue";

const routerHistory = createWebHistory()
const router = createRouter({
    history: routerHistory,
    routes: [
        {
            path: "/",
            name: "home",
            component: Home
        },
        {
            path: '/login',
            name: 'login',
            component: Login
        },
        {
            path: '/signup',
            name: 'signup',
            component: Signup,
            meta:{ redirectAlreadyLogin: true }
        },
        {
            path:'/column/:id',
            name:'column',
            component: ColumnDetail
        }

    ]

})

export default router