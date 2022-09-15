<template>
    <div v-if="orderId" class="px-6 m-0 my-80 m-auto max-w-screen-xl">
        <div class="text-5xl sm:text-6xl font-display mb-6">
            {{ name }}, спасибо за Ваш заказ!
        </div>
        <div class="text-gray-400 sm:text-lg">
            Ваш заказ <span class="font-medium uppercase">{{ orderId }}</span> создан. Скоро мы с Вами свяжемся по номеру
            <span class="font-medium uppercase">{{ phone }}</span> для его подтвержденя.
        </div>
    </div>
</template>

<script setup>
defineProps(['orderId', 'name', 'phone'])
</script>

<style scoped>

</style>
