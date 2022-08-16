<template>
    <div v-if="!modalHidden" class="left-0 flex justify-center items-center w-full h-screen">
        <div v-if="order" class="z-40 w-full absolute sm:left-auto left-0 top-12 xl:w-2/3 md:w-5/6 2xl:w-1/2 bg-white">
            <div @click="$emit('modalHidden')" class="w-full cursor-pointer flex justify-end  p-6">
                &#9587;
            </div>

            <div class="sm:px-12 px-3 pb-12">
                <table class="table-auto mb-6">
                    <tbody>
                    <TableRow :title="'ID:'" :type="order.id" :showed="showed.id"/>
                    <TableRow :title="'Создан:'" :type="order.created_at" :showed="showed.created_at"/>
                    <TableRow :title="'Имя:'" :type="order.name" :showed="showed.name" :input="'text'"/>
                    <TableRow :title="'Телефон:'" :type="order.phone" :showed="showed.phone" :input="'text'"/>
                    <TableRow :title="'Адрес:'" :type="order.address" :showed="showed.address" :input="'text'"/>
                    <TableRow :title="'Дата доставки:'" :type="order.date" :showed="showed.date" :input="'text'"/>
                    <TableRow :title="'Время доставки:'" :type="order.time" :showed="showed.time" :input="'text'"/>
                    <TableRow :title="'Способ оплаты:'" :type="order.payment_method" :showed="showed.payment_method" :input="'text'"/>
                    <TableRow :title="'Оплачен:'" :type="order.paid" :showed="showed.paid" :input="'text'"/>
                    <TableRow :title="'Комментарий:'" :type="order.comment" :showed="showed.comment" :input="'text'"/>
