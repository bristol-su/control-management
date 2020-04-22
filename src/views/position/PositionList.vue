<template>
    <div>
        <the-title title="Positions"></the-title>
        <b-row>
            <b-col cols="12">
                <position-table
                    :positions="positions"
                    :loading="loading">
                    <template v-slot:top-row>
                        <td></td>
                        <td>
                            <b-form-input v-model="name" placeholder="Name"></b-form-input>
                        </td>
                        <td>
                            <b-form-input v-model="description" placeholder="Description"></b-form-input>
                        </td>
                        <td>
                            <b-spinner v-if="loading" class="align-middle"></b-spinner>
                        </td>
                    </template>
                </position-table>
            </b-col>
        </b-row>

        <v-pagination-nav
            :number-of-pages="positionPageCount"
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
    import PositionTable from "../../components/position/PositionTable";
    import {cloneDeep, debounce} from 'lodash';

    function loadPositions(page, perPage) {
        return store.dispatch('position/loadPositions', {
            page: page,
            perPage: perPage
        });
    }

    function searchPositions(page, perPage, search) {
        return store.dispatch('position/searchPositions', {
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
        if(query.description) {
            search.description = query.description;
        }
        return search;
    }

    function hasSearchParameters(query) {
        if(query.name) {
            return true;
        }
        if(query.description) {
            return true;
        }
        return false;
    }

    function getPagePositions(routeTo, next) {
        const currentPage = parseInt(routeTo.query.page) || 1;
        const perPage = parseInt(routeTo.query.per_page) || 10;
        const useSearch = hasSearchParameters(routeTo.query);
        const search = extractSearchParameters(routeTo.query);

        ( useSearch === true
            ? searchPositions(currentPage, perPage, search)
            : loadPositions(currentPage, perPage)
        )
            .then(() => {
            routeTo.params.page = currentPage
            routeTo.params.perPage = perPage
            routeTo.params.search = search
            next()
        })
    }

    export default {
        name: "PositionList",
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
            PositionTable,
            TheTitle,
            VPaginationNav
        },
        beforeRouteEnter(routeTo, routeFrom, next) {
            getPagePositions(routeTo, next)
        },
        beforeRouteUpdate(routeTo, routeFrom, next) {
            this.loading = true;
            getPagePositions(routeTo, () => {
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
            ...mapState('position', {
                positions: 'positions',
                positionCount: 'positionCount',
                positionPageCount: 'positionPageCount'
            }),
            route() {
                return {
                    name: 'positions',
                    query: this.$route.query
                }
            },
            description: {
                get: function() {
                    return this.search.description;
                },
                set: debounce(function(val) {
                    this.searchWith('description', val);
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
