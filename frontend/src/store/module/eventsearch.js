const state = {
    searchData: {
        keyword: '',
        tags: [],
        regions: [],
        months: [],
        budgets: []
    },
    categories: []
}

// getters
const getters = {
    isSearchDataEmpty: state => {
        if (
            state.searchData.keyword.length == 0 &&
            state.searchData.tags.length == 0 &&
            state.searchData.regions.length == 0 &&
            state.searchData.months.length == 0 &&
            state.searchData.budgets.length == 0
        ) {
            return true
        }
        return false
    }
};

// actions
const actions = {
}

// mutations
const mutations = {
    setSearchData(state, data) {
        state.searchData = data
    },
    setCategories(state, data) {
        state.categories = data
    }
}

export default {
    namespaced: true,
    state,
    getters,
    actions,
    mutations
}
