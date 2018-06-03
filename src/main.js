import Vue from 'vue'
import './pollyfills'
import VueRouter from 'vue-router'
import VueNotify from 'vue-notifyjs'
import VeeValidate from 'vee-validate'
import lang from 'element-ui/lib/locale/lang/en'
import locale from 'element-ui/lib/locale'
import App from './App.vue'
import Resource from 'vue-resource'
import middleware from './middleware'


// Plugins
import GlobalComponents from './gloablComponents'
import GlobalDirectives from './globalDirectives'
import SideBar from './components/UIComponents/SidebarPlugin'

// store
import store from './store'

// router setup
import routes from './routes/routes'

// library imports

import './assets/sass/paper-dashboard.scss'
import './assets/sass/element_variables.scss'
import './assets/sass/demo.scss'

import sidebarLinks from './sidebarLinks'
// plugin setup
Vue.use(VueRouter)
Vue.use(GlobalDirectives)
Vue.use(GlobalComponents)
Vue.use(VueNotify)
Vue.use(SideBar, {sidebarLinks: sidebarLinks})
Vue.use(VeeValidate)
Vue.use(Resource)
locale.use(lang)

// configure router
const router = new VueRouter({
	// mode: 'history',
	routes, // short for routes: routes
	linkActiveClass: 'active'
})

middleware(router)

// interceptors
// Vue.http.interceptors.push((request, next) => {
// 	let token = localStorage.getItem('token')

//   if (token) {
//       request.headers = request.headers || {}
//       request.headers.Authorization = `Bearer ${token}`
//   }

//   next()
// })

/* eslint-disable no-new */
new Vue({
  el: '#app',
  render: h => h(App),
  router,
  store
})