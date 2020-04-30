import GroupTagList from "../views/group-tag/GroupTagList";
import GroupTagShow from "../views/group-tag/GroupTagShow";
import store from "../store/store";
import GroupTagGroups from "../views/group-tag/GroupTagGroups";
import GroupTagCreate from "../views/group-tag/GroupTagCreate";
import GroupTagGroupCreate from "../views/group-tag/GroupTagGroupCreate";

export default [
    {
        path: '/group-tag',
        name: 'groupTags',
        component: GroupTagList,
        props: true
    },
    {
        path: '/group-tag/create',
        name: 'create-groupTag',
        component: GroupTagCreate,
        props: true
    },
    {
        path: '/group-tag/:groupTagId',
        name: 'groupTag',
        component: GroupTagShow,
        props: function(route) {
            return {groupTagId: parseInt(route.params.groupTagId)};
        },
        beforeEnter(routeTo, routeFrom, next) {
            store
                .dispatch('groupTag/loadGroupTag', routeTo.params.groupTagId)
                // eslint-disable-next-line no-unused-vars
                .then(groupTag => {
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
        path: '/group-tag/:groupTagId/group',
        name: 'groupTag-group',
        component: GroupTagGroups,
        props: function(route) {
            return {groupTagId: parseInt(route.params.groupTagId)};
        }
    },
    {
        path: '/group-tag/:groupTagId/group/create',
        name: 'create-groupTag-group',
        component: GroupTagGroupCreate,
        props: function(route) {
            return {groupTagId: parseInt(route.params.groupTagId)};
        }
    }
];