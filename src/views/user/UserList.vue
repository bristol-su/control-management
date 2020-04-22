<template>
    <div>
        <the-title title="Users"></the-title>
        <b-row>
            <b-col cols="12">
                <user-table
                    :users="users"
                    :loading="loading">
                    <template v-slot:top-row>
                        <td></td>
                        <td>
                            <b-form-input v-model="firstName" placeholder="First Name"></b-form-input>
                        </td>
                        <td>
                            <b-form-input v-model="lastName" placeholder="Last Name"></b-form-input>
                        </td>
                        <td>
                            <b-form-input v-model="email" placeholder="Email"></b-form-input>
                        </td>
                        <td>
                            <b-spinner v-if="loading" class="align-middle"></b-spinner>
                        </td>
                    </template>
                </user-table>
            </b-col>
        </b-row>

        <v-pagination-nav
            :number-of-pages="userPageCount"
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
    import UserTable from "../../components/user/UserTable";
    import {cloneDeep, debounce} from 'lodash';

    function loadUsers(page, perPage) {
        return store.dispatch('user/loadUsers', {
            page: page,
            perPage: perPage
        });
    }

    function searchUsers(page, perPage, search) {
        return store.dispatch('user/searchUsers', {
            page: page,
            perPage: perPage,
            search: search
        });
    }

    function extractSearchParameters(query) {
        let search = {};
        if(query.first_name) {
            search.first_name = query.first_name;
        }
        if(query.last_name) {
            search.last_name = query.last_name;
        }
        if(query.email) {
            search.email = query.email;
        }
        return search;
    }

    function getPageUsers(routeTo, next) {
        const currentPage = parseInt(routeTo.query.page) || 1;
        const perPage = parseInt(routeTo.query.per_page) || 10;
        const search = extractSearchParameters(routeTo.query);

        ( Object.keys(search).length > 0
            ? searchUsers(currentPage, perPage, search)
            : loadUsers(currentPage, perPage)
        )
            .then(() => {
            routeTo.params.page = currentPage
            routeTo.params.perPage = perPage
            routeTo.params.search = search
            next()
        })
    }

    export default {
        name: "UserList",
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
            UserTable,
            TheTitle,
            VPaginationNav
        },
        beforeRouteEnter(routeTo, routeFrom, next) {
            getPageUsers(routeTo, next)
        },
        beforeRouteUpdate(routeTo, routeFrom, next) {
            this.loading = true;
            getPageUsers(routeTo, () => {
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
                this.$router.push(route);
            }
        },
        computed: {
            ...mapState('user', {
                users: 'users',
                userCount: 'userCount',
                userPageCount: 'userPageCount'
            }),
            route() {
                return {
                    name: 'users',
                    query: this.$route.query
                }
            },
            firstName: {
                get: function() {
                    return this.search.first_name;
                },
                set: debounce(function(val) {
                    this.searchWith('first_name', val);
                }, 1000)
            },
            lastName: {
                get: function() {
                    return this.search.last_name;
                },
                set: debounce(function(val) {
                    this.searchWith('last_name', val);
                }, 1000)
            },
            email: {
                get: function() {
                    return this.search.email;
                },
                set: debounce(function(val) {
                    this.searchWith('email', val);
                }, 1000)
            }
        }
    }
</script>

<style scoped>

</style>
