<template>
    <tr class="w-full">
        <td>{{ title }}</td>

        <td class="flex -mt-1 w-full items-center" @click="type ? showed = true : null">
            <div class="px-2 py-1" v-if="!type">
                {{ computedData }}
            </div>

            <div :class="{'px-0' : data === null}" class="px-2 py-1"
                 v-if="!showed && (type === 'text' || type === 'comment')" >
                {{ data }}
            </div>

            <input v-if="showed && type === 'text'"
                   v-focus
                   @keyup.enter="showed = false"
                   @keyup.esc="showed = false"
                   v-model="data"
                   @focusout="showed = false"
                   :type="type" class="w-full px-2 py-1"
            >

            <input :value="data" v-focus v-show="type === 'datetime-local'" class="px-2 py-1" type="datetime-local">

            <select v-show="type === 'paid'" class="px-1 py-2">
                <option :selected="0" :value="data">Да</option>
                <option :selected="1" :value="data">Нет</option>
            </select>

            <select v-show="type === 'payment_method'" class="px-1 py-2">
                <option :selected="'cash'" :value="data">Наличные</option>
                <option :selected="'card'" :value="data">Безналичные</option>
            </select>

            <textarea v-model="data" @focusout="showed = false" v-if="showed && type === 'comment'" class="w-full px-2 py-1" name="" id="" rows="3">
            </textarea>

            <svg v-if="!showed && (type==='text' || type === 'comment')" class="stroke-mainRed-400 ml-3" width="18" height="24" viewBox="0 0 22 22" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M1.87604 17.1157C1.92198 16.7022 1.94496 16.4955 2.00751 16.3022C2.06301 16.1308 2.14143 15.9676 2.24064 15.8172C2.35246 15.6476 2.49955 15.5005 2.79373 15.2063L16 2.00006C17.1046 0.895488 18.8955 0.895489 20 2.00006C21.1046 3.10463 21.1046 4.89549 20 6.00006L6.79373 19.2063C6.49955 19.5005 6.35245 19.6476 6.18289 19.7594C6.03245 19.8586 5.86929 19.937 5.69785 19.9925C5.5046 20.0551 5.29786 20.0781 4.88437 20.124L1.5 20.5001L1.87604 17.1157Z" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
            </svg>
        </td>
    </tr>
</template>

<script setup>

import { computed } from "vue";

const props = defineProps(['showed', 'title', 'type', 'data', 'input'])

const vFocus = {
    mounted: (el) => el.focus()
}

const computedData = computed(() => {
    let date = new Date(props.data)

    if (date.toString() === 'Invalid Date') {
        return props.data
    }
    return date.toLocaleString()
})

</script>

<style scoped>

</style>
