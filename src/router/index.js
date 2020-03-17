import Vue from 'vue'
import VueRouter from 'vue-router'
import UserIndex from '../components/user/index/Index';
import UserShow from '../components/user/show/Show';
import GroupIndex from '../components/group/index/Index';
import GroupShow from '../components/group/show/Show';
import RoleIndex from '../components/role/index/Index';
import RoleShow from '../components/role/show/Show';
import PositionIndex from '../components/position/index/Index';
import PositionShow from '../components/position/show/Show';
import PositionTagIndex from '../components/tag/position/index/Index';
import PositionTagShow from '../components/tag/position/show/Show';
import RoleTagIndex from '../components/tag/role/index/Index';
import RoleTagShow from '../components/tag/role/show/Show';
import GroupTagIndex from '../components/tag/group/index/Index';
import GroupTagShow from '../components/tag/group/show/Show';
import UserTagIndex from '../components/tag/user/index/Index';
import UserTagShow from '../components/tag/user/show/Show';
import PositionTagCategoryIndex from '../components/tag-category/position/index/Index';
import PositionTagCategoryShow from '../components/tag-category/position/show/Show';
import RoleTagCategoryIndex from '../components/tag-category/role/index/Index';
import RoleTagCategoryShow from '../components/tag-category/role/show/Show';
import GroupTagCategoryIndex from '../components/tag-category/group/index/Index';
import GroupTagCategoryShow from '../components/tag-category/group/show/Show';
import UserTagCategoryIndex from '../components/tag-category/user/index/Index';
import UserTagCategoryShow from '../components/tag-category/user/show/Show';

Vue.use(VueRouter);

const routes = [
    {
        path: '/',
        redirect: {name: 'users'}
    },
    {
        path: '/user',
        name: 'users',
        component: UserIndex
    },
    {
        path: '/user/:userId',
        name: 'user',
        component: UserShow
    },
    {
        path: '/group',
        name: 'groups',
        component: GroupIndex
    },
    {
        path: '/group/:groupId',
        name: 'group',
        component: GroupShow
    },
    {
        path: '/role',
        name: 'roles',
        component: RoleIndex
    },
    {
        path: '/role/:roleId',
        name: 'role',
        component: RoleShow
    },
    {
        path: '/position',
        name: 'positions',
        component: PositionIndex
    },
    {
        path: '/position/:positionId',
        name: 'position',
        component: PositionShow
    },
    {
        path: '/position-tag',
        name: 'positionTags',
        component: PositionTagIndex
    },
    {
        path: '/position-tag/:positionTagId',
        name: 'positionTag',
        component: PositionTagShow
    },
    {
        path: '/group-tag',
        name: 'groupTags',
        component: GroupTagIndex
    },
    {
        path: '/group-tag/:groupTagId',
        name: 'groupTag',
        component: GroupTagShow
    },
    {
        path: '/role-tag',
        name: 'roleTags',
        component: RoleTagIndex
    },
    {
        path: '/role-tag/:roleTagId',
        name: 'roleTag',
        component: RoleTagShow
    },
    {
        path: '/user-tag',
        name: 'userTags',
        component: UserTagIndex
    },
    {
        path: '/user-tag/:userTagId',
        name: 'userTag',
        component: UserTagShow
    },
    {
        path: '/position-tag-category',
        name: 'positionTagCategories',
        component: PositionTagCategoryIndex
    },
    {
        path: '/position-tag-category/:positionTagCategoryId',
        name: 'positionTagCategory',
        component: PositionTagCategoryShow
    },
    {
        path: '/group-tag-category',
        name: 'groupTagCategories',
        component: GroupTagCategoryIndex
    },
    {
        path: '/group-tag-category/:groupTagCategoryId',
        name: 'groupTagCategory',
        component: GroupTagCategoryShow
    },
    {
        path: '/role-tag-category',
        name: 'roleTagCategories',
        component: RoleTagCategoryIndex
    },
    {
        path: '/role-tag-category/:roleTagCategoryId',
        name: 'roleTagCategory',
        component: RoleTagCategoryShow
    },
    {
        path: '/user-tag-category',
        name: 'userTagCategories',
        component: UserTagCategoryIndex
    },
    {
        path: '/user-tag-category/:userTagCategoryId',
        name: 'userTagCategory',
        component: UserTagCategoryShow
    },
];

const router = new VueRouter({
    routes
});

export default router
