import Vue from 'vue'
import Vuex from 'vuex'
import seriesData from '../views/dateMpa.js';

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    seriesData: seriesData,
  },
  mutations: {
    setSeriesData(state,data){
      state.seriesData = state.seriesData.map(item=>{
        if(item.name===data.name){
          item.value = data.value;
        }
        return item;
      })
    }
  },
  actions: {
  },
  modules: {
  }
})
