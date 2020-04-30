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
            let index = state.loadedGroupIds.indexOf(group.id)
            if(index !== -1) {
                state.loadedGroups.splice(index, 1);
            } else {
                state.loadedGroupIds.push(group.id);
            }
            state.loadedGroups.push(group);
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
    },
    update({commit, state}, attributes) {
        return ControlService.getService().group().update(state.group.id, attributes)
            .then(response => {
                commit('SET_GROUP', response.data);
                commit('RECORD_LOADED_GROUPS', [response.data]);
                return response.data;
            })
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