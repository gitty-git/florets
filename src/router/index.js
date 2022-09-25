import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '../views/HomeView.vue'

const routes = [
    {
        name: 'Bouquets',
        el: document.getElementById('bouquets'),
        top: 1000,
        component: HomeView
    },
    {
        path: '/',
        name: 'home',
        component: HomeView
    },
    {
        path: '/products/:id',
        name: 'Product',
        // route level code-splitting
        // this generates a separate chunk (about.[hash].js) for this route
        // which is lazy-loaded when the route is visited.
        component: () => import(/* webpackChunkName: "about" */ '../views/Product.vue')
    },
    {
      path:'/cart',
      name: 'Cart',
      component: () => import('../views/Cart')
    },
    {
        path:'/order',
        name: 'Order',
        component: () => import('../views/Order')
    },
    {
        path:'/register',
        name: 'Register',
        component: () => import('../views/Register')
    },
    {
        path:'/login',
        name: 'Login',
        component: () => import('../views/Login')
    },
    {
        path:'/admin',
        name: 'Admin',
        component: () => import('../views/Admin')
    },
    {
        path:'/employee',
        name: 'Employee',
        component: () => import('../views/Employee')
    },
    {
        path:'/:role/orders',
        name: 'OrderList',
        component: () => import('../views/dashboard/OrderList')
    },
    {
        path:'/:role/orders/:id',
        name: 'ViewOrder',
        component: () => import('../views/dashboard/ViewOrder')
    },
    {
        path:'/:role/products',
        name: 'ProductList',
        component: () => import('../views/dashboard/ProductList')
    },
    {
        path:'/:role/add-product',
        name: 'AddProduct',
        component: () => import('../views/dashboard/AddProduct')
    },
    {
        path:'/thanks-for-the-order/:orderId',
        name: 'ThanksForTheOrder',
        component: () => import('../views/ThanksForTheOrder'),
        props: true
    },
]

const router = createRouter({
    history: createWebHistory(process.env.BASE_URL),
    scrollBehavior(to, from, savedPosition) {
        if (to.hash) {
            return {
                el: to.hash,
                top: 100,
                behavior: 'smooth'
            }
        }
        if (savedPosition) {
            return savedPosition
        } else {
            return { top: 0 }
        }
    },
    routes
})

export default router
