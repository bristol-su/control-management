import ControlService from "../../service/ControlService";

export const namespaced = true;

export const state = {
    positions: [],
    positionCount: 0,
    positionPageCount: 0,
    position: {},
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
    RECORD_LOADED_POSITIONS(state, positions) {
        for (let position of positions) {
            let index = state.loadedPositionIds.indexOf(position.id)
            if(index !== -1) {
                state.loadedPositions.splice(index, 1);
            } else {
                state.loadedPositionIds.push(position.id);
            }
            state.loadedPositions.push(position);
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
    },
    searchPositions({commit}, {search, page, perPage}) {
        return ControlService.getService().position().getAllWhere(search, page, perPage)
            .then(response => {
                commit('SET_POSITIONS', response.data.data)
                commit('SET_POSITION_COUNT', response.data.total);
                commit('SET_POSITION_PAGE_COUNT', response.data.last_page);
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
    update({commit, state}, attributes) {
        return ControlService.getService().position().update(state.position.id, attributes)
            .then(response => {
                commit('SET_POSITION', response.data);
                commit('RECORD_LOADED_POSITIONS', [response.data]);
                return response.data;
            })
    }
}

export const getters = {
    getPositionById: state => positionId => {
        if(state.loadedPositionIds.indexOf(positionId) !== -1) {
            return state.loadedPositions.find(position => position.id === positionId);
        }
        return null;
    }
}