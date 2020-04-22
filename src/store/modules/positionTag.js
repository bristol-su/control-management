import ControlService from "../../service/ControlService";

export const namespaced = true;

export const state = {
    positionTags: [],
    positionTagCount: 0,
    positionTagPageCount: 0,
    positionTag: {},
    loadedPositionTags: [],
    loadedPositionTagIds: []
}

export const mutations = {
    SET_POSITION_TAGS(state, positionTags) {
        state.positionTags = positionTags;
    },
    SET_POSITION_TAG_COUNT(state, count) {
        state.positionTagCount = count;
    },
    SET_POSITION_TAG_PAGE_COUNT(state, count) {
        state.positionTagPageCount = count;
    },
    SET_POSITION_TAG(state, positionTag) {
        state.positionTag = positionTag;
    },
    RECORD_LOADED_POSITION_TAGS(state, positionTags) {
        for (let positionTag of positionTags) {
            if(state.loadedPositionTagIds.indexOf(positionTag.id) === -1) {
                state.loadedPositionTags.push(positionTag);
                state.loadedPositionTagIds.push(positionTag.id);
            }
        }
    }
}

export const actions = {
    loadPositionTags({ commit }, { page, perPage }) {
        return ControlService.getService().positionTag().all(page, perPage)
            .then(response => {
                commit('SET_POSITION_TAGS', response.data.data)
                commit('SET_POSITION_TAG_COUNT', response.data.total);
                commit('SET_POSITION_TAG_PAGE_COUNT', response.data.last_page);
            })
            .catch(error => {
                console.log(error);
            });
    },
    loadPositionTag({commit, state, getters}, positionTagId) {
        if(positionTagId === state.positionTag.id) {
            return state.positionTag;
        }

        var positionTag = getters.getPositionTagById(positionTagId)

        if (positionTag) {
            commit('SET_POSITION_TAG', positionTag)
            return positionTag
        } else {
            return ControlService.getService().positionTag().get(positionTagId).then(response => {
                commit('SET_POSITION_TAG', response.data)
                commit('RECORD_LOADED_POSITION_TAGS', [response.data]);
                return response.data
            })
        }
    }
}

export const getters = {
    getPositionTagById: state => positionTagId => {
        if(state.loadedPositionTagIds.indexOf(positionTagId) !== -1) {
            return state.loadedPositionTags.find(positionTag => positionTag.id === positionTagId);
        }
        return null;
    }
}