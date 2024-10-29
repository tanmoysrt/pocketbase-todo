import { createRouter, createWebHistory } from 'vue-router'
import PocketBase from 'pocketbase';

const pb = new PocketBase('https://test1.ip-167-235-30-42.swiftwave.xyz');

const router = createRouter({
    history: createWebHistory(import.meta.env.BASE_URL),
    routes: [
        {
            path: '/',
            name: 'todo',
            component: () => import("../views/Todo.vue")
        },
        {
            path: '/auth',
            name: 'auth',
            component: () => import("../views/Auth.vue")
        }
    ]
})

router.beforeEach((to, from, next) => {
    if (pb.authStore.isValid) {
        next()
    } else {
        if (to.name === 'auth') {
            next()
        } else {
            next('/auth')
        }
    }
})

export default router
