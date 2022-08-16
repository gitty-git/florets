import { createApp } from 'vue'
import App from './App.vue'
import './registerServiceWorker'
import router from './router'
import { store } from './store/index'
import './assets/tailwind.css'
import axios from "axios";

axios.defaults.withCredentials = true;
process.env.NODE_ENV === 'development' ? axios.defaults.baseURL = 'http://127.0.0.1:8000/' : axios.defaults.baseURL = ''

createApp(App)
    .use(router)
    .use(store)
    .mount('#app')
