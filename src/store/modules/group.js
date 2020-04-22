import ControlService from "../../service/ControlService";

export const namespaced = true;

export const state = {
    groups: [],
    groupCount: 0,
    groupPageCount: 0,
    group: {},
    loadedGroups: [],
    loadedGroupIds: []
}

export const mutations = {
    SET_GROUPS(state, groups) {
        state.groups = groups;
    },
    SET_GROUP_COUNT(state, count) {
        state.groupCount = count;
    },
    SET_GROUP_PAGE_COUNT(state, count) {
        state.groupPageCount = count;
    },
    SET_GROUP(state, group) {
        state.group = group;
    },
    RECORD_LOADED_GROUPS(state, groups) {
        for (let group of groups) {
            if(state.loadedGroupIds.indexOf(group.id) === -1) {
                state.loadedGroups.push(group);
                state.loadedGroupIds.push(group.id);
            }
        }
    }
}

export const actions = {
    loadGroups({ commit }, { page, perPage }) {
        return ControlService.getService().group().all(page, perPage)
            .then(response => {
                commit('SET_GROUPS', response.data.data)
                commit('SET_GROUP_COUNT', response.data.total);
                commit('SET_GROUP_PAGE_COUNT', response.data.last_page);
            })
            .catch(error => {
                console.log(error);
            });
    },
    searchGroups({commit}, {search, page, perPage}) {
        return ControlService.getService().group().getAllWhere(search, page, perPage)
            .then(response => {
                commit('SET_GROUPS', response.data.data)
                commit('SET_GROUP_COUNT', response.data.total);
                commit('SET_GROUP_PAGE_COUNT', response.data.last_page);
                commit('RECORD_LOADED_GROUPS', response.data.data);
            })
            .catch(error => {
                console.log(error);
            })
    },
    loadGroup({commit, state, getters}, groupId) {
        if(groupId === state.group.id) {
            return state.group;
        }

        var group = getters.getGroupById(groupId)

        if (group) {
            commit('SET_GROUP', group)
            return group
        } else {
            return ControlService.getService().group().get(groupId).then(response => {
                commit('SET_GROUP', response.data)
                commit('RECORD_LOADED_GROUPS', [response.data]);
                return response.data
            })
        }
    }
}

export const getters = {
    getGroupById: state => groupId => {
        if(state.loadedGroupIds.indexOf(groupId) !== -1) {
            return state.loadedGroups.find(group => group.id === groupId);
        }
        return null;
    }
}