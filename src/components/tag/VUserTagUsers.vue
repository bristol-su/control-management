<template>
    <div>
        <div v-if="!loading && users.length === 0">
            This tag has no users
        </div>
        <user-table :users="users"
                    :deletable="true" delete-text="Untag the user?" @delete="deleteUser" :loading="loading" v-else>
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
    import Notify from "../../service/Notify";
    export default {
            name: "VUserTagUsers",
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
                users: [],
                numberOfPages: 0
            }
        },

        mounted() {
            this.fetchUsers();
        },

        watch: {
            tagId() {
                this.fetchUsers();
            },
            currentPage() {
                this.fetchUsers();
            },
            perPage() {
                this.fetchUsers();
            }
        },

        methods: {
            deleteUser(userId) {
                this.loading = true;
                this.$control.userTag().untagUser(this.tagId, userId)
                    .then(() => {
                        Notify.success('Untagged User');
                        this.fetchUsers();
                    })
                    .catch(() => this.loading = false);
            },
            fetchUsers() {
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