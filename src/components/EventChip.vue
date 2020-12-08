<template>
  <div @click="openEvent" class="event-chip" :style="{ 'background-color': event.color }">
    <span :style="{ color: textColor }">{{ formattedTime }}</span>
    <span :style="{ color: textColor }" class="event-description">{{ event.description }}</span>
    <button @click.stop="removeEvent">
      <trash-2-icon :style="{ color: textColor }"></trash-2-icon>
    </button>
  </div>
</template>

<script>
import _ from 'lodash'
import { Trash2Icon } from 'vue-feather-icons'
import { mapActions } from 'vuex'
import { OPEN_FORM_MODAL, DELETE_EVENT } from '../store/action-types'

export default {
  name: "EventChip",

  components: {
    Trash2Icon
  },

  props: {
    event: {
      type: Object,
      required: true
    }
  },

  computed: {
    formattedTime() {
      return `${ _.padStart(this.event.hour, 2, '0') }:${ _.padStart(this.event.minute, 2, '0') }`;
    },

    textColor() {
      const color = (this.event.color.charAt(0) === '#') ? this.event.color.substring(1, 7) : this.event.color;
      const r = parseInt(color.substring(0, 2), 16);
      const g = parseInt(color.substring(2, 4), 16);
      const b = parseInt(color.substring(4, 6), 16);
      return (((r * 0.299) + (g * 0.587) + (b * 0.114)) > 186) ?
        '#000' : '#fff';
    }
  },

  methods: {
    ...mapActions([OPEN_FORM_MODAL, DELETE_EVENT]),

    openEvent() {
      this[OPEN_FORM_MODAL](this.event);
    },

    removeEvent() {
      this[DELETE_EVENT](this.event);
    }
  }
};
</script>

<style scoped lang="less">
@import "../styles/mixins.less";
@import "../styles/variables.less";

.event-chip {
  .flex(row, space-between);
  width: 100%;
  height: 25px;
  border: 1px solid @black;
  border-radius: 40px;
  margin-bottom: 3px;
  padding: 0 10px;
  font-size: 0.8em;
  cursor: pointer;

  button {
    outline: none;
    color: @white;
    background-color: transparent;
    border: none;
    cursor: pointer;
    padding: 0;
    height: 15px;

    svg {
      height: 14px;
      width: 14px;
    }
  }

  .event-description {
    .text-overflow;
    max-width: calc((100vw/7) - 100px);
    margin-right: auto;
    margin-left: 5px;
  }
}

</style>