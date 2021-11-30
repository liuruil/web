import Vue from "vue";
import Vuex from 'vuex'

Vue.use(Vuex);

export default function () {
    const store = new Vuex.Store({
        state: {
            name: ""
        },
        mutations: {
            setName(state, payload) {
                state.name = payload
            }
        },
        actions: {
            getName({ commit }) {
                return new Promise(resolve => {
                    setTimeout(() => {
                        resolve('SSR')
                    },2200);
                }).then(val => {
                    commit('setName', val)
                })
            }
        }
    })
    return store
}