import { createStore } from 'vuex'

export default createStore({
  state: {
    tasks: [],
  },
  getters: {
    tasks: state => state.tasks,
  },
  mutations: {
    setTasks(state, tasks) {
      state.tasks = tasks
    },
  },
  actions: {
    getTasks({ commit }) {
      fetch('http://localhost:3444/data.json')
        .then((response) => response.json())  // Parse the JSON response
        .then((data) => {
          commit('setTasks', data)  // Commit the parsed data to the store
        })
        .catch(error => {
          console.log('An error occurred:', error);
        });
    },
    
  },
  modules: {
  }
})
