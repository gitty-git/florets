<template>
<div v-if="editProductModal === productId" class="absolute left-0 flex justify-center h-full items-center w-full">
    <div class="z-40 bg-white w-full fixed section overflow-y-scroll bottom-10 sm:left-auto left-0 top-10 xl:w-2/3 md:w-5/6 2xl:w-1/2 bg-white">
        <div class="w-full flex justify-end">
            <div @click="$emit('setModal', null)" class="cursor-pointer p-6">&#9587;</div>
        </div>

        <div class="sm:px-12 px-3 pb-12 w-full flex justify-center" v-if="product">
            <div class="mb-12 mt-6 max-w-screen-sm m-auto m-0">
                <div class="flex justify-center mb-12 text-xl sm:text-2xl">
                    <div class="font-display">ИЗМЕНИТЬ БУКЕТ</div>
                </div>

                <div class="mb-6">
                    <label class="text-sm">Название:</label>
                    <input v-model="product.name" type="text" class="input">

                    <div v-if="error.name" class="text-sm mt-2 text-mainRed">{{ error.name }}</div>
                </div>

                <div class="flex w-full">
                    <div class="mb-6 w-full mr-3">
                        <label class="text-sm">Размер:</label>
                        <input v-model="product.size" type="number" class="input">

                        <div v-if="error.size" class="text-sm mt-2 text-mainRed">{{ error.size }}</div>
                    </div>

                    <div class="mb-6 w-full ml-3">
                        <label class="text-sm">Цена:</label>
                        <input v-model="product.price" type="number" class="input">

                        <div v-if="error.price" class="text-sm mt-2 text-mainRed">{{ error.price }}</div>
                    </div>
                </div>

                <div class="mb-6">
                    <label class="text-sm">Описание:</label>
                    <textarea v-model="product.description" type="text" rows="3" class="input py-2 h-auto"></textarea>
                </div>

                <!-- main image -->
                <div class="flex flex-col mb-6">
                    <label class="text-sm mb-2">Главное изображение (формат: 3:4):</label>
                    <input class="text-sm" type="file" @change="handleMainImage">

                    <div class="flex">
                        <img class="w-16 mr-3 mt-3" v-if="mainImageUrl" :src="mainImageUrl" alt="">
                        <img class="w-16 mr-3 mt-3" v-else :src="product.main_image" alt="">
                    </div>

                    <div v-if="error.mainImage" class="text-sm mt-2 text-mainRed">{{ error.mainImage }}</div>
                </div>

                <!-- images -->
                <div class="flex flex-col mb-6">
                    <label class="text-sm mb-2">Второстепенные изображения (3шт. / 3:4):</label>
                    <input @click="removeAllImages" class="text-sm" type="file" multiple @change="handleImages">

                    <div v-if="product.images" class="flex">
                        <div v-for="(url, id) in imagesUrls">
                            <img class="w-16 mr-3 mt-3" :src="url" alt="">
                        </div>
                    </div>

                    <div v-if="error.images" class="text-sm mt-2 text-mainRed">{{ error.images }}</div>
                </div>

                <!-- published -->
                <div class="my-8">
                    <div class="flex items-center mb-4">
                        <input id="default-checkbox" v-model="product.published" type="checkbox" class="w-4 h-4 text-blue-600 bg-gray-100 rounded border-gray-300 focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600">
                        <label for="default-checkbox" class="ml-2 text-sm">Опубликован</label>
                    </div>
                </div>

                <!-- btns -->
                <div class="flex pt-6 w-full justify-center items-center">
                    <div v-show="loading" class="py-6 px-12 w-56 mr-3 flex justify-center">
                        <svg class="animate-spin" width="24" height="24" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <path d="M8 16C6.41775 16 4.87103 15.5308 3.55544 14.6518C2.23984 13.7727 1.21446 12.5233 0.608964 11.0615C0.00346254 9.59966 -0.154964 7.99112 0.153718 6.43928C0.4624 4.88743 1.22433 3.46197 2.34315 2.34315C3.46197 1.22433 4.88743 0.462399 6.43928 0.153718C7.99113 -0.154964 9.59966 0.00346288 11.0615 0.608964C12.5233 1.21447 13.7727 2.23985 14.6518 3.55544C15.5308 4.87103 16 6.41775 16 8L14.2821 8C14.2821 6.75751 13.9137 5.54293 13.2234 4.50983C12.5331 3.47674 11.552 2.67154 10.4041 2.19606C9.25616 1.72058 7.99303 1.59618 6.77442 1.83857C5.5558 2.08097 4.43643 2.67929 3.55786 3.55786C2.67929 4.43643 2.08097 5.5558 1.83858 6.77442C1.59618 7.99303 1.72058 9.25616 2.19606 10.4041C2.67154 11.552 3.47674 12.5331 4.50983 13.2234C5.54292 13.9137 6.75751 14.2821 8 14.2821L8 16Z" fill="#747474"/>
                        </svg>
                    </div>

                    <div v-show="!loading" :class="{'pointer-events-none': loading}" class="btn mr-3 w-56" @click="submit">Обновить</div>

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
                            <!-- spinner -->
                            <div v-show="loading" class="px-12 w-56 mr-3 flex justify-center">
                                <svg class="animate-spin" width="24" height="24" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
                                    <path d="M8 16C6.41775 16 4.87103 15.5308 3.55544 14.6518C2.23984 13.7727 1.21446 12.5233 0.608964 11.0615C0.00346254 9.59966 -0.154964 7.99112 0.153718 6.43928C0.4624 4.88743 1.22433 3.46197 2.34315 2.34315C3.46197 1.22433 4.88743 0.462399 6.43928 0.153718C7.99113 -0.154964 9.59966 0.00346288 11.0615 0.608964C12.5233 1.21447 13.7727 2.23985 14.6518 3.55544C15.5308 4.87103 16 6.41775 16 8L14.2821 8C14.2821 6.75751 13.9137 5.54293 13.2234 4.50983C12.5331 3.47674 11.552 2.67154 10.4041 2.19606C9.25616 1.72058 7.99303 1.59618 6.77442 1.83857C5.5558 2.08097 4.43643 2.67929 3.55786 3.55786C2.67929 4.43643 2.08097 5.5558 1.83858 6.77442C1.59618 7.99303 1.72058 9.25616 2.19606 10.4041C2.67154 11.552 3.47674 12.5331 4.50983 13.2234C5.54292 13.9137 6.75751 14.2821 8 14.2821L8 16Z" fill="#747474"/>
                                </svg>
                            </div>
                            <div v-show="!loading" class="flex justify-center">
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
let areYouSureModal = ref(false)
const hovered = ref(false)
const submitClicked = ref(false)
const loading = ref(false)
const mainImageFile = ref(null)

