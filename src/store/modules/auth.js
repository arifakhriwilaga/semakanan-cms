import Vue from 'vue';
import Resource from 'vue-resource';

Vue.use(Resource)

const state = {
	isLoggedIn: !!localStorage.getItem('token'),
	user: {
		id: '',
		name: '',
		email: '',
		login_id: ''
	}
}

const mutations = {
	login (state) {
		state.pending = true
	},
	login_success (state, payload) {
		state.user.id = payload.id;
		state.user.name = payload.name;
		state.user.email = payload.email;
		state.user.login_id = payload.login_id;
		state.isLoggedIn = true
	},
	logout (state) {
		state.isLoggedIn = false
	}
}

const actions = {
	login ({ commit }, creds) {
		return new Promise((resolve, reject) => {
			Vue.http.post('http://127.0.0.1:8000/api/login',{ email: creds.email, password: creds.password }).then((response) => {
				commit('login_success', {
					id: response.data.result.user.id,
					name: response.data.result.user.name,
					email: response.data.result.user.email,
					login_id: response.data.result.login_id
				});
				localStorage.setItem('login_id', response.data.result.login_id);
				localStorage.setItem('token', response.data.result.access_token);
				resolve();
			}).catch((er) => reject());
		})
	},
	logout ({commit}, login_id) {
		return new Promise((resolve, reject) => {
			Vue.http.post('http://127.0.0.1:8000/api/logout', { login_id: login_id }).then((response) => {
				commit('logout')
				localStorage.removeItem('login_id')
				localStorage.removeItem('token')
				resolve()
			}).catch(() => reject());
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