<template>
    <div>
        <b-row>
            <b-col cols="6">
                <b-pagination-nav
                        :number-of-pages="numberOfPages"
                        use-router
                        v-on="$listeners"
                        :link-gen="generateRouterLink"
                        :value="currentPage"
                        first-number
                        last-number
                        align="fill">
                </b-pagination-nav>
            </b-col>
            <b-col cols="3">
                <v-pagination-per-page v-model="recordsPerPage"></v-pagination-per-page>
            </b-col>
            <b-col cols="3">
                <v-pagination-goto-page v-model="page">
                </v-pagination-goto-page>
            </b-col>
        </b-row>

    </div>
</template>

<script>
    import {cloneDeep, debounce} from 'lodash';
    import VPaginationPerPage from "./VPaginationPerPage";
    import VPaginationGotoPage from "./VPaginationGotoPage";

    export default {
        name: "VPaginationNav",
        components: {VPaginationGotoPage, VPaginationPerPage},
        props: {
            currentPage: {
                type: Number,
                default: 1,
                validator: function (val) {
                    return val >= 1;
                }
            },
            numberOfPages: {
                type: Number,
                default: 0
            },
            route: {
                type: Object,
                required: true
            },
            perPage: {
                type: Number,
                required: true
            }
        },
        methods: {
            generateRouterLink(page) {
                let route = cloneDeep(this.route);
                route.query.page = page;
                return route;
            }
        },
        computed: {
            page: {
                get: function() {
                    return this.currentPage;
                },
                set: debounce(function(page) {
                    let route = cloneDeep(this.route);
                    route.query.page = page;
                    this.$router.push(route);
                }, 500)
            },
            recordsPerPage: {
                get: function() {
                    return this.perPage;
                },
                set: function(perPage) {
                    let route = cloneDeep(this.route);
                    route.query.per_page = perPage;
                    console.log(this.route, route);
                    this.$router.push(route);
                }
            }
        }
    }
</script>

<style scoped>
</style>