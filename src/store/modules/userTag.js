import ControlService from "../../service/ControlService";

export const namespaced = true;

export const state = {
    userTags: [],
    userTagCount: 0,
    userTagPageCount: 0,
    userTag: {},
    loadedUserTags: [],
    loadedUserTagIds: []
}

export const mutations = {
    SET_USER_TAGS(state, userTags) {
        state.userTags = userTags;
    },
    SET_USER_TAG_COUNT(state, count) {
        state.userTagCount = count;
    },
    SET_USER_TAG_PAGE_COUNT(state, count) {
        state.userTagPageCount = count;
    },
    SET_USER_TAG(state, userTag) {
        state.userTag = userTag;
    },
    RECORD_LOADED_USER_TAGS(state, userTags) {
        for (let userTag of userTags) {
            if(state.loadedUserTagIds.indexOf(userTag.id) === -1) {
                state.loadedUserTags.push(userTag);
                state.loadedUserTagIds.push(userTag.id);
            }
        }
    }
}

export const actions = {
    loadUserTags({ commit }, { page, perPage }) {
        return ControlService.getService().userTag().all(page, perPage)
            .then(response => {
                commit('SET_USER_TAGS', response.data.data)
                commit('SET_USER_TAG_COUNT', response.data.total);
                commit('SET_USER_TAG_PAGE_COUNT', response.data.last_page);
            })
            .catch(error => {
                console.log(error);
            });
    },
    loadUserTag({commit, state, getters}, userTagId) {
        if(userTagId === state.userTag.id) {
            return state.userTag;
        }

        var userTag = getters.getUserTagById(userTagId)

        if (userTag) {
            commit('SET_USER_TAG', userTag)
            return userTag
        } else {
            return ControlService.getService().userTag().get(userTagId).then(response => {
                commit('SET_USER_TAG', response.data)
                commit('RECORD_LOADED_USER_TAGS', [response.data]);
                return response.data
            })
        }
    }
}

export const getters = {
    getUserTagById: state => userTagId => {
        if(state.loadedUserTagIds.indexOf(userTagId) !== -1) {
            return state.loadedUserTags.find(userTag => userTag.id === userTagId);
        }
        return null;
    }
}