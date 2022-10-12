import { ref } from "vue";
import axios from "axios";
import { store } from '@/store'

const error = ref(null)

const login = async (email, password) => {
    error.value = null

    // await axios.get('/sanctum/csrf-cookie')
    return await axios.post('/login', { email, password })
        .catch(err => {
            console.log(err)
            if (err.response.status === 422) error.value = 'Пароль/логин не совпадают с нашими записями'
            if (err.response.status === 429) error.value = 'Слишком много попыток. Попробуйте немного позже'
        })
}

const logout = async () => {
    // await axios.get('/sanctum/csrf-cookie')
    await axios.post('/logout')
    await store.dispatch('setUser', null)
}

const fetchUser = async () => {
    // await axios.get('/sanctum/csrf-cookie')
    return await axios.get('api/user').catch(err => {
        //
    })
}

const useAuth = () => {
    return { error, login, fetchUser, logout }
}

export default useAuth
