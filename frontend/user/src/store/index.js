import Vue from "vue";
import Vuex from "vuex";
import {archiveWeekService} from "../services/archiveService"
import {itemService} from "../services/mainService"

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    items: [],
    main_items: [],
    currentWeek: '',
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
    changeWeek({commit}, week_id) {
      commit('setCurrentWeek', week_id)
    }
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
    setCurrentWeek (state, week){
      state.currentWeek = week
    }
  },
  getters: {
    items: state => state.items,
    main_items: state => state.main_items,
    currentWeek: state => state.currentWeek,
    error: state => state.error,
    loaded: state => state.loaded,
  },
  modules: {}
});
