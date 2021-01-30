<template>
    <div>
        <div v-if="!loading && roles.length === 0">
            This user has no roles
        </div>
        <b-table :items="roles" :fields="fields" :busy="loading" small v-else>
            <template v-slot:table-busy>
                <div class="text-center text-danger my-2">
                    <b-spinner class="align-middle"></b-spinner>
                    <strong>Loading...</strong>
                </div>
            </template>
            <template v-slot:cell(position_id)="data">
                <position-name :position-id="data.item.position_id"></position-name>
            </template>
            <template v-slot:cell(group_id)="data">
                <router-link :to="{name: 'group', params: {groupId: data.item.group_id}}">
                    <group-name :group-id="data.item.group_id"></group-name>
                </router-link>
            </template>
            <template v-slot:cell(created_at)="data">
                {{data.item.created_at | date}}
            </template>

            <template v-slot:cell(actions)="data">
                <v-button-view
                          @view="$router.push({name: 'role', params: {roleId: data.item.id}})">
                </v-button-view>
                <v-button-delete
                        @delete="deleteRole(data.item.id)"
                        :delete-text="'Delete role ' + data.item.data.role_name + ' from user?'"></v-button-delete>
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
    import PositionName from "../common/VPositionName";
    import GroupName from "../common/VGroupName";
    import moment from "moment";
    import VButtonDelete from "../common/VButtonDelete";
    import Notify from "../../service/Notify";
    import VButtonView from "../common/VButtonView";

    export default {
        name: "VUserRoles",
        components: {VButtonView, VButtonDelete, VPagination, GroupName, PositionName},
        props: {
            userId: {
                required: true,
                type: Number
            },
        },

        data() {
            return {
                fields: [
                    {key: 'id', label: 'Role ID', sortable: true},
                    {key: 'data.role_name', label: 'Role Name'},
                    {key: 'position_id', label: 'Position'},
                    {key: 'group_id', label: 'Group'},
                    {key: 'created_at', label: 'Created At', sortable: true, sortDirection: 'asc'},
                    {key: 'actions', label: ''}
                ],
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
            userId() {
                this.fetchRoles();
            },
            currentPage() {
                this.fetchRoles();
            },
            perPage() {
                this.fetchRoles();
            }
        },


        filters: {
            date(val) {
                return moment(val).format('DD-MM-YYYY')
            }
        },


        methods: {
            deleteRole(roleId){
                    this.$control.user().removeRole(this.userId, roleId)
                        .then(() => {
                            Notify.success('Role removed from user')
                            this.fetchRoles();
                        });
                },
            fetchRoles() {
                this.loading = true;
                this.$control.user().roles(this.userId, this.currentPage, this.perPage)
                    .then(response => {
                        this.roles = response.data.data;
                        this.numberOfPages = response.data.last_page;
                    })
                    .catch(error => this.$notify.alert('Could not fetch roles: ' + error.response.message))
                    .then(() => this.loading = false);
            }
        }
    }
</script>

<style scoped>

</style>