<template>
    <div class="w-full flex lg:flex-row flex-col lg:my-2 my-6">
        <div class="lg:w-1/3 w-full text-sm md:text-md text-gray-400 mr-6 lg:py-2 lg:my-1">{{ title }}</div>

        <div v-if="inputShowed !== input" @click="inputShowed = input" class="lg:py-2 my-1 py-1 flex">
            {{ input }}
            <div class="mt-1">
                <svg v-if="inputShowed !== input" class="stroke-mainRed-400 w-4 ml-9" viewBox="0 0 22 22" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M1.87604 17.1157C1.92198 16.7022 1.94496 16.4955 2.00751 16.3022C2.06301 16.1308 2.14143 15.9676 2.24064 15.8172C2.35246 15.6476 2.49955 15.5005 2.79373 15.2063L16 2.00006C17.1046 0.895488 18.8955 0.895489 20 2.00006C21.1046 3.10463 21.1046 4.89549 20 6.00006L6.79373 19.2063C6.49955 19.5005 6.35245 19.6476 6.18289 19.7594C6.03245 19.8586 5.86929 19.937 5.69785 19.9925C5.5046 20.0551 5.29786 20.0781 4.88437 20.124L1.5 20.5001L1.87604 17.1157Z" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
                </svg>
            </div>
        </div>

        <input v-if="inputShowed === input && inputType !== 'comment'" required
               @focusout="inputShowed = false"
               @change="$emit('update:input', $event.target.value)"
               :value="input"
               v-focus class="lg:w-2/3 -ml-2 lg:ml-0 px-2 py-1 lg:py-2 my-1"
        />

        <textarea v-if="inputShowed === input && inputType === 'comment'"
                  @focusout="inputShowed = false"
                  @change="$emit('update:input', $event.target.value)"
                  :value="input"
                  v-focus rows="2" class="lg:w-2/3 -ml-2 lg:ml-0 px-2 py-1 lg:py-2 my-1"
        ></textarea>
    </div>
</template>

<script setup>
import { ref } from "vue";

defineProps(['title', 'input', 'inputType'])
defineEmits(['update:input'])

const vFocus = {
    mounted: (el) => el.focus()
}

const inputShowed = ref(false)
</script>

<style scoped>

</style>
