<template>
    <div>
        <div v-if="!loading && roles.length === 0">
            This group has no roles
        </div>
        <b-table
                :items="roles"
                :fields="fields"
                :busy="loading"
                small
                v-else>
            <template v-slot:table-busy>
                <div class="text-center text-danger my-2">
                    <b-spinner class="align-middle"></b-spinner>
                    <strong>Loading...</strong>
                </div>
            </template>
            <template v-slot:cell(position_id)="data">
                <position-name :position-id="data.item.position_id"></position-name>
            </template>
            <template v-slot:cell(created_at)="data">
                {{data.item.created_at | date}}
            </template>
            <template v-slot:cell(actions)="data">
                <v-button-delete :delete-text="'Delete role ' + data.item.data.role_name + '?'" @delete="deleteRole(data.item.id)"></v-button-delete>
                <v-button-view @view="$router.push({name: 'role', params: {roleId: data.item.id}})">
                </v-button-view>
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
    import PositionName from "../common/VPositionName";
    import VPagination from "../common/VPagination";
    import ControlService from "../../service/ControlService";
    import moment from "moment";
    import VButtonDelete from "../common/VButtonDelete";
    import Notify from "../../service/Notify";
    import VButtonView from "../common/VButtonView";

    export default {
        name: "VGroupRoles",
        components: {VButtonView, VButtonDelete, VPagination, PositionName},
        props: {
            groupId: {
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
                    {key: 'created_at', label: 'Created At'},
                    {key: 'actions', 'label': ''}
                ],
                loading: false,
                perPage: 10,
                currentPage: 1,
                roles: [],
                numberOfPages: 0
            }
        },

        mounted() {
            this.fetchRoles();
        },

        filters: {
            date(val) {
                return moment(val).format('DD-MM-YYYY')
            }
        },

        watch: {
            groupId() {
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
                this.$control.role().delete(roleId)
                    .then(() => {
                        Notify.success('Role deleted')
                        this.fetchRoles();
                    })
                    .catch(() => {});
            },
            fetchRoles() {
                this.loading = true;
                return ControlService.getService().group().roles(this.groupId, this.currentPage, this.perPage)
                    .then(response => {
                        this.roles = response.data.data;
                        this.numberOfPages = response.data.last_page;
                    })
                    .then(() => this.loading = false);
            }
        },
    }
</script>

<style scoped>

</style>