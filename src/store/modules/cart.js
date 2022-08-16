const state = () => ({
    items: [],
})
const mutations = {
    setCart(state, payload) {
        state.items = payload

    }
}
const actions = {
    setCart(context, { price, amount }) {
        context.commit('setCart', { price, amount })
    }
}

export default {
    state,
    actions,
    mutations,
}