onBeforeMount(async () => {
    let res = await axios.get(`api/admin/products/${props.productId}`)
    product.value = res.data
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
                error.value.mainImage = 'Изображение должно быть в соотношении 3:4'
            }
            else if (event.target.files[0].size > 2048000) {
                product.value.main_image = null
                error.value.mainImage = 'Изображение не должно превышать 2 мб'
            }
            else {
                mainImageUrl.value = reader.result
                imagesToRemove.value.push(product.value.main_image)
                mainImageFile.value = event.target.files[0]
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
                    error.value.images = 'Изображение должно быть в соотношении 3:4'
                }
                else if (event.target.files[0].size > 2048000) {
                    error.value.images = 'Изображение не должно превышать 2 мб'
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
    if (images.value.length === 3) {
        product.value.images = ''
    }
}

const checkIfErrors = () => {
    error.value.name = !product.value.name.length && "Введите имя"
    error.value.price = product.value.price < 1 && "Введите цену"
    error.value.size = product.value.size < 1 && "Введите размер"
    error.value.mainImage = (!mainImageFile.value && !product.value.main_image) && 'Выберете 1 картинку формата 3:4, не более 2 мб'
    error.value.images = images.value.length > 0 && images.value.length !== 3 && 'Выберете 3 картинки (3:4, менее 2 мб)'
    return !Object.values(error.value).some(v => v !== false)
}

const submit = async () => {
    submitClicked.value = true

    if (!checkIfErrors()) return

    loading.value = true

    // remove images
    if (imagesToRemove.value.length) {
        let removeData = new FormData()
        removeData.append('name', product.value.name) // product folder name

        if (images.value.length === 3) {
            imagesToRemove.value.forEach((img, i) => {
                removeData.append(`images[${i}]`, img)
            })
        }

        let removedImages = await axios.post(`api/admin/image/delete`, removeData)
                .catch(err => console.log(err))
    }

    // upload new images
    let imgData = new FormData()

    if (mainImageFile.value instanceof File) {
        imgData.append('main_image', mainImageFile.value) // img file
    }
    images.value.forEach((img, i) => {
        if (img instanceof File) {
            imgData.append(`images[${i}]`, img) // image files
        }
    })

    let imgRes = await axios.post(`api/admin/image/add`, imgData)
            .catch(err => console.log(err))

    // update product data
    if (imgRes.data.main_image) product.value.main_image = imgRes.data.main_image
    if (imgRes.data.images.length) {
        product.value.images = JSON.stringify(imgRes.data.images)
    }
    else product.value.images = JSON.stringify(product.value.images)

    let res = await axios.put(`api/admin/products/${product.value.id}`, product.value)
            .catch(err => console.log(err))

    loading.value = false

    emits('productToUpdate', res.data)
    emits('setModal', false)
}

const removeProduct = async () => {
    imagesToRemove.value.push(product.value.main_image, ...product.value.images)

    let removeData = new FormData()

    imagesToRemove.value.forEach((img, i) => {
        removeData.append(`images[]`, img)
    })

    loading.value = true
    let removedImages = await axios.post(`api/admin/image/delete`, removeData)
    let res = await axios.delete(`api/admin/products/${product.value.id}`)

    areYouSureModal.value = false
    loading.value = false

    emits('productToRemove', product.value)
    emits('setModal', false)
}

watchEffect(() => {
    if (submitClicked.value) {
        checkIfErrors()
    }
})
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
