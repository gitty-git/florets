import { createStore } from 'vuex'

export const store = createStore({
    state () {
        return {
            count: 0
        }
    },
    mutations: {
        setCart(state, payload)  {
            state.count = payload

        }
    },
    actions: {
        setCart(context, { price, count }) {
            context.commit('setCart', { price, count })
        }
    }
})
