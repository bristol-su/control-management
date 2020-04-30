<template>
    <div>
        <div v-if="!loading && roles.length === 0">
            This tag has no roles
        </div>
        <role-table :roles="roles" :loading="loading" :deletable="true" delete-text="Untag the role?" @delete="deleteRole" v-else>
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
    import Notify from "../../service/Notify";
    export default {
        name: "VRoleTagRoles",
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
            this.fetchRoles();
        },

        watch: {
            tagId() {
                this.fetchRoles();
            },
            currentPage() {
                this.fetchRoles();
            },
            perPage() {
                this.fetchRoles();
            }
        },

        methods: {
            deleteRole(roleId) {
                this.loading = true;
                this.$control.roleTag().untagRole(this.tagId, roleId)
                    .then(() => {
                        Notify.success('Untagged Role');
                        this.fetchRoles();
                    })
                    .catch(() => this.loading = false);
            },
            fetchRoles() {
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