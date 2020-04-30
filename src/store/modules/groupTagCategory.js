import ControlService from "../../service/ControlService";

export const namespaced = true;

export const state = {
    groupTagCategories: [],
    groupTagCategoryCount: 0,
    groupTagCategoryPageCount: 0,
    groupTagCategory: {},
    loadedGroupTagCategories: [],
    loadedGroupTagCategoryIds: []
}

export const mutations = {
    SET_GROUP_TAG_CATEGORIES(state, groupTagCategories) {
        state.groupTagCategories = groupTagCategories;
    },
    SET_GROUP_TAG_CATEGORY_COUNT(state, count) {
        state.groupTagCategoryCount = count;
    },
    SET_GROUP_TAG_CATEGORY_PAGE_COUNT(state, count) {
        state.groupTagCategoryPageCount = count;
    },
    SET_GROUP_TAG_CATEGORY(state, groupTagCategory) {
        state.groupTagCategory = groupTagCategory;
    },
    RECORD_LOADED_GroupTagCategories(state, groupTagCategories) {
        for (let groupTagCategory of groupTagCategories) {
            if(state.loadedGroupTagCategoryIds.indexOf(groupTagCategory.id) === -1) {
                state.loadedGroupTagCategories.push(groupTagCategory);
                state.loadedGroupTagCategoryIds.push(groupTagCategory.id);
            }
        }
    }
}

export const actions = {
    loadGroupTagCategories({ commit }, { page, perPage }) {
        return ControlService.getService().groupTagCategory().all(page, perPage)
            .then(response => {
                commit('SET_GROUP_TAG_CATEGORIES', response.data.data)
                commit('SET_GROUP_TAG_CATEGORY_COUNT', response.data.total);
                commit('SET_GROUP_TAG_CATEGORY_PAGE_COUNT', response.data.last_page);
            })
    },
    loadGroupTagCategory({commit, state, getters}, groupTagCategoryId) {
        if(groupTagCategoryId === state.groupTagCategory.id) {
            return state.groupTagCategory;
        }

        var groupTagCategory = getters.getGroupTagCategoryById(groupTagCategoryId)

        if (groupTagCategory) {
            commit('SET_GROUP_TAG_CATEGORY', groupTagCategory)
            return groupTagCategory
        } else {
            return ControlService.getService().groupTagCategory().get(groupTagCategoryId).then(response => {
                commit('SET_GROUP_TAG_CATEGORY', response.data)
                commit('RECORD_LOADED_GroupTagCategories', [response.data]);
                return response.data
            })
        }
    },
    update({commit, state}, attributes) {
        return ControlService.getService().groupTagCategory().update(state.groupTagCategory.id, attributes)
            .then(response => {
                commit('SET_GROUP_TAG_CATEGORY', response.data);
                commit('RECORD_LOADED_GroupTagCategories', [response.data]);
                return response.data;
            })
    }
}

export const getters = {
    getGroupTagCategoryById: state => groupTagCategoryId => {
        if(state.loadedGroupTagCategoryIds.indexOf(groupTagCategoryId) !== -1) {
            return state.loadedGroupTagCategories.find(groupTagCategory => groupTagCategory.id === groupTagCategoryId);
        }
        return null;
    }
}