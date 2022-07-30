<template>
    <div class="w-full flex flex-col items-center">
        <img class="mb-4 rounded cursor-pointer hover:scale-102 duration-300" :src="require(`@/assets/images/b-${pic}.png`)" alt="">
        <div class="uppercase mb-1">{{ name }}</div>
        <div class="font-light text-gray-500">{{ formattedPrice }} ₽</div>
    </div>
</template>

<script setup>
import { computed, onMounted, ref } from "vue";
import { formatPrice } from "@/functions";

const props = defineProps(['pic', 'price', 'name'])

const formattedPrice = computed(() => formatPrice(props.price))
</script>

<style scoped>

</style>
