<template>
    <div class="mt-6">
        <div class="mb-2 text-sm">{{ header }}</div>
        <input :id="customId" v-model="placeholder" class="border-2 px-3 font-serif border-gray-150 w-full h-12" type="text">
    </div>
</template>

<script setup>
const props = defineProps(['header', 'customId', 'placeholder'])

const placeholder = props.placeholder
</script>

<style scoped>

</style>
