import Vue from 'vue'
import Vuex from 'vuex'
import axios from 'axios'

let _api = axios.create({
  baseURL: "//localhost:3000/api"
})

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    calendarBlocks: [],
    activeBlock: {},
    postIts: [],
    // activePostIt: {}
    // might need this later for onMouse
    // need to find a weather good api

  },
  mutations: {
  },
  actions: {
  },
  modules: {
  }
})
