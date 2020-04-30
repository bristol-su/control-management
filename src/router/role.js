import RoleShow from "../views/role/RoleShow";
import store from "../store/store";
import RoleOwners from "../views/role/RoleOwners";
import RoleTags from "../views/role/RoleTags";
import RoleUsersCreate from "../views/role/RoleUsersCreate";
import RoleTagsCreate from "../views/role/RoleTagsCreate";

export default [
    {
        path: '/role/:roleId',
        name: 'role',
        component: RoleShow,
        props: function(route) {
            return {roleId: parseInt(route.params.roleId)};
        },
        beforeEnter(routeTo, routeFrom, next) {
            store
                .dispatch('role/loadRole', routeTo.params.roleId)
                // eslint-disable-next-line no-unused-vars
                .then(role => {
                    next()
                })
                .catch(error => {
                    if (error.response && error.response.status === 404) {
                        next({ name: '404', params: { resource: 'role' } })
                    } else {
                        next({ name: 'network-issue' })
                    }
                })
        }
    },
    {
        path: '/role/:roleId/user/create',
        name: 'create-role-user',
        component: RoleUsersCreate,
        props: function(route) {
            return {roleId: parseInt(route.params.roleId)};
        }
    },
    {
        path: '/role/:roleId/user',
        name: 'role-owner',
        component: RoleOwners,
        props: function(route) {
            return {roleId: parseInt(route.params.roleId)};
        }
    },
    {
        path: '/role/:roleId/tag/create',
        name: 'create-role-tag',
        component: RoleTagsCreate,
        props: function(route) {
            return {roleId: parseInt(route.params.roleId)};
        }
    },
    {
        path: '/role/:roleId/tag',
        name: 'role-tag',
        component: RoleTags,
        props: function(route) {
            return {roleId: parseInt(route.params.roleId)};
        }
    }
]