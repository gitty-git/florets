import { createApp } from 'vue'
import App from './App.vue'
import './registerServiceWorker'
import router from './router'
import { store } from './store/index'
import './assets/tailwind.css'
import { products } from "@/products";

let pds = 123

createApp(App)
    .use(router)
    .use(store)
    .mount('#app')
