<template>
    <div class="w-full items-center flex flex-col">
        <div class="px-6 pt-16 pb-20 w-full max-w-screen-xl">
            <div class="flex -ml-0.5 sm:items-center flex-col sm:flex-row">
                <div class="sm:mr-6 font-display text-2xl sm:text-4xl">
                    Список заказов
                </div>
                <div class="mt-3 mb-6 sm:m-0">
                    <div @click="reload" v-if="!reloading"
                         class="w-fit sm:-mt-4 absolute text-sm cursor-pointer px-3 py-2 rounded border-gray-150 border-2">
                        Обновить
                    </div>
                    <div v-else class="w-fit sm:-mt-4 text-gray-400 absolute text-sm cursor-pointer px-3.5 py-2.5">
                        Загрузка...
                    </div>
                </div>
            </div>


            <div class="flex pt-12 flex-wrap" v-if="orders && computedOrders.length > 0">
                <div class="mr-6 text-gray-400 mb-4 text-sm uppercase cursor-pointer"
                     :class="{'text-mainRed underline' : activeCategory === status.eng }"
                     @click="fetchByStatus(status, id)"
                     v-for="(status, id) in categoryStatus">
                    {{ status.ru }}
                </div>
            </div>

            <!-- list -->
            <div class="my-6" v-if="orders && computedOrders.length > 0">
                <div class="flex text-gray-400 uppercase text-xs w-full mb-3">
                    <div class="w-1/2 mr-4">Имя</div>
                    <div class="w-1/4 mx-2">Создан</div>
                    <div class="w-1/4 mx-2">Статус</div>
                </div>

                <div v-if="orders" class="cursor-pointer sm:text-base text-sm border-gray-150 border-t-2 flex py-6"
                     v-for="order in computedOrders" @click="showOrderModal(order.id)"
                >
                    <div class="w-1/2 mr-2">
                        {{ order.name }}
                    </div>
                    <div class="w-1/4 mr-2">
                        {{ order.created_at }}
                    </div>
                    <div class="w-1/4">
                        {{ translateStatuses(order.status).ru }}
                    </div>
                </div>
            </div>

            <!-- pagination -->
            <div v-if="orders && computedOrders.length > 0" class="flex justify-center items-center">
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

            <div v-else class="mt-12 text-gray-400">Нет заказов...</div>

            <OrderModal @modalHidden="showOrderModal" @order="updateOrders" :modalHidden="modalHidden"
                        v-if="!modalHidden" :orderId="orderId"/>

            <!-- Footer -->

        </div>
        <Footer/>
    </div>
</template>

<script setup>
import Footer from '@/components/Footer'
import { computed, onMounted, ref } from "vue";
import axios from "axios";
import OrderModal from "@/components/OrderModal"
import { translateStatuses } from "@/functions";

const orders = ref(null)
const user = ref(null)
const orderId = ref(null)
const modalHidden = ref(true)
const activeCategory = ref('created')
const total = ref(0)
const rawStatuses = ref(["created", "processed", "sent", "received", "canceled",])
const reloading = ref(false)

const categoryStatus = ref([])

const updateOrders = (order) => {
    let foundOrder = orders.value.data.find(o => o.id === order.id)
    foundOrder.status = order.status
    foundOrder.name = order.name
}

const fetchByStatus = async (status) => {
    let res = await axios.get(`api/orders/${status.eng}`)
    orders.value = res.data
    activeCategory.value = status.eng
}

const computedOrders = computed(() => {
    orders.value.data.map(order => {
        let date = new Date(order.created_at)
        order.created_at = `${date.getDate()}/${date.getMonth()} ${date.getHours()}:${date.getMinutes()}`
    })

    return orders.value.data
})

const showOrderModal = (id) => {
    modalHidden.value = !modalHidden.value
    orderId.value = id
}

const nextPage = async () => {
    if (orders.value.next_page_url) {
        let res = await axios.get(orders.value.next_page_url)
        orders.value = res.data
    }
}

const prevPage = async () => {
    if (orders.value.prev_page_url) {
        let res = await axios.get(orders.value.prev_page_url)
        orders.value = res.data
    }
}

const reload = async () => {
    reloading.value = true
    await axios.get(`api/orders/${activeCategory.value}`).then(res => {
        orders.value = res.data
        reloading.value = false
    })

}

onMounted(async () => {
    categoryStatus.value = [...translateStatuses(['all', ...rawStatuses.value], true)]

    let res = await axios.get(`api/orders/${activeCategory.value}`)
    orders.value = res.data
})
</script>

<style scoped>

</style>
