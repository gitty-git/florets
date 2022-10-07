<template>
    <div class="flex justify-center w-full overflow-hidden overscroll-x-none">
        <div class="px-6 pt-16 pb-20 max-w-screen-xl">
            <div class="font-display text-2xl lg:text-4xl">Оформление заказа</div>
            <div class="font-sm text-gray-400 mt-4 mb-12">{{ itemsInCart.amount }} {{ pluralizedGoods }} на сумму {{ formatPrice(itemsInCart.price) }} ₽</div>

            <!-- form -->
            <div class="max-w-screen-sm w-full justify-center">
                <!-- name, phone -->
                <div class="grid md:grid-cols-2 gap-x-3">
                    <div class="mt-6">
                        <label class="text-sm">Имя:</label>
                        <input v-model="form.name" @keyup="nameInput" class="input" type="text">

                        <div v-if="error.name" class="text-xs text-mainRed mt-1 absolute">{{ error.name }}</div>
                    </div>

                    <div class="mt-6">
                        <label class="text-sm">Телефон:</label>
                        <input v-model="form.phone" class="input" type="text" @focusout="checkPhone(form.phone)">

                        <div v-if="error.phone" class="text-xs text-mainRed mt-1 absolute">{{ error.phone }}</div>
                    </div>
                </div>

                <!-- address -->
                <div class="mt-12">
                    <label class="text-sm">Улица, дом:</label>
                    <div @click="handleAddressInput" @focusout="handleAddressInput" @keyup="handleAddressInput"
                         @input="handleAddressInput">
                        <input v-model="form.address" id="inputAddress" ref="addressInput" class="input" type="text">
                    </div>

                    <div v-if="error.address" class="text-xs text-mainRed mt-1 absolute">{{ error.address }}</div>
                </div>

                <!-- comment -->
                <div class="mt-12">
                    <label class="text-sm">Комментарий к заказу / пожелания в открытке:</label>
                    <div @click="handleAddressInput" @focusout="handleAddressInput" @keyup="handleAddressInput"
                         @input="handleAddressInput">
                        <textarea v-model="form.comment" rows="3"
                                  class="w-full my-2 px-3 py-2 font-serif border-2 border-gray-150" type="text"/>
                    </div>
                </div>

                <!-- dates -->
                <transition appear enter-active-class="transition transform duration-500 ease-out"
                            enter-from-class="translate-y-full opacity-0">
                    <div v-if="dates.length" class="flex flex-col justify-center items-center mt-12">
                        <div class="w-full pr-12 text-sm">Выберете желаемую дату доставки:</div>

                        <div class="grid grid-cols-7 gap-6 w-full mt-6">
                            <div v-for="day in weekdays" class="text-xs text-gray-400 flex justify-center items-center">
                                {{ day }}
                            </div>

                            <div class="flex font-medium justify-center items-center"
                                 v-for="(data, i) in dates" :key="i"
                            >
                                <div v-if="data.available" class="cursor-pointer flex items-end">
                                    <div @click="handlePickedDate(data.date, i)"
                                         class="text-xl w-14 h-14 rounded-full flex justify-center items-center"
                                         :class="{'border-mainRed border-2 text-mainRed' : activeDate === i}"
                                    >
                                        {{ data.date.getDate() }}
                                    </div>
                                </div>

                                <div v-else class="flex items-end">
                                    <div class="text-xl text-gray-300">
                                        {{ data.date.getDate() }}
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </transition>

                <!-- time -->
                <transition appear enter-active-class="transition transform duration-500 ease-out"
                            enter-from-class="translate-y-full opacity-0">
                    <div v-if="!availableHoursHidden" class="flex flex-col justify-center items-center mt-12">
                        <div class="w-full pr-12 text-sm">Выберете желаемое время доставки:</div>
                        <div class="mt-6 grid font-medium grid-cols-2 sm:grid-cols-4 gap-3">
                            <div v-for="(date, i) in availableHours" :key="i"
                            >
                                <div :class="{'border-mainRed text-mainRed': date.getHours() === activeHour}"
                                     @click="handleHours(date, i)"
                                     class="cursor-pointer px-4 py-2 rounded-full border-2 border-gray-150 flex justify-center">
                                    {{ date.getHours() }}:00 - {{ date.getHours() + 2 === 24 ? '00' : date.getHours() + 2 }}:00
                                </div>
                            </div>
                        </div>
                    </div>
                </transition>

                <!-- payment -->
                <transition appear enter-active-class="transition transform duration-500 ease-out"
                            enter-from-class="translate-y-full opacity-0">

                    <div v-if="!paymentHidden" class="flex flex-col justify-center items-center mt-12">
                        <div class="w-full pr-12 text-sm">Выберете способ оплаты:</div>
                        <div class="flex mt-6 font-medium">
                            <div @click="handlePayment('cash')"
                                 :class="{'border-mainRed text-mainRed': activePayment === 'cash'}"
                                 class="cursor-pointer mr-3 px-4 py-2 rounded-full border-2 border-gray-150 uppercase">Наличными
                            </div>
                            <div @click="handlePayment('card')"
                                 :class="{'border-mainRed text-mainRed' : activePayment === 'card'}"
                                 class="cursor-pointer px-4 py-2 rounded-full border-2 border-gray-150 uppercase">Картой
                            </div>
                        </div>
                    </div>
                </transition>

                <div class="w-full left-0 absolute mt-6 text-sm flex justify-center text-mainRed">{{ expiredTimeErr }}</div>

                <transition appear enter-active-class="transition transform duration-500 ease-out"
                            enter-from-class="translate-y-full opacity-0">
                    <!-- submit -->
                    <div v-if="!submitHidden" class="w-full flex mt-16 justify-center">
                        <div @click="handleSubmit" class="btn">
                            Подтвердить
                        </div>
                    </div>
                </transition>
            </div>
        </div>
    </div>

    <!-- Footer -->
    <transition appear enter-active-class="delay-1000 transform duration-500 ease-out"
                enter-from-class="translate-y-full opacity-0">
        <div>
            <Footer/>
        </div>
    </transition>

