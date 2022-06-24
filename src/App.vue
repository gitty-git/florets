<template>
    <div>
        <nav class="uppercase w-full shadow">
            <div class="max-w-screen-xl m-0 m-auto items-center h-20 flex justify-between">
                <div class="">
                    <img class="w-20 mb-2" src="@/assets/svg/logo.svg" alt="">
                </div>
                <div class="text-xs">
                    <router-link to="#">Букеты</router-link>
                    <router-link to="#">О нас</router-link>
                    <router-link to="#">Корзина</router-link>
                </div>
            </div>
        </nav>
        <router-view/>
        <div class="max-w-screen-xl m-0 m-auto flex">
            <div class="w-1/3">
                <div>
                    Позвонить нам:
                </div>
                <div>
                    +7 (655) 12-34-34
                </div>
            </div>
            <div class="w-1/3">
                <div>
                    Мы в социальных сетях:
                </div>
                <div>
                    Instagram
                </div>
                <div>
                    Telegram
                </div>
                <div>
                    ВКонтакте
                </div>
            </div>
            <div class="w-1/3">
                <div>
                    Пользовательское соглашение:
                </div>
                <div>
                    Ознакомиться
                </div>
            </div>
        </div>
    </div>
</template>
