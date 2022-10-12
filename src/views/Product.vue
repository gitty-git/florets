<template>
    <transition appear enter-active-class="duration-500 ease-out" enter-from-class="opacity-0">
        <div class="w-full flex flex-col items-center">
            <div id="product" class="px-6 w-full pt-16 pb-20 max-w-screen-xl">
                <div class="mb-3 -ml-3 flex p-3 cursor-pointer text-gray-500"
                     @click="router.go(-1)">
                    <svg class="mr-3 fill-gray-400" width="32" viewBox="0 0 98 24" fill="none"
                         xmlns="http://www.w3.org/2000/svg">
                        <path d="M0.93934 10.9393C0.353553 11.5251 0.353553 12.4749 0.93934 13.0607L10.4853 22.6066C11.0711 23.1924 12.0208 23.1924 12.6066 22.6066C13.1924 22.0208 13.1924 21.0711 12.6066 20.4853L4.12132 12L12.6066 3.51472C13.1924 2.92893 13.1924 1.97918 12.6066 1.3934C12.0208 0.807612 11.0711 0.807612 10.4853 1.3934L0.93934 10.9393ZM98 10.5L2 10.5V13.5L98 13.5V10.5Z"/>
                    </svg>
                    <div class="uppercase text-sm">Назад</div>
                </div>

                <div class="flex lg:flex-row flex-col">
                    <div class="lg:w-1/2 max-w-xl mb-12 sm:flex-row flex-col flex justify-between">
                        <div class="relative mb-6 sm:mb-0 object-cover w-full sm:w-4/5 sm:pr-3 relative">
                            <img class="w-full" :src="require(`@/assets/images/plug.png`)" alt="">
                            <transition type="out-in" enter-active-class="transition transform duration-700"
                                        enter-from-class="opacity-0">
                                <img v-if="product" v-show="mainImageLoaded"
                                     @load="mainImageLoaded = true" class="absolute top-0 h-full w-fit" :src="mainImage" alt="">
                            </transition>
                        </div>

                        <div v-show="!product" class="sm:w-1/6 sm:flex sm:flex-col grid grid-cols-4 gap-x-6 items-stretch justify-between">
                            <div v-for="key in 4">
                                <img class="w-full" :src="require(`@/assets/images/plug.png`)" alt="">
                            </div>
                        </div>

                        <div v-if="product" class="sm:w-1/6 sm:flex sm:flex-col grid grid-cols-4 gap-x-6 items-stretch justify-between">
                            <div v-for="(image, key) in images" :key="key">
                                <div class="relative">
                                    <img class="w-full" :src="require(`@/assets/images/plug.png`)" alt="">
                                    <transition type="out-in" enter-active-class="transition transform duration-1000"
                                                enter-from-class="opacity-0">
                                        <img @load="loaded = true" v-show="loaded"
                                             class="sm:mr-0 hover:scale-105 cursor-pointer duration-150 absolute top-0"
                                             :src="image" alt="" @click="mainImage = image">
                                    </transition>
                                </div>
                            </div>
                        </div>
                    </div>

                    <transition type="out-in" enter-active-class="transition transform duration-200"
                                enter-from-class="opacity-0">
                    <div v-if="product" class="lg:pl-20 w-full lg:w-1/2">
                        <div>
                            <div class="flex flex-wrap mb-2">
                                <div class="font-display text-3xl lg:text-4xl mr-3 mb-1">
                                    {{ product.name }}
                                </div>
                                <div class="text-sm mt-1">⌀ {{ product.size }} см</div>
                            </div>

                            <div class="text-gray-400 text-2xl">
                                {{ formattedPrice }} ₽
                            </div>
                        </div>

                        <div class="leading-loose mt-12 font-serif text-gray-500">
                            {{ product.description }}
                        </div>

                        <div :class="{'w-fit' : !alreadyInCart}"
                             class="flex xl:flex-row flex-col xl:w-full mt-12 uppercase">
                            <div v-if="!alreadyInCart"
                                 class="border-t-2 flex items-center justify-center border-gray-150 w-full border-l-2 border-b-2 xl:border-r-0 border-r-2 h-16"
                            >

                                <div class="text-gray-500 ml-6 xl:ml-10 text-xs">
                                    Количество:
                                </div>

                                <div class="flex justify-between items-center text-black font-bold mx-6">
                                    <div @click="decrease"
                                         class="h-12 w-12 cursor-pointer duration-150 flex justify-center items-center hover:border border-gray-150 rounded-full">
                                        <img class="w-2" :src="require(`@/assets/svg/arrow.svg`)" alt="">
                                    </div>

                                    <div class="mx-4 w-4 flex font-bold justify-center">{{ amount }}</div>

                                    <div @click="increase"
                                         class="xl:mr-0 -mr-4 h-12 w-12 cursor-pointer duration-150 flex justify-center items-center hover:border border-gray-150 rounded-full">
                                        <img class="w-2 rotate-180" :src="require(`@/assets/svg/arrow.svg`)" alt="">
                                    </div>
                                </div>
                            </div>

                            <div class="xl:mt-0 mt-6 duration-150 w-2/3 xl:w-96 font-medium text-xs uppercase">
                                <router-link
                                        class="text-mainRed flex border-2 h-16 flex justify-center border-opacity-20 items-center border-mainRed "
                                        v-if="alreadyInCart"
                                        :to="{name: 'Cart'}"
                                >
                                    <div class="flex justify-center items-start">
                                        <div class="mr-1">{{ amount }} шт. В</div>
                                        <div class="relative">
                                            корзине
                                            <div class="border-b-2 w-full absolute border-mainRed"/>
                                        </div>
                                    </div>
                                </router-link>
                                <div v-else
                                     class="hover:bg-white px-3 font-medium text-xs text-white bg-mainRed cursor-pointer hover:text-mainRed border-mainRed border-2 flex justify-center items-center h-16"
                                     @click="addProduct"
                                >
                                    Добавить в корзину
                                </div>
                            </div>
                        </div>

                        <div class="text-sm text-gray-400 mt-12">
                            <span class="text-black font-medium">ID продукта:</span> {{ product.id.toUpperCase() }}
                        </div>
                    </div>
                    </transition>
                </div>
            </div>

            <transition appear enter-active-class="delay-700 transform duration-1000 ease-out"
                        enter-from-class="opacity-0">
                <div class="w-full">
                    <Footer/>
                </div>
            </transition>
        </div>
    </transition>
