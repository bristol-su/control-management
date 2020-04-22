<template>
    <div>
        <the-title title="User Tags - Categories"></the-title>
        <b-row>
            <b-col cols="12">
                <tag-category-table
                        :categories="userTagCategories"
                        :loading="loading"
                        view-route-name="userTagCategory"
                        view-route-parameter="userTagCategoryId">
                </tag-category-table>
            </b-col>
        </b-row>

        <v-pagination-nav
                :number-of-pages="userTagCategoryPageCount"
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

    function getPageUserTagCategories(routeTo, next) {
        const currentPage = parseInt(routeTo.query.page) || 1;
        const perPage = parseInt(routeTo.query.per_page) || 10;

        store.dispatch('userTagCategory/loadUserTagCategories', {
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
        name: "UserTagCategoryList",
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
            TagCategoryTable,
            TheTitle,
            VPaginationNav
        },
        beforeRouteEnter(routeTo, routeFrom, next) {
            getPageUserTagCategories(routeTo, next)
        },
        beforeRouteUpdate(routeTo, routeFrom, next) {
            this.loading = true;
            getPageUserTagCategories(routeTo, () => {
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
            ...mapState('userTagCategory', {
                userTagCategories: 'userTagCategories',
                userTagCategoryCount: 'userTagCategoryCount',
                userTagCategoryPageCount: 'userTagCategoryPageCount'
            }),
            route() {
                return {
                    name: 'userTagCategories',
                    query: this.$route.query
                }
            },
        }
    }
</script>

<style scoped>

</style>
