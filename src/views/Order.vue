<template>
    <div class="px-6 m-0 lg:pt-16 pt-6 md:pb-20 pb-12 m-auto max-w-screen-xl">
        <div class="font-display text-2xl lg:text-4xl">Оформление заказа</div>
        <div class="font-sm text-gray-400 mt-4 mb-12">3 товара на сумму 3 500 ₽</div>

        <div class="px-6 max-w-screen-sm m-0 m-auto">
            <div class="grid md:grid-cols-2 gap-x-3">
                <Input header="Имя:"/>
                <Input header="Телефон:"/>
            </div>

            <Input header="Улица, дом:"/>

            <div class="flex text-sm md:flex-row flex-col justify-center items-center mt-12">
                <div class="mb-6 w-full">Выберете способ оплаты:</div>
                <div class="md:ml-6 flex font-medium">
                    <div class="cursor-pointer md:mr-6 mr-12 md:px-6 px-4 py-2 text-sm rounded-full border-2 border-mainRed text-mainRed uppercase">Наличными</div>
                    <div class="cursor-pointer md:px-6 px-4 py-2 text-sm rounded-full border-2 border-gray-150 uppercase">Картой</div>
                </div>
            </div>

            <div class="flex text-sm md:flex-row flex-col justify-center items-center mt-12">
                <div class="w-full pr-12 md:mb-0 mb-6">Выберете желаемое время доставки:</div>
                <div class="md:text-xl w-full justify-center font-serif flex px-12 h-12 flex items-center cursor-pointer px-6 py-2 border-2 border-gray-150">3 сентября, 18:00</div>
            </div>

            <div class="w-full flex sm:mt-24 mt-16 mb-12 justify-center">
                <router-link to="#">
                    <div class="uppercase hover:bg-white hover:text-mainRed duration-150 cursor-pointer border-2 border-mainRed py-6 bg-mainRed font-medium text-white px-12">
                        Подтвердить
                    </div>
                </router-link>
            </div>
        </div>
    </div>
</template>

<script>
import Input from "@/components/Input";

export default {
    components: { Input },
    name: "Order"
}
</script>

<style scoped>

</style>
