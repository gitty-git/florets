<template>
    <div id="home">
        <nav class="uppercase fixed top-0 bg-white z-30 w-screen shadow-line flex justify-center">
            <div class="max-w-screen-xl w-screen mx-2 pl-4 pr-3 sm:pr-8 items-center h-28 flex justify-between">
                <router-link to="/">
                    <img class="w-24 -mt-2" :src="require(`@/assets/svg/logo.svg`)" alt="">
                </router-link>

                <div v-if="!user" class="text-xs items-center lg:visible lg:flex lg:static absolute invisible">
                    <router-link class="mr-12" :to="{name: 'Home', params: { hash: '#bouquets' }}">Букеты</router-link>
                    <router-link class="mr-12" :to="{name: 'Home', params: { hash: '#about' }}">О нас</router-link>
                    <div class="border-r-2 mr-12 h-8 border-gray-150"></div>
                    <router-link :to="{ name: 'Cart' }" class="flex items-center">
                        <div class="mr-3 mb-1">
                            <div v-if="itemsInCart.amount > 0"
                                 class="ml-3 w-5 h-5 flex items-center justify-center -mt-1 text-white font-medium px-1 bg-mainRed rounded-full absolute"
                                 :class="{'w-auto': itemsInCart.amount > 99}"
                            >
                                {{ itemsInCart.amount }}
                            </div>
                            <svg width="26" height="26" viewBox="0 0 26 26" fill="none" xmlns="http://www.w3.org/2000/svg">
                                <path d="M17.3337 9.75001V6.50001C17.3337 4.10677 15.3936 2.16667 13.0004 2.16667C10.6072 2.16667 8.66706 4.10677 8.66706 6.50001V9.75M3.89173 11.2146L3.24173 18.148C3.05691 20.1193 2.96451 21.105 3.29161 21.8663C3.57896 22.5351 4.08252 23.0881 4.72158 23.4366C5.44904 23.8333 6.43904 23.8333 8.41902 23.8333H17.5818C19.5617 23.8333 20.5517 23.8333 21.2792 23.4366C21.9183 23.0881 22.4218 22.5351 22.7092 21.8663C23.0363 21.105 22.9439 20.1193 22.7591 18.148L22.1091 11.2146C21.953 9.54996 21.875 8.71763 21.5006 8.08835C21.1709 7.53414 20.6838 7.09054 20.1012 6.814C19.4397 6.50001 18.6037 6.50001 16.9318 6.50001L9.06903 6.50001C7.39705 6.50001 6.56107 6.50001 5.89959 6.814C5.31703 7.09054 4.8299 7.53414 4.50019 8.08835C4.12582 8.71763 4.04779 9.54996 3.89173 11.2146Z"
                                      stroke="black" stroke-linecap="round" stroke-linejoin="round"/>
                            </svg>
                        </div>
                        <div>
                            Корзина ({{ formatPrice(itemsInCart.price) }} ₽)
                        </div>
                    </router-link>
                </div>

                <div v-if="user" class="text-xs mt-4 items-center lg:visible lg:flex lg:static absolute invisible">
                    <router-link class="mr-12" :to="`/${user.role}/orders`">Заказы</router-link>
                    <router-link class="mr-12" :to="`/${user.role}/products`">Букеты</router-link>
                    <router-link class="mr-12 cursor-default text-gray-400" v-if="user.role === 'admin'" to="#">Сотрудники</router-link>
                    <div class="cursor-pointer" @click="handleLogout">Выйти</div>
                </div>

                <div class="lg:absolute -mr-2 flex visible lg:invisible static lg:absolute">
                    <router-link :to="{ name: 'Cart' }" class="mr-3">
                        <div class="-mt-0.5 p-2">
                            <div v-if="itemsInCart.amount > 0"
                                 class="ml-3 w-5 h-5 flex items-center justify-center -mt-1 text-white font-medium px-1 bg-mainRed rounded-full absolute"
                                 :class="{'w-auto': itemsInCart.amount > 99}"
                            >
                                {{ itemsInCart.amount }}
                            </div>
                            <svg width="26" height="26" viewBox="0 0 26 26" fill="none" xmlns="http://www.w3.org/2000/svg">
                                <path d="M17.3337 9.75001V6.50001C17.3337 4.10677 15.3936 2.16667 13.0004 2.16667C10.6072 2.16667 8.66706 4.10677 8.66706 6.50001V9.75M3.89173 11.2146L3.24173 18.148C3.05691 20.1193 2.96451 21.105 3.29161 21.8663C3.57896 22.5351 4.08252 23.0881 4.72158 23.4366C5.44904 23.8333 6.43904 23.8333 8.41902 23.8333H17.5818C19.5617 23.8333 20.5517 23.8333 21.2792 23.4366C21.9183 23.0881 22.4218 22.5351 22.7092 21.8663C23.0363 21.105 22.9439 20.1193 22.7591 18.148L22.1091 11.2146C21.953 9.54996 21.875 8.71763 21.5006 8.08835C21.1709 7.53414 20.6838 7.09054 20.1012 6.814C19.4397 6.50001 18.6037 6.50001 16.9318 6.50001L9.06903 6.50001C7.39705 6.50001 6.56107 6.50001 5.89959 6.814C5.31703 7.09054 4.8299 7.53414 4.50019 8.08835C4.12582 8.71763 4.04779 9.54996 3.89173 11.2146Z"
                                      stroke="black" stroke-linecap="round" stroke-linejoin="round"/>
                            </svg>
                        </div>
                    </router-link>

                    <div @click="handeClick" class="p-2">
                        <svg width="24" height="24" viewBox="0 0 19 13" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <line x1="-2.91409e-08" y1="0.75" x2="19" y2="0.749999" stroke="black" stroke-width="0.5"/>
                            <line x1="-2.91409e-08" y1="6.75" x2="19" y2="6.75" stroke="black" stroke-width="0.5"/>
                            <line x1="-2.18557e-08" y1="12.75" x2="19" y2="12.75" stroke="black" stroke-width="0.5"/>
                        </svg>
                    </div>
                </div>

            </div>
        </nav>

