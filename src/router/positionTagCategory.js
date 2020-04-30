import PositionTagCategoryList from "../views/position-tag-category/PositionTagCategoryList";
import PositionTagCategoryShow from "../views/position-tag-category/PositionTagCategoryShow";
import store from "../store/store";
import PositionTagCategoryTags from "../views/position-tag-category/PositionTagCategoryTags";
import PositionTagCategoryCreate from "../views/position-tag-category/PositionTagCategoryCreate";

export default [
    {
        path: '/position-tag-category',
        name: 'positionTagCategories',
        component: PositionTagCategoryList,
        props: true
    },
    {
        path: '/position-tag-category/create',
        name: 'create-positionTagCategory',
        component: PositionTagCategoryCreate,
        props: true
    },
    {
        path: '/position-tag-category/:positionTagCategoryId',
        name: 'positionTagCategory',
        component: PositionTagCategoryShow,
        props: function(route) {
            return {positionTagCategoryId: parseInt(route.params.positionTagCategoryId)};
        },
        beforeEnter(routeTo, routeFrom, next) {
            store
                .dispatch('positionTagCategory/loadPositionTagCategory', routeTo.params.positionTagCategoryId)
                // eslint-disable-next-line no-unused-vars
                .then(positionTagCategory => {
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
        path: '/position-tag-category/:positionTagCategoryId/tag',
        name: 'positionTagCategory-tag',
        component: PositionTagCategoryTags,
        props: function(route) {
            return {positionTagCategoryId: parseInt(route.params.positionTagCategoryId)};
        }
    }
];