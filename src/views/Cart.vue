<template>
    <div class="w-full flex justify-center">
        <div class="px-6 pt-16 pb-20 w-full max-w-screen-xl">
            <div class="mb-3 -ml-3 flex p-3 cursor-pointer text-gray-500" @click="router.go(-1)">
                <svg class="mr-3 fill-gray-400" width="32" viewBox="0 0 98 24" fill="none"
                     xmlns="http://www.w3.org/2000/svg">
                    <path d="M0.93934 10.9393C0.353553 11.5251 0.353553 12.4749 0.93934 13.0607L10.4853 22.6066C11.0711 23.1924 12.0208 23.1924 12.6066 22.6066C13.1924 22.0208 13.1924 21.0711 12.6066 20.4853L4.12132 12L12.6066 3.51472C13.1924 2.92893 13.1924 1.97918 12.6066 1.3934C12.0208 0.807612 11.0711 0.807612 10.4853 1.3934L0.93934 10.9393ZM98 10.5L2 10.5V13.5L98 13.5V10.5Z"/>
                </svg>
                <div class="uppercase text-sm">Назад</div>
            </div>

            <div class="font-display -ml-0.5 text-2xl lg:text-4xl">Корзина</div>
            <transition appear enter-active-class="-transition transform duration-500 ease-out"
                        enter-from-class="translate-y-full opacity-0">
                <div v-if="!products.length" class="font-sm text-gray-400 mt-4 mb-12">Корзина пуста.</div>
            </transition>

            <!-- list -->
            <transition appear enter-active-class="-transition transform duration-500 ease-out"
                        enter-from-class="opacity-0">
                <div>
                    <div class="mt-12" v-if="products.length">
                        <div class="flex text-xs uppercase text-gray-400 justify-between pb-3 border-b-2 border-gray-150">
                            <div class="md:w-2/3 w-4/5 flex justify-between">
                                <div class="w-1/2">Товар</div>
                                <div class="w-1/2">Количество</div>
                            </div>

                            <div class="md:w-1/3 w-1/5 flex justify-between">
                                <div class="md:w-1/2 w-full md:justify-start flex justify-end">Цена</div>
                                <div class="md:w-1/2 w-0"></div>
                            </div>
                        </div>

                        <div v-for="product in products" :key="product.id"
                             class="flex py-6 items-center justify-between border-b-2 border-gray-150">
                            <div class="md:w-2/3 w-4/5 flex justify-between items-center">
                                <router-link :to="{ name: 'Product', params: {id: product.id} }"
                                             class="w-1/2 flex items-start lg:items-center lg:flex-row flex-col"
                                >
                                    <div class="visible lg:invisible mb-4 absolute uppercase text-sm">{{ product.name }}</div>
                                    <img class="lg:mb-0 w-24 mr-6 lg:mt-0 mt-10" :src="product.main_image" alt="">
                                    <div class="lg:visible lg:static absolute pr-6 invisible uppercase text-sm">{{ product.name }}</div>
                                </router-link>

                                <div class="w-1/2 flex md:flex-row flex-col md:items-center">
                                    <div class="flex xl:mr-6 md:mr-2 justify-start items-center text-black font-bold">
                                        <div @click="decrease(product.id)"
                                             class="-ml-6 h-12 w-12 cursor-pointer duration-150 flex justify-center items-center hover:border-2 border-gray-150 rounded-full">
                                            <img class="w-2" :src="require(`@/assets/svg/arrow.svg`)" alt="">
                                        </div>

                                        <div class="mx-4">{{ product.amount }}</div>

                                        <div @click="increase(product.id)"
                                             class="h-12 w-12 cursor-pointer duration-150 flex justify-center items-center hover:border-2 border-gray-150 rounded-full">
                                            <img class="w-2 rotate-180" :src="require(`@/assets/svg/arrow.svg`)" alt="">
                                        </div>
                                    </div>

                                    <div class="text-xs md:mt-0 mt-6 md:ml-0 ml-2.5 text-gray-400">{{ formatPrice(product.price) }} / шт.</div>
                                </div>
                            </div>

                            <div class="md:w-1/3 w-1/5 md:mt-0 mt-6 flex flex-wrap justify-between items-center">
                                <div class="md:w-1/2 w-full md:mb-0 md:text-xl mb-4 flex md:justify-start justify-end font-medium">
                                    {{ formatPrice(product.price * product.amount) }} ₽
                                </div>

                                <div @click="removeProduct(product.id)" class="md:w-1/2 w-full flex justify-end">
                                    <div class="md:visible invisible md:static absolute p-3 font-medium duration-150 cursor-pointer hover:bg-mainRed hover:text-white flex px-6 text-xs text-mainRed uppercase border-opacity-20 rounded-full border-mainRed inline border">
                                        <div class="mt-0.5">Удалить</div>
                                    </div>

                                    <div class="font-bold visible mt-1 text-xl text-mainRed flex justify-center items-center p-2 -mr-2 md:invisible static md:absolute">
                                        &#9587;
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>


                    <div v-if="products.length" class="flex justify-end md:mt-12 mt-6 md:text-2xl">
                        <span class="text-gray-400">Итого:</span>&nbsp;<span
                            class="font-medium">{{ productAmount }}</span>
                        &nbsp;{{ pluralizedGoods }} на сумму&nbsp;
                        <span class="font-medium">{{ formatPrice(total) }}</span>&nbsp;₽.
                    </div>

                    <!-- btn -->
                    <div class="w-full flex mt-16 justify-center">
                        <div class="my-24 mb-32" v-if="!products.length">
                            <router-link :to="{name: 'Home', params: { hash: '#bouquets' }}">
                                <div class="btn">Выбрать букет</div>
                            </router-link>
                        </div>
                        <router-link v-else :to="{ name: 'Order' }">
                            <div class="btn text-sm">Перейти к оформлению</div>
                        </router-link>
                    </div>
                </div>
            </transition>
        </div>
    </div>

    <transition appear enter-active-class="delay-500 transform duration-500 ease-out" enter-from-class="translate-y-full opacity-0">
        <div><Footer/></div>
    </transition>
