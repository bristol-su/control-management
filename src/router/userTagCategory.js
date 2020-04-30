import UserTagCategoryList from "../views/user-tag-category/UserTagCategoryList";
import UserTagCategoryShow from "../views/user-tag-category/UserTagCategoryShow";
import store from "../store/store";
import UserTagCategoryTags from "../views/user-tag-category/UserTagCategoryTags";
import UserTagCategoryCreate from "../views/user-tag-category/UserTagCategoryCreate";

export default [
    {
        path: '/user-tag-category',
        name: 'userTagCategories',
        component: UserTagCategoryList,
        props: true
    },
    {
        path: '/user-tag-category/create',
        name: 'create-userTagCategory',
        component: UserTagCategoryCreate,
        props: true
    },
    {
        path: '/user-tag-category/:userTagCategoryId',
        name: 'userTagCategory',
        component: UserTagCategoryShow,
        props: function(route) {
            return {userTagCategoryId: parseInt(route.params.userTagCategoryId)};
        },
        beforeEnter(routeTo, routeFrom, next) {
            store
                .dispatch('userTagCategory/loadUserTagCategory', routeTo.params.userTagCategoryId)
                // eslint-disable-next-line no-unused-vars
                .then(userTagCategory => {
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
        path: '/user-tag-category/:userTagCategoryId/tag',
        name: 'userTagCategory-tag',
        component: UserTagCategoryTags,
        props: function(route) {
            return {userTagCategoryId: parseInt(route.params.userTagCategoryId)};
        }
    }
];