<!--                    <tr>-->
<!--                        <td>ID:</td>-->
<!--                        <td class="flex -mt-1 items-center">-->
<!--                            <div class="px-2 py-1">-->
<!--                                {{ order.id }}-->
<!--                            </div>-->
<!--                        </td>-->
<!--                        &lt;!&ndash;                        <td>btn</td>&ndash;&gt;-->
<!--                    </tr>-->
<!--                    <tr>-->
<!--                        <td>Создан:</td>-->
<!--                        <td class="flex -mt-1 items-center">-->
<!--                            <div class="px-2 py-1">-->
<!--                                {{ order.created_at }}-->
<!--                            </div>-->
<!--                        </td>-->
<!--                        &lt;!&ndash;                        <td>btn</td>&ndash;&gt;-->
<!--                    </tr>-->
<!--                    <tr>-->
<!--                        <td>Имя:</td>-->
<!--                        <td class="flex -mt-1 items-center" @click="showed.name = true">-->
<!--                            <div class="px-2 py-1" v-if="!showed.name" >-->
<!--                                {{ order.name }}-->
<!--                            </div>-->
<!--                            <input v-if="showed.name"-->
<!--                                   v-focus-->
<!--                                   @keyup.enter="showed.name = false"-->
<!--                                   @keyup.esc="showed.name = false"-->
<!--                                   v-model="order.name"-->
<!--                                   @focusout="showed.name = false"-->
<!--                                   type="text" class="px-2 py-1 w-full"-->
<!--                            >-->
<!--                            <svg v-if="!showed.name" class="stroke-mainRed-400 ml-3" width="18" height="24" viewBox="0 0 22 22" fill="none" xmlns="http://www.w3.org/2000/svg">-->
<!--                                <path d="M1.87604 17.1157C1.92198 16.7022 1.94496 16.4955 2.00751 16.3022C2.06301 16.1308 2.14143 15.9676 2.24064 15.8172C2.35246 15.6476 2.49955 15.5005 2.79373 15.2063L16 2.00006C17.1046 0.895488 18.8955 0.895489 20 2.00006C21.1046 3.10463 21.1046 4.89549 20 6.00006L6.79373 19.2063C6.49955 19.5005 6.35245 19.6476 6.18289 19.7594C6.03245 19.8586 5.86929 19.937 5.69785 19.9925C5.5046 20.0551 5.29786 20.0781 4.88437 20.124L1.5 20.5001L1.87604 17.1157Z" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>-->
<!--                            </svg>-->
<!--                        </td>-->
<!--                    </tr>-->
<!--                    <tr>-->
<!--                        <td>Телефон:</td>-->
<!--                        <td class="flex -mt-1 items-center" @click="showed.phone = true">-->
<!--                            <div class="px-2 py-1" v-if="!showed.phone" >-->
<!--                                {{ order.phone }}-->
<!--                            </div>-->
<!--                            <input v-if="showed.phone"-->
<!--                                   v-focus-->
<!--                                   @keyup.enter="showed.phone = false"-->
<!--                                   @keyup.esc="showed.phone = false"-->
<!--                                   v-model="order.phone"-->
<!--                                   @focusout="showed.phone = false"-->
<!--                                   type="text" class="w-full px-2 py-1"-->
<!--                            >-->
<!--                            <svg v-if="!showed.phone" class="stroke-mainRed-400 ml-3" width="18" height="24" viewBox="0 0 22 22" fill="none" xmlns="http://www.w3.org/2000/svg">-->
<!--                                <path d="M1.87604 17.1157C1.92198 16.7022 1.94496 16.4955 2.00751 16.3022C2.06301 16.1308 2.14143 15.9676 2.24064 15.8172C2.35246 15.6476 2.49955 15.5005 2.79373 15.2063L16 2.00006C17.1046 0.895488 18.8955 0.895489 20 2.00006C21.1046 3.10463 21.1046 4.89549 20 6.00006L6.79373 19.2063C6.49955 19.5005 6.35245 19.6476 6.18289 19.7594C6.03245 19.8586 5.86929 19.937 5.69785 19.9925C5.5046 20.0551 5.29786 20.0781 4.88437 20.124L1.5 20.5001L1.87604 17.1157Z" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>-->
<!--                            </svg>-->
<!--                        </td>-->
<!--                    </tr>-->
<!--                    <tr>-->
<!--                        <td>Адрес:</td>-->
<!--                        <td class="flex -mt-1 items-center" @click="showed.address = true">-->
<!--                            <div class="px-2 py-1" v-if="!showed.address" >-->
<!--                                {{ order.address }}-->
<!--                            </div>-->
<!--                            <input v-if="showed.address"-->
<!--                                   v-focus-->
<!--                                   @keyup.enter="showed.address = false"-->
<!--                                   @keyup.esc="showed.address = false"-->
<!--                                   v-model="order.address"-->
<!--                                   @focusout="showed.address = false"-->
<!--                                   type="text" class="w-full px-2 py-1"-->
<!--                            >-->
<!--                            <svg v-if="!showed.address" class="stroke-mainRed-400 ml-3" width="18" height="24" viewBox="0 0 22 22" fill="none" xmlns="http://www.w3.org/2000/svg">-->
<!--                                <path d="M1.87604 17.1157C1.92198 16.7022 1.94496 16.4955 2.00751 16.3022C2.06301 16.1308 2.14143 15.9676 2.24064 15.8172C2.35246 15.6476 2.49955 15.5005 2.79373 15.2063L16 2.00006C17.1046 0.895488 18.8955 0.895489 20 2.00006C21.1046 3.10463 21.1046 4.89549 20 6.00006L6.79373 19.2063C6.49955 19.5005 6.35245 19.6476 6.18289 19.7594C6.03245 19.8586 5.86929 19.937 5.69785 19.9925C5.5046 20.0551 5.29786 20.0781 4.88437 20.124L1.5 20.5001L1.87604 17.1157Z" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>-->
<!--                            </svg>-->
<!--                        </td>-->
<!--                    </tr>-->
<!--                    <tr>-->
<!--                        <td>Дата доставки:</td>-->
<!--                        <td class="flex -mt-1 items-center" @click="showed.date = true">-->
<!--                            <div class="px-2 py-1" v-if="!showed.date" >-->
<!--                                {{ computedOrder.date }}-->
<!--                            </div>-->
<!--                            <input v-if="showed.date"-->
<!--                                   @keyup.enter="showed.date = false"-->
<!--                                   @keyup.esc="showed.date = false"-->
<!--                                   v-model="computedOrder.date"-->
<!--                                   @focusout="showed.date = false"-->
<!--                                   type="text" class="w-full px-2 py-1"-->
<!--                            >-->
<!--                            <svg v-if="!showed.date" class="stroke-mainRed-400 ml-3" width="18" height="24" viewBox="0 0 22 22" fill="none" xmlns="http://www.w3.org/2000/svg">-->
<!--                                <path d="M1.87604 17.1157C1.92198 16.7022 1.94496 16.4955 2.00751 16.3022C2.06301 16.1308 2.14143 15.9676 2.24064 15.8172C2.35246 15.6476 2.49955 15.5005 2.79373 15.2063L16 2.00006C17.1046 0.895488 18.8955 0.895489 20 2.00006C21.1046 3.10463 21.1046 4.89549 20 6.00006L6.79373 19.2063C6.49955 19.5005 6.35245 19.6476 6.18289 19.7594C6.03245 19.8586 5.86929 19.937 5.69785 19.9925C5.5046 20.0551 5.29786 20.0781 4.88437 20.124L1.5 20.5001L1.87604 17.1157Z" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>-->
<!--                            </svg>-->
<!--                        </td>-->
<!--                    </tr>-->
<!--                    <tr>-->
<!--                        <td>Время доставки:</td>-->
<!--                        <td class="flex -mt-1 items-center" @click="showed.time = true">-->
<!--                            <div class="px-2 py-1" v-if="!showed.time" >-->
<!--                                {{ computedOrder.time }}-->
<!--                            </div>-->
<!--                            <input v-if="showed.time"-->
<!--                                   v-focus-->
<!--                                   @keyup.enter="showed.time = false"-->
<!--                                   @keyup.esc="showed.time = false"-->
<!--                                   v-model="computedOrder.time"-->
<!--                                   @focusout="showed.time = false"-->
<!--                                   type="text" class="w-full px-2 py-1"-->
<!--                            >-->
<!--                            <svg v-if="!showed.time" class="stroke-mainRed-400 ml-3" width="18" height="24" viewBox="0 0 22 22" fill="none" xmlns="http://www.w3.org/2000/svg">-->
<!--                                <path d="M1.87604 17.1157C1.92198 16.7022 1.94496 16.4955 2.00751 16.3022C2.06301 16.1308 2.14143 15.9676 2.24064 15.8172C2.35246 15.6476 2.49955 15.5005 2.79373 15.2063L16 2.00006C17.1046 0.895488 18.8955 0.895489 20 2.00006C21.1046 3.10463 21.1046 4.89549 20 6.00006L6.79373 19.2063C6.49955 19.5005 6.35245 19.6476 6.18289 19.7594C6.03245 19.8586 5.86929 19.937 5.69785 19.9925C5.5046 20.0551 5.29786 20.0781 4.88437 20.124L1.5 20.5001L1.87604 17.1157Z" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>-->
<!--                            </svg>-->
<!--                        </td>-->
<!--                    </tr>-->
<!--                    <tr>-->
<!--                        <td>Способ оплаты:</td>-->
<!--                        <td class="flex -mt-1 items-center" @click="showed.payment_method = true">-->
<!--                            <div class="px-2 py-1" v-if="!showed.payment_method" >-->
<!--                                {{ computedOrder.payment_method === "cash" ? "Наличные" : "Безналичные" }}-->
<!--                            </div>-->
<!--                            <input v-if="showed.payment_method"-->
<!--                                   v-focus-->
<!--                                   @keyup.enter="showed.payment_method = false"-->
<!--                                   @keyup.esc="showed.payment_method = false"-->
<!--                                   v-model="computedOrder.payment_method"-->
<!--                                   @focusout="showed.payment_method = false"-->
<!--                                   type="text" class="w-full px-2 py-1"-->
<!--                            >-->
<!--                            <svg v-if="!showed.payment_method" class="stroke-mainRed-400 ml-3" width="18" height="24" viewBox="0 0 22 22" fill="none" xmlns="http://www.w3.org/2000/svg">-->
<!--                                <path d="M1.87604 17.1157C1.92198 16.7022 1.94496 16.4955 2.00751 16.3022C2.06301 16.1308 2.14143 15.9676 2.24064 15.8172C2.35246 15.6476 2.49955 15.5005 2.79373 15.2063L16 2.00006C17.1046 0.895488 18.8955 0.895489 20 2.00006C21.1046 3.10463 21.1046 4.89549 20 6.00006L6.79373 19.2063C6.49955 19.5005 6.35245 19.6476 6.18289 19.7594C6.03245 19.8586 5.86929 19.937 5.69785 19.9925C5.5046 20.0551 5.29786 20.0781 4.88437 20.124L1.5 20.5001L1.87604 17.1157Z" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>-->
<!--                            </svg>-->
<!--                        </td>-->
<!--                    </tr>-->
<!--                    <tr>-->
<!--                        <td>Оплачен:</td>-->
<!--                        <td class="flex -mt-1 items-center" @click="showed.paid = true">-->
<!--                            <div class="px-2 py-1" v-if="!showed.paid" >-->
<!--                                {{ computedOrder.paid === 0 ? "Нет" : "Да" }}-->
<!--                            </div>-->
<!--                            <input v-if="showed.paid"-->
<!--                                   v-focus-->
<!--                                   @keyup.enter="showed.paid = false"-->
<!--                                   @keyup.esc="showed.paid = false"-->
<!--                                   v-model="computedOrder.paid"-->
<!--                                   @focusout="showed.paid = false"-->
<!--                                   type="text" class="w-full px-2 py-1"-->
<!--                            >-->
<!--                            <svg v-if="!showed.paid" class="stroke-mainRed-400 ml-3" width="18" height="24" viewBox="0 0 22 22" fill="none" xmlns="http://www.w3.org/2000/svg">-->
<!--                                <path d="M1.87604 17.1157C1.92198 16.7022 1.94496 16.4955 2.00751 16.3022C2.06301 16.1308 2.14143 15.9676 2.24064 15.8172C2.35246 15.6476 2.49955 15.5005 2.79373 15.2063L16 2.00006C17.1046 0.895488 18.8955 0.895489 20 2.00006C21.1046 3.10463 21.1046 4.89549 20 6.00006L6.79373 19.2063C6.49955 19.5005 6.35245 19.6476 6.18289 19.7594C6.03245 19.8586 5.86929 19.937 5.69785 19.9925C5.5046 20.0551 5.29786 20.0781 4.88437 20.124L1.5 20.5001L1.87604 17.1157Z" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>-->
<!--                            </svg>-->
<!--                        </td>-->
<!--                    </tr>-->
<!--                    <tr>-->
<!--                        <td>Комментарий:</td>-->
<!--                        <td class="flex -mt-1 items-center" @click="showed.comment = true">-->
<!--                            <div class="px-2 py-1" v-if="!showed.comment" >-->
<!--                                {{ order.comment || "-" }}-->
<!--                            </div>-->
<!--                            <input v-if="showed.comment"-->
<!--                                   v-focus-->
<!--                                   @keyup.enter="showed.comment = false"-->
<!--                                   @keyup.esc="showed.comment = false"-->
<!--                                   v-model="computedOrder.comment"-->
<!--                                   @focusout="showed.comment = false"-->
<!--                                   type="text" class="w-full px-2 py-1"-->
<!--                            >-->
<!--                            <svg v-if="!showed.comment" class="stroke-mainRed-400 ml-3" width="18" height="24" viewBox="0 0 22 22" fill="none" xmlns="http://www.w3.org/2000/svg">-->
<!--                                <path d="M1.87604 17.1157C1.92198 16.7022 1.94496 16.4955 2.00751 16.3022C2.06301 16.1308 2.14143 15.9676 2.24064 15.8172C2.35246 15.6476 2.49955 15.5005 2.79373 15.2063L16 2.00006C17.1046 0.895488 18.8955 0.895489 20 2.00006C21.1046 3.10463 21.1046 4.89549 20 6.00006L6.79373 19.2063C6.49955 19.5005 6.35245 19.6476 6.18289 19.7594C6.03245 19.8586 5.86929 19.937 5.69785 19.9925C5.5046 20.0551 5.29786 20.0781 4.88437 20.124L1.5 20.5001L1.87604 17.1157Z" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>-->
<!--                            </svg>-->
<!--                        </td>-->
<!--                    </tr>-->
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
                                <a target="_blank" :href="`/products/${data.item.id}`"
                                             class="w-1/2 flex items-start lg:items-center lg:flex-row flex-col"
                                >
                                    <div class="visible lg:invisible mb-4 absolute uppercase text-sm">{{ data.item.name }}</div>
                                    <img class="lg:mb-0 w-12 mr-6 lg:mt-0 mt-10" :src="require(`@/assets/images/b-${data.item.img}.png`)" alt="">
                                    <div class="lg:visible lg:static absolute pr-6 invisible uppercase text-sm">{{ data.item.name }}</div>
                                </a>

                                <div class="w-1/2 flex lg:flex-row flex-col lg:items-center">
                                    <div class="flex xl:mr-6 lg:mr-2 justify-start items-center text-black font-bold">
                                        <div @click="decrease(data.item.id)" class="-ml-6 h-12 w-12 cursor-pointer duration-150 flex justify-center items-center hover:border-2 border-gray-150 rounded-full">
                                            <img class="w-2" :src="require(`@/assets/svg/arrow.svg`)" alt="">
                                        </div>

                                        <div class="mx-4">{{ data.amount }}</div>

                                        <div @click="increase(data.item.id)" class="h-12 w-12 cursor-pointer duration-150 flex justify-center items-center hover:border-2 border-gray-150 rounded-full">
                                            <img class="w-2 rotate-180" :src="require(`@/assets/svg/arrow.svg`)" alt="">
                                        </div>
                                    </div>

                                    <div class="text-xs lg:ml-0 ml-2.5 text-gray-400">{{ formatPrice(data.item.price) }} / шт.</div>
                                </div>
                            </div>

                            <div class="md:w-1/3 w-1/5 md:mt-0 mt-6 flex flex-wrap justify-between items-center">
                                <div class="md:w-1/2 w-full md:mb-0 mb-4 flex md:justify-start justify-end font-medium">
                                    {{ formatPrice(data.item.price * data.amount) }} ₽
                                </div>

                                <div @click="removeProduct(data.item.id)" class="md:w-1/2 w-full flex justify-end">
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
                            Товар "{{ data.item.name }} - {{ data.item.size }} см" не найден
                        </div>
                    </div>
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
// const nameInput = ref(null)

// const handleInput = () => {
//     showed.value = !showed.value
//     nameInput.value.focus()
// }

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

    let date = new Date(order.value.date)
    order.value.date = `${ date.getDate()} / ${date.getMonth()}`
    order.value.created_at = `${ date.getDate()} / ${date.getMonth()}, ${ date.getHours()}:${ date.getMinutes()}`

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
            console.log(parsed[i])
            if (res.status === 200 && res.data.id === parsed[i].id) {
                cart.value.push({ item: res.data, amount: parsed[i].amount, found: true })
            }
            else cart.value[i] = { item: parsed[i], amount: 0, found: false }
        })
    }

    total.value = cart.value.reduce((acc, v) => {
        return acc + v.item.price * v.amount
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
