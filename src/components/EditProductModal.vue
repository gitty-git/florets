<template>
<div v-if="editProductModal === productId" class="absolute left-0 flex justify-center h-full items-center w-full">
    <div class="z-40 bg-white w-full fixed section overflow-y-scroll bottom-6 sm:left-auto left-0 top-6 xl:w-2/3 md:w-5/6 2xl:w-1/2 bg-white">
        <div class="w-full flex justify-end">
            <div @click="$emit('setModal', null)" class="cursor-pointer p-6">&#9587;</div>
        </div>

        <div class="sm:px-12 px-3 pb-12" v-if="product">
            <div class="my-12 max-w-screen-sm m-auto m-0">
                <div class="flex justify-center mb-12 text-xl sm:text-2xl">
                    <div class="font-display">ИЗМЕНИТЬ БУКЕТ</div>
                </div>

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
                        <img class="w-16 mr-3 mt-3" v-if="mainImageUrl" :src="mainImageUrl" alt="">
                        <img class="w-16 mr-3 mt-3" v-else :src="product.main_image" alt="">
                    </div>

                    <div class="text-sm text-mainRed">{{ error.mainImage }}</div>
                </div>

                <!-- images -->
                <div class="flex flex-col mb-6">
                    <label class="text-sm mb-2">Второстепенные изображения (3шт. / 4:3):</label>
                    <input @click="removeAllImages" class="text-sm" type="file" multiple @change="handleImages">

                    <div v-if="product.images" class="flex">
                        <div v-for="(url, id) in imagesUrls">
                            <img class="w-16 mr-3 mt-3" :src="url" alt="">
                        </div>
                    </div>

                    <div class="text-sm mt-2 text-mainRed">{{ error.images }}</div>
                </div>

                <!-- published -->
                <div class="my-8">
                    <div class="flex items-center mb-4">
                        <input id="default-checkbox" v-model="product.published" type="checkbox" class="w-4 h-4 text-blue-600 bg-gray-100 rounded border-gray-300 focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600">
                        <label for="default-checkbox" class="ml-2 text-sm">Опубликован</label>
                    </div>
                </div>

                <!-- btns -->
                <div class="flex mt-12 m-0 m-auto w-full justify-center items-center">
                    <div class="btn mr-3" @click="submit">Обновить</div>

                    <div @click="areYouSureModal = true" @mouseleave="hovered = false" @mouseover="hovered = true"
                         class="border-mainRed-400 border-2 p-7 rounded cursor-pointer hover:bg-mainRed hover:text-white duration-150"
                    >
                        <svg class="duration-150" :class="{'stroke-white': hovered, 'stroke-mainRed': !hovered}" width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <path d="M7 1H13M1 4H19M17 4L16.2987 14.5193C16.1935 16.0975 16.1409 16.8867 15.8 17.485C15.4999 18.0118 15.0472 18.4353 14.5017 18.6997C13.882 19 13.0911 19 11.5093 19H8.49065C6.90891 19 6.11803 19 5.49834 18.6997C4.95276 18.4353 4.50009 18.0118 4.19998 17.485C3.85911 16.8867 3.8065 16.0975 3.70129 14.5193L3 4M8 8.5V13.5M12 8.5V13.5" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
                        </svg>
                    </div>

                    <div v-if="areYouSureModal" class="absolute left-0 flex justify-center h-full items-center w-full">
                        <div class="z-40 pt-8 pb-10 rounded bg-white w-full fixed section flex justify-center items-center flex-col bottom-40 md:w-96 bg-white">
                            <div class="text-sm text-xl mb-6">Вы уверены?</div>
                            <div class="flex justify-center">
                                <div @click="removeProduct" class="text-xs btn w-24 text-center px-6 py-3 w-fit mr-3">Да</div>
                                <div @click="areYouSureModal = false" class="text-xs btn w-24 text-center px-6 py-3 w-fit hover:border-mainRed-400 hover:text-white hover:bg-mainRed-400 bg-white text-mainRed">Нет</div>
                            </div>
                        </div>
                        <div v-if="areYouSureModal" class="left-0 top-0 z-30 fixed w-full h-screen bg-black opacity-25"
                             @click="areYouSureModal = !areYouSureModal">
                        </div>
                    </div>
                </div>
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
const emits = defineEmits(['setModal', 'productToUpdate', 'productToRemove'])

