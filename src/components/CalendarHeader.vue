<template>
  <header>
    <h1>{{ month }}</h1>
    <div class="calendarheader-actions">
      <button class="calendarheader-button btn-wide btn-flex blue" @click="newReminder">
        <calendar-icon></calendar-icon>
        <span>Add Reminder</span>
      </button>
      <button class="calendarheader-button btn-round btn-flex white" @click="prev">
        <chevron-left-icon></chevron-left-icon>
      </button>
      <button class="calendarheader-button btn-round btn-flex white" @click="next">
        <chevron-right-icon></chevron-right-icon>
      </button>
    </div>
  </header>
</template>

<script>
import { mapActions } from "vuex";
import { CalendarIcon, ChevronLeftIcon, ChevronRightIcon } from 'vue-feather-icons'
import { NAV_NEXT_MONTH, NAV_PREV_MONTH, OPEN_FORM_MODAL } from "../store/action-types";

export default {
  name: "CalendarHeader",

  components: {
    CalendarIcon,
    ChevronLeftIcon,
    ChevronRightIcon
  },

  props: {
    currentDate: {
      type: Object,
      required: true
    }
  },

  computed: {
    month() {
      return this.currentDate.format("MMMM YYYY");
    }
  },

  methods: {
    ...mapActions([NAV_NEXT_MONTH, NAV_PREV_MONTH, OPEN_FORM_MODAL]),

    prev() {
      this[NAV_PREV_MONTH](this.currentDate);
    },

    next() {
      this[NAV_NEXT_MONTH](this.currentDate);
    },

    newReminder() {
      this[OPEN_FORM_MODAL](null);
    }
  }
};
</script>

<style scoped lang="less">
@import "../styles/variables.less";
@import "../styles/mixins.less";

header {
  .flex(row, space-between);
  height: 70px;
  padding: 0 20px;

  h1 {
    font-family: @font-family;
    margin: 0;
    font-size: 1.7em;
  }

  .calendarheader-actions {
    .flex(row, space-between);

    & > :not(:last-child) {
      margin-right: 10px;
    }

    .calendarheader-button {
      .flex;
      outline: none;
      border: none;
      cursor: pointer;
      text-transform: uppercase;

      &.blue {
        background-color: @blue;
        color: @white;

        &:hover, &:focus {
          border: 2px solid darken(@blue, 30%);
        }
      }

      &.white {
        background-color: @white;
      }

      &.btn-wide {
        width: 150px;
        height: 40px;
        border-radius: 20px;

        svg {
          margin-right: 10px;
        }
      }

      &.btn-round {
        width: 40px;
        height: 40px;
        border: 1px solid @grey-darkborder;
        border-radius: 50%;
      }

      &:hover, &:focus {
        border: 2px solid @black;
      }

      svg {
        width: 17px;
        height: 17px;
      }

      span {
        font-family: @font-family;
      }
    }
  }
}
</style>