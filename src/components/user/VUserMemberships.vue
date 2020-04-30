<template>
    <div>
        <div v-if="!loading && memberships.length === 0">
            This user has no memberships
        </div>
        <b-table :items="memberships" :fields="fields" :busy="loading" small v-else>
            <template v-slot:table-busy>
                <div class="text-center text-danger my-2">
                    <b-spinner class="align-middle"></b-spinner>
                    <strong>Loading...</strong>
                </div>
            </template>
            <template v-slot:cell(data.name)="data">
                <router-link :to="{name: 'group', params: {groupId: data.item.id}}">
                    {{data.item.data.name}}
                </router-link>
            </template>
            <template v-slot:cell(actions)="data">
                <v-button-delete
                        @delete="deleteMembership(data.item.id)"
                        :delete-text="'Delete user membership to ' + data.item.data.name"></v-button-delete>
            </template>
        </b-table>
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
    import VButtonDelete from "../common/VButtonDelete";
    import Notify from "../../service/Notify";

    export default {
        name: "VUserMemberships",
        components: {VButtonDelete, VPagination},
        props: {
            userId: {
                required: true,
                type: Number
            },
        },

        data() {
            return {
                fields: [
                    {key: 'id', label: 'Group ID', sortable: true},
                    {key: 'data.name', label: 'Group Name', sortable: true},
                    {key: 'actions', label: '', sortable: false}
                ],
                loading: false,
                currentPage: 1,
                perPage: 10,
                memberships: [],
                numberOfPages: 0
            }
        },

        mounted() {
            this.fetchMemberships();
        },

        watch: {
            userId() {
                this.fetchMemberships();
            },
            currentPage() {
                this.fetchMemberships();
            },
            perPage() {
                this.fetchMemberships();
            }
        },

        methods: {
            fetchMemberships() {
                this.loading = true;
                this.$control.user().groups(this.userId, this.currentPage, this.perPage)
                    .then(response => {
                        this.memberships = response.data.data;
                        this.numberOfPages = response.data.last_page;
                    })
                    .catch(error => this.$notify.alert('Could not fetch memberships: ' + error.response.message))
                    .then(() => this.loading = false);
            },
            deleteMembership(groupId) {
                this.$control.user().removeGroup(this.userId, groupId)
                    .then(() => {
                        Notify.success('Membership deleted')
                        this.fetchMemberships();
                    });
            }
        }
    }
</script>

<style scoped>

</style>