<template>
    <div class="mt-6">
        <div class="mb-2 text-sm">{{ header }}</div>
        <input class="border-2 px-3 md:text-xl font-serif border-gray-150 w-full h-12" type="text">
    </div>
</template>

<script setup>
const props = defineProps(['header'])
</script>

<style scoped>

</style>
