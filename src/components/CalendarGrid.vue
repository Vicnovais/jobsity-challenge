<template>
  <ol :style="{ 'grid-template-rows': rowHeight }">
    <li
      v-for="day in days"
      :key="day.date"
      :class="{
        'calendargrid-date--out': day.month !== currentMonth,
        'calendargrid-date--today': day.date === today
      }"
    >
      <div class="day-wrapper">
        <span>{{ day.formatted }}</span>
        <button class="remove-all" v-if="day.events.length > 0" @click="removeAll(day.date)">
          <trash-2-icon></trash-2-icon>
        </button>
      </div>
      <div class="event-wrapper">
        <EventChip v-for="event in day.events" :key="event.id" :event="event" />
      </div>
    </li>
  </ol>
</template>

<script>
import dayjs from 'dayjs'
import weekday from 'dayjs/plugin/weekday'
import weekOfYear from 'dayjs/plugin/weekOfYear'
import _ from 'lodash'
import { Trash2Icon } from 'vue-feather-icons'
import EventChip from './EventChip'
import { mapState, mapActions } from 'vuex'
import { DELETE_ALL_EVENT } from '../store/action-types'

dayjs.extend(weekday);
dayjs.extend(weekOfYear);

export default {
  name: "CalendarGrid",

  components: {
    EventChip,
    Trash2Icon
  },

  props: {
    currentDate: {
      type: Object,
      required: true,
    },
  },

  computed: {
    ...mapState({
      events: state => state.calendar.events
    }),

    rowHeight() {
      return `repeat(auto-fill, calc((100vh - 70px - 30px - 7px)/${ this.numOfWeeks }))`;
    },

    numOfWeeks() {
      return (this.prevMonthDays.length + this.monthDays.length + this.nextMonthDays.length) / 7;
    },

    days() {
      return [
        ...this.prevMonthDays,
        ...this.monthDays,
        ...this.nextMonthDays
      ];
    },

    today() {
      return dayjs().format("YYYY-MM-DD");
    },

    currentMonth() {
      return this.currentDate.format("M");
    },

    currentYear() {
      return this.currentDate.format("YYYY");
    },

    daysInMonth() {
      return dayjs(this.currentDate).daysInMonth();
    },

    firstCurrMonthDay() {
      return dayjs(`${this.currentYear}-${this.currentMonth}-01`);
    },

    lastCurrMonthDay() {
      return dayjs(`${this.currentYear}-${this.currentMonth}-${this.monthDays.length}`);
    },

    monthDays() {
      let daysArr = [];

      for (let i = 0; i < this.daysInMonth; i++) {
        const date = dayjs(`${this.currentYear}-${this.currentMonth}-${i + 1}`);
        daysArr.push(this.buildDate(date));
      }

      return daysArr;
    },

    prevMonthDays() {
      const prevMonth = this.firstCurrMonthDay.subtract(1, "month");
      const year = prevMonth.year();
      const numOfPrevDays = this.getWeekday(this.firstCurrMonthDay);
      const firstSunday = dayjs(this.monthDays[0].date).subtract(numOfPrevDays, "day").date();
      let prevDaysArr = [];

      for (let i = 0; i < numOfPrevDays; i++) {
        const date = dayjs(`${year}-${prevMonth.month() + 1}-${firstSunday + i}`);
        prevDaysArr.push(this.buildDate(date));
      }

      return prevDaysArr;
    },

    nextMonthDays() {
      const nextMonth = this.firstCurrMonthDay.add(1, "month");
      const year = nextMonth.year();
      const lastDayOfTheMonthWeekday = this.getWeekday(this.lastCurrMonthDay);
      const numOfNextDays = 6 - lastDayOfTheMonthWeekday;
      let nextDaysArr = [];

      for (let i = 0; i < numOfNextDays; i++) {
        const date = dayjs(`${year}-${nextMonth.month() + 1}-${i + 1}`);
        nextDaysArr.push(this.buildDate(date));
      }

      return nextDaysArr;
    }
  },

  methods: {
    ...mapActions([DELETE_ALL_EVENT]),

    getWeekday(date) {
      return dayjs(date).weekday();
    },

    buildDate(date) {
      return {
        date: date.format("YYYY-MM-DD"),
        formatted: date.format("D"),
        month: date.format("M"),
        events: _.sortBy(this.events.filter(t => t.date === date.format("YYYY-MM-DD")), t => [t.hour, t.minute]) 
      }
    },

    removeAll(date) {
      this[DELETE_ALL_EVENT]({ date });
    }
  }
};
</script>

<style scoped lang="less">
@import "../styles/variables.less";
@import "../styles/mixins.less";

ol {
  display: grid;
  grid-template-columns: repeat(7, 1fr);
  list-style: none;
  background-color: @grey-darkborder;
  gap: 1px;
  padding: 1px;
  height: calc(100vh - 100px);
  margin: 0;

  li {
    background-color: @white;

    span {
      .flex;
      margin: 10px;
      font-family: @font-family;
      font-size: 0.95em;
      width: 30px;
      height: 30px;
    }

    &.calendargrid-date--out {
      background-color: @grey-background;

      span {
        opacity: .3;
      }
    }

    &.calendargrid-date--today {
      span {
        background-color: @blue;
        border-radius: 50%;
        color: #fff;
      }
    }

    .event-wrapper {
      padding: 0 5px;
      max-height: calc(100% - 60px);
      overflow-y: auto;
    }

    .day-wrapper {
      .flex(row, space-between);

      .remove-all {
        outline: none;
        background-color: transparent;
        border: 1px solid @black;
        text-align: center;
        text-transform: uppercase;
        font-size: 0.7em;
        border-radius: 50%;
        margin-right: 10px;
        width: 24px;
        height: 24px;
        padding: 0;
        cursor: pointer;
        transition: background-color .3s ease-out;

        &:hover {
          background-color: @blue;
          color: @white;
        }

        svg {
          height: 12px;
          width: 12px;
        }
      }
    }
  }
}
</style>