</template>

<script setup>
import Footer from '@/components/Footer'
import { computed, onMounted, ref, watchEffect } from "vue";
import { formatPrice, pluralize } from "@/functions";
import { store } from "@/store";
import { useRouter } from "vue-router";

const products = ref([])
const productAmount = ref(0)
const total = ref(0)

const router = useRouter()

const pluralizedGoods = computed(() => {
    return pluralize(productAmount.value)
})

const removeProduct = (id) => {
    products.value = products.value.filter(product => product.id !== id)

    localStorage.setItem("cart", JSON.stringify(products.value))
}

const increase = (id) => {
    let product = products.value.find(p => p.id === id)

    products.value.map(p => {
        if (p.id === product.id && p.amount < 99) p.amount++
    })

    localStorage.setItem("cart", JSON.stringify(products.value))
}

const decrease = (id) => {
    let product = products.value.find(p => p.id === id)

    products.value.map(p => {
        if (p.id === product.id && p.amount > 1) p.amount--
    })

    localStorage.setItem("cart", JSON.stringify(products.value))
}

watchEffect(() => {
    productAmount.value = products.value.reduce((acc, v) => {
        return acc + v.amount
    }, 0)

    store.dispatch('setCart', { amount: productAmount.value, price: total.value })
})

watchEffect(() => {
    total.value = products.value.reduce((acc, v) => {
        return acc + v.price * v.amount
    }, 0)

    store.dispatch('setCart', { amount: productAmount.value, price: total.value })
})

onMounted(() => {
    products.value = JSON.parse(localStorage.getItem("cart")) || []
    productAmount.value = products.value.length || 0
})
</script>

<style scoped>

</style>
