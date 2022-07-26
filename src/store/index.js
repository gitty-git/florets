import { createStore } from 'vuex'

export const store = createStore({
    state () {
        return {
            cart: 0
        }
    },
    mutations: {
        setCart(state, payload)  {
            state.cart = payload

        }
    },
    actions: {
        setCart(context, { price, amount }) {
            context.commit('setCart', { price, amount })
        }
    }
})
