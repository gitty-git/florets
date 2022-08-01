<template>
    <div class="max-w-screen-xl m-0 m-auto">
        <div class="m-6 pt-6">
            <div class="font-display -ml-0.5 text-2xl lg:text-4xl">Создать нового сотрудника</div>

            <div class="w-full py-32 flex flex-col items-center">
                <div class="flex flex-col">
                    <label class="w-full justify-start">Имя:</label>
                    <input class="input w-96" type="text" v-model="name">
                </div>

                <div class="flex flex-col mt-6">
                    <label class="w-full justify-start">Почта:</label>
                    <input class="input w-96" type="text" v-model="email">
                </div>

                <div class="flex flex-col mt-6">
                    <label class="w-full justify-start">Пароль:</label>
                    <input class="input w-96" type="text" v-model="password">
                </div>

                <div class="text-xs text-mainRed mt-2">{{ error }}</div>

                <div class="btn mt-16" @click="handleSubmit">Создать</div>
            </div>
        </div>
    </div>
</template>

<script setup>
import { ref } from 'vue'
import useRegister from "@/composables/useRegister";

const email = ref('')
const password = ref('')
const name = ref('')

const { error, register } = useRegister()

const handleSubmit = async () => {
    await register(email.value, password.value)
}
</script>

<style scoped>

</style>
