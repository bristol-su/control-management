<template>
    <div>
        <the-title title="Role Tags"></the-title>
        <b-row>
            <b-col cols="12">
                <tag-table
                        :tags="roleTags"
                        :loading="loading"
                        view-route-name="roleTag"
                        view-route-parameter="roleTagId">
                </tag-table>
            </b-col>
        </b-row>

        <v-pagination-nav
                :number-of-pages="roleTagPageCount"
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

    function getPageRoleTags(routeTo, next) {
        const currentPage = parseInt(routeTo.query.page) || 1;
        const perPage = parseInt(routeTo.query.per_page) || 10;

        store.dispatch('roleTag/loadRoleTags', {
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
        name: "RoleTagList",
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
            getPageRoleTags(routeTo, next)
        },
        beforeRouteUpdate(routeTo, routeFrom, next) {
            this.loading = true;
            getPageRoleTags(routeTo, () => {
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
            ...mapState('roleTag', {
                roleTags: 'roleTags',
                roleTagCount: 'roleTagCount',
                roleTagPageCount: 'roleTagPageCount'
            }),
            route() {
                return {
                    name: 'roleTags',
                    query: this.$route.query
                }
            },
        }
    }
</script>

<style scoped>

</style>
