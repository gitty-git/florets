<template>
    <div class="px-6 m-0 lg:pt-16 pt-6 mb-20 m-auto max-w-screen-xl">
        <div class="font-display -ml-0.5 text-2xl lg:text-4xl">Список заказов</div>

        <div class="flex pt-12 flex-wrap">
            <div class="mr-6 text-gray-400 mb-4 text-sm uppercase cursor-pointer"
                 :class="{'text-mainRed underline' : activeCategory === id }"
                 @click="fetchByStatus(status)"
                 v-for="(status, id) in statuses">
                {{ status }}
            </div>
        </div>

        <div v-if="orders" class="cursor-pointer" v-for="order in computedOrders" @click="showOrderModal(order.id)">
            <table class="table-auto mb-6">
                {{ order.name }}
                {{ order.created_at }}
            </table>
        </div>

        <div v-if="orders" class="flex justify-center items-center">
            <div @click="prevPage"
                 class="h-12 w-12 cursor-pointer duration-150 flex justify-center items-center hover:border-2 border-gray-150 rounded-full">
                <img class="w-2" :src="require(`@/assets/svg/arrow.svg`)" alt="">
            </div>

            <div class="mx-6">
                {{ orders.current_page }}
            </div>

            <div @click="nextPage"
                 class="h-12 w-12 cursor-pointer duration-150 flex justify-center items-center hover:border-2 border-gray-150 rounded-full">
                <img class="w-2 rotate-180" :src="require(`@/assets/svg/arrow.svg`)" alt="">
            </div>
        </div>

        <OrderModal @modalHidden="showOrderModal" :modalHidden="modalHidden" v-if="!modalHidden" :orderId="orderId"/>
    </div>
</template>

<script setup>
import { computed, onMounted, ref } from "vue";
import axios from "axios";
import { useStore } from "vuex";
import OrderModal from "@/components/OrderModal"

const store = useStore()

const orders = ref(null)
const user = ref(null)
const orderId = ref(null)
const modalHidden = ref(true)
const activeCategory = ref('all')
const total = ref(0)
const statuses = ref({
    all: "Все",
    created: "Новые",
    processed: "Обработанные",
    sent: "Отправленные",
    received: "Полученные",
})
// const statuses = ref(["Все", "Новые", "Обработанные", "Отправленные", "Полученные"])

const fetchByStatus = async (status) => {
    for (const key in statuses.value) {
        if (status === statuses.value[key]) {
            status = key
        }
    }

    let res = await axios.get(`api/orders/${status}`)
    orders.value = res.data
    activeCategory.value = status
}

const computedOrders = computed(() => {
    orders.value.data.map(order => {
        let date = new Date(order.created_at)
        order.created_at = `${date.getDate()}.${date.getMonth()} | ${date.getHours()}:${date.getMinutes()}`
    })
    return orders.value.data
})

const showOrderModal = (id) => {
    modalHidden.value = !modalHidden.value
    orderId.value = id
}

// const computedOrders = () => {
//
// }

const nextPage = async () => {
    let res = await axios.get(orders.value.next_page_url)
    orders.value = res.data
}

const prevPage = async () => {
    let res = await axios.get(orders.value.prev_page_url)
    orders.value = res.data
}

onMounted(async () => {
    let res = await axios.get(`api/orders/all`)
    orders.value = res.data

    user.value = store.getters.getUser

    // orders.value.map(order => {
    //     console.log(order)
    //     // let total = order.value.reduce((acc, v) => {
    //     //     return acc + v.item.price * v.amount
    //     // }, 0)
    // })
    // total.value =
})
</script>

<style scoped>

</style>
