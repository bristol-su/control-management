import RoleTagList from "../views/role-tag/RoleTagList";
import RoleTagShow from "../views/role-tag/RoleTagShow";
import store from "../store/store";
import RoleTagRoles from "../views/role-tag/RoleTagRoles";
import RoleTagCreate from "../views/role-tag/RoleTagCreate";
import RoleTagRoleCreate from "../views/role-tag/RoleTagRoleCreate";

export default [
    {
        path: '/role-tag',
        name: 'roleTags',
        component: RoleTagList,
        props: true
    },
    {
        path: '/role-tag/create',
        name: 'create-roleTag',
        component: RoleTagCreate,
        props: true
    },
    {
        path: '/role-tag/:roleTagId',
        name: 'roleTag',
        component: RoleTagShow,
        props: function(route) {
            return {roleTagId: parseInt(route.params.roleTagId)};
        },
        beforeEnter(routeTo, routeFrom, next) {
            store
                .dispatch('roleTag/loadRoleTag', routeTo.params.roleTagId)
                // eslint-disable-next-line no-unused-vars
                .then(roleTag => {
                    next()
                })
                .catch(error => {
                    if (error.response && error.response.status === 404) {
                        next({ name: '404', params: { resource: 'tag' } })
                    } else {
                        next({ name: 'network-issue' })
                    }
                })
        }
    },
    {
        path: '/role-tag/:roleTagId/role',
        name: 'roleTag-role',
        component: RoleTagRoles,
        props: function(route) {
            return {roleTagId: parseInt(route.params.roleTagId)};
        }
    },
    {
        path: '/role-tag/:roleTagId/role/create',
        name: 'create-roleTag-role',
        component: RoleTagRoleCreate,
        props: function(route) {
            return {roleTagId: parseInt(route.params.roleTagId)};
        }
    }
];