<template>
    <div v-if="!modalHidden" class="left-0 flex justify-center items-center w-full h-screen">
        <div v-if="order" class="z-40 w-full absolute sm:left-auto left-0 top-12 xl:w-2/3 md:w-5/6 2xl:w-1/2 bg-white">
            <div @click="$emit('modalHidden')" class="w-full cursor-pointer flex justify-end  p-6">
                &#9587;
            </div>

            <div class="sm:px-12 px-3 pb-12">
                <table class="table-auto mb-6">
                    <tbody>
                    <TableRow :title="'ID:'" :data="order.id" :showed="showed.id"/>
                    <TableRow :title="'Создан:'" :data="order.created_at" :showed="showed.created_at"/>
                    <TableRow :title="'Имя:'" :data="order.name" :showed="showed.name" :type="'text'"/>
                    <TableRow :title="'Телефон:'" :data="order.phone" :showed="showed.phone" :type="'text'"/>
                    <TableRow :title="'Адрес:'" :data="order.address" :showed="showed.address" :type="'text'"/>
                    <TableRow :title="'Дата доставки:'" :data="computedOrder.delivery_time" :showed="showed.delivery_time" :type="'datetime-local'"/>
                    <TableRow :title="'Способ оплаты:'" :data="order.payment_method" :showed="showed.payment_method" :type="'payment_method'"/>
                    <TableRow :title="'Оплачен:'" :data="order.paid" :showed="showed.paid" :type="'paid'"/>
                    <TableRow :title="'Комментарий:'" :data="order.comment" :showed="showed.comment" :type="'comment'"/>
                    </tbody>
                </table>

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
                                    <img class="lg:mb-0 w-12 mr-6 lg:mt-0 mt-10" :src="require(`@/assets/images/b-${data.img}.png`)" alt="">
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
<!--                    <div v-if="error.alreadyInTheCart">-->
<!--                        {{ error.alreadyInTheCart }}-->
<!--                    </div>-->
                    <AddProductModal :cart="cart" :err="error" @addProduct="addProduct"/>

                </div>

                <div class="flex justify-end mt-6 text-xl font-medium">Итого: {{ formatPrice(total) }} ₽</div>

                <div class="my-3 text-sm font-medium">Статус заказа:</div>
                <div class="uppercase mb-6 w-full pb-6 flex text-sm">
                    <div :class="{'border-b text-mainRed border-mainRed' : status === computedOrder.status}" class="mr-2 sm:mr-4 cursor-pointer text-gray-400" v-for="status in statuses">
                        {{ status }}
                    </div>
                </div>

                <div @click="save">Сохранить изменения</div>
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
import { formatPrice, pluralize } from "@/functions";
import TableRow from "@/components/TableRow"
import AddProductModal from "@/components/AddProductModal"

const props = defineProps(['orderId', 'modalHidden'])

const order = ref(null)
const total = ref(0)
const showed = ref({})
const cart = ref([])
const statuses = ref({
    created: "Создан",
    processed: "Обработан",
    sent: "Отправлен",
    received: "Получен",
})
const productName = ref('')
const error = ref({})
// const nameInput = ref(null)

// const handleInput = () => {
//     showed.value = !showed.value
//     nameInput.value.focus()
// }

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

const save = async () => {
    // console.log(JSON.stringify(order.value.cart))
    // order.value.cart = JSON.stringify(order.value.cart)
    // let localCart = []
    // order.value.cart.forEach((cart, i) => {
    //     localCart.push(cart.item)
    // })

    // localCart = JSON.stringify(localCart)
    //
    // let res = await axios.put(`api/orders/${props.orderId}`, {
    //     name: order.value.name,
    //     phone: order.value.phone,
    //     id: order.value.id,
    //     address: order.value.address,
    //     date: order.value.date,
    //     time: order.value.time,
    //     payment_method: order.value.payment_method,
    //     status: order.value.status,
    //     cart: localCart,
    // })
    // console.log(res)
}

const computedOrder = computed(  () => {
    order.value.status = statuses.value[order.value.status]

    let date = new Date(order.value.delivery_time)
    // order.value.delivery_time = `${ date.getDate()} / ${date.getHours()}`
    // order.value.created_at = `${ date.getDate()} / ${date.getMonth()}, ${ date.getHours()}:${ date.getMinutes()}`

    return order.value
})

// watchEffect(async () => {
//     if (props.orderId) {
//         let res = await axios.get(`api/order/${props.orderId}`)
//         order.value = res.data
//     }
// })

onMounted(async () => {
    if (props.orderId) {
        let res = await axios.get(`api/order/${props.orderId}`)
        order.value = res.data
    }

    let parsed =  JSON.parse(order.value.cart)

    for (let i = 0; i < parsed.length; i++) {
        await axios.get(`api/products/${parsed[i].id}`)
        .then(res => {
            if (res.status === 200 && res.data[0].id === parsed[i].id) {
                cart.value.push({ ...res.data[0], amount: parsed[i].amount, found: true })
            }
            else cart.value[i] = { ...parsed[i], found: false }
        })
    }

    total.value = cart.value.reduce((acc, v) => {
        return acc + v.price * v.amount
    }, 0)
})
</script>

<style>
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
