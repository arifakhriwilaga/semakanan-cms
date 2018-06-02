const state = {
	isLoggedIn: !!localStorage.getItem('token')
}

const mutations = {
	login (state) {
		state.pending = true
	},
	login_success (state) {
		state.pending = false
		state.isLoggedIn = true
	},
	logout (state) {
		state.isLoggedIn = false
	}
}

const actions = {
	login ({ commit }, creds) {
		commit('login');
		return new Promise((resolve, reject) => {
			setTimeout(() => {
				if (creds.email == 'user1@gmail.com' && creds.password == '123123') {
					localStorage.setItem('token', 'JWT');
					commit('login_success')
					resolve();
				}
				reject();
			}, 1000);
		});
	},
	logout ({commit}) {
		localStorage.removeItem('token')
		commit('logout')
	}
}

const getters = {
	isLoggedIn: state => state.isLoggedIn
}

export default {
	state,
	mutations,
	actions,
	getters
}