import Vue from "vue";
import Vuex from "vuex";
import ItemService from "../services/ItemService"

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    things: [],
    loaded: false, //Set default value to false
    error: '',
  },
  actions: {
    async loadThings({commit}) {
      try{
        const response = await ItemService.getItems();
        commit('setThings', response.data)
        commit('loadedThings', true)

      } catch (err) {
        commit('handleError', err)
      }
    }
  },
  mutations: {
    setThings (state, things) {
      state.things = things
    },
    handleError (state, error) {
      state.error = error
    },
    loadedThings (state, loaded) {
      state.loaded = loaded
    }
  },
  getters: {
    things: state => state.things,
    error: state => state.error,
    loaded: state => state.loaded
  },
  modules: {}
});
