<template>
    <div class="px-6 m-0 lg:pt-16 pt-6 mb-20 m-auto max-w-screen-xl">
        <div class="mb-12 flex -ml-0.5 sm:items-center flex-col sm:flex-row">
            <div class="sm:mr-6 font-display text-2xl sm:text-4xl">
                Список товаров
            </div>
            <AddProductModal/>
        </div>

        <!-- list -->
        <div class="my-6">
            <div class="flex text-gray-400 uppercase text-xs w-full mb-3">
                <div class="md:w-1/2 w-1/4 mr-2">Имя</div>
                <div class="w-1/4 mr-2">Цена</div>
                <div class="w-1/4 mr-2">Размер</div>
                <div class="w-1/4 mr-2">Публичен</div>
            </div>

            <div v-if="products"
                 v-for="product in products"
            >
                <EditProductModal :product="product"/>
            </div>
        </div>
    </div>
</template>

<script setup>
import { onMounted, ref } from "vue";
import axios from "axios";
import AddProductModal from '@/components/AddProductModal'
import EditProductModal from '@/components/EditProductModal'

const products = ref([])

onMounted(async () => {
    // await axios.get('/sanctum/csrf-cookie');
    // await axios.post('/api/products')
    //         .then(res => console.log(res))
    //         .catch(err => console.log(err));
    axios
            .get('/api/admin/products')
            .then(response => {
                products.value = response.data
            })
})
</script>

<style scoped>

</style>
