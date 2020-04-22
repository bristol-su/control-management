<template>
    <b-table :fields="fields" :items="positions" :busy="loading">
        <template v-slot:top-row>
            <slot name="top-row"></slot>
        </template>
        <template v-slot:cell(actions)="data">
            <b-button
                    size="sm"
                    variant="outline-secondary"
                    @click="$router.push({ name: 'position', params: { positionId: data.item.id }})">
                View
            </b-button>
        </template>
    </b-table>
</template>

<script>
    export default {
        name: "PositionTable",
        props: {
            positions: {
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
                    {key: 'id', label: 'Position ID'},
                    {key: 'data.name', label: 'Name'},
                    {key: 'data.description', label: 'Description'},
                    {key: 'actions', label: 'Actions'}
                ],
            }
        }
    }
</script>

<style scoped>

</style>