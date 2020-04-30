import ControlService from "../../service/ControlService";

export const namespaced = true;

export const state = {
    groupTags: [],
    groupTagCount: 0,
    groupTagPageCount: 0,
    groupTag: {},
    loadedGroupTags: [],
    loadedGroupTagIds: []
}

export const mutations = {
    SET_GROUP_TAGS(state, groupTags) {
        state.groupTags = groupTags;
    },
    SET_GROUP_TAG_COUNT(state, count) {
        state.groupTagCount = count;
    },
    SET_GROUP_TAG_PAGE_COUNT(state, count) {
        state.groupTagPageCount = count;
    },
    SET_GROUP_TAG(state, groupTag) {
        state.groupTag = groupTag;
    },
    RECORD_LOADED_GROUP_TAGS(state, groupTags) {
        for (let groupTag of groupTags) {
            if(state.loadedGroupTagIds.indexOf(groupTag.id) === -1) {
                state.loadedGroupTags.push(groupTag);
                state.loadedGroupTagIds.push(groupTag.id);
            }
        }
    }
}

export const actions = {
    loadGroupTags({ commit }, { page, perPage }) {
        return ControlService.getService().groupTag().all(page, perPage)
            .then(response => {
                commit('SET_GROUP_TAGS', response.data.data)
                commit('SET_GROUP_TAG_COUNT', response.data.total);
                commit('SET_GROUP_TAG_PAGE_COUNT', response.data.last_page);
            })
    },
    loadGroupTag({commit, state, getters}, groupTagId) {
        if(groupTagId === state.groupTag.id) {
            return state.groupTag;
        }

        var groupTag = getters.getGroupTagById(groupTagId)

        if (groupTag) {
            commit('SET_GROUP_TAG', groupTag)
            return groupTag
        } else {
            return ControlService.getService().groupTag().get(groupTagId).then(response => {
                commit('SET_GROUP_TAG', response.data)
                commit('RECORD_LOADED_GROUP_TAGS', [response.data]);
                return response.data
            })
        }
    },
    update({commit, state}, attributes) {
        return ControlService.getService().groupTag().update(state.groupTag.id, attributes)
            .then(response => {
                commit('SET_GROUP_TAG', response.data);
                commit('RECORD_LOADED_GROUP_TAGS', [response.data]);
                return response.data;
            })
    }
}

export const getters = {
    getGroupTagById: state => groupTagId => {
        if(state.loadedGroupTagIds.indexOf(groupTagId) !== -1) {
            return state.loadedGroupTags.find(groupTag => groupTag.id === groupTagId);
        }
        return null;
    }
}