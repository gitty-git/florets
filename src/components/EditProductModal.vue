<template>
<div v-if="editProductModal === productId" class="absolute left-0 flex justify-center h-full items-center w-full">
    <div class="z-40 bg-white w-full fixed section overflow-y-scroll bottom-6 sm:left-auto left-0 top-6 xl:w-2/3 md:w-5/6 2xl:w-1/2 bg-white">
        <div class="w-full flex justify-end">
            <div @click="$emit('setModal', null)" class="cursor-pointer p-6">&#9587;</div>
        </div>

        <div class="sm:px-12 px-3 pb-12">
            <div class="my-12 max-w-screen-sm m-auto m-0">
                <div class="mb-6">
                    <label class="text-sm">Название:</label>
                    <input v-model="product.name" type="text" class="input">
                </div>

                <div class="flex w-full">
                    <div class="mb-6 w-full mr-3">
                        <label class="text-sm">Размер:</label>
                        <input v-model="product.size" type="number" class="input">
                    </div>

                    <div class="mb-6 w-full ml-3">
                        <label class="text-sm">Цена:</label>
                        <input v-model="product.price" type="number" class="input">
                    </div>
                </div>

                <div class="mb-6">
                    <label class="text-sm">Описание:</label>
                    <textarea v-model="product.description" type="text" rows="3" class="input py-2 h-auto"></textarea>
                </div>

                <!-- main image -->
                <div class="flex flex-col mb-6">
                    <label class="text-sm mb-2">Главное изображение (формат: 4:3):</label>
                    <input class="text-sm" type="file" @change="handleMainImage">

                    <div class="flex">
                        <img class="w-16 mr-3 mt-3" :src="product.main_image" alt="">
                    </div>

                    <div class="text-sm text-mainRed">{{ error.mainImage }}</div>
                </div>

                <!-- images -->
                <div class="flex flex-col mb-6">
                    <label class="text-sm mb-2">Второстепенные изображения (3шт. / 4:3):</label>
                    <input class="text-sm" type="file" multiple @change="handleImages">


                    <div class="flex">
                        <div v-for="url in imagesUrls">
                            <img class="w-16 mr-3 mt-3" :src="url" alt="">
                        </div>
                    </div>

                    <div v-if="product.images" class="flex">
                        <div v-for="url in productImageUrs">
                            <img class="w-16 mr-3 mt-3" :src="url" alt="">
                        </div>
                    </div>

                    <div class="text-sm mt-2 text-mainRed">{{ error.images }}</div>
                </div>

                <!-- published -->
                <div class="my-8">
                    <div class="flex items-center mb-4">
                        <input id="default-checkbox" v-model="product.published" type="checkbox" value="" class="w-4 h-4 text-blue-600 bg-gray-100 rounded border-gray-300 focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600">
                        <label for="default-checkbox" class="ml-2 text-sm">Опубликовать</label>
                    </div>
                </div>

                <!-- btn -->
                <div class="btn w-fit mt-12 m-0 m-auto" @click="submit">Обновить</div>
            </div>

        </div>
    </div>
</div>

<div v-if="editProductModal === productId" class="left-0 top-0 z-30 fixed w-full h-screen bg-black opacity-25"
     @click="$emit('setModal', null)">
</div>
</template>

<script setup>
import { ref, watchEffect, computed, onMounted, onBeforeMount } from "vue";
import axios from "axios";
import { formatPrice } from "@/functions";

const props = defineProps(['editProductModal', 'productId'])
const emits = defineEmits(['setModal'])

const mainImage = ref(null)
const images = ref([])
const file = ref('')
const error = ref({})
const imagesUrls = ref([])
const imagesToRemove = ref([])
const product = ref(null)

onBeforeMount(async () => {
    let res = await axios.get(`api/products/${props.productId}`)
    product.value = res.data[0]
})

const handleMainImage = (event) => {
    const reader = new FileReader

    reader.onload = function() {
        const img = new Image

        img.onload = function() {
            let cond = (this.height / this.width).toFixed(2) === (4 / 3).toFixed(2)
            if (!cond) {
                error.value.mainImage = 'Изображение должно быть в соотношении 4:3'
            }
            else {
                product.value.main_image = reader.result
                error.value.mainImage = null
            }
        }
        img.src = reader.result
    }
    reader.readAsDataURL(event.target.files[0])
}

const productImageUrs = computed(() => {
    return JSON.parse(product.value.images)
})

const handleImages = (event) => {
    imagesToRemove.value.push(...JSON.parse(product.value.images))

    let files = event.target.files
    if (files.length > 0) {
        for (let i = 0; i < files.length; i++) {
            images.value.push(files[i])
        }
    }
}

// images
watchEffect(() => {
    if (images.value.length > 3) {
        error.value.images = '3 шт. максимально'
        return
    }

    imagesUrls.value = []

    for (let i = 0; i < images.value.length; i++) {
        if (images.value[i] instanceof File) {
            let reader = new FileReader()
            reader.readAsDataURL(images.value[i])

            reader.onload = () => {
                let image = new Image()
                image.src = reader.result

                image.onload = function () {
                    let cond = (this.height / this.width).toFixed(2) === (4 / 3).toFixed(2)

                    if (!cond) {
                        error.value.images = 'Изображение должно быть в соотношении 4:3'
                    }
                    else {
                        error.value.images = null
                        // arr.push(reader.result)
                        imagesUrls.value.push(reader.result)
                        product.value.images = JSON.stringify([])
                    }
                }
            }
        }
    }
})

const submit = async () => {
    if (!mainImage.value && !product.value.main_image) {
        error.value.mainImage = 'Выберете 1 картинку'
        return
    }

    if (images.value.length !== 3 && !product.value.images) {
        error.value.images = 'Выберете 3 картинки'
        return
    }

    console.log(mainImage.value)

    let data = {
        name: product.value.name,
        size: product.value.size,
        price: product.value.price,
        description: product.value.description,
        published: product.value.published,
        main_image: mainImage.value,
        'images[]': images.value
    }

    let res = await axios.put(`api/admin/products/${product.value.id}`, data)
    console.log(res)
}
</script>

<style scoped>
/* width */
::-webkit-scrollbar {
    width: 5px;
}

/* Track */
::-webkit-scrollbar-track {
    background: #d2d2d2;
//box-shadow: inset 0 0 5px grey; //border-radius: 10px;
}

/* Handle */
::-webkit-scrollbar-thumb {
    background: #8b8b8b;
//border-radius: 10px;
}
</style>
