import UserTagList from "../views/user-tag/UserTagList";
import UserTagShow from "../views/user-tag/UserTagShow";
import store from "../store/store";
import UserTagUsers from "../views/user-tag/UserTagUsers";
import UserTagCreate from "../views/user-tag/UserTagCreate";
import UserTagUserCreate from "../views/user-tag/UserTagUserCreate";

export default [
    {
        path: '/user-tag',
        name: 'userTags',
        component: UserTagList,
        props: true
    },
    {
        path: '/user-tag/create',
        name: 'create-userTag',
        component: UserTagCreate,
        props: true
    },
    {
        path: '/user-tag/:userTagId',
        name: 'userTag',
        component: UserTagShow,
        props: function(route) {
            return {userTagId: parseInt(route.params.userTagId)};
        },
        beforeEnter(routeTo, routeFrom, next) {
            store
                .dispatch('userTag/loadUserTag', routeTo.params.userTagId)
                // eslint-disable-next-line no-unused-vars
                .then(userTag => {
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
        path: '/user-tag/:userTagId/user',
        name: 'userTag-user',
        component: UserTagUsers,
        props: function(route) {
            return {userTagId: parseInt(route.params.userTagId)};
        }
    },
    {
        path: '/user-tag/:userTagId/user/create',
        name: 'create-userTag-user',
        component: UserTagUserCreate,
        props: function(route) {
            return {userTagId: parseInt(route.params.userTagId)};
        }
    }
];