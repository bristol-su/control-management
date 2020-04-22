<template>
    <div>
        <the-title title="Position Tags - Categories"></the-title>
        <b-row>
            <b-col cols="12">
                <tag-category-table
                        :categories="positionTagCategories"
                        :loading="loading"
                        view-route-name="positionTagCategory"
                        view-route-parameter="positionTagCategoryId">
                </tag-category-table>
            </b-col>
        </b-row>

        <v-pagination-nav
                :number-of-pages="positionTagCategoryPageCount"
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

    function getPagePositionTagCategories(routeTo, next) {
        const currentPage = parseInt(routeTo.query.page) || 1;
        const perPage = parseInt(routeTo.query.per_page) || 10;

        store.dispatch('positionTagCategory/loadPositionTagCategories', {
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
        name: "PositionTagCategoryList",
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
            getPagePositionTagCategories(routeTo, next)
        },
        beforeRouteUpdate(routeTo, routeFrom, next) {
            this.loading = true;
            getPagePositionTagCategories(routeTo, () => {
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
            ...mapState('positionTagCategory', {
                positionTagCategories: 'positionTagCategories',
                positionTagCategoryCount: 'positionTagCategoryCount',
                positionTagCategoryPageCount: 'positionTagCategoryPageCount'
            }),
            route() {
                return {
                    name: 'positionTagCategories',
                    query: this.$route.query
                }
            },
        }
    }
</script>

<style scoped>

</style>
