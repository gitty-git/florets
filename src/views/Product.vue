<template>
    <div class="px-6 m-0 lg:pt-16 pt-6 pb-20 m-auto flex lg:flex-row flex-col max-w-screen-xl">
        <div class="lg:w-1/2 w-full mb-12 sm:flex-row flex-col flex justify-between">
            <img class="mb-6 sm:mb-0 object-cover w-full sm:w-4/5 sm:pr-3" :src="require(`@/assets/images/product.png`)" alt="">

            <div class="sm:w-1/6 sm:flex sm:flex-col grid grid-cols-4 gap-x-6 items-stretch justify-between">
                <img class="sm:mr-0 hover:scale-105 cursor-pointer duration-150" :src="require(`@/assets/images/product-sm.png`)" alt="">
                <img class="sm:mr-0 hover:scale-105 cursor-pointer duration-150" :src="require(`@/assets/images/product-sm.png`)" alt="">
                <img class="sm:mr-0 hover:scale-105 cursor-pointer duration-150" :src="require(`@/assets/images/product-sm.png`)" alt="">
                <img class="sm:mr-0 hover:scale-105 cursor-pointer duration-150" :src="require(`@/assets/images/product-sm.png`)" alt="">
            </div>
        </div>

        <div class="lg:pl-20 w-full lg:w-1/2">
            <div>
                <div class="flex">
                    <div class="font-display text-2xl lg:text-4xl">
                        Название букета
                    </div>
                    <div class="text-sm mt-1.5 ml-4">⌀ 30 см</div>
                </div>

                <div class="text-gray-400 mt-2 text-xl">
                    3 500 ₽
                </div>
            </div>

            <div class="leading-loose mt-12 font-serif text-gray-500">
                Многие думают, что Lorem Ipsum - взятый с потолка псевдо-латинский набор слов, но это не совсем так. Его корни уходят в один фрагмент классической латыни 45 года н.э., то есть более двух тысячелетий назад. Ричард МакКлинток, профессор латыни из колледжа
            </div>

            <div class="flex sm:flex-row flex-col w-full mt-12 uppercase text-xs">
                <div class="border-t-2 flex items-center justify-center border-gray-150 w-full border-l-2 border-b-2 sm:border-r-0 border-r-2 h-16">
                    <div class="text-gray-500 ml-10">Количество</div>

                    <div class="flex justify-between items-center text-black font-bold mx-6">
                        <div class="h-12 w-12 cursor-pointer duration-150 flex justify-center items-center hover:border border-gray-150 rounded-full">
                            <img class="w-2" :src="require(`@/assets/svg/arrow.svg`)" alt="">
                        </div>

                        <div class="mx-4">2</div>

                        <div class="h-12 w-12 cursor-pointer duration-150 flex justify-center items-center hover:border border-gray-150 rounded-full">
                            <img class="w-2 rotate-180" :src="require(`@/assets/svg/arrow.svg`)" alt="">
                        </div>
                    </div>
                </div>

                <div class="sm:mt-0 mt-6 cursor-pointer hover:bg-white duration-150 hover:text-mainRed border-2 border-mainRed bg-mainRed w-2/3 sm:w-96 text-white font-bold text-xs flex justify-center items-center uppercase h-16">
                    Добавить в корзину
                </div>
            </div>

            <div class="text-sm text-gray-400 mt-12">
                <span class="text-black font-medium">ID продукта:</span> 09832475
            </div>
        </div>
    </div>
</template>

<script>
export default {
    name: "Product"
}
</script>

<style scoped>

</style>
