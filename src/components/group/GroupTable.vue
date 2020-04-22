<template>
    <b-table :fields="fields" :items="groups" :busy="loading">
        <template v-slot:top-row>
            <slot name="top-row"></slot>
        </template>
        <template v-slot:cell(actions)="data">
            <b-button
                size="sm"
                variant="outline-secondary"
                @click="$router.push({ name: 'group', params: { groupId: data.item.id }})">
                View
            </b-button>
        </template>
    </b-table>
</template>

<script>
    export default {
        name: "GroupTable",
        props: {
            groups: {
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
                    {key: 'id', label: 'Group ID'},
                    {key: 'data.name', label: 'Name'},
                    {key: 'data.email', label: 'Email'},
                    {key: 'actions', label: 'Actions'}
                ],
            }
        }
    }
</script>

<style scoped>

</style>