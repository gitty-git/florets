const state = () => ({
    userData: null,
})
const getters = {
    getUser (state) {
        return state.userData
    }
}
const mutations = {
    setUser(state, payload) {
        state.userData = payload
    }
}
const actions = {
    setUser(context, ...userData) {
        context.commit('setUser', ...userData)
    }
}

export default {
    state,
    actions,
    mutations,
    getters
}

