<template>
  <div class="modal-blockout">
    <div class="modal-body">
      <div class="header">
        <h1>{{ title }}</h1>
        <div class="color-wrapper">
          <VSwatches
            v-model="reminder.color"
            shapes="circles"
            swatch-size="24"
            :trigger-style="{ width: '24px', height: '24px', border: '1px solid #000' }"
          />
          <span>Color</span>
        </div>
      </div>
      <form>
        <div class="input-wrapper">
          <span>Date/Time</span>
          <Datetime
            v-model="reminder.dateTime"
            type="datetime"
            :week-start="7"
            placeholder="Click to select date/time"
            data-field="datetime"
            format="MM/dd/yyyy HH:mm"
          />
          <div class="validation" v-if="formValidations.dateTime">{{ formValidations.dateTime }}</div>
        </div>
        <div class="input-wrapper">
          <span>Description</span>
          <input
            v-model.trim="reminder.description"
            type="text"
            maxlength="30"
            placeholder="Reminder description"
            data-field="description"
          />
          <div class="validation" v-if="formValidations.description">{{ formValidations.description }}</div>
        </div>
        <div class="input-wrapper">
          <span>City</span>
          <input
            v-model.trim="reminder.city"
            type="text"
            placeholder="Enter the city"
            data-field="city"
          />
        </div>
        <div class="form-footer">
          <WeatherForecast
            :dateTime="reminder.dateTime"
            :city="reminder.city"
          />
          <button type="submit" class="cancel-btn" @click.prevent="cancel">
            Cancel
          </button>
          <button type="submit" class="save-btn" @click.prevent="save">
            Save
          </button>
        </div>
      </form>
    </div>
  </div>
</template>

<script>
import { Datetime } from "vue-datetime";
import VSwatches from "vue-swatches";
import dayjs from "dayjs";
import _ from "lodash";
import WeatherForecast from "./WeatherForecast";
import { mapActions, mapState } from "vuex";
import { ADD_EVENT, UPDATE_EVENT, CLOSE_FORM_MODAL } from "../store/action-types";

export default {
  name: "ReminderForm",
  components: {
    Datetime,
    WeatherForecast,
    VSwatches,
  },

  created() {
    this.setInitialData();
  },

  data() {
    return {
      reminder: {
        dateTime: null,
        city: null,
        description: null,
        color: null,
      },

      formValidations: {
        dateTime: null,
        description: null
      }
    };
  },

  computed: {
    title() {
      return this.reminder.id ? "Edit Reminder" : "New Reminder";
    }
  },

  methods: {
    ...mapActions([ADD_EVENT, UPDATE_EVENT, CLOSE_FORM_MODAL]),
    ...mapState({
      entity: state => state.reminderForm.entity
    }),

    setInitialData() {
      if (this.entity()) this.reminder = this.entity();
    },

    save() {
      const validateForm = this.validateForm();
      if (!validateForm) return false;

      if (this.reminder.id) this[UPDATE_EVENT]({ ...this.buildEvent(), id: this.reminder.id })
      else this[ADD_EVENT](this.buildEvent());
      this[CLOSE_FORM_MODAL]();
    },

    cancel() {
      this[CLOSE_FORM_MODAL]();
    },

    buildEvent() {
      const parsedDate = dayjs(this.reminder.dateTime);

      return {
        id: _.uniqueId(),
        dateTime: this.reminder.dateTime,
        date: parsedDate.format("YYYY-MM-DD"),
        hour: parsedDate.format("HH"),
        minute: parsedDate.format("mm"),
        city: this.reminder.city,
        description: this.reminder.description,
        color: this.reminder.color || "#ffffff",
      };
    },

    validateForm() {
      const dateTime = this.reminder.dateTime;
      const description = this.reminder.description;
      const isValid = !!dateTime && (!description || (description && description.length <= 30));
      if (isValid) return true;

      if (!dateTime) this.formValidations.dateTime = "required";
      if (description && description.length > 30) this.formValidations.description = "max 30 characters";
      return false;
    }
  },
};
</script>

<style scoped lang="less">
@import "../styles/variables.less";
@import "../styles/mixins.less";

.modal-blockout {
  position: fixed;
  background-color: @glasspane;
  width: 100vw;
  height: 100vh;
  z-index: 2;
  top: 0;
  left: 0;

  .modal-body {
    .flex(column, flex-start);
    position: absolute;
    width: 70%;
    max-width: 600px;
    height: 60%;
    min-height: 450px;
    background-color: @white;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    border: 1px solid @grey-lightborder;
    box-shadow: @shadow-depth-2;
    border-radius: 15px;

    .header {
      .flex(row, space-between);
      padding: 40px;
      width: 100%;

      h1 {
        font-family: @font-family;
        font-size: 1.7em;
        margin: 0;
        width: 100%;
      }

      .color-wrapper {
        .flex(row);
        height: 40px;
        border-radius: 30px;
        border: 1px solid @grey-darkborder;
        padding: 0 12px;

        .vue-swatches {
          height: 24px;
          margin-right: 10px;
        }

        span {
          font-family: @font-family;
        }
      }
    }

    form {
      .flex(column);
      flex: 1;
      width: 100%;
      padding: 0 40px 40px;

      .input-wrapper {
        width: 100%;
        height: 50px;
        font-size: 0.7em;
        position: relative;

        &:not(:last-child) {
          margin-bottom: 25px;
        }

        &.modal-footer {
          margin-top: auto;
        }

        span {
          display: block;
          text-transform: uppercase;
          color: @blue;
          font-family: @font-family;
          font-size: 1.1em;
        }

        input {
          border: none;
          border-bottom: 1px solid @black;
          width: 100%;
          outline: none;
          height: 40px;

          &:focus {
            border-bottom: 1px solid @blue;
          }
        }

        .validation {
          position: absolute;
          right: 0;
          top: 50%;
          border: 1px solid @red;
          padding: 2px 4px;
          color: @red;
          font-size: 1em;
          text-transform: uppercase;
          font-family: @font-family;
        }
      }

      .form-footer {
        .flex(row, space-between);
        width: 100%;
        margin-top: auto;
        height: 55px;

        button {
          outline: none;
          border: none;
          cursor: pointer;
          text-transform: uppercase;
          width: 100px;
          height: 40px;
          border-radius: 20px;

          &.save-btn {
            background-color: @blue;
            color: @white;
          }

          &.cancel-btn {
            border: 2px solid @black;
            background-color: @white;
          }

          &:hover,
          &:focus {
            border: 2px solid darken(@blue, 30%);
          }
        }
      }
    }
  }
}
</style>

<style lang="less">
@import "../styles/variables.less";

.vdatetime {
  .vdatetime-input {
    width: 100%;
    height: 40px;
    cursor: pointer;
    border: none;
    border-bottom: 1px solid @black;
  }
}
.vdatetime-overlay {
  border-radius: 15px;
  background-color: @glasspane;
}
</style>