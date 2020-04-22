<template>
    <b-table :fields="fields" :items="users" :busy="loading">
        <template v-slot:top-row>
            <slot name="top-row"></slot>
        </template>
        <template v-slot:cell(actions)="data">
            <b-button
                size="sm"
                variant="outline-secondary"
                @click="$router.push({ name: 'user', params: { userId: data.item.id }})">
                View
            </b-button>
        </template>
    </b-table>
</template>

<script>
    export default {
        name: "UserTable",
        props: {
            users: {
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
                    {key: 'id', label: 'User ID'},
                    {key: 'data.first_name', label: 'First Name'},
                    {key: 'data.last_name', label: 'Last Name'},
                    {key: 'data.email', label: 'Email'},
                    {key: 'actions', label: 'Actions'}
                ],
            }
        }
    }
</script>

<style scoped>

</style>