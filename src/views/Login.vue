<template>
    <div class="max-w-screen-xl pt-16 pb-20 m-0 m-auto">
        <div class="mx-6">
            <div class="font-display -ml-0.5 text-2xl lg:text-4xl">Войти как администратор или сотрудник</div>

            <div class="w-full sm:py-32 py-12 flex flex-col items-center justify-center">
                <div class="flex sm:w-80 w-full flex-col mt-6">
                    <label class="w-full justify-start">Почта:</label>
                    <input class="input w-full" type="text" v-model="email">
                </div>

                <div class="flex sm:w-80 w-full flex-col mt-6">
                    <label class="w-full justify-start">Пароль:</label>
                    <input class="input w-full" type="password" v-model="password">
                </div>

                <div class="text-xs text-mainRed mt-2">{{ error }}</div>

                <div class="btn mt-16" @click="handleSubmit">Войти</div>
            </div>
        </div>
    </div>
</template>

<script setup>
import { onMounted, ref, watchEffect } from 'vue'
import useAuth from "@/composables/useAuth";
import { useRouter } from "vue-router";
import { useStore } from "vuex";

const email = ref('')
const password = ref('')
const name = ref('')

const { error, login, fetchUser } = useAuth()
const router = useRouter()
const store = useStore()

const redirectByRole = (role) => {
    router.push(`/${role}/orders`)
}

const handleSubmit = async () => {
    await login(email.value, password.value).then(res => {
        if (res.status === 200) {
            fetchUser().then(res => {
                store.dispatch('setUser', res.data)
                router.push(`/${res.data.role}/orders`)
            })
        }
    })
}

watchEffect(() => {
    if (store.getters.getUser) {
        router.push(`/${store.getters.getUser.role}/orders`)
    }
})

onMounted(async () => {
    // await fetchUser()
    //         .then(res => {
    //             if (res) {
    //                 redirectByRole(res.data.role)
    //             }
    //
    //         })
    //         .catch(err => {
    //             //
    //         })
    // await store.dispatch('setCart', {amount: cartItems.amount, price: cartItems.price})
})
</script>

<style scoped>

</style>
