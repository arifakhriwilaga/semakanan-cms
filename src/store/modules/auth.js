import Vue from 'vue';
import axios from 'axios';

Vue.use(axios)

const state = {
	isLoggedIn: !!localStorage.getItem('token'),
	user: null
}

const mutations = {
	login (state) {
		state.pending = true
	},
	login_success (state, payload) {
		state.user = payload;
		state.isLoggedIn = true;
	},
	logout (state) {
		state.isLoggedIn = false;
		state.user = null;
	}
}

const actions = {
	login ({ commit }, creds) {
		return new Promise((resolve, reject) => {

			var data = new FormData();
			data.append("email", creds.email);
			data.append("password", creds.password);
			axios.post('http://apiadmin.portalsekampus.id/public/api/auth/login', data).then((res) => {
				if (res.data.error) {
					reject();
				} else {
					commit('login');
					commit('login_success', res.data.data);
					localStorage.setItem('token', 'Bearer '+res.data.meta.token);
					resolve();
				}
			}).catch((er) => reject())
		})
	},
	logout ({commit}, login_id) {
		return new Promise((resolve, reject) => {
			commit('logout')
			localStorage.removeItem('token')
			if (!localStorage.getItem('token')) {
				resolve()
			}
			reject();
		})
	}
}

const getters = {
	isLoggedIn: state => state.isLoggedIn,
	user: state => state.user
}

export default {
	state,
	mutations,
	actions,
	getters
}