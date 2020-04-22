import ControlService from "../../service/ControlService";

export const namespaced = true;

export const state = {
    positionTagCategories: [],
    positionTagCategoryCount: 0,
    positionTagCategoryPageCount: 0,
    positionTagCategory: {},
    loadedPositionTagCategories: [],
    loadedPositionTagCategoryIds: []
}

export const mutations = {
    SET_POSITION_TAG_CATEGORIES(state, positionTagCategories) {
        state.positionTagCategories = positionTagCategories;
    },
    SET_POSITION_TAG_CATEGORY_COUNT(state, count) {
        state.positionTagCategoryCount = count;
    },
    SET_POSITION_TAG_CATEGORY_PAGE_COUNT(state, count) {
        state.positionTagCategoryPageCount = count;
    },
    SET_POSITION_TAG_CATEGORY(state, positionTagCategory) {
        state.positionTagCategory = positionTagCategory;
    },
    RECORD_LOADED_PositionTagCategories(state, positionTagCategories) {
        for (let positionTagCategory of positionTagCategories) {
            if(state.loadedPositionTagCategoryIds.indexOf(positionTagCategory.id) === -1) {
                state.loadedPositionTagCategories.push(positionTagCategory);
                state.loadedPositionTagCategoryIds.push(positionTagCategory.id);
            }
        }
    }
}

export const actions = {
    loadPositionTagCategories({ commit }, { page, perPage }) {
        return ControlService.getService().positionTagCategory().all(page, perPage)
            .then(response => {
                commit('SET_POSITION_TAG_CATEGORIES', response.data.data)
                commit('SET_POSITION_TAG_CATEGORY_COUNT', response.data.total);
                commit('SET_POSITION_TAG_CATEGORY_PAGE_COUNT', response.data.last_page);
            })
            .catch(error => {
                console.log(error);
            });
    },
    loadPositionTagCategory({commit, state, getters}, positionTagCategoryId) {
        if(positionTagCategoryId === state.positionTagCategory.id) {
            return state.positionTagCategory;
        }

        var positionTagCategory = getters.getPositionTagCategoryById(positionTagCategoryId)

        if (positionTagCategory) {
            commit('SET_POSITION_TAG_CATEGORY', positionTagCategory)
            return positionTagCategory
        } else {
            return ControlService.getService().positionTagCategory().get(positionTagCategoryId).then(response => {
                commit('SET_POSITION_TAG_CATEGORY', response.data)
                commit('RECORD_LOADED_PositionTagCategories', [response.data]);
                return response.data
            })
        }
    }
}

export const getters = {
    getPositionTagCategoryById: state => positionTagCategoryId => {
        if(state.loadedPositionTagCategoryIds.indexOf(positionTagCategoryId) !== -1) {
            return state.loadedPositionTagCategories.find(positionTagCategory => positionTagCategory.id === positionTagCategoryId);
        }
        return null;
    }
}