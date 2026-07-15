import Vue from 'vue'
import App from './App'
import storage from './utils/storage.js'

Vue.config.productionTip = false

Vue.prototype.$storage = storage

App.mpType = 'app'

const app = new Vue({
    ...App
})
app.$mount()