<template>
  <div class="forecast">
    <div class="loading" v-if="loading"></div>
    <span class="weather" v-else-if="hasData && !loading" :class="{ error: status === 'error' }">{{ forecast }}</span>
    <span class="placeholder" v-else>Provide a date and a city</span>
  </div>
</template>

<script>
import WeatherForecastAPI from '../api/weather.forecast.api'

export default {
  name: "WeatherForecast",

  props: {
    dateTime: {
      type: String
    },

    city: {
      type: String
    }
  },

  created() {
    this.weatherForecastAPI = new WeatherForecastAPI();
    this.throttle = null;
  },

  data() {
    return {
      loading: false,
      forecast: null,
      status: null
    }
  },

  watch: {
    dateTime: {
      immediate: true,
      handler: function () {
        this.onChange();
      },
    },

    city: {
      immediate: true,
      handler: function () {
        this.onChange();
      }
    }
  },

  computed: {
    hasData() {
      return !!this.dateTime && !!this.city;
    }
  },

  methods: {
    async getForecast() {
      const response = await this.weatherForecastAPI.get(this.city, this.dateTime);
      this.status = response.status;
      this.forecast = this.status === "error" ? response.msg : response.weather;
      this.loading = false;
    },

    onChange() {
      if (!this.dateTime || !this.city) return false;

      this.loading = true
      this.debounce(() => {
        this.getForecast();
      });
    },

    debounce(func) {
      clearTimeout(this.throttle);
      this.throttle = setTimeout(func, 500);
    }
  }
};
</script>

<style scoped lang="less">
@import "../styles/variables.less";
@import "../styles/mixins.less";

.forecast {
  .flex;
  position: relative;
  width: 50%;
  height: 100%;
  border: 1px solid @black;
  border-radius: 15px;

  &:before {
    content: "Weather Forecast";
    font-family: @font-family;
    background-color: @white;
    text-transform: uppercase;
    font-size: 0.8em;
    position: absolute;
    left: 50%;
    top: -8px;
    transform: translateX(-50%);
    text-align: center;
    width: 72%;
  }

  span {
    font-family: @font-family;

    &.weather {
      font-weight: 400;
      font-size: 1.2em;
    }

    &.weather.error, &.placeholder {
      font-weight: 200;
      font-size: 0.7em;
      font-style: italic;
    }

    &.weather.error {
      color: @red;
    }
  }

  .loading {
    width: 20px;
    height: 20px;
    border-radius: 50%;
    border: 2px solid @white;
    border-top: 2px solid @black;
    border-bottom: 2px solid @black;
    animation: spin 2s linear infinite;
  }
}

@keyframes spin {
  from { transform: rotate(0deg); }
  to { transform: rotate(360deg); }
}
</style>