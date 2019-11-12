import Vue from 'vue'
import Vuex from 'vuex'
import axios from 'axios'

Vue.use(Vuex)

export default new Vuex.Store({
    state: {
        user: null
    },
    mutations: {
        login(state, user) {
            state.user = user;
        },
        logout(state) {
            state.user = null;
        }
    },
    actions: {
        login(context) {
            axios.get('/api/authentication').then(response => {
                if (response.status == 200 && response.data.status == "success") {
                    context.commit("login", response.data.object)
                } else {
                    context.commit("logout")
                }
            });
        },
        logout(context) {
            axios.get('api/logout').then(response => {
                if (response.status == 200 && response.data.status == "success") {
                    context.commit("logout")
                } else {
                    context.commit("login")
                }
            })
            context.commit("logout")
        }
    }
})