</template>
<!--</transition>-->

<script setup>
import { onMounted, computed, ref, onBeforeMount, watchEffect } from "vue";
import { useRoute, useRouter } from "vue-router";
import { useStore } from 'vuex'
import { formatPrice } from "@/functions";
import axios from "axios";
import Footer from "@/components/Footer";

const store = useStore()

const amount = ref(1)
const alreadyInCart = ref(false)
const product = ref("")
const cart = ref([])
const mainImage = ref()
const loaded = ref(false)
const mainImageLoaded = ref(false)

const route = useRoute()
const router = useRouter()

const increase = () => {
    if (amount.value < 99) amount.value++
}

const decrease = () => {
    if (amount.value > 1) amount.value--
}

const formattedPrice = computed(() => {
    return formatPrice(product.value.price)
})

const images = computed(() => {
    return [product.value.main_image, ...JSON.parse(product.value.images)]
})

const getLocalProducts = () => {
    return JSON.parse(localStorage.getItem("cart")) || []
}

const addProduct = () => {
    // const item = products.find(p => p.id === route.params.id)

    alreadyInCart.value = true
    cart.value.push({ ...product.value, amount: amount.value })

    updateCart()
}

const updateCart = () => {
    const cartItems = cart.value.reduce((acc, { price, amount }) => {
        acc.price += price * amount
        acc.amount += amount
        return acc
    }, { price: 0, amount: 0 })

    store.dispatch('setCart', { amount: cartItems.amount, price: cartItems.price })
    localStorage.setItem("cart", JSON.stringify(cart.value))
}

const checkProductInCart = () => {
    let cartProducts = JSON.parse(localStorage.getItem("cart")) || []
    let cartProduct = cartProducts.find(p => p.id === product.value.id)
    if (cartProduct) {
        alreadyInCart.value = true
        amount.value = cartProduct.amount
    }
}

onBeforeMount(async () => {
    let res = await axios.get(`api/products/${route.params.id}`)
    product.value = res.data[0]
    mainImage.value = product.value.main_image
    checkProductInCart()
})

onMounted(() => {
    cart.value = JSON.parse(localStorage.getItem("cart")) || []
})
</script>

<style scoped>

</style>
