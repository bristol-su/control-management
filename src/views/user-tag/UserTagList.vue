<template>
    <div>
        <the-title title="User Tags"></the-title>
        <b-row>
            <b-col cols="12">
                <tag-table
                        :tags="userTags"
                        :loading="loading"
                        view-route-name="userTag"
                        view-route-parameter="userTagId">
                </tag-table>
            </b-col>
        </b-row>

        <v-pagination-nav
                :number-of-pages="userTagPageCount"
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

    function getPageUserTags(routeTo, next) {
        const currentPage = parseInt(routeTo.query.page) || 1;
        const perPage = parseInt(routeTo.query.per_page) || 10;

        store.dispatch('userTag/loadUserTags', {
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
        name: "UserTagList",
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
            getPageUserTags(routeTo, next)
        },
        beforeRouteUpdate(routeTo, routeFrom, next) {
            this.loading = true;
            getPageUserTags(routeTo, () => {
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
            ...mapState('userTag', {
                userTags: 'userTags',
                userTagCount: 'userTagCount',
                userTagPageCount: 'userTagPageCount'
            }),
            route() {
                return {
                    name: 'userTags',
                    query: this.$route.query
                }
            },
        }
    }
</script>

<style scoped>

</style>
