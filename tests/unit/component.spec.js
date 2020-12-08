import { shallowMount, createLocalVue } from '@vue/test-utils'
import Vuex from 'vuex'
import ReminderForm from '@/components/ReminderForm.vue'
import { ADD_EVENT, UPDATE_EVENT, CLOSE_FORM_MODAL } from '@/store/action-types'

const localVue = createLocalVue();
localVue.use(Vuex);

describe('ReminderForm.vue', () => {
  let state, actions, mutations, store;

  beforeEach(() => {
    state = {
      reminderForm: {
        entity: {}
      }
    }

    actions = {
      ADD_EVENT: jest.fn(),
      CLOSE_FORM_MODAL: jest.fn(),
      UPDATE_EVENT: jest.fn()
    };

    store = new Vuex.Store({
      state,
      actions,
      mutations
    });
  });

  it('ensures empty initial state', () => {
    const wrapper = shallowMount(ReminderForm, { store, localVue });
    const reminder = wrapper.vm.reminder;

    Object.keys(reminder).forEach(key => {
      const value = reminder[key];
      expect(value).toBeNull();
    });
  });

  it('ensures event data', async () => {
    const wrapper = shallowMount(ReminderForm, { store, localVue });
    const reminder = {
      dateTime: "2020-12-06T22:47:00-03:00",
      city: 'London',
      description: 'Reminder 1',
      color: "#000000",
    };

    await wrapper.setData({ reminder });
    const event = wrapper.vm.buildEvent();

    expect(event.dateTime).toBe(reminder.dateTime);
    expect(event.date).toBe("2020-12-06");
    expect(event.hour).toBe("22");
    expect(event.minute).toBe("47");
    expect(event.city).toBe(reminder.city);
    expect(event.description).toBe(reminder.description);
    expect(event.color).toBe(reminder.color);
  });

  it('ensures description max length', async () => {
    const spy = jest.spyOn(ReminderForm.methods, "validateForm");
    const wrapper = shallowMount(ReminderForm, { store, localVue });
    const reminder = {
      dateTime: "2020-12-06T22:47:00-03:00",
      city: 'London',
      description: 'This reminder has more than 30 characters',
      color: "#000000",
    };

    await wrapper.setData({ reminder });
    wrapper.vm.save();
    expect(spy).toHaveReturnedWith(false);
    expect(wrapper.vm.formValidations.description).toBe("max 30 characters");
  });

  it('ensures datetime required', async () => {
    const spy = jest.spyOn(ReminderForm.methods, "validateForm");
    const wrapper = shallowMount(ReminderForm, { store, localVue });
    const reminder = {
      dateTime: null,
      city: 'London',
      description: 'Reminder',
      color: "#000000",
    };

    await wrapper.setData({ reminder });
    wrapper.vm.save();
    expect(spy).toHaveReturnedWith(false);
    expect(wrapper.vm.formValidations.dateTime).toBe("required");
  });

  it('adds event', async () => {
    const wrapper = shallowMount(ReminderForm, { store, localVue });
    const reminder = {
      dateTime: "2020-12-06T22:47:00-03:00",
      city: 'London',
      description: 'Reminder 1',
      color: "#000000",
    };
  
    await wrapper.setData({ reminder });
    wrapper.vm.save();
  
    expect(actions[ADD_EVENT]).toHaveBeenCalled();
    expect(actions[CLOSE_FORM_MODAL]).toHaveBeenCalled();
  });

  it('updates event', async () => {
    const wrapper = shallowMount(ReminderForm, { store, localVue });
  
    state.reminderForm.entity = () => ({
      id: "1",
      dateTime: "2020-12-06T22:47:00-03:00",
      city: 'London',
      description: 'Reminder 1',
      color: "#000000",
    });
  
    await wrapper.setData({ reminder: { ...state.reminderForm.entity(), description: 'Reminder 2' } });
    wrapper.vm.save();

    expect(actions[UPDATE_EVENT]).toHaveBeenCalled();
    expect(actions[CLOSE_FORM_MODAL]).toHaveBeenCalled();
  });
});