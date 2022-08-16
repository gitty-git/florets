import { createStore } from 'vuex'
import cart from './modules/cart'
import user from './modules/user'

export const store = createStore({
    modules: {
        cart,
        user
    },
})

// export const store = createStore({
//     state () {
//         return {
//             cart: 0
//         }
//     },
//     mutations: {
//         setCart(state, payload)  {
//             state.cart = payload
//
//         }
//     },
//     actions: {
//         setCart(context, { price, amount }) {
//             context.commit('setCart', { price, amount })
//         }
//     }
// })