</template>

<script setup>
import Footer from "@/components/Footer";
import Input from "@/components/Input";
import { computed, onBeforeMount, onMounted, ref, watchEffect } from "vue";
import { useStore } from 'vuex'
import { formatPrice, formatTime, pluralize } from '@/functions'
import axios from "axios";
import { useRouter } from "vue-router"

const store = useStore()

const itemsInCart = computed(() => store.state.cart.items)
const notice = ref('')
const dates = ref([])
const timePeriods = ref([])
const availableHoursHidden = ref(true)
const workingTime = { start: '09:00', end: '23:59' }
const workingHours = ref(null)
const startHour = +workingTime.start.split(':')[0]
const endHour = +workingTime.end.split(':')[0]
const form = ref({
    name: '',
    phone: '+7 ',
    address: 'Россия, Челябинск, ',
    payment_method: '',
    delivery_time: new Date(),
    comment: '',
    cart: {}
})
const weekdays = ['ПН', 'ВТ', 'СР', 'ЧТ', 'ПТ', 'СБ', 'ВС']
const availableHours = ref([])
const paymentHidden = ref(true)
const activeHour = ref(null)
const activeDate = ref(null)
const activePayment = ref(null)
const submitHidden = ref(true)
const error = ref({})
const addressInput = ref(null)
const yMap = ref(null)
const expiredTimeErr = ref(null)

let pickedDate = null

const router = useRouter()

const phoneRegularExp = /(\+7|8)[\s(]?(\d{3})[\s)]?(\d{3})[\s-]?(\d{2})[\s-]?(\d{2})/g;

const pluralizedGoods = computed(() => {
    return pluralize(itemsInCart.value.amount)
})

const nameInput = () => {
    if (form.value.name.length) {
        error.value.name = null
    }
}

const checkPhone = (phone) => {
    if (phone.length !== 17) error.value.phone = 'Введите корректный номер телефона'
    else error.value.phone = ''
}

const handlePickedDate = (date, i) => {
    pickedDate = date
    activeDate.value = i
    form.value.delivery_time = pickedDate
    form.value.delivery_time.setHours(0, 0, 0, 0)
    setAvailableHours(date)
}

const handleHours = (date) => {
    activeHour.value = date.getHours()
    // form.value.delivery_time = date // not working in mobile
    paymentHidden.value = false

    let deliveryTime = new Date(form.value.delivery_time).setHours(date.getHours())
    form.value.delivery_time = new Date(deliveryTime)

    // console.log(new Date(form.value.delivery_time))
}

const handlePayment = (payment) => {
    activePayment.value = payment
    form.value.payment_method = payment
    submitHidden.value = false
}

const setDates = () => {
    let opens = new Date(workingHours.value.opens_at)
    let closes = new Date(workingHours.value.closes_at)
    let currDate = new Date
    let firstDateNum = currDate.getDate() - currDate.getDay() + -6
    let firstDay = new Date()
    firstDay.setDate(firstDateNum)

    for (let i = 0; i < 21; i++) {
        let openDate = new Date(firstDay.getTime() + 86400000 * i)
        openDate.setHours(opens.getHours())
        openDate.setMinutes(opens.getMinutes())

        let closeDate = new Date(firstDay.getTime() + 86400000 * i)
        closeDate.setHours(closes.getHours())
        closeDate.setMinutes(closes.getMinutes())

        let available = closeDate.getTime() > new Date().setHours(currDate.getHours() + 3)
        // console.log(closeDate , '--',  new Date(new Date().setHours(currDate.getHours() + 3)), 'ava:',  available)

        dates.value.push({ date: new Date(firstDay.getTime() + 86400000 * i), available })
    }
}

