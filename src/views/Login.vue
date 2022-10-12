<template>
    <div class="pt-16 pb-20 flex justify-center w-full">
        <div class="mx-6 max-w-screen-xl">
            <div class="font-display -ml-1.5 text-2xl lg:text-4xl">Войти как администратор или сотрудник</div>

            <div class="w-full sm:py-32 py-12 flex flex-col items-center justify-center">
                <div class="flex sm:w-80 w-full flex-col mt-6">
                    <label class="w-full justify-start">Почта:</label>
                    <input class="input w-full" type="text" v-model="email">
                </div>

                <div class="flex sm:w-80 w-full flex-col mt-6">
                    <label class="w-full justify-start">Пароль:</label>
                    <input class="input w-full" type="password" v-model="password">
                </div>

                <div v-if="error" class="text-xs text-mainRed mt-2">{{ error }}</div>
                <div v-else-if="err" class="text-xs text-mainRed mt-2">{{ err }}</div>

                <div v-show="loading" class="mt-16 py-12 px-12 flex justify-center items-center">
                    <svg class="animate-spin" width="24" height="24" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path d="M8 16C6.41775 16 4.87103 15.5308 3.55544 14.6518C2.23984 13.7727 1.21446 12.5233 0.608964 11.0615C0.00346254 9.59966 -0.154964 7.99112 0.153718 6.43928C0.4624 4.88743 1.22433 3.46197 2.34315 2.34315C3.46197 1.22433 4.88743 0.462399 6.43928 0.153718C7.99113 -0.154964 9.59966 0.00346288 11.0615 0.608964C12.5233 1.21447 13.7727 2.23985 14.6518 3.55544C15.5308 4.87103 16 6.41775 16 8L14.2821 8C14.2821 6.75751 13.9137 5.54293 13.2234 4.50983C12.5331 3.47674 11.552 2.67154 10.4041 2.19606C9.25616 1.72058 7.99303 1.59618 6.77442 1.83857C5.5558 2.08097 4.43643 2.67929 3.55786 3.55786C2.67929 4.43643 2.08097 5.5558 1.83858 6.77442C1.59618 7.99303 1.72058 9.25616 2.19606 10.4041C2.67154 11.552 3.47674 12.5331 4.50983 13.2234C5.54292 13.9137 6.75751 14.2821 8 14.2821L8 16Z" fill="#747474"/>
                    </svg>
                </div>
                <div v-show="!loading" class="btn mt-16" @click="handleSubmit">Войти</div>
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
const loading = ref(false)
const err = ref('')

const { error, login, fetchUser } = useAuth()
const router = useRouter()
const store = useStore()

const handleSubmit = async () => {
    if (!password.value.length && !name.value.length) {
        err.value = 'Введите имя и пароль'
        return
    }
    else err.value = ''
    loading.value = true
    await login(email.value, password.value).then(res => {
        if (res && res.status === 200) {
            fetchUser().then(res => {
                store.dispatch('setUser', res.data)
                router.push(`/${res.data.role}/orders`)
            })
        }
        loading.value = false
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
