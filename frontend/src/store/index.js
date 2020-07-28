import Vue from "vue";
import Vuex from "vuex";
import archiveWeekService from "../services/archiveWeekService"

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    items: [],
    loaded: false, //Set default value to false
    error: '',
  },
  actions: {
    async loadItems({commit}, week_id) {
      try{
        const response = await archiveWeekService.getWeekItems(week_id);
        commit('setItems', response.data)
        commit('loadedItems', true)

      } catch (err) {
        commit('handleError', err)
      }
    },
  },
  mutations: {
    setItems (state, items) {
      state.items = items
    },
    handleError (state, error) {
      state.error = error
    },
    loadedItems (state, loaded) {
      state.loaded = loaded
    },
  },
  getters: {
    items: state => state.titems,
    error: state => state.error,
    loaded: state => state.loaded,
  },
  modules: {}
});
