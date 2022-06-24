<template>
    <div class="w-1/3 flex flex-col items-center">
        <img :src="require(`@/assets/images/${img}`)" alt="">
        <div>{{ name }}</div>
        <div>{{ price }}</div>
    </div>
</template>

<script setup>
const props = defineProps(['img', 'price', 'name'])
</script>

<style scoped>

</style>
