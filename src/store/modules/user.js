import ControlService from "../../service/ControlService";

export const namespaced = true;

export const state = {
    users: [],
    userCount: 0,
    userPageCount: 0,
    user: {},
}

export const mutations = {
    SET_USERS(state, users) {
        state.users = users;
    },
    SET_USER_COUNT(state, count) {
        state.userCount = count;
    },
    SET_USER_PAGE_COUNT(state, count) {
        state.userPageCount = count;
    },
    SET_USER(state, user) {
        state.user = user;
    },
}

export const actions = {
    loadUsers({ commit }, { page, perPage }) {
        return ControlService.getService().user().all(page, perPage)
            .then(response => {
                commit('SET_USERS', response.data.data)
                commit('SET_USER_COUNT', response.data.total);
                commit('SET_USER_PAGE_COUNT', response.data.last_page);
            })
            .catch(error => {
                console.log(error);
            });
    },
    searchUsers({commit}, {search, page, perPage}) {
        return ControlService.getService().user().getAllWhere(search, page, perPage)
            .then(response => {
                commit('SET_USERS', response.data.data)
                commit('SET_USER_COUNT', response.data.total);
                commit('SET_USER_PAGE_COUNT', response.data.last_page);
            })
            .catch(error => {
                if(error.response.status === 404) {
                    commit('SET_USERS', []);
                    commit('SET_USER_COUNT', 0);
                    commit('SET_USER_PAGE_COUNT', 1);
                }
                console.log(error);
            })
    },
    loadUser({commit, state, getters}, userId) {
        if(userId === state.user.id) {
            return state.user;
        }

        var user = getters.getUserById(userId)

        if (user) {
            commit('SET_USER', user)
            return user
        } else {
            return ControlService.getService().user().get(userId).then(response => {
                commit('SET_USER', response.data)
                return response.data
            })
        }
    },
    loadUserRoles(userId) {
        return ControlService.getService().user().roles(userId).then(response => {
            return response.data
        })
    },
    loadUserTags(userId) {
        return ControlService.getService().user().tags(userId).then(response => {
            return response.data
        })
    },
}

export const getters = {
    getUserById: state => userId => {
        return state.users.find(user => user.id === userId)
    }
}