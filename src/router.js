import Vue from 'vue'
import VueRouter from 'vue-router'
import store from './store/store';
import NProgress from 'nprogress'
import NetworkIssue from "./views/errors/NetworkIssue";
import NotFound from "./views/errors/NotFound";
import UserList from "./views/user/UserList";
import UserShow from "./views/user/UserShow";
import GroupList from "./views/group/GroupList";
import GroupShow from "./views/group/GroupShow";
import RoleShow from "./views/role/RoleShow";
import PositionList from "./views/position/PositionList";
import PositionShow from "./views/position/PositionShow";
import UserTagCategoryList from "./views/user-tag-category/UserTagCategoryList";
import PositionTagCategoryList from "./views/position-tag-category/PositionTagCategoryList";
import GroupTagCategoryList from "./views/group-tag-category/GroupTagCategoryList";
import RoleTagCategoryList from "./views/role-tag-category/RoleTagCategoryList";
import UserTagCategoryShow from "./views/user-tag-category/UserTagCategoryShow";
import PositionTagCategoryShow from "./views/position-tag-category/PositionTagCategoryShow";
import GroupTagCategoryShow from "./views/group-tag-category/GroupTagCategoryShow";
import RoleTagCategoryShow from "./views/role-tag-category/RoleTagCategoryShow";
import UserTagList from "./views/user-tag/UserTagList";
import UserTagShow from "./views/user-tag/UserTagShow";
import PositionTagList from "./views/position-tag/PositionTagList";
import GroupTagList from "./views/group-tag/GroupTagList";
import RoleTagList from "./views/role-tag/RoleTagList";
import RoleTagShow from "./views/role-tag/RoleTagShow";
import GroupTagShow from "./views/group-tag/GroupTagShow";
import PositionTagShow from "./views/position-tag/PositionTagShow";

Vue.use(VueRouter);

