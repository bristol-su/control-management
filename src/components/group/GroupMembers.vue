<template>
    <div>
        <div v-if="!loading && members.length === 0">
            This group has no members
        </div>
        <user-table :users="members" :loading="loading" v-else>
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
    import UserTable from "../user/UserTable";
    import VPagination from "../common/VPagination";
    import ControlService from "../../service/ControlService";

    export default {
        name: "GroupMembers",
        components: {VPagination, UserTable},
        props: {
            groupId: {
                required: true,
                type: Number
            },
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
            groupId() {
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
                return ControlService.getService().group().users(this.groupId, this.currentPage, this.perPage)
                    .then(response => {
                        this.members = response.data.data;
                        this.numberOfPages = response.data.last_page;
                    })
                    .catch(error => this.$notify.alert('Could not load group members: ' + error.response.message))
                    .then(() => this.loading = false);
            }
        },
    }
</script>

<style scoped>

</style>