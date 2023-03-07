/* eslint-disable prettier/prettier */
import axios from 'axios'
export default {
    namespaced: true,
    state: {
        token: null,
        user: null,
        showLoginModal: false,
    },
    getters: {
        authenticated(state) {
            return state.token && state.user
        },
        user(state) {
            return state.user
        }
    },
    mutations: {
        SET_TOKEN(state, token) {
            state.token = token
        },
        SET_USER(state, data) {
            state.user = data
        },
        SET_LOGIN_MODAL(state, status) {
            state.showLoginModal = status
        }
    },
    actions: {
        async socialLogin({ dispatch }, payLoad) {			
            let response = await axios.post('/auth/signin-with-socialmedia/' + payLoad.provider, payLoad.response);
            return dispatch('attempt', response.data.token)
        },
        async signIn({
            dispatch
        }, credentials) {
            let response = await axios.post(
                '/auth/signin',
                credentials
            )
            return dispatch('attempt', response.data.token)
        },
        async attempt({
            commit,
            state
        }, token) {
            if (token) {
                commit('SET_TOKEN', token)
            }
            if (!state.token) {
                return
            }
            try {
                let response = await axios.get('/auth/me')
                commit('SET_USER', response.data)
            } catch (e) {
                commit('SET_TOKEN', null)
                commit('SET_USER', null)
            }
        },
        signOut({
            commit
        }) {
            console.log('signing out')
            return axios.post('/auth/signout').then(() => {
                commit('SET_TOKEN', null)
                commit('SET_USER', null)
            })
        }
    }
}
