import ControlService from "../../service/ControlService";

export const namespaced = true;

export const state = {
    positions: [],
    positionCount: 0,
    positionPageCount: 0,
    position: {},
    positionTags: [],
    positionRoles: [],
    loadedPositions: [],
    loadedPositionIds: []
}

export const mutations = {
    SET_POSITIONS(state, positions) {
        state.positions = positions;
    },
    SET_POSITION_COUNT(state, count) {
        state.positionCount = count;
    },
    SET_POSITION_PAGE_COUNT(state, count) {
        state.positionPageCount = count;
    },
    SET_POSITION(state, position) {
        state.position = position;
    },
    SET_POSITION_TAGS(state, tags) {
        state.positionTags = tags;
    },
    SET_POSITION_ROLES(state, roles) {
        state.positionRoles = roles;
    },
    RECORD_LOADED_POSITIONS(state, positions) {
        for (let position of positions) {
            if(state.loadedPositionIds.indexOf(position.id) === -1) {
                state.loadedPositions.push(position);
                state.loadedPositionIds.push(position.id);
            }
        }
    }
}

export const actions = {
    loadPositions({ commit }, { page, perPage }) {
        return ControlService.getService().position().all(page, perPage)
            .then(response => {
                commit('SET_POSITIONS', response.data.data)
                commit('SET_POSITION_COUNT', response.data.total);
                commit('SET_POSITION_PAGE_COUNT', response.data.last_page);
                commit('RECORD_LOADED_POSITIONS', response.data.data);
            })
            .catch(error => {
                console.log(error);
            });
    },
    searchPositions({commit}, {search, page, perPage}) {
        return ControlService.getService().position().getAllWhere(search, page, perPage)
            .then(response => {
                commit('SET_POSITIONS', response.data.data)
                commit('SET_POSITION_COUNT', response.data.total);
                commit('SET_POSITION_PAGE_COUNT', response.data.last_page);
            })
            .catch(error => {
                console.log(error);
            })
    },
    loadPosition({commit, state, getters}, positionId) {
        if(positionId === state.position.id) {
            return state.position;
        }

        var position = getters.getPositionById(positionId)

        if (position) {
            commit('SET_POSITION', position)
            return position
        } else {
            return ControlService.getService().position().get(positionId).then(response => {
                commit('SET_POSITION', response.data)
                commit('RECORD_LOADED_POSITIONS', [response.data]);
                return response.data
            })
        }
    },
    loadPositionRoles({commit}, positionId) {
        return ControlService.getService().position().roles(positionId).then(response => {
            commit('SET_POSITION_ROLES', response.data)
            return response.data
        })
    },
    loadPositionTags({commit}, positionId) {
        return ControlService.getService().position().tags(positionId).then(response => {
            commit('SET_POSITION_TAGS', response.data)
            return response.data
        })
    },
}

export const getters = {
    getPositionById: state => positionId => {
        if(state.loadedPositionIds.indexOf(positionId) !== -1) {
            return state.loadedPositions.find(position => position.id === positionId);
        }
        return null;
    }
}