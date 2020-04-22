<template>
    <div>
        <div v-if="!loading && owners.length === 0">
            This role has no owners
        </div>
        <user-table :loading="loading" :users="owners">
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

    export default {
        name: "RoleOwners",
        components: {UserTable, VPagination},
        props: {
            roleId: {
                required: true,
                type: Number
            },
        },

        data() {
            return {
                fields: [
                    {key: 'id', label: 'Owner ID', sortable: true},
                    {key: 'name', label: 'Owner Name', sortable: true},
                    {key: 'full_reference', label: 'Reference', sortable: true},
                    {key: 'actions'}
                ],
                loading: false,
                currentPage: 1,
                perPage: 10,
                owners: [],
                numberOfPages: 0
            }
        },

        mounted() {
            this.fetchOwners();
        },

        watch: {
            roleId() {
                this.fetchOwners();
            },
            currentPage() {
                this.fetchOwners();
            },
            perPage() {
                this.fetchOwners();
            }
        },

        methods: {
            fetchOwners() {
                this.loading = true;
                this.$control.role().users(this.roleId, this.currentPage, this.perPage)
                    .then(response => {
                        this.owners = response.data.data;
                        this.numberOfPages = response.data.last_page;
                    })
                    .catch(error => this.$notify.alert('Could not fetch owners: ' + error.response.message))
                    .then(() => this.loading = false);
            }
        }
    }
</script>

<style scoped>

</style>