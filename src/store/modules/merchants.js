import Vue from 'vue'
import axios from 'axios'
import swal from 'sweetalert2'

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
			swal({
	              title: 'Terhapus!',
	              text: 'Data berhasil terhapus.',
	              type: 'success',
	              confirmButtonClass: 'btn btn-success btn-fill',
	              buttonsStyling: false
	            })
			axios.delete(`http://apiadmin.portalsekampus.id/public/api/merchant/delete/${params.id}`).then((res) => {
				commit('deleteMerchant', params);
				swal({
	              title: 'Terhapus!',
	              text: 'Data berhasil terhapus.',
	              type: 'success',
	              confirmButtonClass: 'btn btn-success btn-fill',
	              buttonsStyling: false
	            })
				resolve();
			}).catch((er) => {
				swal({
	              title: 'Dibatalkan',
	              text: 'Menghapus data dibatalkan',
	              type: 'error',
	              confirmButtonClass: 'btn btn-info btn-fill',
	              buttonsStyling: false
	            })
				reject();
			})
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