<template>
    <div>
        <nav class="uppercase fixed top-0 bg-white z-30 w-full shadow-line">
            <div class="max-w-screen-xl m-0 m-auto px-6 items-center h-28 flex justify-between">
                <router-link :to="{ name: 'home' }">
                    <img class="w-20 ml-0.5" :src="require(`@/assets/svg/logo.svg`)" alt="">
                </router-link>

                <div v-if="!user" class="text-xs items-center lg:visible lg:flex lg:static absolute invisible">
                    <router-link class="mr-12" to="/#bouquets">Букеты</router-link>
                    <router-link class="mr-12" to="/#about">О нас</router-link>
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
<!--                        <router-link :to="{ name: 'Cart' }"></router-link>-->
                </div>

                <div v-if="user" class="text-xs mt-4 items-center lg:visible lg:flex lg:static absolute invisible">
                    <router-link class="mr-12" :to="`/${user.role}/orders`">Заказы</router-link>
                    <router-link class="mr-12" :to="`/${user.role}/products`">Букеты</router-link>
                    <router-link v-if="user.role === 'admin'" to="#">Сотрудники</router-link>
<!--                    <div class="cursor-pointer" @click="handleLogout">Выйти</div>-->
                </div>

                <div v-show="!isClicked" @click="handeClick"
                     class="lg:absolute p-4 -mr-4 flex visible lg:invisible static lg:absolute">
                    <svg width="24" height="24" viewBox="0 0 19 13" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <line x1="-2.91409e-08" y1="0.75" x2="19" y2="0.749999" stroke="black" stroke-width="0.5"/>
                        <line x1="-2.91409e-08" y1="6.75" x2="19" y2="6.75" stroke="black" stroke-width="0.5"/>
                        <line x1="-2.18557e-08" y1="12.75" x2="19" y2="12.75" stroke="black" stroke-width="0.5"/>
                    </svg>
                </div>
            </div>
        </nav>

        <div class="mt-20">
            <router-view v-slot="{ Component }">
                <keep-alive include="HomeView">
                    <component :is="Component" />
                </keep-alive>
            </router-view>
        </div>


        <!-- Footer -->
        <!-- line w flower -->
        <div class="px-6">
            <div class="border-t-2 border-gray-150"></div>

            <div class="w-full flex justify-center -mt-12">
                <div class="p-5 bg-white rounded-full">
                    <svg width="45" height="45" viewBox="0 0 45 45" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <g clip-path="url(#clip0_401_660)">
                            <path d="M11.6404 12.4894C22.2277 16.9 27.271 29.1067 22.8822 39.7655C12.2949 35.355 7.25151 23.1483 11.6404 12.4894Z" fill="#EC0121" stroke="#1D1D1B" stroke-width="1.65"/>
                            <path d="M22.8628 39.7462C18.474 29.1067 23.4982 16.8807 34.1047 12.4701C38.4935 23.1097 33.4693 35.3357 22.8628 39.7462Z" fill="#EC0121" stroke="#1D1D1B" stroke-width="1.65"/>
                            <path d="M29.196 17.848C28.9071 16.6873 28.4066 14.6561 27.0015 12.5475C26.1738 11.2707 23.9793 8.93 22.8628 6.66667C21.7463 8.93 19.5712 11.2707 18.7242 12.5475C17.319 14.6561 16.7993 16.6873 16.5298 17.848C16.5298 17.848 15.933 20.324 16.0678 23.2645C16.395 30.364 22.3047 38.9725 22.8628 39.7462C24.9995 37.2702 29.4077 31.3893 29.658 23.2645C29.7157 21.2527 29.5231 19.4342 29.196 17.848Z" fill="#EC0121" stroke="#1D1D1B" stroke-width="1.65"/>
                            <path d="M43.7293 19.8732C30.043 19.2348 22.0928 34.1497 22.9592 40.7462C30.043 40.282 38.07 36.8967 40.6302 29.7777C41.6888 27.1082 41.5348 22.4073 43.7293 19.8732Z" fill="#EC0121" stroke="#1D1D1B" stroke-width="1.65"/>
                            <path d="M2.03491 19.8732C15.7213 19.2348 23.6713 34.1497 22.8052 40.7462C15.7213 40.282 7.69426 36.8967 5.13408 29.7777C4.07536 27.1082 4.22935 22.4073 2.03491 19.8732Z" fill="#EC0121" stroke="#1D1D1B" stroke-width="1.65"/>
                        </g>
                        <defs>
                            <clipPath id="clip0_401_660">
                                <rect width="45" height="45" fill="white"/>
                            </clipPath>
                        </defs>
                    </svg>
                </div>
            </div>
        </div>

        <div class="max-w-screen-xl px-6 m-auto lg:flex mb-16">
            <div class="lg:w-1/3 my-16 lg:pr-12 lg:border-b-0 border-b-2 lg:pb-0 pb-12 lg:border-r-2 border-gray-150">
                <div class="font-medium uppercase mb-6">
                    Позвонить нам:
                </div>
                <div class="flex">
                    <svg class="mr-3 -ml-1 mt-0.5" width="20" height="20" viewBox="0 0 11 11" fill="none"
                         xmlns="http://www.w3.org/2000/svg">
                        <path fill-rule="evenodd" clip-rule="evenodd"
                              d="M8.59385 5.04175L8.59102 5.15324L8.59385 5.27092L8.59115 5.38316L8.59382 5.50008L8.50734 9.28282C8.49658 9.75358 8.13854 10.1434 7.6704 10.1941C6.22767 10.3504 4.77229 10.3504 3.32956 10.1941C2.86142 10.1434 2.50338 9.75358 2.49262 9.28282L2.40614 5.50008L2.40883 5.38238L2.40615 5.27092L2.40897 5.1537L2.40613 5.04175L2.48345 1.99774C2.48396 1.97763 2.48493 1.95762 2.48636 1.93773L2.49146 1.72591C2.50311 1.24158 2.87302 0.84145 3.35494 0.791869C3.39505 0.787743 3.43517 0.783733 3.47529 0.779839C3.52971 0.767191 3.58551 0.757969 3.64247 0.752418C4.87789 0.632007 6.12209 0.632007 7.35751 0.752418C7.41446 0.757969 7.47026 0.76719 7.52467 0.779835C7.56481 0.78373 7.60494 0.787742 7.64506 0.791869C8.12698 0.84145 8.49689 1.24158 8.50854 1.72591L8.51365 1.93821C8.51506 1.95794 8.51602 1.97779 8.51653 1.99774L8.59385 5.04175ZM7.33332 8.13547C7.52317 8.13547 7.67707 7.98157 7.67707 7.79172C7.67707 7.60187 7.52317 7.44797 7.33332 7.44797H3.66666C3.47681 7.44797 3.32291 7.60187 3.32291 7.79172C3.32291 7.98157 3.47681 8.13547 3.66666 8.13547H7.33332ZM5.49999 9.94592C5.87969 9.94592 6.18749 9.63811 6.18749 9.25842C6.18749 8.87872 5.87969 8.57092 5.49999 8.57092C5.12029 8.57092 4.81249 8.87872 4.81249 9.25842C4.81249 9.63811 5.12029 9.94592 5.49999 9.94592Z"
                              fill="#777777"/>
                    </svg>
                    <div class="text-gray-500">
                        +7 (655) 12-34-34
                    </div>
                </div>
            </div>

            <div class="lg:w-1/3 lg:px-12 my-16 lg:border-b-0 border-b-2 lg:pb-0 pb-12 lg:border-r-2 border-gray-150">
                <div class="font-medium uppercase mb-6">
                    Мы в социальных сетях:
                </div>
                <div class="mb-3 flex">
                    <svg class="mr-4 mt-0.5" width="20" height="20" viewBox="0 0 11 11" fill="none"
                         xmlns="http://www.w3.org/2000/svg">
                        <path d="M5.5 11C8.53757 11 11 8.53757 11 5.5C11 2.46243 8.53757 0 5.5 0C2.46243 0 0 2.46243 0 5.5C0 8.53757 2.46243 11 5.5 11Z"
                              fill="#777777"/>
                        <path fill-rule="evenodd" clip-rule="evenodd"
                              d="M2.48962 5.44194C4.09298 4.74338 5.16214 4.28285 5.69709 4.06034C7.2245 3.42504 7.54188 3.31468 7.74875 3.31104C7.79425 3.31024 7.89598 3.32151 7.96188 3.37498C8.01752 3.42013 8.03283 3.48112 8.04015 3.52393C8.04748 3.56674 8.0566 3.66425 8.04935 3.74045C7.96658 4.61013 7.60843 6.72061 7.42623 7.69466C7.34913 8.10682 7.19732 8.24502 7.05035 8.25854C6.73096 8.28793 6.48842 8.04746 6.17907 7.84468C5.695 7.52736 5.42153 7.32984 4.95166 7.0202C4.40863 6.66235 4.76065 6.46567 5.07012 6.14425C5.15111 6.06013 6.55837 4.78012 6.58561 4.664C6.58902 4.64948 6.59218 4.59535 6.56002 4.56676C6.52786 4.53818 6.48039 4.54795 6.44614 4.55573C6.39759 4.56675 5.62428 5.07788 4.12621 6.08911C3.90671 6.23984 3.70789 6.31328 3.52976 6.30943C3.33338 6.30519 2.95563 6.1984 2.6748 6.10711C2.33037 5.99515 2.05661 5.93595 2.08045 5.74581C2.09287 5.64677 2.22926 5.54548 2.48962 5.44194Z"
                              fill="white"/>
                    </svg>

                    <div class="text-gray-500">
                        Telegram
                    </div>
                </div>
                <div class="mb-3 flex">
                    <svg class="mr-4 mt-0.5" width="20" height="20" viewBox="0 0 11 11" fill="none"
                         xmlns="http://www.w3.org/2000/svg">
                        <path d="M0 5.28C0 2.79098 0 1.54648 0.773238 0.773238C1.54648 0 2.79098 0 5.28 0H5.72C8.20903 0 9.45352 0 10.2268 0.773238C11 1.54648 11 2.79098 11 5.28V5.72C11 8.20903 11 9.45352 10.2268 10.2268C9.45352 11 8.20903 11 5.72 11H5.28C2.79098 11 1.54648 11 0.773238 10.2268C0 9.45352 0 8.20903 0 5.72V5.28Z"
                              fill="#777777"/>
                        <path d="M5.83403 7.92005C3.2784 7.92005 1.82073 6.18581 1.75999 3.30005H3.04014C3.08219 5.41813 4.02593 6.3153 4.77346 6.50029V3.30005H5.97891V5.12678C6.71709 5.04816 7.49257 4.21572 7.7542 3.30005H8.95962C8.75872 4.42846 7.91775 5.26089 7.31972 5.60311C7.91775 5.88059 8.87557 6.60666 9.23999 7.92005H7.91308C7.62808 7.04137 6.91799 6.36155 5.97891 6.26906V7.92005H5.83403Z"
                              fill="white"/>
                    </svg>

                    <div class="text-gray-500">
                        ВКонтакте
                    </div>
                </div>
            </div>

            <div class="lg:w-1/3 my-16 lg:pl-12">
                <div class="font-medium uppercase mb-9">
                    Пользовательское соглашение:
                </div>
                <div class="text-gray-500 hover:bg-black hover:text-white duration-100 hover:border-black cursor-pointer inline px-6 py-3 border border-gray-300 rounded-full">
                    Ознакомиться
                </div>
            </div>
        </div>

        <!-- All Rights & Login -->
        <div class="flex md:flex-row mx-6 flex-col justify-center mb-16 text-gray-400 text-sm">
            <div class="mr-1">© 2022 Florets, все права защищены.</div>

            <router-link v-if="!user" class="underline" :to="{ name: 'Login' }">
                Войти как сотрудник
            </router-link>

            <div v-else>
                Вы вошли как&nbsp;{{ user.name }}. <span class="cursor-pointer underline" @click="handleLogout">Выйти</span>
            </div>

        </div>

        <!-- mobile menu -->
        <transition
                enter-active-class="duration-200 ease-out"
                enter-from-class="transform opacity-0"
                enter-to-class="opacity-100"
                leave-active-class="duration-200 ease-in"
                leave-from-class="opacity-100"
                leave-to-class="transform opacity-0"
        >
            <div v-if="isClicked"
                 class="blurred shadow-md fixed w-full py-24 top-0 right-0 text-2xl flex flex-col items-center">
                <div class="mb-12 p-4 font-black" @click="isClicked = !isClicked">&#9587;</div>

                <!-- if no user -->
                <div v-if="!user" @click.stop="isClicked = !isClicked" class="mb-12">
                    <router-link to="/#bouquets">Букеты</router-link>
                </div>

                <div v-if="!user" @click.stop="isClicked = !isClicked" class="mb-12">
                    <router-link to="/#about">О нас</router-link>
                </div>

                <div v-if="!user" @click.stop="isClicked = !isClicked">
                    <router-link :to="{ name: 'Cart' }">Корзина ({{ formatPrice(itemsInCart.price) }} ₽)</router-link>
                </div>

                <!-- if user -->
                <div v-if="user" @click.stop="isClicked = !isClicked" class="mb-12">
                    <router-link :to="`/${user.role}/orders`">Заказы</router-link>
                </div>

                <div v-if="user" @click.stop="isClicked = !isClicked" class="mb-12">
                    <router-link :to="`/${user.role}/products`">Букеты</router-link>
                </div>

                <div v-if="user" @click.stop="isClicked = !isClicked">
                    <router-link v-if="user.role === 'admin'" to="#">Сотрудники</router-link>
                </div>
            </div>
        </Transition>

        <div v-show="isClicked" @click="isClicked = !isClicked"
             class="bg-black opacity-0 fixed top-0 bottom-0 z-30 h-full w-screen"></div>
    </div>
</template>

<script setup>
import HomeView from "@/views/HomeView"
import { shallowRef } from 'vue'
import { computed, onMounted, ref, watchEffect } from "vue";
import { useStore } from 'vuex'
import { formatPrice } from "@/functions";
import useAuth from "@/composables/useAuth";
import { useRouter } from "vue-router";

// let isClicked = false
let isClicked = ref(false)

const { error, fetchUser, logout } = useAuth()
const store = useStore()
const router = useRouter()
const currC = shallowRef(HomeView)

const handeClick = () => {
    isClicked.value = !isClicked.value
}

const routeByRole = () => {
    user.value.role === 'admin' ? router.push({ name: 'Admin' }) : router.push({ name: 'Employee' })
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

.blurred {
    background: rgb(255, 255, 255, 0.6);
    backdrop-filter: blur(12px);
    z-index: 50;
}
</style>
