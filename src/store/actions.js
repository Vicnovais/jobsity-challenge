import { NAV_NEXT_MONTH, NAV_PREV_MONTH, ADD_EVENT, DELETE_EVENT, DELETE_ALL_EVENT, OPEN_FORM_MODAL, CLOSE_FORM_MODAL, UPDATE_EVENT } from './action-types'
import { NAV_MONTH, CREATE_EVENT, REMOVE_EVENT, REMOVE_ALL_EVENT, OPEN_MODAL, CLOSE_MODAL, EDIT_EVENT } from './mutation-types'
import dayjs from "dayjs";

export default {
    [NAV_NEXT_MONTH]: ({ commit }, payload) => {
        const nextMonth = dayjs(payload).add(1, "month");
        commit(NAV_MONTH, nextMonth);
    },

    [NAV_PREV_MONTH]: ({ commit }, payload) => {
        const prevMonth = dayjs(payload).subtract(1, "month");
        commit(NAV_MONTH, prevMonth);
    },

    [ADD_EVENT]: ({ commit }, payload) => {
        commit(CREATE_EVENT, payload);
    },

    [UPDATE_EVENT]: ({ commit }, payload) => {
        commit(EDIT_EVENT, payload);
    },

    [DELETE_EVENT]: ({ commit }, payload) => {
        commit(REMOVE_EVENT, payload);
    },

    [DELETE_ALL_EVENT]: ({ commit }, payload) => {
        commit(REMOVE_ALL_EVENT, payload);
    },

    [OPEN_FORM_MODAL]: ({ commit }, payload) => {
        commit(OPEN_MODAL, payload);
    },

    [CLOSE_FORM_MODAL]: ({ commit }) => {
        commit(CLOSE_MODAL);
    }
};