import GroupList from "../views/group/GroupList";
import GroupCreate from "../views/group/GroupCreate";
import GroupShow from "../views/group/GroupShow";
import store from "../store/store";
import GroupMembers from "../views/group/GroupMembers";
import GroupRoles from "../views/group/GroupRoles";
import GroupTags from "../views/group/GroupTags";
import GroupMembersCreate from "../views/group/GroupMembersCreate";
import GroupRolesCreate from "../views/group/GroupRolesCreate";
import GroupTagsCreate from "../views/group/GroupTagsCreate";

export default [
    {
        path: '/group',
        name: 'groups',
        component: GroupList,
        props: true
    },
    {
        path: '/group/create',
        name: 'create-group',
        component: GroupCreate
    },
    {
        path: '/group/:groupId',
        name: 'group',
        component: GroupShow,
        props: function(route) {
            return {groupId: parseInt(route.params.groupId)};
        },
        beforeEnter(routeTo, routeFrom, next) {
            store
                .dispatch('group/loadGroup', routeTo.params.groupId)
                // eslint-disable-next-line no-unused-vars
                .then(response => {
                    next()
                })
                .catch(error => {
                    if (error.response && error.response.status === 404) {
                        next({name: '404', params: {resource: 'group'}})
                    } else {
                        next({name: 'network-issue'})
                    }
                })
        }
    },
    {
        path: '/group/:groupId/member',
        name: 'group-member',
        component: GroupMembers,
        props: function(route) {
            return {groupId: parseInt(route.params.groupId)};
        }
    },
    {
        path: '/group/:groupId/role',
        name: 'group-role',
        component: GroupRoles,
        props: function(route) {
            return {groupId: parseInt(route.params.groupId)};
        }
    },
    {
        path: '/group/:groupId/tag',
        name: 'group-tag',
        component: GroupTags,
        props: function(route) {
            return {groupId: parseInt(route.params.groupId)};
        }
    },
    {
        path: '/group/:groupId/member/create',
        name: 'create-group-member',
        component: GroupMembersCreate,
        props: function(route) {
            return {groupId: parseInt(route.params.groupId)};
        }
    },
    {
        path: '/group/:groupId/role/create',
        name: 'create-group-role',
        component: GroupRolesCreate,
        props: function(route) {
            return {groupId: parseInt(route.params.groupId)};
        }
    },
    {
        path: '/group/:groupId/tag/create',
        name: 'create-group-tag',
        component: GroupTagsCreate,
        props: function(route) {
            return {groupId: parseInt(route.params.groupId)};
        }
    }
]