export const state = () => ({
    pass: false
})

export const mutations = {
    pass(state) {
      state.pass = !state.pass
    },
}  