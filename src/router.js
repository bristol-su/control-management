import Vue from 'vue'
import VueRouter from 'vue-router'
import NProgress from 'nprogress'
import NetworkIssue from "./views/errors/NetworkIssue";
import NotFound from "./views/errors/NotFound";
import user from './router/user';
import position from './router/position';
import group from './router/group';
import role from './router/role';
import userTag from "./router/userTag";
import positionTag from "./router/positionTag";
import groupTag from "./router/groupTag";
import roleTag from "./router/roleTag";
import userTagCategory from "./router/userTagCategory";
import positionTagCategory from "./router/positionTagCategory";
import roleTagCategory from "./router/roleTagCategory";
import groupTagCategory from "./router/groupTagCategory";

Vue.use(VueRouter);

const routes = [
    {
        path: '/',
        redirect: {name: 'users'}
    },
    ...user,
    ...group,
    ...position,
    ...role,
    ...userTag,
    ...positionTag,
    ...groupTag,
    ...roleTag,
    ...userTagCategory,
    ...positionTagCategory,
    ...roleTagCategory,
    ...groupTagCategory,
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
        redirect: {name: '404', params: {resource: 'page'}}
    }
];

const router = new VueRouter({
    routes,
});

router.beforeEach((routeTo, routeFrom, next) => {
    NProgress.start()
    next()
})

router.afterEach(() => {
    NProgress.done()
})

export default router
