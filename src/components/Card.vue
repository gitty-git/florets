<template>
    <div class="w-full flex flex-col items-center">
        <img class="mb-4 rounded-md cursor-pointer hover:scale-102 duration-300" :src="require(`@/assets/images/b-${pic}.png`)" alt="">
        <div class="uppercase mb-1">{{ name }}</div>
        <div class="font-light text-gray-500">{{ formattedPrice }} ₽</div>
    </div>
</template>

<script setup>
import { computed, onMounted, ref } from "vue";

const props = defineProps(['pic', 'price', 'name'])

const formattedPrice = computed(() => props.price.toLocaleString().replace(',', ' '))
</script>

<style scoped>

</style>
