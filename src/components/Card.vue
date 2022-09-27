<template>
    <div  class="w-full flex flex-col items-center">
        <img @load="$emit('imgLoaded', true)" class="mb-4 rounded cursor-pointer hover:scale-102 duration-300" :src="product.main_image" alt="">
        <div class="uppercase mb-1">{{ product.name }}</div>
        <div class="font-light text-gray-500">{{ formattedPrice }} ₽</div>
    </div>
</template>

<script setup>
import { computed, onMounted, ref } from "vue";
import { formatPrice } from "@/functions";

const loaded = ref(null)
const props = defineProps(['product'])

const formattedPrice = computed(() => formatPrice(props.product.price))
</script>

<style scoped>

</style>
