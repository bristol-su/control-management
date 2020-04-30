import ControlService from "../../service/ControlService";

export const namespaced = true;

export const state = {
    roles: [],
    roleCount: 0,
    rolePageCount: 0,
    role: {},
    loadedRoles: [],
    loadedRoleIds: []
}

export const mutations = {
    SET_ROLES(state, roles) {
        state.roles = roles;
    },
    SET_ROLE_COUNT(state, count) {
        state.roleCount = count;
    },
    SET_ROLE_PAGE_COUNT(state, count) {
        state.rolePageCount = count;
    },
    SET_ROLE(state, role) {
        state.role = role;
    },
    RECORD_LOADED_ROLES(state, roles) {
        for (let role of roles) {
            let index = state.loadedRoleIds.indexOf(role.id)
            if(index !== -1) {
                state.loadedRoles.splice(index, 1);
            } else {
                state.loadedRoleIds.push(role.id);
            }
            state.loadedRoles.push(role);
        }
    }
}

export const actions = {
    loadRoles({ commit }, { page, perPage }) {
        return ControlService.getService().role().all(page, perPage)
            .then(response => {
                commit('SET_ROLES', response.data.data)
                commit('SET_ROLE_COUNT', response.data.total);
                commit('SET_ROLE_PAGE_COUNT', response.data.last_page);
            })
    },
    loadRole({commit, state, getters}, roleId) {
        if(roleId === state.role.id) {
            return state.role;
        }

        var role = getters.getRoleById(roleId)

        if (role) {
            commit('SET_ROLE', role)
            return role
        } else {
            return ControlService.getService().role().get(roleId).then(response => {
                commit('SET_ROLE', response.data)
                commit('RECORD_LOADED_ROLES', [response.data]);
                return response.data
            })
        }
    },
    update({commit, state}, attributes) {
        return ControlService.getService().role().update(state.role.id, attributes)
            .then(response => {
                commit('SET_ROLE', response.data);
                commit('RECORD_LOADED_ROLES', [response.data]);
                return response.data;
            })
    }
}

export const getters = {
    getRoleById: state => roleId => {
        if(state.loadedRoleIds.indexOf(roleId) !== -1) {
            return state.loadedRoles.find(role => role.id === roleId);
        }
        return null;
    }
}