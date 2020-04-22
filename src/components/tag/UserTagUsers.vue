<template>
    <div>
        <div v-if="!loading && users.length === 0">
            This tag has no users
        </div>
        <user-table :users="users" :loading="loading" v-else>
        </user-table>
        <v-pagination
                :per-page="perPage"
                :current-page="currentPage"
                :number-of-pages="numberOfPages"
                @setPerPage="perPage = $event"
                @setPage="currentPage = $event">
        </v-pagination>
    </div>
</template>

<script>
    import VPagination from "../common/VPagination";
    import UserTable from "../user/UserTable";
    import ControlService from "../../service/ControlService";
    export default {
        name: "UserTagUsers",
        components: {UserTable, VPagination},
        props: {
            tagId: {
                required: true,
                type: Number
            }
        },

        data() {
            return {
                loading: false,
                currentPage: 1,
                perPage: 10,
                members: [],
                numberOfPages: 0
            }
        },

        mounted() {
            this.fetchMembers();
        },

        watch: {
            tagId() {
                this.fetchMembers();
            },
            currentPage() {
                this.fetchMembers();
            },
            perPage() {
                this.fetchMembers();
            }
        },

        methods: {
            fetchMembers() {
                this.loading = true;
                return ControlService.getService().userTag().users(this.tagId, this.currentPage, this.perPage)
                    .then(response => {
                        this.users = response.data.data;
                        this.numberOfPages = response.data.last_page;
                    })
                    .catch(error => this.$notify.alert('Could not load tagged users: ' + error.response.message))
                    .then(() => this.loading = false);
            }
        },
    }
</script>

<style scoped>

</style>