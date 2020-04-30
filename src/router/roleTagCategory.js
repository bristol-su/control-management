import RoleTagCategoryList from "../views/role-tag-category/RoleTagCategoryList";
import RoleTagCategoryShow from "../views/role-tag-category/RoleTagCategoryShow";
import store from "../store/store";
import RoleTagCategoryTags from "../views/role-tag-category/RoleTagCategoryTags";
import RoleTagCategoryCreate from "../views/role-tag-category/RoleTagCategoryCreate";

export default [
    {
        path: '/role-tag-category',
        name: 'roleTagCategories',
        component: RoleTagCategoryList,
        props: true
    },
    {
        path: '/role-tag-category/create',
        name: 'create-roleTagCategory',
        component: RoleTagCategoryCreate,
        props: true
    },  
    {
        path: '/role-tag-category/:roleTagCategoryId',
        name: 'roleTagCategory',
        component: RoleTagCategoryShow,
        props: function(route) {
            return {roleTagCategoryId: parseInt(route.params.roleTagCategoryId)};
        },
        beforeEnter(routeTo, routeFrom, next) {
            store
                .dispatch('roleTagCategory/loadRoleTagCategory', routeTo.params.roleTagCategoryId)
                // eslint-disable-next-line no-unused-vars
                .then(roleTagCategory => {
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
        path: '/role-tag-category/:roleTagCategoryId/tag',
        name: 'roleTagCategory-tag',
        component: RoleTagCategoryTags,
        props: function(route) {
            return {roleTagCategoryId: parseInt(route.params.roleTagCategoryId)};
        }
    }
];