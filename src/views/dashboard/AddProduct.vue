<template>
    <div class="px-6 m-0 lg:pt-16 pt-6 mb-20 m-auto max-w-screen-xl">
        <div class="font-display flex -ml-0.5 items-center text-2xl lg:text-4xl">
            Добавить товар
        </div>

        <div class="my-12 max-w-screen-sm m-auto m-0">
            <div class="mb-6">
                <label class="text-sm">Название:</label>
                <input type="text" class="input">
            </div>

            <div class="flex w-full">
                <div class="mb-6 w-full mr-3">
                    <label class="text-sm">Размер:</label>
                    <input type="number" class="input">
                </div>

                <div class="mb-6 w-full ml-3">
                    <label class="text-sm">Цена:</label>
                    <input type="number" class="input">
                </div>
            </div>


            <div class="mb-6">
                <label class="text-sm">Описание:</label>
                <textarea type="text" rows="3" class="input h-auto"></textarea>
            </div>

            <!-- main image -->
            <div class="flex flex-col mb-6">
                <label class="text-sm mb-2">Главное изображение (формат: 4:3):</label>
                <input type="file" @change="handleImages">

                <div class="flex">
                    <div v-for="url in imageUrls">
                        <img class="w-20 mr-3 mt-3" :src="url" alt="">
                    </div>
                </div>
            </div>

            <!-- images -->
            <div class="flex flex-col mb-6">
                <label class="text-sm mb-2">Второстепенные изображения (3шт. / 4:3):</label>
                <input type="file" multiple @change="handleImages">

                <div class="flex">
                    <div v-for="url in imageUrls">
                        <img class="w-20 mr-3 mt-3" :src="url" alt="">
                    </div>
                </div>
            </div>


<!--            <div v-if="error.filesLength">{{ error.filesLength }}</div>-->
            <div>{{ error.aspectRatio }}</div>

            <div class="btn w-fit mt-12 m-0 m-auto" @click="submit">Добавить</div>
        </div>
    </div>
</template>

<script setup>
import axios from "axios";
import { ref, watchEffect } from "vue";

const form = ref({
    name: 'Product Name',
    size: 25,
    price: 2500,
    img: '1',
    description: 'Product Name desc',
    images: []
})

const file = ref('')
const error = ref({})
const imageUrls = ref([])

const handleImages = (event) => {
    let files = event.target.files
    if (files.length > 0) {
        for (let i = 0; i < files.length; i++) {
            form.value.images.push(files[i])
        }
    }
}

const submit = async () => {
    // let res = await axios.post(`api/product`, form.value)
    // console.log(res)
}

watchEffect(() => {
    imageUrls.value = []

    for (let i = 0; i < form.value.images.length; i++) {
        if (form.value.images[i] instanceof File) {
            let reader = new FileReader()
            reader.readAsDataURL(form.value.images[i])

            reader.onload = () => {
                let image = new Image()
                image.src = reader.result

                image.onload = function () {
                    let cond = (this.height / this.width).toFixed(2) === (4 / 3).toFixed(2)

                    if (!cond) {
                        error.value.aspectRatio = 'Изображение должно быть в соотношении 4:3'
                    }
                    else {
                        error.value.aspectRatio = null
                        imageUrls.value.push(reader.result)
                    }
                }
            }
        }
    }
})

// watchEffect(() => {
//     console.log(images.value)
// })
</script>

<style scoped>

</style>
