<template>
    сотрудники
    заказы
    продукты
    сайт
    <Orders/>
    <button @click="handleSubmit">Выйти</button>
</template>

<script setup>
import { ref } from "vue";
import { useRouter } from "vue-router"
import useAuth from "@/composables/useAuth";
import Orders from "@/components/Orders";

const error = ref('')

const router = useRouter()
const { logout } = useAuth()

const handleSubmit = async () => {
    await logout()
            .then(() => router.push({ name: 'Login' }))
            .catch(err => console.log(err))
}
</script>

<style scoped>

</style>
