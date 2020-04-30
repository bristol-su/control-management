import UserList from "../views/user/UserList";
import UserCreate from "../views/user/UserCreate";
import UserShow from "../views/user/UserShow";
import store from "../store/store";
import UserMemberships from "../views/user/UserMemberships";
import UserRoles from "../views/user/UserRoles";
import UserTags from "../views/user/UserTags";
import UserMembershipsCreate from "../views/user/UserMembershipsCreate";
import UserTagsCreate from "../views/user/UserTagsCreate";
import UserRolesCreate from "../views/user/UserRolesCreate";

export default [
    {
        path: '/user',
        name: 'users',
        component: UserList,
        props: true
    },
    {
        path: '/user/create',
        name: 'create-user',
        component: UserCreate,
        props: true
    },
    {
        path: '/user/:userId',
        name: 'user',
        component: UserShow,
        props: function(route) {
            return {userId: parseInt(route.params.userId)};
        },
        beforeEnter(routeTo, routeFrom, next) {
            store
                .dispatch('user/loadUser', routeTo.params.userId)
                // eslint-disable-next-line no-unused-vars
                .then(user => {
                    next()
                })
                .catch(error => {
                    if (error.response && error.response.status === 404) {
                        next({name: '404', params: {resource: 'user'}})
                    } else {
                        next({name: 'network-issue'})
                    }
                })
        }
    },
    {
        path: '/user/:userId/membership',
        name: 'user-membership',
        component: UserMemberships,
        props: function(route) {
            return {userId: parseInt(route.params.userId)};
        }
    },
    {
        path: '/user/:userId/membership/create',
        name: 'create-user-membership',
        component: UserMembershipsCreate,
        props: function(route) {
            return {userId: parseInt(route.params.userId)};
        }
    },
    {
        path: '/user/:userId/role',
        name: 'user-role',
        component: UserRoles,
        props: function(route) {
            return {userId: parseInt(route.params.userId)};
        }
    },
    {
        path: '/user/:userId/role/create',
        name: 'create-user-role',
        component: UserRolesCreate,
        props: function(route) {
            return {userId: parseInt(route.params.userId)};
        }
    },
    {
        path: '/user/:userId/tag',
        name: 'user-tag',
        component: UserTags,
        props: function(route) {
            return {userId: parseInt(route.params.userId)};
        }
    },
    {
        path: '/user/:userId/tag/create',
        name: 'create-user-tag',
        component: UserTagsCreate,
        props: function(route) {
            return {userId: parseInt(route.params.userId)};
        }
    }
]