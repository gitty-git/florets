import { createRouter, createWebHistory } from 'vue-router'
import Home from '../views/Home.vue'

const routes = [
    {
        path: '/',
        name: 'Home',
        component: () => import(/* webpackChunkName: "about" */ '../views/Home.vue'),
        meta: {
            scrollTop: 0
        },
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

const scrollBehavior = (to, from, savedPosition) => {
    console.log(to.hash)
    const toHash = to.hash && {el: to.hash, top: 100}

    if (to.name === from.name && !to.hash) {
        to.meta?.scrollPos && (to.meta.scrollPos.top = 0)
        return { top: 0 }
    }
    const pos = savedPosition || to.meta?.scrollPos || { top: 0 }

    return new Promise((resolve) => {
        setTimeout(() => {
            if (to.hash) {
                resolve({el: to.hash, top: 100})
            }
            resolve(pos)
        }, 500)
        // setTimeout(() => {
        //
        // }, 1000)
    })
}


const router = createRouter({
    history: createWebHistory(process.env.BASE_URL),
    scrollBehavior,
    routes
})

router.beforeEach((to, from, next) => {
    console.log('window.scrollY:', window.scrollY)
    from.meta?.scrollTop && (from.meta.scrollTop = window.scrollY)
    console.log('from:\t', from.name, '\t', from.meta)
    console.log('to:\t\t', to.name, '\t', to.meta)
    return next()
})

export default router
