<template>
    <div>
        <the-title title="Position Tags"></the-title>
        <b-row>
            <b-col cols="12">
                <tag-table
                        :tags="positionTags"
                        :loading="loading"
                        view-route-name="positionTag"
                        view-route-parameter="positionTagId">
                </tag-table>
            </b-col>
        </b-row>

        <v-pagination-nav
                :number-of-pages="positionTagPageCount"
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
    import TagTable from "../../components/tag/TagTable";

    function getPagePositionTags(routeTo, next) {
        const currentPage = parseInt(routeTo.query.page) || 1;
        const perPage = parseInt(routeTo.query.per_page) || 10;

        store.dispatch('positionTag/loadPositionTags', {
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
        name: "PositionTagList",
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
            TagTable,
            TheTitle,
            VPaginationNav
        },
        beforeRouteEnter(routeTo, routeFrom, next) {
            getPagePositionTags(routeTo, next)
        },
        beforeRouteUpdate(routeTo, routeFrom, next) {
            this.loading = true;
            getPagePositionTags(routeTo, () => {
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
            ...mapState('positionTag', {
                positionTags: 'positionTags',
                positionTagCount: 'positionTagCount',
                positionTagPageCount: 'positionTagPageCount'
            }),
            route() {
                return {
                    name: 'positionTags',
                    query: this.$route.query
                }
            },
        }
    }
</script>

<style scoped>

</style>
