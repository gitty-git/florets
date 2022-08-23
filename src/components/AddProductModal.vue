<template>
    <div class="text-xs text-gray-400 uppercase mt-12">Добавить товар - поиск по названию/ID:</div>
    <input class="input z-50 relative" type="text"
           v-model="finder" @click="search" @keyup="search"
           @keyup.esc="showed = false; finder = null"
    >

    <div class="relative z-50" v-if="showed === true">
        <div v-if="products" class="shadow-md bg-white absolute w-full">
            <div v-for="product in products" @click.stop="handleClick(product)"
                 class="w-full items-center flex flex-wrap justify-between cursor-pointer px-6 py-3 duration-100 hover:bg-gray-100">
                <div class="mr-2">
                    {{ product.name }} - {{ product.size }}см. - {{ product.price }}р.
                </div>

                <div class="text-xs uppercase text-mainRed" v-show="product.inCart">
                    Этот товар уже в корзине
                </div>
            </div>
        </div>
    </div>

    <div v-if="showed" @click="showed = !showed;" class="fixed bg-black w-full h-screen top-0 left-0 opacity-0"></div>

</template>

<script setup>
import { onMounted, ref } from "vue";
import axios from "axios";

// defineProps({
//     finder: String
// })
const emit = defineEmits(['addProduct'])
const props = defineProps(['cart'])

const finder = ref('')
const showed = ref(false)
const products = ref([])

const search = async () => {
    if (finder.value.length < 1) return
    showed.value = true

    let res = await axios.get(`api/products/${finder.value}`)
    products.value = res.data

    let arr = []
    products.value.forEach(p => {
        let arr2 = []
        props.cart.forEach(v => {
            if (p.id === v.id) arr2.push(p)
        })
        if (arr2.length > 0) arr.push({ ...p, inCart: true })
        else arr.push({ ...p, inCart: false })
    })

    products.value = arr
}

const handleClick = (product) => {
    emit('addProduct', product)

    if (!product.inCart) {
        showed.value = false
        finder.value = null
    }
}

onMounted(async () => {

})

</script>
