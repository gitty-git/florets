<template>
    <div class="mt-6">
        <div class="mb-2 text-sm">{{ header }}</div>
        <input :id="customId"
               class="border-2 px-3 font-serif border-gray-150 w-full h-12" type="text"
               :value="modelValue"
               @input="$emit('update:modelValue', $event.target.value)"
        >
    </div>
</template>

<script setup>
defineEmits(['update:modelValue'])
defineProps(['header', 'customId', 'placeholder', 'modelValue'])
</script>

<style scoped>

</style>
