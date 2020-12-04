import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store( {
  state: {
    ReaderID: ''
  },
  mutations: {
    getReaderId(state,id) {
      state.ReaderID = id
    },
  }
})