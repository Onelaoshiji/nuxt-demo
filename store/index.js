export default {
  state: () => ({
    active: 1
  }),
  mutations: {
    set_active(state, value) {
      state.active = value;
    }
  },
  actions: {
    SetActive({ commit }, value) {
      commit("set_active", value);
    },
  }
};
