<template>
    <div v-if="!modalHidden" class="left-0 flex justify-center items-center w-full h-full">
        <div v-if="order" class="z-40 pb-6 bg-white w-full fixed section overflow-y-scroll sm:left-auto bottom-10 left-0 top-10 xl:w-2/3 md:w-5/6 2xl:w-1/2 bg-white">
            <div class="w-full flex justify-end">
                <div @click="$emit('modalHidden')" class="cursor-pointer p-6">&#9587;</div>
            </div>

            <div class="sm:px-12 px-3 pb-12 ">
                <OrderData @emitOrder="updateOrder" :order="order"/>

                <!-- list -->
                <div class="mt-12 w-full" v-if="cart">
                    <div class="flex text-xs uppercase text-gray-400 justify-between pb-3 border-b-2 border-gray-150">
                        <div class="md:w-2/3 w-4/5 flex justify-between">
                            <div class="w-1/2">Товар</div>
                            <div class="w-1/2">Количество</div>
                        </div>

                        <div class="md:w-1/3 w-1/5 flex justify-between">
                            <div class="md:w-1/2 w-full md:justify-start flex justify-end">Цена</div>
                            <div class="md:w-1/2 w-0"></div>
                        </div>
                    </div>

                    <div v-for="data in cart">
                        <div v-if="data.found" class="flex py-6 items-center justify-between border-b-2 border-gray-150">
                            <div class="md:w-2/3 w-4/5 flex justify-between items-center">
                                <a target="_blank" :href="`/products/${data.id}`"
                                             class="w-1/2 flex items-start lg:items-center lg:flex-row flex-col"
                                >
                                    <div class="visible lg:invisible mb-4 absolute uppercase text-sm">{{ data.name }}</div>
                                    <img class="lg:mb-0 w-12 mr-6 lg:mt-0 mt-10" :src="data.main_image" alt="">
                                    <div class="lg:visible lg:static absolute pr-6 invisible uppercase text-sm">{{ data.name }}</div>
                                </a>

                                <div class="w-1/2 flex lg:flex-row flex-col lg:items-center">
                                    <div class="flex xl:mr-6 lg:mr-2 justify-start items-center text-black font-bold">
                                        <div @click="decrease(data.id)" class="-ml-6 h-12 w-12 cursor-pointer duration-150 flex justify-center items-center hover:border-2 border-gray-150 rounded-full">
                                            <img class="w-2" :src="require(`@/assets/svg/arrow.svg`)" alt="">
                                        </div>

                                        <div class="mx-4">{{ data.amount }}</div>

                                        <div @click="increase(data.id)" class="h-12 w-12 cursor-pointer duration-150 flex justify-center items-center hover:border-2 border-gray-150 rounded-full">
                                            <img class="w-2 rotate-180" :src="require(`@/assets/svg/arrow.svg`)" alt="">
                                        </div>
                                    </div>

                                    <div class="text-xs lg:ml-0 ml-2.5 text-gray-400">{{ formatPrice(data.price) }} / шт.</div>
                                </div>
                            </div>

                            <div class="md:w-1/3 w-1/5 md:mt-0 mt-6 flex flex-wrap justify-between items-center">
                                <div class="md:w-1/2 w-full md:mb-0 mb-4 flex md:justify-start justify-end font-medium">
                                    {{ formatPrice(data.price * data.amount) }} ₽
                                </div>

                                <div @click="removeProduct(data.id)" class="md:w-1/2 w-full flex justify-end">
                                    <div class="lg:visible invisible md:static absolute p-3 font-medium duration-150 cursor-pointer hover:bg-mainRed hover:text-white flex px-6 text-xs text-mainRed uppercase border-opacity-20 rounded-full border-mainRed inline border">
                                        <div class="mt-0.5">Удалить</div>
                                    </div>

                                    <div class="font-bold visible mt-1 text-xl text-mainRed flex justify-center items-center p-2 -mr-2 lg:invisible static lg:absolute">
                                        &#9587;
                                    </div>
                                </div>
                            </div>
                        </div>

                        <div v-else class="flex text-mainRed py-6 items-center justify-between border-b-2 border-gray-150">
                            Товар "{{ data.name }} - {{ data.size }} см" не найден
                        </div>
                    </div>

                    <AddProductModal :cart="cart" @addProduct="addProduct"/>

                </div>

                <div class="flex justify-end my-6 text-xl font-medium">Итого: {{ formatPrice(total) }} ₽</div>

                <div class="my-3 text-sm font-medium flex-wrap">Статус заказа:</div>
                <div class="uppercase mb-6 w-full pb-6 flex text-sm flex-wrap">
                    <div :class="{'border-b text-mainRed border-mainRed' : status.eng === order.status}"
                         class="mr-6 mb-3 cursor-pointer text-gray-400"
                         v-for="status in translatedStatuses" @click="changeStatus(status)">
                        {{ status.ru }}
                    </div>
                </div>

