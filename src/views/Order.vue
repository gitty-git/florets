<template>
    <div class="px-6 m-0 lg:pt-16 pt-6 mb-20 m-auto max-w-screen-xl">
        <div class="font-display text-2xl lg:text-4xl">Оформление заказа</div>
        <div class="font-sm text-gray-400 mt-4 mb-12">{{ itemsInCart.amount }} товара на сумму {{ formatPrice(itemsInCart.price) }} ₽</div>

        <!-- form -->
        <div class="max-w-screen-sm m-0 m-auto">
            <!-- name, phone -->
            <div class="grid md:grid-cols-2 gap-x-3">
                <div class="mt-6">
                    <label class="text-sm">Имя:</label>
                    <input v-model="form.name" class="input" type="text">

                    <div v-if="error.name" class="text-xs text-mainRed mt-1 absolute">{{ error.name }}</div>
                </div>

                <div class="mt-6">
                    <label class="text-sm">Телефон:</label>
                    <input v-model="form.phone" class="input" type="text" @focusout="checkPhone">

                    <div v-if="error.phone" class="text-xs text-mainRed mt-1 absolute">{{ error.phone }}</div>
                </div>
            </div>

            <!-- address -->
            <div class="mt-12">
                <label class="text-sm">Улица, дом:</label>
                <div @click="handleAddressInput" @focusout="handleAddressInput" @keyup="handleAddressInput" @input="handleAddressInput">
                    <input v-model="form.address" id="inputAddress" ref="addressInput" class="input" type="text">
                </div>

                <div v-if="error.address" class="text-xs text-mainRed mt-1 absolute">{{ error.address }}</div>
            </div>

            <!-- date -->
            <div class="flex flex-col justify-center items-center mt-12">
                <div class="w-full pr-12 text-sm">Выберете желаемую дату доставки:</div>

                <div class="grid grid-cols-7 gap-6 w-full mt-6">
                    <div v-for="d in weekdays" class="text-xs text-gray-400 flex justify-center items-center">
                        {{ d }}
                    </div>

                    <div class="flex font-medium justify-center items-center"

                         v-for="(d, i) in availableDates" :key="i"
                    >
                        <div v-if="d.available" class="cursor-pointer flex items-end">
                            <div @click="handlePickedDate(d.date, i)" class="text-xl w-14 h-14 rounded-full flex justify-center items-center"
                                 :class="{'border-mainRed border-2 text-mainRed' : activeDate === i}"
                            >
                                {{ d.date.getDate() }}
                            </div>
                        </div>

                        <div v-else class="flex items-end">
                            <div class="text-xl text-gray-300">
                                {{ d.date.getDate() }}
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            <!-- time -->
            <div v-if="!availableHoursHidden" class="flex flex-col justify-center items-center mt-12">
                <div class="w-full pr-12 text-sm">Выберете желаемое время доставки:</div>
                <div class="mt-6 grid font-medium grid-cols-2 sm:grid-cols-4 gap-3">
                    <div v-for="(hour, i) in availableHours" :key="i"
                    >
                        <div :class="{'border-mainRed text-mainRed': i === activeHour}" @click="handleHours(hour, i)"
                             class="cursor-pointer px-4 py-2 rounded-full border-2 border-gray-150 flex justify-center">{{ hour }}:00 - {{ hour + 2 }}:00</div>
                    </div>
                </div>

            </div>

            <!-- payment -->
            <div v-if="!paymentHidden" class="flex flex-col justify-center items-center mt-12">
                <div class="w-full pr-12 text-sm">Выберете способ оплаты:</div>
                <div class="flex mt-6 font-medium">
                    <div @click="handlePayment('cash')"
                         :class="{'border-mainRed text-mainRed': activePayment === 'cash'}"
                         class="cursor-pointer mr-3 px-4 py-2 rounded-full border-2 border-gray-150 uppercase">Наличными</div>
                    <div @click="handlePayment('card')"
                         :class="{'border-mainRed text-mainRed' : activePayment === 'card'}"
                         class="cursor-pointer px-4 py-2 rounded-full border-2 border-gray-150 uppercase">Картой</div>
                </div>
            </div>

            <!-- submit -->
            <div class="w-full flex mt-16 justify-center" v-if="!submitHidden">
                <div @click="handleSubmit" class="btn">
                    Подтвердить
                </div>
            </div>
        </div>
    </div>
</template>

<script setup>
import Input from "@/components/Input";
import { computed, onMounted, ref, watchEffect } from "vue";
import { useStore } from 'vuex'
import { formatPrice } from '@/functions'

