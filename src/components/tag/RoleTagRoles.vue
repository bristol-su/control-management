<template>
    <div>
        <div v-if="!loading && roles.length === 0">
            This tag has no roles
        </div>
        <role-table :roles="roles" :loading="loading" v-else>
        </role-table>
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
    import RoleTable from "../role/RoleTable";
    import ControlService from "../../service/ControlService";
    export default {
        name: "RoleTagRoles",
        components: {RoleTable, VPagination},
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
                roles: [],
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
                return ControlService.getService().roleTag().roles(this.tagId, this.currentPage, this.perPage)
                    .then(response => {
                        this.roles = response.data.data;
                        this.numberOfPages = response.data.last_page;
                    })
                    .catch(error => this.$notify.alert('Could not load tagged roles: ' + error.response.message))
                    .then(() => this.loading = false);
            }
        },
    }
</script>

<style scoped>

</style>