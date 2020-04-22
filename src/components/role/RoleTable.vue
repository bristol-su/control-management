<template>
    <b-table :fields="fields" :items="roles" :busy="loading">
        <template v-slot:top-row>
            <slot name="top-row"></slot>
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
            <b-button
                size="sm"
                variant="outline-secondary"
                @click="$router.push({ name: 'role', params: { roleId: data.item.id }})">
                View
            </b-button>
        </template>
    </b-table>
</template>

<script>
    import moment from "moment";
    import PositionName from "../common/PositionName";
    import GroupName from "../common/GroupName";

    export default {
        name: "RoleTable",
        components: {GroupName, PositionName},
        props: {
            roles: {
                type: Array,
                default: function () {
                    return [];
                }
            },
            loading: {
                props: {
                    type: Boolean,
                    default: false
                }
            }
        },
        data() {
            return {
                fields: [
                    {key: 'id', label: 'Role ID'},
                    {key: 'data.role_name', label: 'Role Name'},
                    {key: 'position_id', label: 'Position'},
                    {key: 'group_id', label: 'Group'},
                    {key: 'created_at', label: 'Created At'},
                    {key: 'actions', label: 'Actions'}
                ],
            }
        },
        filters: {
            date(val) {
                return moment(val).format('DD-MM-YYYY')
            }
        },
    }
</script>

<style scoped>

</style>