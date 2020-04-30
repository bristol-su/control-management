<template>
    <div>
        <div v-if="!loading && roles.length === 0">
            This position has no roles
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
            <template v-slot:cell(group_id)="data">
                <group-name :group-id="data.item.group_id"></group-name>
            </template>
            <template v-slot:cell(created_at)="data">
                {{data.item.created_at | date}}
            </template>
            <template v-slot:cell(actions)="data">
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
    import GroupName from "../common/VGroupName";
    import moment from "moment";
    import VButtonView from "../common/VButtonView";

    export default {
        name: "VPositionRoles",
        components: {VButtonView, GroupName, VPagination, PositionName},
        props: {
            positionId: {
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
            positionId() {
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
            fetchRoles() {
                this.loading = true;
                return ControlService.getService().position().roles(this.positionId, this.currentPage, this.perPage)
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