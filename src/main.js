import Vue from 'vue'
import { Datetime } from 'vue-datetime'
import { Settings } from 'luxon'
import 'vue-datetime/dist/vue-datetime.css'
import 'vue-swatches/dist/vue-swatches.css'
import App from './App.vue'
import router from './router'
import store from './store'

Vue.config.productionTip = false
Settings.defaultLocale = 'en-US'
Vue.use(Datetime)

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
