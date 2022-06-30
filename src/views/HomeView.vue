<template>
    <!-- Баннер -->
    <div class="w-full mb-16 shadow-md shadow-gray-200">
        <div class="bg-gradient-to-t from-gray-50 w-full left-0">
            <div class="m-0 m-auto max-w-screen-xl flex h-full">
                <div class="flex justify-center w-1/2 flex-col pr-20">
                    <div class="font-display -ml-1.5 leading-snug text-5xl">Быстрая доставка букетов</div>

                    <div class="my-6">
                        <svg width="80" height="54" viewBox="0 0 43 27" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <path fill-rule="evenodd" clip-rule="evenodd"
                                  d="M30.3854 12.8158C30.3981 12.7197 30.3306 12.6315 30.2346 12.6188C25.4653 11.9851 12.8194 11.427 0.326099 14.2559C0.231606 14.2773 0.172348 14.3712 0.193744 14.4657C0.215141 14.5602 0.309089 14.6195 0.403582 14.5981C12.8476 11.7803 25.4504 12.337 30.1884 12.9666C30.2844 12.9793 30.3726 12.9118 30.3854 12.8158Z"
                                  fill="#F7A9B4"/>
                            <path d="M42.4539 13.0258C34.9266 10.7004 29.8306 12.1333 27.9052 12.5818C29.7488 14.6491 34.8179 15.2026 38.8625 14.8371C44.1014 14.021 43.003 13.3732 42.4539 13.0258Z"
                                  fill="#F7A9B4"/>
                            <path d="M28.9649 17.1626C27.1107 12.6967 22.9203 12.2374 21.5974 12.2357C22.1237 14.6234 24.4168 16.4686 26.9037 17.3231C28.8363 17.8347 29.2012 17.6173 28.9649 17.1626Z"
                                  fill="#F7A9B4"/>
                            <path d="M34.2407 8.63133C26.397 8.36655 23.6 10.8237 22.081 12.0854C24.6666 13.1026 29.4256 12.5475 32.9877 10.7175C35.6293 9.19847 34.8892 8.69518 34.2407 8.63133Z"
                                  fill="#F7A9B4"/>
                            <path d="M17.9172 8.51987C14.1343 10.2959 11.363 12.3606 11.7272 13.1314C12.4765 12.9246 15.4532 13.0874 19.2361 11.3114C23.0189 9.5353 25.306 7.43393 25.2052 6.567C24.6851 6.0984 21.7 6.74382 17.9172 8.51987Z"
                                  fill="#F7A9B4"/>
                        </svg>
                    </div>

                    <div class="font-serif leading-relaxed text-gray-500">Здесь будет текст, который очень важен, его никто не читает. Зюганов,
                        <span class="font-bold">Жириновский</span>. Джоч - мудак, отомстил за папу!
                    </div>
                </div>
                <div class="w-1/2">
                    <img class="" :src="require(`@/assets/images/bouquet-banner.png`)" alt="">
                </div>
            </div>
        </div>
    </div>

    <!-- Букеты -->
    <div class="w-full mb-16">
        <div class="max-w-screen-xl m-0 m-auto">
            <div class="mb-10">
                <div class="font-medium mb-1 text-2xl uppercase">
                    Букеты
                </div>
                <div class="text-sm text-gray-500">
                    Выберете букет, который вам нравится
                </div>
            </div>

            <div class="uppercase mb-6 flex text-xs">
                <div class="text-mainRed mr-12 cursor-pointer border-b border-mainRed">Все</div>
                <div class="mr-12 cursor-pointer">Большие</div>
                <div class="mr-12 cursor-pointer">Средние</div>
                <div class="mr-12 cursor-pointer">Маленькие</div>
            </div>

            <div class="grid-cols-3 grid gap-12">
                <Card img="b-1.png" name="Название букета" price="3 500 ₽"/>
                <Card img="b-2.png" name="Название букета" price="3 500 ₽"/>
                <Card img="b-3.png" name="Название букета" price="3 500 ₽"/>
                <Card img="b-2.png" name="Название букета" price="3 500 ₽"/>
                <Card img="b-3.png" name="Название букета" price="3 500 ₽"/>
                <Card img="b-1.png" name="Название букета" price="3 500 ₽"/>
                <Card img="b-1.png" name="Название букета" price="3 500 ₽"/>
                <Card img="b-2.png" name="Название букета" price="3 500 ₽"/>
                <Card img="b-3.png" name="Название букета" price="3 500 ₽"/>
            </div>
        </div>
    </div>

    <!-- О нас -->
    <div class="bg-gradient-to-b from-gray-100 shadow-inner shadow-gray-200 pt-16 mb-20">

        <div class="max-w-screen-xl m-0 m-auto">
            <div class="mb-12">
                <div class="font-medium mb-1 text-2xl uppercase">
                    О нас
                </div>
                <div class="text-sm text-gray-500">
                    Инфрмация об этом интернет-магазине
                </div>
            </div>

            <div class="flex">
                <div class="w-1/3 font-bold font-display text-6xl -ml-1.5 -mt-2 text-mainRed">Кто мы?</div>
                <div class="w-2/3 font-serif leading-loose text-gray-500 text-xl">
                    <span class="font-bold">Florets </span>(/ ˈflɒrɪts / - ударение на “о”), предлагает бла бла взятый с потолка псевдо-латинский
                    набор слов, но это не совсем так. Его корни уходят в один фрагмент классической <span
                        class="text-mainRed font-bold">бесплатная
                    доставка</span> двух тысячелетий назад. Ричард МакКлинток, профессор латыни из колледжа Hampden-Sydney, штат Вирджиния, взял
                    одно из самых странных слов в Lorem Ipsum, "consectetur", и занялся его поисками в классической латинской литературе.
                    В результате он нашёл неоспоримый первоисточник
                </div>
            </div>
        </div>
    </div>
</template>

<script>
// @ is an alias to /src
import Card from "@/components/Card";

export default {
    name: 'HomeView',
    components: { Card, }
}
</script>
