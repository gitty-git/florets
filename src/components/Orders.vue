<template>
    <div v-if="orders" v-for="order in orders.data" :key="order.id">
        {{ order.name }}
    </div>
</template>

<script setup>
import { onMounted, ref } from "vue";
import axios from "axios";

const orders = ref(null)

onMounted(async () => {
    orders.value = await axios.get('api/orders')
    console.log(orders.value.data)
})
</script>

<style scoped>

</style>
