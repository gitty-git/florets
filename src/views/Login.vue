<template>
    <div class="max-w-screen-xl m-0 m-auto">
        <div class="m-6 pt-6">
            <div class="font-display -ml-0.5 text-2xl lg:text-4xl">Войти как администратор или сотрудник</div>

            <div class="w-full py-32 flex flex-col items-center">
                <div class="flex flex-col mt-6">
                    <label class="w-full justify-start">Почта:</label>
                    <input class="input w-96" type="text" v-model="email">
                </div>

                <div class="flex flex-col mt-6">
                    <label class="w-full justify-start">Пароль:</label>
                    <input class="input w-96" type="text" v-model="password">
                </div>

                <div class="text-xs text-mainRed mt-2">{{ error }}</div>

                <div class="btn mt-16" @click="handleSubmit">Войти</div>
            </div>
        </div>
    </div>
</template>

<script setup>
import { ref } from 'vue'
import useLogin from "@/composables/useLogin";

const email = ref('')
const password = ref('')
const name = ref('')

const { error, login } = useLogin()

const handleSubmit = async () => {
    await login(email.value, password.value)
}
</script>

<style scoped>

</style>
