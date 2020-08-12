import Vue from 'vue'
import App from './App.vue'

import vueTaiwanId from './plugins/vueTaiwanId'

Vue.config.productionTip = false

Vue.use(vueTaiwanId, {
  // theme: 'none'
})

new Vue({
  render: h => h(App)
}).$mount('#app')
