import ControlService from "../../service/ControlService";

export const namespaced = true;

export const state = {
    userTagCategories: [],
    userTagCategoryCount: 0,
    userTagCategoryPageCount: 0,
    userTagCategory: {},
    loadedUserTagCategories: [],
    loadedUserTagCategoryIds: []
}

export const mutations = {
    SET_USER_TAG_CATEGORIES(state, userTagCategories) {
        state.userTagCategories = userTagCategories;
    },
    SET_USER_TAG_CATEGORY_COUNT(state, count) {
        state.userTagCategoryCount = count;
    },
    SET_USER_TAG_CATEGORY_PAGE_COUNT(state, count) {
        state.userTagCategoryPageCount = count;
    },
    SET_USER_TAG_CATEGORY(state, userTagCategory) {
        state.userTagCategory = userTagCategory;
    },
    RECORD_LOADED_UserTagCategories(state, userTagCategories) {
        for (let userTagCategory of userTagCategories) {
            if(state.loadedUserTagCategoryIds.indexOf(userTagCategory.id) === -1) {
                state.loadedUserTagCategories.push(userTagCategory);
                state.loadedUserTagCategoryIds.push(userTagCategory.id);
            }
        }
    }
}

export const actions = {
    loadUserTagCategories({ commit }, { page, perPage }) {
        return ControlService.getService().userTagCategory().all(page, perPage)
            .then(response => {
                commit('SET_USER_TAG_CATEGORIES', response.data.data)
                commit('SET_USER_TAG_CATEGORY_COUNT', response.data.total);
                commit('SET_USER_TAG_CATEGORY_PAGE_COUNT', response.data.last_page);
            })
            .catch(error => {
                console.log(error);
            });
    },
    loadUserTagCategory({commit, state, getters}, userTagCategoryId) {
        if(userTagCategoryId === state.userTagCategory.id) {
            return state.userTagCategory;
        }

        var userTagCategory = getters.getUserTagCategoryById(userTagCategoryId)

        if (userTagCategory) {
            commit('SET_USER_TAG_CATEGORY', userTagCategory)
            return userTagCategory
        } else {
            return ControlService.getService().userTagCategory().get(userTagCategoryId).then(response => {
                commit('SET_USER_TAG_CATEGORY', response.data)
                commit('RECORD_LOADED_UserTagCategories', [response.data]);
                return response.data
            })
        }
    }
}

export const getters = {
    getUserTagCategoryById: state => userTagCategoryId => {
        if(state.loadedUserTagCategoryIds.indexOf(userTagCategoryId) !== -1) {
            return state.loadedUserTagCategories.find(userTagCategory => userTagCategory.id === userTagCategoryId);
        }
        return null;
    }
}