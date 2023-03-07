import EventService from '@/services/EventService.js'

// initial state
const state = {
    eventsInBucketList: [],
    failedEventDueToSignOut:''
};

// getters
const getters = {
    getBucketListEvents: (state) => {
        return state.eventsInBucketList;
    },
    getBucketListEventsIds: (state) => {
        return state.eventsInBucketList.map((event) => (event.id === undefined ? event.eid : event.id));
    },
    getFailedEvent: (state) => {
        return state.failedEventDueToSignOut;
    },
};

// actions
const actions = {
    fetchBucketListEvents({ commit, rootGetters }) {
        if (rootGetters['auth/authenticated']) {
            return EventService.getEventByUser(rootGetters['auth/user'].id)
                .then(response => {
                    commit('setBucketListEvents', response.data);
                })
                .catch(error => {
                    console.log('There was an error:', error.response)
                });
        } else {
            commit('setBucketListEvents', []);
        }
    },
    setFailedEvent({ commit }, data) {
        commit('SET_FAILED_EVENT', data);
    },
};

// mutations
const mutations = {
    setBucketListEvents(state, data) {
        state.eventsInBucketList = data;
    },
    SET_FAILED_EVENT(state, event) {
        state.failedEventDueToSignOut = event;
    },
};

export default {
    namespaced: true,
    state,
    getters,
    actions,
    mutations,
};
