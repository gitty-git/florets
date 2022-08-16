<template>
    <div v-if="order" class="px-6 m-0 lg:pt-16 pt-6 mb-20 m-auto max-w-screen-xl">
        <div class="font-display -ml-0.5 text-2xl lg:text-4xl">Заказ {{ order.id }}</div>
        <div>{{ order.name }}</div>
        <div>{{ order.date }}</div>
        <div>{{ order.created_at }}</div>
        <div>{{ order.address }}</div>
        <div>{{ order.status }}</div>
        <div>{{ order.time }}</div>
        <div>{{ order.cart }}</div>
    </div>
</template>

<script setup>
import { onMounted, ref } from "vue";
import axios from "axios";
import { useRoute } from "vue-router";

const route = useRoute()

const order = ref(null)

onMounted(async () => {
    // await axios.get('/sanctum/csrf-cookie')
    let res = await axios.get(`api/orders/${route.params.id}`)
    order.value = res.data
    // console.log(route.params.id)
})
</script>

<style scoped>

</style>
