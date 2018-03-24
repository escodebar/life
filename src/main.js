import Vue from 'vue'
import App from './App'
import colors from 'vuetify/es5/util/colors'
import router from './router'
import Vuetify from 'vuetify'
import 'vuetify/dist/vuetify.css'

Vue.config.productionTip = false
Vue.use(Vuetify, {
  theme: {
    primary: colors.blue.darken1,
    secondary: colors.blue.base,
    accent: colors.yellow.base,
    error: colors.red.accent3
  }
})

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  components: { App },
  template: '<App/>'
})
