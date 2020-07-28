import Vue from "vue";
import Vuex from "vuex";
import archiveWeekService from "../services/archiveWeekService"
import itemService from "../services/itemService"

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    items: [],
    main_items: [],
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
    async loadMainItems({commit}){
      try{
        const response = await itemService.getItems()
        commit('setItems', response.data)

      } catch (err) {
        commit('handleError', err)
      }
    },
  },
  mutations: {
    setWeekItems (state, items) {
      state.items = items
    },
    setItems (state, main_items) {
      state.main_items = main_items
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
    main_items: state => state.main_items,
    error: state => state.error,
    loaded: state => state.loaded,
  },
  modules: {}
});
