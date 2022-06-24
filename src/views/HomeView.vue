<template>
    <!-- Баннер -->
    <div class="w-full shadow-md">
        <div class="bg-gradient-to-t from-gray-100 w-full left-0">
            <div class="m-0 m-auto max-w-screen-xl flex h-full">
                <div class="flex justify-center w-1/2 flex-col pr-12">
                    <div>Быстрая доставка букетов</div>
                    <div>-</div>
                    <div>Здесь будет текст, который очень важен, его никто не читает. Зюганов, Жириновский. Джоч - мудак, отомстил за папу!</div>
                </div>
                <div class="w-1/2">
                    <img class="" :src="require(`@/assets/images/bouquet-banner.png`)" alt="">
                </div>
            </div>
        </div>
    </div>

    <!-- Букеты -->
    <div class="w-full mp-20">
        <div class="max-w-screen-xl m-0 m-auto">
            <div>
                <div>
                    Букеты
                </div>
                <div>
                    Выберете букет, который вам нравится
                </div>
            </div>

            <div class="flex flex-wrap">
                <Card img="b-1.png" name="Название букета" price="3500"/>
                <Card img="b-2.png" name="Название букета" price="3500"/>
                <Card img="b-3.png" name="Название букета" price="3500"/>

                <Card img="b-2.png" name="Название букета" price="3500"/>
                <Card img="b-3.png" name="Название букета" price="3500"/>
                <Card img="b-1.png" name="Название букета" price="3500"/>
            </div>
        </div>
    </div>

    <!-- О нас -->
    <div class="bg-gradient-to-b shadow-inner from-gray-100">
        <div class="max-w-screen-xl m-0 m-auto">
            <div>
                <div>О нас</div>
                <div>Инфрмация об этом интернет-магазине</div>
            </div>

            <div class="flex">
                <div class="w-1/3">Кто мы?</div>
                <div class="w-2/3">Florets (/ ˈflɒrɪts / - ударение на “о”), предлагает бла бла взятый с потолка псевдо-латинский набор слов, но это не совсем так. Его корни уходят в один фрагмент классической бесплатная доставка двух тысячелетий назад. Ричард МакКлинток, профессор латыни из колледжа Hampden-Sydney, штат Вирджиния, взял одно из самых странных слов в Lorem Ipsum, "consectetur", и занялся его поисками в классической латинской литературе. В результате он нашёл неоспоримый первоисточник </div>
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
