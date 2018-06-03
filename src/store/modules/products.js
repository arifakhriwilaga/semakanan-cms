import Vue from 'vue';
import Resource from 'vue-resource';

Vue.use(Resource)


// initial state
const state = {
  all: []
}

// getters
const getters = {
  allProducts: state => state.all
}

// actions
const actions = {
  getAllProducts ({ commit }) {
    new Promise((resolve, reject) => {
      Vue.http.get('http://127.0.0.1:8000/api/todos', {headers: {Authorization: 'Bearer '+ localStorage.getItem("token")}}).then((response) => {
        commit('setProducts', response.data)
        console.log(response)
        resolve()
      }).catch(() => reject())
    })
  }
}

// mutations
const mutations = {
  setProducts (state, products) {
    state.all = products
  },

  decrementProductInventory (state, { id }) {
    const product = state.all.find(product => product.id === id)
    product.inventory--
  }
}

export default {
  state,
  getters,
  actions,
  mutations
}
