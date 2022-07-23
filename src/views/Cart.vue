<template>
    <div class="px-6 m-0 lg:pt-16 pt-6 mb-20 m-auto max-w-screen-xl">
        <div class="font-display text-2xl lg:text-4xl">Корзина</div>

        <!-- list -->
        <div class="mt-12" v-for="product in products" :key="product.id">
            <div class="flex text-xs uppercase text-gray-400 justify-between pb-3 border-b-2 border-gray-150">
                <div class="md:w-2/3 w-4/5 flex justify-between">
                    <div class="w-1/2">Товар</div>
                    <div class="w-1/2">Колличество</div>
                </div>

                <div class="md:w-1/3 w-1/5 flex justify-between">
                    <div class="md:w-1/2 w-full md:justify-start flex justify-end">Цена</div>
                    <div class="md:w-1/2 w-0"></div>
                </div>
            </div>

            <div class="flex py-6 items-center justify-between border-b-2 border-gray-150">
                <div class="md:w-2/3 w-4/5 flex justify-between items-center">
                    <router-link :to="{ name: 'Product', params: {id: product.id} }" class="w-1/2 flex items-start md:items-center md:flex-row flex-col">
                        <div class="visible sm:text-md text-sm md:invisible static mb-4 md:absolute font-serif">{{ product.name }}</div>
                        <img class="md:mb-0 w-24 mr-6" :src="require(`@/assets/images/product-sm.png`)" alt="">
                        <div class="md:visible md:static absolute pr-6 invisible font-serif">Название букета</div>
                    </router-link>

                    <div class="w-1/2 flex md:flex-row flex-col md:items-center">
                        <div class="flex xl:mr-6 md:mr-2 justify-start items-center text-black font-bold">
                            <div class="-ml-6 h-12 w-12 cursor-pointer duration-150 flex justify-center items-center hover:border-2 border-gray-150 rounded-full">
                                <img class="w-2" :src="require(`@/assets/svg/arrow.svg`)" alt="">
                            </div>

                            <div class="mx-4">{{ product.amount }}</div>

                            <div class="h-12 w-12 cursor-pointer duration-150 flex justify-center items-center hover:border-2 border-gray-150 rounded-full">
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

                    <div class="md:w-1/2 w-full flex justify-end">
                        <div class="md:visible invisible md:static absolute p-3 font-medium duration-150 cursor-pointer hover:bg-mainRed hover:text-white flex px-6 text-xs text-mainRed uppercase border-opacity-20 rounded-full border-mainRed inline border">
                            <div class="mt-0.5">Удалить</div>
                        </div>

                        <div class="visible mt-1 text-xl text-mainRed flex justify-center items-center p-2 -mr-2 md:invisible static md:absolute">
                            &#9587;
                        </div>
                    </div>
                </div>
            </div>
        </div>

        <div class="flex justify-end md:mt-12 mt-6 md:text-2xl">
            <span class="text-gray-400">Итого:
            </span>&nbsp;<span class="font-medium">{{ productsLength }}</span>
            &nbsp;{{ pluralized }} на сумму&nbsp;
            <span class="font-medium">10 500</span>&nbsp;₽.
        </div>

        <!-- btn -->
        <div class="w-full flex mt-16 justify-center">
            <router-link :to="{ name: 'Order' }">
                <div class="btn text-sm">Перейти к оформлению</div>
            </router-link>
        </div>
    </div>
</template>

<script setup>
import { computed, onMounted, ref } from "vue";
import { formatPrice } from "@/functions";

const products = ref(null)
const productsLength = ref(null)

const pluralized = computed(() => {
    if (/^[2-9]1|1$/.test(productsLength.value)) return 'товар'
    else return 'товаров'
})

onMounted(() => {
    products.value = JSON.parse(localStorage.getItem("cart"))
    productsLength.value = products.value.length
    // productsLength.value = products.value.length
    // console.log(products.value.length)
})
</script>

<style scoped>

</style>
