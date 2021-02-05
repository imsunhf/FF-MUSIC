export default {
  namespaced: true,
  state: {
    energy: 0,
  },
  mutations: {
    setEnergy(state, energy) {
      state.energy = energy
    },
  },
  actions: {},
}
