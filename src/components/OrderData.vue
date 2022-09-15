<template>
    <div class="w-full py-3">
        <!-- id -->
        <div class="w-full flex lg:flex-row flex-col lg:mb-2 mb-6">
            <div class="w-1/3 text-sm md:text-md text-gray-400 mr-6 lg:py-2 lg:my-1">ID:</div>
            <div class="lg:py-2 my-1 py-1 flex uppercase">{{ order.id }}</div>
        </div>

        <!-- created_at -->
        <div class="w-full flex lg:flex-row flex-col lg:my-2 my-6">
            <div class="w-1/3 text-sm md:text-md text-gray-400 mr-6 lg:py-2 lg:my-1">Создан:</div>
            <div class="lg:py-2 my-1 py-1 flex">{{ computedData }}</div>
        </div>

        <!-- name -->
        <OrderModalInput :title="'Имя:'" v-model:input="order.name"/>

        <!-- phone -->
        <OrderModalInput :title="'Телефон:'" v-model:input="order.phone"/>

        <!-- address -->
        <OrderModalInput :title="'Адрес:'" v-model:input="order.address"/>

        <!-- delivery_time -->
        <div class="w-full flex lg:flex-row flex-col lg:my-3 my-6">
            <div class="lg:w-1/3 text-sm md:text-md text-gray-400 mr-6 lg:py-2 lg:my-1">
                Дата, время доставки:
            </div>

            <input :value="order.delivery_time"
                   @change="handleEmit('delivery_time', $event.target.value)"
                   type="datetime-local" class="w-fit -ml-2 lg:ml-0 px-2 lg:px-0 py-1 my-1"
            >
        </div>

        <!-- payment_method -->
        <div class="w-full flex lg:flex-row flex-col lg:my-0 lg:my-4 my-6">
            <div class="lg:w-1/3 text-sm md:text-md text-gray-400 mr-6 lg:py-2 lg:my-1">
                Способ оплаты:
            </div>

            <select v-model="order.payment_method"
                    v-if="inputShowed !== order.payment_method" class="py-2 -ml-1 w-fit"
            >
                <option :selected="order.payment_method === 'cash'" :value="'cash'">Наличными</option>
                <option :selected="order.payment_method === 'card'" :value="'card'">Картой</option>
            </select>
        </div>

        <!-- paid -->
        <div class="w-full flex lg:flex-row flex-col lg:my-4 my-6">
            <div class="lg:w-1/3 text-sm md:text-md text-gray-400 mr-6 lg:py-2 lg:my-1">
                Оплачен:
            </div>

            <select v-model="order.paid"
                    v-if="inputShowed !== order.paid" class="py-2 -ml-1 w-fit"
            >
                <option :selected="order.paid === 1" :value="1">Да</option>
                <option :selected="order.paid === 0" :value="0">Нет</option>
            </select>
        </div>

        <!-- comment -->
        <OrderModalInput :title="'Комментарий:'" v-model:input="order.comment" :inputType="'comment'"/>
    </div>
</template>

<script setup>

import { computed, ref } from "vue";
import { formatTime, isIsoDate } from "@/functions";
import OrderModalInput from "@/components/OrderModalInput"

const props = defineProps(['title', 'type', 'data', 'input', 'status', 'order'])
const emits = defineEmits(['update:data', 'update:input', 'update:order', 'emitOrder'])

const inputShowed = ref(false)

const vFocus = {
    mounted: (el) => el.focus()
}

const handleEmit = (type, eventValue) => {
    props.order[type] = eventValue
    emits('emitOrder', props.order)
}

const computedData = computed(() => {
    let date = new Date(props.order.created_at)

    return formatTime(date)
})

</script>

<style scoped>
</style>
