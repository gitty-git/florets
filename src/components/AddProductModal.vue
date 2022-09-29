<template>
    <div>
        <div @click="addProductModalHidden = false"
             class="w-fit sm:-mt-4 absolute text-sm cursor-pointer px-3 py-2 rounded border-gray-150 border-2">
            Добавить
        </div>

        <div v-if="!addProductModalHidden" class="absolute left-0 flex justify-center h-full items-center w-full">
            <div class="z-40 bg-white w-full fixed section overflow-y-scroll bottom-6 sm:left-auto left-0 top-6 xl:w-2/3 md:w-5/6 2xl:w-1/2 bg-white">
                <div class="w-full flex justify-end">
                    <div @click="addProductModalHidden = !addProductModalHidden" class="cursor-pointer p-6">&#9587;</div>
                </div>

                <div class="flex justify-center my-12 font-display text-xl sm:text-2xl">
                    ДОБАВИТЬ БУКЕТ
                </div>

                <div class="sm:px-12 px-3 pb-12">
                    <div class="my-12 max-w-screen-sm m-auto m-0">
                        <div class="mb-6">
                            <label class="text-sm">Название:</label>
                            <input v-model="form.name" type="text" class="input">

                            <div v-if="error.name" class="text-sm mt-2 text-mainRed">{{ error.name }}</div>
                        </div>

                        <div class="flex w-full">
                            <div class="mb-6 w-full mr-3">
                                <label class="text-sm">Размер:</label>
                                <input v-model="form.size" type="number" class="input">

                                <div v-if="error.size" class="text-sm mt-2 text-mainRed">{{ error.size }}</div>
                            </div>

                            <div class="mb-6 w-full ml-3">
                                <label class="text-sm">Цена:</label>
                                <input v-model="form.price" type="number" class="input">
                                <div v-if="error.price" class="text-sm mt-2 text-mainRed">{{ error.price }}</div>
                            </div>
                        </div>

                        <div class="mb-6">
                            <label class="text-sm">Описание:</label>
                            <textarea v-model="form.description" type="text" rows="3" class="input py-2 h-auto"></textarea>
                        </div>

                        <!-- main image -->
                        <div class="flex flex-col mb-6">
                            <label class="text-sm mb-2">Главное изображение (формат: 4:3):</label>
                            <input class="text-sm" type="file" @change="handleMainImage">

                            <div class="flex">
                                <img @click="removeMainImage" class="w-16 mr-3 mt-3" :src="mainImageUrl" alt="">
                            </div>

                            <div v-if="error.mainImage" class="text-sm text-mainRed">{{ error.mainImage }}</div>
                        </div>

                        <!-- images -->
                        <div class="flex flex-col mb-6">
                            <label class="text-sm mb-2">Второстепенные изображения (3шт. / 4:3):</label>
                            <input class="text-sm" type="file" multiple @change="handleImages">


                            <div class="flex">
                                <div v-for="(url, id) in imagesUrls">
                                    <img @click="removeFromImages(id)" class="w-16 mr-3 mt-3" :src="url" alt="">
                                </div>
                            </div>

                            <div v-if="error.images" class="text-sm mt-2 text-mainRed">{{ error.images }}</div>
                        </div>

                        <!-- published -->
                        <div class="my-8">
                            <div class="flex items-center mb-4">
                                <input id="default-checkbox" v-model="form.published" type="checkbox" value="" class="w-4 h-4 text-blue-600 bg-gray-100 rounded border-gray-300 focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600">
                                <label for="default-checkbox" class="ml-2 text-sm">Опубликовать</label>
                            </div>
                        </div>

                        <div>{{ error.imgErr }}</div>
                        <div>{{ error.postProductErr }}</div>

                        <!-- btn -->
                        <div class="btn w-fit mt-12 m-0 m-auto" @click="submit">Добавить</div>
                    </div>

                </div>
            </div>
        </div>

        <div v-if="!addProductModalHidden" class="left-0 top-0 z-30 fixed w-full h-screen bg-black opacity-25"
             @click="addProductModalHidden = !addProductModalHidden">
        </div>
    </div>

</template>

<script setup>
import { ref, watchEffect } from "vue";
import axios from "axios";
import { handleImage } from "@/functions";

const emits = defineEmits(['productToUpdate'])
const form = ref({
    name: '',
    size: '',
    price: '',
    description: '',
    published: true,
    main_image: null,
    images: "",
})
const images = ref([])
const file = ref('')
const error = ref({})
const mainImageUrl = ref(null)
const mainImageFile = ref(null)
const imagesUrls = ref([])
let addProductModalHidden = ref(true)
const submitClicked = ref(false)

const removeMainImage = () => {
    mainImageUrl.value = null
    form.value.main_image = null
}

const handleMainImage = (event) => {
    const reader = new FileReader

    reader.onload = function() {
        const img = new Image

        img.onload = function() {
            let cond = (this.height / this.width).toFixed(2) === (4 / 3).toFixed(2)
            if (!cond) {
                form.value.main_image = null
                error.value.mainImage = 'Изображение должно быть в соотношении 4:3'
            }
            else {
                mainImageUrl.value = reader.result
                mainImageFile.value = event.target.files[0]
                error.value.mainImage = null
            }
        }
        img.src = reader.result
    }
    reader.readAsDataURL(event.target.files[0])
}

const removeFromImages = (id) => {
    imagesUrls.value.splice(id, 1)
    images.value.splice(id, 1)
}

const handleImages = (event) => {
    let files = event.target.files
    for (let i = 0; i < files.length; i++) {
        // images.value.push(files[i])
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

watchEffect(() => {
    if (imagesUrls.value.length > 3 || images.value.length > 3) {
        error.value.images = 'Максимально 3 шт.'
        imagesUrls.value.pop()
        images.value.pop()
    }
})

watchEffect(() => {
    if (submitClicked.value) {
        checkIfErrors()
    }
})

const checkIfErrors = () => {
    error.value.name = !form.value.name.length && "Введите имя"
    error.value.price = form.value.price < 1 && "Введите цену"
    error.value.size = form.value.size < 1 && "Введите размер"
    error.value.mainImage = !mainImageFile.value && 'Выберете 1 картинку'
    error.value.images = images.value.length !== 3 && 'Выберете 3 картинки'

    return !Object.values(error.value).some(v => v !== false)
}

const submit = async () => {
    submitClicked.value = true

    if (!checkIfErrors()) return

    if (Object.values(error.value).some(v => v !== false)) return

    // upload new images
    let imgData = new FormData()
    imgData.append('main_image', mainImageFile.value) // main_image file
    images.value.forEach((img, i) => {
        imgData.append(`images[${i}]`, img) // image files
    })

    // image paths array in response
    let imgRes = await axios.post(`api/admin/image/add`, imgData)
        .catch(err => error.value.imgErr = err)

    // after creating image files - save product data & image paths
    console.log(imgRes)
    form.value.main_image = imgRes.data.main_image
    form.value.images = JSON.stringify(imgRes.data.images)

    await axios.post(`api/admin/products`, form.value)
        .then(res => {
            emits('productToUpdate', res.data)
            addProductModalHidden.value = true
            images.value = []

            form.value.name = ''
            form.value.size = ''
            form.value.price = ''
            form.value.description = ''
            form.value.published = true
            form.value.main_image = null
            form.value.images = ""

            imagesUrls.value = []
            mainImageUrl.value = null
            submitClicked.value = true

            submitClicked.value = false
        })
        .catch(err => {
            console.log(err)
            error.value.postProductErr = err
        })
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
