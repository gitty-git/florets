<template>
    <!-- Баннер -->
    <transition appear enter-active-class="transform duration-1000 ease-out" enter-from-class="opacity-0">
        <div class="z-10 w-full relative flex items-center">
            <img class="object-cover w-full h-128 sm:h-160" :src="require(`@/assets/images/banner3.jpg`)" alt="">

            <div class="w-full absolute flex justify-center">
                <div class="max-w-screen-xl">
                    <div class="px-6 w-full pt-8 flex flex-col items-center">
                        <h1 class="font-display text-center text-white uppercase font-black lg:-ml-1.5 leading-snug text-3xl sm:text-6xl">
                            Доставка цветов в Челябинске
                        </h1>

                        <div class="mt-6 mb-4">
                            <svg width="80" height="54" viewBox="0 0 43 27" class="fill-white"
                                 xmlns="http://www.w3.org/2000/svg">
                                <path class="fill-white" fill-rule="evenodd" clip-rule="evenodd"
                                      d="M30.3854 12.8158C30.3981 12.7197 30.3306 12.6315 30.2346 12.6188C25.4653 11.9851 12.8194 11.427 0.326099 14.2559C0.231606 14.2773 0.172348 14.3712 0.193744 14.4657C0.215141 14.5602 0.309089 14.6195 0.403582 14.5981C12.8476 11.7803 25.4504 12.337 30.1884 12.9666C30.2844 12.9793 30.3726 12.9118 30.3854 12.8158Z"
                                      fill="#F7A9B4"/>
                                <path class="fill-white"
                                      d="M42.4539 13.0258C34.9266 10.7004 29.8306 12.1333 27.9052 12.5818C29.7488 14.6491 34.8179 15.2026 38.8625 14.8371C44.1014 14.021 43.003 13.3732 42.4539 13.0258Z"
                                      fill="#F7A9B4"/>
                                <path class="fill-white"
                                      d="M28.9649 17.1626C27.1107 12.6967 22.9203 12.2374 21.5974 12.2357C22.1237 14.6234 24.4168 16.4686 26.9037 17.3231C28.8363 17.8347 29.2012 17.6173 28.9649 17.1626Z"
                                      fill="#F7A9B4"/>
                                <path class="fill-white"
                                      d="M34.2407 8.63133C26.397 8.36655 23.6 10.8237 22.081 12.0854C24.6666 13.1026 29.4256 12.5475 32.9877 10.7175C35.6293 9.19847 34.8892 8.69518 34.2407 8.63133Z"
                                      fill="#F7A9B4"/>
                                <path class="fill-white"
                                      d="M17.9172 8.51987C14.1343 10.2959 11.363 12.3606 11.7272 13.1314C12.4765 12.9246 15.4532 13.0874 19.2361 11.3114C23.0189 9.5353 25.306 7.43393 25.2052 6.567C24.6851 6.0984 21.7 6.74382 17.9172 8.51987Z"
                                      fill="#F7A9B4"/>
                            </svg>
                        </div>

                        <div class="lg:text-md sm:w-1/2 w-2/3 text-center font-serif leading-relaxed text-white">
                            Мы знаем, что дарить так же приятно, как и получать.
                        </div>

                        <router-link
                                :to="{name: 'Home', params: { hash: '#bouquets' }}"
                                class="relative mt-12 rounded-full bg-gradient-to-r absolute from-mainRed-400 to-pink-500 px-6 py-3 text-white uppercase hover:bg-red-100 duration-150 text-sm"
                        >
                            Выбрать букет
                            <div class="bg-white w-full h-full top-0 left-0 rounded-full opacity-0 hover:opacity-10 duration-150 absolute"></div>
                        </router-link>
                    </div>
                </div>
            </div>
        </div>
    </transition>

    <!-- Букеты -->
    <transition appear enter-active-class="transform duration-700 ease-out" enter-from-class="opacity-0">
        <div id="bouquets">
            <div v-if="products" class="pt-16 pb-24 flex justify-center">
                <div class="lg:max-w-screen-xl px-6 w-full">
                    <div class="mb-10">
                        <div class="font-medium mb-1 text-2xl uppercase">
                            Букеты
                        </div>
                        <div class="text-sm text-gray-500">
                            Выберете подходящий букет
                        </div>
                    </div>

                    <!--            <div class="uppercase mb-6 flex md:justify-start justify-between md:px-0 px-6 text-xs">-->
                    <!--                <div class="text-mainRed md:mr-12 cursor-pointer border-b border-mainRed">Все</div>-->
                    <!--                <div class="md:mr-12 cursor-pointer">Большие</div>-->
                    <!--                <div class="md:mr-12 cursor-pointer">Средние</div>-->
                    <!--                <div class="md:mr-12 cursor-pointer">Маленькие</div>-->
                    <!--            </div>-->

                    <div class="lg:grid-cols-4 md:grid-cols-2 grid gap-12 lg:px-0 px-12 justify-center">
                        <div v-for="product in products" :key="product.id">
                            <router-link v-if="product.id" :to="{ name: 'Product', params: {id: product.id} }">
                                <Card :product="product"/>
                            </router-link>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </transition>

    <!-- О нас -->
    <transition appear enter-active-class="transition transform duration-500 ease-out" enter-from-class="opacity-0">
        <div id="about" class="bg-gradient-to-b flex justify-center from-gray-100 shadow-inner shadow-gray-200 pt-16 mb-24">
            <div class="max-w-screen-xl px-6 m-auto">
                <div class="mb-10">
                    <div class="font-medium mb-1 text-2xl uppercase">
                        О нас
                    </div>

                    <div class="text-sm text-gray-500">
                        Инфрмация об этом интернет-магазине
                    </div>
                </div>

                <div class="sm:flex">
                    <div class="sm:w-1/3 font-bold font-display text-6xl -ml-1.5 mb-6 -mt-2 text-mainRed">Кто мы?</div>

                    <div class="sm:w-2/3 font-serif text-gray-500 sm:text-xl">
                        <div class="leading-loose">
                            <span class="font-bold">Florets </span>(/ ˈflɒrɪts / - ударение на “о”) - это красиво, идеально рассчитано по времени и доставлено с учетом каждой мелочи. Мы поможем вам поделиться чем-то реальным с людьми, которые вам небезразличны. Наши флористы гарантируют, что всякий раз, заказывая букет у Florets, вы и ваши близкие получете созданный с любовью праздник естественной красоты.
                        </div>

                        <ul class="leading-loose mt-9">
                            <li class="mt-3">
                                <span class="sm:-ml-5 sm:mt-4.5 mt-3.5 w-1.5 h-1.5 rounded-full bg-mainRed opacity-60 absolute"></span>
                                <span class="sm:ml-0 ml-4">Мы гарантируем, что все наши цветы будут свежими не менее трех дней.</span>
                            </li>

                            <li class="mt-3">
                                <span class="sm:-ml-5 sm:mt-4.5 mt-3.5 w-1.5 h-1.5 rounded-full bg-mainRed opacity-60 absolute"></span>
                                <span class="sm:ml-0 ml-4">Каждый букет создается опытным флористом.</span>
                            </li>

                            <li class="mt-3">
                                <span class="sm:-ml-5 sm:mt-4.5 mt-3.5 w-1.5 h-1.5 rounded-full bg-mainRed opacity-60 absolute"></span>
                                <span class="sm:ml-0 ml-4">Бесплатная доставка в любую точку города Челябинска.</span>
                            </li>
                        </ul>
                    </div>
                </div>
            </div>
        </div>
    </transition>

    <!-- Footer -->
    <transition appear enter-active-class="delay-500 transform duration-500 ease-out" enter-from-class="opacity-0">
        <div><Footer/></div>
    </transition>
</template>

<script setup>
import Footer from '@/components/Footer'
import Card from "@/components/Card";
import { onMounted, ref } from "vue";
import axios from 'axios'

const products = ref([])

const nextPage = async () => {
    if (products.value.next_page_url) {
        let res = await axios.get(products.value.next_page_url)
        products.value = res.data
    }
}

const prevPage = async () => {
    if (products.value.prev_page_url) {
        let res = await axios.get(products.value.prev_page_url)
        products.value = res.data
    }
}

onMounted(async () => {
    // await axios.get('/sanctum/csrf-cookie');
    // await axios.post('/api/products')
    //         .then(res => console.log(res))
    //         .catch(err => console.log(err));
    // https://florets.store/laravel
    // await axios.get('/sanctum/csrf-cookie')
    await axios
            .get('/api/products')
            .then(response => {
                // console.log(typeof response.data)
                products.value = response.data
            })
})

const index = ref(products)
</script>
<style>
</style>
