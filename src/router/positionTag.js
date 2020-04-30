import PositionTagList from "../views/position-tag/PositionTagList";
import PositionTagShow from "../views/position-tag/PositionTagShow";
import store from "../store/store";
import PositionTagPositions from "../views/position-tag/PositionTagPositions";
import PositionTagCreate from "../views/position-tag/PositionTagCreate";
import PositionTagPositionCreate from "../views/position-tag/PositionTagPositionCreate";

export default [
    {
        path: '/position-tag',
        name: 'positionTags',
        component: PositionTagList,
        props: true
    },
    {
        path: '/position-tag/create',
        name: 'create-positionTag',
        component: PositionTagCreate,
        props: true
    },
    {
        path: '/position-tag/:positionTagId',
        name: 'positionTag',
        component: PositionTagShow,
        props: function(route) {
            return {positionTagId: parseInt(route.params.positionTagId)};
        },
        beforeEnter(routeTo, routeFrom, next) {
            store
                .dispatch('positionTag/loadPositionTag', routeTo.params.positionTagId)
                // eslint-disable-next-line no-unused-vars
                .then(positionTag => {
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
        path: '/position-tag/:positionTagId/position',
        name: 'positionTag-position',
        component: PositionTagPositions,
        props: function(route) {
            return {positionTagId: parseInt(route.params.positionTagId)};
        },
    },
    {
        path: '/position-tag/:positionTagId/position/create',
        name: 'create-positionTag-position',
        component: PositionTagPositionCreate,
        props: function(route) {
            return {positionTagId: parseInt(route.params.positionTagId)};
        }
    }
];