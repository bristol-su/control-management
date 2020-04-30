import ControlService from "../../service/ControlService";

export const namespaced = true;

export const state = {
    roleTagCategories: [],
    roleTagCategoryCount: 0,
    roleTagCategoryPageCount: 0,
    roleTagCategory: {},
    loadedRoleTagCategories: [],
    loadedRoleTagCategoryIds: []
}

export const mutations = {
    SET_ROLE_TAG_CATEGORIES(state, roleTagCategories) {
        state.roleTagCategories = roleTagCategories;
    },
    SET_ROLE_TAG_CATEGORY_COUNT(state, count) {
        state.roleTagCategoryCount = count;
    },
    SET_ROLE_TAG_CATEGORY_PAGE_COUNT(state, count) {
        state.roleTagCategoryPageCount = count;
    },
    SET_ROLE_TAG_CATEGORY(state, roleTagCategory) {
        state.roleTagCategory = roleTagCategory;
    },
    RECORD_LOADED_RoleTagCategories(state, roleTagCategories) {
        for (let roleTagCategory of roleTagCategories) {
            if(state.loadedRoleTagCategoryIds.indexOf(roleTagCategory.id) === -1) {
                state.loadedRoleTagCategories.push(roleTagCategory);
                state.loadedRoleTagCategoryIds.push(roleTagCategory.id);
            }
        }
    }
}

export const actions = {
    loadRoleTagCategories({ commit }, { page, perPage }) {
        return ControlService.getService().roleTagCategory().all(page, perPage)
            .then(response => {
                commit('SET_ROLE_TAG_CATEGORIES', response.data.data)
                commit('SET_ROLE_TAG_CATEGORY_COUNT', response.data.total);
                commit('SET_ROLE_TAG_CATEGORY_PAGE_COUNT', response.data.last_page);
            })
    },
    loadRoleTagCategory({commit, state, getters}, roleTagCategoryId) {
        if(roleTagCategoryId === state.roleTagCategory.id) {
            return state.roleTagCategory;
        }

        var roleTagCategory = getters.getRoleTagCategoryById(roleTagCategoryId)

        if (roleTagCategory) {
            commit('SET_ROLE_TAG_CATEGORY', roleTagCategory)
            return roleTagCategory
        } else {
            return ControlService.getService().roleTagCategory().get(roleTagCategoryId).then(response => {
                commit('SET_ROLE_TAG_CATEGORY', response.data)
                commit('RECORD_LOADED_RoleTagCategories', [response.data]);
                return response.data
            })
        }
    },
    update({commit, state}, attributes) {
        return ControlService.getService().roleTagCategory().update(state.roleTagCategory.id, attributes)
            .then(response => {
                commit('SET_ROLE_TAG_CATEGORY', response.data);
                commit('RECORD_LOADED_RoleTagCategories', [response.data]);
                return response.data;
            })
    }
}

export const getters = {
    getRoleTagCategoryById: state => roleTagCategoryId => {
        if(state.loadedRoleTagCategoryIds.indexOf(roleTagCategoryId) !== -1) {
            return state.loadedRoleTagCategories.find(roleTagCategory => roleTagCategory.id === roleTagCategoryId);
        }
        return null;
    }
}