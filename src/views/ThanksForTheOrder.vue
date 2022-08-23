<template>
    <div v-if="orderId" class="px-6 m-0 my-80 m-auto max-w-screen-xl">
        <div class="text-6xl font-display mb-12">
            {{ name }}, спасибо за Ваш заказ!
        </div>
        <div class="text-gray-400 text-xl">
            Ваш заказ {{ orderId }} создан. Скоро мы с Вами свяжемся по номеру {{ phone }} для его подтвержденя.
        </div>
    </div>
</template>

<script setup>
defineProps(['orderId', 'name', 'phone'])
</script>

<style scoped>

</style>
