<template>
    <div>
        <the-title title="Role Tags - Categories">
            <router-link :to="{name: 'create-roleTagCategory'}">
                <v-button-create title="Create Role Tag Category"></v-button-create>
            </router-link>
        </the-title>
        <b-row>
            <b-col cols="12">
                <tag-category-table
                        :categories="roleTagCategories"
                        :loading="loading"
                        view-route-name="roleTagCategory"
                        view-route-parameter="roleTagCategoryId">
                </tag-category-table>
            </b-col>
        </b-row>

        <v-pagination-nav
                :number-of-pages="roleTagCategoryPageCount"
                :current-page="page"
                :route="route"
                :per-page="perPage">
        </v-pagination-nav>

    </div>
</template>

<script>
    import {mapState} from 'vuex';
    import VPaginationNav from "../../components/common/VPaginationNav";
    import store from '../../store/store';
    import TheTitle from "../../components/common/TheTitle";
    import TagCategoryTable from "../../components/tag-category/TagCategoryTable";
    import VButtonCreate from "../../components/common/VButtonCreate";

    function getPageRoleTagCategories(routeTo, next) {
        const currentPage = parseInt(routeTo.query.page) || 1;
        const perPage = parseInt(routeTo.query.per_page) || 10;

        store.dispatch('roleTagCategory/loadRoleTagCategories', {
            page: currentPage,
            perPage: perPage
        })
            .then(() => {
                routeTo.params.page = currentPage
                routeTo.params.perPage = perPage
                next()
            })
    }

    export default {
        name: "RoleTagCategoryList",
        props: {
            page: {
                type: Number,
                required: true
            },
            perPage: {
                type: Number,
                required: true
            },
        },
        components: {
            VButtonCreate,
            TagCategoryTable,
            TheTitle,
            VPaginationNav
        },
        beforeRouteEnter(routeTo, routeFrom, next) {
            getPageRoleTagCategories(routeTo, next)
        },
        beforeRouteUpdate(routeTo, routeFrom, next) {
            this.loading = true;
            getPageRoleTagCategories(routeTo, () => {
                this.loading = false
                next()
            })
        },
        data() {
            return {
                loading: false,
            }
        },
        computed: {
            ...mapState('roleTagCategory', {
                roleTagCategories: 'roleTagCategories',
                roleTagCategoryCount: 'roleTagCategoryCount',
                roleTagCategoryPageCount: 'roleTagCategoryPageCount'
            }),
            route() {
                return {
                    name: 'roleTagCategories',
                    query: this.$route.query
                }
            },
        }
    }
</script>

<style scoped>

</style>
