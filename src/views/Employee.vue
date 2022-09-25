<template>
    Employee page
</template>

<script setup>
import { useRouter } from "vue-router";
import useAuth from "@/composables/useAuth";

const router = useRouter()

const { user, error, logout } = useAuth()

const handleSubmit = async () => {
    await logout()
            .then(() => router.push({ name: 'Login' }))
            .catch(err => console.log(err))
}
</script>

<style scoped>

</style>
