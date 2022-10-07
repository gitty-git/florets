<template>
    <div class="max-w-sm flex flex-col items-center">
        <div class="mb-4 w-full h-full rounded cursor-pointer hover:scale-102 duration-300 relative">
            <img class="w-full h-full" :src="require(`@/assets/images/plug.png`)" alt="">
            <transition appear enter-active-class="transition transform duration-500 ease-out" enter-from-class="opacity-0">
                <img v-show="imgLoaded" @load="imgLoaded = true" class="absolute top-0" :src="product.main_image" alt="">
            </transition>
        </div>

        <div class="uppercase mb-1">{{ product.name }}</div>
        <div class="font-light text-gray-500">{{ formattedPrice }} ₽</div>
    </div>
</template>

<script setup>
import { computed, onMounted, ref } from "vue";
import { formatPrice } from "@/functions";

const loaded = ref(null)
const props = defineProps(['product'])
const imgLoaded = ref(false)

const formattedPrice = computed(() => formatPrice(props.product.price))
</script>

<style scoped>

</style>
