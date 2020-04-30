import PositionList from "../views/position/PositionList";
import PositionCreate from "../views/position/PositionCreate";
import PositionShow from "../views/position/PositionShow";
import store from "../store/store";
import PositionRoles from "../views/position/PositionRoles";
import PositionTags from "../views/position/PositionTags";
import PositionTagsCreate from "../views/position/PositionTagsCreate";

export default [
    {
        path: '/position',
        name: 'positions',
        component: PositionList,
        props: true
    },
    {
        path: '/position/create',
        name: 'create-position',
        component: PositionCreate
    },
    {
        path: '/position/:positionId',
        name: 'position',
        component: PositionShow,
        props: function(route) {
            return {positionId: parseInt(route.params.positionId)};
        },
        beforeEnter(routeTo, routeFrom, next) {
            store
                .dispatch('position/loadPosition', routeTo.params.positionId)
                // eslint-disable-next-line no-unused-vars
                .then(position => {
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
        path: '/position/:positionId/role',
        name: 'position-role',
        component: PositionRoles,
        props: function(route) {
            return {positionId: parseInt(route.params.positionId)};
        }
    },
    {
        path: '/position/:positionId/tag',
        name: 'position-tag',
        component: PositionTags,
        props: function(route) {
            return {positionId: parseInt(route.params.positionId)};
        }
    },
    {
        path: '/position/:positionId/tag/create',
        name: 'create-position-tag',
        component: PositionTagsCreate,
        props: function(route) {
            return {positionId: parseInt(route.params.positionId)};
        }
    }
]