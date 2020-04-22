<template>
    <div>
        <b-row>
            <b-col cols="6">
                <b-pagination
                        :total-rows="totalRows"
                        :per-page="recordsPerPage"
                        v-model="page"
                        v-on="$listeners"
                        first-number
                        last-number
                        align="fill">
                </b-pagination>
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
    import {debounce} from 'lodash';
    import VPaginationPerPage from "./VPaginationPerPage";
    import VPaginationGotoPage from "./VPaginationGotoPage";

    export default {
        name: "VPagination",
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
            perPage: {
                type: Number,
                required: true
            }
        },
        computed: {
            page: {
                get: function() {
                    return this.currentPage;
                },
                set: debounce(function(page) {
                    this.$emit('setPage', page);
                }, 500)
            },
            recordsPerPage: {
                get: function() {
                    return this.perPage;
                },
                set: function(perPage) {
                    this.$emit('setPerPage', perPage)
                }
            },
            totalRows() {
                return this.numberOfPages * this.recordsPerPage;
            }
        }
    }
</script>

<style scoped>
</style>