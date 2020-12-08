<template>
  <div>
    <CalendarHeader :current-date="currentDate" />
    <Weekdays />
    <CalendarGrid :current-date="currentDate" />
    <ReminderForm v-if="formVisible" />
  </div>
</template>

<script>
import CalendarHeader from "./CalendarHeader";
import Weekdays from "./Weekdays";
import CalendarGrid from "./CalendarGrid";
import ReminderForm from "./ReminderForm";
import { mapState } from 'vuex'

export default {
  name: "Calendar",
  components: {
    CalendarHeader,
    Weekdays,
    CalendarGrid,
    ReminderForm,
  },

  computed: {
    ...mapState({
      currentDate: state => state.calendar.currentDate,
      formVisible: state => state.reminderForm.visible
    })
  }
};
</script>