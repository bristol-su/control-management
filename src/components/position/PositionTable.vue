<template>
    <b-table small :fields="fields" :items="positions" :busy="loading">
        <template v-slot:top-row>
            <slot name="top-row"></slot>
        </template>
        <template v-slot:cell(actions)="data">
            <v-button-view
                    @view="$router.push({ name: 'position', params: { positionId: data.item.id }})">
            </v-button-view>
            <v-button-delete :delete-text="deleteText" v-if="deletable" @delete="$emit('delete', data.item.id)">

            </v-button-delete>
        </template>
    </b-table>
</template>

<script>
    import VButtonView from "../common/VButtonView";
    import VButtonDelete from "../common/VButtonDelete";
    export default {
        name: "PositionTable",
        components: {VButtonDelete, VButtonView},
        props: {
            positions: {
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