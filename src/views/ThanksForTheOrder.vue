<template>
    <div v-if="orderId" class="h-screen w-full relative flex justify-center">
        <div class="absolute max-w-screen-xl w-full top-1/3 px-6">
            <div class="text-5xl sm:text-6xl font-display mb-6">
                {{ name }}, спасибо за Ваш заказ!
            </div>
            <div class="text-gray-400 sm:text-lg">
                Ваш заказ <span class="font-medium uppercase">{{ orderId }}</span> создан. Скоро мы с Вами свяжемся по номеру
                <span class="font-medium uppercase">{{ phone }}</span> для его подтвержденя.
            </div>
        </div>
    </div>

    <!-- Footer -->
    <transition enter-active-class="delay-1000 transform duration-500 ease-out"
                enter-from-class="translate-y-full opacity-0">
        <div>
            <Footer/>
        </div>
    </transition>
</template>

<script setup>
import { onMounted } from "vue";
import { useRouter } from "vue-router";
import Footer from '@/components/Footer'
const router = useRouter()

const props = defineProps(['orderId', 'name', 'phone'])
onMounted(() => {
    if (!props.name) router.push('/')
})
</script>

<style scoped>

</style>
