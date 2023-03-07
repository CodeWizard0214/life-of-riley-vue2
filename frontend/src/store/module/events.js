// initial state
const state = {
  isSearchEnabled: false,
  events: [],
  recentRequest: '',
  categoryEvents: {},
  pageNumber:1,
};

// getters
const getters = {
  getEvents: (state) => {
    return state.events;
  },
  getIsSearchEnabled: (state) => {
    return state.isSearchEnabled;
  },
  getRecentRequest: (state) => {
    return state.recentRequest;
  },
  getCategoryEvents: (state) => (categoryName) => {
    if (state.categoryEvents[categoryName] !== undefined) {
      return state.categoryEvents[categoryName];
    }
    return {
      data: [],
      activeTab: 4
    };
  },
  getPageNumber: (state) => {
    return state.pageNumber;
  }
};

// actions
const actions = {
  updateCategoryEvents({commit}, payLoad) {
    // console.log(payLoad)
    commit('setCategoryEvents', payLoad);
  },
  updatePageNumber({commit},pageNumber) {
    commit('setPageNumber', pageNumber);
  }
};

// mutations
const mutations = {
  setEvents(state, data) {
    state.events = data;
  },
  setIsSearchEnabled(state, status) {
    state.isSearchEnabled = status;
  },
  setRecentRequest(state, request) {
    state.recentRequest = request;
  },
  setCategoryEvents(state, payLoad) {
    const newCategoryEvents = {...state.categoryEvents};
    newCategoryEvents[payLoad.eventType] = {
      activeTab: payLoad.activeTab,
      data: payLoad.data
    };
    state.categoryEvents = newCategoryEvents
  },
  setPageNumber(state,pageNumber) {
    state.pageNumber = pageNumber;
  }
};

export default {
  namespaced: true,
  state,
  getters,
  actions,
  mutations,
};
