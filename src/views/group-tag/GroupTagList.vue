<template>
    <div>
        <the-title title="Group Tags">
            <router-link :to="{name: 'create-groupTag'}">
                <v-button-create title="Create Group Tag"></v-button-create>
            </router-link>
        </the-title>
        <b-row>
            <b-col cols="12">
                <tag-table
                        :tags="groupTags"
                        :loading="loading"
                        view-route-name="groupTag"
                        view-route-parameter="groupTagId">
                </tag-table>
            </b-col>
        </b-row>

        <v-pagination-nav
                :number-of-pages="groupTagPageCount"
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
    import VButtonCreate from "../../components/common/VButtonCreate";

    function getPageGroupTags(routeTo, next) {
        const currentPage = parseInt(routeTo.query.page) || 1;
        const perPage = parseInt(routeTo.query.per_page) || 10;

        store.dispatch('groupTag/loadGroupTags', {
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
        name: "GroupTagList",
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
            TagTable,
            TheTitle,
            VPaginationNav
        },
        beforeRouteEnter(routeTo, routeFrom, next) {
            getPageGroupTags(routeTo, next)
        },
        beforeRouteUpdate(routeTo, routeFrom, next) {
            this.loading = true;
            getPageGroupTags(routeTo, () => {
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
            ...mapState('groupTag', {
                groupTags: 'groupTags',
                groupTagCount: 'groupTagCount',
                groupTagPageCount: 'groupTagPageCount'
            }),
            route() {
                return {
                    name: 'groupTags',
                    query: this.$route.query
                }
            },
        }
    }
</script>

<style scoped>

</style>
