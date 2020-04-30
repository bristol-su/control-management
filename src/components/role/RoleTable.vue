<template>
    <b-table small :fields="fields" :items="roles" :busy="loading">
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
            <v-button-view
                @view="$router.push({ name: 'role', params: { roleId: data.item.id }})">
            </v-button-view>
            <v-button-delete :delete-text="deleteText" v-if="deletable" @delete="$emit('delete', data.item.id)">

            </v-button-delete>
        </template>
    </b-table>
</template>

<script>
    import moment from "moment";
    import PositionName from "../common/VPositionName";
    import GroupName from "../common/VGroupName";
    import VButtonView from "../common/VButtonView";
    import VButtonDelete from "../common/VButtonDelete";

    export default {
        name: "RoleTable",
        components: {VButtonDelete, VButtonView, GroupName, PositionName},
        props: {
            roles: {
                type: Array,
                default: function () {
                    return [];
                }
            },
            loading: {
                type: Boolean,
                default: false
            },
            deletable: {
                type: Boolean,
                default: false
            },
            deleteText: {
                type: String,
                required: false,
                default: null
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