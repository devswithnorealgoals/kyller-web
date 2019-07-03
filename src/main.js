import Vue from 'vue'
import App from './App.vue'
import router from './router'
// import firebase from 'firebase'
// import firebaseConfig from './serviceAccountKey.json'
import VModal from 'vue-js-modal'


// console.log(process.env)
// firebase.initializeApp({
//   "apiKey": process.env.apiKey || process.env.VUE_APP_apiKey,
//   "authDomain": process.env.authDomain || process.env.VUE_APP_authDomain,
//   "databaseURL": process.env.databaseURL || process.env.VUE_APP_databaseURL,
//   "projectId": process.env.projectId || process.env.VUE_APP_projectId,
//   "storageBucket": process.env.storageBucket || process.env.VUE_APP_storageBucket,
//   "messagingSenderId": process.env.messagingSenderId || process.env.VUE_APP_messagingSenderId,
//   "appId": process.env.appId || process.env.VUE_APP_appId
// })
// firebase.initializeApp(firebaseConfig)

Vue.config.productionTip = false
Vue.use(VModal, { dynamic: true, injectModalsContainer: true })

new Vue({
  router,
  render: h => h(App)
}).$mount('#app')
