import Vue from 'vue'
import axios from 'axios'

Vue.use(axios)

const state = {
	merchants: null,
	meta: null
}

const mutations = {
	getMerchants (state, payload) {
		state.merchants = payload.data
		state.meta = payload.meta
	},
	deleteMerchant (state, row) {
		let indexToDelete = state.merchants.findIndex((tableRow) => tableRow.id === row.id)
        if (indexToDelete >= 0) {
          state.merchants.splice(indexToDelete, 1)
        }
	},
	emptyMerchant (state) {
		state.merchants = null;
		state.meta = null
	}
}

const actions = {
	merchantList ({ commit }, req) {
		new Promise((resolve, reject) => {
			axios.get('http://apiadmin.portalsekampus.id/public/api/merchant').then((res) => {
				commit('getMerchants', res.data);
				resolve();
			}).then((er) => reject())
		})
	},
	merchantDrop ({ commit }, params) {
		new Promise((resolve, reject) => {
			axios.delete(`http://apiadmin.portalsekampus.id/public/api/merchant/delete/${params.id}`).then((res) => {
				console.log(params)
				setTimeout(() => {
					commit('deleteMerchant', params);
					resolve();
				}, 1000);
			}).catch((er) => reject())
		})
	}
}

const getters = {
	allMerchants: state => state.merchants,
	metaMerchants: state => state.meta
}

export default {
	state,
	mutations,
	actions,
	getters
}