const mainImageUrl = ref(null)
const images = ref([])
const file = ref('')
const error = ref({})
const imagesUrls = ref([])
const imagesToRemove = ref([])
const product = ref(null)
const areYouSureModal = ref(false)
const hovered = ref(false)

onBeforeMount(async () => {
    let res = await axios.get(`api/products/${props.productId}`)
    product.value = res.data[0]
    product.value.images = JSON.parse(product.value.images)
    product.value.published = product.value.published === 1
    imagesUrls.value = product.value.images
})

const handleMainImage = (event) => {
    const reader = new FileReader

    reader.onload = function() {
        const img = new Image

        img.onload = function() {
            let cond = (this.height / this.width).toFixed(2) === (4 / 3).toFixed(2)
            if (!cond) {
                product.value.main_image = null
                error.value.mainImage = 'Изображение должно быть в соотношении 4:3'
            }
            else {
                mainImageUrl.value = reader.result
                imagesToRemove.value.push(product.value.main_image)
                product.value.main_image = event.target.files[0]
                error.value.mainImage = null
            }
        }
        img.src = reader.result
    }
    reader.readAsDataURL(event.target.files[0])
}

const handleImages = (event) => {
    let files = event.target.files
    for (let i = 0; i < files.length; i++) {
        const reader = new FileReader

        reader.onloadend = function() {
            const img = new Image

            img.onload = function() {
                let cond = (this.height / this.width).toFixed(2) === (4 / 3).toFixed(2)
                if (!cond) {
                    error.value.images = 'Изображение должно быть в соотношении 4:3'
                }
                else {
                    imagesUrls.value.push(reader.result)
                    images.value.push(event.target.files[i])
                    error.value.images = null
                }
            }
            img.src = reader.result
        }
        reader.readAsDataURL(event.target.files[i])
    }
}

const removeAllImages = () => {
    imagesUrls.value = []
    imagesToRemove.value = product.value.images
    images.value = []
}

const submit = async () => {
    if (!product.value.main_image) {
        error.value.mainImage = 'Выберете 1 картинку'
        return
    }

    if (images.value.length !== 3 && !product.value.images) {
        error.value.images = 'Выберете 3 картинки'
        return
    }

    // remove images
    if (imagesToRemove.value.length) {
        let removeData = new FormData()
        removeData.append('name', product.value.name) // product folder name

        imagesToRemove.value.forEach((img, i) => {
            removeData.append(`images[${i}]`, img)
        })

        let removedImages = await axios.post(`api/admin/image/delete`, removeData)
    }

    // upload new images
    let imgData = new FormData()
    if (product.value.main_image instanceof File) {
        imgData.append('main_image', product.value.main_image) // img file
    }
    images.value.forEach((img, i) => {
        imgData.append(`images[${i}]`, img) // image files
    })
    imgData.append('name', product.value.name) // product folder name

    let imgRes = await axios.post(`api/admin/image/add`, imgData)

    // update product data
    if (imgRes.data.main_image) product.value.main_image = imgRes.data.main_image
    if (imgRes.data.images.length) {
        product.value.images = JSON.stringify(imgRes.data.images)
    }
    else product.value.images = JSON.stringify(product.value.images)

    let res = await axios.put(`api/admin/products/${product.value.id}`, product.value)

    emits('productToUpdate', res.data)
    emits('setModal', false)
}

const removeProduct = async () => {
    imagesToRemove.value.push(product.value.main_image, ...product.value.images)

    let removeData = new FormData()

    imagesToRemove.value.forEach((img, i) => {
        removeData.append(`images[]`, img)
    })

    let removedImages = await axios.post(`api/admin/image/delete`, removeData)
    let res = await axios.delete(`api/admin/products/${product.value.id}`)

    areYouSureModal.value = false

    emits('productToRemove', product.value)
    emits('setModal', false)
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