const routes = [
    {
        path: '/',
        redirect: {name: 'users'}
    },
    {
        path: '/user',
        name: 'users',
        component: UserList,
        props: true
    },
    {
        path: '/user/:userId',
        name: 'user',
        component: UserShow,
        props: true,
        beforeEnter(routeTo, routeFrom, next) {
            store
                .dispatch('user/loadUser', routeTo.params.userId)
                .then(user => {
                    routeTo.params.user = user
                    next()
                })
                .catch(error => {
                    if (error.response && error.response.status === 404) {
                        next({ name: '404', params: { resource: 'user' } })
                    } else {
                        next({ name: 'network-issue' })
                    }
                })
        }
    },
    {
        path: '/group',
        name: 'groups',
        component: GroupList,
        props: true
    },
    {
        path: '/group/:groupId',
        name: 'group',
        component: GroupShow,
        props: true,
        beforeEnter(routeTo, routeFrom, next) {
            store
                .dispatch('group/loadGroup', routeTo.params.groupId)
                .then(group => {
                    routeTo.params.group = group
                    next()
                })
                .catch(error => {
                    if (error.response && error.response.status === 404) {
                        next({ name: '404', params: { resource: 'group' } })
                    } else {
                        next({ name: 'network-issue' })
                    }
                })
        }
    },
    {
        path: '/role/:roleId',
        name: 'role',
        component: RoleShow,
        props: true,
        beforeEnter(routeTo, routeFrom, next) {
            store
                .dispatch('role/loadRole', routeTo.params.roleId)
                .then(role => {
                    routeTo.params.role = role
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
        path: '/position',
        name: 'positions',
        component: PositionList,
        props: true
    },
    {
        path: '/position/:positionId',
        name: 'position',
        component: PositionShow,
        props: true,
        beforeEnter(routeTo, routeFrom, next) {
            store
                .dispatch('position/loadPosition', routeTo.params.positionId)
                .then(position => {
                    routeTo.params.position = position
                    next()
                })
                .catch(error => {
                    if (error.response && error.response.status === 404) {
                        next({ name: '404', params: { resource: 'position' } })
                    } else {
                        next({ name: 'network-issue' })
                    }
                })
        }
    },
    {
        path: '/position-tag',
        name: 'positionTags',
        component: PositionTagList,
        props: true
    },
    {
        path: '/position-tag/:positionTagId',
        name: 'positionTag',
        component: PositionTagShow,
        props: true,
        beforeEnter(routeTo, routeFrom, next) {
            store
                .dispatch('positionTag/loadPositionTag', routeTo.params.positionTagId)
                .then(positionTag => {
                    routeTo.params.positionTag = positionTag
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
        path: '/group-tag',
        name: 'groupTags',
        component: GroupTagList,
        props: true
    },
    {
        path: '/group-tag/:groupTagId',
        name: 'groupTag',
        component: GroupTagShow,
        props: true,
        beforeEnter(routeTo, routeFrom, next) {
            store
                .dispatch('groupTag/loadGroupTag', routeTo.params.groupTagId)
                .then(groupTag => {
                    routeTo.params.groupTag = groupTag
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
        path: '/role-tag',
        name: 'roleTags',
        component: RoleTagList,
        props: true
    },
    {
        path: '/role-tag/:roleTagId',
        name: 'roleTag',
        component: RoleTagShow,
        props: true,
        beforeEnter(routeTo, routeFrom, next) {
            store
                .dispatch('roleTag/loadRoleTag', routeTo.params.roleTagId)
                .then(roleTag => {
                    routeTo.params.roleTag = roleTag
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
        path: '/user-tag',
        name: 'userTags',
        component: UserTagList,
        props: true
    },
    {
        path: '/user-tag/:userTagId',
        name: 'userTag',
        component: UserTagShow,
        props: true,
        beforeEnter(routeTo, routeFrom, next) {
            store
                .dispatch('userTag/loadUserTag', routeTo.params.userTagId)
                .then(userTag => {
                    routeTo.params.userTag = userTag
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
        path: '/position-tag-category',
        name: 'positionTagCategories',
        component: PositionTagCategoryList,
        props: true
    },
    {
        path: '/position-tag-category/:positionTagCategoryId',
        name: 'positionTagCategory',
        component: PositionTagCategoryShow,
        props: true,
        beforeEnter(routeTo, routeFrom, next) {
            store
                .dispatch('positionTagCategory/loadPositionTagCategory', routeTo.params.positionTagCategoryId)
                .then(positionTagCategory => {
                    routeTo.params.positionTagCategory = positionTagCategory
                    next()
                })
                .catch(error => {
                    if (error.response && error.response.status === 404) {
                        next({ name: '404', params: { resource: 'positionTagCategory' } })
                    } else {
                        next({ name: 'network-issue' })
                    }
                })
        }
    },
    {
        path: '/group-tag-category',
        name: 'groupTagCategories',
        component: GroupTagCategoryList,
        props: true
    },
    {
        path: '/group-tag-category/:groupTagCategoryId',
        name: 'groupTagCategory',
        component: GroupTagCategoryShow,
        props: true,
        beforeEnter(routeTo, routeFrom, next) {
            store
                .dispatch('groupTagCategory/loadGroupTagCategory', routeTo.params.groupTagCategoryId)
                .then(groupTagCategory => {
                    routeTo.params.groupTagCategory = groupTagCategory
                    next()
                })
                .catch(error => {
                    if (error.response && error.response.status === 404) {
                        next({ name: '404', params: { resource: 'groupTagCategory' } })
                    } else {
                        next({ name: 'network-issue' })
                    }
                })
        }
    },
    {
        path: '/role-tag-category',
        name: 'roleTagCategories',
        component: RoleTagCategoryList,
        props: true
    },
    {
        path: '/role-tag-category/:roleTagCategoryId',
        name: 'roleTagCategory',
        component: RoleTagCategoryShow,
        props: true,
        beforeEnter(routeTo, routeFrom, next) {
            store
                .dispatch('roleTagCategory/loadRoleTagCategory', routeTo.params.roleTagCategoryId)
                .then(roleTagCategory => {
                    routeTo.params.roleTagCategory = roleTagCategory
                    next()
                })
                .catch(error => {
                    if (error.response && error.response.status === 404) {
                        next({ name: '404', params: { resource: 'roleTagCategory' } })
                    } else {
                        next({ name: 'network-issue' })
                    }
                })
        }
    },
    {
        path: '/user-tag-category',
        name: 'userTagCategories',
        component: UserTagCategoryList,
        props: true
    },
    {
        path: '/user-tag-category/:userTagCategoryId',
        name: 'userTagCategory',
        component: UserTagCategoryShow,
        props: true,
        beforeEnter(routeTo, routeFrom, next) {
            store
                .dispatch('userTagCategory/loadUserTagCategory', routeTo.params.userTagCategoryId)
                .then(userTagCategory => {
                    routeTo.params.userTagCategory = userTagCategory
                    next()
                })
                .catch(error => {
                    if (error.response && error.response.status === 404) {
                        next({ name: '404', params: { resource: 'userTagCategory' } })
                    } else {
                        next({ name: 'network-issue' })
                    }
                })
        }
    },
    {
        path: '/404',
        name: '404',
        component: NotFound,
        props: true
    },
    {
        path: '/network-issue',
        name: 'network-issue',
        component: NetworkIssue
    },
    {
        path: '*',
        redirect: { name: '404', params: { resource: 'page' } }
    }
];

const router = new VueRouter({
    routes
});

router.beforeEach((routeTo, routeFrom, next) => {
    NProgress.start()
    next()
})

router.afterEach(() => {
    NProgress.done()
})

export default router
