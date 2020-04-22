<template>
    <div>
        <the-title title="Groups"></the-title>
        <b-row>
            <b-col cols="12">
                <group-table
                    :groups="groups"
                    :loading="loading">
                    <template v-slot:top-row>
                        <td></td>
                        <td>
                            <b-form-input v-model="name" placeholder="Name"></b-form-input>
                        </td>
                        <td>
                            <b-form-input v-model="email" placeholder="Email"></b-form-input>
                        </td>
                        <td>
                            <b-spinner v-if="loading" class="align-middle"></b-spinner>
                        </td>
                    </template>
                </group-table>
            </b-col>
        </b-row>

        <v-pagination-nav
            :number-of-pages="groupPageCount"
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
    import GroupTable from "../../components/group/GroupTable";
    import {cloneDeep, debounce} from 'lodash';

    function loadGroups(page, perPage) {
        return store.dispatch('group/loadGroups', {
            page: page,
            perPage: perPage
        });
    }

    function searchGroups(page, perPage, search) {
        return store.dispatch('group/searchGroups', {
            page: page,
            perPage: perPage,
            search: search
        });
    }

    function extractSearchParameters(query) {
        let search = {};
        if(query.name) {
            search.name = query.name;
        }
        if(query.email) {
            search.email = query.email;
        }
        return search;
    }

    function hasSearchParameters(query) {
        if(query.name) {
            return true;
        }
        if(query.email) {
            return true;
        }
        return false;
    }

    function getPageGroups(routeTo, next) {
        const currentPage = parseInt(routeTo.query.page) || 1;
        const perPage = parseInt(routeTo.query.per_page) || 10;
        const useSearch = hasSearchParameters(routeTo.query);
        const search = extractSearchParameters(routeTo.query);

        ( useSearch === true
            ? searchGroups(currentPage, perPage, search)
            : loadGroups(currentPage, perPage)
        )
            .then(() => {
            routeTo.params.page = currentPage
            routeTo.params.perPage = perPage
            routeTo.params.search = search
            next()
        })
    }

    export default {
        name: "GroupList",
        props: {
            page: {
                type: Number,
                required: true
            },
            perPage: {
                type: Number,
                required: true
            },
            search: {
                type: Object,
                default: function() {
                    return {};
                }
            }
        },
        components: {
            GroupTable,
            TheTitle,
            VPaginationNav
        },
        beforeRouteEnter(routeTo, routeFrom, next) {
            getPageGroups(routeTo, next)
        },
        beforeRouteUpdate(routeTo, routeFrom, next) {
            this.loading = true;
            getPageGroups(routeTo, () => {
                this.loading = false
                next()
            })
        },
        data() {
            return {
                loading: false,
            }
        },
        methods: {
            searchWith: function(key, value) {
                let route = cloneDeep(this.route);
                route.query[key] = value;
                route.query.page = 1;
                this.$router.push(route);
            }
        },
        computed: {
            ...mapState('group', {
                groups: 'groups',
                groupCount: 'groupCount',
                groupPageCount: 'groupPageCount'
            }),
            route() {
                return {
                    name: 'groups',
                    query: this.$route.query
                }
            },
            email: {
                get: function() {
                    return this.search.email;
                },
                set: debounce(function(val) {
                    this.searchWith('email', val);
                }, 1000)
            },
            name: {
                get: function() {
                    return this.search.name;
                },
                set: debounce(function(val) {
                    this.searchWith('name', val);
                }, 1000)
            }
        }
    }
</script>

<style scoped>

</style>
