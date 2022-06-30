<template>
    <div class="w-full flex flex-col items-center">
        <img class="mb-4 rounded-md cursor-pointer hover:scale-102 duration-300" :src="require(`@/assets/images/${img}`)" alt="">
        <div class="uppercase mb-1">{{ name }}</div>
        <div class="font-light text-gray-500">{{ price }}</div>
    </div>
</template>

<script setup>
const props = defineProps(['img', 'price', 'name'])
</script>

<style scoped>

</style>
