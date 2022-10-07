import { createRouter, createWebHistory } from 'vue-router'
import Home from '../views/Home.vue'
import Product from '../views/Product.vue'

const routes = [
    {
        path: '/',
        name: 'Home',
        component: Home,
        meta: {transitionName: 'route-back'},
        params: true,
    },
    {
        path: '/products/:id',
        name: 'Product',
        component: Product,
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
    // if (to.name === from.name) {
    //     to.meta?.scrollPos && (to.meta.scrollPos.top = 0)
    //     return { top: 0 }
    // }
    const pos = savedPosition || to.meta?.scrollPos || { top: 0 }
    // let behavior = to.name === from.name && to.params.hash && 'smooth' || 'auto'
    // return !to.params.hash && pos || {el: to.params.hash, top: 100, behavior}



    return new Promise((resolve) => {
        setTimeout(() => {
            to.name !== from.name && to.params.hash && resolve({el: to.params.hash, top: 100})
            !to.params.hash && resolve(pos)
        }, 10)

        to.name === from.name && to.params.hash && resolve({el: to.params.hash, top: 100, behavior: 'smooth'})
    })
}


const router = createRouter({
    history: createWebHistory(process.env.BASE_URL),
    scrollBehavior,
    routes
})

// router.beforeEach((to, from, next) => {
//     from.meta?.scrollTop && (from.meta.scrollTop = window.scrollY)
//     return next()
// })

export default router
