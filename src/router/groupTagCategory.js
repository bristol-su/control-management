import GroupTagCategoryList from "../views/group-tag-category/GroupTagCategoryList";
import GroupTagCategoryShow from "../views/group-tag-category/GroupTagCategoryShow";
import store from "../store/store";
import GroupTagCategoryTags from "../views/group-tag-category/GroupTagCategoryTags";
import GroupTagCategoryCreate from "../views/group-tag-category/GroupTagCategoryCreate";

export default [
    {
        path: '/group-tag-category',
        name: 'groupTagCategories',
        component: GroupTagCategoryList,
        props: true
    },
    {
        path: '/group-tag-category/create',
        name: 'create-groupTagCategory',
        component: GroupTagCategoryCreate,
        props: true
    },
    {
        path: '/group-tag-category/:groupTagCategoryId',
        name: 'groupTagCategory',
        component: GroupTagCategoryShow,
        props: function(route) {
            return {groupTagCategoryId: parseInt(route.params.groupTagCategoryId)};
        },
        beforeEnter(routeTo, routeFrom, next) {
            store
                .dispatch('groupTagCategory/loadGroupTagCategory', routeTo.params.groupTagCategoryId)
                // eslint-disable-next-line no-unused-vars
                .then(groupTagCategory => {
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
        path: '/group-tag-category/:groupTagCategoryId/tag',
        name: 'groupTagCategory-tag',
        component: GroupTagCategoryTags,
        props: function(route) {
            return {groupTagCategoryId: parseInt(route.params.groupTagCategoryId)};
        }
    }
];