<!--                <div class="flex pt-12 flex-wrap" v-if="orders && computedOrders.length > 0">-->
<!--                    <div class="mr-6 text-gray-400 mb-4 text-sm uppercase cursor-pointer"-->
<!--                         :class="{'text-mainRed underline' : activeCategory === status.eng }"-->
<!--                         @click="fetchByStatus(status, id)"-->
<!--                         v-for="(status, id) in categoryStatus">-->
<!--                        {{ status.ru }}-->
<!--                    </div>-->
<!--                </div>-->

                <div class="w-full flex justify-center text-mainRed text-sm">{{ error.message }}</div>

                <div class="w-full py-3 justify-center flex">
                    <div v-show="loading" class="py-6 px-12">
                        <svg class="animate-spin" width="24" height="24" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <path d="M8 16C6.41775 16 4.87103 15.5308 3.55544 14.6518C2.23984 13.7727 1.21446 12.5233 0.608964 11.0615C0.00346254 9.59966 -0.154964 7.99112 0.153718 6.43928C0.4624 4.88743 1.22433 3.46197 2.34315 2.34315C3.46197 1.22433 4.88743 0.462399 6.43928 0.153718C7.99113 -0.154964 9.59966 0.00346288 11.0615 0.608964C12.5233 1.21447 13.7727 2.23985 14.6518 3.55544C15.5308 4.87103 16 6.41775 16 8L14.2821 8C14.2821 6.75751 13.9137 5.54293 13.2234 4.50983C12.5331 3.47674 11.552 2.67154 10.4041 2.19606C9.25616 1.72058 7.99303 1.59618 6.77442 1.83857C5.5558 2.08097 4.43643 2.67929 3.55786 3.55786C2.67929 4.43643 2.08097 5.5558 1.83858 6.77442C1.59618 7.99303 1.72058 9.25616 2.19606 10.4041C2.67154 11.552 3.47674 12.5331 4.50983 13.2234C5.54292 13.9137 6.75751 14.2821 8 14.2821L8 16Z" fill="#747474"/>
                        </svg>
                    </div>
                    <div v-show="!loading" class="btn text-sm" @click="save">
                        <div>Сохранить изменения</div>
                    </div>
                </div>
            </div>
        </div>

        <div class="left-0 top-0 z-30 fixed w-full h-screen bg-black opacity-25"
             @click="$emit('modalHidden')">
        </div>
    </div>
</template>

<script setup>
import { computed, onMounted, ref, watchEffect } from "vue";
import axios from "axios";
import { formatPrice, pluralize, translateStatuses } from "@/functions";
import OrderData from "@/components/OrderData"
import AddProductModal from "@/components/ProductSearchList"

const props = defineProps(['orderId', 'modalHidden'])
const emits = defineEmits(['modalHidden', 'order'])

const order = ref(null)
const total = ref(0)
const showed = ref({})
const cart = ref([])
const rawStatuses = ref([
    'created', 'processed', 'sent', 'received', 'canceled'
])
const loading = ref(false)

let cachedOrder = {}

const productName = ref('')
const error = ref({})

const updateOrder = (emittedOrder) => {
    order.value = emittedOrder
}

const addProduct = (product) => {
    product = {...product, found: true, amount: 1}

    let cond = cart.value.find(item => {
        return item.id === product.id
    })
    if (!cond) {
        cart.value.push(product)
    }
    else error.value.itemId = product.id
}

const removeProduct = (id) => {
    cart.value = cart.value.filter(item => item.id !== id)
}

const increase = (id) => {
    let product = cart.value.find(p => p.id === id)

    cart.value.map(p => {
        if (p.id === product.id && p.amount < 99) p.amount++
    })
}

const decrease = (id) => {
    let product = cart.value.find(p => p.id === id)

    cart.value.map(p => {
        if (p.id === product.id && p.amount > 1) p.amount--
    })
}

const changeStatus = (status) => {
    cachedOrder.status = order.value.status
    order.value.status = status.eng
}

const save = async () => {
    order.value.cart = JSON.stringify(cart.value)

    if (!order.value.name || !order.value.phone || !order.value.address) {
        error.value.message = `Поля "Имя", "Телефон" и "Адрес" обязательны для заполнения`
    }
    loading.value = true
    await axios.put(`api/orders/${order.value.id}`, order.value)
            .then(res => {
                loading.value = false
                emits('modalHidden', false)
                emits('order', order.value)
            })
            .catch(err => console.log(err))

}

const translatedStatuses = computed(() => {
    return translateStatuses(rawStatuses.value)
})

const checkIfProductExists = async (item) => {
    let arr = []
    for (let i = 0; i < item.length; i++) {
        // get item from db by cart item
        await axios.get(`api/products/${item[i].id}`)
                .then(res => {
                    // cart item === response item
                    if (res.status === 200 && res.data.length > 0 && res.data[0].id === item[i].id) {
                        arr.push({ ...res.data[0], amount: item[i].amount, found: true })
                    }
                    else arr[i] = { ...item[i], found: false }
                })
    }
    return arr
}

const calcTotal = (cart) => {
    return cart.reduce((acc, v) => {
        if (v.found) {
            return acc + v.price * v.amount
        }
        else return 0
    }, 0)
}

watchEffect(() => {
    total.value = calcTotal(cart.value)
})

onMounted(async () => {
    if (props.orderId) {
        let res = await axios.get(`api/order/${props.orderId}`)
        order.value = res.data
    }

    cart.value = await checkIfProductExists(JSON.parse(order.value.cart))
})
</script>

<style scoped>
/* width */
::-webkit-scrollbar {
    width: 5px;
}

/* Track */
::-webkit-scrollbar-track {
    background: #d2d2d2;
    //box-shadow: inset 0 0 5px grey;
    //border-radius: 10px;
}

/* Handle */
::-webkit-scrollbar-thumb {
    background: #8b8b8b;
    //border-radius: 10px;
}
td {
    padding-bottom: 10px;
}
td:nth-child(1) {
    vertical-align: top;
    padding-top: 5px;
    padding-right: 40px;
    font-size: 12px;
    color:gray;
    text-transform: uppercase;
}
td:nth-child(2) {
    vertical-align: top;
    //padding-right: 40px;
}
</style>
