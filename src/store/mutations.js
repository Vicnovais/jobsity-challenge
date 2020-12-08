import { NAV_MONTH, CREATE_EVENT, EDIT_EVENT, REMOVE_EVENT, REMOVE_ALL_EVENT, OPEN_MODAL, CLOSE_MODAL } from './mutation-types'
import _ from 'lodash'

export default {
    [NAV_MONTH]: (state, payload) => state.calendar.currentDate = payload,

    [CREATE_EVENT]: (state, payload) => state.calendar.events.push(payload),

    [EDIT_EVENT]: (state, payload) => {
        _.remove(state.calendar.events, t => t.id === payload.id);
        state.calendar.events.push(payload);
    },

    [REMOVE_EVENT]: (state, payload) => state.calendar.events = state.calendar.events.filter(t => t.id !== payload.id),

    [REMOVE_ALL_EVENT]: (state, payload) => state.calendar.events = state.calendar.events.filter(t => t.date !== payload.date),

    [OPEN_MODAL]: (state, payload) => {
        state.reminderForm.entity = payload;
        state.reminderForm.visible = true;
    },

    [CLOSE_MODAL]: (state) => {
        state.reminderForm.entity = null;
        state.reminderForm.visible = false;
    }
};