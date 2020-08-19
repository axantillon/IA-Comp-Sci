import Vue from "vue";
import Vuex from "vuex";
import {archiveWeekService} from "../services/mainServices"

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    items: [],
    loaded: false, //Set default value to false
    error: '',
  },
  
  actions: {
    async loadWeekItems({commit}, week_id) {
      try{
        const response = await archiveWeekService.getWeekItems(week_id);
        commit('setWeekItems', response.data)
        commit('loadedItems', true)

      } catch (err) {
        commit('handleError', err)
      }
    },
  },

  mutations: {
    setWeekItems (state, items) {
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
    items: state => state.items,
    error: state => state.error,
    loaded: state => state.loading,
  },
  modules: {}
});