const store = useStore()

const itemsInCart = computed(() => store.state.cart)
const notice = ref('')
const dates = ref([])
const timePeriods = ref([])
const availableHoursHidden = ref(true)
const workingTime = {start: '09:00', end: '23:59'}
const startHour = +workingTime.start.split(':')[0]
const endHour = +workingTime.end.split(':')[0]
const form = ref({
    name: '',
    phone: '+7',
    address: 'Россия, Челябинск, ',
    payment_type: '',
    date: '',
    time: '',
    comment: '',
    order: {}
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

const phoneRegularExp = /(\+7|8)[\s(]?(\d{3})[\s)]?(\d{3})[\s-]?(\d{2})[\s-]?(\d{2})/g;

const handlePickedDate = (date, i) => {
    activeDate.value = i
    form.value.date = date
    setAvailableHours(date)
}

const handleHours = (hour, i) => {
    activeHour.value = i
    paymentHidden.value = false
    form.value.time = hour
}

const handlePayment = (payment) => {
    activePayment.value = payment
    form.value.payment_type = payment
    submitHidden.value = false
}

const setDates = () => {
    let currDate = new Date
    let first = currDate.getDate() - currDate.getDay() + 1

    for (let i = 0; i < 14; i++) {
        dates.value.push(new Date(currDate.setDate(first + i)))
    }
}

const setAvailableHours = (date) => {
    availableHours.value = []
    availableHoursHidden.value = false
    let currDate = new Date()
    let availableStartHour
    let hours

    hours = (endHour /* +1 if time set 23:59 */ - startHour)
    availableStartHour = startHour

    if (currDate.getDate() === date.getDate() && currDate.getHours() > startHour + 1) {
        hours = (endHour /* +1 if time set 23:59 */ - startHour) - (currDate.getHours() - startHour + 1)
        availableStartHour = currDate.getHours() + 1
    }

    for (let i = 1; i < hours; i++) {
        availableHours.value.push(availableStartHour + i)
    }
}

const formatPhone = (phone) => {
    let cond = phone.replace(/[+()\s\-]*/g, '').length
    let cond2 = /^[+78][\d\s()-]*$/.test(phone)

    if (cond > 11 || !cond2) {
        form.value.phone = phone.slice(0, -1)
    }
}

const checkPhone = () => {
    let err = 'Введён неверный номер телефона'
    let phone = form.value.phone.replace(/[()\s\-]*/g, '')
    console.log(phone)
    if (phoneRegularExp.test(phone) || /^\+7$/.test(form.value.phone)) {
        form.value.phone = form.value.phone.replace(phoneRegularExp, '+7 ($2) $3-$4-$5')
        error.value.phone = false
    }

    else error.value.phone = err
}

const handleAddressInput = () => {
    form.value.address = addressInput.value.value
    checkAddress()
}

const checkAddress = () => {
    ymaps.geocode(form.value.address).then(function (res) {
        let obj = res.geoObjects.get(0),
                err, hint;

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
        } else {
            err = 'Адрес не найден';
            hint = 'Уточните адрес';
        }

        // Если геокодер возвращает пустой массив или неточный результат, то показываем ошибку.
        if (err) {
            error.value.address = err
        } else {
            error.value.address = false
            // console.log(obj);
        }
    }, function (e) {
    })
}

const handleSubmit = () => {
    if (form.value.name.length < 1) {
        error.value.name = 'Введите имя'
    }

    if (form.value.phone === '+7' || form.value.phone.length < 5) error.value.phone = 'Введён неверный номер телефона'

    let timeHasNotExpired = form.value.time + 1 > new Date().getHours()
    if (timeHasNotExpired) {
        form.value.order = localStorage.getItem('cart')
        console.log(form.value.order)
    }
}

watchEffect(() => {
    formatPhone(form.value.phone)
})

watchEffect(() => {
    const cond = /^Россия, Челябинск,.*$|.*Челябинск, Россия$/.test(form.value.address)
    if (!cond) {
        form.value.address = 'Россия, Челябинск, '
    }
})

const availableDates = computed(() => {
    let obj = []

    dates.value.forEach(date => {
        date.setHours(endHour - 2)
        date.setMinutes(endHour)
        obj.push({date, available: new Date() < date - 2})
    })

    return obj
})

onMounted(() => {
    ymaps.ready(() => {
        yMap.value = new ymaps.SuggestView('inputAddress')
    })

    setDates()
})
</script>

<style scoped>

</style>
