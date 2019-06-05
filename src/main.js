import Vue from 'vue'
import App from './App.vue'
import router from './router'
import firebase from 'firebase'
import firebaseConfig from './serviceAccountKey.json'
import VModal from 'vue-js-modal'
 
firebase.initializeApp(firebaseConfig)

Vue.config.productionTip = false
Vue.use(VModal, { dynamic: true, injectModalsContainer: true })

new Vue({
  router,
  render: h => h(App)
}).$mount('#app')