const setAvailableHours = () => {
    availableHours.value = []
    availableHoursHidden.value = false

    let currDate = new Date()
    let opens = new Date(workingHours.value.opens_at)
    let closes = new Date(workingHours.value.closes_at)
    let hours
    let availableHour

    if (pickedDate < closes) {
        availableHour = new Date().getHours() + 1
        hours = Math.ceil((closes - currDate) / 60 / 60 / 1000) - 1
    }
    else {
        availableHour = opens.getHours()
        hours = Math.ceil((closes - opens) / 60 / 60 / 1000)
    }

    // console.log(opens.getHours(), "asdf", hours)

    let datesHours

    for (let i = 1; i < hours - 1; i++) {
        let date = new Date(pickedDate.setHours(availableHour + i, 0, 0, 0))
        if (date.getHours() > opens.getHours()) availableHours.value.push(date)
    }
}

const formatPhone = () => {
    let cond3 = /^\+7 .*$/.test(form.value.phone)
    if (!cond3) form.value.phone = `+7 `

    let ph = form.value.phone.replace(/\D/g, '').match(/[+7 ](\d{0,3})(\d{0,3})(\d{0,4})/)
    form.value.phone = !ph[2] ? '+7 ' + ph[1] : '+7 (' + ph[1] + ') ' + ph[2] + (ph[3] ? '-' + ph[3] : '');
}

const handleAddressInput = async () => {
    form.value.address = addressInput.value.value
    error.value.address = await checkAddress(form.value.address)
}

const checkIfChosenTimeHasExpired = (date) => {
    const chosenDate = date

    const chosenHourPlus = chosenDate.getHours() - 1
    const datesAreTheSame = chosenDate.getDate() === new Date().getDate()
    const currHour = new Date().getHours() + 1

    return datesAreTheSame && chosenHourPlus < currHour
}

const checkAddress = async (address) => {
    let err
    let hint

    await ymaps.geocode(address).then(function (res) {
        let obj = res.geoObjects.get(0)

        if (obj) {
            // Об оценке точности ответа геокодера можно прочитать тут: https://tech.yandex.ru/maps/doc/geocoder/desc/reference/precision-docpage/
            switch (obj.properties.get('metaDataProperty.GeocoderMetaData.precision')) {
                case 'exact':
                    break;
                case 'number':
                case 'near':
                case 'range':
                    err = 'Неточный адрес, требуется уточнение';
                    hint = 'Уточните номер дома';
                    break;
                case 'street':
                    err = 'Неполный адрес, требуется уточнение';
                    hint = 'Уточните номер дома';
                    break;
                case 'other':
                default:
                    err = 'Неточный адрес, требуется уточнение';
                    hint = 'Уточните адрес';
            }
        }
        else {
            err = 'Адрес не найден';
            hint = 'Уточните адрес';
        }

        // Если геокодер возвращает пустой массив или неточный результат, то показываем ошибку.
        if (err) {
            return err
        }
        else {
            return null
        }
    })

    return err
}

const handleSubmit = async () => {
    error.value.name = form.value.name.length < 1 && 'Введите имя'
    error.value.phone = form.value.phone.length !== 17 && 'Введите корректный номер телефона'
    error.value.address = await checkAddress(form.value.address) || false

    let anyErrors = Object.values(error.value).some(v => v !== false)
    if (anyErrors) {
        window.scrollTo({ top: 150, behavior: 'smooth' })
        return
    }

    if (checkIfChosenTimeHasExpired(form.value.delivery_time)) {
        expiredTimeErr.value = 'Выбранный временной промежуток уже не достуступен.'

        form.value.delivery_time = pickedDate
        form.value.delivery_time.setHours(0, 0, 0, 0)

        setAvailableHours()

        return
    }

    form.value.cart = localStorage.getItem("cart")

    await axios.post('api/order', form.value).then(res => {
        router.push({
            name: 'ThanksForTheOrder', params: {
                orderId: res.data.id,
                name: form.value.name,
                phone: form.value.phone
            }
        })

        store.dispatch('setCart', { amount: 0, price: 0 })
        localStorage.removeItem("cart")
    })
}

watchEffect(() => {
    formatPhone()
})

watchEffect(() => {
    // const cond = /^Россия, Челябинск,.*$|.*Челябинск, Россия$/.test(form.value.address)
    const cond = /Челябинск/g.test(form.value.address)
    if (!cond) {
        form.value.address = 'Россия, Челябинск, '
    }
})

onBeforeMount(async () => {
    ymaps.ready(() => {
        yMap.value = new ymaps.SuggestView('inputAddress')
    })

    let res = await axios.get(`api/opening-hours`)
    workingHours.value = res.data

    setDates()
})
</script>

<style scoped>

</style>
