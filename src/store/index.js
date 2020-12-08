import Vue from 'vue'
import Vuex from 'vuex'
import mutations from './mutations'
import actions from './actions'
import dayjs from "dayjs";

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    reminderForm: {
      visible: false,
      entity: {
        id: null,
        dateTime: null,
        city: null,
        description: null,
        color: null
      }
    },

    calendar: {
      currentDate: dayjs(),
      events: []
    }
  },

  mutations,
  actions
});