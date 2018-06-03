import Vue from 'vue';
import Resource from 'vue-resource';

Vue.use(Resource)

const state = {
  todos: []
}

const mutations = {
  all (state, payload) {
    state.todos = payload
  }
}

const actions = {
  getAllTodo ({ commit }) {
    new Promise((resolve, reject) => {

    })
  }
}