<!--        <div class="mt-20">-->
<!--            <router-view v-slot="{ Component, route }">-->
<!--                <keep-alive include="Home">-->
<!--                    <transition :name="route.meta.transitionName || 'route'" >-->
<!--                        <component :is="Component"/>-->
<!--                    </transition>-->
<!--                </keep-alive>-->
<!--            </router-view>-->
<!--        </div>-->

        <div class="mt-20">
            <router-view v-slot="{ Component, route }">
                <keep-alive include="Home">
                        <component :is="Component"/>
                </keep-alive>
            </router-view>
        </div>

        <!-- mobile menu -->
        <transition appear
                    enter-active-class="duration-500 linear"
                    enter-from-class="-translate-y-full"
                    leave-active-class="duration-200 linear"
                    leave-to-class="-translate-y-full"
        >
            <div v-show="isClicked"
                 class="blurred font-medium shadow-md z-50 fixed w-full py-24 top-0 right-0 text-2xl flex flex-col items-center">
                <div class="mb-12 p-4 font-black" @click="isClicked = !isClicked">&#9587;</div>

                <!-- if no user -->
                <div v-if="!user" class="flex flex-col items-center">
                    <div @click.stop="isClicked = !isClicked" class="mb-12">
                        <router-link :to="{name: 'Home', params: { hash: '#bouquets' }}">Букеты</router-link>
                    </div>

                    <div @click.stop="isClicked = !isClicked" class="mb-12">
                        <router-link :to="{name: 'Home', params: { hash: '#about' }}">О нас</router-link>
                    </div>

                    <div @click.stop="isClicked = !isClicked">
                        <router-link :to="{ name: 'Cart' }">Корзина ({{ formatPrice(itemsInCart.price) }} ₽)</router-link>
                    </div>
                </div>

                <!-- if user -->
                <div v-if="user" class="flex flex-col items-center">
                    <div @click.stop="isClicked = !isClicked" class="mb-12">
                        <router-link :to="`/${user.role}/orders`">Заказы</router-link>
                    </div>

                    <div @click.stop="isClicked = !isClicked" class="mb-12">
                        <router-link :to="`/${user.role}/products`">Букеты</router-link>
                    </div>

                    <div @click.stop="isClicked = !isClicked" class="mb-12 text-gray-400">
                        <router-link v-if="user.role === 'admin'" to="#">Сотрудники</router-link>
                    </div>

                    <div class="cursor-pointer" @click="handleLogout">Выйти</div>
                </div>
            </div>
        </Transition>

        <div v-show="isClicked" @click="isClicked = !isClicked"
             class="bg-black opacity-0 fixed top-0 bottom-0 z-30 h-full w-screen"></div>
    </div>
</template>

<script setup>
import { computed, onMounted, ref } from "vue";
import { useStore } from 'vuex'
import { formatPrice } from "@/functions";
import useAuth from "@/composables/useAuth";
import { useRouter } from "vue-router";

// let isClicked = false
let isClicked = ref(false)

const { error, fetchUser, logout } = useAuth()
const store = useStore()
const router = useRouter()

const handeClick = () => {
    isClicked.value = !isClicked.value
}

const itemsInCart = computed(() => store.state.cart.items)
const user = computed(() => store.getters.getUser)

const setItemsInCart = () => {
    let cart = JSON.parse(localStorage.getItem("cart")) || []

    const cartItems = cart.reduce((acc, {price, amount}) => {
        acc.price += price * amount
        acc.amount += amount
        return acc
    }, {price: 0, amount: 0})

    store.dispatch('setCart', { amount: cartItems.amount, price: cartItems.price })
}

const handleLogout = async () => {
    await logout()
    await router.push('/')
    isClicked.value = false
}

onMounted(() => {
    fetchUser()
            .then(res => store.dispatch('setUser', res.data))
            .catch(err => {
                //
            })

    setItemsInCart()
})
</script>

<style>
@import url('https://fonts.googleapis.com/css2?family=Montserrat:wght@300;400;500&family=Noto+Serif+Display:wght@400;700&display=swap');
.route-enter-from {
    opacity: 0;
    transform: translateX(100%);
}
.route-enter-active {
    transition: transform 0.3s ease-out, opacity 0.3s linear;
}
.route-leave-to {
    opacity: 0;
    transform: translateX(-100%);
}
.route-leave-active {
    transition: transform 0.3s linear, opacity 0.1s ease-out;
}
.route-back-enter-from {
    opacity: 0;
    transform: translateX(-100%);
}
.route-back-enter-active {
    transition: transform 0.3s linear, opacity 0.1s ease-out;
}
.route-back-leave-to {
    opacity: 0;
    transform: translateX(100%);
}
.route-back-leave-active {
    transition: transform 0.3s linear, opacity 0.1s ease-out;
}
.blurred {
    background: rgb(255, 255, 255, 0.6);
    backdrop-filter: blur(12px);
    z-index: 50;
}
</style>
