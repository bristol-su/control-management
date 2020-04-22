<template>
    <div>
        <the-title title="Group Tags - Categories"></the-title>
        <b-row>
            <b-col cols="12">
                <tag-category-table
                        :categories="groupTagCategories"
                        :loading="loading"
                        view-route-name="groupTagCategory"
                        view-route-parameter="groupTagCategoryId">
                </tag-category-table>
            </b-col>
        </b-row>

        <v-pagination-nav
                :number-of-pages="groupTagCategoryPageCount"
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

    function getPageGroupTagCategories(routeTo, next) {
        const currentPage = parseInt(routeTo.query.page) || 1;
        const perPage = parseInt(routeTo.query.per_page) || 10;

        store.dispatch('groupTagCategory/loadGroupTagCategories', {
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
        name: "GroupTagCategoryList",
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
            getPageGroupTagCategories(routeTo, next)
        },
        beforeRouteUpdate(routeTo, routeFrom, next) {
            this.loading = true;
            getPageGroupTagCategories(routeTo, () => {
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
            ...mapState('groupTagCategory', {
                groupTagCategories: 'groupTagCategories',
                groupTagCategoryCount: 'groupTagCategoryCount',
                groupTagCategoryPageCount: 'groupTagCategoryPageCount'
            }),
            route() {
                return {
                    name: 'groupTagCategories',
                    query: this.$route.query
                }
            },
        }
    }
</script>

<style scoped>

</style>
