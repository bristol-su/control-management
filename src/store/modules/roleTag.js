import ControlService from "../../service/ControlService";

export const namespaced = true;

export const state = {
    roleTags: [],
    roleTagCount: 0,
    roleTagPageCount: 0,
    roleTag: {},
    loadedRoleTags: [],
    loadedRoleTagIds: []
}

export const mutations = {
    SET_ROLE_TAGS(state, roleTags) {
        state.roleTags = roleTags;
    },
    SET_ROLE_TAG_COUNT(state, count) {
        state.roleTagCount = count;
    },
    SET_ROLE_TAG_PAGE_COUNT(state, count) {
        state.roleTagPageCount = count;
    },
    SET_ROLE_TAG(state, roleTag) {
        state.roleTag = roleTag;
    },
    RECORD_LOADED_ROLE_TAGS(state, roleTags) {
        for (let roleTag of roleTags) {
            if(state.loadedRoleTagIds.indexOf(roleTag.id) === -1) {
                state.loadedRoleTags.push(roleTag);
                state.loadedRoleTagIds.push(roleTag.id);
            }
        }
    }
}

export const actions = {
    loadRoleTags({ commit }, { page, perPage }) {
        return ControlService.getService().roleTag().all(page, perPage)
            .then(response => {
                commit('SET_ROLE_TAGS', response.data.data)
                commit('SET_ROLE_TAG_COUNT', response.data.total);
                commit('SET_ROLE_TAG_PAGE_COUNT', response.data.last_page);
            })
            .catch(error => {
                console.log(error);
            });
    },
    loadRoleTag({commit, state, getters}, roleTagId) {
        if(roleTagId === state.roleTag.id) {
            return state.roleTag;
        }

        var roleTag = getters.getRoleTagById(roleTagId)

        if (roleTag) {
            commit('SET_ROLE_TAG', roleTag)
            return roleTag
        } else {
            return ControlService.getService().roleTag().get(roleTagId).then(response => {
                commit('SET_ROLE_TAG', response.data)
                commit('RECORD_LOADED_ROLE_TAGS', [response.data]);
                return response.data
            })
        }
    }
}

export const getters = {
    getRoleTagById: state => roleTagId => {
        if(state.loadedRoleTagIds.indexOf(roleTagId) !== -1) {
            return state.loadedRoleTags.find(roleTag => roleTag.id === roleTagId);
        }
        return null;
    }
}