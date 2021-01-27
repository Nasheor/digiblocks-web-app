import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import './plugins/base'
import './plugins/chartist'
import './plugins/vee-validate'
import vuetify from './plugins/vuetify'
import i18n from './i18n'
import VueLayers from 'vuelayers'
import 'vuelayers/lib/style.css' // needs css-loader
import { MultiPointGeom } from 'vuelayers'

Vue.use(MultiPointGeom)

Vue.use(VueLayers)
// all input/output coordinates, GeoJSON features in EPSG:4326 projection
Vue.use(VueLayers, {
  dataProjection: 'EPSG:4326',
})

Vue.config.productionTip = false

new Vue({
  router,
  store,
  vuetify,
  i18n,
  render: h => h(App),
}).$mount('#app')
