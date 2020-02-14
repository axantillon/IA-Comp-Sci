import Vue from "vue";
import Vuex from "vuex";
import ItemService from "../services/ItemService"

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    things: []
  },
  actions: {
    async loadThings({commit}) {
    const response = await ItemService.getItems();
    commit('setThings', response.data)
    }
  },
  mutations: {
    setThings (state, things) {
      state.things = things
    }
    
  },
  getters: {
    things: state => state.things
  },
  modules: {}
});
