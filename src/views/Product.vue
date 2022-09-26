<template>
    <transition appear enter-active-class="transition transform duration-500 ease-out"
                enter-from-class="-translate-y-full opacity-0">
    <div v-if="product" class="px-6 m-0 py-20 m-auto flex lg:flex-row flex-col max-w-screen-xl">
        <div class="lg:w-1/2 w-full mb-12 sm:flex-row flex-col flex justify-between">
            <img class="mb-6 z-10 sm:mb-0 object-cover w-full sm:w-4/5 sm:pr-3" :src="mainImage" alt="">

            <div class="sm:w-1/6 sm:flex sm:flex-col grid grid-cols-4 gap-x-6 items-stretch justify-between">
<!--                <img class="sm:mr-0 hover:scale-105 cursor-pointer duration-150" :src="product.main_image" alt="">-->
                <div v-for="(image, key) in images" :key="key">
                    <transition
                            enter-active-class="transition transform duration-300 ease-out"
                            enter-from-class="-translate-x-full opacity-0"
                            leave-active-class="transition transform duration-300 ease-in"
                            leave-to-class="translate-x-full opacity-0"
                    >
                    <img v-on:load="onLoaded" v-show="loaded"
                         class="sm:mr-0 hover:scale-105 cursor-pointer duration-150"
                         :src="image" alt=""
                         @click="mainImage = image"
                    >
                    </transition>
                </div>

            </div>
        </div>

        <div class="lg:pl-20 w-full lg:w-1/2">
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

            <div :class="{'w-fit' : !alreadyInCart}" class="flex xl:flex-row flex-col xl:w-full mt-12 uppercase">
                <div v-if="!alreadyInCart"
                     class="border-t-2 flex items-center justify-center border-gray-150 w-full border-l-2 border-b-2 xl:border-r-0 border-r-2 h-16"
                >

                    <div class="text-gray-500 ml-6 xl:ml-10 text-xs">
                        Количество:
                    </div>

                    <div class="flex justify-between items-center text-black font-bold mx-6">
                        <div @click="decrease" class="h-12 w-12 cursor-pointer duration-150 flex justify-center items-center hover:border border-gray-150 rounded-full">
                            <img class="w-2" :src="require(`@/assets/svg/arrow.svg`)" alt="">
                        </div>

                        <div class="mx-4 w-4 flex font-bold justify-center">{{ amount }}</div>

                        <div @click="increase" class="xl:mr-0 -mr-4 h-12 w-12 cursor-pointer duration-150 flex justify-center items-center hover:border border-gray-150 rounded-full">
                            <img class="w-2 rotate-180" :src="require(`@/assets/svg/arrow.svg`)" alt="">
                        </div>
                    </div>
                </div>

                <div class="xl:mt-0 mt-6 duration-150 w-2/3 xl:w-96 font-medium text-xs uppercase">
                    <router-link class="text-mainRed flex border-2 h-16 flex justify-center border-opacity-20 items-center border-mainRed "
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
    </div>
    </transition>
</template>

<script setup>
import { onMounted, computed, ref, onBeforeMount } from "vue";
import { useRoute } from "vue-router";
import { useStore } from 'vuex'
import { formatPrice } from "@/functions";
import axios from "axios";

const store = useStore()

const amount = ref(1)
const alreadyInCart = ref(false)
const route = useRoute()
const product = ref(null)
const cart = ref([])
const mainImage = ref()
const loaded = ref(false)

const increase = () => {
    if (amount.value < 99) amount.value++
}

const onLoaded = () => {
    loaded.value = true
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
    cart.value.push({...product.value, amount: amount.value})

    updateCart()
}

const updateCart = () => {
    const cartItems = cart.value.reduce((acc, {price, amount}) => {
        acc.price += price * amount
        acc.amount += amount
        return acc
    }, { price: 0, amount: 0 })

    store.dispatch('setCart', {amount: cartItems.amount, price: cartItems.price})
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
